var E = Object.defineProperty;
var b = (n, t, a) => t in n ? E(n, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : n[t] = a;
var p = (n, t, a) => (b(n, typeof t != "symbol" ? t + "" : t, a), a);
var r = {};
r.colors = [];
r.FONT_FAMILY = 'var(--qs-diagram-font-family, "Arial")';
r.colors.TABLE_BACKGROUND = "var(--qs-diagram-table-background-color, rgb(254,246,222))";
r.colors.TABLE_BORDER = "var(--qs-diagram-table-border-color, rgba(0,0,0,.1))";
r.colors.TABLE_NAME_TEXT = "var(--qs-diagram-table-name-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.8)))";
r.colors.TABLE_COLUMN_TEXT = "var(--qs-diagram-table-column-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.8)))";
r.colors.TABLE_DATA_TYPE_TEXT = "var(--qs-diagram-table-data-type-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.4)))";
r.TABLE_BORDER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue("--qs-diagram-table-border-radius");
r.TABLE_BORDER_RADIUS = r.TABLE_BORDER_RADIUS ? r.TABLE_BORDER_RADIUS : 0;
r.colors.VIEW_BACKGROUND = "var(--qs-diagram-view-background-color, rgb(236,245,231))";
r.colors.VIEW_BORDER = "var(--qs-diagram-view-border-color, rgba(0,0,0,.1))";
r.colors.VIEW_NAME_TEXT = "var(--qs-diagram-view-text-color, rgb(0,0,0))";
r.colors.VIEW_COLUMN_TEXT = "var(--qs-diagram-view-column-text-color, var(--qs-diagram-view-text-color, rgba(0,0,0,.8)))";
r.colors.VIEW_DATA_TYPE_TEXT = "var(--qs-diagram-view-data-type-text-color, var(--qs-diagram-view-text-color, rgba(0,0,0,.4)))";
r.VIEW_BORDER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue("--qs-diagram-view-border-radius");
r.VIEW_BORDER_RADIUS = r.VIEW_BORDER_RADIUS ? r.VIEW_BORDER_RADIUS : 4;
r.colors.LINK = "var(--qs-diagram-link-color, rgba(140,140,140,1))";
joint.shapes.quicksql = {};
joint.shapes.quicksql.Table = joint.shapes.standard.HeaderedRecord.define("quicksql.Table", {
  z: 0,
  columns: [],
  padding: { top: 25, bottom: 5, left: 0, right: 0 },
  size: { width: 60 },
  itemMinLabelWidth: 60,
  itemHeight: 16,
  itemOverflow: !0,
  attrs: {
    root: {
      magnet: !1
    },
    body: {
      // cursor: 'default',
      rx: r.TABLE_BORDER_RADIUS,
      ry: r.TABLE_BORDER_RADIUS,
      fill: r.colors.TABLE_BACKGROUND,
      stroke: r.colors.TABLE_BORDER,
      "stroke-width": 1,
      refWidth: "100%",
      refHeight: "100%"
    },
    headerLabel: {
      // cursor: 'default',
      y: -4,
      fontFamily: r.FONT_FAMILY,
      fill: r.colors.TABLE_NAME_TEXT,
      fontWeight: "bold",
      fontSize: 12,
      textWrap: {
        ellipsis: !0,
        height: 20
      }
    },
    separator: {
      // cursor: 'default',
      stroke: r.colors.TABLE_BORDER,
      strokeWidth: 1
    },
    itemBodies_0: {
      magnet: !1,
      pointerEvents: "none"
    },
    group_1: {
      pointerEvents: "none"
    },
    itemLabels: {
      fontFamily: r.FONT_FAMILY,
      fontWeight: "bold",
      fontSize: 10,
      fill: r.colors.TABLE_COLUMN_TEXT,
      pointerEvents: "none"
    },
    itemLabels_1: {
      fill: r.colors.TABLE_DATA_TYPE_TEXT,
      textAnchor: "end",
      x: "calc(0.5 * w - 20)"
    }
  }
}, {
  markup: [{
    tagName: "rect",
    selector: "body"
  }, {
    tagName: "text",
    selector: "headerLabel"
  }, {
    tagName: "path",
    selector: "separator"
  }],
  setName(n, t) {
    return this.attr(["headerLabel", "text"], n, t);
  },
  setColumns(n = []) {
    const t = [], a = [];
    n.forEach((e, o) => {
      if (!e.name)
        return;
      t.push({
        id: e.name,
        label: e.name,
        span: 2
      });
      const s = {
        id: `${e.datatype}_${o}`,
        label: e.datatype
      };
      a.push(s);
    }), this.set("items", [t, a]), this.removeInvalidLinks();
  }
});
joint.shapes.quicksql.TableView = joint.shapes.standard.RecordView.extend({
  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments), this.updatePath();
  },
  updatePath: function() {
    var n = "M 0 20 L " + this.model.get("size").width + " 20";
    this.model.attr("separator/d", n, {
      silent: !0
    });
  }
});
joint.shapes.quicksql.View = joint.shapes.quicksql.Table.define("quicksql.View", {
  attrs: {
    body: {
      rx: r.VIEW_BORDER_RADIUS,
      ry: r.VIEW_BORDER_RADIUS,
      fill: r.colors.VIEW_BACKGROUND,
      stroke: r.colors.VIEW_BORDER
    },
    headerLabel: {
      fontFamily: r.FONT_FAMILY,
      fill: r.colors.VIEW_NAME_TEXT
    },
    separator: {
      stroke: r.colors.TABLE_BORDER
    },
    itemLabels: {
      fill: r.colors.VIEW_COLUMN_TEXT
    },
    itemLabels_1: {
      fill: r.colors.VIEW_DATA_TYPE_TEXT
    }
  }
});
joint.shapes.quicksql.ViewView = joint.shapes.quicksql.TableView;
joint.shapes.quicksql.Relation = joint.dia.Link.extend({
  z: -1,
  defaults: {
    type: "quicksql.Relation",
    attrs: {
      ".connection": {
        stroke: r.colors.LINK,
        "stroke-width": 1,
        "stroke-dasharray": "none"
      },
      ".marker-source": {
        fill: r.colors.LINK,
        stroke: r.colors.LINK,
        d: "M 5 0 L 0 4 L 5 8 z"
      }
    },
    style: "none",
    sourceTable: "",
    targetTable: "",
    lineWidth: 1
  },
  initialize: function() {
    joint.dia.Link.prototype.initialize.apply(this, arguments), this.updateStyle(this, arguments);
  },
  updateStyle: function() {
    this.attr(".connection/stroke-dasharray", this.get("style") === "dash" ? "5 5" : "none");
  }
});
var u = {};
const f = getComputedStyle(document.querySelector(":root")).getPropertyValue("--qs-diagram-font-family") || "Arial";
u.newGuid = function() {
  function n(t) {
    var a = (Math.random().toString(16) + "000000000").substr(2, 8);
    return t ? "-" + a.substr(0, 4) + "-" + a.substr(4, 4) : a;
  }
  return n() + n(!0) + n(!0) + n();
};
u.calcWidth = function(n, t, a) {
  var e = t;
  n && (e = n.concat(".").concat(t));
  for (var o = u.getTextWidth(e, `12pt ${f}`) + 0, s = 0, i = 0, d = 0; d < a.length; d++)
    s = Math.max(s, u.getTextWidth(a[d].name, `10pt ${f}`)), i = Math.max(i, u.getTextWidth(a[d].datatype, `10pt ${f}`));
  const c = i > s ? i * 2 + 20 : s + i + 20;
  let l = Math.max(o, c);
  return Math.max(l, 230);
};
u.getTextWidth = function(n, t) {
  var a = u.getTextWidth.canvas || (u.getTextWidth.canvas = document.createElement("canvas")), e = a.getContext("2d");
  e.font = t;
  var o = e.measureText(n);
  return o.width;
};
class T {
  constructor(t, a = "#quickERD") {
    p(this, "buildDiagram", (t, a) => {
      let e = /* @__PURE__ */ new Map();
      a.items.forEach((o) => {
        const s = o.name.toUpperCase();
        let i = o.schema;
        i && (i = i.toUpperCase());
        const c = (o.columns || []).map((g) => ({ name: g.name.toUpperCase(), datatype: g.datatype.replace("(", " (").toUpperCase() }));
        let l = u.calcWidth(i, s, c, []), h;
        o.type && o.type === "view" ? h = this.addView(s, i, c, l) : h = this.addTable(s, i, c, l);
        const m = i ? `${i}.${s}` : s;
        e.set(m, h.id), t.push(h);
      }), a.links.forEach((o) => {
        const s = e.get(o.source.toUpperCase()), i = e.get(o.target.toUpperCase());
        s && i && t.push(this.addLink(s, i, o.source_id, o.target_id));
      });
    });
    p(this, "addTable", (t, a, e, o) => {
      let s = t;
      a && (s = `${a}.${t}`);
      let i = new joint.shapes.quicksql.Table({
        id: u.newGuid(),
        size: { width: o }
      });
      return i.setName(s), i.setColumns(e), i;
    });
    p(this, "addView", (t, a, e, o) => {
      let s = t;
      a && (s = `${a}.${t}`);
      let i = new joint.shapes.quicksql.View({
        id: u.newGuid(),
        size: { width: o }
      });
      return i.setName(s), i.setColumns(e), i;
    });
    p(this, "addLink", (t, a, e, o) => {
      let s = "solid";
      return new joint.shapes.quicksql.Relation({
        source: { id: t, port: e.toUpperCase() },
        target: { id: a, port: o.toUpperCase() },
        style: s
      });
    });
    p(this, "printDiagram", () => {
      this.paper.print();
    });
    p(this, "exportAsSVG", () => {
      const t = this.graph.getBBox().inflate(50);
      this.paper.toSVG((a) => {
        var e = "QuickSqlDiagram-";
        this.saveDiagram(e, a);
      }, {
        area: t,
        convertImagesToDataUris: !0,
        preserveDimensions: this.paper.getComputedSize()
      });
    });
    p(this, "saveDiagram", (t, a) => {
      function e(h) {
        return h >= 100 ? e(h % 100) : (h < 10 ? "0" : "") + h;
      }
      var o = /* @__PURE__ */ new Date(), i = {
        type: "text/plain;charset=UTF-8",
        name: t + e(o.getFullYear()) + "-" + e(o.getMonth() + 1) + "-" + e(o.getDate()) + "_" + e(o.getHours() + 1) + "-" + e(o.getMinutes()) + ".svg"
      }, d = new Blob([a], { type: i.type }), c = window.URL.createObjectURL(d), l = document.createElement("a");
      document.body.appendChild(l), l.style = "display: none", l.href = c, l.download = i.name, setTimeout(() => {
        l.click(), window.URL.revokeObjectURL(c), l.remove();
      }, 0);
    });
    p(this, "zoomIn", () => {
      this.paperScroller.zoom(0.2, { max: 3 }), this.paperScroller.centerContent();
    });
    p(this, "zoomOut", () => {
      this.paperScroller.zoom(-0.2, { min: 0.1 }), this.paperScroller.centerContent();
    });
    p(this, "fitScreen", () => {
      this.paperScroller.zoomToFit({
        padding: 10,
        scaleGrid: 0.2,
        minScale: 0.1,
        maxScale: 3
      }), this.paperScroller.centerContent();
    });
    p(this, "actualSize", () => {
      this.paperScroller.zoom(1, { absolute: !0 }), this.paperScroller.centerContent();
    });
    p(this, "onMouseWheel", (t, a, e, o) => {
      t.shiftKey && (t.preventDefault(), o === -1 ? this.paperScroller.zoom(-0.2, { min: 0.1 }) : o === 1 && this.paperScroller.zoom(0.2, { max: 3 }), this.paperScroller.centerContent());
    });
    if (!a || !(typeof a == "string" && (this.element = document.querySelector(a))) && !(typeof a == "object" && (this.element = a) && typeof this.element.append == "function"))
      throw new Error("Invalid element or selector provided");
    joint.anchors.columnAnchor = function(e, o, s) {
      let i;
      const { model: d } = e, c = e.getNodeUnrotatedBBox(o), l = d.getBBox().center(), h = d.angle();
      let m = s;
      if (s instanceof Element) {
        const g = this.paper.findView(s);
        m = g ? g.getNodeBBox(s).center() : new joint.g.Point();
      }
      return m.rotate(l, h), i = m.x <= c.x + c.width ? c.leftMiddle() : c.rightMiddle(), i.rotate(l, -h);
    }, this.data = t, this.graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }), this.paper = new joint.dia.Paper({
      width: 100,
      height: 100,
      gridSize: 1,
      model: this.graph,
      highlighting: !1,
      sorting: joint.dia.Paper.sorting.APPROX,
      cellViewNamespace: joint.shapes,
      defaultRouter: { name: "metro" },
      defaultAnchor: { name: "columnAnchor" },
      defaultConnector: { name: "rounded" },
      linkPinning: !1,
      interactive: {
        vertexAdd: !1,
        linkMove: !1,
        elementMove: !0
      }
    }), this.paperScroller = new joint.ui.PaperScroller({
      autoResizePaper: !0,
      padding: 50,
      paper: this.paper
    }), this.paper.on("blank:pointerdown", (e, o, s) => {
      this.paperScroller.setCursor("grabbing"), this.paperScroller.startPanning(e, o, s);
    }), this.paper.on("blank:pointerup", () => {
      this.paperScroller.setCursor("default");
    }), this.paper.on("cell:mousewheel", (e, o, s, i, d) => {
      this.onMouseWheel(o, s, i, d);
    }), this.paper.on("blank:mousewheel", (e, o, s, i) => {
      this.onMouseWheel(e, o, s, i);
    }), new joint.ui.Snaplines({ paper: this.paper }), this.keyboard && this.keyboard.disable(), this.keyboard = new joint.ui.Keyboard(), this.keyboard.on({
      "shift+alt+a": function(e) {
        this.actualSize(), e.preventDefault(), e.stopPropagation();
      },
      "shift+alt+c": function(e) {
        this.paperScroller.centerContent(), e.preventDefault(), e.stopPropagation();
      },
      "shift+alt+f": function(e) {
        this.fitScreen(), e.preventDefault(), e.stopPropagation();
      },
      "shift+alt+p": function(e) {
        this.printDiagram(), e.preventDefault(), e.stopPropagation();
      },
      "shift+alt+s": function(e) {
        this.exportAsSVG(), e.preventDefault(), e.stopPropagation();
      }
    }, this), this.element.append(this.paperScroller.render().el), this.updateDiagram();
  }
  async updateDiagram() {
    var t;
    if ((t = this.data.items) != null && t.length) {
      let a = [];
      this.buildDiagram(a, this.data), this.graph.resetCells(a), this.autoLayout(), setTimeout(() => {
        this.paperScroller.adjustPaper(), this.actualSize();
      }, 100);
    }
  }
  autoLayout() {
    joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 120,
      edgeSep: 100,
      rankSep: 100
    }), this.graph.getLinks().forEach((t) => {
      t.toBack();
    });
  }
}
const _ = "1.2.13", R = {
  Diagram: T,
  version: _
};
export {
  T as Diagram,
  R as default,
  _ as version
};
