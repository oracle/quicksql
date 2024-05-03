import  {quicksql,fromJSON} from "../src/ddl.js";

import {checkNoError} from './error_msg_tests.js'

import fs from "fs";
  
try {
    let file = '//bugs/Bug35063257.quicksql';
    //file = '//experimental/food_product.json';
    file = '//erd/Bug35814250/1-3.qsql';
    file = '//apex/project_management.quicksql';

    let args = process.argv.slice(2);
    if( 0 < args.length )
        file = args[0];
    //console.log(file);
    
    const text = fs.readFileSync('./test/'+file) 
    let input = text.toString(); 
    
    let ofile = './test/'+file;
    const dot = ofile.lastIndexOf('.');
    ofile = ofile.substring(0,dot);

    let output = null;
    if( file.endsWith('.json') ) {
        let key = file.substring(0,file.length-'.json'.length);
        const sp = file.lastIndexOf('/');
        if( 0 < sp )
            key = key.substring(sp+1);
        let t1 = Date.now();
        output = fromJSON(input, key);
        console.log("JSON Time = "+(Date.now()-t1));
        if( 0 <= ofile.indexOf('/experimental/') )
            fs.writeFileSync(ofile+'.qsql', output);
        else {
            output += '\n\n-- =========================================\n\n';
            console.log(output);
        }
        input = output;
    }
    let t1 = Date.now();
    if( 0 <= file.indexOf('/erd/') ) {
        const p = new quicksql(input);
        output = JSON.stringify(p.getERD(), null, 4);
    } else {
        const p = new quicksql(input);
        const errors =  p.getErrors(text);
        checkNoError(errors);
        output = p.getDDL();
    }
        
    console.log("DDL Time = "+(Date.now()-t1));    
    
    if( 0 <= ofile.indexOf('/experimental/') ) 
        fs.writeFileSync(ofile+'.sql', output);
    else
        console.log(output); 

} catch(e) {
    console.error(e);
};
