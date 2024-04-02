import  {quicksql,toErrors} from "../src/ddl.js";
import errorMsgs from '../src/errorMsgs.js'

var assertionCnt = 0;

export function checkError(msgList, line, offset, msg) {
    assertionCnt++;
    for( const i in msgList ) {
        if( msgList[i].from.line == line && msgList[i].from.depth == offset && msgList[i].message == msg ) {
            return;
        }
    }
    throw new Error('Test failed for "'+msg+'" @line= '+line);
}    

export function checkNoError(msgList, msgPrefix) {
    assertionCnt++;
    for( const i in msgList ) {
        var isPrefix = msgList[i].message.indexOf(msgPrefix) == 0;
        if( msgPrefix == null )
            isPrefix = true;
        if( isPrefix ) {
            throw new Error('Test failed: extra error "'+msgList[i].message+'"');
        }
    }   
}    

var output;

export function error_msg_tests() {

    output =toErrors(`dept
    id
    `);
    checkError(output, 1, 4, errorMsgs.messages.duplicateId);
  
    output = new quicksql(`dept
    name vc-200
    name vc0
    `).getErrors();
    checkError(output, 1, 4+4+2+1, errorMsgs.messages.invalidDatatype);
    checkError(output, 2, 4+4+1, errorMsgs.messages.invalidDatatype);
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = new quicksql(`dept
    name
customer
    dept /fk department    
    `).getErrors();
    checkError(output, 3, 4+4+1+3+1, errorMsgs.messages.undefinedObject+'department');
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = new quicksql(`dept
    name
view customer_view customer
    `).getErrors();
    checkError(output, 2, 4+1+13+1, errorMsgs.messages.undefinedObject+'customer');
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = new quicksql(`dept
   col1
    "is this table or misaligned column?"
    `).getErrors();
    checkError(output, 2, 4, errorMsgs.messages.misalignedAttribute+"3");

    output = new quicksql(`dept
   col1
   col2
    "is this table or misaligned column?"
    `).getErrors();
    checkError(output, 3, 4, errorMsgs.messages.misalignedAttribute+"3");

    output = new quicksql(`dept
   name
   emp
      name
    `).getErrors();
    checkNoError(output, errorMsgs.messages.misalignedAttribute);

    output = new quicksql(`dept
   name
   
x = dept   
    `).getErrors();
    checkNoError(output);

    output = new quicksql(`# apex:Y
team_statuses
    name /fk undefined
    `).getErrors();
checkError(output, 2, 4+4+1+3+1, errorMsgs.messages.undefinedObject+'undefined');


    output = new quicksql(`team_statuses
    name  
    
teams
    name  
    status /fk team_statuses  [Status ]
    `).getErrors();
    checkNoError(output);

    output = new quicksql(`/* line1
    line2 */
team_statuses
    name /fk undefined
    `).getErrors();
    checkError(output, 3, 4+4+1+3+1, errorMsgs.messages.undefinedObject+'undefined');

    output = new quicksql(`emp
    ename
    deptno /fk dept
  
dept 
   dname`).getErrors();
    checkError(output, 5, 3, errorMsgs.messages.misalignedAttribute+"4");
  
    output = new quicksql(`emp /fk
    ename  /audit
    `).getErrors();
    checkError(output, 0, 5, errorMsgs.messages.tableDirectiveTypo);
    checkError(output, 1, 4+5+1+1+1, errorMsgs.messages.columnDirectiveTypo);
    
    console.log(assertionCnt);

    const minimalTestCnt = 10;
    if( assertionCnt < minimalTestCnt ) {
        console.error("assertionCnt < "+minimalTestCnt);
        throw new Error('Test failed');
    } 
 
}




