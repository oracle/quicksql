import {quicksql, toERD, toDDL} from '../dist/quick-sql.js';

function assert( condition ) {
    if( !eval(condition) ) {
        console.error("Failed: "+condition);
        throw new Error('Test failed');
    }   
}

let output;

export default function compatibility_tests() {

    let input = `dept
    name
    `
    output = JSON.stringify(toERD(input), null, 4); 
    assert( "0 < output.indexOf('dept')" );
    output = JSON.stringify(quicksql.toERD(input), null, 4); 
    assert( "0 < output.indexOf('dept')" );

    output = toDDL(input); 
    assert( "0 < output.indexOf('dept')" );
    output = quicksql.toDDL(input); 
    assert( "0 < output.indexOf('dept')" );

    // since 1.2.0
    let qsql = new quicksql(input); // build parse tree once only
    output = qsql.getDDL(); 
    assert( "0 < output.indexOf('dept')" );
    output = JSON.stringify(qsql.getERD(), null, 4); 
    assert( "0 < output.indexOf('dept')" );

}

compatibility_tests();
