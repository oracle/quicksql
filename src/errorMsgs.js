import split_str from './split_str.js';

const findErrors = (function () {

    function SyntaxError( message, from, to, severity ) {
        this.from = from;
        this.to = to;
        if( to == null )
            this.to = new Offset(from.line, from.depth+1);
        this.message = message;
        this.severity = severity;   // warning or error
        if( severity == null )
            this.severity = 'error';
    }

    function Offset( line, depth ) {
        this.line = line;     // 0-based
        this.depth = depth;   // 0-based
    }
    
    function checkSyntax( ddlInstance, input ) {
        const ddl = ddlInstance;

        let ret = [];

        const lines = input.split("\n");
    
        ret = ret.concat(line_mismatch(lines));
        const descendants = ddl.descendants();
 
        for( let i = 0; i < descendants.length; i++ ) {
            const node = descendants[i];
            if( ddl.optionEQvalue('genpk', true) && descendants[i].parseName() == 'id' ) {
                const depth = node.content.toLowerCase().indexOf('id');
                ret.push(new SyntaxError( messages.duplicateId, new Offset(node.line, depth) ));
                continue;
            }
            const src2 = node.src[2];
            if( 2 < node.src.length && src2.value == '-' ) {
                const depth = src2.begin;
                ret.push(new SyntaxError(  messages.invalidDatatype, new Offset(node.line,depth) ));
                continue;
            }
            const src1 = node.src[1];
            if( 1 < node.src.length && 0 < src1.value.indexOf('0') ) {
                const depth = src1.begin;
                ret.push(new SyntaxError( messages.invalidDatatype, new Offset(node.line,depth) ));
                continue;
            }

            ret = ret.concat(ref_error_in_view(ddl,node));
            ret = ret.concat(fk_ref_error(ddl,node));
        }

        return ret;
    }

    function ref_error_in_view( ddl, node ) {
        var ret  = [];
        
        var line = node.content.toLowerCase();
        if( node.parseType() == 'view' ) {
            var chunks = split_str(line,' '); //line.split(' ');
            let pos = 0;
            for( var j = 0; j < chunks.length; j++ ) { 
                pos += chunks[j].length;
                if( chunks[j] == ' ' ) 
                    continue;
                if( chunks[j] == 'view' ) 
                    continue;
                if( j == 1 ) 
                    continue;
               var tbl = ddl.find(chunks[j]);
                if( tbl == null ) {
                    ret.push( new SyntaxError(
                        messages.undefinedObject+chunks[j],
                        new Offset(node.line, pos-chunks[j].length)
                    ));
                }
            }
        }
        return ret;
    }
    
    function fk_ref_error( ddl, node ) {
        var ret  = [];
        var line = node.content.toLowerCase();
        if( 0 < line.indexOf("/fk") || 0 < line.indexOf("/reference") ) {
            let chunks = split_str(line,' '); //line.split(' ');
            let pos = 0;
            let refIsNext = false;
            for( var j = 0; j < chunks.length; j++ ) { 
                pos += chunks[j].length;
                if( chunks[j] == ' ' )
                    continue;
                if( chunks[j] == "/fk" || 0 == chunks[j].indexOf("/reference") ) {
                    refIsNext = true;
                    continue;
                }
                if( !refIsNext )
                    continue;
                var tbl = ddl.find(chunks[j]);
                if(  tbl == null ) {
                    ret.push( new SyntaxError(
                        messages.undefinedObject+chunks[j],
                        new Offset(node.line, pos-chunks[j].length)
                    ));                   
                    break;
                }
            }
        }
    return ret;
    }
    
    function line_mismatch( lines ) {
        var ret  = [];
        
        var indent = guessIndent( lines )
        
        for( var i = 1; i < lines.length; i++ ) {
            var priorline = lines[i-1];
            var line = lines[i];
            
            var priorIndent = depth(priorline);
            var lineIndent = depth(line);
            
            if( lineIndent == 0 )
                continue;
           
            if( priorIndent < lineIndent && lineIndent < priorIndent+indent )
                ret.push(new SyntaxError(
                    messages.misalignedAttribute+indent,
                    new Offset(i, lineIndent)
                )
            );
        }
    
        return ret;
    }
    return checkSyntax;
}());



function guessIndent( lines ) {    	
    let depths = [];

    for( var i = 0; i < lines.length; i++ ) {
        var line = lines[i];
        depths[i] = depth(line);
    }

    let frequencies = [];
    for( let i = 0; i < depths.length; i++ ) {
        let j = parentIndex(depths, i);
        if( j != null ) {
            let f = frequencies[depths[i]-depths[j]];
            if( f == null )
                f = 0;
            frequencies[depths[i]-depths[j]] = f+1;
        }
    }

    let indent = null;
    for( let i in frequencies ) {
        if( indent == null || frequencies[indent] <= frequencies[i] )
            indent = i; 
    }
    return indent;

}

function depth( line ) {
    var chunks = line.split(/ |\t/);
    var offset = 0;
    for( var j = 0; j < chunks.length; j++ ) {
        var chunk = chunks[j];
        if( "\t" == chunk ) {
            offset += 4; //TODO;
        }
        if( "" == chunk  ) {
            offset++;
            continue;
        }
        if( !/[^.a-zA-Z0-9_"]/.test(chunk) ) 
            return offset;
    }
    return 0;
}

function parentIndex( depths, lineNo ) {
    for( let i = lineNo; 0 <= i; i-- ) 
        if( depths[i] < depths[lineNo] )
            return i;
    return null;
}


const messages = {
    duplicateId: 'Explicit ID column conflicts with genpk',
    invalidDatatype: 'Invalid Datatype',
    undefinedObject: 'Undefined Object: ',
    misalignedAttribute: 'Misaligned Table or Column; apparent indent = ',
}

export default {findErrors, messages};