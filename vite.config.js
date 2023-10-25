import { defineConfig } from 'vite';

import path from 'path';
import { fileURLToPath } from 'url';

import * as buildConstants from './build-constants.js';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const gTargetLibrary = process.env[ 'TARGET_LIBRARY' ] || 'DDL';

if ( ![ 'DDL', 'ERD' ].includes( gTargetLibrary ) ) {
    throw new Error( 'Invalid TARGET_LIBRARY value. Please use either of "DDL" or "ERD"' );
}

const gBuildOptions = gTargetLibrary === 'DDL' ?
    {
        lib: {
            entry: path.join( __dirname, 'src/ddl.js' ),
            name: buildConstants.__DDL_LIBRARY_NAME__,
            fileName: buildConstants.__DDL_LIBRARY_FILE_NAME__
        }
    }
    :
    {
        lib: {
            entry: path.join( __dirname, 'src/quick-erd/quick-erd.js' ),
            name: buildConstants.__ERD_LIBRARY_NAME__,
            fileName: buildConstants.__ERD_LIBRARY_FILE_NAME__
        },
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    // TODO: Make this config more generic
                    return assetInfo.type === 'asset' ? `${ buildConstants.__ERD_LIBRARY_FILE_NAME__ }[extname]` : assetInfo.name;
                }
            }
        }
    };

/** @type {import('vite').UserConfig} */
// eslint-disable-next-line no-unused-vars
export default defineConfig( ( { command: pCommand, mode: pMode, ssrBuild: pSsrBuild } ) => {
    return {
        root: path.join( __dirname, 'src' ),
        publicDir: path.join( __dirname, 'public' ),
        define: Object.fromEntries(
            Object.entries( buildConstants )
                .map( ( [ pKey, pValue ] ) => [ pKey, JSON.stringify( pValue ) ] )
        ),
        esbuild: {
            // NOTE: Added so that the non-ascii characters outside of comments
            //       and regular expressions are escaped as their \uXXXX
            //       equivalents
            //
            //       See https://github.com/vitejs/vite/issues/12676
            //       See https://esbuild.github.io/api/#charset:~:text=This%20does%20not%20yet%20escape%20non%2DASCII%20characters%20embedded%20in%20regular%20expressions.%20This%20is%20because%20esbuild%20does%20not%20currently%20parse%20the%20contents%20of%20regular%20expressions%20at%20all.%20The%20flag%20was%20added%20despite%20this%20limitation%20because%20it%27s%20still%20useful%20for%20code%20that%20doesn%27t%20contain%20cases%20like%20this
            charset: 'ascii'
        },
        build: {
            copyPublicDir: false,
            outDir: path.join( __dirname, 'dist' ),
            emptyOutDir: false,
            ...gBuildOptions
        },
    };
} );