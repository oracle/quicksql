export function singular( name ) {
    // ddl.options["Duality View"].value != 'yes'
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

export default singular;
