import {singular,concatNames,canonicalObjectName} from './naming.js';
import translate from './translate.js';
import {generateSample, resetSeed} from './sample.js';
import lexer from './lexer.js';
import amend_reserved_word from './reserved_words.js';

let tree = (function(){ 
    let ddl;
    let tab= '    ';
    let stringTypes = ['string', 'varchar2', 'varchar', 'vc' , 'char'];
    var boolTypes = ['yn', 'boolean', 'bool', ];
    /**
     * Node in QSQL tree defining a Table, a Column, a View, or an Option
     * @param lineNo  -- line number
     * @param {*} inputLine -- QSQL line
     * @param {*} parent -- reference to parent node (if any)
     */
    function ddlnode( lineNo, inputLine, parent ) {
        this.line = lineNo;
        /*this.y = function() {
            if( this.children.length == 0 )
                return this.x+1;
            else
                return this.children[this.children.length-1].y();
        };*/
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
            var tmp = this.trimmedContent().toUpperCase();
            if( ddl.optionEQvalue('rowkey',true) || 0 < tmp.indexOf('/ROWKEY') )
                maxLen = 'row_key'.length;
            if( ddl.optionEQvalue('Row Version Number','yes') || 0 < tmp.indexOf('/ROWVERSION') )
                maxLen = 'row_version'.length;
            if( ddl.optionEQvalue('Audit Columns','yes') || 0 < tmp.indexOf('/AUDITCOLS') || 0 < tmp.indexOf('/AUDIT COL') ) {
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

        this.src = lexer( this.content/*.toLowerCase()*/, false, true, '' ); 
         
        this.parseName = function () {            
            
            let rEt = this.trimmedContent();
            rEt = rEt.replace(/\t/,tab);
            const  qtBegin = rEt.indexOf('"');
            const  qtEnd = rEt.indexOf('"', qtBegin+1);
            if( 0 <= qtBegin && qtBegin < qtEnd )
                return rEt.substring(qtBegin, qtEnd+1);

            if( 0 == rEt.indexOf('>') || 0 == rEt.indexOf('<') ) 
                rEt = rEt.substring(1).trim();   

            const ret = rEt.toLowerCase();

            if( 0 == ret.indexOf('view ') ) {
                var chunks = rEt.split(' ');
                return chunks[1];
            }
            rEt = replaceTrailing(rEt,' d');
            var pos = rEt.indexOf('/');
            if( 0 < pos )
                rEt = rEt.substring(0,pos);
            rEt = rEt.trim();
            rEt = replaceTrailing(rEt,' integer');
            rEt = replaceTrailing(rEt,' number');
            rEt = replaceTrailing(rEt,' int');
            rEt = replaceTrailing(rEt,' num');
            rEt = replaceTrailing(rEt,' clob');
            rEt = replaceTrailing(rEt,' blob');
            rEt = replaceTrailing(rEt,' json');
            rEt = replaceTrailing(rEt,' file');
            rEt = replaceTrailing(rEt,' date');
            rEt = replaceTrailing(rEt,' tstz');
            rEt = replaceTrailing(rEt,' tswtz');
            rEt = replaceTrailing(rEt,' tswltz');
            rEt = replaceTrailing(rEt,' ts');
            rEt = rEt.replace(/ vc\d+k/g,'');
            rEt = rEt.replace(/ vc\(\d+\)/g,'');
            rEt = rEt.replace(/ vc\d+/g,'');
            //rEt = rEt.replace(/ VC/g,'');
            for( let i in stringTypes ) {
                let pos = ret.indexOf(' '+stringTypes[i]);
                if( 0 < pos ) {
                    rEt = rEt.substring(0,pos) + rEt.substring(pos+stringTypes[i].length+1);
                    break;
                }
            }
            for( let i in boolTypes ) {
                let pos = ret.indexOf(' '+boolTypes[i]);
                if( 0 < pos ) {
                    rEt = rEt.substring(0,pos) + rEt.substring(pos+boolTypes[i].length+1);
                    break;
                }
            }
            rEt = rEt.replace(/ num(ber)?\(\d+\)/g,'');
            rEt = rEt.replace(/ num(ber)?\(\d+,\d+\)/g,'');
            rEt = rEt.replace(/ num(ber)?\d+/g,'');
            rEt = rEt.trim();
            //if( prefix == undefined )
                if( 0 == this.children.length ) {   // switched to this comparison style because accidental typo this.children.length = 0 is disastrous!
                    if( this.parent != undefined && this.parent.colprefix != undefined )
                        rEt = this.parent.colprefix+'_' + rEt;        		
                } else {
                    //rEt = ddl.objPrefix() + rEt;
                }
            var c = rEt.substr(0,1);
            if (c >= '0' && c <= '9') {
                rEt = 'x'+rEt;
            } 
            return amend_reserved_word(canonicalObjectName(rEt));
        };
        this.parseType = function( pure ) {
            if( this.children != null && 0 < this.children.length )
                return 'table';

            const src = this.src;    

            if( src[0].value == 'view' ) 
                return 'view';
            if( src[0].value == 'dv' ) 
                return 'dv';
                        
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
            if( 0 < this.indexOf('int', true) ) 
                ret = 'integer';

            if( 0 < vcPos ) {
                ret = 'varchar2('+len+char+')';
                if( pure == 'plsql' )
                    ret = 'varchar2';
            }

            const parent_child = concatNames(parent.parseName(),'_',this.parseName());

            if( src[0].value.endsWith('_yn') || src[0].value.startsWith('is_') ) {
                ret = 'varchar2(1 char) constraint '+concatNames(ddl.objPrefix(),parent_child)+'\n';
                ret += tab +  tab+' '.repeat(parent.maxChildNameLen()) +'check ('+this.parseName()+" in ('Y','N'))";
            }
            for( let i in boolTypes ) {
                let pos = this.indexOf(boolTypes[i]);
                if( 0 < pos ) {
                    ret = 'varchar2(1 char) constraint '+concatNames(ddl.objPrefix(),parent_child)+'\n';
                    ret += tab +  tab+' '.repeat(parent.maxChildNameLen()) +'check ('+this.parseName()+" in ('Y','N'))";
                    break;
                }
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
                if( 0 < this.indexOf('clob')   ) 
                    ret = 'clob';
                if( 0 < this.indexOf('blob') || 0 <  this.indexOf('file') ) 
                    ret = 'blob';
                if( 0 < this.indexOf('json') ) 
                    ret = 'clob check ('+this.parseName()+' is json)';
            }

            if( 0 < this.indexOf('tswltz')  ) 
                ret = 'TIMESTAMP WITH LOCAL TIME ZONE'.toLowerCase();
            else if( 0 < this.indexOf('tswtz') || 0 < this.indexOf('tstz') ) 
                ret = 'TIMESTAMP WITH TIME ZONE'.toLowerCase();
            else if( 0 < this.indexOf('ts') ) 
                ret = 'TIMESTAMP'.toLowerCase();

            if( pure ) {
                if( 0 < this.indexOf('fk') || 0 < this.indexOf('reference', true) ) {
                    const parent = this.refId();
                    let type = 'number';
                    if( ret == 'integer' )
                        type = ret;
                    let refNode = ddl.find(parent);
                    if( refNode != null && refNode.getExplicitPkNode() != null )
                        type = refNode.getExplicitPkNode().parseType(pure=>true);
                    return type;
                }     
                return ret;
            }	


            if( 0 < this.indexOf('unique') ) {
                ret += '\n';  
                ret += tab +  tab+' '.repeat(parent.maxChildNameLen()) +'constraint '+parent_child+'_unq unique';
            } 
            var optQuote = '\'';
            if(  ret.startsWith('integer') || ret.startsWith('number') || ret.startsWith('date')  ) 
                optQuote = '';
            if( 0 < this.indexOf('default') ) {
                const value = src[this.indexOf('default')+1].value;
                ret +=' default '+'on null ' + optQuote+value+optQuote ;
            }
            if( 0 < this.indexOf('nn') || this.indexOf('not')+1== this.indexOf('null') )
                if( this.indexOf('pk') < 0 ) 
                    ret += ' not null';
            if( 0 < this.indexOf('hidden') || 0 < this.indexOf('invincible') ) 
                ret += ' invisible';
            ret += this.genConstraint(optQuote);
            if( 0 < this.indexOf('between') ) {
                const bi = this.indexOf('between');
                const values = src[bi+1].value + ' and ' + src[bi+3].value;
                ret +=' constraint '+concatNames(parent_child,'_bet')+'\n';
                ret +='           check ('+this.parseName()+' between '+values+')';        		
            }
            if( 0 < this.indexOf('pk') ) {
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
            if( 0 < this.indexOf('check') ) {
                let parentPref = '';
                if( parent != null )
                    parentPref = parent.parseName()+'_';
                const parent_child = concatNames(parentPref,this.parseName());
                const tmp = this.trimmedContent().toLowerCase();
                const start = tmp.indexOf('/check');
                let end = tmp.lastIndexOf('/');
                if( end == start)
                    end = tmp.length;
                let values = this.trimmedContent().substr(start+'/check'.length, end-start-'/check'.length).trim();
                const srcConstr = lexer( values, false, true, '' ); 
                let offset = tab;
                if( parent != null )
                    offset = ' '.repeat(parent.maxChildNameLen());
                if( this.children != null && 0 < this.children.length  ) {  // table level
                    if( srcConstr[0].value != '(' )
                        values = '( ' + values + ')';
                    ret += tab + 'constraint '+concatNames(ddl.objPrefix(),parent_child,'_ck');
                    ret += '  check '+values+',\n';    
                } else  if( srcConstr[0].value == '(' && srcConstr[srcConstr.length-1].value == ')'  ) {  
                    ret +=' constraint '+concatNames(ddl.objPrefix(),parent_child,'_ck')+'\n';
                    ret += tab +  tab+offset +'check '+values;    
                } else {
                    if( 0 < values.indexOf(', ') )
                        values = values.replace(/, /g,optQuote+','+optQuote);
                    else if( 0 < values.indexOf(',') )
                        values = values.replace(/,/g,optQuote+','+optQuote);
                    else	
                        values = values.replace(/ /g,optQuote+','+optQuote);
                    ret +=' constraint '+concatNames(ddl.objPrefix(),parent_child,'_ck')+'\n';
                    ret += tab +  tab+offset +'check ('+this.parseName()+' in ('+optQuote+values+optQuote+'))';    
                    ret = ret.replace(/''/gm,"'");    
                }
    		
            }
            return ret;
        }

        this.isMany2One = function() {
            var tmp = this.trimmedContent();
            var pos = tmp.indexOf('>');
            if( 0 == pos )
                return true;
            return false;
        };
        
        this.getExplicitPkNode = function() {
            for( var i = 0; i < this.children.length; i++ ) {
                var child = this.children[i];
                var tmp = child.trimmedContent().toLowerCase();
                if( 0 < tmp.indexOf('/pk') )
                    return child;
            }
            return null;
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
                return tmp.replace(' ','_');
            }
            return null;
        };

        this.parseValues = function() {
            var tmp = this.trimmedContent().toUpperCase();
            var start;
            var end;
            var values;
            if( 0 <= tmp.indexOf('/CHECK') || 0 <= tmp.indexOf('/VALUES') ) {
                var substr = '/CHECK';
                start = tmp.indexOf(substr);
                if( start < 0 ) {
                    substr = '/VALUES';
                    start = tmp.indexOf(substr);  
                }
                end = tmp.lastIndexOf('/');
                if( end == start)
                    end = tmp.length;
                values = tmp.substr(start+substr.length, end-start-substr.length).trim();
                if( 0 < values.indexOf(',') ) {
                    values = values.replace(/ /g,'');
                    return values.split(',');
                } else
                    return values.split(' ');
            }
            if( 0 <= tmp.indexOf('/BETWEEN') ) {
                start = tmp.indexOf('/BETWEEN');
                end = tmp.lastIndexOf('/');
                if( end == start)
                    end = tmp.length;
                values = tmp.substr(start+'/BETWEEN'.length, end-start-'/BETWEEN'.length).trim();
                values = values.replace(' AND ',' ');
                var ret = [];
                for( var i = parseInt(values.split(' ')[0]); i <= parseInt(values.split(' ')[1]) ; i++ )
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
            let ret = this.getExplicitPkNode();
            if( ret != null )
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
                let pkn = this.getExplicitPkNode();
                if( pkn == null )
                    return null;
                return pkn.parseName();
            }
            return id;
        }

        this.singleDDL = function() {
            
            if( this.children.length == 0 && 0 < this.apparentDepth() ) {
                let pad = tab;
                if( this.parent != undefined )
                    pad += ' '.repeat(this.parent.maxChildNameLen() - this.parseName().length);
                return this.parseName()+pad+this.parseType();
            }

            if( this.fks == null ) {
                this.fks = [];
            }


            if( !this.isMany2One() ) {
                if( this.parent != null && this.parseType() == 'table' )
                    this.fks[singular(this.parent.parseName())+'_id']=this.parent.parseName();
                    //this.fks[singular(this.parent.getPkName())]=this.parent.parseName();
                for( let i = 0; i < this.children.length; i++ ) 
                    if( this.children[i].refId() != null ) {
                        this.fks[this.children[i].parseName()]=this.children[i].refId();
                    }
            } //...else   -- too lae to do here, performed earlier, during recognize()
            

            const nodeContent = this.trimmedContent().toUpperCase();
            var colPrefPos = nodeContent.indexOf('/COLPREFIX ');
            if( 0 < colPrefPos ) {
                let cut = nodeContent.substr(colPrefPos+'/COLPREFIX '.length);
                let cuts = cut.split(' ');
                this.colprefix= cuts[0];
            }

            //var indexedColumns = [];
            var ret = '';

            const objName = ddl.objPrefix()  + this.parseName();
            if( ddl.optionEQvalue('pk', 'SEQ') && ddl.optionEQvalue('genpk', true) ) {
                ret =  ret + 'create sequence  '+objName+'_seq;\n\n';                
            }

            ret =  ret + 'create table '+objName+' (\n';
            var pad = tab+' '.repeat(this.maxChildNameLen() - 'ID'.length);

            let idColName = this.getGenIdColName();
            if( idColName != null ) {
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
                let pkNode = this.getExplicitPkNode();
                if( pkNode != null ) {
                    let pad = tab + ' '.repeat(this.maxChildNameLen() - pkNode.parseName().length);
                    ret += tab +  pkNode.parseName() + pad + pkNode.parseType() + ',\n';
                }
            }
 
            for( let fk in this.fks ) {	
                let parent = this.fks[fk];	
                let type = 'number';
                const attr = this.findChild(fk);
                if( attr != null )
                    type = attr.parseType('fk');		
                let refNode = ddl.find(parent);
                let _id = '';    
                if( refNode != null && refNode.getExplicitPkNode() != null )
                    type = refNode.getExplicitPkNode().parseType(pure=>true);
                else if( refNode == null ) {
                    refNode = ddl.find(fk);
                    if( refNode.isMany2One() & !fk.endsWith('_id') ) {
                        parent = fk;
                        fk = singular(fk);
                        _id = '_id';  
                    }
                }
                pad = tab+' '.repeat(this.maxChildNameLen() - fk.length);
                ret += tab + fk + _id  + pad + type + '\n';  
                ret += tab + tab+' '.repeat(this.maxChildNameLen()) + 'constraint '+objName+'_'+fk+'_fk\n';
                let onDelete = '';
                if( 0 <= nodeContent.indexOf('/CASCADE')) 
                    onDelete = ' on delete cascade';
                let	notNull = '';
                for( let c in this.children ) {
                    let child = this.children[c];
                    if( fk == child.parseName() )  {
                        let tmp = child.trimmedContent().toUpperCase();
                        if( 0 <= tmp.indexOf('/NN') || 0 <= tmp.indexOf('/NOTNULL')  ) 
                            notNull = ' NOT NULL'.toLowerCase();        
                        if( 0 <= tmp.indexOf('/CASCADE')  ) 
                            onDelete = ' on delete cascade';       
                        break;
                    }
                }
                ret += tab + tab+' '.repeat(this.maxChildNameLen()) + 'references '+ddl.objPrefix()+parent+onDelete+notNull+',\n';
            }

            if( ddl.optionEQvalue('rowkey',true) || 0 < nodeContent.indexOf('/ROWKEY') ) {
                let pad = tab+' '.repeat(this.maxChildNameLen() - 'ROW_KEY'.length);
                ret += tab +  'row_key' + pad + 'varchar2(30 char)\n';              	
                ret += tab +  tab+' '.repeat(this.maxChildNameLen()) +'constraint '+objName+'_row_key_unq unique not null,\n';
            }            	

            for( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                if( idColName != null && child.parseName() == 'id' )
                    continue;
                if( 0 < child.children.length ) {
                    continue;
                }
                if (child.refId() == null  ) {
                    if( child == this.getExplicitPkNode() )
                        continue; //ret += '--';
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
            if( ddl.optionEQvalue('rowVersion','yes') || 0 < nodeContent.indexOf('/ROWVERSION') ) {
                let pad = tab+' '.repeat(this.maxChildNameLen() - 'row_version'.length);
                ret += tab +  'row_version' + pad + 'integer not null,\n';              	
            }            	
            if( ddl.optionEQvalue('Audit Columns','yes') || 0 < nodeContent.indexOf('/AUDITCOLS') || 0 < nodeContent.indexOf('/AUDIT COL')  ) {
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
            ret += ')'+(ddl.optionEQvalue('compress','yes') || 0 < nodeContent.indexOf('/COMPRESS')?' compress':'')+';\n\n';
            
            const auditPos = nodeContent.indexOf('/AUDIT');
            const auditcolsPos = nodeContent.indexOf('/AUDITCOLS');
            const auditcolPos = nodeContent.indexOf('/AUDIT COL');
            if( 0 < auditPos && auditcolsPos < 0 && auditcolPos < 0 ) {
                ret += 'audit all on '+objName+';\n\n';
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
            
            let uniquePos = nodeContent.indexOf('/UNIQUE ');
            if( 0 < uniquePos ) {
                let cut = nodeContent.substr(uniquePos+'/UNIQUE '.length);
                let endPos = cut.indexOf('/');
                if( 0 < endPos )
                    cut = cut.substring(0,endPos).trim();
                /*let cols = cut.split(',');
                for( var i = 0; i < colss.length; i++ ) { 
                    let col = cols[i].trim();
                }*/
                ret += 'alter table '+objName+' add constraint '+objName+'_uk unique ('+cut+');\n\n';
            }

            //var j = 1;
            for( let i = 0; i < this.children.length; i++ ) {
                var child = this.children[i];
                let tmp = child.trimmedContent().toUpperCase();
                if( 0 <= tmp.indexOf('/IDX') || 0 <= tmp.indexOf('/INDEX')  ) {
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
            for( let i = 1; i < this.descendants().length; i++ ) {
                var desc = this.descendants()[i];
                if( 0 == desc.children.length ) 
                    continue;
                if( desc.isMany2One() )
                    ret.unshift(desc);
                else
                    ret.push(desc);
            }
            return ret;
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
            let tmp = this.trimmedContent(); //.toLowerCase();
            var chunks = tmp.split(' ');
            var ret = 'create or replace view ' +objName+ ' as\n';
            ret += 'select\n';
            var maxLen = 0;
            for( var i = 2; i < chunks.length; i++ ) { 
                let tbl = ddl.find(chunks[i]);
                if( tbl == null )
                    return '';
                var len = (chunks[i]+'.id').length;
                if( maxLen < len )
                    maxLen = len;
                for( var j = 0; j < tbl.children.length; j++ ) {
                    var child = tbl.children[j];
                    len = (chunks[i]+'.'+child.parseName()).length;
                    if( maxLen < len )
                        maxLen = len;
                }
            }
            var colCnts = {};
            for( let i = 2; i < chunks.length; i++ ) { 
                let tbl = ddl.find(chunks[i]);
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
                let tbl = ddl.find(chunks[i]);
                if( tbl == null )
                    continue;
                let pad = ' '.repeat(maxLen - (chunks[i]+'.id').length);
                ret += tab + chunks[i]+'.id'+tab+pad+singular(chunks[i])+'_id,\n';
                for( let j = 0; j < tbl.children.length; j++ ) {
                    let child = tbl.children[j];
                    if( 0 == child.children.length ) {
                        pad = ' '.repeat(maxLen - (chunks[i]+'.'+child.parseName()).length);
                        var disambiguator = '';
                        if( 1< colCnts[child.parseName()] )
                            disambiguator = singular(chunks[i])+'_';
                        ret += tab + chunks[i]+'.'+child.parseName()+tab+pad+disambiguator+child.parseName()+',\n';
                    }
                }
                let tmp = tbl.trimmedContent().toUpperCase();
                if( ddl.optionEQvalue('rowVersion','yes') || 0 < tmp.indexOf('/ROWVERSION') ) {
                    let pad = tab+' '.repeat(tbl.maxChildNameLen() - 'row_version'.length);
                    ret += tab + chunks[i]+'.'+ 'row_version' + singular(pad + chunks[i])+'_'+ 'row_version,\n';              	
                }            	
                if( ddl.optionEQvalue('rowkey','yes') || 0 < tmp.indexOf('/ROWKEY') ) {
                    let pad = tab+' '.repeat(tbl.maxChildNameLen() - 'ROW_KEY'.length);
                    ret += tab + chunks[i]+'.'+ 'ROW_KEY' + singular(pad + chunks[i])+'_'+ 'ROW_KEY,\n';              	
                }            	
                if( ddl.optionEQvalue('Audit Columns','yes') || 0 < tmp.indexOf('/AUDITCOLS') || 0 < tmp.indexOf('/AUDIT COL') ) {
                    let created = ddl.getOptionValue('createdcol');
                    let pad = tab+' '.repeat(tbl.maxChildNameLen() - created.length);
                    ret += tab + chunks[i]+'.'+  created + singular(pad + chunks[i])+'_'+ created+',\n';  
                    let createdby = ddl.getOptionValue('createdbycol');
                    pad = tab+' '.repeat(tbl.maxChildNameLen() - createdby.length);
                    ret += tab + chunks[i]+'.'+  createdby + singular(pad + chunks[i])+'_'+  createdby+',\n';  
                    let updated = ddl.getOptionValue('updatedcol');
                    pad = tab+' '.repeat(tbl.maxChildNameLen() - updated.length);
                    ret += tab + chunks[i]+'.'+  updated + singular(pad + chunks[i])+'_'+  updated+',\n';  
                    let updatedby = ddl.getOptionValue('updatedbycol');
                    pad = tab+' '.repeat(tbl.maxChildNameLen() - updatedby.length);
                    ret += tab + chunks[i]+'.'+  updatedby + singular(pad + chunks[i])+'_'+ updatedby + ',\n';  
                }            	
            }
            if( ret.lastIndexOf(',\n') == ret.length-2 )
                ret = ret.substr(0,ret.length-2)+'\n';
            ret += 'from\n'; 
            for( let i = 2; i < chunks.length; i++ ) {
                let pad = ' '.repeat(maxLen - chunks[i].length);
                var tbl = chunks[i];
                if( ddl.objPrefix() != null && ddl.objPrefix() != '' )
                    tbl = ddl.objPrefix()+chunks[i] + pad + chunks[i];
                ret += tab + tbl + ',\n';
            }
            if( ret.lastIndexOf(',\n') == ret.length-2 )
                ret = ret.substr(0,ret.length-2)+'\n';
            ret += 'where\n'; 
            for( let i = 2; i < chunks.length; i++ )  
                for( let j = 2; j < chunks.length; j++ ) {
                    if( j == i )
                        continue;
                    var nameA = chunks[i];
                    var nameB = chunks[j];
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
            ret = replaceTrailing(ret, 'where\n');    
            //^ trimmed
            if( ret.lastIndexOf(' and') == ret.length-' and'.length )
                ret = ret.substring(0,ret.length-' and'.length)+'\n';
            ret += '/\n'; 
            return ret.toLowerCase();
        };

        this.restEnable = function() {
            if( this.parseType() != 'table' ) 
                return '';
            const nodeContent = this.trimmedContent().toUpperCase();
            let restPos = nodeContent.indexOf('/REST');
            if( restPos < 0 ) 
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

            let tmp = this.trimmedContent().toUpperCase();
            if( ddl.optionEQvalue('Rowkey','yes') || 0 < tmp.indexOf('/ROWKEY') )  {
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
            if( ddl.optionEQvalue('rowkey','yes') || 0 < tmp.indexOf('/ROWKEY') )  {
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
            if( ddl.optionEQvalue('Row Version Number','yes') || 0 < tmp.indexOf('/ROWVERSION') )  {
                ret += '    if inserting then\n';
                ret += '        :new.row_version := 1;\n';
                ret += '    elsif updating then\n';
                ret += '        :new.row_version := NVL(:old.row_version, 0) + 1;\n';
                ret += '    end if;\n';
                OK = true;
            }
            if( ddl.optionEQvalue('Audit Columns','yes') || 0 < tmp.indexOf('/AUDITCOLS') || 0 < tmp.indexOf('/AUDIT COL') ) {
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
            ret += tab+tab+'p_id        in  number'+modifier;
            for( var fk in this.fks ) {	
                let parent = this.fks[fk];				
                let type = 'number';
                let refNode = ddl.find(parent);
                if( refNode != null && refNode.getExplicitPkNode() != null )
                    type = refNode.getExplicitPkNode().parseType(pure=>true);
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
            let objName = ddl.objPrefix()  + this.parseName();
            let ret =    tab+'is \n';
            ret +=    tab+'begin \n';
            let prelude =    tab+tab+'for c1 in (select * from '+objName+' where id = p_id) loop \n';
            if( kind == 'insert' ) {
                prelude =    tab+tab+'insert into '+objName+' ( \n';
                prelude += tab+tab+tab+'id';
            }
            if( kind == 'update' ) {
                prelude =    tab+tab+'update  '+objName+' set \n';
                prelude += tab+tab+tab+'id = p_id';
            }
            ret += prelude;
            for( let fk in this.fks ) {	
                let parent = this.fks[fk];				
                let type = 'number';
                let refNode = ddl.find(parent);
                if( refNode != null && refNode.getExplicitPkNode() != null )
                    type = refNode.getExplicitPkNode().parseType(pure=>true);
                //pad = tab+tab+' '.repeat(this.maxChildNameLen() - fk.length);
                if( kind == 'insert' || kind == 'update' ) 
                    ret += ',\n';
                let row = tab+tab+tab+'P_'+fk+' := c1.'+fk+';\n';	
                if( kind == 'insert' ) 
                    row = tab+tab+tab+fk;
                if( kind == 'update' ) 
                    row = tab+tab+tab+fk+' = P_'+fk+'\n';	
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
                    row = tab+tab+tab+child.parseName().toLowerCase()+' = P_'+child.parseName().toLowerCase()+'\n';	
                ret += row;
            }
            if( kind == 'insert' ) {
                ret +=    '\n'+tab+tab+') values ( \n';
                ret +=    tab+tab+tab+'p_id';
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
                finale = tab+tab+'where id = p_id;';
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
            ret += '    procedure delete_row (\n'+
                '        p_id              in number\n'+
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
            ret += '        p_id              in number\n';
            ret += '    )\n';
            ret += '    is\n';
            ret += '    begin\n';
            ret += '        delete from '+objName.toLowerCase()+' where id = p_id;\n';
            ret += '    end delete_row;\n';
            ret += 'end '+objName.toLowerCase()+'_api;\n';
            ret += '/\n';
            return ret.toLowerCase();
        };

        this.cardinality = function() {
            let tmp = this.trimmedContent().toLowerCase();
            let start = tmp.indexOf('/insert ');
            if( 0 < start ) {
                tmp = tmp.substr(start+'/insert '.length);
                let tmps = tmp.split(' ');
                let ret =  parseInt(tmps[0]);
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
                const inserts = tab2inserts[tables[i].parseName()];
                if( inserts != null )
                    ret += inserts;
            }
            return ret;
        }
            
        this.inserts4tbl = function( dataObj ) {

            let tab2inserts = {};

            if( ddl.optionEQvalue('inserts',false) )
                return '';
            
            let objName = ddl.objPrefix()  + this.parseName();
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
                    let pkNode = this.getExplicitPkNode();
                    if( pkNode != null ) {
                        pkName = pkNode.parseName();
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
                        if( child == this.getExplicitPkNode() )
                            continue; //insert += '--';
                        if( 0 == child.children.length ) 
                            insert += tab+child.parseName()+',\n';
                    }
                }
                if( insert.lastIndexOf(',\n') == insert.length-2 )
                    insert = insert.substr(0,insert.length-2)+'\n';

                insert += ') values (\n';

                if( idColName != null ) {
                    pkValue = i+1;
                    insert += tab + pkValue + ',\n'; 
                } else {
                    let pkNode = this.getExplicitPkNode();
                    if( pkNode != null ) {
                        const field = pkNode.parseName();
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
                        if( child == this.getExplicitPkNode() )
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
                            let datum = generateSample(objName, cname, child.parseType(), values);
                            insert += tab + translate(ddl.getOptionValue('Data Language'), datum)+',\n';
                        }
                    }
                }
                if( insert.lastIndexOf(',\n') == insert.length-2 )
                    insert = insert.substr(0,insert.length-2)+'\n';
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
        this.generateSelectJsonBottomUp = function( indent) {
            throw new Error("generateSelectJsonBottomUp() not implemented yet");
            /*var name = this.parseName();
            var ret = indent + '\'' + this.getGenIdColName() + '\' : ' + name +'.id,\n';
            for( var j = 0; j < this.children.length; j++ ) {
                var child = this.children[j];
                var cname = child.parseName();
                if( 0 == child.children.length ) {
                    ret += indent + '\'' + cname + '\' : ' + name + '.' + cname + ',\n';
                }
            }
            var ptbl = this.parent;
            if( ptbl != null ) { 
                var pname = ptbl.parseName();
                ret += indent + '\'' + pname + '\' : (\n';
                indent += '  ';
                ret += indent + 'select JSON {\n';
                ret += ptbl.generateSelectJsonBottomUp( indent + '  ');
                ret += indent + '} from ' + ptbl.parseName() + ' ' + pname + ' with (UPDATE)\n';
                ret += indent + 'where ' + name + '.' + pname + '_id = ' + pname + '.ID\n';
                indent = indent.slice(0, -2);
                ret += indent + ')\n';
            } else {
                ret = ret.slice(0, -2) + '\n';
            }
            return ret;	*/
        };
        this.one2many2oneUnsupoported = "one to many to one is not supported";
        this.generateSelectJsonTopDown = function( indent ) {
            var name = this.parseName();
            let ret = '';
            if( this.getExplicitPkNode == null )
                ret += indent + '\'' + this.getGenIdColName() + '\' : ' + name + '.'+this.getGenIdColName()+',\n';
            for( var j = 0; j < this.children.length; j++ ) {
                var child = this.children[j];
                var cname = child.parseName();
                if( 0 == child.children.length ) {
                    if (this.hasNonArrayChildId(cname))
                        continue;
                    ret += indent + '\'' + cname + '\' : ' + name + '.' + cname;
                } else {
                    ret += indent + '\'' + cname + '\' : [\n';
                    var isArray = !child.isMany2One();
                    indent += '  ';
                    ret += indent + 'select ' + /*(isArray?'JSON_ARRAYAGG(':'') +*/ 'JSON {\n';
                    if( this.isMany2One() )
                        throw new Error(this.one2many2oneUnsupoported);
                    ret += child.generateSelectJsonTopDown(indent + '  ');
                    ret += indent + ' WITH NOCHECK }' +  ' from ' + cname + ' with INSERT UPDATE\n';
                    var names = /*isArray? [name, cname] :*/ [cname, name];
                    let cfk = null;
                    for( var k in child.fks ) {
                        var parent = child.fks[k];
                        if( parent == name ) {
                            cfk = k;
                            break;
                        }
                    }
                    const thisRef = name + '.' + this.getPkName(); 
                    const childRef = cname + '.' + cfk; 
                    ret += indent + 'where ' + childRef  + ' = ' + thisRef +'\n';
                    indent = indent.slice(0, -2);
                    ret += indent + ']';
                }
                ret += (j < this.children.length - 1)? ',\n' : '\n';
            }
            return (ret[ret.length-2] == ',')? ret.slice(0, -2) + '\n' : ret;
        };
        this.generateDualityView = function() {
            var tmp = this.trimmedContent();
            var chunks = tmp.split(' ');
            if( 3 < chunks.length )
                throw 'max 1 table is allowed in DV';  
            var ret = '';
            var tbl = ddl.find(chunks[2]);
            if( tbl != null) {
                ret += 'create or replace json relational duality view ' + chunks[1] + ' as\n';
                ret += 'select JSON {\n';
                ret += tbl.isMany2One()? tbl.generateSelectJsonBottomUp('  ') :        
                       tbl.generateSelectJsonTopDown('  ');
                ret += '} from ' + tbl.parseName() /*+ ' ' + chunks[2]*/ + ' with INSERT UPDATE DELETE;\n\n';
            }
            return ret;
        };
        
    }

    function recognize( parsed ) {
        ddl = parsed;
        const fullInput = parsed.input;

        let path = [];
        let ret = [];

        const src = lexer(fullInput+'\n',true,true,'');
        ddl.data = null;
        let poundDirective = null;
        let line = '';
        let lineNo = 0;
        OUTER: for( let i in src ) {
            const t = src[i];

            if( t.value == '\n' ) {
                if( poundDirective == null ) {
                    line = line.replace(/\r/g,'');
                    let nc = line.replace(/\r/g,'').replace(/ /g,'');
                    // if( /[^a-zA-Z0-9="{}\/.,_\-\[\]]/.test(nc) ) 
                    //     continue;
                    if( '' == nc ) {
                        line = '';
                        lineNo++;
                        continue;
                    }
                    let node = new ddlnode(lineNo,line,null);  // node not attached to anything
                    let matched = false;
                    for( let j = 0; j < path.length; j++ ) {
                        let cmp = path[j];
                        if( node.apparentDepth() <= cmp.apparentDepth() ) {
                            if( 0 < j ) {
                                let parent = path[j-1];
                                node = new ddlnode(lineNo,line,parent);  // attach node to parent
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
                            node = new ddlnode(lineNo,line,parent);
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

                    lineNo++;
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
                    //lineNo++;
                    //line = '';                                          
                }
                continue;
            }
            line += t.value;
        }          
        
        return ret;
    }

    function replaceTrailing ( ret, pOstfix ) { 
        let postfix = pOstfix.toLowerCase();
        if( 0 < ret.indexOf(postfix) && ret.indexOf(postfix) == ret.length-postfix.length )
            return ret.substring(0, ret.length-postfix.length);
        return ret.trim();
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
