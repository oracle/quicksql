create table books (
    id                             number generated by default on null as identity 
                                   constraint books_id_pk primary key,
    name                           varchar2(255 char),
    author                         varchar2(4000 char),
    available                      varchar2(4000 char) default on null 'Y' not null
)
;
