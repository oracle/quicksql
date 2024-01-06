import Chance from 'chance';
var chance = new Chance();

export function generateSample( lTable, lColumn, lType, values ) {
    if( lType == null )
        console.log();
    let type = lType.toUpperCase();
    let table = lTable.toUpperCase();
    let column = lColumn.toUpperCase();
    if( values != null && 0 < values.length ) {
        let min = 0;
        let max = values.length;
        var optQuote = '\'';
        if(  type.startsWith('INTEGER') || type.startsWith('NUMBER') || type.startsWith('DATE')  ) 
            optQuote = '';
        let value = values[Math.floor(seededRandom() * (max - min)) + min];
        if( value.toLowerCase && value.toLowerCase() == 'null' )
            optQuote = '';
        return optQuote+value+optQuote;    		
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
        return '\''+chance.paragraph({sentences: 2})+'\'';
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

