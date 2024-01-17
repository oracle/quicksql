import {singular} from './naming.js';
import {qsql_version} from './ddl.js';

var json2qsql = (function () {

    function indent( depth ) {
        var s = "";
        for (var i = 0; i < depth; i++)
            s = s + "   ";
        return s;
    }

    function isPrimitive( value ) {
         return typeof value == 'number' || typeof value == 'string' || typeof value == 'boolean' ;
    }

    function typeOf( value ) {
        const t = typeof value;
        if( typeof value == 'string')
            return 'vc255';
        return '';
   }


    function hasEntry( array, entry ) {
        for( const i in array ) 
            if( JSON.stringify(array[i]) == JSON.stringify(entry) ) 
                return true;
        return false;
    }

    function getId( record ) {
        let suffixes = ["_id", "Id"];
        if( record['id'] != null )
            return record['id'];
        let found = false;
        for( let i = 0; i < suffixes.length; i++ ) {
            const suffix = suffixes[i];
            for( let property in record ) {
                if( property.endsWith(suffix) ) {
                    return record[property];
                }       
            }
        }
    }

    function hasPrimitiveAttr( value ) {
        for( let property in value ) {
            if( value[property] != null && typeof value[property] == "object" ) 
                continue;
            return true;
        }
        return false;
    }

    function suggestName( obj ) {
        let property = null;
        outer: for( const i in obj ) {
            if( i == 0 )
                for( const attr in obj[i] ) {
                    property = attr;
                    break outer;
                }
            else {
                property = i;
                break outer;
            }
        }
        if( property.toLowerCase() == 'id' )
            return null;

        if( property.toLowerCase().endsWith('_id') )
            return property.substring(0,property.length-'_id'.length);
        if( property.endsWith('Id') )
            return property.substring(0,property.length-'Id'.length);

        return null;
    }
    
    /**
     * @param {*} input JSON document
     * @param {*} name  optional file name, will be the tip attribute if none in JSON
     * @returns 
     */
    function translate( input, name ) {
        const obj = JSON.parse(input); 

        const sugg = suggestName(obj);
        if( sugg != null )
            name = sugg;
        if( name == null )
            name = 'root_tbl'

        const tc = new TableContent();
        tc.duplicatesAndParents(name, obj);
        tc.flatten(name, obj);

        /*for( const t in tc.tables ) {
            console.log('***'+t+'***');
            for( const i in tc.tables[t] )
                console.log(JSON.stringify(tc.tables[t][i]));
        }*/

        let output = tc.output(name, obj, 0);

        //output += "\n\ndv "+name+"_dv "+name +"";
        output += '\n\n#settings = { genpk: false, drop: true }';

        output += '\n\n#flattened = \n';
        output += JSON.stringify(tc.tables, null, 3);    
        output += '\n';  

        output += '\n\n-- Generated by json2qsql.js ' + `${ qsql_version() } ` + new Date().toLocaleString() +'\n\n';

        output += '#document = \n';
        output += JSON.stringify(obj, null, 3);    
        output += '\n';  

        return output;
    }

    function TableContent() {
       
        this.tables = {};  // e.g. {'batter' -> [{"id":"1001","type":"Regular"},...],  ... }      
        this.notNormalized = []; // e.g. ['batter', 'topping'] 
        this.allTables = [];
        this.child2parent = {}   // e.g. 'topping' -> 'donut'

        this.objCounts = {};

        this.output = function( key, value, level, m2m ) {
            if( m2m != false && this.notNormalized.includes(key) ) {
                const auxTable =this.parent(key)+'_'+key;
                const tContent = this.tables[auxTable];
                if( tContent != null ) {
                    let output = '\n'+indent(level)+auxTable+" /insert "+tContent.length;
                    const record = tContent[0];
                    //for( const attr in record )
                        //output += '\n'+indent(level+1)+attr+' '+typeOf(record[attr]);
                    output += this.output(key, value, level+1, false);
                    return output;
                }
            }

            let output = key;
            let m2o = '';
            if( this.notNormalized.includes(key) )
                m2o = '>'
            if( 0 < level )
                output = '\n'+indent(level)+m2o+key;

            if( typeof value == 'string' ) {
                output += ' vc';
            }
            if( typeof value == 'number' ) {
                output += ' num';
                if( key.endsWith('_id') || key.endsWith('Id') ) {
                    output += ' /pk';
                    return output;
                }
            }
            if( 'id' == key ) {
                return '\n'+indent(level)+'id vc32 /pk';
            }
            tofinal: if( typeof value == "object" ) {
                if( Array.isArray(value) ) {
                    for( const property in value ) {
                        if( 1 <= property )
                            console.log('1 <= property !');
                        const field = value[property];
                        output = this.output(key, field, level, m2m);
                        break tofinal;
                    }
                } else {
                    if( key != "" ) {
                        output += '  /insert '+this.tables[key].length;
                    }
                }
                let promotedField = "";
                for( let property in value ) {
                    const field = value[property];
                    if( property != null  ) {
                        const fld = singular(key);
                        const cmp = property.toLowerCase();
                        if( key != null && fld + "_id" == cmp /*&& arraySize == */ && 0 < level )
                            promotedField = property;
                        if( fld + "_id" == cmp )
                            continue;
                    }
                    if( !this.allTables.includes(key) ) {
                        output = '';
                        level--;
                    }
                    const subtree = this.output(property, field, level + 1);
                    output += subtree;
                }
                if( promotedField != "" )
                    output += '\n'+indent(level)+ promotedField;
            } else {
                //output += '=' + value;
            }
            return output;
        }

        this.flatten = function( key, value, parentId ) {
            let record = {}
     
            for( let property in value ) {
                if( value[property] != null && typeof value[property] == "object" ) { 
                    let k = key;
                    let pId = parentId;
                    if( isNaN(property) ) {
                        k = property;
                        const tmp = getId(record);
                        if( tmp != null )
                            pId = tmp;
                    }
                    this.flatten( k, value[property], pId );
                } else {
                    record[property] = value[property];
                }
            }
    
            const hasKeys = 0 < Object.keys(record).length;
            let array = this.tables[key];
            if( hasKeys ) {
                if( array == null )
                    array = [];
                if( !hasEntry(array, record) ) {
                    array.push(record);
                }
                if( this.notNormalized.includes(key) ) {
                    const parent = this.parent(key);
                    if( parent != null ) {
                        const m2m = parent+'_'+key;
                        let array2 = this.tables[m2m];
                        if( array2 == null )
                            array2 = [];
                        const newObj = {};
                        newObj[singular(parent)+"_id"] = parentId;
                        newObj[singular(key)+"_id"] = getId(record);
                        array2.push(newObj);
                        this.tables[m2m] = array2;
                    }
                }
                this.tables[key] = array;
            } else if( array == null )
                this.tables[key] = [];
        }

        this.duplicatesAndParents = function ( attr, value ) {
            const key = '"'+attr+'":'+JSON.stringify(value);
            let tmp = this.objCounts[key];
            if( tmp == null )
                tmp = 0;

            let isComposite = false;
            for( let property in value ) {
                if( value[property] != null && typeof value[property] == "object" ) {  
                    let k = attr;
                    if( isNaN(property) ) 
                        k = property;
                    if( k != attr )
                        this.child2parent[k] = attr;
                    this.duplicatesAndParents( k, value[property] );
                    isComposite = true;
                }
            }

            const hasPrimAttr = hasPrimitiveAttr(value);
            if( hasPrimAttr && !this.allTables.includes(attr) )
                this.allTables.push(attr);
            if( !isComposite ) {
                this.objCounts[key] = tmp + 1;                
            }     
            if( 1 < this.objCounts[key] && !this.notNormalized.includes(attr) )
                this.notNormalized.push(attr);
        }

        this.parent = function ( table ) {
            let ret = this.child2parent[table];
            if( ret != null && !this.allTables.includes(ret) )
                return this.parent(ret);
            return ret; 
        }

    }

    return translate;
}());

export default json2qsql;