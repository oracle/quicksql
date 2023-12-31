-- sequences
create sequence row_key_seq;

-- create tables
create table departments (
    id                             number generated by default on null as identity 
                                   constraint departments_id_pk primary key,
    row_key                        varchar2(30 char)
                                   constraint departments_row_key_unq unique not null,
    name                           varchar2(255 char) not null,
    location                       varchar2(4000 char),
    country                        varchar2(4000 char)
)
;

create table employees (
    id                             number generated by default on null as identity 
                                   constraint employees_id_pk primary key,
    department_id                  number
                                   constraint employees_department_id_fk
                                   references departments ,
    row_key                        varchar2(30 char)
                                   constraint employees_row_key_unq unique not null,
    name                           varchar2(50 char) not null,
    email                          varchar2(255 char),
    cost_center                    number,
    date_hired                     date,
    job                            varchar2(255 char)
)
;

-- table index
create index employees_i1 on employees (department_id);


-- triggers
create or replace trigger departments_biu
    before insert or update 
    on departments
    for each row
declare
    function compress_int (n in integer ) return varchar2
    as
       ret       varchar2(30);
       quotient  integer;
       remainder integer;
       digit     char(1);
    begin
       ret := null; quotient := n;
       while quotient > 0
       loop
           remainder := mod(quotient, 10 + 26);
           quotient := floor(quotient  / (10 + 26));
           if remainder < 26 then
               digit := chr(ascii('A') + remainder);
           else
               digit := chr(ascii('0') + remainder - 26);
           end if;
           ret := digit || ret;
       end loop ;
       if length(ret) < 5 then ret := lpad(ret, 4, 'A'); end if ;
       return upper(ret);
    end compress_int;
begin
    if inserting then
        :new.row_key := compress_int(row_key_seq.nextval);
    end if;
end departments_biu;
/

create or replace trigger employees_biu
    before insert or update 
    on employees
    for each row
declare
    function compress_int (n in integer ) return varchar2
    as
       ret       varchar2(30);
       quotient  integer;
       remainder integer;
       digit     char(1);
    begin
       ret := null; quotient := n;
       while quotient > 0
       loop
           remainder := mod(quotient, 10 + 26);
           quotient := floor(quotient  / (10 + 26));
           if remainder < 26 then
               digit := chr(ascii('A') + remainder);
           else
               digit := chr(ascii('0') + remainder - 26);
           end if;
           ret := digit || ret;
       end loop ;
       if length(ret) < 5 then ret := lpad(ret, 4, 'A'); end if ;
       return upper(ret);
    end compress_int;
begin
    if inserting then
        :new.row_key := compress_int(row_key_seq.nextval);
    end if;
    :new.email := lower(:new.email);
end employees_biu;
/

-- load data
 
insert into departments (
    id,
    name,
    location,
    country
) values (
    1,
    'EMEA Sales',
    'Tanquecitos',
    'United States'
);

insert into departments (
    id,
    name,
    location,
    country
) values (
    2,
    'North American Sales',
    'Sugarloaf',
    'United States'
);



commit;

alter table departments
modify id generated always /*by default on null*/ as identity restart start with 3;
 
-- load data
-- load data
 
insert into employees (
        id, --<--
    department_id,
    name,
    email,
    cost_center,
    date_hired,
    job
) values (
       1,
    2,
    'Gricelda Luebbers',
    'gricelda.luebbers@aaab.com',
    28,
    sysdate - 67,
    'Help Desk Specialist'
);

insert into employees (
            id, --<--
    department_id,
    name,
    email,
    cost_center,
    date_hired,
    job
) values (
       2,
    4,
    'Dean Bollich',
    'dean.bollich@aaac.com',
    80,
    sysdate - 64,
    'Quality Control Specialist'
);

insert into employees (
            id, --<--
    department_id,
    name,
    email,
    cost_center,
    date_hired,
    job
) values (
        3,
    4,
    'Milo Manoni',
    'milo.manoni@aaad.com',
    30,
    sysdate - 33,
    'Project Manager'
);

insert into employees (
            id, --<--
    department_id,
    name,
    email,
    cost_center,
    date_hired,
    job
) values (
       4,
    3,
    'Laurice Karl',
    'laurice.karl@aaae.com',
    91,
    sysdate - 89,
    'Systems Administrator'
);



commit;

alter table employees
modify id generated always /*by default on null*/ as identity restart start with 5;
 
 
-- Generated by Quick SQL Tuesday August 15, 2023  16:33:33
 
/*
# settings = { rowkey: true }
departments /insert 4
   name /nn
   location
   country
   employees /insert 14
      name /nn vc50
      email /lower
      cost center num
      date hired
      job vc255

# settings = { semantics: "CHAR", rowKey: true, language: "EN", APEX: true }
*/
