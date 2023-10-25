var translate = (function(){
    /**
     * NLS
     */

    var en = ['Sales','Finance','Delivery','Manufacturing',
        'Engineer','Consultant','Architect','Manager','Analyst','Specialist','Evangelist','Salesman',
    ];
    var jp = ['「販売」','「財務」','「配送」','「製造」',
        '「エンジニア」','「コンサルタント」','「アーキテクト」','「マネージャー」','「アナリスト」','「スペシャリスト」','「エバンジェリスト」',
    ];
    var kr = ['영업', '금융', '배송', '제조',
        '엔지니어', '컨설턴트', '건축가', '관리자', '분석가', '전문가', '전도자','판매원',
    ];

    function translate( language, input ) {
        if( typeof input != 'string' )
            return input;
            
        if( language.substring(0,2).toLowerCase() == 'en'  )
            return input;	
        
        if( input.indexOf('\'') == 0 )
            input = input.substring(1,input.length-1);
        
        var pos = -1;
        for( var i = 0; i < en.length; i++ ) {
            if( en[i] == input ) {
                pos = i;
                break;
            }
        }

        if( 0 <= pos && language.substring(0,2).toLowerCase() == 'jp' && pos < jp.length )
            return '\''+jp[pos]+'\'';
        if( 0 <= pos && language.substring(0,2).toLowerCase() == 'kr' && pos < kr.length )
            return '\''+kr[pos]+'\'';
        return input;
    }

    return translate;
}());

export default translate;
