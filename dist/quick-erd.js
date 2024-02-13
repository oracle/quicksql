var te = Object.defineProperty;
var ae = (n, e, s) => e in n ? te(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var I = (n, e, s) => (ae(n, typeof e != "symbol" ? e + "" : e, s), s);
var w = {};
w.colors = [];
w.FONT_FAMILY = 'var(--qs-diagram-font-family, "Arial")';
w.colors.TABLE_BACKGROUND = "var(--qs-diagram-table-background-color, rgb(254,246,222))";
w.colors.TABLE_BORDER = "var(--qs-diagram-table-border-color, rgba(0,0,0,.1))";
w.colors.TABLE_NAME_TEXT = "var(--qs-diagram-table-name-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.8)))";
w.colors.TABLE_COLUMN_TEXT = "var(--qs-diagram-table-column-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.8)))";
w.colors.TABLE_DATA_TYPE_TEXT = "var(--qs-diagram-table-data-type-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.4)))";
w.TABLE_BORDER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue("--qs-diagram-table-border-radius");
w.TABLE_BORDER_RADIUS = w.TABLE_BORDER_RADIUS ? w.TABLE_BORDER_RADIUS : 0;
w.colors.VIEW_BACKGROUND = "var(--qs-diagram-view-background-color, rgb(236,245,231))";
w.colors.VIEW_BORDER = "var(--qs-diagram-view-border-color, rgba(0,0,0,.1))";
w.colors.VIEW_NAME_TEXT = "var(--qs-diagram-view-text-color, rgb(0,0,0))";
w.colors.VIEW_COLUMN_TEXT = "var(--qs-diagram-view-column-text-color, var(--qs-diagram-view-text-color, rgba(0,0,0,.8)))";
w.colors.VIEW_DATA_TYPE_TEXT = "var(--qs-diagram-view-data-type-text-color, var(--qs-diagram-view-text-color, rgba(0,0,0,.4)))";
w.VIEW_BORDER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue("--qs-diagram-view-border-radius");
w.VIEW_BORDER_RADIUS = w.VIEW_BORDER_RADIUS ? w.VIEW_BORDER_RADIUS : 4;
w.colors.LINK = "var(--qs-diagram-link-color, rgba(140,140,140,1))";
joint.shapes.quicksql = {};
joint.shapes.quicksql.Table = joint.shapes.standard.HeaderedRecord.define("quicksql.Table", {
  z: 3,
  columns: [],
  padding: { top: 25, bottom: 5, left: 0, right: 0 },
  size: { width: 160 },
  itemMinLabelWidth: 105,
  itemHeight: 16,
  itemOverflow: !0,
  attrs: {
    root: {
      magnet: !1
    },
    body: {
      cursor: "default",
      rx: w.TABLE_BORDER_RADIUS,
      ry: w.TABLE_BORDER_RADIUS,
      fill: w.colors.TABLE_BACKGROUND,
      stroke: w.colors.TABLE_BORDER,
      "stroke-width": 1,
      refWidth: "100%",
      refHeight: "100%"
    },
    headerLabel: {
      cursor: "default",
      y: -4,
      fontFamily: w.FONT_FAMILY,
      fill: w.colors.TABLE_NAME_TEXT,
      fontWeight: "bold",
      fontSize: 12,
      textWrap: {
        ellipsis: !0,
        height: 20
      }
    },
    separator: {
      cursor: "default",
      stroke: w.colors.TABLE_BORDER,
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
      fontFamily: w.FONT_FAMILY,
      fontWeight: "bold",
      fontSize: 10,
      fill: w.colors.TABLE_COLUMN_TEXT,
      pointerEvents: "none"
    },
    itemLabels_1: {
      fill: w.colors.TABLE_DATA_TYPE_TEXT,
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
  setName(n, e) {
    return this.attr(["headerLabel", "text"], n, e);
  },
  setColumns(n = []) {
    const e = [], s = [];
    n.forEach((l, o) => {
      if (!l.name)
        return;
      e.push({
        id: l.name,
        label: l.name,
        span: 2
      });
      const i = {
        id: `${l.datatype}_${o}`,
        label: l.datatype
      };
      s.push(i);
    }), this.set("items", [e, s]), this.removeInvalidLinks();
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
      rx: w.VIEW_BORDER_RADIUS,
      ry: w.VIEW_BORDER_RADIUS,
      fill: w.colors.VIEW_BACKGROUND,
      stroke: w.colors.VIEW_BORDER
    },
    headerLabel: {
      fontFamily: w.FONT_FAMILY,
      fill: w.colors.VIEW_NAME_TEXT
    },
    separator: {
      stroke: w.colors.TABLE_BORDER
    },
    itemLabels: {
      fill: w.colors.VIEW_COLUMN_TEXT
    },
    itemLabels_1: {
      fill: w.colors.VIEW_DATA_TYPE_TEXT
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
        stroke: w.colors.LINK,
        "stroke-width": 1,
        "stroke-dasharray": "none"
      },
      ".marker-source": {
        fill: w.colors.LINK,
        stroke: w.colors.LINK,
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
var W = {};
const X = getComputedStyle(document.querySelector(":root")).getPropertyValue("--qs-diagram-font-family") || "Arial";
W.newGuid = function() {
  function n(e) {
    var s = (Math.random().toString(16) + "000000000").substr(2, 8);
    return e ? "-" + s.substr(0, 4) + "-" + s.substr(4, 4) : s;
  }
  return n() + n(!0) + n(!0) + n();
};
W.calcWidth = function(n, e, s) {
  var l = e;
  n && (l = n.concat(".").concat(e));
  for (var o = W.getTextWidth(l, `12pt ${X}`), i = 0, d = 0, T = 0; T < s.length; T++)
    i = Math.max(i, W.getTextWidth(s[T].name, `10pt ${X}`)), d = Math.max(d, W.getTextWidth(s[T].datatype, `10pt ${X}`));
  const L = d > i ? d * 2 : i + d + 20;
  return Math.max(o, L);
};
W.getTextWidth = function(n, e) {
  var s = W.getTextWidth.canvas || (W.getTextWidth.canvas = document.createElement("canvas")), l = s.getContext("2d");
  l.font = e;
  var o = l.measureText(n);
  return o.width;
};
function ne() {
  var n = this;
  n.referredBy_count = 0, n.refer_count = 0, n.referredBy = [], n.referredByFK = [], n.refer = [], n.referFK = [], n.referredByMap = {}, n.referMap = {}, n.arranged = !1, n.booked = !1, n.scanned = !1, n.star = !1, n.usedInStar = !1, n.nodes = [], n.init_dim = { width: 0, height: 0 }, n.location, n.rect, n.isScanConnectedToBetterLevel = function(e, s) {
    for (var l = n.referredBy.length, o = 0; o < l; o++) {
      var i = n.referredBy[o];
      if (i != e && i.level < s && !i.scanned)
        return !0;
    }
    for (var d = n.refer.length, T = 0; T < d; T++) {
      var i = n.refer[T];
      if (i != e && i.level < s && !i.scanned)
        return !0;
    }
    return !1;
  }, n.isConnectedToBetterLevel = function(e, s) {
    for (var l = n.referredBy.length, o = 0; o < l; o++) {
      var i = n.referredBy[o];
      if (i != e && i.level < s && !i.arranged)
        return !0;
    }
    for (var d = n.refer.length, T = 0; T < d; T++) {
      var i = n.refer[T];
      if (i != e && i.level < s && !i.arranged)
        return !0;
    }
    return !1;
  }, n.referOnly = function(e) {
    for (var s = n.refer.length, l = 0; l < s; l++) {
      var o = n.refer[l];
      if (o != e)
        return !1;
    }
    for (var i = n.referredBy.length, d = 0; d < i; d++) {
      var o = n.referredBy[d];
      if (o != e)
        return !1;
    }
    return !0;
  }, n.referOnlyAndArranged = function(e) {
    for (var s = n.refer.length, l = 0; l < s; l++) {
      var o = n.refer[l];
      if (o != e && !o.arranged)
        return !1;
    }
    for (var i = n.referredBy.length, d = 0; d < i; d++) {
      var o = n.referredBy[d];
      if (o != e && !o.arranged)
        return !1;
    }
    return !0;
  };
}
function S(n, e, s, l) {
  var o = this;
  o.x = n, o.y = e, o.width = s, o.height = l, o.union = function(i) {
    var d = Math.min(this.x, i.x), T = Math.min(this.y, i.y), L = Math.max(this.x + this.width, i.x + i.width), R = Math.max(this.y + this.height, i.y + i.height);
    return new S(d, T, L - d, R - T);
  };
}
function P(n, e) {
  var s = this;
  s.x = n, s.y = e;
}
function Y(n, e) {
  return n.referredBy_count > e.referredBy_count ? 1 : n.referredBy_count < e.referredBy_count ? -1 : n.refer_count < e.refer_count ? 1 : n.refer_count > e.refer_count ? -1 : 0;
}
function ie(n, e) {
  return n.referredBy_count > e.referredBy_count ? 1 : n.referredBy_count < e.referredBy_count ? -1 : n.refer_count > e.refer_count ? 1 : n.refer_count < e.refer_count ? -1 : 0;
}
function oe(n, e) {
  return n.referredBy_count < e.referredBy_count ? 1 : n.referredBy_count > e.referredBy_count ? -1 : n.refer_count < e.refer_count ? 1 : n.refer_count > e.refer_count ? -1 : 0;
}
function Q(n, e) {
  return n.refer_count < e.refer_count ? 1 : n.refer_count > e.refer_count ? -1 : n.referredBy_count < e.referredBy_count ? 1 : n.referredBy_count > e.referredBy_count ? -1 : 0;
}
function J(n, e) {
  return n.init_dim.height > e.init_dim.height ? 1 : n.init_dim.height < e.init_dim.height ? -1 : 0;
}
function le(n, e) {
  return n.rect.height < e.rect.height ? 1 : n.rect.height > e.rect.height ? -1 : 0;
}
function se(n) {
  var e = this, s = 20, l = 20, o = 20, i = 20, d = 35, T = 25, L = 0, R = 1, b = !0, E = 80, D = 80, $ = 12e3, K = [], O = [], z = {}, Z = 2e3, ee = 20;
  e.rearrangeDiagram = function(r, u, h) {
    R = r, b = u;
    var v = [];
    v.length > 0 ? (h != null && (s = h.getX(), l = h.getY()), e.rearrangeT(R, !1, v)) : (s = 20, l = 20, e.rearrangeT(R, !1));
  }, e.rearrangeT = function(r, u, h) {
    o = s, i = l, D = 80, E = 100;
    var v;
    h != null && h.length > 0 ? v = h : v = n.getAllElements(), $ = 1e3, K.length = 0;
    var g = [], p = [];
    O = [];
    for (var a = [], t = e.buildTH_Map(v, u), B = [], _ = t.length, c = 0; c < _; c++) {
      var f = t[c];
      f.refer_count === 0 && f.referredBy_count === 0 ? g.push(f) : (p.push(f), f.refer.length > 0 && (r == 1 ? f.refer.sort(Y) : r == 2 ? f.refer.sort(ie) : f.refer.sort(oe)), f.referredBy_count == 0 && !f.usedInStar && O.push(f), f.referredBy.length > 0 && f.referredBy.sort(Q));
    }
    if (p.length > 0) {
      O.length == 0 && e.findRoots(p, O), O = O.concat(B), O.sort(Q);
      for (var y = Z, m = ee, x = 0; x < O.length; x++) {
        var f = O[x];
        if (!f.arranged && !f.usedInStar) {
          a.push(f);
          var A;
          f.star ? A = e.arrangeStar(f, y, m) : (e.setLevel2(f, 0), A = e.arrange(f, y, m, null, null, null)), m = m + A.height + 2 * D;
        }
      }
      a.sort(le), e.translateArrangeRoots(a), p = p.concat(K), e.applyArrange(p);
    }
    e.rearrangeNoneRefTables(g), e.applyArrange(g), K.length = 0, O.length = 0;
    for (var C in z)
      delete z[C];
  }, e.buildTH_Map = function(r, u) {
    for (var h in z)
      delete z[h];
    for (var v = [], g = r.length, p = 0; p < g; p++) {
      var a = r[p], t = z[a.id];
      t === void 0 && (t = new ne(), z[a.id] = t, t.element = a.element, t.type = a.type, t.name = a.name, t.schema = a.schema, t.id = a.id, t.pos = { x: a.pos.x, y: a.pos.y }, t.size = { width: a.size.width, height: a.size.height }, u || (t.init_dim = { width: a.size.width, height: a.size.height }), v.push(t));
    }
    for (var B = n.getAllLinks(), _ = B.length, c = 0; c < _; c++) {
      var f = B[c], y = z[f.targetID], m = z[f.sourceID];
      if (f.sourceID != f.targetID && y != null && m != null) {
        var x = {};
        x.link = f.link, x.id = f.id, x.sourceID = f.sourceID, x.targetID = f.targetID, !y.referredByFK.indexOf(x) >= 0 && (y.referredBy.push(m), y.referredByFK.push(x), y.referredByMap[x.id] = m, y.referredBy_count++), !m.referFK.indexOf(x) >= 0 && (m.refer.push(y), m.referFK.push(x), m.referMap[x.id] = y, m.refer_count++);
      }
    }
    return v;
  }, e.findRoots = function(r, u) {
    r.sort(Y);
    var h = -1;
    if (r.length > 0)
      do {
        h++;
        for (var v = r.length, g = 0; g < v; g++) {
          var p = r[g];
          p.referredBy_count === h && u.push(p);
        }
      } while (u.length === 0);
  }, e.arrangeStar = function(r, u, h) {
    var v = new S(u, h, 1, 1);
    r.nodes.push(r);
    for (var g = [], p = r.referredBy.length, a = 0; a < p; a++) {
      var t = r.referredBy[a];
      !g.indexOf(t) >= 0 && g.push(t);
    }
    for (var B = r.refer.length, _ = 0; _ < B; _++) {
      var t = r.refer[_];
      !g.indexOf(t) >= 0 && g.push(t);
    }
    g.sort(J);
    for (var c = 0, f = g.length, y = 0; y < f; y++) {
      var t = g[y];
      c = c + t.init_dim.width + E;
    }
    for (var m = u, x = h, A = u + c / 2, C = 0, k = 0, N = u, a = g.length - 1; a >= 0 && m < A; a--) {
      C = a;
      var t = g[a];
      k = Math.max(k, t.init_dim.height), N = m + t.init_dim.width, r.nodes.push(t), t.nodes.push(t), t.location = new P(m, x), t.rect = new S(t.location.x, t.location.y, t.init_dim.width, t.init_dim.height), m = m + E + t.init_dim.width, v = v.union(t.rect), t.arranged = !0;
    }
    x = x + k + 2 * D, m = u + (N - u) / 2, r.location = new P(m, x), r.rect = new S(r.location.x, r.location.y, r.init_dim.width, r.init_dim.height), v = v.union(r.rect), r.arranged = !0, x = x + r.init_dim.height + 2 * D, m = u;
    for (var a = C - 1; a >= 0; a--) {
      var t = g[a];
      r.nodes.push(t), t.nodes.push(t), t.location = new P(m, x), t.rect = new S(t.location.x, t.location.y, t.init_dim.width, t.init_dim.height), m = m + E + t.init_dim.width, v = v.union(t.rect), t.arranged = !0;
    }
    return r.rect = v, v;
  }, e.setLevel2 = function(r, u) {
    if (u <= r.level && !r.scanned) {
      var h = [], v = [];
      r.level = u, r.scanned = !0;
      for (var g = r.refer.length, p = 0; p < g; p++) {
        var a = r.refer[p];
        a.level > u + 1 && !a.scanned && !a.isScanConnectedToBetterLevel(r, r.level) && (a.level++, h.push(a));
      }
      for (var t = r.referredBy.length, B = 0; B < t; B++) {
        var a = r.referredBy[B];
        a.level > u + 1 && !a.scanned && !a.isScanConnectedToBetterLevel(r, r.level) && (a.level++, v.push(a));
      }
      if (b) {
        for (var _ = h.length, c = 0; c < _; c++) {
          var a = h[c];
          e.setLevel2(a, u + 1);
        }
        for (var f = v.length, y = 0; y < f; y++) {
          var a = v[y];
          e.setLevel2(a, u + 1);
        }
      } else {
        for (var p = h.length - 1; p >= 0; p--) {
          var a = h[p];
          e.setLevel2(a, u + 1);
        }
        for (var p = v.length - 1; p >= 0; p--) {
          var a = v[p];
          e.setLevel2(a, u + 1);
        }
      }
    }
  }, e.arrange = function(r, u, h, v, g, p) {
    if (!r.arranged) {
      var a = v;
      r.location = new P(u, h), r.nodes.push(r), a === null ? a = new S(r.location.x, r.location.y, r.init_dim.width, r.init_dim.height) : a = a.union(new S(r.location.x, r.location.y, r.init_dim.width, r.init_dim.height)), r.arranged = !0;
      var t, B = e.getNotArranged(r.refer), _ = e.getNotArranged(r.referredBy), c = [];
      if (!b && e.canGoLeft(g, u, h + r.init_dim.height + D, _))
        for (var f = _.length, y = 0; y < f; y++) {
          var m = _[y];
          !m.arranged && !m.booked && !m.isConnectedToBetterLevel(r, r.level) && (m.booked = !0, c.push(m));
        }
      var x = e.canGoLeft(g, u, h + r.init_dim.height + D, _);
      if (!x) {
        for (var A = c.length, C = 0; C < A; C++) {
          var k = c[C];
          k.booked = !1;
        }
        c.length = 0;
      }
      if (B.length > 0)
        b || !x ? (_ = _.concat(B), t = e.orderDown(r, _, u, h + r.init_dim.height + D, [], r.nodes, g), a = a.union(t)) : _.length > 0 ? (t = e.orderLeft(r, _, u, h + r.init_dim.height + D, c, r.nodes, g), g == null ? g = new S(t.x, t.y, t.width, t.height) : g = g.union(t), a = a.union(t), t = e.orderDown(r, B, Math.max(u, t.x + t.width), h + r.init_dim.height + D, c, r.nodes, g), a = a.union(t)) : (t = e.orderDown(r, B, u, h + r.init_dim.height + D, c, r.nodes, g), a = a.union(t));
      else if (_.length > 0)
        if (b || !e.canGoLeft(g, u, h + r.init_dim.height + D, _))
          _ = _.concat(B), t = e.orderDown(r, _, u, h + r.init_dim.height + D, [], r.nodes, g), a = a.union(t);
        else {
          var N = _[_.length - 1];
          t = e.orderLeftCenter(r, _, u + N.init_dim.width + E, h + r.init_dim.height + D, c, r.nodes, g), a = a.union(t);
        }
      if (r.rect = new S(a.x, a.y, a.width, a.height), p != null)
        for (var q = r.nodes.length, V = 0; V < q; V++) {
          var N = r.nodes[V];
          p.indexOf(N) >= 0 || p.push(N);
        }
      return a;
    }
    return r.rect;
  }, e.getNotArranged = function(r) {
    for (var u = [], h = r.length, v = 0; v < h; v++) {
      var g = r[v];
      g.arranged || u.push(g);
    }
    return u;
  }, e.canGoLeft = function(r, u, h, v) {
    if (r == null || v.length == 0)
      return !0;
    for (var g = v.length, p = 0, a = 0; a < g; a++) {
      var t = v[a];
      p = p + E + t.init_dim.width;
    }
    return h > r.y + r.height || u - p > r.x + p;
  }, e.orderDown = function(r, u, h, v, g, p, a) {
    for (var t = [], B = u.length, _ = 0; _ < B; _++) {
      var c = u[_];
      !c.arranged && !c.booked && !(g.indexOf(c) >= 0) && !c.isConnectedToBetterLevel(r, r.level) && (c.booked = !0, t.push(c));
    }
    var f = h, y = v, m = new S(h, v, 1, 1), x;
    a === null ? x = null : x = new S(a.x, a.y, a.width, a.height);
    var A = [], C = t.length;
    if (C > 1) {
      var k = e.getReferOnly(t, r);
      if (k.length > 0) {
        k.length > 1 && k.sort(J);
        for (var U = r.location.y, j = D / 3, N = U + r.init_dim.height + j, q = 0; q < k.length; q++) {
          var c = k[q], V = U + c.init_dim.height;
          if (V <= N) {
            A.push(c);
            var H = t.indexOf(c);
            H > -1 && t.splice(H, 1), U = V + j;
          } else
            break;
        }
        var G = C / 2;
        for (G > 1 && (G = 1); t.length < G; )
          t.push(A[A.length - 1]), A.splice(A.length - 1, 1);
      }
    }
    C = t.length;
    for (var q = 0; q < C; q++) {
      var c = t[q];
      if (C > 1 && q === C - 1 && A.length === 0)
        if (A.length === 0 && c.referOnlyAndArranged(r)) {
          var F = r.location.x + E + r.init_dim.width, M = e.arrange(c, F, r.location.y, null, x, p);
          m = m.union(M);
        } else {
          var F = Math.max(r.location.x + E + r.init_dim.width, m.x + m.width + E), M = e.arrange(c, F, r.location.y, null, x, p);
          m = m.union(M);
        }
      var re = f, M = e.arrange(c, re, y, null, x, p);
      x == null ? x = new S(M.x, M.y, M.width, M.height) : x = x.union(M), f = Math.max(f, M.x + M.width) + E, m = m.union(M);
    }
    for (var U = r.location.y, j = D / 3, F = r.location.x + E + r.init_dim.width, q = 0; q < A.length; q++) {
      var c = A[q];
      c.nodes.push(c), p != null && p.push(c), c.location = new P(F, U), c.arranged = !0, c.booked = !1, c.rect = new S(c.location.x, c.location.y, c.init_dim.width, c.init_dim.height), m = m.union(c.rect), U = U + c.init_dim.height + j;
    }
    return m;
  }, e.getReferOnly = function(r, u) {
    for (var h = r.length, v = [], g = 0; g < h; g++) {
      var p = r[g];
      p.referOnly(u) && v.push(p);
    }
    return v;
  }, e.orderLeft = function(r, u, h, v, g, p, a) {
    for (var t = h - E, B = v, _ = new S(h, v, 1, 1), c = u.length - 1; c >= 0; c--) {
      var f = u[c];
      if (!f.arranged && !f.isConnectedToBetterLevel(r, r.level) && (!f.booked || g.indexOf(f) >= 0)) {
        var y = t - f.init_dim.width, m = e.arrange(f, y, B, null, a, p);
        t = Math.min(t, m.x) - E, _ = _.union(m);
      }
    }
    return _;
  }, e.orderLeftCenter = function(r, u, h, v, g, p, a) {
    for (var t = h - E, B = v, _ = [], c = new S(h, v, 1, 1), f = u.length - 1; f >= 0; f--) {
      var y = u[f];
      !y.arranged && !y.isConnectedToBetterLevel(r, r.level) && (!y.booked || g.indexOf(y) >= 0) && _.unshift(y);
    }
    if (_.length > 1) {
      for (var m = 0, f = 0; f < _.length - 1; f++) {
        var y = _[f];
        m = m + E + y.init_dim.width;
      }
      t = h + m / 2 - E;
    }
    for (var f = _.length - 1; f >= 0; f--) {
      var y = _[f];
      if (!y.arranged && !y.isConnectedToBetterLevel(r, r.level) && (!y.booked || g.indexOf(y) >= 0)) {
        var x = t - y.init_dim.width, A = e.arrange(y, x, B, null, a, p);
        t = Math.min(t, A.x) - E, c = c.union(A);
      }
    }
    return c;
  }, e.rearrangeNoneRefTables = function(r) {
    o = s, d = 35, T = 50, L = 0;
    var u = Math.sqrt(r.length), h = Math.round(u);
    Math.sqrt(u * u) != u && h++, h++;
    for (var v = r.length, g = 0; g < v; g++) {
      var p = r[g];
      L++;
      var a = p.init_dim;
      d = a.width, T = Math.max(a.height, T), p.location = new P(o, i), p.arranged = !0, o = o + d + 50, L == h && (L = 0, o = s, i = i + T + 150, T = 25);
    }
  }, e.translateArrangeRoots = function(r) {
    o = s, i = l;
    for (var u = 0, h = e.getRootsMaxWidth(r) + o + 5, v = r.length, g = 0; g < v; g++) {
      var p = r[g], a = p.rect;
      o + a.width > h && (o = s, i = i + u + 2 * D, u = 0), u = Math.max(a.height, u);
      for (var t = o - a.x, B = i - a.y, _ = p.nodes.length, c = 0; c < _; c++) {
        var f = p.nodes[c];
        f.location.x = t + f.location.x, f.location.y = B + f.location.y;
      }
      o = o + a.width + 2 * E;
    }
    i = i + u + 3 * D, o = s;
  }, e.getRootsMaxWidth = function(r) {
    for (var u = $, h = r.length, v = 0; v < h; v++) {
      var g = r[v];
      u < g.rect.width && (u = g.rect.width);
    }
    return u;
  }, e.applyArrange = function(r) {
    for (var u = r.length, h = 0; h < u; h++) {
      var v = r[h];
      v.arranged && v.element.position(v.location.x, v.location.y);
    }
  };
}
class de {
  constructor(e, s = "#quickERD") {
    I(this, "buildDiagram", (e, s) => {
      let l = /* @__PURE__ */ new Map();
      s.items.forEach((o) => {
        const i = o.name.toUpperCase();
        let d = o.schema;
        d && (d = d.toUpperCase());
        const L = (o.columns || []).map((D) => ({ name: D.name.toUpperCase(), datatype: D.datatype.replace("(", " (").toUpperCase() }));
        let R = W.calcWidth(d, i, L, []), b;
        o.type && o.type === "view" ? b = this.addView(i, d, L, R) : b = this.addTable(i, d, L, R);
        const E = d ? `${d}.${i}` : i;
        l.set(E, b.id), e.push(b);
      }), s.links.forEach((o) => {
        const i = l.get(o.source.toUpperCase()), d = l.get(o.target.toUpperCase());
        i && d && e.push(this.addLink(i, d, o.source_id, o.target_id));
      });
    });
    I(this, "addTable", (e, s, l, o) => {
      let i = e;
      s && (i = `${s}.${e}`);
      let d = new joint.shapes.quicksql.Table({
        id: W.newGuid(),
        size: { width: o }
      });
      return d.setName(i), d.setColumns(l), d;
    });
    I(this, "addView", (e, s, l, o) => {
      let i = e;
      s && (i = `${s}.${e}`);
      let d = new joint.shapes.quicksql.View({
        id: W.newGuid(),
        size: { width: o }
      });
      return d.setName(i), d.setColumns(l), d;
    });
    I(this, "addLink", (e, s, l, o) => {
      let i = "solid";
      return new joint.shapes.quicksql.Relation({
        source: { id: e, port: l.toUpperCase() },
        target: { id: s, port: o.toUpperCase() },
        style: i
      });
    });
    I(this, "printDiagram", () => {
      this.paper.print();
    });
    I(this, "exportAsSVG", () => {
      const e = this.graph.getBBox().inflate(50);
      this.paper.toSVG((s) => {
        var l = "QuickSqlDiagram-";
        this.saveDiagram(l, s);
      }, {
        area: e,
        convertImagesToDataUris: !0,
        preserveDimensions: this.paper.getComputedSize()
      });
    });
    I(this, "saveDiagram", (e, s) => {
      function l(b) {
        return b >= 100 ? l(b % 100) : (b < 10 ? "0" : "") + b;
      }
      var o = /* @__PURE__ */ new Date(), d = {
        type: "text/plain;charset=UTF-8",
        name: e + l(o.getFullYear()) + "-" + l(o.getMonth() + 1) + "-" + l(o.getDate()) + "_" + l(o.getHours() + 1) + "-" + l(o.getMinutes()) + ".svg"
      }, T = new Blob([s], { type: d.type }), L = window.URL.createObjectURL(T), R = document.createElement("a");
      document.body.appendChild(R), R.style = "display: none", R.href = L, R.download = d.name, setTimeout(() => {
        R.click(), window.URL.revokeObjectURL(L), R.remove();
      }, 0);
    });
    I(this, "zoomIn", () => {
      this.paperScroller.zoom(0.2, { max: 3 }), this.paperScroller.centerContent();
    });
    I(this, "zoomOut", () => {
      this.paperScroller.zoom(-0.2, { min: 0.1 }), this.paperScroller.centerContent();
    });
    I(this, "fitScreen", () => {
      this.paperScroller.zoomToFit({
        padding: 10,
        scaleGrid: 0.2,
        minScale: 0.1,
        maxScale: 3
      }), this.paperScroller.centerContent();
    });
    I(this, "actualSize", () => {
      this.paperScroller.zoom(1, { absolute: !0 }), this.paperScroller.centerContent();
    });
    I(this, "onMouseWheel", (e, s, l, o) => {
      e.shiftKey && (e.preventDefault(), o === -1 ? this.paperScroller.zoom(-0.2, { min: 0.1 }) : o === 1 && this.paperScroller.zoom(0.2, { max: 3 }), this.paperScroller.centerContent());
    });
    if (!s || !(typeof s == "string" && (this.element = document.querySelector(s))) && !(typeof s == "object" && (this.element = s) && typeof this.element.append == "function"))
      throw new Error("Invalid element or selector provided");
    joint.anchors.columnAnchor = function(l, o, i) {
      let d;
      const { model: T } = l, L = l.getNodeUnrotatedBBox(o), R = T.getBBox().center(), b = T.angle();
      let E = i;
      if (i instanceof Element) {
        const D = this.paper.findView(i);
        E = D ? D.getNodeBBox(i).center() : new joint.g.Point();
      }
      return E.rotate(R, b), d = E.x <= L.x + L.width ? L.leftMiddle() : L.rightMiddle(), d.rotate(R, -b);
    }, this.data = e, this.graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }), this.paper = new joint.dia.Paper({
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
        elementMove: !1
      }
    }), this.paperScroller = new joint.ui.PaperScroller({
      autoResizePaper: !0,
      padding: 50,
      paper: this.paper
    }), this.paper.on("blank:pointerdown", (l, o, i) => {
      this.paperScroller.setCursor("grabbing"), this.paperScroller.startPanning(l, o, i);
    }), this.paper.on("blank:pointerup", () => {
      this.paperScroller.setCursor("default");
    }), this.paper.on("cell:mousewheel", (l, o, i, d, T) => {
      this.onMouseWheel(o, i, d, T);
    }), this.paper.on("blank:mousewheel", (l, o, i, d) => {
      this.onMouseWheel(l, o, i, d);
    }), this.keyboard && this.keyboard.disable(), this.keyboard = new joint.ui.Keyboard(), this.keyboard.on({
      "alt+a": function(l) {
        this.actualSize(), l.preventDefault(), l.stopPropagation();
      },
      "alt+c": function(l) {
        this.paperScroller.centerContent(), l.preventDefault(), l.stopPropagation();
      },
      "alt+f": function(l) {
        this.fitScreen(), l.preventDefault(), l.stopPropagation();
      },
      "alt+p": function(l) {
        this.printDiagram(), l.preventDefault(), l.stopPropagation();
      },
      "alt+s": function(l) {
        this.exportAsSVG(), l.preventDefault(), l.stopPropagation();
      }
    }, this), this.element.append(this.paperScroller.render().el), this.updateDiagram();
  }
  async updateDiagram() {
    var e;
    if ((e = this.data.items) != null && e.length) {
      let s = [];
      this.buildDiagram(s, this.data), this.graph.resetCells(s), this.autoLayout(), setTimeout(() => {
        this.paperScroller.adjustPaper(), this.actualSize();
      }, 100);
    }
  }
  getAllElements() {
    let e = [], s = this.graph.getElements(), l = s.length;
    for (var o = 0; o < l; o++) {
      let i = s[o], d = {};
      d.element = i, d.type = i.attributes.type, d.name = i.attributes.name, d.schema = i.attributes.schema, d.id = i.id, d.pos = { x: i.attributes.position.x, y: i.attributes.position.y }, d.size = { width: i.attributes.size.width, height: i.attributes.size.height }, e.push(d);
    }
    return e;
  }
  getAllLinks() {
    let e = [], s = this.graph.getLinks(), l = s.length;
    for (var o = 0; o < l; o++) {
      let d = s[o];
      if (d.attributes.type === "quicksql.Relation") {
        var i = {};
        i.link = d, i.sourceID = d.attributes.target.id, i.targetID = d.attributes.source.id, i.id = i.targetID.concat("_").concat(i.sourceID), e.push(i);
      }
    }
    return e;
  }
  autoLayout() {
    var e = new se(this);
    e.rearrangeDiagram(3, !1), this.paperScroller.centerContent();
  }
}
const ue = "1.2.1", fe = {
  Diagram: de,
  version: ue
};
export {
  de as Diagram,
  fe as default,
  ue as version
};
