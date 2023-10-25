var split_str = (function(){ 
    function split_str_into_chunks( text, symbols ) {
        //var symbols = " \n\r\t(){}[]^-|!*+.><='\",;:%@?/\\#~";
        var ret = [];
        var last = '';
        for( var i = 0; i < text.length; i++ ) {
            var c = text.charAt(i);
            var retLen = ret.length;
            for( var j = 0; j < symbols.length; j++ ) {
                var cmp = symbols.charAt(j);
                if( c == cmp ) {
                    if( 0 < last.length )
                        ret.push(last);
                    ret.push(c);
                    last = '';
                    continue;
                }
            }
            if( retLen == ret.length )
                last = last + c;
        }
        if( 0 < last.length )
            ret.push(last);
        return ret;
    }    
    return split_str_into_chunks;
}());

export default split_str;
