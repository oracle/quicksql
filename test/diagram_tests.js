import  {quicksql, toERD} from "../src/ddl.js";

import fs from "fs";


function assert( condition ) {
    if( !eval(condition) ) {
        console.error("Failed: "+condition);
        throw new Error('Test failed');
    }   
}

var output;
var output1;
var input;


export default function diagram_tests() {

    const opt = `{"schema": "my_schema",
    "auditcols": "Y", "prefix": "prefix","prefixpkwithtname": "Y",
    "createdcol": "created",
    "createdbycol": "created_by",
    "updatedcol": "updated1",
    "updatedbycol": "updated_by","rowkey": "Y", "rowversion": "Y", "prefixpkwithtname": "Y"
    }`;
    input = `dept
    name
    emp
        name
    `
    output = JSON.stringify(toERD(input,opt), null, 4); // 1.1.5 compatibility

    assert( "0 < output.indexOf('prefix_dept')" );
    assert( "0 < output.indexOf('\"schema\": \"my_schema\",')" );
    assert( "0 < output.indexOf('\"name\": \"row_key\",')" );
    assert( "0 < output.indexOf('\"name\": \"row_version\",')" );
    assert( "0 < output.indexOf('\"name\": \"updated1\",')" );
    assert( "0 < output.indexOf('\"source\": \"my_schema.prefix_dept\",')" );
    assert( "0 < output.indexOf('\"target\": \"my_schema.prefix_emp\",')" );
    assert( "0 < output.indexOf('\"name\": \"prefix_dept\",')" );

    input = 
`Bug35827754
    data file
    `
    output = new quicksql(input).getERD();

    assert( "output.items[0].columns[2].name == 'data_filename'" );
    assert( "output.items[0].columns[2].datatype == 'varchar2(255 char)'" );
    assert( "output.items[0].columns[5].name == 'data_lastupd'" );
    assert( "output.items[0].columns[5].datatype == 'date'" );

    input = 
    `customers
    name vc40
    customer_addresses /cascade
        street vc40`
    output = new quicksql(input).getERD();

    input = 
    `customers
    name vc40

customer_addresses /cascade
    customer_id /fk customers
    street vc40`
    output1 = new quicksql(input).getERD();

    //console.log(output.items[1].columns[1]);
    assert( "output.items[1].columns[1].name == output1.items[1].columns[1].name" );
    assert( "output.items[1].columns[1].datatype == output1.items[1].columns[1].datatype" );  

}


diagram_tests();