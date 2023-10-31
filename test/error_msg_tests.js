import  ddl from "../src/ddl.js";
import errorMsgs from '../src/errorMsgs.js'


function checkError(msgList, line, offset, msg) {
    for( const i in msgList ) {
        if( msgList[i].from.line == line && msgList[i].from.depth == offset && msgList[i].message == msg ) {
            return;
        }
    }
    throw new Error('Test failed for "'+msg+'" @line= '+line);
}    

export function checkNoError(msgList, msgPrefix) {
    for( const i in msgList ) {
        if( msgList[i].message.indexOf(msgPrefix) == 0 ) {
            throw new Error('Test failed for "'+msg);
        }
    }   
}    


export default function error_msg_tests() {

    let output = ddl.errorMsgs(`dept
    id
    `);
    checkError(output, 1, 4, errorMsgs.messages.duplicateId);
  
    output = ddl.errorMsgs(`dept
    name vc-200
    name vc0
    `);
    checkError(output, 1, 4+4+2+1, errorMsgs.messages.invalidDatatype);
    checkError(output, 2, 4+4+1, errorMsgs.messages.invalidDatatype);
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = ddl.errorMsgs(`dept
    name
customer
    dept /fk department    
    `);
    checkError(output, 3, 4+4+1+3+1, errorMsgs.messages.undefinedObject+'department');
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = ddl.errorMsgs(`dept
    name
view customer_view customer
    `);
    checkError(output, 2, 4+1+13+1, errorMsgs.messages.undefinedObject+'customer');
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = ddl.errorMsgs(`dept
   col1
    "is this table or misaligned column?"
    `);
    checkError(output, 2, 4, errorMsgs.messages.misalignedAttribute+"3");

    output = ddl.errorMsgs(`dept
   col1
   col2
    "is this table or misaligned column?"
    `);
    checkError(output, 3, 4, errorMsgs.messages.misalignedAttribute+"3");

}


error_msg_tests();