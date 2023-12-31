create table DEPT (
   ID      NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY
           constraint DEPT_ID_PK primary key,
   NAME    VARCHAR2(255 char),
   CITY    VARCHAR2(4000 char),
   STATE   VARCHAR2(4000 char)
);

alter table DEPT add constraint DEPT_UK unique (NAME, EMAIL);


create table EMP (
   ID        NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY
             constraint EMP_ID_PK primary key,
   DEPT_ID   NUMBER
             constraint EMP_DEPT_ID_FK
             references DEPT,
   NAME      VARCHAR2(255 char),
   EMAIL     VARCHAR2(255 char)
);

create index EMP_i1 on EMP (DEPT_ID);

alter table EMP add constraint EMP_UK unique (NAME, EMAIL);



