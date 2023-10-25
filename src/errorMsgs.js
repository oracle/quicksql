
const findErrors = (function () {

    function ErrorMsg( line, offset, message ) {
        this.line = line;
        this.offset = offset;
        this.message = message;
    }
    
    function checkSyntax( ddlInstance ) {
        const ddl = ddlInstance;

        let ret = [];

        const descendants = ddl.descendants();
 
        for( let i = 0; i < descendants.length; i++ ) {
            const node = descendants[i];
            if( ddl.optionEQvalue('genpk', true) && descendants[i].parseName() == 'id' ) {
                const depth = node.content.toLowerCase().indexOf('id');
                ret.push(new ErrorMsg( node.line, depth, messages.duplicateId));
                continue;
            }
            const src2 = node.src[2];
            if( 2 < node.src.length && src2.value == '-' ) {
                const depth = src2.begin;
                ret.push(new ErrorMsg( node.line,depth, messages.invalidDatatype));
                continue;
            }
            const src1 = node.src[1];
            if( 1 < node.src.length && 0 < src1.value.indexOf('0') ) {
                const depth = src1.begin;
                ret.push(new ErrorMsg( node.line,depth, messages.invalidDatatype));
                continue;
            }
        }

        return ret;
    }

    return checkSyntax;
}());

const messages = {
    duplicateId: 'Explicit ID column conflicts with genpk',
    invalidDatatype: 'Invalid Datatype',
}

export default {findErrors, messages};