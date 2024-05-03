export function singular( name ) {
    // identity columns in JSON document are singular
    if( name == null )
        return name;
    if( name.toUpperCase().endsWith('IES') )
        return name.substring(0,name.length-3)+'y';
    if( name.toUpperCase().endsWith('ES') )
        return name.substring(0,name.length-1);
    if( name.toUpperCase().endsWith('S') )
        return name.substring(0,name.length-1);
    return name;
}

/** 
 * Ported from dbtools-common Service.quoteIdentifier() and AMENDED for QSQL usage
 * Diffs: 1. Space separator does not warrant double quote
 *        2. Lower case letters do not warrant double quote
 * 
 * Quotes an identifier based on the following:
 * 1) Any lower/mixed case identifier is quoted
 * 2) Any identifier starting with the quote string is NOT quoted. If it is currently quoted (first/last characters 
 * are the quote character) then no quoting is needed, and if it not quoted but contains a quote character, the name is
 * invalid.
 * 3) The string is checked for invalid characters; any invalid characters require the string be quoted. A valid identifier
 * starts with a letter and contains only letters, digits, or one of _$#. Note that the database allows any valid character 
 * in the database character set. We by policy use the basic ASCII character set to determine letters.
 * 
 * Conflicting requirements:
 * - SYS.DBMS_SQLTUNE.ACCEPT_ALL_SQL_PROFILES composite object names shouldn't be quoted
 * - Bug 20667620: weird column name "NO." should
 * @param s
 * @param quoteChar
 * @return
 */
function quoteIdentifier(/*String*/ s, /*char*/ quoteChar ) {
 
    let quoteString = '"'; //String.valueOf(quoteChar);
    if( s == null )   // to be able to safely wrap any string value
        return null;    	
    
    // We want to check 3 things here:
    // 1) The string is a valid identifier (starts with a letter, contains only valid characters,--!!!-- don't care if a reserved word
    // 2) The string is all upper case. By policy, we will quote any lower or mixed cased strings
    // 3) the string is not currently quoted. We will only check the first character for a quote. A quote appearing anywhere
    //    else or a starting quote w/o an ending quote is going to make the string invalid no matter what (quotes cannot
    //    be escaped in Oracle identifiers).
    let quote = false;
    // Bug 9215024 column name can have "_" so we can't exclude them.
    // ^^^^^^^^^^
    // Edit Wars: the loop below iterates through list of characters, and as soon  
    // it encounters illegitimate symbol, it sets the "need quotation" flag
    const legitimateChars = "$#_ ";   // !NO ".": see this function JavaDoc above 
    if ( !s.startsWith(quoteString) && !quote ) {
        const chars = s; //new char[s.length()];
        //s.getChars(0, chars.length, chars, 0);
        if( chars.length > 0 && '0' <= chars[0] && chars[0] <= '9' )
            quote = true;
        else {
            for ( let i = 0; i < chars.length; i++ ) {
                const c = chars[i];
                if( 'a' <= c && c <= 'z' )
                    continue;
                if( 'A' <= c && c <= 'Z' )
                    continue;
                if( '0' <= c && c <= '9' )
                    continue;
                if( 0 <= legitimateChars.indexOf(c) )
                    continue;
                quote = true;
                break;
            }
        }
    }
    if( s.startsWith("_") || s.startsWith("$") || s.startsWith("#") )
        quote = true;
    if( !quote )
        quoteString = '';
    return quoteString+s+quoteString;
}

export function canonicalObjectName( nAme ) {
    if( nAme == null )
        return null;
    if( nAme.indexOf('"') == 0 )
        return nAme;
    let possiblyQuoted = quoteIdentifier(nAme);
    if( possiblyQuoted.indexOf('"') == 0 )
        return possiblyQuoted;
    possiblyQuoted = possiblyQuoted.replace(/ /g,"_"); 
    return possiblyQuoted;
};


export function concatNames(chunk1, chunk2, chunk3) {
    let quote = false;
    if( chunk3 == null )
        chunk3 = '';
    if( 0 == chunk1.indexOf('"') ) {
        quote = true;
        chunk1 = chunk1.substring(1,chunk1.length-1);
    }
    if( 0 == chunk2.indexOf('"') ) {
        quote = true;
        chunk2 = chunk2.substring(1,chunk2.length-1);
    }
    if( 0 == chunk3.indexOf('"') ) {
        quote = true;
        chunk3 = chunk3.substring(1,chunk3.length-1);
    }
    let ret = chunk1+chunk2+chunk3;
    if( quote )
        ret = '"'+ret+'"';
    else
        ret = ret.toLowerCase();

    return ret;
}

export function getMajorVersion( versionStr ) {
    if( versionStr.length < 2 )
        return null;
    return parseInt(versionStr.substring(0,2));
}


export default {singular, canonicalObjectName, concatNames};
