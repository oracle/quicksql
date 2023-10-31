/* globals __PACKAGE_VERSION__ */

/*
 * main method: ddl.toDDL()
 */

import tree from './tree.js';
import lexer from './lexer.js';
import json2qsql from './json2qsql.js'
import errorMsgs from './errorMsgs.js'

const ddl = (function () {
    function DDL() {
        this.identityDataType = 'identityDataType';
        this.guid = 'guid';
        this.tswtz = 'Timestamp with time zone';
        this.tswltz = 'Timestamp with local time zone';
        this.defaultOptions = { 
            apex: {label: 'APEX', value:'no',check:['yes','no']},
            auditcols: {label: 'Audit Columns', value:'no',check:['yes','no']},
                createdcol: {label: 'Created Column Name', value: 'created'},
                createdbycol: {label: 'Created By Column Name', value: 'created_by'},
                updatedcol: {label: 'Updated Column Name', value: 'updated'},
                updatedbycol: {label: 'Updated By Column Name', value: 'updated_by'},
            genpk: {label:'Auto Primary Key', value:'yes',check:['yes','no']},
            semantics: {label: 'Character Strings',value:'CHAR',check:['BYTE','CHAR','Default']},
            language: {label: 'Data Language', value:'EN',check:['EN','JP','KO']},
            datalimit: {label: 'Data Limit Rows', value: 10000},
            date: {label: 'Date Data Type', value:'DATE',check:['DATE','TIMESTAMP',this.tswtz,this.tswltz]},
            db: {label: 'DB', value:'no',check:['not used']},  
            dv: {label: 'Duality View', value:'no',check:['yes','no']},  // switched default to 'no' until thorough development&testig
            drop: {label: 'Include Drops', value:'no',check:['yes','no']},
            editionable: {label: 'Editinable', value:'no',check:['yes','no']},
            inserts: {label: 'Generate Inserts', value:true, check:['yes','no']},
            //longvc: {label: 'Longer Varchars', value:'yes',check:['yes','no']},    // not used, if a user specified the length, presumably he knows what he is doing
            //columnNamePrefix: "?",
            overridesettings: {label: 'Ignore toDDL() second parameter', value:'no',check:['yes','no']},    
            prefix: {label: 'Object Prefix', value:'' },
            //ondelete: {label: 'On Delete', value:'Cascade',check:['restrict','cascade','set null']},
            pk: { label: 'Primary Key Maintenance', value: this.identityDataType, check: [this.identityDataType, this.guid,'SEQ', 'NONE']},
            prefixpkwithtname: {label:'Prefix primary keys with table name', value:'no',check:['yes','no']}, 
            rowkey: {label: 'Alphanumeric Row Identifier', value:'no',check:['yes','no']},
            rowversion: {label: 'Row Version Number', value:'no',check:['yes','no']},
            schema: {label: 'Schema', value:'', },
            api: {label: 'Table API', value:'no',check:['yes','no']},
            compress: {label: 'Table Compression', value:'no',check:['yes','no']},
            //"Auxiliary Columns": {label: "Auxiliary Columns", value:''}, // e.g. security_group_id integer

            //namecase: {label: 'Object and Field name convention', value:'canonic',check:['canonic','json']},
        };
        this.options = JSON.parse(JSON.stringify(this.defaultOptions));
        this.forest = null;

        this.normalize = function( iNput ) {
            if( iNput == null )
                return null;
            let input = iNput;
            if( typeof input === 'string' ) 
                input = input.toLowerCase();
            if( input == 'yes') return true;
            if( input == 'no') return false;
            if( input == 'y') return true;
            if( input == 'n') return false;
            if( input == 'true') return true;
            if( input == 'false') return false;
            if( input == this.identityDataType.toLowerCase() ) return 'identity';
            if( input == this.guid.toLowerCase() ) return 'guid';
            if( input == this.tswtz.toLowerCase() ) return 'tswtz';
            if( input == this.tswltz.toLowerCase() ) return 'tswltz';
            return input;
        };

        this.optionEQvalue = function( key, value ) {
            var v = this.getOptionValue(key);

            let ret = this.normalize(v) == this.normalize(value);
            return ret;
        };
        this.getOptionValue = function( kEy ) {
            const key = kEy.toLowerCase(); 
            let option = this.options[key];
            if( !(key in this.options) ) {
                for( let x in this.options ) {
                    const lAbel = this.options[x].label;
                    if( lAbel == null )
                        continue;
                    const label = lAbel.toLowerCase();
                    if( label == key )
                        option = this.options[x];
                }
            }
            if( option == null ) 
                return null;
            return option.value;
        };
        this.setOptionValue = function( kEy, value ) {
            let key = kEy.toLowerCase(); 
            // var option = this.options[key];
            if( !(key in this.options) ) {
                for( let x in this.options ) {
                    const label = this.options[x].label;
                    if( label == kEy ) {
                        this.options[x].value = value;
                        return;
                    }
                }
                return;
            }
            if( value == null )
                value = '';
            this.options[key].value = value;
        };

        this.resetOptions = function() {
            this.options = JSON.parse(JSON.stringify(this.defaultOptions));
        };

        this.nonDefaultOptions = function() {
            let ret = {};
            for( let x in this.defaultOptions ) {
                if( !this.optionEQvalue(x,this.defaultOptions[x].value) )
                    ret[x] = this.options[x].value;
            }
            return ret;
        };

        this.renderNonDefaultOptions = function() {
            let nonDefaults = this.nonDefaultOptions();
            return '# settings = '+JSON.stringify(nonDefaults);
        };

        this.semantics = function() {
            var char = '';
            if( this.optionEQvalue('semantics','CHAR') )
                char = ' char';
            else if( this.optionEQvalue('semantics','BYTE') )
                char = ' byte';
            return char;	
        };

        this.find = function( name ) {
            for( var i = 0; i < this.forest.length; i++ ) {
                var descendants = this.forest[i].descendants();
                for( var j = 0; j < descendants.length; j++ ) {
                    var node = descendants[j];
                    if( node.parseName() == this.canonicalObjectName(name) )
                        return node;
                }
            }
            return null;
        };

        this.canonicalObjectName = function( nAme ) {
            if( nAme == null )
                return null;
            if( nAme.indexOf('"') == 0 )
                return nAme;
            let possiblyQuoted = this.quoteIdentifier(nAme);
            if( possiblyQuoted.indexOf('"') == 0 )
                return possiblyQuoted;
            possiblyQuoted = possiblyQuoted.replace(/ /g,"_"); 
            return possiblyQuoted;
        };
        /** 
         * Ported from dbtools-common Service.quoteIdentifier() and AMENDED for QSQL usage
         * Diffs: 1. Space separator does not warrant double quote
         *        2. Lower case letters do not warrant double quote
         * 
         * Quotes an identifier based on the following:
         * 1) Any lower/mixed case identifier is quoted
         * 2) Any identifier starting with the quote string is NOT quoted. If it is currently quoted (first/last characters 
         * are the quote character) then no quoting is needed, and if it not quoted but contains a quote character, the name is
         * invalid.
         * 3) The string is checked for invalid characters; any invalid characters require the string be quoted. A valid identifier
         * starts with a letter and contains only letters, digits, or one of _$#. Note that the database allows any valid character 
         * in the database character set. We by policy use the basic ASCII character set to determine letters.
         * 
         * Conflicting requirements:
         * - SYS.DBMS_SQLTUNE.ACCEPT_ALL_SQL_PROFILES composite object names shouldn't be quoted
         * - Bug 20667620: weird column name "NO." should
         * @param s
         * @param quoteChar
         * @return
         */
        this.quoteIdentifier = function(/*String*/ s, /*char*/ quoteChar ) {
            let quoteString = '"'; //String.valueOf(quoteChar);
            if( s == null )   // to be able to safely wrap any string value
                return null;    	
            
            // We want to check 3 things here:
            // 1) The string is a valid identifier (starts with a letter, contains only valid characters,--!!!-- don't care if a reserved word
            // 2) The string is all upper case. By policy, we will quote any lower or mixed cased strings
            // 3) the string is not currently quoted. We will only check the first character for a quote. A quote appearing anywhere
            //    else or a starting quote w/o an ending quote is going to make the string invalid no matter what (quotes cannot
            //    be escaped in Oracle identifiers).
            let quote = false;
            // Bug 9215024 column name can have "_" so we can't exclude them.
            // ^^^^^^^^^^
            // Edit Wars: the loop below iterates through list of characters, and as soon  
            // it encounters illegitimate symbol, it sets the "need quotation" flag
            const legitimateChars = "$#_ ";   // !NO ".": see this function JavaDoc above 
            if ( !s.startsWith(quoteString) && !quote ) {
                const chars = s; //new char[s.length()];
                //s.getChars(0, chars.length, chars, 0);
                if( chars.length > 0 && '0' <= chars[0] && chars[0] <= '9' )
                    quote = true;
                else for ( let i in chars ) {
                    const c = chars[i];
                    if( legitimateChars.indexOf(c) < 0 && (
                        c < '0' || '9' < c && c < 'A' || 'Z' < c && c < 'a' || 'z' < c
                    )) {
                        quote = true;
                        break;
                    }
                    // wierd case with double quote inside
                    // ...
                }
            }
            if( s.startsWith("_") || s.startsWith("$") || s.startsWith("#") )
                quote = true;
            if( !quote )
                quoteString = '';
            return quoteString+s+quoteString;
        }


        /**
         * @param {*} input 
         * @returns JSON object for tables and fk relationships
         */
        this.toERD = function (input, options) {
            this.toDDL(input, options);
            this.options = JSON.parse(JSON.stringify(this.appliedOptions));

            let descendants = this.descendants();
 
            let output = {items:[]};

            for( let i = 0; i < descendants.length; i++ ) {
                if( descendants[i].parseType() != 'table' ) 
                    continue;

                let item = {name: this.objPrefix('no schema')  +descendants[i].parseName('')};
                let schema = this.getOptionValue('schema');
                if( '' == schema )
                    schema = null;
                //if( schema != null )
                    //schema = '"'+schema+'"';
                item.schema = schema;
                item.columns = []
                
                output.items.push(item);

                let id = descendants[i].getGenIdColName();
                if( id != null )
                    item.columns.push({name: id, datatype: "number"});

                for( let j = 0; j < descendants[i].children.length; j++ ) {
                    let child = descendants[i].children[j];
                    if( child.parseType() == 'table' ) 
                        continue;
                    item.columns.push({name: child.parseName(''), datatype: child.parseType(pure=>true)});
                    if( 0 < child.indexOf('file') ) {
                        const col = child.parseName();
                        item.columns.push({name: col+'_filename', datatype: 'varchar2(255'+this.semantics()+ ')'});
                        item.columns.push({name: col+'_mimetype', datatype: 'varchar2(255'+this.semantics()+ ')'});
                        item.columns.push({name: col+'_charset',  datatype: 'varchar2(255'+this.semantics()+ ')'});
                        item.columns.push({name: col+'_lastupd', datatype:  'date'});
                    }
                }

                const nodeContent = descendants[i].trimmedContent().toUpperCase();
                if( this.optionEQvalue('rowkey',true) || 0 < nodeContent.indexOf('/ROWKEY') ) {
                    item.columns.push({name: 'row_key', datatype: 'varchar2(30 char)'});
                }            	
                if( this.optionEQvalue('rowVersion','yes') || 0 < nodeContent.indexOf('/ROWVERSION') ) {
                    item.columns.push({name: 'row_version', datatype: 'integer'});
                }            	
                if( this.optionEQvalue('Audit Columns','yes') || 0 < nodeContent.indexOf('/AUDITCOLS') ) {
                    let created = this.getOptionValue('createdcol');
                    item.columns.push({name: created, datatype: this.getOptionValue('Date Data Type').toLowerCase()});
                    let createdby = this.getOptionValue('createdbycol');
                    item.columns.push({name: createdby, datatype: 'varchar2(255'+this.semantics()+')'});
                    let updated = this.getOptionValue('updatedcol');
                    item.columns.push({name: updated, datatype: this.getOptionValue('Date Data Type').toLowerCase()});
                    let updatedby = this.getOptionValue('updatedbycol'); 
                    item.columns.push({name: updatedby, datatype: 'varchar2(255'+this.semantics()+')'});
                }            	
                var cols = this.additionalColumns();
                for( let col in cols ) {
                    var type = cols[col];
                    pad = tab+' '.repeat(this.maxChildNameLen() - col.length);
                    ret += tab +  col.toUpperCase() + pad + type + ' not null,\n';  
                }
        
            }

            output.links = [];

            for( let i = 0; i < descendants.length; i++ ) {
                if( descendants[i].parseType() != 'table' ) 
                    continue;

                for( let fk in descendants[i].fks ) {	
                    let parent = descendants[i].fks[fk];
                    let pkNode = this.find(parent);
                    if( pkNode == null )
                        continue;
                    let pk = 'id';
                    if( pkNode.getExplicitPkNode() != null )
                        pk = pkNode.getExplicitPkNode().parseName();				
 
                    output.links.push({source: this.objPrefix() +parent, source_id: pk,
                                       target: this.objPrefix() + descendants[i].parseName(''), target_id: fk
                    });
                }
            }

            this.appliedOptions = JSON.parse(JSON.stringify(this.options));
            this.resetOptions();

            return output;
        };
        
        this.unknownSettings = [];
        this.appliedOptions;
        this.data;
        this.toDDL = function (fullInput, options) {

            var output = '';

            this.unknownSettings = [];

            this.forest = tree(this, fullInput);
            let settings = '';
            if( options != undefined && this.optionEQvalue('overrideSettings',false) ) {
                settings = '# settings = '+options+'\n\n';
                this.forest = tree(this, settings + fullInput);
            }

            var descendants = this.descendants();

            if( this.optionEQvalue('Include Drops','yes') )
                for( let i = 0; i < descendants.length; i++ ) {
                    let drop = descendants[i].generateDrop();
                    if( drop != '' )
                        output += drop;
                }

            if( this.optionEQvalue('rowkey',true) ) {
                output += 'create sequence  row_key_seq;\n\n';                
            } else for( let i = 0; i < this.forest.length; i++ ) {
                const nodeContent = this.forest[i].trimmedContent().toUpperCase();
                if( 0 < nodeContent.indexOf('/ROWKEY') ) {
                    output += 'create sequence  row_key_seq;\n\n'; 
                    break;
                }
            }
            
            output += '-- create tables\n\n';

            for( let i = 0; i < this.forest.length; i++ ) {
                output += this.forest[i].toDDL()+'\n';
            }

            let j = 0;
            for( let i = 0; i < descendants.length; i++ ) {
                let trigger = descendants[i].generateTrigger();
                if( trigger != '' ) {
                    if( j++ == 0 )
                        output += '-- triggers\n';
                    output += trigger +'\n';
                }
            }
            j = 0;

            for( let i = 0; i < descendants.length; i++ ) {
                let ords = descendants[i].restEnable();
                if( ords != '' )
                    output += ords +'\n';
            }

            
            j = 0;
            for( let i = 0; i < descendants.length; i++ ) {
                if( this.optionEQvalue('api',false) 
                 && descendants[i].trimmedContent().toLowerCase().indexOf('/api') < 0 )
                    continue;
                let tapi = descendants[i].generateTAPI();
                if( tapi != '' ) {
                    if( j++ == 0)
                        output += '-- APIs\n';
                    output += tapi +'\n';
                }
            }

            j = 0;
            for( let i = 0; i < this.forest.length; i++ ) {
                let view = this.forest[i].generateView();
                if( view != '' ) {
                    if( j++ == 0)
                        output += '-- create views\n';
                    output += view +'\n';
                }
            }

            j = 0;
            for( let i = 0; i < this.forest.length; i++ ) {
                let data = this.forest[i].generateData(this.data);
                if( data != '' ) {
                    if( j++ == 0)
                        output += '-- load data\n\n';
                    output += data+'\n';
                }
            }
            j = 0;

            output += '-- Generated by Quick SQL ' + `${ this.version } ` + new Date().toLocaleString() +'\n\n';

            output += '/*\n';
            //input = input.replace(/# ?settings ?= ?{.+}/gm,'');
            fullInput = fullInput.replace(/#.+/g,'\n');
            fullInput = fullInput.replace(/\/\*/g,'--<--');
            fullInput = fullInput.replace(/\*\//g,'-->--');
            fullInput = fullInput.replace(/\/* Non-default options:/g,"");
            output += fullInput;
            output += '\n';
            for( let i = 0; i < this.unknownSettings.length; i++ ) {
                output += '*** Unknown setting: '+this.unknownSettings[i]+'\n';
            }
            

            output += '\n Non-default options:\n# settings = '+JSON.stringify(this.nonDefaultOptions())+'\n';

            output += '\n*/';

            this.appliedOptions = JSON.parse(JSON.stringify(this.options));
            this.resetOptions();

            return output;
        }; 

        this.errors = function (input, options) {
            this.toDDL(input, options);
            this.options = JSON.parse(JSON.stringify(this.appliedOptions));

            const ret = errorMsgs.findErrors(this, input);
 
            this.appliedOptions = JSON.parse(JSON.stringify(this.options));
            this.resetOptions();

            return ret;
        }
                

        this.toQSQL = function( input ) {
            const obj = JSON.parse(input); 
            return json2qsql.introspect(null, obj, 0);
        }


        this.descendants = function () { 
            var ret = [];
            for( var i = 0; i < this.forest.length; i++ ) {
                ret = ret.concat(this.forest[i].descendants());
            }
            return ret;
        };
        
        this.additionalColumns = function() {
            var ret = []; 
            var input = this.getOptionValue('Auxiliary Columns');
            if( input == null )
                return ret;
            var tmps = input.split(',');
            for( var i = 0; i < tmps.length; i++ ) {
                var attr = tmps[i].trim();
                var type = 'VARCHAR2(4000)';
                var pos = attr.indexOf(' ');
                if( 0 < pos ) {
                    type = attr.substring(pos+1).toUpperCase();
                    attr = attr.substring(0,pos);
                }
                ret[attr] = type;
            }
            return ret;
        };

        this.objPrefix = function ( withoutSchema ) {
            var ret = this.getOptionValue('schema');
            if( ret == null )
                ret = '';
            if( '' != ret && withoutSchema == null )
                ret = ret + '.';
            else 
                ret = '';
            var value = '';
            if( this.getOptionValue('prefix') != null )
                value = this.getOptionValue('prefix');
            ret = ret + value;
            if( value != '' )
                ret = ret + '_';
            return ret.toLowerCase();
        };
    }

    const instance = new DDL();

    let exportObject = {
        toDDL: instance.toDDL.bind( instance ),
        toERD: instance.toERD.bind( instance ),
        toQSQL: instance.toQSQL.bind( instance ),
        errorMsgs: instance.errors.bind( instance )
    };
    Object.defineProperty( exportObject, 'version', {
        writable: false,
        value: typeof __PACKAGE_VERSION__ === 'undefined' ? 'development' : __PACKAGE_VERSION__
    } );
    return exportObject;
}());

export const toDDL = ddl.toDDL;
export const toERD = ddl.toERD;
export const toQSQL = ddl.toQSQL;
export const errors = ddl.errors;
export const version = ddl.version;

export default ddl;
