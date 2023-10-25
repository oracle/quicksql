create sequence departments_seq;

create table departments (
    id                             number default on null departments_seq.NEXTVAL 
                                   constraint departments_id_pk primary key
);