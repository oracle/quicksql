import quicksql from '../dist/quick-sql.js';

function assert( condition ) {
    if( !eval(condition) ) {
        console.error("Failed: "+condition);
        throw new Error('Test failed');
    }   
}

export default function compatibility_tests() {

    input = `dept
    name
    `
    output = JSON.stringify(quicksql.toERD(input), null, 4); 
    assert( "0 < output.indexOf('dept')" );

    input = `dept
    name
    `
    output = quicksql.toDDL(input); 
    assert( "0 < output.indexOf('dept')" );
}

