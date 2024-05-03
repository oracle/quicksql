import {singular,concatNames,canonicalObjectName, getMajorVersion} from './naming.js';
import translate from './translate.js';
import {generateSample, resetSeed} from './sample.js';
import lexer from './lexer.js';
import amend_reserved_word from './reserved_words.js';
import split_str from './split_str.js';

let tree = (function(){ 
    let ddl;
    let tab= '    ';
    const stringTypes = ['string', 'varchar2', 'varchar', 'vc' , 'char'];
    const boolTypes = ['yn', 'boolean', 'bool', ];
    let datatypes = [
        'integer',
        'number', 'num',
        'int',
        'num',    
        'blob', 'clob',
        'json',
        'file',
        'date', 'd',
        'tstz',
        'tswtz',
        'tswltz',
        'ts',
    ];           
    datatypes = datatypes.concat(stringTypes);
    datatypes = datatypes.concat(boolTypes);

    /**
     * Node in QSQL tree defining a Table, a Column, a View, or an Option
     * @param lineNo  -- line number
     * @param {*} inputLine -- QSQL line
     * @param {*} parent -- reference to parent node (if any)
     */
    function ddlnode( lineNo, inputLine, parent ) {
        this.line = lineNo;
        this.parent = parent;
        this.children = [];
        if( parent != null )
            parent.children.push(this);
        
        this.fks = null;

        this.findChild = function( name ) {
            for( var i = 0; i < this.children.length; i++ ) 
                if( this.children[i].parseName() == name )
                    return this.children[i];
            return null;
        };
                
        this.descendants = function() {
            var ret = [];
            ret.push(this);
            for( var i = 0; i < this.children.length; i++ ) 
                ret = ret.concat(this.children[i].descendants());
            return ret;
        };
        
        this.maxChildNameLen = function() {
            var maxLen = 2;
            if( ddl.optionEQvalue('rowkey',true) || this.isOption('rowkey') )
                maxLen = 'row_key'.length;
            if( ddl.optionEQvalue('Row Version Number','yes') || this.isOption('rowversion') )
                maxLen = 'row_version'.length;
            if( ddl.optionEQvalue('Audit Columns','yes') || this.isOption('auditcols') 
            || this.isOption('audit','col') || this.isOption('audit','cols') || this.isOption('audit','columns') ) {
                let len = ddl.getOptionValue('createdcol').length;
                if( maxLen < len )
                    maxLen = len;
                len = ddl.getOptionValue('createdbycol').length;
                if( maxLen < len )
                    maxLen = len;
                len = ddl.getOptionValue('updatedcol').length;
                if( maxLen < len )
                    maxLen = len;
                len = ddl.getOptionValue('updatedbycol').length;
                if( maxLen < len )
                    maxLen = len;
            }                    
            if( this.fks != null )
                for( var col in this.fks ) {
                    //var parent = this.fks[col];
                    var len = col.length;
                    let refNode = ddl.find(col);
                    if( refNode != null && refNode.isMany2One() )
                        len += '_id'.length;
                    if( maxLen < len )
                        maxLen = len;
                }
            for( var i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                if( 0 < child.children.length )
                    continue;
                let len = child.parseName().length;
                if( 0 < child.indexOf('file') )
                    len += '_FILENAME'.length;
                if( maxLen < len )
                    maxLen = len;
            }
            var cols = ddl.additionalColumns();
            for( let col in cols ) {
                let len = col.length;
                if( maxLen < len )
                    maxLen = len;
            }
 
            return maxLen;
        };
        
        function normalize( ddlLine ) {
            let ret = ddlLine;
            ret = ret.replace(/ timestamp with local time zone/gi,' tswltz');
            ret = ret.replace(/ timestamp with time zone/gi,' tswtz');
            ret = ret.replace(/ timestamp/gi,' ts');
            return ret;
        }
    
        this.content = normalize(inputLine);
        this.comment;

        /**
         * More robust way to parse the tree node content
         * @param {*} token     to look up
         * @param {*} isPrefix  is prefix match 
         * @returns 
         */
        this.indexOf = function( token, isPrefix ) {
            for( let i = 0; i < this.src.length; i++ ) {
                if( isPrefix && 0 == this.src[i].value.toLowerCase().indexOf(token.toLowerCase()) )  
                    return i;
                else if( token.toLowerCase() == this.src[i].value.toLowerCase() )
                    return i;
            }
            return -1;
        }

        this.occursBeforeOption = function( token, isPrefix ) {
            return 0 < this.indexOf(token, isPrefix) 
               && ( this.indexOf('/') < 0 || this.indexOf(token, isPrefix) < this.indexOf('/') );
        }

        this.isOption = function( token, token2 ) {
            for( let i = 2; i < this.src.length; i++ ) {
                if( token == this.src[i].value.toLowerCase() )
                    if( token2 == null || i < this.src.length-1 && token2 ==this.src[i+1].value.toLowerCase() )
                        return this.src[i-1].value == '/';
            }
            return false;
        }

        this.getOptionValue = function( option ) {
            if( this.src.length < 3 )
                return null;
            const pos = this.indexOf(option);
            if( pos < 2 || this.src[pos-1].value != '/' )
                return null;

            let ret = '';
            for( let i = pos+1; i < this.src.length && this.src[i].value != '/' && this.src[i].value != '['; i++ )
                ret += this.src[i].value;

            return ret;
        }

        this.sugarcoatName = function( from, to ) {
            let prefix = '';
            if( 0 == this.children.length ) {   // switched to this comparison style because accidental typo this.children.length = 0 is disastrous!
                if( this.parent != undefined && this.parent.colprefix != undefined )
                    prefix = this.parent.colprefix+'_';        		
            } 

            let ret = '';
            let spacer = '_';
            for( let i = from; i < to; i++ ) {
                const value = this.src[i].value;
                const qVal  = '"'+value+'"';
                if( this.src[i].type != 'constant.numeric' && value != canonicalObjectName(qVal) ) {
                    ret = this.content.substring(this.src[from].begin,this.src[to-1].end);
                    this.parsedName = prefix+amend_reserved_word(canonicalObjectName(ret));
                    return this.parsedName;
                }
            }

            for( let i = from; i < to; i++ ) {
                if( from < i )
                    ret += spacer;
                ret += this.src[i].value;
            }

            var c = ret.charAt(0);
            if( c >= '0' && c <= '9' ) 
                ret = 'x'+ret;
        
            this.parsedName = prefix+amend_reserved_word(canonicalObjectName(ret));
            return this.parsedName;
        }
 
        this.src = lexer( this.content/*.toLowerCase()*/, false, true, '`' ); 

        const cp = this.getOptionValue('colprefix');
        if( cp != null )
            this.colprefix = cp;
         
        this.parsedName = null;
        this.parseName = function () {  
            if( this.parsedName != null ) 
                return this.parsedName;         
            
            let nameFrom = 0;        
            let ret = this.src[0].value;
            if( ret == '>' || ret == '<' ) {
                ret = this.src[1].value;  
                nameFrom = 1;
            } 
            const  qtBegin = ret.indexOf('"');
            const  qtEnd = ret.indexOf('"', qtBegin+1);
            if( 0 <= qtBegin && qtBegin < qtEnd )
                return ret.substring(qtBegin, qtEnd+1);

            if( this.src[0].value == 'view' ) {
                return this.src[1].value;
            }
            if( 1 < this.src.length && this.src[1].value == '=' ) {
                return this.src[0].value;
            }

            let nameTo = this.src.length;

            let tmp = this.indexOf('/');
            if( 0 < tmp )
                nameTo = tmp;

            tmp = this.indexOf('[');
            if( 0 < tmp )
                nameTo = tmp;
        
            
            for( let i = 0; i < datatypes.length; i++ ) {
                const pos = this.indexOf(datatypes[i]);
                if( 0 < pos && pos < nameTo ) {
                    nameTo = pos;
                    return this.sugarcoatName(nameFrom, nameTo); 
                }
            }

            for( let i = nameFrom; i < nameTo; i++ ) {
                const tmp = this.src[i].value.toLowerCase();
                if( tmp.charAt(0) == 'v' && tmp.charAt(1) == 'c' ) {
                    if( tmp.charAt(2) == '(' )
                        return this.sugarcoatName(nameFrom, i); 
                    if( 0 <= tmp.charAt(2) && tmp.charAt(2) <= '9' )
                        return this.sugarcoatName(nameFrom, i); 
                }
            }

            return this.sugarcoatName(nameFrom, nameTo);
        };
        this.parseType = function( pure ) {
            if( this.children != null && 0 < this.children.length )
                return 'table';

            const src = this.src;    

            if( src[0].value == 'view' || 1 < src.length && src[1].value == '=' ) 
                return 'view';
            /*if( src[0].value == 'dv' ) 
                return 'dv';*/
                        
            if( this.parent == null )
                return 'table';
    
            var char = ddl.semantics();
            var len = 4000;	
            if( src[0].value.endsWith('_name') || src[0].value.startsWith('name') || src[0].value.startsWith('email') )
                len = ddl.getOptionValue('namelen');
            var start;
            var end;
            var values;

            const vcPos = this.indexOf('vc', true);  
            if( 0 < vcPos ) {
                start = src[vcPos].begin;
                end = src[vcPos].end;
                let varcharLen = src[vcPos].value.substring('vc'.length);
                if( '' == varcharLen ) {
                    let oParenPos = this.indexOf('(');
                    if( oParenPos == vcPos + 1 ) {
                        varcharLen = src[vcPos+2].value;
                    }
                }
                if( '' != varcharLen )
                    len = parseInt(varcharLen);
                if( src[vcPos].value.endsWith('k') )
                    if( len < 32 )
                        len = len * 1024;
                    else
                        len =  len * 1024 -1 ;   
            }
            var ret = 'varchar2('+len+char+')';
            if( pure == 'plsql' )
                ret = 'varchar2';
            //if( pure == 'fk' )
                //ret = null;
            if( src[0].value.endsWith('_id') && vcPos < 0 && this.indexOf('date') < 0 ) 
                ret = 'number';
            if( src[1] && src[1].value == 'id' ) 
                ret = 'number';
            if( src[0].value == 'quantity' ) 
                ret = 'number';
            if( src[0].value.endsWith('_number') ) 
                ret = 'number';
            if( src[0].value.endsWith('id') && vcPos < 0 && this.indexOf('/')+1 == this.indexOf('pk') ) 
                ret = 'number';
            if( this.occursBeforeOption('int', true) ) 
                ret = 'integer';

            if( 0 < vcPos ) {
                ret = 'varchar2('+len+char+')';
                if( pure == 'plsql' )
                    ret = 'varchar2';
            }

            const parent_child = concatNames(parent.parseName(),'_',this.parseName());

            const isDefault = this.isOption('default');

            let booleanCheck = '';
            if( src[0].value.endsWith('_yn') || src[0].value.startsWith('is_') ) {
                ret = 'varchar2(1'+ddl.semantics()+ ')';
                booleanCheck = '\n' + tab +  tab+' '.repeat(parent.maxChildNameLen()) +'constraint '+concatNames(ddl.objPrefix(),parent_child)+' check ('+this.parseName()+" in ('Y','N'))";
            }
            for( let i in boolTypes ) {
                let pos = this.indexOf(boolTypes[i]);
                if( 0 < pos ) {
                    ret = 'varchar2(1'+ddl.semantics()+ ')';
                    booleanCheck = '\n' + tab +  tab+' '.repeat(parent.maxChildNameLen()) +'constraint '+concatNames(ddl.objPrefix(),parent_child)+' check ('+this.parseName()+" in ('Y','N'))";
                    break;
                }
            } 
            const dbVer = ddl.getOptionValue('db');
            if( booleanCheck != '' && ( ddl.getOptionValue('boolean')=='native' 
                                      || ddl.getOptionValue('boolean') != 'yn' && 0 < dbVer.length && 23 <= getMajorVersion(dbVer) ) 
            ) {
                booleanCheck = '';
                ret = 'boolean';
            }


            if( this.indexOf('phone_number') == 0 )
                ret = 'number';
            let from = this.indexOf('num', true);
            if( 0 < from )
                ret = 'number';
            let to = this.indexOf(')');  
            if( 0 < from && 0 < to )
                ret += this.content.toLowerCase().substring(src[from+1].begin, src[to].end);
            if( 0 <= this.indexOf('date') || 0 == this.indexOf('hiredate') || src[0].value.endsWith('_date') || src[0].value.startsWith('date_of_')
             || 1 < src.length && src[1].value == 'd' //0 < type.indexOf(' d') && type.indexOf(' d') == type.length-' d'.length 
             || src[0].value.startsWith('created')
             || src[0].value.startsWith('updated')
            )        		
                ret = ddl.getOptionValue('Date Data Type').toLowerCase();
            if( vcPos < 0 ) {              	
                if( this.occursBeforeOption('clob')   ) 
                    ret = 'clob';
                if( this.occursBeforeOption('blob') || this.occursBeforeOption('file') ) 
                    ret = 'blob';
                if( this.occursBeforeOption('json') ) 
                    ret = 'clob check ('+this.parseName()+' is json)';
            }

            if( this.occursBeforeOption('tswltz') && this.indexOf('/')  ) 
                ret = 'TIMESTAMP WITH LOCAL TIME ZONE'.toLowerCase();
            else if( this.occursBeforeOption('tswtz') || this.occursBeforeOption('tstz') ) 
                ret = 'TIMESTAMP WITH TIME ZONE'.toLowerCase();
            else if( this.occursBeforeOption('ts') ) 
                ret = 'TIMESTAMP'.toLowerCase();

            if( pure ) {
                if( this.isOption('fk') || 0 < this.indexOf('reference', true) ) {
                    const parent = this.refId();
                    let type = 'number';
                    if( ret == 'integer' )
                        type = ret;
                    let refNode = ddl.find(parent);
                    if( refNode != null && refNode.getExplicitPkName() != null )
                        type = refNode.getPkType();
                    return type;
                }     
                return ret;
            }	


            if( this.isOption('unique') || this.isOption('uk') ) {
                ret += '\n';  
                ret += tab +  tab+' '.repeat(parent.maxChildNameLen()) +'constraint '+concatNames(ddl.objPrefix(),parent_child,'_unq')+' unique';
            } 
            var optQuote = '\'';
            if(  ret.startsWith('integer') || ret.startsWith('number') || ret.startsWith('date')  ) 
                optQuote = '';
            if( this.isOption('default') ) {
                let value = '';
                for( let i = this.indexOf('default')+1; i < src.length; i++ ) {
                    const token = src[i].getValue();
                    if( token == '/' )
                        break;
                    if( token == '-' )
                        break;
                    if( token == '[' )
                        break;
                    value += src[i].getValue();
                }
                ret +=' default '+'on null ' + optQuote+value+optQuote ;
            }
            if( this.isOption('nn') || this.indexOf('not')+1== this.indexOf('null') )
                if( this.indexOf('pk') < 0 ) 
                    ret += ' not null';
            if( this.isOption('hidden') || this.isOption('invincible') ) 
                ret += ' invisible';
            ret += this.genConstraint(optQuote);
            ret += booleanCheck;
            if( this.isOption('between') ) {
                const bi = this.indexOf('between');
                const values = src[bi+1].getValue() + ' and ' + src[bi+3].getValue();
                ret +=' constraint '+concatNames(parent_child,'_bet')+'\n';
                ret +='           check ('+this.parseName()+' between '+values+')';        		
            }
            if( this.isOption('pk') ) {
                let typeModifier = ' not null';
                if( ret.startsWith('number') && ddl.optionEQvalue('pk', 'identityDataType') )
                    typeModifier = ' GENERATED BY DEFAULT ON NULL AS IDENTITY'.toLowerCase();
                if( ret.startsWith('number') && ddl.optionEQvalue('pk', 'seq') ) {
                    let objName = ddl.objPrefix()  + this.parent.parseName();
                    typeModifier = ' default on null '+objName+'_seq.NEXTVAL '.toLowerCase();
                }
                if( ret.startsWith('number') && ddl.optionEQvalue('pk', 'guid') )
                    typeModifier = ' default on null to_number(sys_guid(), \'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\') ';
                ret += typeModifier +'\n';  
                ret += tab + tab + ' '.repeat(parent.maxChildNameLen()) + 'constraint ' + concatNames(ddl.objPrefix(),parent_child,'_pk')+' primary key';
            }
            return ret;
        };


        this.genConstraint = function ( optQuote ) {
            let ret = '';
            if( this.isOption('check') ) {
                let parentPref = '';
                if( parent != null )
                    parentPref = parent.parseName()+'_';
                const parent_child = concatNames(parentPref,this.parseName());

                let offset = tab;
                if( parent != null )
                    offset = ' '.repeat(parent.maxChildNameLen());
                let constr = this.getGeneralConstraint();
                if( constr != null ) {
                    if( this.children != null && 0 < this.children.length ) {  // (general) table level constraint
                        ret += tab + 'constraint '+concatNames(ddl.objPrefix(),parent_child,'_ck');
                        ret += '  check '+ constr +',\n';    
                    } else {                     // general column level constraint
                        ret +=' constraint '+concatNames(ddl.objPrefix(),parent_child,'_ck')+'\n';
                        ret += tab +  tab+offset +'check '+ constr +'';    
                    } 
                    return ret;
                }
                const values = this.getValues('check');
                ret +=' constraint '+concatNames(ddl.objPrefix(),parent_child,'_ck')+'\n';
                ret += tab +  tab+offset +'check ('+this.parseName()+' in ('+values+'))';                    
            }
            return ret;
        }

        this.isMany2One = function() {
            return this.src[0].value == '>';
        };
        
        this.getExplicitPkName = function() {
            if( this.isOption('pk') ) {
                if( this.parseType() == 'table' )
                    return this.getOptionValue('pk');
                else
                    return this.parseName();
            }
            for( var i = 0; i < this.children.length; i++ ) {
                var child = this.children[i];
                if( child.isOption('pk') )
                    return child.parseName();
            }
            return null;
        };

        this.trimmedContent = function() {
            var ret = this.content.trim();
            var start = ret.indexOf('[');
            var end = ret.indexOf(']');
            if( this.comment == null && 0 < start ) 
                this.comment = ret.substr(start+1, end-start-1);
            if( 0 < start ) {
                ret = ret.substr(0,start) + ret.substr(end+2);
            }
            start = ret.indexOf('--');
            if( this.comment == null && 0 < start ) 
                this.comment = ret.substr(start+2);
            if( 0 < start ) {
                ret = ret.substr(0,start);
            }
            return ret.trim();
        };
        
        this.refId = function() {
            var tmp = this.trimmedContent();
            tmp = tmp.replace(/\/cascade/g,'');
            var pos = tmp.indexOf(' id ');
            if( pos < 0 ) {
                if( pos == tmp.length-' id'.length )
                    pos = tmp.indexOf(' id');
            }
            if( pos < 0 ) {
                pos = tmp.indexOf(' id');
                if( pos != tmp.length-' id'.length )
                    pos = -1;
            }
            if( pos < 0 ) {
                pos = tmp.indexOf('_id ');
                if( pos != tmp.length-'_id '.length )
                    pos = -1;
            }
            if( pos < 0 ) {
                pos = tmp.indexOf('_id');
                if( pos != tmp.length-'_id'.length )
                    pos = -1;
            }
            if( pos < 0 ) {
                pos = tmp.indexOf('Id ');
                if( pos != tmp.length-'Id '.length )
                    pos = -1;
            }
            if( 0 < pos ) {
                let ret = tmp.substr(0,pos)+'s';
                if( ddl.find(ret) != null )
                    return ret;
                ret = tmp.substr(0,pos);
                if( ddl.find(ret) != null )
                    return ret;
            }
            pos = tmp.indexOf('/fk');
            if( 0 < pos ) {
                tmp = tmp.substr(pos+'/fk'.length).trim();
                pos = tmp.indexOf('/');
                if( 0 < pos )
                    tmp = tmp.substring(0,pos).trim();
                pos = tmp.indexOf('[');
                if( 0 < pos )
                    tmp = tmp.substring(0,pos).trim();
                return tmp.replace(' ','_');
            }
            pos = tmp.indexOf('/reference');
            if( 0 < pos ) {
                tmp = tmp.substr(pos+'/reference'.length).trim();
                if( tmp.indexOf('s') == 0 )
                    tmp = tmp.substring(1).trim();
                pos = tmp.indexOf('/');
                if( 0 < pos )
                    tmp = tmp.substring(0,pos).trim();
                pos = tmp.indexOf('[');
                if( 0 < pos )
                    tmp = tmp.substring(0,pos).trim();
                return tmp.replace(' ','_');
            }
            return null;
        };

        this.getGeneralConstraint = function() { // parenthesized constraint to return verbatim, e.g. c1 /check (c1 in ('A','B','C'))
            let from = this.indexOf('check');
            if(   0 < from && this.src[from-1].value == '/' &&
                ( this.src[from+1].value == '(' || this.src[from+1].value.toLowerCase() == 'not' ) 
            ) {    
                let i = from+2
                for( ; i < this.src.length && this.src[i].value != '/' && this.src[i].value != '[' ; ) 
                    i++;
                let ret = this.content.substring(this.src[from+1].begin, this.src[i-1].end);
                if( ret.charAt(0) != '(' )
                    ret = '('+ret+')';
                return ret;
            }

            return null;
        }

        this.listValues = function( check_or_values ) {
            let ret = [];
            let from = this.indexOf(check_or_values);
 
            let separator = ' ';   // e.g. status /check open completed closed /values open, open, open, open, closed, completed 
            for( let i = from+1; i < this.src.length && this.src[i].value != '/' && this.src[i].value != '[' ; i++ ) 
                if( this.src[i].value == ',' ) { 
                    separator = ',';
                    break;
                } else if( this.src[i].value.toLowerCase && this.src[i].value.toLowerCase() == 'and' ) { 
                    separator = this.src[i].value;
                    break;
                }   

            if( separator == ' ' )  {
                for( let i = from+1; i < this.src.length && this.src[i].value != '/' && this.src[i].value != '[' ; i++ ) {
                    let value = this.src[i].value;
                    if( this.src[i].type == 'identifier' && value != 'null' )
                        value = "'"+ value + "'";
                    if( value.charAt(0) == '`' )
                        value = value.substring(1,value.length-1);
                    ret.push(value);
                }  
                return ret;
            }

            let aggrVal = null;
            let type = null;
            for( let i = from+1; i < this.src.length && this.src[i].value != '/' && this.src[i].value != '[' ; i++ ) {
                let value = this.src[i].value;
                let spacer = this.content.substring(this.src[i-1].end, this.src[i].begin);
                if( value == separator ) {
                    if( type == 'identifier' && aggrVal != 'null' )
                        aggrVal = "'" + aggrVal + "'";
                    ret.push(aggrVal); 
                    aggrVal = null;
                    type = null;
                    continue;
                }
                if( value == '(' )
                    continue;
                if( value == ')' )
                    continue;
                if( value.charAt(0) == '`' )
                    value = value.substring(1,value.length-1);
                //if( value.charAt(0) == '\'' )
                    //value = value.substring(1,value.length-1);
                else if( this.src[i].type == 'identifier' )
                    type = 'identifier';
                if( aggrVal == null ) 
                    aggrVal = value;
                else   
                    aggrVal += spacer+value;
                
            }
            if( type == 'identifier' )
                aggrVal = "'"+ aggrVal + "'";
            ret.push(aggrVal); 
            return ret;
        }
      

        this.getValues = function( check_or_values ) {
            let ret = '';

            const values = this.listValues(check_or_values);
            for( let i = 0; i < values.length; i++ ) {
                if( 0 < i )
                    ret += ',';
                ret += values[i];
            }
            return ret;
        }

        this.parseValues = function() {
            var values;
            if( this.isOption('check') ) {
                return this.listValues('check');
            }
            if( this.isOption('values') ) {
                return this.listValues('values');
            }
            if( this.isOption('between') ) {
                var values = this.listValues('between');
                var ret = [];
                for( var i = parseInt(values[0]); i <= parseInt(values[1]) ; i++ )
                    ret.push(i);
                return ret;
            }
            return null;
        };

        this.apparentDepth = function() {
            let chunks = this.content.split(/ |\t/);
            let depth = 0;
            for( var j = 0; j < chunks.length; j++ ) {
                var chunk = chunks[j];
                if( "\t" == chunk ) {
                    depth += this.tab;
                    continue;
                }
                if( '' == chunk  ) {
                    depth++;
                    continue;
                }
                return depth;
            }
            throw 'No alphanumerics in the node content';    
        };
        this.depth = function() {
            if( this.parent == null )
                return 0;
            return this.parent.depth()+1;
        };

        this.isLeaf = function(  ) {
            return this.children.every((c) => c.children.length == 0);
        };

        this.getGenIdColName = function () {
            if( this.parseType() != 'table' )
                return null;
            if( this.getExplicitPkName() != null )
                return null;
            if( ddl.optionEQvalue('Auto Primary Key','yes') ) {
                let colPrefix = '';
                if (this.colprefix != undefined )
                    colPrefix = this.colprefix + '_';
                if( ddl.optionEQvalue('prefixPKwithTname','yes') ) 
                    colPrefix = singular(this.parseName()) + '_';   
                return  colPrefix+'id';
            }
            return null;
        }
        this.getPkName = function () {
            let id = this.getGenIdColName();
            if( id == null ) {
                return this.getExplicitPkName();
            }
            return id;
        }
        this.getPkType = function () {
            let id = this.getGenIdColName();
            if( id == null ) {
                const cname = this.getExplicitPkName();
                return this.findChild(cname).parseType(pure=>true);
            }
            return 'number';
        }

        this.lateInitFks = function() {
            if( this.fks == null ) {
                this.fks = [];
            }

            if( !this.isMany2One() ) {
                if( this.parent != null && this.parseType() == 'table' ) {
                    const pkn = this.parent.getPkName();
                    if( pkn.indexOf(',') < 0 )
                        this.fks[singular(this.parent.parseName())+'_id']=this.parent.parseName();
                    else
                        this.fks[singular(this.parent.getPkName())]=this.parent.parseName();
                }
                for( let i = 0; i < this.children.length; i++ ) 
                    if( this.children[i].refId() != null ) {
                        this.fks[this.children[i].parseName()]=this.children[i].refId();
                    }
            } //...else   -- too lae to do here, performed earlier, during recognize()
        }

        this.singleDDL = function() {
            
            if( this.children.length == 0 && 0 < this.apparentDepth() ) {
                let pad = tab;
                if( this.parent != undefined )
                    pad += ' '.repeat(this.parent.maxChildNameLen() - this.parseName().length);
                return this.parseName()+pad+this.parseType();
            }

            this.lateInitFks();
            
            //var indexedColumns = [];
            var ret = '';

            const objName = ddl.objPrefix()  + this.parseName();
            if( ddl.optionEQvalue('pk', 'SEQ') && ddl.optionEQvalue('genpk', true) ) {
                ret =  ret + 'create sequence  '+objName+'_seq;\n\n';                
            }

            ret =  ret + 'create table '+objName+' (\n';
            var pad = tab+' '.repeat(this.maxChildNameLen() - 'ID'.length);

            let idColName = this.getGenIdColName();
            if( idColName != null && !this.isOption('pk') ) {
                let typeModifier = 'not null';
                if( ddl.optionEQvalue('pk', 'identityDataType') )
                    typeModifier = 'GENERATED BY DEFAULT ON NULL AS IDENTITY'.toLowerCase();
                if( ddl.optionEQvalue('pk', 'seq') )
                    typeModifier = 'default on null '+objName+'_seq.NEXTVAL '.toLowerCase();
                if( ddl.optionEQvalue('pk', 'guid') )
                    typeModifier = 'default on null to_number(sys_guid(), \'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\') ';
                ret += tab +  idColName + pad + 'number ' + typeModifier + '\n';                
                const obj_col = concatNames(ddl.objPrefix('no schema')  + this.parseName(),'_',idColName);  
                ret += tab +  tab+' '.repeat(this.maxChildNameLen()) +'constraint '+concatNames(obj_col,'_pk')+' primary key,\n';
            } else {
                let pkName = this.getExplicitPkName();
                if( pkName != null && pkName.indexOf(',') < 0 ) {
                    let pad = tab + ' '.repeat(this.maxChildNameLen() - pkName.length);
                    let type = 'number';
                    const child = this.findChild(pkName);
                    if( child != null )
                        type = child.parseType();
                    ret += tab +  pkName + pad + type + ',\n';
                }
            }
 
            for( let fk in this.fks ) {
                let parent = this.fks[fk];
                if( 0 < fk.indexOf(',') ) {
                    let refNode = ddl.find(parent);
                    var chunks = split_str(fk,', ');
                    for( var i = 0; i < chunks.length; i++ ) {
                        var col = chunks[i];
                        if( col == ',' )
                            continue;
                        const pChild = refNode.findChild(col);
                        pad = tab+' '.repeat(this.maxChildNameLen() - col.length);
                        ret += tab + col   + pad + pChild.parseType(pure=>true) + ',\n';  
                    }
                    continue;
                }
                let type = 'number';
                const attr = this.findChild(fk);
                if( attr != null )
                    type = attr.parseType('fk');		
                let refNode = ddl.find(parent);
                let _id = ''; 
                if( refNode != null ) {
                    const rname = refNode.getExplicitPkName();  
                    if( rname != null && rname.indexOf(',') < 0 )
                        type = refNode.getPkType();  
                } else {
                    refNode = ddl.find(fk);
                    if( refNode.isMany2One() & !fk.endsWith('_id') ) {
                        parent = fk;
                        fk = singular(fk);
                        _id = '_id';  
                    }
                }
                pad = tab+' '.repeat(this.maxChildNameLen() - fk.length);
                ret += tab + fk + _id  + pad + type;  
                if( refNode.line < this.line || refNode.isMany2One() ) {
                    ret += tab + tab+' '.repeat(this.maxChildNameLen()) + 'constraint '+objName+'_'+fk+'_fk\n';
                    let onDelete = '';
                    if( this.isOption('cascade')) 
                        onDelete = ' on delete cascade';
                    else if( this.isOption('setnull')) 
                        onDelete = ' on delete set null';
                    let	notNull = '';
                    for( let c in this.children ) {
                        let child = this.children[c];
                        if( fk == child.parseName() )  {
                            if( child.isOption('nn') || child.isOption('notnull')  ) 
                                notNull = ' NOT NULL'.toLowerCase();        
                            if( child.isOption('cascade')  ) 
                                onDelete = ' on delete cascade';  
                            else if( this.isOption('setnull')) 
                                onDelete = ' on delete set null';
                            break;
                        }
                    }
                    ret += tab + tab+' '.repeat(this.maxChildNameLen()) + 'references '+ddl.objPrefix()+parent+onDelete+notNull+',\n';
                } else {
                    ret += ',\n';
                    const alter = 'alter table '+objName+' add constraint '+objName+'_'+fk+'_fk foreign key ('+fk+') references '+ddl.objPrefix()+parent+';\n'
                    if( !ddl.postponedAlters.includes(alter) )
                        ddl.postponedAlters.push(alter);
                }
            }

            if( ddl.optionEQvalue('rowkey',true) || this.isOption('rowkey') ) {
                let pad = tab+' '.repeat(this.maxChildNameLen() - 'ROW_KEY'.length);
                ret += tab +  'row_key' + pad + 'varchar2(30'+ddl.semantics()+ ')\n';              	
                ret += tab +  tab+' '.repeat(this.maxChildNameLen()) +'constraint '+objName+'_row_key_unq unique not null,\n';
            }            	

            for( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                if( idColName != null && child.parseName() == 'id' )
                    continue;
                if( 0 < child.children.length ) {
                    continue;
                }
                if( child.refId() == null ) {
                    if( child.parseName() == this.getExplicitPkName() )
                        continue; 
                    ret += tab + child.singleDDL() +',\n';
                    if( 0 < child.indexOf('file') ) {
                        const col = child.parseName().toUpperCase();
                        let extraCol  = col+'_FILENAME';
                        let pad = tab+' '.repeat(this.maxChildNameLen() - extraCol.length);
                        ret += tab +  extraCol.toLowerCase() + pad + 'varchar2(255'+ddl.semantics()+ '),\n';  
                        extraCol  = col+'_MIMETYPE';
                        pad = tab+' '.repeat(this.maxChildNameLen() - extraCol.length);
                        ret += tab +  extraCol.toLowerCase() + pad + 'varchar2(255'+ddl.semantics()+ '),\n';  
                        extraCol  = col+'_CHARSET';
                        pad = tab+' '.repeat(this.maxChildNameLen() - extraCol.length);
                        ret += tab +  extraCol.toLowerCase() + pad + 'varchar2(255'+ddl.semantics()+ '),\n';  
                        extraCol  = col+'_LASTUPD';
                        pad = tab+' '.repeat(this.maxChildNameLen() - extraCol.length);
                        ret += tab +  extraCol.toLowerCase() + pad + ddl.getOptionValue('Date Data Type').toLowerCase() + ',\n';  
                    }
                } 
            }
            if( ddl.optionEQvalue('rowVersion','yes') || this.isOption('rowversion') ) {
                let pad = tab+' '.repeat(this.maxChildNameLen() - 'row_version'.length);
                ret += tab +  'row_version' + pad + 'integer not null,\n';              	
            }            	
            if( ddl.optionEQvalue('Audit Columns','yes') || this.isOption('auditcols') 
                      || this.isOption('audit','col') || this.isOption('audit','cols') || this.isOption('audit','columns') ) {
                let created = ddl.getOptionValue('createdcol');
                let pad = tab+' '.repeat(this.maxChildNameLen() - created.length);
                ret += tab +  created + pad + ddl.getOptionValue('Date Data Type').toLowerCase() + ' not null,\n';  
                let createdby = ddl.getOptionValue('createdbycol');
                pad = tab+' '.repeat(this.maxChildNameLen() - createdby.length);
                ret += tab +  createdby + pad + 'varchar2(255'+ddl.semantics()+') not null,\n';  
                let updated = ddl.getOptionValue('updatedcol');
                 pad = tab+' '.repeat(this.maxChildNameLen() - updated.length);
                ret += tab +  updated + pad + ddl.getOptionValue('Date Data Type').toLowerCase() + ' not null,\n'; 
                let updatedby = ddl.getOptionValue('updatedbycol'); 
                pad = tab+' '.repeat(this.maxChildNameLen() - updatedby.length);
                ret += tab +  updatedby + pad + 'varchar2(255'+ddl.semantics()+') not null,\n';  
            }            	
            var cols = ddl.additionalColumns();
            for( let col in cols ) {
                var type = cols[col];
                pad = tab+' '.repeat(this.maxChildNameLen() - col.length);
                ret += tab +  col.toUpperCase() + pad + type + ' not null,\n';  
            }
            ret += this.genConstraint();
            if( ret.lastIndexOf(',\n') == ret.length-2 )
                ret = ret.substring(0,ret.length-2)+'\n';
            ret += ')'+(ddl.optionEQvalue('compress','yes') || this.isOption('compress')?' compress':'')+';\n\n';
            
            if( this.isOption('audit') && !this.isOption('auditcols') && 
                           !this.isOption('audit','col') && !this.isOption('audit','cols') && !this.isOption('audit','columns') ) {
                ret += 'audit all on '+objName+';\n\n';
            }
     
            for( let fk in this.fks ) {
                if( 0 < fk.indexOf(',') ) {
                    var parent = this.fks[fk];
                    ret +=  'alter table '+objName+' add constraint '+parent+'_'+objName+'_fk foreign key ('+fk+') references '+parent+';\n\n';
                }
            }
            let num = 1;
            for( let fk in this.fks ) {
                if( !this.isMany2One() ) {
                    var parent = this.fks[fk];
                    var ref = parent;
                    var col = fk;
                    if( col == null )
                        col = singular(ref)+'_id';
                    if( num == 1 )    
                        ret += '-- table index\n';
                    ret += 'create index '+objName+'_i'+(num++)+' on '+objName+' ('+col+');\n\n';
                } else {

                }
            }
 
            let cut = this.getOptionValue('pk');
            if( cut /*!= null*/ ) {
                ret += 'alter table '+objName+' add constraint '+objName+'_pk primary key ('+cut+');\n\n';
            }

            cut = this.getOptionValue('unique');
            if( cut == null )
                cut = this.getOptionValue('uk');
            if( cut != null ) {
                ret += 'alter table '+objName+' add constraint '+objName+'_uk unique ('+cut+');\n\n';
            }

            //var j = 1;
            for( let i = 0; i < this.children.length; i++ ) {
                var child = this.children[i];
                if( child.isOption('idx') || child.isOption('index')  ) {
                    if( num == 1 )    
                        ret += '-- table index\n';
                    ret += 'create index '+objName+'_i'+(num++)+' on '+objName+' ('+child.parseName()+');\n'; 
                }
            }
            
            if( this.comment != null )
                ret += 'comment on table '+objName+' is \''+this.comment+'\';\n';
            for( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                if( child.comment != null && child.children.length == 0 )
                    ret += 'comment on column '+objName+'.'+child.parseName()+' is \''+child.comment+'\';\n';
            }
            ret += '\n';
            
            return ret;
        };

        this.toDDL = function() {
            if (this.parseType() == 'view' || this.parseType() == 'dv' ) 
                return ''; 

            var tables = this.orderedTableNodes();
            let ret = '';
            for( let i = 0; i < tables.length; i++ ) {
                ret += tables[i].singleDDL();
            }
            return ret;
        } 

        this.orderedTableNodes = function() {
            var ret = [this,];
            const descendants = this.descendants();
            for( let i = 1; i < descendants.length; i++ ) {
                var desc = descendants[i];
                if( 0 == desc.children.length ) 
                    continue;
                if( desc.isMany2One() ) {
                    if( !desc.isContainedIn(ret) )
                        ret.unshift(desc);
                } else if( !desc.isContainedIn(ret) )
                    ret.push(desc);
            }
            return ret;
        }
        
        this.isContainedIn = function( nodes ) {
            for( const i in nodes ) 
                if( nodes[i].parseName() == this.parseName() )
                    return true;
            return false;    
        }

        this.generateDrop = function() {
            let objName = ddl.objPrefix()  + this.parseName();
            let ret = '';
            if( this.parseType() == 'view' ) 
                ret = 'drop view '+objName+';\n';
            if( this.parseType() == 'table' ) {
                ret = 'drop table '+objName+' cascade constraints;\n';
                if( ddl.optionEQvalue('api','yes') )
                    ret+= 'drop package '+objName+'_api;\n';
                if( ddl.optionEQvalue('pk','SEQ') )
                    ret+= 'drop sequence '+objName+'_seq;\n';
            }
            return ret.toLowerCase();
        };

        this.generateView = function() {
            if( this.parseType() != 'view' && this.parseType() != 'dv' ) 
                return '';

            if( ddl.optionEQvalue('Duality View','yes') || this.parseType() == 'dv' ) {
                try {
                    return this.generateDualityView();
                } catch ( e ) {
                    if( e.message == this.one2many2oneUnsupoported  )
                        return '';
                    throw e;
                }
            }
            let objName = ddl.objPrefix()  + this.parseName();
            var chunks = this.src;
            var ret = 'create or replace view ' +objName+ ' as\n';
            ret += 'select\n';
            var maxLen = 0;
            for( var i = 2; i < chunks.length; i++ ) { 
                let tbl = ddl.find(chunks[i].value);
                if( tbl == null )
                    return '';
                var len = (chunks[i].value+'.id').length;
                if( maxLen < len )
                    maxLen = len;
                for( var j = 0; j < tbl.children.length; j++ ) {
                    var child = tbl.children[j];
                    len = (chunks[i].value+'.'+child.parseName()).length;
                    if( maxLen < len )
                        maxLen = len;
                }
            }
            var colCnts = {};
            for( let i = 2; i < chunks.length; i++ ) { 
                let tbl = ddl.find(chunks[i].value);
                if( tbl == null )
                    continue;
                for( let j = 0; j < tbl.children.length; j++ ) {
                    let child = tbl.children[j];
                    var col = child.parseName();
                    var cnt = colCnts[col];
                    if( cnt == null )
                        cnt = 0;
                    colCnts[col] = cnt+1;	
                }
            }
            for( let i = 2; i < chunks.length; i++ ) { 
                let tbl = ddl.find(chunks[i].value);
                if( tbl == null )
                    continue;
                let pad = ' '.repeat(maxLen - (chunks[i].value+'.id').length);
                ret += tab + chunks[i].value+'.id'+tab+pad+singular(chunks[i].value)+'_id,\n';
                for( let j = 0; j < tbl.children.length; j++ ) {
                    let child = tbl.children[j];
                    if( 0 == child.children.length ) {
                        pad = ' '.repeat(maxLen - (chunks[i].value+'.'+child.parseName()).length);
                        var disambiguator = '';
                        if( 1< colCnts[child.parseName()] )
                            disambiguator = singular(chunks[i].value)+'_';
                        ret += tab + chunks[i].value+'.'+child.parseName()+tab+pad+disambiguator+child.parseName()+',\n';
                    }
                }
                if( ddl.optionEQvalue('rowVersion','yes') || tbl.isOption('rowversion') ) {
                    let pad = tab+' '.repeat(tbl.maxChildNameLen() - 'row_version'.length);
                    ret += tab + chunks[i].value+'.'+ 'row_version' + singular(pad + chunks[i].value)+'_'+ 'row_version,\n';              	
                }            	
                if( ddl.optionEQvalue('rowkey','yes') || tbl.isOption('rowkey') ) {
                    let pad = tab+' '.repeat(tbl.maxChildNameLen() - 'ROW_KEY'.length);
                    ret += tab + chunks[i].value+'.'+ 'ROW_KEY' + singular(pad + chunks[i].value)+'_'+ 'ROW_KEY,\n';              	
                }            	
                if( ddl.optionEQvalue('Audit Columns','yes') || tbl.isOption('auditcols') 
                   || tbl.isOption('audit','col') || tbl.isOption('audit','cols') || tbl.isOption('audit','columns') ) {
                    let created = ddl.getOptionValue('createdcol');
                    let pad = tab+' '.repeat(tbl.maxChildNameLen() - created.length);
                    ret += tab + chunks[i].value+'.'+  created + singular(pad + chunks[i].value)+'_'+ created+',\n';  
                    let createdby = ddl.getOptionValue('createdbycol');
                    pad = tab+' '.repeat(tbl.maxChildNameLen() - createdby.length);
                    ret += tab + chunks[i].value+'.'+  createdby + singular(pad + chunks[i].value)+'_'+  createdby+',\n';  
                    let updated = ddl.getOptionValue('updatedcol');
                    pad = tab+' '.repeat(tbl.maxChildNameLen() - updated.length);
                    ret += tab + chunks[i].value+'.'+  updated + singular(pad + chunks[i].value)+'_'+  updated+',\n';  
                    let updatedby = ddl.getOptionValue('updatedbycol');
                    pad = tab+' '.repeat(tbl.maxChildNameLen() - updatedby.length);
                    ret += tab + chunks[i].value+'.'+  updatedby + singular(pad + chunks[i].value)+'_'+ updatedby + ',\n';  
                }            	
            }
            if( ret.lastIndexOf(',\n') == ret.length-2 )
                ret = ret.substr(0,ret.length-2)+'\n';
            ret += 'from\n'; 
            for( let i = 2; i < chunks.length; i++ ) {
                let pad = ' '.repeat(maxLen - chunks[i].length);
                var tbl = chunks[i].value;
                if( ddl.objPrefix() != null && ddl.objPrefix() != '' )
                    tbl = ddl.objPrefix()+chunks[i].value + pad + chunks[i].value;
                ret += tab + tbl + ',\n';
            }
            if( ret.lastIndexOf(',\n') == ret.length-2 )
                ret = ret.substr(0,ret.length-2)+'\n';
            ret += 'where\n'; 
            for( let i = 2; i < chunks.length; i++ )  
                for( let j = 2; j < chunks.length; j++ ) {
                    if( j == i )
                        continue;
                    var nameA = chunks[i].value;
                    var nameB = chunks[j].value;
                    var nodeA = ddl.find(nameA);
                    if( nodeA == null )
                        continue;
                    var nodeB = ddl.find(nameB);
                    if( nodeB == null )
                        continue;
                    for( var k in nodeA.fks ) {
                        var parent = nodeA.fks[k];
                        if( parent == nameB) {
                            ret += tab + nameA+'.'+singular(parent)+'_id(+) = ' +nameB+'.id and\n';
                        }
                    }
                }
            ret = ret.toLowerCase();
            let postfix =  'where\n';   
            if( 0 < ret.indexOf(postfix) && ret.indexOf(postfix) == ret.length-postfix.length )
                ret = ret.substring(0, ret.length-postfix.length).trim();           
            postfix =  'and\n';   
            if( 0 < ret.indexOf(postfix) && ret.indexOf(postfix) == ret.length-postfix.length )
                ret = ret.substring(0, ret.length-postfix.length).trim(); 
            if( !ret.endsWith('/n') )
                ret += '\n';         
            ret += '/\n'; 
            return ret.toLowerCase();
        };

        this.restEnable = function() {
            if( this.parseType() != 'table' ) 
                return '';
            if( !this.isOption('rest') ) 
                return '';
            let name = this.parseName();
            const isQuoted = 0 == name.indexOf('"');
            let objName = ddl.objPrefix()  + name;
            if( isQuoted )
                objName = ddl.objPrefix()  + name.substring(1, name.length-1);
            else
                objName = (ddl.objPrefix()  + name).toUpperCase();
            return "begin\n" 
                    + tab + "ords.enable_object(p_enabled=>TRUE, p_object=>'"+objName+"');\n"
                    + "end;\n/\n"
            ;
        }


        this.generateTrigger = function() {
            if( this.parseType() != 'table' ) 
                return '';
            let editionable = '';
            if( ddl.optionEQvalue('editionable','yes') )
                editionable = ' editionable';
            let objName = ddl.objPrefix()  + this.parseName();
            var ret = 'create or replace'+editionable+' trigger '+ objName.toLowerCase() +'_BIU\n'.toLowerCase();
            ret += '    before insert or update\n'; 
            ret += '    on '+ objName.toLowerCase() +'\n';
            ret += '    for each row\n';

           if( ddl.optionEQvalue('rowkey','yes') || this.isOption('rowkey') )  {
                ret += `declare
    function compress_int (n in integer ) return varchar2
    as
        ret       varchar2(30);
        quotient  integer;
        remainder integer;
        digit     char(1);
    begin
        ret := null; quotient := n;
        while quotient > 0
        loop
            remainder := mod(quotient, 10 + 26);
            quotient := floor(quotient  / (10 + 26));
            if remainder < 26 then
                digit := chr(ascii('A') + remainder);
            else
                digit := chr(ascii('0') + remainder - 26);
            end if;
            ret := digit || ret;
        end loop ;
        if length(ret) < 5 then ret := lpad(ret, 4, 'A'); end if ;
        return upper(ret);
    end compress_int;
`           ;}

            ret += 'begin\n';
            var OK = false;
            var user = 'user';
            if( ddl.optionEQvalue('apex','yes') ) {
                user = 'coalesce(sys_context(\'APEX$SESSION\',\'APP_USER\'),user)';
            }
            if( ddl.optionEQvalue('rowkey','yes') || this.isOption('rowkey') )  {
                ret += '    if inserting then\n';
                ret += '        :new.row_key := compress_int(row_key_seq.nextval);\n';
                ret += '    end if;\n';
                OK = true;
            }
            for( var i = 0; i < this.children.length; i++ ) {
                var child = this.children[i]; 
                let method = null;
                if( 0 < child.content.indexOf('/lower') ) 
                    method = 'LOWER'.toLowerCase();
                else if( 0 < child.content.indexOf('/upper') ) 
                    method = 'UPPER'.toLowerCase();
                if( method == null )
                    continue;
                ret += '    :new.'+child.parseName().toLowerCase()+' := '+method+'(:new.'+child.parseName().toLowerCase()+');\n';
                OK = true;
            }
            if( ddl.optionEQvalue('Row Version Number','yes') || this.isOption('rowversion') )  {
                ret += '    if inserting then\n';
                ret += '        :new.row_version := 1;\n';
                ret += '    elsif updating then\n';
                ret += '        :new.row_version := NVL(:old.row_version, 0) + 1;\n';
                ret += '    end if;\n';
                OK = true;
            }
            if( ddl.optionEQvalue('Audit Columns','yes') || this.isOption('auditcols') || this.isOption('audit','col') || this.isOption('audit','cols') || this.isOption('audit','columns') ) {
                ret += '    if inserting then\n';
                ret += '        :new.'+ddl.getOptionValue('createdcol')+' := SYSDATE;\n'.toLowerCase();
                ret += '        :new.'+ddl.getOptionValue('createdbycol')+' := '+user+';\n'.toLowerCase();
                ret += '    end if;\n';
                ret += '    :new.'+ddl.getOptionValue('updatedcol')+' := SYSDATE;\n'.toLowerCase();
                ret += '    :new.'+ddl.getOptionValue('updatedbycol')+' := '+user+';\n'.toLowerCase();
                OK = true;
            }
            /*if( ddl.optionEQvalue('genpk','yes') perhaps 'no'?
                && ddl.optionEQvalue('pk','guid')  
            )  {
                ret += '    if :new.id is null then\n';
                ret += '        :new.id := to_number(sys_guid(), \'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\');\n';
                ret += '    end if;\n';
                OK = true;
            }*/
            var cols = ddl.additionalColumns();
            for( var col in cols ) {
                var type = cols[col];
                ret += '    if :new.'+col+' is null then\n';
                if( type.startsWith('INT') )
                    ret += '        '+col+' := 0;\n';
                else
                    ret += '        '+col+' := \'N/A\';\n';
                ret += '    end if;\n';
                OK = true;
            }
            if( !OK )
                return '';
            ret += 'end ' + objName .toLowerCase()+ '_BIU;\n/\n\n'.toLowerCase();
            return ret;
        };


        this.procDecl = function( kind /* get, insert, update */ ) {
            let modifier = '';
            if( kind != 'get' )
                modifier = ' default null';
            let mode = 'out';
            if( kind != 'get' )
                mode = ' in';
            let ret =  tab+'procedure '+kind+'_row (\n'; 
            let idColName = this.getGenIdColName();
            if( idColName == null ) {
                idColName = this.getExplicitPkName();
            }
            ret += tab+tab+'p_'+idColName+'        in  number'+modifier;
            for( var fk in this.fks ) {	
                let parent = this.fks[fk];				
                let type = 'number';
                let refNode = ddl.find(parent);
                if( refNode != null && refNode.getExplicitPkName() != null )
                    type = refNode.getPkType();
                //pad = tab+tab+' '.repeat(this.maxChildNameLen() - fk.length);
                ret += ',\n';
                ret += tab+tab+'P_'+fk+'   '+mode+'  '+type+modifier;
            }
            for( let i = 0; i < this.children.length; i++ ) {
                var child = this.children[i]; 
                if( child.refId() != null  )
                    continue;
                if( child.children.length != 0 ) 
                    continue;
                ret += ',\n';
                ret += tab+tab+'P_'+child.parseName()+'   '+mode+'  '+child.parseType('plsql')+modifier;
            }
            ret += '\n    )';
            return ret;
        };
        this.procBody = function( kind /* get, insert, update */ ) {
            let idColName = this.getGenIdColName();
            if( idColName == null ) {
                idColName = this.getExplicitPkName();
            }
            let objName = ddl.objPrefix()  + this.parseName();
            let ret =    tab+'is \n';
            ret +=    tab+'begin \n';
            let prelude =    tab+tab+'for c1 in (select * from '+objName+' where '+idColName+' = p_'+idColName+') loop \n';
            if( kind == 'insert' ) {
                prelude =    tab+tab+'insert into '+objName+' ( \n';
                prelude += tab+tab+tab+idColName;
            }
            if( kind == 'update' ) {
                prelude =    tab+tab+'update  '+objName+' set \n';
                prelude += tab+tab+tab+idColName+' = p_'+idColName;
            }
            ret += prelude;
            for( let fk in this.fks ) {	
                let parent = this.fks[fk];				
                let type = 'number';
                let refNode = ddl.find(parent);
                if( refNode != null && refNode.getExplicitPkName() != null )
                    type = refNode.getPkType();
                //pad = tab+tab+' '.repeat(this.maxChildNameLen() - fk.length);
                if( kind == 'insert' || kind == 'update' ) 
                    ret += ',\n';
                let row = tab+tab+tab+'P_'+fk+' := c1.'+fk+';\n';	
                if( kind == 'insert' ) 
                    row = tab+tab+tab+fk;
                if( kind == 'update' ) 
                    row = tab+tab+tab+fk+' = P_'+fk;	
                ret += row;
            }
            for( var i = 0; i < this.children.length; i++ ) {
                var child = this.children[i]; 
                if( child.refId() != null  )
                    continue;
                if( child.children.length != 0 ) 
                    continue;
                if( kind == 'insert' || kind == 'update' ) 
                    ret += ',\n';
                let row = tab+tab+tab+'P_'+child.parseName().toLowerCase()+' := c1.'+child.parseName().toLowerCase()+';\n';	
                if( kind == 'insert' ) 
                    row = tab+tab+tab+child.parseName().toLowerCase();
                if( kind == 'update' ) 
                    row = tab+tab+tab+child.parseName().toLowerCase()+' = P_'+child.parseName().toLowerCase();	
                ret += row;
            }
            if( kind == 'insert' ) {
                ret +=    '\n'+tab+tab+') values ( \n';
                ret +=    tab+tab+tab+'p_'+idColName;
                for( let fk in this.fks ) {	
                    ret += ',\n';
                    ret += tab+tab+tab+'p_'+fk;
                }
                for( let i = 0; i < this.children.length; i++ ) {
                    let child = this.children[i]; 
                    if (child.refId() != null  )
                        continue;
                    if( child.children.length != 0 ) 
                        continue;
                    ret += ',\n';
                    ret += tab+tab+tab+'p_'+child.parseName();
                }
            }
            let finale = '\n        end loop;\n';
            if( kind == 'insert' )
                finale = '\n'+tab+tab+');';
            if( kind == 'update' )
                finale = '\n'+tab+tab+'where '+idColName+' = p_'+idColName+';';
            ret += finale;
            ret += '\n'+tab+'end '+kind+'_row;\n ';
            ret += '\n ';
            return ret;
        };
        this.generateTAPI = function() {
            if( this.children.length == 0 ) 
                return '';
            let objName = ddl.objPrefix()  + this.parseName();
            var ret = 'create or replace package '+ objName.toLowerCase() +'_API\nis\n\n'.toLowerCase();
            ret += this.procDecl('get'); 
            ret += ';\n\n';
            ret += this.procDecl('insert'); 
            ret += ';\n\n';
            ret += this.procDecl('update'); 
            ret += ';\n\n';
            let idColName = this.getGenIdColName();
            if( idColName == null ) {
                idColName = this.getExplicitPkName();
            }
            ret += '    procedure delete_row (\n'+
                '        p_'+idColName+'              in number\n'+
                '    );\n'+
                'end '+objName.toLowerCase()+'_api;\n'+
                '/\n\n';
            ret += 'create or replace package body '+ objName.toLowerCase() +'_API\nis\n\n'.toLowerCase();
            ret += this.procDecl('get'); 
            ret += '\n';
            ret += this.procBody('get');

            ret += this.procDecl('insert'); 
            ret += '\n';
            ret += this.procBody('insert'); 

            ret += this.procDecl('update'); 
            ret += '\n';
            ret += this.procBody('update'); 

            ret += '    procedure delete_row (\n';
            ret += '        p_'+idColName+'              in number\n';
            ret += '    )\n';
            ret += '    is\n';
            ret += '    begin\n';
            ret += '        delete from '+objName.toLowerCase()+' where '+idColName+' = p_'+idColName+';\n';
            ret += '    end delete_row;\n';
            ret += 'end '+objName.toLowerCase()+'_api;\n';
            ret += '/\n';
            return ret.toLowerCase();
        };

        this.cardinality = function() {
            let start = this.isOption('insert');
            if( 0 < start ) {
                const pos = this.indexOf('insert');
                let ret =  parseInt(this.src[pos+1].value);
                const limit = ddl.getOptionValue('datalimit');
                if( limit < ret )
                    ret = limit;
                return ret;
            }
            return 0;
        }

        this.generateData = function( dataObj ) {
            resetSeed();
            if( ddl.optionEQvalue('inserts',false) )
                return '';
            const tab2inserts = this.inserts4tbl(dataObj);
            const tables = this.orderedTableNodes();
            let ret = '';
            for( let i = 0; i < tables.length; i++ ) {
                const objName = ddl.objPrefix()  + tables[i].parseName();
                const inserts = tab2inserts[objName];
                if( inserts != null )
                    ret += inserts;
            }
            return ret;
        }
            
        this.inserts4tbl = function( dataObj ) {

            let tab2inserts = {};

            if( ddl.optionEQvalue('inserts',false) )
                return '';
            
            const objName = ddl.objPrefix()  + this.parseName();
            let insert = '';

            let pkName = null;
            let pkValue = null;

            for( let i = 0; i < this.cardinality(); i++ ) {
                let elem = null;
                if( dataObj != null ) {
                    const tbl = dataObj[objName];
                    if( tbl != null && Array.isArray(tbl) ) {
                        const record = tbl[i];
                        elem = record;
                    }
                }

                insert += 'insert into '+objName+' (\n';
                    
                let idColName = this.getGenIdColName();
                if( idColName != null ) {
                    pkName = idColName;
                    insert += tab + pkName +',\n';
                } else {
                    let pkName = this.getExplicitPkName();
                    if( pkName != null ) {
                        insert += tab + pkName +',\n';
                    }
                }
                for( let fk in this.fks ) {
                    let parent = this.fks[fk];				
                    let refNode = ddl.find(parent);
                    let _id = '';    
                    if( refNode == null ) {
                        refNode = ddl.find(fk);
                        if( refNode.isMany2One() & !fk.endsWith('_id') ) {
                            parent = fk;
                            fk = singular(fk);
                            _id = '_id';  
                        }
                    }
                    insert += tab+fk+_id+',\n';
                }
                for( let j = 0; j < this.children.length; j++ ) {
                    let child = this.children[j];
                    if( idColName != null && child.parseName() == 'id' )
                        continue;
                    if (child.refId() == null  ) {
                        if( child.isOption('pk') )
                            continue; //insert += '--';
                        if( 0 == child.children.length ) 
                            insert += tab+child.parseName()+',\n';
                    }
                }
                if( insert.lastIndexOf(',\n') == insert.length-2 )
                    insert = insert.substring(0,insert.length-2)+'\n';

                insert += ') values (\n';

                if( idColName != null ) {
                    pkValue = i+1;
                    insert += tab + pkValue + ',\n'; 
                } else {
                    let pkName = this.getExplicitPkName();
                    if( pkName != null ) {
                        const field = pkName;
                        let tmp = getValue(ddl.data, null /*no name at level 0*/, field, this.parseName());
                        let v = -1;
                        if( elem != null )
                            v = elem[field];
                        if( tmp != null && tmp[i] != null ) {
                                v = tmp[i];
                        }
                        if( v.replaceAll )
                            v = "'"+v+"'";
                        pkValue = v != -1 ? v : i+1;
                        insert += tab + pkValue + ',\n';  
                    }
                }
                
                for( let fk in this.fks ) {
                    let ref = this.fks[fk];
                    let refNode = ddl.find(ref);
                    let values = [];
                    let type = 'INTEGER';
                    for( let k = 1; k <= refNode.cardinality() ; k++ )
                        values.push(k);      
                    if( elem != null ) {
                        let refData = elem[fk];
                        if( refData != null ) {
                            if( typeof refData == 'string' )
                                type = "STRING"; // not INTEGER
                            values = [];
                            values[0] = refData;                                
                        } else {
                            const m2mTbl = objName+'_'+ref;
                            const m2mData = ddl.data[m2mTbl];
                            if( m2mData != null ) {
                                for( const i in m2mData ) {
                                    if( m2mData[i][objName+'_id'] == pkValue ) {
                                        const refData = m2mData[i][fk];
                                        if( refData != null ) {
                                            if( typeof refData == 'string' )
                                                type = "STRING"; // not INTEGER
                                            values = [];
                                            values[0] = refData;                                
                                        }       
                                        break;
                                    }
                                }   
                            } else {
                                let fk1 = refNode.getPkName();
                                let refData = elem[fk1];
                                if( refData != null ) {
                                    if( typeof refData == 'string' )
                                        type = "STRING"; // not INTEGER
                                    values = [];
                                    values[0] = refData;                                
                                }
                            }
                        }
                    } 
                    insert += tab+translate(ddl.getOptionValue('Data Language'),generateSample(objName,singular(ref)+'_id', type, values))+',\n';
                }
                for( let j = 0; j < this.children.length; j++ ) {
                    let child = this.children[j]; 
                    if( idColName != null && child.parseName() == 'id' )
                        continue;
                    if (child.refId() == null  ) {
                        if( child.parseName() == this.getExplicitPkName() )
                            continue; //insert += '--';
                        if( 0 == child.children.length )  {
                            let values = child.parseValues();
                            let cname = child.parseName();
                            if( elem != null ) {
                                let v = elem[cname];
                                if( v != null ) {
                                    values = [];
                                    values[0] = v;
                                }                                   
                            }
                            /*let tmp = getValue(ddl.data, null no name at level 0, cname, this.parseName());
                            if( tmp != null && tmp[i] != null ) {
                                values = [];
                                values[0] = tmp[i];
                            }*/
                            let datum = generateSample(objName, cname, child.parseType(pure=>true), values);
                            insert += tab + translate(ddl.getOptionValue('Data Language'), datum)+',\n';
                        }
                    }
                }
                if( insert.lastIndexOf(',\n') == insert.length-2 )
                    insert = insert.substring(0,insert.length-2)+'\n';
                insert += ');\n';
            }
 
            if( insert != '' )    
                insert += '\ncommit;\n\n';

            let idColName = this.getGenIdColName();
            if( idColName != null && 1 < this.cardinality() && !ddl.optionEQvalue('pk','guid') ) {
                insert += 'alter table '+objName+'\n'
              + 'modify '+idColName+' generated '+'always '/*'by default on null'*/+' as identity restart start with '+(this.cardinality()+1)+';\n\n';
            }

            tab2inserts[objName] = insert;
            
            for( let i = 0; i < this.children.length; i++ ) {
                const child = this.children[i]; 
                if( 0 < child.children.length ) {
                    const merged = {...tab2inserts , ...child.inserts4tbl( dataObj )};
                    tab2inserts = merged;
                }
            }

            return tab2inserts;
        };  
        
        this.isArray = function(  ) {
            /*if (this.content.includes('/array'))
                return true;
            var insert = this.content.indexOf('/insert ');
            if (0 < insert) {
                var tokens = this.content.substr(insert).split(/\s+/);
                return parseInt(tokens[1]) > 1;
            }*/
            if( !this.isMany2One() && this.parent != null )
                return true;
            return false;
        };
        this.hasNonArrayChildId = function( cname ) {
            if(!cname.endsWith('_id'))
                return false;
            var name = cname.slice(0, -3); 
            return this.children.some((c) => c.children.length > 0 &&
             c.parseName() == name && !c.isArray());
        };

        this.generateDualityView = function() {
            return '/* not supported yet*/';  
        };
        
    }

    function recognize( parsed ) {
        ddl = parsed;
        const fullInput = parsed.input;

        let path = [];
        let ret = [];

        const src = lexer(fullInput+'\n',true,true,'`');
        ddl.data = null;
        let poundDirective = null;
        let line = '';
        OUTER: for( let i = 0; i < src.length; i++ ) {
            const t = src[i];

            if( t.value == '\n' ) {
                if( poundDirective == null ) {
                    line = line.replace(/\r/g,'');
                    let nc = line.replace(/\r/g,'').replace(/ /g,'');
                    // if( /[^a-zA-Z0-9="{}\/.,_\-\[\]]/.test(nc) ) 
                    //     continue;
                    if( '' == nc ) {
                        line = '';
                        continue;
                    }
                    let node = new ddlnode(t.line-1,line,null);  // node not attached to anything        
                    let matched = false;
                    for( let j = 0; j < path.length; j++ ) {
                        let cmp = path[j];
                        if( node.apparentDepth() <= cmp.apparentDepth() ) {
                            if( 0 < j ) {
                                let parent = path[j-1];
                                node = new ddlnode(t.line-1,line,parent);  // attach node to parent
                                path[j] = node;
                                path = path.slice(0, j+1);
                                matched = true;
                                break;
                            } else {
                                path[0] = node;
                                path = path.slice(0, 1);
                                ret.push(node);
                                matched = true;
                            }
                        } 
                    }
                    if( !matched ) {
                        if( 0 < path.length ) {
                            let parent = path[path.length-1];
                            node = new ddlnode(t.line-1,line,parent);
                        }
                        path.push(node);
                        if( node.apparentDepth() == 0 )
                            ret.push(node);
                    }
                    if( node.isMany2One() ) {
                        const parent = node.parent;
                        if( parent.fks == null )
                            parent.fks = [];
                        let refId = node.refId();
                        if( refId == null )
                            refId = node.parseName();
                        parent.fks[node.parseName()+'_id'] = refId;
                    }

                    line = '';
                    continue;
                }
            }

            if( poundDirective == null && t.value == '#' ) {
                poundDirective = '';
                continue;
            }
            if( poundDirective != null ) {
                poundDirective += t.value;
                if( t.value != '\n' && t.value != '}' )
                    continue;
                const src1 = lexer(poundDirective,false,true,'');
                if( src1.length%4 == 3 && src1[1].value == ':' ) {
                    parsed.setOptions(poundDirective);
                    poundDirective = null;
                    line = '';
                    continue;
                }
                let flattened = null;
                let document = null;
                let settings = null;
                for( let j in src1 ) {
                    const t1 = src1[j];
                    if( flattened == null && t1.value == 'flattened' ) {
                        flattened = '';
                        continue;
                    }
                    if( flattened != null ) {
                        flattened += t1.value;
                        if( flattened == '=' )
                            continue;
                        if( flattened.charAt(flattened.length-1)!='}' )
                            continue;
                        let jsonStr = flattened.substring(1);
                        try {
                            ddl.data = JSON.parse(jsonStr);
                            poundDirective = null;
                            line = '';
                            continue OUTER;
                        } catch( error ) {}        
                    }
                    if( settings == null && t1.value == 'settings' ) {
                        settings = '';
                        continue;
                    }
                    if( settings != null ) {
                        settings += t1.value;
                        //if( settings == '=' )
                            //continue;
                        let jsonStr = settings.substring(1);
                        try {
                            parsed.setOptions(settings);
                            poundDirective = null;
                            line = '';
                            continue OUTER;
                        } catch( error ) {}        
                    }
                }
                //poundDirective = null;
            }
            if( t.type == 'comment' ) {
                continue;
            }
            if( t.type == 'line-comment' ) {  
                if( 0 < line.trim().length ) {
                    line += t.value;
                }
                continue;
            }
            line += t.value;
        }          
        
        return ret;
    }


    function getValue( obj, oName, attr, oName2Match ) {
        let ret =  [];
        if( obj == null )
            return null;
        if( typeof obj != 'object' )
            return null;
        let tmp = obj[attr];
        if( tmp != null && oName == oName2Match ) {
            ret.push(tmp); 
        }
        for( var p in obj ) {
            let child = obj[p];
            tmp = getValue(child, p, attr, oName2Match);
            if( tmp != null )
                ret = ret.concat(tmp);
        }
        return ret;
    }

    return recognize;
}());

export default tree;
