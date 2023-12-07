#!/usr/bin/env node

/**
 * Reads Quick SQL input from a file in the filesystem and outputs the generated
 * DDL to console
 * 
 * Execution:
 * 
 * ```sh
 * ./cli.js <FILE_PATH>
 * ```
 */

import fs from 'fs';

import quicksql from '../dist/quick-sql.js';

function print_usage() {
    console.log(
        /* eslint-disable indent */
`Quick SQL ${ quicksql.version } DDL Generation Example

Usage: ./cli.js <FILE_PATH>
Example: ./cli.js ../test/apex/project_management.quicksql
`
        /* eslint-enable indent */
    );
}

let file_path = process.argv[2];
//let file_path = './test/apex/project_management.quicksql';
if ( !file_path ) {
    print_usage();
    console.error( 'ERROR: A file path was not provided' );
    process.exit( 1 );
}
if ( !fs.existsSync( file_path ) ) {
    print_usage();
    console.error( 'ERROR: The file path provided does not exist or is not readable by the current user' );
    process.exit( 1 );
}
let file_content = fs.readFileSync( file_path ).toString();

console.log( quicksql.toDDL( file_content ) );
