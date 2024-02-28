create table bug35756025 (
    id                             number default on null to_number(sys_guid(), 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') 
                                   constraint bug35756025_id_pk primary key,
    deptno                         number,
    dname                          varchar2(14 char),
    loc                            varchar2(13 char)
)
;