import split_str from './split_str.js';

var lexer = (function(){ 
    function LexerToken( value, from, to, type, line, col ) {
        this.type = type;
        this.value = value;
        this.begin = from;
        this.end = to;
        this.line = line;
        this.col = col;
        this.toString = function() {
            return '{type:'+type+',value:'+value+'}';
        };
        this.isStandardLiteral = function () {
            // fast fail
            if( this.value.length < 2 )
                return false;
            if( !(this.value.charAt(0)=='\'' || this.value.charAt(0)=='n' || this.value.charAt(0)=='N') )
                return false;

            var text = this.value;
            if( text.charAt(0)=='n' || text.charAt(0)=='N' ) {
                if( text.length < 3 )
                    return false;
                text = text.substring(1);
            }
            if( text.length < 2 )
                return false;
            return text.charAt(0)=='\'' && text.charAt(text.length-1)=='\'';
        };
        this.isAltLiteral = function () {
            // fast fail
            if( this.value.length < 5 )
                return false;
            if( !(this.value.charAt(0)=='q' || this.value.charAt(0)=='Q'
                || this.value.charAt(0)=='n' || this.value.charAt(0)=='N') )
                return false;

            var text = this.value;
            if( this.value.charAt(0)=='q' || this.value.charAt(0)=='Q' ) {
                text = text.substring(1);
            } else if( /*content.startsWith("Nq")*/
                (this.value.charAt(0)=='n' || this.value.charAt(0)=='N')
                && (this.value.charAt(1)=='q' || this.value.charAt(1)=='Q')
            ) {
                if( text.length < 6 )
                    return false;
                text = text.substring(2);
            } else
                return false;
            if( text.charAt(0)=='\'' && text.charAt(text.length-1)=='\'' )
                text = text.substring(1,text.length-1);
            else
                return false;

            return matchingDelimiter(text.charAt(0)) == text.charAt(text.length-1);
        };
        function matchingDelimiter( ch ) {
            if ( '<'==ch ) return '>';
            else if ( '['==ch ) return ']';
            else if ( '{'==ch ) return '}';
            else if ( '('==ch ) return ')';
            else return ch;
        }
    }

    function iterate_tokens( sourceExpr, quotedStrings, extraOper ) {
        var ret = [];
        var operation = '(){}[]^-|!*+.><=\'",;:%@?/\\#~'+extraOper;
        var ws = ' \n\r\t';
        var chunks = split_str(sourceExpr,
            //".*-+/|><=()\'\", \n\r\t"
            operation + ws);
        var pos = 0;
        var isWrapped = false;
        //String altQuote = null;
        var line = 0;
        var col = 0;
        for( var i = 0; i < chunks.length; i++ ) {
            var token = chunks[i]/*.intern()*/;
            var last = null;

            if ( ret.length > 0 )
                last = ret[ ret.length-1 ];

            if( '\n'==token ) {
                line++;
                col = 0;
            } else {
                if ( i > 0 && chunks[ i - 1 ] !== '\n' ) {
                    col = col + chunks[ i - 1 ].length;
                } else {
                    col = 0;
                }
            }
            pos += token.length;
            // comments

            if ( isWrapped ) {    // nuke everything between WRAPPED and /
                if ( '/'==token && last != null && '\n'==last.value ) {
                    var marker = '"/"';
                    ret.push( new LexerToken( marker, pos-marker.length, pos, 'identifier', line, col ) );
                    isWrapped = false;
                    continue;
                } else if ( '\n' == token ) {
                    ret.push( new LexerToken(token, pos-token.length, pos, 'ws', line, col ) );
                    continue;
                } else {
                    if ( '\n' == last.value )
                        last.value = '?';
                    continue;
                }
            }
            if( last != null && last.type == 'comment' && (last.value.lastIndexOf('*/')!=last.value.length-2 || last.value == '/*/') ) {
                if( '*' == token || '/' == token )
                    last.value = last.value + token;
                else
                    last.value = '/* ... '; // Set up temporarily. Fixed on closing "*/".
                last.end = pos;
                // Fix the comment
                if( last != null && last.type == 'comment' && last.value.lastIndexOf('*/')==last.value.length-2 && last.value != '/*/' ) {
                    last.value = sourceExpr.substring(last.begin,last.end);
                }
                continue;
            }
            if( last != null && (last.type == 'line-comment' || last.type == 'dbtools-command') && '\n'!=token ) {
                last.value = last.value + token;
                continue;
            }
            if( last != null && (last.type == 'line-comment' || last.type == 'dbtools-command') && '\n'==token ) {
                //last.end = pos-token.length;
                last.end = last.begin + last.value.length;
            }
            if( last != null && last.type == 'quoted-string'
                && !(last.isStandardLiteral() || last.isAltLiteral())
            ) {
                last.value = last.value + token;
                last.end = last.begin + last.value.length;
                continue;
            }

            if( last != null && last.type == 'dquoted-string' && '"' != token
                && !(last.value.endsWith('"')&&last.value.length>1)) {
                //last.value = last.value + token;
                //last.end = last.begin + last.value.length;
                continue;
            }
            if( last != null && last.type == 'dquoted-string' && '"' == token ) {
                //last.value = last.value + token;
                last.end = pos;
                last.value = sourceExpr.substring(last.begin,last.end);
                continue;
            }

            if( last != null && last.type == 'bquoted-string' && '`' != token
                && !(last.value.endsWith('`')&&last.value.length>1)) {
                continue;
            }
            if( last != null && last.type == 'bquoted-string' && '`' == token ) {
                last.end = pos;
                last.value = sourceExpr.substring(last.begin,last.end);
                continue;
            }

            if( '*' == token && last != null && '/' == last.value ) {
                last.value = last.value + token;
                last.end = last.begin + last.value.length;
                last.type = 'comment';
                continue;
            }
            if( '-' == token && last != null && '-' == last.value ) {
                last.value = last.value + token;
                last.type = 'line-comment';
                continue;
            }
            if( ('REM'==token.toUpperCase() || 'REMA'==token.toUpperCase() || 'REMAR'==token.toUpperCase() || 'REMARK'==token.toUpperCase()
                ||'PRO'==token.toUpperCase() || 'PROM'==token.toUpperCase() || 'PROMP'==token.toUpperCase() || 'PROMPT'==token.toUpperCase()
            ) && (last == null || ('\n' == last.value||'\r' == last.value)) ) {
                ret.push(new LexerToken(token, pos-token.length, -9, 'line-comment', line, col));
                continue;
            }
            if( ('SODA'==token.toUpperCase() ) && (last == null || ('\n' == last.value||'\r' == last.value)) ) {
                ret.push(new LexerToken(token, pos-token.length, -9, 'dbtools-command', line, col));
                continue;
            }
            /*if( "@".equalsIgnoreCase(token)  && (last == null || "\n" == last.value||"\r" == last.value ) ) {     //$NON-NLS-4$//$NON-NLS-5$//$NON-NLS-6$
                ret.push(new LexerToken(token, pos-1, -11, "identifier"));
                continue;
            }*/

            if( last != null && last.type == 'identifier' && last.end == -11 && last.value.indexOf('@')==0 && !('\n' == token||'\r' == token) ) {     //$NON-NLS-4$//$NON-NLS-5$//$NON-NLS-6$
                last.value = last.value + token;
                continue;
            }
            if( last != null && last.type == 'identifier' && last.end == -11 && last.value.indexOf('@')==0 && ('\n' == token||'\r' == token) ) {     //$NON-NLS-4$//$NON-NLS-5$//$NON-NLS-6$
                last.end = pos-1;
                ret.push(new LexerToken(token, pos-1, pos, 'ws', line, col));
                continue;
            }
            if( quotedStrings && '\'' == token ) {  // start
                if( last != null && (
                    'Q'/*.toUpperCase()*/ == last.value.toUpperCase()
                    || 'N'/*.toUpperCase()*/ == last.value.toUpperCase()
                    || 'U'/*.toUpperCase()*/ == last.value.toUpperCase()
                    || 'NQ'/*.toUpperCase()*/ == last.value.toUpperCase()
                ) ) {
                    last.value += token;
                    last.type = 'quoted-string';
                } else {
                    ret.push(new LexerToken(token, pos-1, -10, 'quoted-string', line, col));
                }
                continue;
            }
            if( quotedStrings && '"' == token ) {
                ret.push(new LexerToken(token, pos-1, -11, 'dquoted-string', line, col));
                continue;
            }
            if(  '`' == token && 0 <= operation.indexOf('`') ) {
                ret.push(new LexerToken(token, pos-1, -11, 'bquoted-string', line, col));
                continue;
            }
            if( token.length==1 && 0 <= operation.indexOf(token) ) {
                ret.push(new LexerToken(token, pos-1, pos, 'operation', line, col));
                continue;
            }
            if( token.length==1 && 0 <= ws.indexOf(token) ) {
                ret.push(new LexerToken(token, pos-1, pos, 'ws', line, col));
                continue;
            }
            if ( '0'<=token.charAt(0) && token.charAt(0)<='9' ) {
                if ( !fixedExponent(token,ret,pos-token.length,line) ) {
                    if ( token.charAt(token.length-1)=='K' || token.charAt(token.length-1)=='k'
                        || token.charAt(token.length-1)=='M' || token.charAt(token.length-1)=='m'
                        || token.charAt(token.length-1)=='G' || token.charAt(token.length-1)=='g'
                        || token.charAt(token.length-1)=='T' || token.charAt(token.length-1)=='t'
                        || token.charAt(token.length-1)=='P' || token.charAt(token.length-1)=='p'
                        || token.charAt(token.length-1)=='E' || token.charAt(token.length-1)=='e'
                    ) {
                        ret.push(new LexerToken(token.substring(0, token.length-1), pos-token.length, pos-1, 'constant.numeric', line, col));
                        ret.push(new LexerToken(token.substring(token.length-1), pos-1, pos, 'constant.numeric', line, col));
                    } else
                        ret.push(new LexerToken(token, pos-token.length, pos, 'constant.numeric', line, col));
                }
                continue;
            }
            /* TODO:
                * if( "WRAPPED" == token.toUpperCase() && last != null ) {
                Iterator<LexerToken> descIter = ret.descendingIterator();
                boolean sawId = false;
                while(descIter.hasNext()) {
                LexerToken t = descIter.next();
                if( sawId && ("PROCEDURE" == t.value.toUpperCase() || "FUNCTION" == t.value.toUpperCase() || "TRIGGER" == t.value.toUpperCase() ||
                "TYPE" == t.value.toUpperCase() || "PACKAGE"==t.value.toUpperCase() ||
                "BODY" == t.value.toUpperCase() ) {
                isWrapped = true;
                break;
                }
                if( t.type == "ws" || t.type == "comment" )
                continue;
                if( t.type == "identifier" ) {
                sawId = true;
                continue;
                }
                break;
                }
                }*/

            var type = 'identifier';
            
            var nextToken = null;
            if ( i + 1 < chunks.length ) {
                nextToken = chunks[ i + 1 ];
            }
            
            /*if ( reservedWords.keywords.indexOf( token.toUpperCase() ) >= 0 && nextToken !== "#") {
                type = 'keyword';
            }*/
            ret.push(new LexerToken(token, pos-token.length, pos, type, line, col));

        }

        if( ret.length > 0 ) {
            var last = ret[ ret.length-1 ];
            last.end = sourceExpr.length;
        }  
                
        return ret;
    }

    // "1e01" is treated as "digits", "1e+01" is treated as "digits '+' digits"
    // This seems to be a minor bug -- the containing expressions are OK
    function fixedExponent( input, ret, pos, line ) {
        if( 0>input.indexOf('e') && 0>input.indexOf('f') && 0>input.indexOf('d') )
            return false;
        var x1 = 0<=input.indexOf('e');
        var x2 = !(0<=input.indexOf('e'));
        var x3 = !(0<=input.indexOf('e')) && !(0<=input.indexOf('f'));
        var chunks = split_str(input,'efd');
        for( var i = 0; i < chunks.length; i++ ) {
            var token = chunks[i]/*.intern()*/;
            pos += token.length;
            if( '0'<=token.charAt(0) && token.charAt(0)<='9' )
                ret.push(new LexerToken(token, pos-token.length, pos, 'constant.numeric',line));
            else
                ret.push(new LexerToken(token, pos-token.length, pos, 'identifier',line));

        }
        return true;
    }

    /**
     * Lexical part of parsing
     * @param sourceExpr="select * from emp"
     * @return
     *  if( keepWSandCOMMENTS ) then
     #Tokens=7
        --------------------------------
        0    [0,6) select   <IDENTIFIER>
        1    [6,7)          <WS>
        2    [7,8) *        <OPERATION>
        3    [8,9)          <WS>
        4    [9,13) from    <IDENTIFIER>
        5    [13,14)        <WS>
        6    [14,17) emp    <IDENTIFIER>
        else
        #Tokens=4
        --------------------------------
        0    [0,6) select   <IDENTIFIER>
        1    [7,8) *        <OPERATION>
        2    [9,13) from    <IDENTIFIER>
        3    [14,17) emp    <IDENTIFIER>
        */
    function lexemise( input, keepWSandCOMMENTS, quotedStrings, extraOper ) {
        var ret = [];
        var src = iterate_tokens(input, quotedStrings, extraOper);
        var last = null;
        for( var i = 0; i < src.length; i++ ) {
            var token = src[i];
            if( token.type == 'quoted-string' ) {   // glue strings together
                if( last != null && last.type == 'quoted-string' ) {
                    last.value = last.value + token.value;
                    last.end = token.end;
                    continue;
                }
                if( last != null && last.type == 'identifier'
                    && 'N' == last.value.toUpperCase() && last.end==token.begin ) {
                    last.begin = token.begin;
                    last.end = token.end;
                    last.type = token.type;
                    last.value = token.value;
                    continue;
                }
            }
            if( token.value.indexOf('@')==0 )
                token.end = token.begin + token.value.length;
            // Conflicting requirements for #:
            // 1.  q'#Alt literals#'
            // 2. Identifiers: abc#23
            if( '#' == token.value && last != null ) if( last.type == 'identifier' ) {
                last.end += 1;
                last.value += '#';
                continue;
            }
            if( ( token.type === 'identifier' || token.type === 'constant.numeric' ) && last !== null ) {
                if( last.value[last.value.length - 1] === '#' && last.type === 'identifier' ) {
                    last.end += token.value.length;
                    last.value += token.value;
                    continue;
                }
            }
                
            if( /*17607445: can just drop preprocessor directives
                    token.value.equals("$IF")
                    || token.value.equals("$ELSIF")
                    || token.value.equals("$ELSE")
                    || token.value.equals("$THEN")
                    ||*/ token.value.indexOf('$$')==0
            //|| token.value.equals("$END")
            )
            /*token.type = "ws";*/
                token.value = '$$VAR';
            if( keepWSandCOMMENTS || token.type != 'ws' && token.type != 'comment' && token.type != 'line-comment' )
                ret.push(token);
            last = token;
        }
        return ret;
    }

    return lexemise;
}());

export default lexer;
