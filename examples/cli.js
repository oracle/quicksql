#!/usr/bin/env node

/**
 * Reads QuickSQL input from a file in the filesystem and outputs the translated
 * DDL to console
 * 
 * Execution:
 * 
 * ```sh
 * ./translate.js <FILE_PATH>
 * ```
 */

import fs from 'fs';

import quicksql from '../dist/quick-sql.js';

function print_usage() {
    console.log(
        /* eslint-disable indent */
`QuickSQL ${ quicksql.version } Translation Example

Usage: ./cli.js <FILE_PATH>
Example: ./cli.js ../test/project_management.quicksql
`
        /* eslint-enable indent */
    );
}

let file_path = process.argv[2];
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

console.log( quicksql.translate( file_content ) );
