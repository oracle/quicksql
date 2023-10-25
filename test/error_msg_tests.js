import  ddl from "../src/ddl.js";
import errorMsgs from '../src/errorMsgs.js'


function checkError(msgList, line, offset, msg) {
    for( const i in msgList ) {
        if( msgList[i].line == line && msgList[i].offset == offset && msgList[i].message == msg )
            return;
    }
    throw new Error('Test failed for "'+msg+'" @line= '+line);
}    

var output;
var input;

export default function error_msg_tests() {

    output = ddl.errorMsgs(`dept
    id
    `);
    checkError(output, 1, 4, errorMsgs.messages.duplicateId);
  
    output = ddl.errorMsgs(`dept
    name vc-200
    name vc0
    `);
    checkError(output, 1, 4+4+2+1, errorMsgs.messages.invalidDatatype);
    checkError(output, 2, 4+4+1, errorMsgs.messages.invalidDatatype);

}


error_msg_tests();