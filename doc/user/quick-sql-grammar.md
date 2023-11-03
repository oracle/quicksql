# Quick SQL Grammar <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Datatypes](#datatypes)
- [Table Directives](#table-directives)
    - [Star/Snowflake schema relationship direction indicators](#starsnowflake-schema-relationship-direction-indicators)
- [Column Directives](#column-directives)
- [Views](#views)
    - [View Syntax](#view-syntax)
    - [View Example](#view-example)
- [Settings](#settings)
    - [apex](#apex)
    - [api](#api)
    - [auditcols](#auditcols)
    - [compress](#compress)
    - [createdByCol](#createdbycol)
    - [createdCol](#createdcol)
    - [date](#date)
    - [db](#db)
    - [drop](#drop)
    - [language](#language)
    - [longVC](#longvc)
    - [ondelete](#ondelete)
    - [overrideSettings](#overridesettings)
    - [PK](#pk)
    - [prefix](#prefix)
    - [prefixPKwithTname](#prefixpkwithtname)
    - [genPK](#genpk)
    - [resetsettings](#resetsettings)
    - [rowkey](#rowkey)
    - [tenantID](#tenantid)
    - [rowVersion](#rowversion)
    - [schema](#schema)
    - [semantics](#semantics)
    - [updatedByCol](#updatedbycol)
    - [updatedCol](#updatedcol)
    - [verbose](#verbose)
- [Document](#document)
- [Grammar](#grammar)

<!-- 1. [Datatypes](#datatypes)
1. [Table Directives](#table-directives)
2. [Column Directives](#column-Directives)
3. [Views](#views)
4. [Settings](#settings)
5. [Grammar](#grammar) -->

## Datatypes

<!-- markdownlint-disable MD013 -->
| Type                                        | DB Type                       |
| ------------------------------------------- | ----------------------------- |
| num, number                                 | NUMBER                        |
| int, integer                                | INTEGER                       |
| d, date                                     | DATE                          |
| ts, timestamp                               | TIMESTAMP                     |
| tstz, tswtz, timestamp with local time zone | TIMESTAMP WITH LOCAL TIMEZONE |
| char, vc, varchar, varchar2, string         | VARCHAR2(4000)                |
| vcNNN,vc(NNN)                               | VARCHAR2(NNN)                 |
| vc32k                                       | VARCHAR2(32767)               |
| clob                                        | CLOB                          |
| blob                                        | BLOB                          |
| json                                        | CLOB CHECK (&lt;COLUMN_NAME&gt; IS JSON) |
| file                                        | Adds a BLOB column and _FILENAME, \_CHARSET, \_MIMETYPE, \_LASTUPD columns that enhance the ability for file download via a browser |
<!-- markdownlint-enable MD013 -->

## Table Directives

<!-- markdownlint-disable MD013 -->
| Directive                               | Description                       |
| --------------------------------------- | --------------------------------- |
| /api                                    | Generate PL/SQL package API to query, insert, update, and delete data within a table. Adds Oracle auditing, by default AUDIT ALL ON &lt;TABLE NAME&gt;. |
| /audit                                  | Adds Oracle auditing, by default AUDIT ALL ON &lt;TABLE NAME&gt;. |
| /auditcols, /audit cols, /audit columns | Automatically adds an UPDATED, UPDATED_BY, INSERTED, and INSERTED_BY columns and the trigger logic to set column values. |
| /colprefix                              | Prefix all columns of a given table with this value. Automatically adds an underscore if not provided. |
| /compress, /compressed                  | Table will be created compressed. |
| /insert NN                              | Generate NN SQL INSERT statement(s) with random data, for example: /INSERT 20. (Maximum = 1000) |
| /rest                                   | Generate REST enablement of the table using Oracle REST Data Services (ORDS) |
| /select                                 | Generate SQL SELECT statement after generating data for each table |
| /unique                                 | Generate table level unique constraint |
<!-- markdownlint-enable MD013 -->

### Star/Snowflake schema relationship direction indicators

In star (and snowflake) database model tables are organized into a hierarchy
where the table at the top (fact) is in many-to-one relationship to children (dimension tables).
Consequently, each dimension table is equipped with primary key, which is referenced via foreign
key constraint in the fact table. For example, given the Sales fact table together with Products
and Customers dimension tables, the star database model is expressed in QSQL as:

```
sales
  quantity
  > products
    name
  > customers 
    first name  
```

The more-than symbol `>` hints the many-to-one relationship between the table cardinalities.
The opposite -- one-to-many relationship -- is denoted by the `<` prefix, which is default,
and is usually omitted from QSQL schema definition.

[Sales-Product-Customer Example](../../test/star/sales_product_customers.qsql)

## Column Directives

<!-- markdownlint-disable MD013 -->
| Directive                      | Description                                |
| ------------------------------ | ------------------------------------------ |
| /idx, /index, /indexed         | Creates a non unique index                 |
| /unique                        | Creates a unique constraint                |
| /check                         | Creates a check constraint with comma or white space delimited values e.g. /check Yes, No |
| /constant                      | When generating data set this column to a constant value. For example /constant NYC. |
| /default                       | Adds default value if the column is null   |
| /values                        | Comma separated list of values to use when generating data. For example /values 1, 2, 3, 4 or /values Yes, No. |
| /upper                         | Forces column values to upper case         |
| /lower                         | Forces column values to lower case         |
| /nn, /not null                 | Adds a not null constraint on the column   |
| /between                       | Adds a between check constraint on the column, for example /between 1 and 100 |
| /hidden, /invisible            | Hidden columns are not displayed using select * from table. |
| /references, /reference, /fk   | Foreign key references e.g. /references table_name. Note you can reference tables that are not part of your model. |
| /pk                            | Identifies column as the primary key of the table. It is recommended not manually specify primary keys and let this app create primary key columns automatically. |
| --, [comments]                 |  Enclose comments using square brackets or using dash dash syntax |
<!-- markdownlint-enable MD013 -->

## Views

### View Syntax

```quicksql
view [view_name] [table name] [table name]...
```

Ensure the view name contains no spaces, ensure the table names contain no
spaces. Delimit table names by a space or comma.

### View Example

```quicksql
dept dname loc emp ename job view dept_emp emp dept
```

This syntax restricts views to conjunctive queries (i.e. containing equijoin
predicates) only.

## Settings

You can enter inline settings to explicitly set SQL syntax generation options.
Alternatively, you can click Settings at the top of the right pane to
declaratively set the generation options.

Entering settings directly into the Quick SQL Shorthand pane ensures the same
SQL generation options are utilized even if you download the script and later
paste it back. For example, enter the following to prefix all table names with
TEST and generate for schema OBE:

```quicksql
# settings = { prefix: "test", schema: "OBE" }
```

Alternatively, enter each setting on a separate line for the same result:

```quicksql
# prefix: "test"
```

```quicksql
# schema: "OBE"
```

Note: The settings must start on a new line and begin with # settings = to enter
multiple settings, or # to enter a single setting per line. All values are case
insensitive. Brackets, spaces, and commas can be added for clarity but are
ignored. To have all settings generated use:

```quicksql
# verbose: true
```

The available settings are listed in the below sections.

### apex

**Possible values**: `true`, `false`  
**Default value**: `false`

This setting controls the syntax generated to support audit columns.
Specifically if audit columns are enabled triggers are generated to maintain the
user creating a row and the user last updating a row. When enabled the following
function is used:

```sql
coalesce(sys_context('APEX$SESSION','APP_USER'),user)
```

When not enabled the following function is used:

```sql
user
```

### api

**Possible Values**: `true`, `false`  
**Default Value**: `false`

Generate PL/SQL APIs on all tables for create, insert, update, delete and query.

### auditcols

**Possible Values**: `true`, `false`  
**Default Value**: `false`

Adds an additional created, created_by, updated and updated_by columns to every
table created.

### compress

**Possible Values**: `true`, `false`  
**Default Value**: `false`

When enabled creates all tables compressed.

### createdByCol

**Default Value**: `created_by`

When Audit Columns are enabled the default column used to track the user who
created a row is CREATED_BY. Use this setting to override default audit column
name.

### createdCol

**Default Value**: created

When Audit Columns are enabled the default column used to track the user who
created a row is CREATED. Use this setting to override default audit column
name.

### date

**Possible Values**: `date`, `timestamp`, `timestamp with timezone`, `TSWTZ`,
`timestamp with local time zone`, `TSWLTZ`  
**Default Value**: `date`

By default all DATE columns created using the Oracle DATE datatype. Use this
setting to override this default.

### db

**Possible Values**: `11g`, `12c`, `19c`, `21c`
**Default Value**: `21c`

Specifies the database version the syntax should be compatible with.

### drop

**Possible Values**: `true`, `false`  
**Default Value**: `false`

Include SQL commands to drop each database object created.

### language

**Possible Values**: `EN`, `DE`, `KO`, `JA`  
**Default Value**: `EN`

Generate data used for insert statements using this language.

### longVC

**Possible Values**: `true`, `false`  
**Default Value**: `false`

Allow longer identifiers to be used for database object names. Longer
identifiers allow the maximum length a VARCHAR2 column datatype will be 32767
characters. When not set the maximum length of a VARCHAR2 column datatype will
be 4000 characters.

### ondelete

**Possible Values**: `cascade`, `restrict`, `set null`
**Default Value**: `cascade`

This setting controls how foreign key ON DELETE settings.

### overrideSettings

**Possible Values**: `true`, `false`  
**Default Value**: `false`

When enabled all application settings set via the user interface console are
ignored and only settings set in the script will be used.

### PK

**Possible Values**: `guid`, `seq`, `identity`, `none`  
**Default Value**: `identity`

Determines how the primary key will be set. Primary keys can be set using
SYS_GUID, identity column or sequence.

### prefix

Database object prefix. An underscore will be appended if not provided.

### prefixPKwithTname

**Possible Values**: `true`, `false`  
**Default Value**: `false`

Prefix primary key database table columns with name of table. For example the
primary key of the EMPLOYEE table would be EMPLOYEE_ID. Without setting the name
of implicitly created primary key columns will be ID.

### genPK

**Possible Values**: `true`, `false`  
**Default Value**: `true`

Automatically generate an ID primary key column for each table.

### resetsettings

Resets all application settings to default values. When included all application
settings currently active for your session will be ignored.

### rowkey

**Possible Values**: `true`, `false`  
**Default Value**: `false`

For each table created add a ROW_KEY column that generates an alphanumeric
identifier. Values of the ROW_KEY column will be set by generated database table
trigger logic.

### tenantID

**Possible Values**: `true`, `false`  
**Default Value**: `false`

For each table add a TENANT_ID column to support multi-tenant applications. The
value of this column is simply added to the table, maintaining this value will
need to be provided by the developer.

### rowVersion

**Possible Values**: `true`, `false`  
**Default Value**: `false`

For each table generated add a ROW_VERSION column that increments by 1 for each
update. When enabled database table trigger logic will be generated to increment
row versions on update.

### schema

Prefix object names with a schema name. The default is no schema prefix for
object names.

### semantics

**Possible Values**:  `char`, `byte`  

You can choose between:

- No column semantics:

    ```sql
    varchar2(4000)
    ```

- Byte semantics:

    ```sql
    varchar2(4000 byte)
    ```

- Char semantics

    ```sql
    varchar2(4000 char)
    ```

### updatedByCol

**Default Value**: `updated_by`

When enabling audit columns use this setting to override default audit column name.

### updatedCol

**Default Value**: `updated`

When enabling audit columns use this setting to override default audit column name.

### verbose

**Possible Values**: `true`, `false`  
**Default Value**: `false`

Show all settings, not just settings that are different from the default.

## Document

The database defined via QuickSQL is populated with the data generated by
[chancejs](https://github.com/chancejs/chancejs). If QSQL code has been generated
from json document, then the document is kept under the `#document` section, and
is used to populate the database with genuine data.
See the [Car Racing Example](../../test/DV/car_racing/1.qsql).

## Grammar

```abnf
quicksql::= stmt+

stmt::= tree
      | view
      | '#' individual_setting
      |  'settings' '=' '{' individual_setting ( ',' individual_setting )* '}'
      |  'document' '=' JSON

view::= 'view' view_name table_name+
view_name::= identifier
table_name::= identifier
column_name::= identifier

tree::= node+

node::= tableNode | columnNode

tableNode::= indentation relationship? tableName tableDirective*
columnNode::= indentation columnName columnDirective* datatype*

indentation::= INDENT | DEDENT | SAMELEVEL

relationship::= '>' | '<'

tableDirective::= '/'
       ('api'
      |'audit'|'auditcols'|'audit cols'|'audit columns'
      |'colprefix'
      |'compress'|'compressed'
      |'insert' integer
      |'rest'
      |'select'
      |'unique' )

columnDirective::= '/'
      ('idx'|'index'|'indexed'
      |'unique'
      |'check'
      |'constant'
      |'default'
      |'values'
      |'upper'
      |'lower'
      |'nn'|'not null'
      |'between'
      |'hidden'|'invisible'
      |'references'|'reference'
      |'fk'|'pk' )

datatype::=
       'num'|'number'
       |'int'|'integer'
       |'d'|'date'
       |'ts'|'timestamp'
       |'tstz'|'tswtz'|'timestamp' 'with' 'local' 'time' 'zonechar'
       |'vc'|'varchar'|'varchar2'|'string'
       |'vc' integer | 'vc' '(' integer ')'
       | 'vc32k'
       | 'clob'|'blob'|'jsonfile'

individual_setting::=
      ( 'apex'|'api'|'audit'
      |'cols'|'compress'|'createdbycol'|'createdcol'
      |'date'|'db'|'drop'
      |'language'|'longvc'
      |'ondelete'|'overridesettings'
      |'pk'|'prefix'|'prefixpkwithtname'
      |'genpk'
      |'resetsettings'|'rowkey'
      |'tenantid'|'rowversion'
      |'schema'|'semantics'
      |'updatedbycol'|'updatedcolverbose' ) ':' (string_literal| 'true' | 'false')
```

[Syntax Railroad Diagram](./railroad.xhtml)
