import  {quicksql,fromJSON} from "../src/ddl.js";

import fs from "fs";
  
try {
    let file = '//Bug35756025/1.qsql';
    //file = '//DV/car_racing/2.qsql';
    file = '//star/donuts.qsql';
    file = '//experimental/donuts.json';

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
        output = fromJSON(input, key);
        if( 0 <= ofile.indexOf('/experimental/') )
            fs.writeFileSync(ofile+'.qsql', output);
        else {
            output += '\n\n-- =========================================\n\n';
            console.log(output);
        }
        input = output;
    } 
    if( 0 <= file.indexOf('/erd/') ) {
        output = JSON.stringify(new quicksql(input).toERD(), null, 4);
    } else
        output = new quicksql(input).getDDL();
    
    if( 0 <= ofile.indexOf('/experimental/') ) 
        fs.writeFileSync(ofile+'.sql', output);
    else
        console.log(output); 

} catch(e) {
    console.error(e);
};
