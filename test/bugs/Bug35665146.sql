-- create tables
create table dept (
    id                             number generated by default on null as identity 
                                   constraint dept_id_pk primary key,
    name                           varchar2(255 char),
    created_on                     date
)
;

