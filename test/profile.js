import  {quicksql,fromJSON} from "../src/ddl.js";

let input = "table\n";
for( let i = 0; i < 1000; i++)
    input += ' '.repeat(3*Math.floor(i/20)+3)+'attr'+i+'\n';
console.log('input='+input.substring(0,1000));
    
let t1 = Date.now();

let output = quicksql.toDDL(input);
console.log("length="+output.length);
console.log(output.substring(0,1000));

console.log("Time = "+(Date.now()-t1));


