/* eslint-disable no-useless-escape, no-redeclare, no-unused-vars */
// spell-checker:disable

var utils = {};

utils.newGuid = function () {
    function _s8(s) {
        var p = (Math.random().toString(16) + '000000000').substr(2, 8);
        return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    }
    return _s8() + _s8(true) + _s8(true) + _s8();
};

utils.calcWidth = function (schema, name, columns) {
    var objName = name;
    if (schema) {
        objName = schema.concat('.').concat(name);
    }
    var nameWidth = utils.getTextWidth(objName, '12pt Arial');
    var colWidth = 60;
    var dtWidth = 0;
    var indexWidth = 0;
    for (var i = 0; i < columns.length; i++) {
        colWidth = Math.max(colWidth, utils.getTextWidth(columns[i].name, '10pt Arial'));
        dtWidth = Math.max(dtWidth, utils.getTextWidth(columns[i].datatype, '10pt Arial'));
    }

    const bonus = 40; // colWidth > 100 ? 15 : 40;
    const cdtWidth = colWidth + bonus + dtWidth;
    let width = Math.max(nameWidth, cdtWidth);
    return width;
};

utils.getTextWidth = function (text, font) {
    var canvas = utils.getTextWidth.canvas || (utils.getTextWidth.canvas = document.createElement('canvas'));
    var context = canvas.getContext('2d');
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};

export default utils;
