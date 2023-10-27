import  ddl from "../src/ddl.js";
import  json2qsql from "../src/json2qsql.js";


import fs from "fs";
  
try {
    let file = '//DV/car_racing/2.qsql';//'DV/donuts.json';
    let args = process.argv.slice(2);
    if( 0 < args.length )
        file = args[0];
    //console.log(file);
    const text = fs.readFileSync('./test/'+file) 
    const input = text.toString(); 
    
    let output = null;
    if( file.endsWith('.json') ) {
        const obj = JSON.parse(input); 
        output = json2qsql.introspect(null, obj, 0);
        output += '\n\n-- =========================================\n\n';
        console.log(output);
        input = output;
    } 
    if( 0 <= file.indexOf('/erd/') ) {
        output = JSON.stringify(ddl.toERD(input), null, 4);
    } else
        output = ddl.toDDL(input);
    console.log(output);    
} catch(e) {
    console.error(e);
};
