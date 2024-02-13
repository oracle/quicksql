# Change Log

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [1.2.0] - 2023-11-8
  
[Compatible API amendments](https://github.com/oracle/quicksql/issues/23)

The former calls `toDDL` and `toERD`
```
   let output = toDDL(input,opt);
```
are encouraged to be replaced with

```
   let qsql = new quicksql(input,opt); // parse once only
   let output = qsql.getDDL();
   let errors = qsql.getErrors();
```

## [1.2.1] - 2024-2-8

Issues up to #51

Further Json to QSQL parsing progress

Performance optimization: from 12 sec down to 6 sec for 1000 line QSQL schema definition 
in test/profile.js. Faster regression test as well.