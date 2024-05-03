import {quicksql, toDDL} from "../src/ddl.js";

var assertionCnt = 0;

function assert( condition ) {
    if( !eval(condition) ) {
        console.error("Failed: "+condition);
        throw new Error('Test failed');
    } 
    assertionCnt++; 
}

var output;
var output1;

export default function small_tests() {

    output = toDDL(   // 1.1.5 compatible but deprecated function call
        `departments
            name
# settings = {"prefix": "RIGHT"}  
        `, 
        '{"prefix": "WRONG"}'
    );

    assert( "0 < output.indexOf('create table right_departments')" );
    //                                         ^^^^     

    output = new quicksql(
        `Bug35683432
            name
        `, 
        '{"notAnOption1": "should raise an Error"}'
    ).getDDL();
    assert( "0 < output.indexOf('Unknown setting: notanoption1')" );


    output = new quicksql(
        `Bug35683432
            name
# settings = {"notAnOption2": "should raise an Error"}            ` 
    ).getDDL();
    assert( "0 < output.indexOf('Unknown setting: notanoption2')" );

    output = new quicksql(
        `departments
            name
        # settings = {"genpk": false}            
        `
    ).getDDL();

    assert( "-1 == output.indexOf('ID     NUMBER GENERATED'.toLowerCase())" );
 
    output = new quicksql(
        `departments
            name
        # settings = {genpk: false}            
        `
    ).getDDL();

    assert( "-1 == output.indexOf('ID     NUMBER GENERATED'.toLowerCase())" );
 
    // ddl.setOptionValue('genpk',false);
    output = new quicksql(
        `departments
            name
        `,
        '{ "genpk": false }'
    ).getDDL();

    assert( "-1 == output.indexOf('ID     NUMBER GENERATED'.toLowerCase())" );

    output = new quicksql(`
departments
    name
# settings = { "api": true }
`, '{ "api": false }').getDDL();

    assert( "0 < output.indexOf('DEPARTMENTS_API'.toLowerCase())" );

    output = new quicksql(`
departments
        name
    # settings = { "Compress": "yEs" }
    `).getDDL();

    assert( "0 < output.indexOf(') compress;')" );
    
    output = new quicksql(`
Bug35650456
    name  vc32k
    `).getDDL();

    assert( "0 < output.indexOf('name    varchar2(32767 char)')" );

    output = new quicksql(`
Bug35668454
# settings = { drop: "Y"}
    `).getDDL();
           
    assert( "0 <= output.indexOf('drop table bug35668454')" ); 
    
    output = new quicksql(`
Bugs35692739_35692703_35692625
   inventory json
   name vc50
   description vc(255)
   date_creation timestamp
   date_packed tstz
   date_production timestamp with local time zone
        `).getDDL();
                   
    assert( "0 < output.indexOf('clob check (inventory is json)')" );
    assert( "0 < output.indexOf('varchar2(50 char),')" );
    assert( "0 < output.indexOf('varchar2(255 char)')" );
    assert( "0 < output.indexOf('date_creation      timestamp,')" );
    assert( "0 < output.indexOf('date_packed        timestamp with time zone,')" );
    assert( "0 < output.indexOf('date_production    timestamp with local time zone')" );
    
    output = new quicksql(`
Bug35683307 /insert 1
  # settings = { inserts: false}
            `).getDDL();

    assert( "-1 == output.indexOf('insert into')" );

    // NOTE: This test can't be performed anymore since it uses an internal method of ddl.js
    /*output = new quicksql(`
ER_35698875 
      # settings = { inserts: false}
                `);
    
    assert( !ddl.appliedOptions['inserts'].value);*/
    //console.log(ddl.getOptionValue('inserts'));
    //console.log(ddl.appliedOptions['inserts'].value);

    output = new quicksql(`
Bug_35683200 /insert 1
view bv Bug_35683200
# settings = { inserts: false}
# settings = { "schema": "HR"}
    `, '{"prefix": "The"}').getDDL();

    assert( "0 < output.indexOf('create table hr.the_Bug_35683200')" );
    assert( "0 < output.indexOf('replace view hr.the_bv')" );
    assert( "0 < output.indexOf('# settings = {\"inserts\":false,\"prefix\":\"The\",\"schema\":\"HR\"}')" );
    
    output = new quicksql(`
Bug_35677264
   product
   amt number
   qty number

# settings = { PK: "GUID", semantics: "CHAR", language: "EN", APEX: true }
    `).getDDL();

    assert( "0 < output.indexOf('number default on null to_number(sys_guid(), ')" );
    assert( "0 < output.indexOf('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')" );
    
    output = new quicksql(`
Bug_35677301

# settings = { semantics: "CHAR", auditCols: true, language: "EN", APEX: true, createdCol: "created_col", createdByCol: "created_by_col", updatedCol: "updated_col", updatedByCol: "updated_by_col" }
    `).getDDL();

    assert( "0 < output.indexOf('created_col')" );
    assert( "0 < output.indexOf('created_by_col')" );
    assert( "0 < output.indexOf('updated_col')" );
    assert( "0 < output.indexOf('updated_by_col')" );

    output = new quicksql(`
Bug35714241
    proficiency /check 'Test'
    `).getDDL();
    
    assert( "0 < output.indexOf(\"in ('Test'\")" );
   
    // 35714343
    output = new quicksql(`
departments
    dname
    emp
        department_id /fk departments
        ename
    `).getDDL();
    
    assert( " output.indexOf('department_id    number') ==  output.lastIndexOf('department_id    number') " );

    // 35715610
    output = new quicksql(`
dept
    dname
    emp /cascade
        dept_id
        ename
    `).getDDL();
    
    assert( "0 < output.indexOf('dept_id    number')" );
    assert( "0 < output.indexOf('constraint emp_dept_id_fk')" );
    assert( "0 < output.indexOf('references dept on delete cascade')" );

    // 35724078
    output = new quicksql(`
dept
    name
    
    --- toDDL() second parameter:
    # settings = {"apex":"Y","api":"N","auditcols":"N","compress":"N","date":"DATE","db":"19c","drop":"N","editionable":"N","genpk":"Y","inserts":"Y","language":"EN","longvc":null,"pk":"IDENTITY","prefix":null,"prefixpkwithtname":"N","rowkey":"N","rowversion":"N","schema":null,"semantics":"CHAR","createdcol":"created","createdbycol":"created_by","updatedcol":"updated","updatedbycol":"updated_by"} 
    `,
    '{"apex":"Y","api":"N","auditcols":"N","compress":"N","date":"DATE","db":"19c","drop":"N","editionable":"N","genpk":"Y","inserts":"Y","language":"EN","longvc":null,"pk":"IDENTITY","prefix":null,"prefixpkwithtname":"N","rowkey":"N","rowversion":"N","schema":null,"semantics":"CHAR","createdcol":"created","createdbycol":"created_by","updatedcol":"updated","updatedbycol":"updated_by"}'
    ).getDDL();
    //assert( "0 < output.indexOf('# settings = {\"apex\":\"Y\",\"db\":\"19c\",\"pk\":\"IDENTITY\"}')" );
    assert( "0 < output.indexOf('# settings = {\"apex\":\"Y\",\"db\":\"19c\",\"pk\":\"IDENTITY\"}')" );

    output = new quicksql(`
dept /insert 5
    name
# inserts : N`,'{"inserts":"N"}').getDDL();

    assert( "0 > output.indexOf('# inserts : N')" );
    
    output = new quicksql(`
Bug35737572
    flight_json json
    `).getDDL();

    assert( "0 < output.indexOf('clob check (flight_json is json)')" );
     
    output = new quicksql(`
Bug35737578
    flight_file file
    `).getDDL();
   
    assert( "0 < output.indexOf('flight_file_filename')" );
         
    output = new quicksql(`
bug35748389
    name
    
    # settings = {"pk":"NONE"}
    `).getDDL();
   
    assert( "output.indexOf('trigger') < 0" );
    assert( "0 < output.indexOf('constraint bug35748389_id_pk primary key,')" );
         
    output = new quicksql(`
bug35748389_2
    name
    
    # settings = {"pk":"seq"}
    `).getDDL();
   
    assert( "output.indexOf('trigger') < 0" );
    assert( "0 < output.indexOf('number default on null bug35748389_2_seq.nextval')" );
    assert( "0 < output.indexOf('constraint bug35748389_2_id_pk primary key,')" );
         
    output = new quicksql(
    `bug35748389_3
        name
    
    # settings = {"genpk":false}
    `).getDDL();
   
    assert( "output.indexOf('trigger') < 0" );
    assert( "output.indexOf('id') < 0" );
         
    output = new quicksql(
    `bug35748389_4
        name
    
    # settings = {"pk":"identity"}
    `).getDDL();
   
    assert( "output.indexOf('trigger') < 0" );
    assert( "0 < output.indexOf('number generated by default on null as identity')" );
    assert( "0 < output.indexOf('constraint bug35748389_4_id_pk primary key,')" );
 
    output = new quicksql(
    `Bug 35756025
    deptno                         num(2,0)  /nn /pk 
    dname                          vc(14) 
    loc                            vc(13) 
    `).getDDL();
       
    assert( "0 < output.indexOf('number(2,0) default on null to_number(sys_guid(), ')" );
    assert( "0 < output.indexOf('constraint bug_35756025_deptno_pk primary key,')" );

    output = new quicksql(
    `Bug 35757130
    file_name                      vc(512) 
    file_mimetype                  vc(512) 
    file_charset                   vc(512) 
    file_lastupd                   date 
    file_blob                      blob 
    file_comments                  vc(4000) 
    tags          `).getDDL();
           
    assert( "0 < output.indexOf('file_name        varchar2(512 char),')" );
    assert( "output.indexOf('file_mimetype_mimetype') < 0" );
    assert( "output.indexOf('file_lastupd_filename') < 0" );
    
    output = new quicksql(
    `Bug35737917 /auditcols
        name
    # settings = {"apex":"false"}
    `, '{"apex":"true"}').getDDL();
               
    assert( "0 < output.indexOf(':new.created_by := user;')" );
    assert( "output.indexOf('APEX$SESSION') < 0" );

    output = new quicksql(
    `Bug35757000 
            name
    # settings = {"overrideSettings":"true"}
    `, '{"prefix":"X"}').getDDL();
                   
    assert( "output.indexOf('x_') < 0" );
    
    output = new quicksql(
    `Bug35650456_2
        job vc5000
    
    --- Non-default options:
    # settings = {"apex":"Y","db":"19c","longvc":"N"}
    `).getDDL();
             
    assert( " output.indexOf('Non-default options') ==  output.lastIndexOf('Non-default options') " );

    // Bug 35775121
    output = new quicksql( 
`dept
    name

emp
    dept_id /cascade
    name
    `).getDDL();
                          
    assert( " 0 < output.indexOf('constraint emp_dept_id_fk') " );
    assert( " 0 < output.indexOf('references dept on delete cascade,') " );
    assert( " output.indexOf('dept_id    integer') < 0 " );
    
    output = new quicksql( 
        `demo_item_order
            comment vc80`).getDDL();
                
    assert( " 0 < output.indexOf('the_comment') " );

    output = new quicksql( 
`team_members /insert 1
    username /nn /upper
projects /insert 1
    name /nn
    project_lead /nn /references team_members`).getDDL();
                                      
    output = new quicksql( 
`person
    id num /pk
    name vc40
    date_of_birth date
    mother /fk person
    father /fk person
    `).getDDL();
                                                  
    assert( " 0 < output.indexOf('id               number') " );    
    assert( " 0 < output.indexOf('person_id_pk primary key') " );    

    output = new quicksql( 
`countries
    code vc2 /pk
    `).getDDL();
    assert( " 0 < output.indexOf('code    varchar2(2 char) not null') " ); 

    output = new quicksql( 
`countries
    country_id vc2 /pk 
    `).getDDL();
    assert( " 0 < output.indexOf('country_id    varchar2(2 char) not null') " ); 
                    
    output = new quicksql( 
`Bug35827840
    col1 vc
    `).getDDL();
        
    assert( " 0 < output.indexOf('col1    varchar2(4000') " );     

    output = new quicksql( 
`Bug35827927
    colstr string
    colvarchar varchar
    colvarchar2 varchar2
    colchar char
    `).getDDL();
                
    assert( " 0 < output.indexOf('colstr    ') " );                                     
    assert( " 0 < output.indexOf('colvarchar    ') " );                                     
    assert( " 0 < output.indexOf('colvarchar2    varchar2(4000') " );                                     
    assert( " 0 < output.indexOf('colchar    ') " );   
    
    output = new quicksql( 
`Bug35814922
    important_yn
    important1 yn
    important2 bool
    is_important
    `).getDDL();
    assert( " 0 < output.indexOf('important_yn    varchar2(1') " );                                     
    assert( " 0 < output.indexOf('constraint bug35814922_important_yn') " );                                     
    assert( " 0 < output.indexOf('important1      varchar2(1')" );                                     
    assert( " 0 < output.indexOf('constraint bug35814922_important1') " );                                     
    assert( " 0 < output.indexOf('important2      varchar2(1') " );    
    assert( " 0 < output.indexOf('constraint bug35814922_important2') " );    
    assert( " 0 < output.indexOf('is_important    varchar2(1') " );    
    assert( " 0 < output.indexOf('constraint bug35814922_is_important') " );    
    
    output = new quicksql( 
`Bug35842845 
    ファーストネーム vc200 
    Das Gedöns	vc200 
    locatilon;drop user sys;
    country;shutdown abort;a  
    `).getDDL();
    assert( " 0 < output.indexOf('\"ファーストネーム\"') " );                                     
    assert( " 0 < output.indexOf('\"Das Gedöns\"') " );                                     
    assert( " 0 < output.indexOf('\"locatilon;drop user sys;\"') " );                                     
    assert( " 0 < output.indexOf('\"country;shutdown abort;a\"') " ); 
    
    output = new quicksql( 
        `"Test" 
            "CamelCase"
            x   [coMment]  
            2   --coMment2  
    `).getDDL();

    assert( " 0 < output.indexOf('create table \"Test\"') " );                                     
    assert( " 0 < output.indexOf('Test_id_pk') " );                                     
    assert( " 0 < output.indexOf('\"CamelCase\"') " );                                     
    assert( " 0 < output.indexOf('comment on column \"Test\".x is ') " );                                     
    assert( " 0 < output.indexOf('comment on column \"Test\".x2 is ') " );                                     
         
    // 35936560
    output = new quicksql( 
    `mytable /rest
        name
    `).getDDL();
    assert( " output.indexOf('p_object')+5 < output.indexOf('MYTABLE') " );    
                                     
    output = new quicksql( 
    `"yourTable" /rest
    name      
    `).getDDL();
    assert( " output.indexOf('p_object')+5 < output.lastIndexOf('yourTable') " ); 

    output = new quicksql( 
    `customers
        cid /pk
    
    #settings = { pk: "SEQ"}      
        `).getDDL();
        
    assert( " 0 < output.indexOf('cid    number default on null customers_seq.nextval') " ); 
    assert( " output.indexOf('trigger') < 0 " ); 
                                            
    output = new quicksql( 
    `customers
        id
    `).getDDL();
        
    assert( " output.indexOf('id    varchar2') < 0 " ); 

    // https://github.com/oracle/quicksql/issues/26
    output = new quicksql( 
`dept
    name

view v dept

# settings = {prefix: "abc"}
    `).getDDL();
        
    assert( "output.indexOf('from') <  output.lastIndexOf('abc_dept') " ); 

    // https://github.com/oracle/quicksql/issues/27
    output = new quicksql( `dept
    name
        
    # settings = {prefix: "prefix", schema: "schema"}
    `).getDDL();
                    
    assert( "output.indexOf('schema.prefix_dept_id_pk') < 0 " ); 
            
    // https://github.com/oracle/quicksql/issues/28
    output = new quicksql( `# settings = {"pk":"GUID"}
students /insert 2 
        name
    `).getDDL();
                    
    assert( "output.indexOf('trigger') < 0 " ); 
    assert( "output.indexOf('alter') < 0 " ); 

    // https://github.com/oracle/quicksql/issues/29
    output = new quicksql( `employees /insert 1
       date hired
   
   #settings={ date:timestamp}
    `).getDDL();
                       
    assert( "output.indexOf('N/A') < 0 " );  

    // https://github.com/oracle/quicksql/issues/31
    output = new quicksql( `departments /audit cols
   name 
   employees /audit columns
       name 
    `).getDDL();
                   
    assert( "0 < output.indexOf(\"department_id\")" );
    assert( "output.indexOf('audit all') < 0 " );  
    assert( "output.indexOf('created       date not null') <  output.lastIndexOf('created          date not null,')" );  

    // https://github.com/oracle/quicksql/issues/32
    output = new quicksql( `queues
    created /default sysdate
    created dt /default systimestamp
    `).getDDL();
                   
    assert( "0 < output.indexOf('default on null sysdate')" );  
    assert( "0 < output.indexOf('default on null systimestamp')" );  

    // https://github.com/oracle/quicksql/issues/32
    output = new quicksql( `# pk: SEQ
    # drop: Y
students 
    name
    `).getDDL();
                   
    assert( "0 < output.indexOf('drop sequence students_seq')" );  

    // https://github.com/oracle/quicksql/issues/42
    output = new quicksql( `test
    approved boolean /default N
    `).getDDL();
                       
    assert( "0 < output.indexOf(\"default on null 'N'\")" );   

    // https://github.com/oracle/quicksql/issues/43
    output = new quicksql( `test
        foo_id int /nn /fk foo
    `).getDDL();
                           
    assert( "0 < output.indexOf(\"foo_id    integer\")" );      

    // https://github.com/oracle/quicksql/issues/46
    output = new quicksql( `test
        test_name
        test_description
        test_number
        test_date
    `).getDDL();
                           
    assert( "0 < output.indexOf(\"test_name           varchar2(255\")" );      
    assert( "0 < output.indexOf(\"test_description    varchar2(4000\")" );      
    assert( "0 < output.indexOf(\"test_number         number\")" );      
    assert( "0 < output.indexOf(\"test_date           date\")" );      

    // https://github.com/oracle/quicksql/issues/48
    output = new quicksql( `support
    support_email vc100 /default support@oracle.com
    `).getDDL();
                           
    assert( "0 < output.indexOf(\"support_email    varchar2(100 char) default on null 'support@oracle.com'\")" );      

    // https://github.com/oracle/quicksql/issues/49
    output = new quicksql( `change_history
    data_type vc20 /check VARCHAR2,CLOB,TSWLTZ
    `).getDDL();
                           
    assert( "0 < output.indexOf(\"data_type    varchar2(20\")" );      

    // https://github.com/oracle/quicksql/issues/51
    output = new quicksql( `foo
    bar /boolean /default y
    `).getDDL();
                        
    assert( "0 < output.indexOf(\"varchar2(1 char) default on null 'y'\")" );   
    assert( "0 < output.indexOf(\"constraint foo_bar check (bar in ('Y','N'))\")" );   
    
    // https://github.com/oracle/quicksql/issues/47
    output = new quicksql( `employee /UK first_name, last_name
    first_name
    last_name `).getDDL();
                       
    assert( "0 < output.indexOf(\"alter table employee add constraint employee_uk unique (first_name,last_name);\")" );    

    // https://github.com/oracle/quicksql/issues/47
    output = new quicksql( `employee /pk first_name, last_name
    first_name
    last name
    job history
        start_date
        end_date
    `).getDDL();
                        
     assert( "output.indexOf(\"employee_id\") < 0" );   // neither in employees and job_history tables
    assert( "0 < output.indexOf(\"alter table employee add constraint employee_pk primary key (first_name,last_name);\")" );    
    assert( "0 < output.indexOf(\"constraint employee_job_history_fk foreign key (first_name,last_name) references employee;\")" );  
    
    // https://github.com/oracle/quicksql/issues/52
    output = new quicksql(`dept
    dname
    emp /setnull
        dept_id
        ename
    `).getDDL();
    
    assert( "0 < output.indexOf('dept_id    number')" );
    assert( "0 < output.indexOf('constraint emp_dept_id_fk')" );
    assert( "0 < output.indexOf('references dept on delete set null')" );

    output = new quicksql(`dept
    dname
    # settings = {"prefix": "abc_"} 
    `).getDDL();
    
    assert( "0 < output.indexOf('abc_dept')" );
    assert( "output.indexOf('abc__dept') < 0 " );  

    output = new quicksql(`dept
     dname
    `).getDDL();

    assert( "0 < output.indexOf('number default on null to_number(sys_guid()')" );

    // https://github.com/oracle/quicksql/issues/51
    output = new quicksql(`boolvalues
    is_legal
    finished_yn
    ok   bool
    yes  boolean
    #db:"23"`).getDDL();

    assert( "0 < output.indexOf('is_legal       boolean,')" );
    assert( "0 < output.indexOf('finished_yn    boolean,')" );
    assert( "0 < output.indexOf('ok             boolean,')" );
    assert( "0 < output.indexOf('yes            boolean')" );

    // https://github.com/oracle/quicksql/issues/51
    output = new quicksql(`boolvalues
    is_legal
    finished_yn
    ok   bool
    yes  boolean
    #db:"23c"`).getDDL();

    assert( "0 < output.indexOf('is_legal       boolean,')" );
    assert( "0 < output.indexOf('finished_yn    boolean,')" );
    assert( "0 < output.indexOf('ok             boolean,')" );
    assert( "0 < output.indexOf('yes            boolean')" );
    // https://github.com/oracle/quicksql/issues/51
    output = new quicksql(`boolvalues
    is_legal
    finished_yn
    ok   bool
    yes  boolean
    #db:"23.1.1"`).getDDL();

    assert( "0 < output.indexOf('is_legal       boolean,')" );
    assert( "0 < output.indexOf('finished_yn    boolean,')" );
    assert( "0 < output.indexOf('ok             boolean,')" );
    assert( "0 < output.indexOf('yes            boolean')" );
    // https://github.com/oracle/quicksql/issues/51
    output = new quicksql(`boolvalues
        ok   bool
        #boolean:native`).getDDL();
    assert( "0 < output.indexOf('ok    boolean')" );

    output = new quicksql(`boolvalues
    ok   bool
    #boolean:yn
    #db:"23c"`).getDDL();
    assert( "output.indexOf('ok    boolean') < 0" );

    // https://github.com/oracle/quicksql/issues/55
    output = new quicksql(`escape /insert 1
    financial_year /check '23/24', \`'24/25'\`
    surname vc60 /check 'O''Hara', q'{O'Tool}'  
    start_date /check  \`to_date('01-APR-2025','DD-MON-YYYY')\``).getDDL();
    assert( "0 < output.indexOf(\"check (financial_year in ('23/24','24/25')),\")" );
    assert( "0 < output.indexOf(\"check (surname in ('O''Hara',q'{O'Tool}')),\")" );
    assert( "0 < output.indexOf(\"check (start_date in (to_date('01-APR-2025','DD-MON-YYYY')))\")" );
    assert( "output.indexOf(\"''24/25''\") < 0" );
    assert( "output.indexOf(\"q''{O''Tool}''\") < 0" );
    assert( "output.indexOf(\"to_date(''01-APR-2025'',''DD-MON-YYYY'')\") < 0" );
  
    output = new quicksql(`departments /insert 1
    name /nn
    # settings = {"prefix":"test"}`).getDDL();
    assert( "0 < output.indexOf(\"insert into test_departments (\")" );

    output = new quicksql(`# settings = {prefixPKwithTname:true, "api":"Y"}
person
    first_name 
    last_name
    first_date
addreess
    address1
    address2
    person_id`).getDDL();
    assert( "output.indexOf(\"p_id\") < 0" );
    
    output = new quicksql(`test /insert 1 /colprefix pre 
   t1    
    #drop:true
    `).getDDL();
    output = output.substring(0, output.indexOf("-- Generated by Quick SQL"));
    assert( "0 < output.indexOf(\"pre_t1\")" );
    assert( "output.indexOf(\" t1\") < 0" );

    // https://github.com/oracle/quicksql/issues/63
    output = new quicksql(`t
    s vc20 /nn /unique
    #prefix: e01
    `).getDDL();
    output = output.substring(0, output.indexOf("-- Generated by Quick SQL"));
    assert( "0 < output.indexOf(\"e01_t_id_pk\")" );
    assert( "0 < output.indexOf(\"e01_t_s_unq\")" );

   // https://github.com/oracle/quicksql/issues/65
   output = new quicksql(`reports /insert 1
   created date
   description vc20
   pdf blob 
   `).getDDL();
   output = output.substring(0, output.indexOf("-- Generated by Quick SQL"));
   assert( "output.indexOf(\"N/A\") < 0" );
   assert( "output.indexOf(\"efum ji ga sefze figi pomlot dadeziguz seak nigamu luv\") < 0" );
   assert( "0 < output.indexOf(\"Om pikawo pe amopi w\")" );

   // https://github.com/oracle/quicksql/issues/67
   output = new quicksql(`departments 
   name 
   employees 
      name 

view emp_v departments employees
   `).getDDL();
   output = output.substring(0, output.indexOf("-- Generated by Quick SQL"));
   //console.log(output);
   assert( "output.indexOf(\"departments.id/\") < 0" );


} 

 
small_tests();

console.log(assertionCnt);

// metatest that watches tests
const minimalTestCnt = 150;
if( assertionCnt < minimalTestCnt ) {
    console.error("assertionCnt < "+minimalTestCnt);
    throw new Error('Test failed');
} 
