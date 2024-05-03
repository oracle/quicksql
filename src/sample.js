import Chance from 'chance';
import lexer from './lexer.js';


export function generateSample( lTable, lColumn, lType, values ) {
    var chance = new Chance(seed);
    let type = lType.toUpperCase();
    let table = lTable.toUpperCase();
    let column = lColumn.toUpperCase();
    if( values != null && 0 < values.length ) {
        let min = 0;
        let max = values.length;
        let value = values[Math.floor(seededRandom() * (max - min)) + min];
        if(  !type.startsWith('INTEGER') && !type.startsWith('NUMBER') && !type.startsWith('DATE') 
          && (!value.toLowerCase || value.toLowerCase() != 'null') 
          && ( !value.charAt || (value.charAt(0) != 'q' && value.charAt(1) != '\'') )
        ) { 
            if( value.charAt && value.charAt(0) == '\'' ) 
                value = value.substring(1,value.length-1);
            value = value.replaceAll('\'','\'\''); 
            value = "'"+value+"'"; 
        }
        return value;    		
    }
    
    if( column == 'NAME' && 0 <= table.indexOf('DEPARTMENT') ) {
        var depts = ['Sales','Finance','Delivery','Manufacturing'];
        let min = 0;
        let max = depts.length;
        return '\''+depts[Math.floor(seededRandom() * (max - min)) + min]+'\'';
    }

    if( chance[column.toLowerCase()] != undefined 
        && column.indexOf('NAME') < 0 
    ) {
        return '\''+chance[column.toLowerCase()]()+'\'';
    }
    if( column == 'FIRST_NAME' ) 
        return '\''+chance.first()+'\'';
    if( column == 'LAST_NAME' ) 
        return '\''+chance.last()+'\'';
    if( 0 <= column.indexOf('NAME') ) 
        return '\''+chance.name()+'\'';

    /*if( 0 <= column.indexOf('NAME') || 0 <= column.indexOf('OWNER') ) {
        return "'"+chance.last()+"'";
    }*/
    
    if( 0 < column.indexOf('ADDRESS') ) {
        return '\''+chance.address()+'\'';
    }
    
    if( column == 'LOCATION') {
        return '\''+chance.city()+'\'';
    }

    if( column == 'DESCRIPTION') {
        let descr = chance.paragraph({sentences: 2});
        let tSrc = lexer(lType,false,true,'');
        let len = 400
        let pos = -1;
        for( let i = 0; i < tSrc.length; i++ ) {
            const t = tSrc[i].value;
            if( t == '(' ) {
                pos = i+1;
                continue;
            }
            if( 0 < pos && t == ')' ) {
                len = parseInt(tSrc[pos].value);
                break;
            }
        }    

        if( len < descr.length )
            descr = descr.substring(0,len);
        return '\''+descr+'\'';
    }
    
    if( column == 'JOB' ) {
        var jobs = ['Engineer','Consultant','Architect','Manager','Analyst','Specialist','Evangelist','Salesman'];
        let min = 0;
        let max = jobs.length;
        return '\''+jobs[Math.floor(seededRandom() * (max - min)) + min]+'\'';
    }

    if( type.startsWith('INTEGER') || type.startsWith('NUMBER') ) {
        let min = 0;
        let max = 100;
        return Math.floor(seededRandom() * (max - min)) + min;
    }
    if( type.startsWith('DATE') || type.startsWith('TIMESTAMP')  ) {
        let min = 0;
        let max = 100;
        var offset = Math.floor(seededRandom() * (max - min)) + min;
        return 'sysdate-'+offset;
    }
    if( type == 'BLOB' || type == 'LONG' ) {
        return 'null';
    }

    return '\'N/A\'';
}

var seed = 1;
export function resetSeed() {
    seed = 1;
}

function seededRandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export default {generateSample,resetSeed};

