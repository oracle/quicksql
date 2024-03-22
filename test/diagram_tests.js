import  {quicksql, toERD} from "../src/ddl.js";

import fs from "fs";


function assert( condition ) {
    if( !eval(condition) ) {
        console.error("Failed: "+condition);
        throw new Error('Test failed');
    }   
}

var output;
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
    //console.log(output);

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
    assert( "output.items[0].columns[2].datatype == 'varchar2(255)'" );
    assert( "output.items[0].columns[5].name == 'data_lastupd'" );
    assert( "output.items[0].columns[5].datatype == 'date'" );

}

diagram_tests();