import quicksql from "../src/ddl.js";

function assert( condition ) {
    if( !eval(condition) ) {
        console.error("Failed: "+condition);
        throw new Error('Test failed');
    }   
}

var output;
var output1;


export default function small_tests() {

    output = quicksql.toDDL(
        `departments
            name
# settings = {"prefix": "RIGHT"}  
        `, 
        '{"prefix": "WRONG"}'
    );

    assert( "0 < output.indexOf('create table right_departments')" );
    //                                         ^^^^     

    output = quicksql.toDDL(
        `Bug35683432
            name
        `, 
        '{"notAnOption1": "should raise an Error"}'
    );
    assert( "0 < output.indexOf('Unknown setting: notAnOption1')" );


    output = quicksql.toDDL(
        `Bug35683432
            name
# settings = {"notAnOption2": "should raise an Error"}            ` 
    );
    assert( "0 < output.indexOf('Unknown setting: notAnOption2')" );

    output = quicksql.toDDL(
        `departments
            name
        # settings = {"genpk": false}            
        `
    );

    assert( "-1 == output.indexOf('ID     NUMBER GENERATED'.toLowerCase())" );
 
    output = quicksql.toDDL(
        `departments
            name
        # settings = {genpk: false}            
        `
    );

    assert( "-1 == output.indexOf('ID     NUMBER GENERATED'.toLowerCase())" );
 
    // ddl.setOptionValue('genpk',false);
    output = quicksql.toDDL(
        `departments
            name
        `,
        '{ "genpk": false }'
    );

    assert( "-1 == output.indexOf('ID     NUMBER GENERATED'.toLowerCase())" );

    output = quicksql.toDDL(`
departments
    name
# settings = { "api": true }
`, '{ "api": false }');

    assert( "0 < output.indexOf('DEPARTMENTS_API'.toLowerCase())" );

    output = quicksql.toDDL(`
departments
        name
    # settings = { "Compress": "yEs" }
    `);

    assert( "0 < output.indexOf(') compress;')" );
    
    output = quicksql.toDDL(`
Bug35650456
    name  vc32k
    `);

    assert( "0 < output.indexOf('name    varchar2(32767 char)')" );

    output = quicksql.toDDL(`
Bug35668454
# settings = { drop: "Y"}
    `);
           
    assert( "0 <= output.indexOf('drop table bug35668454')" ); 
    
    output = quicksql.toDDL(`
Bugs35692739_35692703_35692625
   inventory json
   name vc50
   description vc(255)
   date_creation timestamp
   date_packed tstz
   date_production timestamp with local time zone
        `);
                   
    assert( "0 < output.indexOf('clob check (inventory is json)')" );
    assert( "0 < output.indexOf('varchar2(50 char),')" );
    assert( "0 < output.indexOf('varchar2(255 char)')" );
    assert( "0 < output.indexOf('date_creation      timestamp,')" );
    assert( "0 < output.indexOf('date_packed        timestamp with time zone,')" );
    assert( "0 < output.indexOf('date_production    timestamp with local time zone')" );
    
    output = quicksql.toDDL(`
Bug35683307 /insert 1
  # settings = { inserts: false}
            `);

    assert( "-1 == output.indexOf('insert into')" );

    // NOTE: This test can't be performed anymore since it uses an internal method of ddl.js
    /*output = quicksql.toDDL(`
ER_35698875 
      # settings = { inserts: false}
                `);
    
    assert( !ddl.appliedOptions['inserts'].value);*/
    //console.log(ddl.getOptionValue('inserts'));
    //console.log(ddl.appliedOptions['inserts'].value);

    output = quicksql.toDDL(`
Bug_35683200 /insert 1
view bv Bug_35683200
# settings = { inserts: false}
# settings = { "schema": "HR"}
    `, '{"prefix": "The"}');

    //console.log(output);
    assert( "0 < output.indexOf('create table hr.the_Bug_35683200')" );
    assert( "0 < output.indexOf('replace view hr.the_bv')" );
    assert( "0 < output.indexOf('# settings = {\"inserts\":false,\"prefix\":\"The\",\"schema\":\"HR\"}')" );
    
    output = quicksql.toDDL(`
Bug_35677264
   product
   amt number
   qty number

# settings = { PK: "GUID", semantics: "CHAR", language: "EN", APEX: true }
    `);

    assert( "0 < output.indexOf('number default on null to_number(sys_guid(), ')" );
    assert( "0 < output.indexOf('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')" );
    
    output = quicksql.toDDL(`
Bug_35677301

# settings = { semantics: "CHAR", auditCols: true, language: "EN", APEX: true, createdCol: "created_col", createdByCol: "created_by_col", updatedCol: "updated_col", updatedByCol: "updated_by_col" }
    `);

    //console.log(output);
    assert( "0 < output.indexOf('created_col')" );
    assert( "0 < output.indexOf('created_by_col')" );
    assert( "0 < output.indexOf('updated_col')" );
    assert( "0 < output.indexOf('updated_by_col')" );

    output = quicksql.toDDL(`
Bug35714241
    proficiency /check 'Test'
    `);
    
    assert( "0 < output.indexOf(\"in ('Test'\")" );
   
    // 35714343
    output = quicksql.toDDL(`
departments
    dname
    emp
        department_id /fk departments
        ename
    `);
    
    assert( " output.indexOf('department_id    number') ==  output.lastIndexOf('department_id    number') " );

    // 35715610
    output = quicksql.toDDL(`
dept
    dname
    emp /cascade
        dept_id
        ename
    `);
    
    assert( "0 < output.indexOf('dept_id    number')" );
    assert( "0 < output.indexOf('constraint emp_dept_id_fk')" );
    assert( "0 < output.indexOf('references dept on delete cascade')" );

    // 35724078
    output = quicksql.toDDL(`
dept
    name
    
    --- toDDL() second parameter:
    # settings = {"apex":"Y","api":"N","auditcols":"N","compress":"N","date":"DATE","db":"19c","drop":"N","editionable":"N","genpk":"Y","inserts":"Y","language":"EN","longvc":null,"pk":"IDENTITY","prefix":null,"prefixpkwithtname":"N","rowkey":"N","rowversion":"N","schema":null,"semantics":"CHAR","createdcol":"created","createdbycol":"created_by","updatedcol":"updated","updatedbycol":"updated_by"} 
    `,
    '{"apex":"Y","api":"N","auditcols":"N","compress":"N","date":"DATE","db":"19c","drop":"N","editionable":"N","genpk":"Y","inserts":"Y","language":"EN","longvc":null,"pk":"IDENTITY","prefix":null,"prefixpkwithtname":"N","rowkey":"N","rowversion":"N","schema":null,"semantics":"CHAR","createdcol":"created","createdbycol":"created_by","updatedcol":"updated","updatedbycol":"updated_by"}'
    );

    assert( "0 < output.indexOf('# settings = {\"apex\":\"Y\",\"db\":\"19c\"}')" );

    output = quicksql.toDDL(`
dept /insert 5
    name
# inserts : N`,'{"inserts":"N"}');

    assert( "0 > output.indexOf('# inserts : N')" );
    
    output = quicksql.toDDL(`
Bug35737572
    flight_json json
    `);

    assert( "0 < output.indexOf('clob check (flight_json is json)')" );
    //console.log(output);
     
    output = quicksql.toDDL(`
Bug35737578
    flight_file file
    `);
   
    //console.log(output);
    assert( "0 < output.indexOf('flight_file_filename')" );
         
    output = quicksql.toDDL(`
bug35748389
    name
    
    # settings = {"pk":"NONE"}
    `);
   
    assert( "output.indexOf('trigger') < 0" );
    assert( "0 < output.indexOf('constraint bug35748389_id_pk primary key,')" );
         
    output = quicksql.toDDL(`
bug35748389_2
    name
    
    # settings = {"pk":"seq"}
    `);
   
     assert( "output.indexOf('trigger') < 0" );
    assert( "0 < output.indexOf('number default on null bug35748389_2_seq.nextval')" );
    assert( "0 < output.indexOf('constraint bug35748389_2_id_pk primary key,')" );
         
    output = quicksql.toDDL(
    `bug35748389_3
        name
    
    # settings = {"genpk":false}
    `);
   
    assert( "output.indexOf('trigger') < 0" );
    assert( "output.indexOf('id') < 0" );
         
    output = quicksql.toDDL(
    `bug35748389_4
        name
    
    # settings = {"pk":"identity"}
    `);
   
    //console.log(output);
    assert( "output.indexOf('trigger') < 0" );
    assert( "0 < output.indexOf('number generated by default on null as identity')" );
    assert( "0 < output.indexOf('constraint bug35748389_4_id_pk primary key,')" );
 
    output = quicksql.toDDL(
    `Bug 35756025
    deptno                         num(2,0)  /nn /pk 
    dname                          vc(14) 
    loc                            vc(13) 
    `);
       
    //console.log(output);
    assert( "0 < output.indexOf('number(2,0) generated by default on null as identity')" );
    assert( "0 < output.indexOf('constraint Bug_35756025_deptno_pk primary key,')" );

    output = quicksql.toDDL(
    `Bug 35757130
    file_name                      vc(512) 
    file_mimetype                  vc(512) 
    file_charset                   vc(512) 
    file_lastupd                   date 
    file_blob                      blob 
    file_comments                  vc(4000) 
    tags          `);
           
    assert( "0 < output.indexOf('file_name        varchar2(512 char),')" );
    assert( "output.indexOf('file_mimetype_mimetype') < 0" );
    assert( "output.indexOf('file_lastupd_filename') < 0" );
    
    output = quicksql.toDDL(
    `Bug35737917 /auditcols
        name
    # settings = {"apex":"false"}
    `, '{"apex":"true"}');
               
    //console.log(output);
    assert( "0 < output.indexOf(':new.created_by := user;')" );
    assert( "output.indexOf('APEX$SESSION') < 0" );

    output = quicksql.toDDL(
    `Bug35757000 
            name
    # settings = {"overrideSettings":"true"}
    `, '{"prefix":"X"}');
                   
    assert( "output.indexOf('x_') < 0" );
    
    output = quicksql.toDDL(
    `Bug35650456_2
        job vc5000
    
    --- Non-default options:
    # settings = {"apex":"Y","db":"19c","longvc":"N"}
    `);
             
    assert( " output.indexOf('Non-default options') ==  output.lastIndexOf('Non-default options') " );

    // Bug 35775121
    output = quicksql.toDDL( 
`dept
    name

emp
    dept_id /cascade
    name
    `);
                          
    //console.log(output);
    assert( " 0 < output.indexOf('constraint emp_dept_id_fk') " );
    assert( " 0 < output.indexOf('references dept on delete cascade,') " );
    assert( " output.indexOf('dept_id    integer') < 0 " );
    
    output = quicksql.toDDL( 
        `demo_item_order
            comment vc80`);
                
    assert( " 0 < output.indexOf('the_comment') " );

    output = quicksql.toDDL( 
`team_members /insert 1
    username /nn /upper
projects /insert 1
    name /nn
    project_lead /nn /references team_members`);
                                      
    output = quicksql.toDDL( 
`person
    id num /pk
    name vc40
    date_of_birth date
    mother /fk person
    father /fk person
    `);
                                                  
    assert( " 0 < output.indexOf('id               number') " );    
    assert( " 0 < output.indexOf('person_id_pk primary key') " );    

    output = quicksql.toDDL( 
`countries
    code vc2 /pk
    `);
    assert( " 0 < output.indexOf('code    varchar2(2 char) not null') " ); 


    output = quicksql.toDDL( 
`countries
    country_id vc2 /pk 
    `);
    assert( " 0 < output.indexOf('country_id    varchar2(2 char) not null') " ); 
                    
    output = quicksql.toDDL( 
`Bug35827840
    col1 vc
    `);
        
    assert( " 0 < output.indexOf('col1    varchar2(4000 char)') " );     

    output = quicksql.toDDL( 
`Bug35827927
    colstr string
    colvarchar varchar
    colvarchar2 varchar2
    colchar char
    `);
                
    assert( " 0 < output.indexOf('colstr    ') " );                                     
    assert( " 0 < output.indexOf('colvarchar    ') " );                                     
    assert( " 0 < output.indexOf('colvarchar2    varchar2(4000 char)') " );                                     
    assert( " 0 < output.indexOf('colchar    ') " );   
    
    output = quicksql.toDDL( 
`Bug35814922
    important_yn
    important1 yn
    important2 bool
    is_important
    `);
                
    //console.log(output);
    assert( " 0 < output.indexOf('important_yn    varchar2(1 char) constraint Bug35814922_important_yn') " );                                     
    assert( " 0 < output.indexOf('important1      varchar2(1 char) constraint Bug35814922_important1') " );                                     
    assert( " 0 < output.indexOf('important2      varchar2(1 char) constraint Bug35814922_important2') " );    
    assert( " 0 < output.indexOf('is_important    varchar2(1 char) constraint Bug35814922_is_important') " );    
    
    output = quicksql.toDDL( 
`Bug35842845 
    ファーストネーム vc200 
    Das Gedöns	vc200 
    locatilon;drop user sys;
    country;shutdown abort;a  
    `);
                    
    //console.log(output);
    assert( " 0 < output.indexOf('\"ファーストネーム\"') " );                                     
    assert( " 0 < output.indexOf('\"Das Gedöns\"') " );                                     
    assert( " 0 < output.indexOf('\"locatilon;drop user sys;\"') " );                                     
    assert( " 0 < output.indexOf('\"country;shutdown abort;a\"') " ); 
    
    output = quicksql.toDDL( 
        `"Test" 
            "CamelCase"
            x   [coMment]  
            2   --coMment2  
    `);

    //console.log(output);
    assert( " 0 < output.indexOf('create table \"Test\"') " );                                     
    //assert( " 0 < output.indexOf('Test_id_pk') " );                                     
    assert( " 0 < output.indexOf('\"CamelCase\"') " );                                     
    assert( " 0 < output.indexOf('comment on column \"Test\".x is ') " );                                     
    assert( " 0 < output.indexOf('comment on column \"Test\".x2 is ') " );                                     
         
    // 35936560
    output = quicksql.toDDL( 
    `mytable /rest
        name
    `);
    assert( " output.indexOf('p_object')+5 < output.indexOf('MYTABLE') " );    
                                     
    output = quicksql.toDDL( 
    `"yourTable" /rest
    name      
    `);
    assert( " output.indexOf('p_object')+5 < output.lastIndexOf('yourTable') " ); 

    output = quicksql.toDDL( 
    `customers
        cid /pk
    
    #settings = { pk: "SEQ"}      
        `);
        
    assert( " 0 < output.indexOf('cid    number default on null customers_seq.nextval') " ); 
    assert( " output.indexOf('trigger') < 0 " ); 
                                            
    output = quicksql.toDDL( 
    `customers
        id
    `);
        
    //console.log(output);
    assert( " output.indexOf('id    varchar2') < 0 " ); 
}
 
small_tests();