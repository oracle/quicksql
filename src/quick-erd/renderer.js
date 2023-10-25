/* global joint */
/* eslint-disable no-redeclare */
// spell-checker:disable

import cs from './constants.js';

joint.shapes.quicksql = {};

joint.shapes.quicksql.Table = joint.shapes.standard.HeaderedRecord.define('quicksql.Table', {
    z: 3,
    columns: [],
    padding: { top: 25, bottom: 5, left: 0, right: 0 },
    size: { width: 160 },
    itemMinLabelWidth: 105,
    itemHeight: 16,
    itemOverflow: true,
    attrs: {
        root: {
            magnet: false
        },
        body: {
            cursor: 'default',
            rx: cs.TABLE_BORDER_RADIUS,
            ry: cs.TABLE_BORDER_RADIUS,
            fill: cs.colors.TABLE_BACKGROUND,
            stroke: cs.colors.TABLE_BORDER,
            'stroke-width': 1,
            refWidth: '100%',
            refHeight: '100%'
        },
        headerLabel: {
            cursor: 'default',
            y: -4,
            fontFamily: cs.FONT_FAMILY,
            fill: cs.colors.TABLE_NAME_TEXT,
            fontWeight: 'bold',
            fontSize: 12,
            textWrap: {
                ellipsis: true,
                height: 20
            }
        },
        separator: {
            cursor: 'default',
            stroke: cs.colors.TABLE_BORDER,
            strokeWidth: 1,
        },
        itemBodies_0: {
            magnet: false,
            pointerEvents: 'none'
        },
        group_1: {
            pointerEvents: 'none'
        },
        itemLabels: {
            fontFamily: cs.FONT_FAMILY,
            fontWeight: 'bold',
            fontSize: 10,
            fill: cs.colors.TABLE_COLUMN_TEXT,
            pointerEvents: 'none'
        },
        itemLabels_1: {
            fill: cs.colors.TABLE_DATA_TYPE_TEXT,
            textAnchor: 'end',
            x: 'calc(0.5 * w - 20)'
        }
    }
}, {

    markup: [{
        tagName: 'rect',
        selector: 'body'
    }, {
        tagName: 'text',
        selector: 'headerLabel'
    }, {
        tagName: 'path',
        selector: 'separator'
    }],

    setName(name, opt) {
        return this.attr(['headerLabel', 'text'], name, opt);
    },

    setColumns(data = []) {
        const names = [];
        const values = [];

        data.forEach((item, i) => {

            if (!item.name)
                return;

            names.push({
                id: item.name,
                label: item.name,
                span: 2
            });

            const value = {
                id: `${item.datatype}_${i}`,
                label: item.datatype
            };

            values.push(value);
        });

        this.set('items', [names, values]);
        this.removeInvalidLinks();
    }
});

joint.shapes.quicksql.TableView = joint.shapes.standard.RecordView.extend({
    initialize: function () {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.updatePath();
    },
    updatePath: function () {
        var a = 'M 0 20 L ' + this.model.get('size').width + ' 20';
        this.model.attr('separator/d', a, {
            silent: true
        });
    }
});

joint.shapes.quicksql.View = joint.shapes.quicksql.Table.define('quicksql.View', {
    attrs: {
        body: {
            rx: cs.VIEW_BORDER_RADIUS,
            ry: cs.VIEW_BORDER_RADIUS,
            fill: cs.colors.VIEW_BACKGROUND,
            stroke: cs.colors.VIEW_BORDER,
        },
        headerLabel: {
            fontFamily: cs.FONT_FAMILY,
            fill: cs.colors.VIEW_NAME_TEXT,
        },
        separator: {
            stroke: cs.colors.TABLE_BORDER,
        },
        itemLabels: {
            fill: cs.colors.VIEW_COLUMN_TEXT,
        },
        itemLabels_1: {
            fill: cs.colors.VIEW_DATA_TYPE_TEXT
        }
    }
});

joint.shapes.quicksql.ViewView = joint.shapes.quicksql.TableView;

joint.shapes.quicksql.Relation = joint.dia.Link.extend({
    z: -1,
    defaults: {
        type: 'quicksql.Relation',
        attrs: {
            '.connection': {
                stroke: cs.colors.LINK,
                'stroke-width': 1,
                'stroke-dasharray': 'none'
            },
            '.marker-source': {
                fill: cs.colors.LINK,
                stroke: cs.colors.LINK,
                d: 'M 5 0 L 0 4 L 5 8 z'
            },

        },
        style: 'none',
        sourceTable: '',
        targetTable: '',
        lineWidth: 1,
    },
    initialize: function () {
        joint.dia.Link.prototype.initialize.apply(this, arguments);
        this.updateStyle(this, arguments);
    },
    updateStyle: function () {
        this.attr('.connection/stroke-dasharray', (this.get('style') === 'dash') ? '5 5' : 'none');
    }
});