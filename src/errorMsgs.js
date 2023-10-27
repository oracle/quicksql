
const findErrors = (function () {

    function ErrorMsg( message, from, to, severity ) {
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
    
    function checkSyntax( ddlInstance ) {
        const ddl = ddlInstance;

        let ret = [];

        const descendants = ddl.descendants();
 
        for( let i = 0; i < descendants.length; i++ ) {
            const node = descendants[i];
            if( ddl.optionEQvalue('genpk', true) && descendants[i].parseName() == 'id' ) {
                const depth = node.content.toLowerCase().indexOf('id');
                ret.push(new ErrorMsg( messages.duplicateId, new Offset(node.line, depth) ));
                continue;
            }
            const src2 = node.src[2];
            if( 2 < node.src.length && src2.value == '-' ) {
                const depth = src2.begin;
                ret.push(new ErrorMsg(  messages.invalidDatatype, new Offset(node.line,depth) ));
                continue;
            }
            const src1 = node.src[1];
            if( 1 < node.src.length && 0 < src1.value.indexOf('0') ) {
                const depth = src1.begin;
                ret.push(new ErrorMsg( messages.invalidDatatype, new Offset(node.line,depth) ));
                continue;
            }

            ret = ret.concat(ref_error_in_view(ddl,node));
            ret = ret.concat(fk_ref_error(ddl,node));
        }

        return ret;
    }

    function ref_error_in_view( ddl, node ) {
        var ret  = [];
        
        var nodeUpperContent = node.trimmedContent().toUpperCase();
        if( node.parseType() == 'view' ) {
            var chunks = nodeUpperContent.split(' ');
            for( var j = 2; j < chunks.length; j++ ) { 
                if( chunks[j].trim() == "" )
                    continue;
                if( 0 == chunks[j].indexOf("/") )
                    continue;
                var tbl = ddl.find(chunks[j]);
                if( tbl == null ) {
                    var pos = nodeUpperContent.indexOf(chunks[j]);
                    ret.push( new ErrorMsg(
                        messages.undefinedObject+chunks[j],
                        new Offset(node.line, pos)
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
            var chunks = line.split(' ');
            var refIsNext = false;
            for( var j = 1; j < chunks.length; j++ ) { 
                if( chunks[j].trim() == "" )
                    continue;
                if( chunks[j] == "/fk" || 0 == chunks[j].indexOf("/reference") ) {
                    refIsNext = true;
                    continue;
                }
                if( !refIsNext )
                    continue;
                var tbl = ddl.find(chunks[j]);
                if(  tbl == null ) {
                    var pos = line.indexOf(chunks[j]);
                    ret.push( new ErrorMsg(
                        messages.undefinedObject+chunks[j],
                        new Offset(node.line, pos)
                    ));                   
                    break;
                }
            }
        }
    return ret;
    }
    

    return checkSyntax;
}());

function parse_errors( input ) {
    var ret  = [];
    
    var lines = input.split("\n");
    
    if( lines.length < 5 || ddl == null )
        return ret;
    
    ret = ret.concat(line_mismatch(lines));
    ddl.translate(input);
    ret = ret.concat(ref_error(lines));

    return ret;
}

function line_mismatch( lines ) {
    var ret  = [];
    
    var indent = guessIndent( lines )
    
    for( var i = 1; i < lines.length; i++ ) {
        var priorline = lines[i-1];
        var line = lines[i];
        
        var priorIndent = apparentDepth(priorline);
        var lineIndent = apparentDepth(line);
        
        if( lineIndent == 0 )
            continue;
       
        if( priorIndent < lineIndent && lineIndent < priorIndent+indent )
            ret.push({
                        from: {line:i, ch:lineIndent,  },
                        to: {line:i, ch:lineIndent+1,  },
                        //severity: "error",
                        message: "Misaligned code. \nThe indent appears to be "+indent+" spaces."
            });
    }

    return ret;
}

function guessIndent( lines ) {    	
    var idents = [];
    
    var priorFullIndent = -1;
    var priorRelativeIndents = [];
    
    for( var i = 0; i < lines.length; i++ ) {
        var line = lines[i];
        if( "\n" == line )
            continue;
        
        var ident = apparentDepth(line);
        
        if( priorFullIndent == -1 ) {
            priorFullIndent = ident;
            priorRelativeIndents.push(ident);
            continue;
        }
        var index = ident - priorFullIndent;
        if( index == 0 ) {
            var tmp = priorRelativeIndents[priorRelativeIndents.length-1];
            if( tmp != 0 )
                index = tmp;
        }
        if( index < 0 ) {
            index = -index;
            priorRelativeIndents.length--;
        } else {
            if( priorFullIndent < ident)
                priorRelativeIndents.push(index);
        }
        if( index != 0 ) {
            if( idents[index] == null )
                idents[index] = 0;
            idents[index]++;
        }           
        priorFullIndent = ident;
    }
    var ret = 1;
    var cmp = idents[ret];
    if( cmp == null )
        cmp = 0;
    for( var i = 1; i < idents.length; i++ ) {
        if( cmp < idents[i] ) {
            ret = i;
            cmp = idents[i];
        }
    }
    return ret;
}

function apparentDepth( line ) {
    var chunks = line.split(/ |\t/);
    var offset = 0;
    for( var j = 0; j < chunks.length; j++ ) {
        var chunk = chunks[j]/*.intern()*/;
        //if( "\t" == chunk )
            //TODO;
        if( "" == chunk  ) {
            offset++;
            continue;
        }
        if( !/[^.a-zA-Z0-9_"]/.test(chunk) ) 
            return offset;
    }
    return 0;
}



const messages = {
    duplicateId: 'Explicit ID column conflicts with genpk',
    invalidDatatype: 'Invalid Datatype',
    undefinedObject: 'Undefined Object: ',
}

export default {findErrors, messages};