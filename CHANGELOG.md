# Change Log

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [1.2.0] - 2023-11-8
  
[Compatible API amendments](https://github.com/oracle/quicksql/issues/23)
with old API marked as deprecated

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

