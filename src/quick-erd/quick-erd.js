/* globals __PACKAGE_VERSION__, joint */

// Utilities added to the JointJS global
import './renderer.js';
// CSS
import './quick-erd.css';

import utils from './utils.js';
import AutoLayout from './auto-layout.js';

export class Diagram {
    constructor( data, elementOrSelector = '#quickERD' ) {
        if (
            !elementOrSelector
            || (
                !(
                    typeof elementOrSelector === 'string'
                    && ( this.element = document.querySelector( elementOrSelector ) )
                )
                && !(
                    typeof elementOrSelector === 'object'
                    && ( this.element = elementOrSelector )
                    // Duck typing for now
                    && ( typeof this.element.append === 'function' )
                )
            )
        ) {
            throw new Error( 'Invalid element or selector provided' );
        }

        joint.anchors.columnAnchor = function (view, magnet, ref) {
            let anchor;
            const { model } = view;
            const bbox = view.getNodeUnrotatedBBox(magnet);
            const center = model.getBBox().center();
            const angle = model.angle();
            let refPoint = ref;
            if (ref instanceof Element) {
                const refView = this.paper.findView(ref);
                refPoint = (refView) ? refView.getNodeBBox(ref).center() : new joint.g.Point();
            }
            refPoint.rotate(center, angle);
            anchor = (refPoint.x <= (bbox.x + bbox.width)) ? bbox.leftMiddle() : bbox.rightMiddle();
            return anchor.rotate(center, -angle);
        };

        this.data = data;
        this.graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes });
        this.paper = new joint.dia.Paper({
            width: 100,
            height: 100,
            gridSize: 1,
            model: this.graph,
            highlighting: false,
            sorting: joint.dia.Paper.sorting.APPROX,
            cellViewNamespace: joint.shapes,
            defaultRouter: { name: 'metro' },
            defaultAnchor: { name: 'columnAnchor' },
            defaultConnector: { name: 'rounded' },
            linkPinning: false,
            interactive: {
                vertexAdd: false,
                linkMove: false,
                elementMove: false
            }
        });

        this.paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            padding: 50,
            paper: this.paper
        });

        this.paper.on('blank:pointerdown', (evt, x, y) => {
            this.paperScroller.setCursor('grabbing');
            this.paperScroller.startPanning(evt, x, y);
        });

        this.paper.on('blank:pointerup', () => {
            this.paperScroller.setCursor('default');
        });

        this.paper.on('cell:mousewheel', (cellView, evt, x, y, delta) => {
            this.onMouseWheel(evt, x, y, delta);
        });

        this.paper.on('blank:mousewheel', (evt, x, y, delta) => {
            this.onMouseWheel(evt, x, y, delta);
        });

        if (this.keyboard) {
            this.keyboard.disable();
        }
        this.keyboard = new joint.ui.Keyboard();
        this.keyboard.on({

            'alt+a': function (evt) {
                this.actualSize();
                evt.preventDefault();
                evt.stopPropagation();
            },
            'alt+c': function (evt) {
                this.paperScroller.centerContent();
                evt.preventDefault();
                evt.stopPropagation();
            },
            'alt+f': function (evt) {
                this.fitScreen();
                evt.preventDefault();
                evt.stopPropagation();
            },
            'alt+p': function (evt) {
                this.printDiagram();
                evt.preventDefault();
                evt.stopPropagation();
            },
            'alt+s': function (evt) {
                this.exportAsSVG();
                evt.preventDefault();
                evt.stopPropagation();
            }

        }, this);

        this.element.append( this.paperScroller.render().el );

        this.updateDiagram();
    }

    async updateDiagram() {
        if (this.data.items?.length) {
            let cells = [];

            this.buildDiagram(cells, this.data);

            this.graph.resetCells(cells);

            this.autoLayout();

            setTimeout(() => {
                this.paperScroller.adjustPaper();
                this.actualSize();
            }, 100);
        }
    }

    buildDiagram = (cells, data) => {
        let idsMap = new Map();

        data.items.forEach(item => {
            const objectName = item.name.toUpperCase();
            let objectSchema = item.schema;
            if (objectSchema) {
                objectSchema = objectSchema.toUpperCase();
            }
            const columns = item.columns || [];

            const columnsUC = columns.map((col) => {
                return { name: col.name.toUpperCase(), datatype: col.datatype.replace('(', ' (').toUpperCase() };
            });


            let objectWidth = utils.calcWidth(objectSchema, objectName, columnsUC, []);

            let cell;
            if ((item.type) && (item.type === 'view')) {
                cell = this.addView(objectName, objectSchema, columnsUC, objectWidth);
            } else {
                cell = this.addTable(objectName, objectSchema, columnsUC, objectWidth);
            }

            const fullName = objectSchema ? `${objectSchema}.${objectName}` : objectName;
            idsMap.set(fullName, cell.id);
            cells.push(cell);
        });

        data.links.forEach(link => {
            const sourceID = idsMap.get(link.source.toUpperCase());
            const targetID = idsMap.get(link.target.toUpperCase());
            if (sourceID && targetID) {
                cells.push(this.addLink(sourceID, targetID, link.source_id, link.target_id));
            }
        });
    };

    addTable = (_name, _schema, _columns, objectWidth) => {
        let fullName = _name;
        if (_schema) {
            fullName = `${_schema}.${_name}`;
        }

        let table = new joint.shapes.quicksql.Table({
            id: utils.newGuid(),
            size: {width: objectWidth}
        });

        table.setName(fullName);
        table.setColumns(_columns);
        return table;
    };

    addView = (_name, _schema, _columns, objectWidth) => {
        let fullName = _name;
        if (_schema) {
            fullName = `${_schema}.${_name}`;
        }

        let view = new joint.shapes.quicksql.View({
            id: utils.newGuid(),
            size: {width: objectWidth}
        });

        view.setName(fullName);
        view.setColumns(_columns);
        return view;
    };

    addLink = (sourceID, targetID, sourceColumnID, targetColumnID) => {
        let linkStyle = 'solid'; // fkey.mandatory ? "solid" : "dash";
        let link = new joint.shapes.quicksql.Relation({
            source: { id: sourceID, port: sourceColumnID.toUpperCase() },
            target: { id: targetID, port: targetColumnID.toUpperCase() },
            style: linkStyle
        });
        return link;
    };


    getAllElements() {
        let list = [];
        let elements = this.graph.getElements();
        let count = elements.length;
        for (var i = 0; i < count; i++) {
            let element = elements[i];
            let obj = {};
            obj.element = element;
            obj.type = element.attributes.type;
            obj.name = element.attributes.name;
            obj.schema = element.attributes.schema;
            obj.id = element.id;
            obj.pos = { x: element.attributes.position.x, y: element.attributes.position.y };
            obj.size = { width: element.attributes.size.width, height: element.attributes.size.height };

            list.push(obj);
        }
        return list;
    }

    getAllLinks() {
        let list = [];
        let links = this.graph.getLinks();
        let count = links.length;
        for (var i = 0; i < count; i++) {
            let link = links[i];
            if (link.attributes.type === 'quicksql.Relation') {
                var obj = {};
                obj.link = link;
                obj.sourceID = link.attributes.target.id; // JointJS has opposite source and target
                obj.targetID = link.attributes.source.id;
                obj.id = obj.targetID.concat('_').concat(obj.sourceID);
                list.push(obj);
            }
        }
        return list;
    }

    printDiagram = () => {
        this.paper.print();
    };

    exportAsSVG = () => {
        const downloadArea = this.graph.getBBox().inflate(50);
        this.paper.toSVG((svgString) => {
            var fileName = 'quicksqlDiagram-';
            this.saveDiagram(fileName, svgString);
        }, {
            area: downloadArea,
            convertImagesToDataUris: true,
            preserveDimensions: this.paper.getComputedSize()
        });
    };

    saveDiagram = (fileName, svgString) => {
        function f(num) {
            if (num >= 100) {
                return f(num % 100);
            }
            return (num < 10 ? '0' : '') + num;
        }
        var now = new Date();
        const filename = fileName + f(now.getFullYear()) + '-' + f(now.getMonth() + 1) + '-' + f(now.getDate()) + '_' + f(now.getHours() + 1) + '-' + f(now.getMinutes());
        var file = {
            type: 'text/plain;charset=UTF-8',
            name: filename + '.svg'
        };

        var blob = new Blob([svgString], { type: file.type });

        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = file.name;
        setTimeout(() => {
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }, 0);
    };

    zoomIn = () => {
        this.paperScroller.zoom(0.2, { max: 3 });
        this.paperScroller.centerContent();
    };

    zoomOut = () => {
        this.paperScroller.zoom(-0.2, { min: 0.1 });
        this.paperScroller.centerContent();
    };

    fitScreen = () => {
        this.paperScroller.zoomToFit({
            padding: 10,
            scaleGrid: 0.2,
            minScale: 0.1,
            maxScale: 3
        });
        this.paperScroller.centerContent();
    };

    actualSize = () => {
        this.paperScroller.zoom(1, { absolute: true });
        this.paperScroller.centerContent();
    };

    onMouseWheel = (evt, x, y, delta) => {
        if (evt.shiftKey) {
            evt.preventDefault();
            if (delta === -1) {
                this.paperScroller.zoom(-0.2, { min: 0.1 });
            } else if (delta === 1) {
                this.paperScroller.zoom(0.2, { max: 3 });
            }
            this.paperScroller.centerContent();
        }
    };

    autoLayout() {
        var layout = new AutoLayout(this);
        layout.rearrangeDiagram(3, false);
        this.paperScroller.centerContent();
    }
}

export const version = typeof __PACKAGE_VERSION__ === 'undefined' ? 'development' : __PACKAGE_VERSION__;

export default {
    Diagram,
    version
};
