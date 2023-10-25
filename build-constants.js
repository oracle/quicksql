import * as url from 'url';
import { createRequire } from 'module';

const __dirname = url.fileURLToPath( new URL( '.', import.meta.url ) );

const require = createRequire( import.meta.url );
const __package__ = require( './package.json' );

export const __WORKSPACE_ROOT_PATH__ = __dirname;
export const __PACKAGE_NAME__ = __package__.name;
export const __PACKAGE_VERSION__ = __package__.version;
export const __DDL_LIBRARY_NAME__ = __package__.config.ddlLibraryName;
export const __DDL_LIBRARY_FILE_NAME__ = __package__.config.ddlLibraryFileName;
export const __ERD_LIBRARY_NAME__ = __package__.config.erdLibraryName;
export const __ERD_LIBRARY_FILE_NAME__ = __package__.config.erdLibraryFileName;
// NOTE: /@fs/ is a special vite folder to access files outside of the root
export const __NODE_MODULES_PATH__ = `/@fs${ __dirname }/node_modules`;
