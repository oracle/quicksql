/* eslint-disable no-redeclare, no-unused-vars */
// spell-checker:disable

function TH() {
    var self = this;
    self.referredBy_count = 0;
    self.refer_count = 0;
    self.referredBy = [];
    self.referredByFK = [];
    self.refer = [];
    self.referFK = [];
    self.referredByMap = {};
    self.referMap = {};
    self.arranged = false;
    self.booked = false;
    self.scanned = false;
    self.star = false;
    self.usedInStar = false;
    self.nodes = [];
    self.init_dim = {width: 0, height: 0};
    self.location;
    self.rect;
    self.isScanConnectedToBetterLevel = function (node, level) {
        var rbCount = self.referredBy.length;
        for (var i = 0; i < rbCount; i++) {
            var tht = self.referredBy[i];
            if (tht != node && tht.level < level && !tht.scanned) {
                return true;
            }
        }
        var referCount = self.refer.length;
        for (var r = 0; r < referCount; r++) {
            var tht = self.refer[r];
            if (tht != node && tht.level < level && !tht.scanned) {
                return true;
            }
        }
        return false;
    };
    self.isConnectedToBetterLevel = function (node, level) {
        var rbCount = self.referredBy.length;
        for (var rb = 0; rb < rbCount; rb++) {
            var tht = self.referredBy[rb];
            if (tht != node && tht.level < level && !tht.arranged) {
                return true;
            }
        }
        var rCount = self.refer.length;
        for (var r = 0; r < rCount; r++) {
            var tht = self.refer[r];
            if (tht != node && tht.level < level && !tht.arranged) {
                return true;
            }
        }
        return false;
    };
    self.referOnly = function (tht) {
        var referCount = self.refer.length;
        for (var r = 0; r < referCount; r++) {
            var th = self.refer[r];
            if (th != tht) {
                return false;
            }
        }
        var rbCount = self.referredBy.length;
        for (var rb = 0; rb < rbCount; rb++) {
            var th = self.referredBy[rb];
            if (th != tht) {
                return false;
            }
        }
        return true;
    };
    self.referOnlyAndArranged = function (tht) {
        var referCount = self.refer.length;
        for (var r = 0; r < referCount; r++) {
            var th = self.refer[r];
            if (th != tht && !th.arranged) {
                return false;
            }
        }
        var rbCount = self.referredBy.length;
        for (var rb = 0; rb < rbCount; rb++) {
            var th = self.referredBy[rb];
            if (th != tht && !th.arranged) {
                return false;
            }
        }
        return true;
    };
}

function Rectangle(_x, _y, _width, _height) {
    var self = this;
    self.x = _x;
    self.y = _y;
    self.width = _width;
    self.height = _height;
    self.union = function (rect) {
        var x = Math.min(this.x, rect.x);
        var y = Math.min(this.y, rect.y);
        var w = Math.max(this.x + this.width, rect.x + rect.width);
        var h = Math.max(this.y + this.height, rect.y + rect.height);
        return new Rectangle(x, y, w - x, h - y);
    };
}

function Point(_x, _y) {
    var self = this;
    self.x = _x;
    self.y = _y;
}

function THReferredByComparatorAsc1(th1, th2) {
    if (th1.referredBy_count > th2.referredBy_count) {
        return 1;
    } else if (th1.referredBy_count < th2.referredBy_count) {
        return -1;
    }
    // equal
    if (th1.refer_count < th2.refer_count) {
        return 1;
    } else if (th1.refer_count > th2.refer_count) {
        return -1;
    }
    return 0;
}

function THReferredByComparatorAsc2(th1, th2) {
    if (th1.referredBy_count > th2.referredBy_count) {
        return 1;
    } else if (th1.referredBy_count < th2.referredBy_count) {
        return -1;
    }
    // equal
    if (th1.refer_count > th2.refer_count) {
        return 1;
    } else if (th1.refer_count < th2.refer_count) {
        return -1;
    }
    return 0;
}

function THReferredByComparatorDesc(th1, th2) {
    if (th1.referredBy_count < th2.referredBy_count) {
        return 1;
    } else if (th1.referredBy_count > th2.referredBy_count) {
        return -1;
    }
    // equal
    if (th1.refer_count < th2.refer_count) {
        return 1;
    } else if (th1.refer_count > th2.refer_count) {
        return -1;
    }
    return 0;
}

function THReferComparatorDesc(th1, th2) {
    if (th1.refer_count < th2.refer_count) {
        return 1;
    } else if (th1.refer_count > th2.refer_count) {
        return -1;
    }
    // equal
    if (th1.referredBy_count < th2.referredBy_count) {
        return 1;
    } else if (th1.referredBy_count > th2.referredBy_count) {
        return -1;
    }
    return 0;
}

function THHeightComparatorAsc(th1, th2) {
    if (th1.init_dim.height > th2.init_dim.height) {
        return 1;
    } else if (th1.init_dim.height < th2.init_dim.height) {
        return -1;
    }
    return 0;
}

function THHeightComparatorDesc(th1, th2) {
    if (th1.rect.height < th2.rect.height) {
        return 1;
    } else if (th1.rect.height > th2.rect.height) {
        return -1;
    }
    return 0;
}

function AutoLayout(diagramModel) {
    var self = this;
    var initialLeft = 20;
    var initialTop = 20;
    var left = 20;
    var top = 20;
    var width = 35;
    var height = 25;
    var count = 0;
    var lvers = 1;
    var mixLeftRight = true;
    var dx = 80;
    var dy = 80;
    var gcount = 0;
    //  var refCount = 13;
    var maxWidth = 12000;
    var createdTV = [];
    var fkList = [];
    var roots = [];
    var levelled = 0;
    var arranged = false;
    var thMap = {};
    var startx = 2000;
    var starty = 20;
    /////////////////////////////////////////////////////
    self.rearrangeDiagram = function (version, mix_l_r, pp) {
        lvers = version;
        mixLeftRight = mix_l_r;
        var selected = [];
        if (selected.length > 0) {
            if (pp != null) {
                initialLeft = pp.getX();
                initialTop = pp.getY();
            }
            self.rearrangeT(lvers, false, selected);
        } else {
            initialLeft = 20;
            initialTop = 20;
            self.rearrangeT(lvers, false);
        }
    };
    /////////////////////////////////////////////////////
    self.rearrangeT = function (version, resize, containerViews) {
        left = initialLeft;
        top = initialTop;
        dy = 80;
        dx = 100;
        gcount = 0;
        //   refCount = 10;
        var tables;
        if (containerViews != null && containerViews.length > 0) {
            tables = containerViews;
        } else {
            tables = diagramModel.getAllElements();
        }
        maxWidth = 1000;
        createdTV.length = 0;
        fkList.length = 0;
        var norefs = [];
        var withrefs = [];
        roots = [];
        var realRoots = [];
        var all = self.buildTH_Map(tables, resize);
        var stars = [];
        var allCount = all.length;
        for (var a = 0; a < allCount; a++) {
            var th = all[a];
            if (th.refer_count === 0 && th.referredBy_count === 0) {
                norefs.push(th);
            } else {
                withrefs.push(th);
                if (th.refer.length > 0) {
                    if (version == 1) {
                        th.refer.sort(THReferredByComparatorAsc1);
                    } else if (version == 2) {
                        th.refer.sort(THReferredByComparatorAsc2);
                    } else {
                        th.refer.sort(THReferredByComparatorDesc);
                    }
                }
                if (th.referredBy_count == 0 && !th.usedInStar) {
                    roots.push(th);
                }
                if (th.referredBy.length > 0) {
                    th.referredBy.sort(THReferComparatorDesc);
                }
            }
        }

        // if (useSynonyms) {
        //     stars.addAll(makeSynonyms(withrefs));
        // }
        if (withrefs.length > 0) {
            if (roots.length == 0) {
                self.findRoots(withrefs, roots);
            }
            roots = roots.concat(stars);
            roots.sort(THReferComparatorDesc);
            var x = startx, y = starty;
            for (var i = 0; i < roots.length; i++) {
                var th = roots[i];
                if (!th.arranged && !th.usedInStar) {
                    realRoots.push(th);
                    levelled = 0;
                    arranged = 0;
                    var rect;
                    if (th.star) {
                        rect = self.arrangeStar(th, x, y);
                    } else {
                        self.setLevel2(th, 0);
                        rect = self.arrange(th, x, y, null, null, null);
                    }
                    y = y + rect.height + 2 * dy;
                }
            }
            realRoots.sort(THHeightComparatorDesc);
            self.translateArrangeRoots(realRoots);
            withrefs = withrefs.concat(createdTV);
            self.applyArrange(withrefs);
        }
        self.rearrangeNoneRefTables(norefs);
        self.applyArrange(norefs);
        createdTV.length = 0;
        roots.length = 0;
        for (var prop in thMap) {
            delete thMap[prop];
        }
        fkList.length = 0;
    }
    ;
    /////////////////////////////////////////////////////
    self.buildTH_Map = function (list, resize) {
        for (var prop in thMap) {
            delete thMap[prop];
        }
        var res = [];
        var arrayLength = list.length;
        for (var l = 0; l < arrayLength; l++) {
            var tv = list[l];
            var th = thMap[tv.id];
            if (th === undefined) {
                th = new TH();
                thMap[tv.id] = th;
                th.element = tv.element;
                th.type = tv.type;
                th.name = tv.name;
                th.schema = tv.schema;
                th.id = tv.id;
                th.pos = {x: tv.pos.x, y: tv.pos.y};
                th.size = {width: tv.size.width, height: tv.size.height};
                if (resize) {
                    //                if (th.table instanceof Table) {
                    //                th.init_dim = getTableSize(tv, (Table) th.table);
                    //                } else {
                    //                th.init_dim = getTableViewSize(tv, (TableView) th.table);
                    //                }
                } else {
                    th.init_dim = {width: tv.size.width, height: tv.size.height};
                }
                res.push(th);
            }
        }


        var links = diagramModel.getAllLinks();
        var linksCount = links.length;
        for (var f = 0; f < linksCount; f++) {
            var fk = links[f];
            var remth = thMap[fk.targetID];
            var tabth = thMap[fk.sourceID];
            if (fk.sourceID != fk.targetID && remth != null && tabth != null) {
                var fkObj = {};
                fkObj.link = fk.link;
                fkObj.id = fk.id;
                fkObj.sourceID = fk.sourceID;
                fkObj.targetID = fk.targetID;
                fkList.push(fkObj);
                if (!remth.referredByFK.indexOf(fkObj) >= 0) {
                    remth.referredBy.push(tabth);
                    remth.referredByFK.push(fkObj);
                    remth.referredByMap[fkObj.id] = tabth;
                    remth.referredBy_count++;
                }
                // number of references could be higher than number of
                // tables that reffer it
                if (!tabth.referFK.indexOf(fkObj) >= 0) {
                    tabth.refer.push(remth);
                    tabth.referFK.push(fkObj);
                    tabth.referMap[fkObj.id] = remth;
                    tabth.refer_count++;
                }
                // TODO what about self references
            }
        }

        return res;
    };
    /////////////////////////////////////////////////////
    self.findRoots = function (refs, roots) {
        refs.sort(THReferredByComparatorAsc1);
        var refval = -1;
        if (refs.length > 0) {
            do {
                refval++;
                var refsCount = refs.length;
                for (var i = 0; i < refsCount; i++) {
                    var th = refs[i];
                    if (th.referredBy_count === refval) {
                        roots.push(th);
                    }
                }
            } while (roots.length === 0);
        }
    };
    /////////////////////////////////////////////////////
    self.arrangeStar = function (th, x, y) {
        var rect = new Rectangle(x, y, 1, 1);
        th.nodes.push(th);
        var list = [];
        var rCount = th.referredBy.length;
        for (var i = 0; i < rCount; i++) {
            var tht = th.referredBy[i];
            if (!list.indexOf(tht) >= 0) {
                list.push(tht);
            }
        }
        var referCount = th.refer.length;
        for (var r = 0; r < referCount; r++) {
            var tht = th.refer[r];
            if (!list.indexOf(tht) >= 0) {
                list.push(tht);
            }
        }
        list.sort(THHeightComparatorAsc);
        var w = 0;
        var listCount = list.length;
        for (var l = 0; l < listCount; l++) {
            var tht = list[l];
            w = w + tht.init_dim.width + dx;
        }
        var tx = x;
        var ty = y;
        var xr = x + w / 2;
        var ind = 0;
        var ddy = 0;
        var ddx = x;
        for (var i = list.length - 1; i >= 0; i--) {
            if (tx < xr) {
                ind = i;
                var tht = list[i];
                ddy = Math.max(ddy, tht.init_dim.height);
                ddx = tx + tht.init_dim.width;
                th.nodes.push(tht);
                tht.nodes.push(tht);
                tht.location = new Point(tx, ty);
                tht.rect = new Rectangle(tht.location.x, tht.location.y, tht.init_dim.width, tht.init_dim.height);
                tx = tx + dx + tht.init_dim.width;
                rect = rect.union(tht.rect);
                tht.arranged = true;
            } else {
                break;
            }
        }

        ty = ty + ddy + 2 * dy;
        tx = x + (ddx - x) / 2;
        th.location = new Point(tx, ty);
        th.rect = new Rectangle(th.location.x, th.location.y, th.init_dim.width, th.init_dim.height);
        rect = rect.union(th.rect);
        th.arranged = true;
        ty = ty + th.init_dim.height + 2 * dy;
        tx = x;
        for (var i = ind - 1; i >= 0; i--) {
            var tht = list[i];
            th.nodes.push(tht);
            tht.nodes.push(tht);
            tht.location = new Point(tx, ty);
            tht.rect = new Rectangle(tht.location.x, tht.location.y, tht.init_dim.width, tht.init_dim.height);
            tx = tx + dx + tht.init_dim.width;
            rect = rect.union(tht.rect);
            tht.arranged = true;
        }
        th.rect = rect;
        return rect;
    };
    /////////////////////////////////////////////////////
    self.setLevel2 = function (th, level) {
        if (level <= th.level && !th.scanned) {
            var list1 = [];
            var list2 = [];
            th.level = level;
            th.scanned = true;
            levelled = levelled + 1;
            var referCount = th.refer.length;
            for (var i = 0; i < referCount; i++) {
                var tht = th.refer[i];
                if (tht.level > level + 1 && !tht.scanned && !tht.isScanConnectedToBetterLevel(th, th.level)) {
                    tht.level++;
                    list1.push(tht);
                }
            }
            var rbCount = th.referredBy.length;
            for (var r = 0; r < rbCount; r++) {
                var tht = th.referredBy[r];
                if (tht.level > level + 1 && !tht.scanned && !tht.isScanConnectedToBetterLevel(th, th.level)) {
                    tht.level++;
                    list2.push(tht);
                }
            }
            if (mixLeftRight) {
                var l1Count = list1.length;
                for (var l1 = 0; l1 < l1Count; l1++) {
                    var tht = list1[l1];
                    self.setLevel2(tht, level + 1);
                }
                var l2Count = list2.length;
                for (var l2 = 0; l2 < l2Count; l2++) {
                    var tht = list2[l2];
                    self.setLevel2(tht, level + 1);
                }

            } else {
                for (var i = list1.length - 1; i >= 0; i--) {
                    var tht = list1[i];
                    self.setLevel2(tht, level + 1);
                }
                for (var i = list2.length - 1; i >= 0; i--) {
                    var tht = list2[i];
                    self.setLevel2(tht, level + 1);
                }
            }
        }
    };
    /////////////////////////////////////////////////////
    self.arrange = function (th, x, y, rect, left, allNodes) {
        if (!th.arranged) {
            var res = rect;
            th.location = new Point(x, y);
            th.nodes.push(th);
            if (res === null) {
                res = new Rectangle(th.location.x, th.location.y, th.init_dim.width, th.init_dim.height);
            } else {
                res = res.union(new Rectangle(th.location.x, th.location.y, th.init_dim.width, th.init_dim.height));
            }
            th.arranged = true;
            arranged++;
            gcount++;
            var r;
            var refer = self.getNotArranged(th.refer);
            var referredBy = self.getNotArranged(th.referredBy);
            var bookleft = [];
            if (!mixLeftRight && self.canGoLeft(left, x, y + th.init_dim.height + dy, referredBy)) {
                var rbCount = referredBy.length;
                for (var rb = 0; rb < rbCount; rb++) {
                    var thl = referredBy[rb];
                    if (!thl.arranged && !thl.booked && !thl.isConnectedToBetterLevel(th, th.level)) {
                        thl.booked = true;
                        bookleft.push(thl);
                    }
                }
            }
            var canGoleft = self.canGoLeft(left, x, y + th.init_dim.height + dy, referredBy);
            if (!canGoleft) {
                var blCount = bookleft.length;
                for (var bl = 0; bl < blCount; bl++) {
                    var th1 = bookleft[bl];
                    th1.booked = false;
                }
                bookleft.length = 0;
            }
            if (refer.length > 0) {
                if (mixLeftRight || !canGoleft) {
                    referredBy = referredBy.concat(refer);
                    r = self.orderDown(th, referredBy, x, y + th.init_dim.height + dy, [], th.nodes, left);
                    res = res.union(r);
                } else {
                    if (referredBy.length > 0) {
                        r = self.orderLeft(th, referredBy, x, y + th.init_dim.height + dy, bookleft, th.nodes, left);
                        if (left == null) {
                            left = new Rectangle(r.x, r.y, r.width, r.height);
                        } else {
                            left = left.union(r);
                        }
                        res = res.union(r);
                        r = self.orderDown(th, refer, Math.max(x, r.x + r.width), y + th.init_dim.height + dy, bookleft, th.nodes, left);
                        res = res.union(r);
                    } else {
                        r = self.orderDown(th, refer, x, y + th.init_dim.height + dy, bookleft, th.nodes, left);
                        res = res.union(r);
                    }
                }
            } else if (referredBy.length > 0) {
                if (mixLeftRight || !self.canGoLeft(left, x, y + th.init_dim.height + dy, referredBy)) {
                    referredBy = referredBy.concat(refer);
                    r = self.orderDown(th, referredBy, x, y + th.init_dim.height + dy, [], th.nodes, left);
                    res = res.union(r);
                } else {
                    var tht = referredBy[referredBy.length - 1];
                    r = self.orderLeftCenter(th, referredBy, x + tht.init_dim.width + dx, y + th.init_dim.height + dy, bookleft, th.nodes, left);
                    res = res.union(r);
                }
            }

            th.rect = new Rectangle(res.x, res.y, res.width, res.height);
            if (allNodes != null) {
                var nCount = th.nodes.length;
                for (var n = 0; n < nCount; n++) {
                    var tht = th.nodes[n];
                    if (!(allNodes.indexOf(tht) >= 0)) {
                        allNodes.push(tht);
                    }
                }
            }
            return res;
        }
        return th.rect;
    };
    /////////////////////////////////////////////////////
    self.getNotArranged = function (list) {
        var res = [];
        var count = list.length;
        for (var i = 0; i < count; i++) {
            var th = list[i];
            if (!th.arranged) {
                res.push(th);
            }
        }
        return res;
    };
    /////////////////////////////////////////////////////
    self.canGoLeft = function (left, x, y, list) {
        if (left == null || list.length == 0) {
            return true;
        }
        var count = list.length;
        var width = 0;
        for (var i = 0; i < count; i++) {
            var th = list[i];
            width = width + dx + th.init_dim.width;
        }
        if (y > left.y + left.height || x - width > left.x + width) {
            return true;
        }
        return false;
    };
    /////////////////////////////////////////////////////
    self.orderDown = function (upnode, list, x, y, bookedleft, upNodes, left) {
        var booked = [];
        var lCount = list.length;
        for (var l = 0; l < lCount; l++) {
            var th = list[l];
            if (!th.arranged && !th.booked && !(bookedleft.indexOf(th) >= 0) && !th.isConnectedToBetterLevel(upnode, upnode.level)) {
                th.booked = true;
                booked.push(th);
            }
        }
        var lx = x;
        var ly = y;
        var rect = new Rectangle(x, y, 1, 1);
        var rl;
        if (left === null) {
            rl = null; // new Rectangle(x,y,1,1);
        } else {
            rl = new Rectangle(left.x, left.y, left.width, left.height);
        }
        var temp = [];
        var size = booked.length;
        if (size > 1) {
            var singles = self.getReferOnly(booked, upnode);
            if (singles.length > 0) {
                if (singles.length > 1) {
                    singles.sort(THHeightComparatorAsc);
                }
                var ty = upnode.location.y;
                var dy3 = dy / 3;
                var downy = ty + upnode.init_dim.height + dy3;
                for (var i = 0; i < singles.length; i++) {
                    var th = singles[i];
                    var dwy = ty + th.init_dim.height;
                    if (dwy <= downy) {
                        temp.push(th);
                        var indx = booked.indexOf(th);
                        if (indx > -1) {
                            booked.splice(indx, 1);
                        }
                        ty = dwy + dy3;
                    } else {
                        break;
                    }
                }
                var up = size / 2;
                if (up > 1) {
                    up = 1;
                }
                while (booked.length < up) {
                    booked.push(temp[temp.length - 1]);
                    temp.splice((temp.length - 1), 1);
                }
            }
        }
        size = booked.length;
        for (var i = 0; i < size; i++) {
            var th = booked[i];
            if (size > 1 && i === size - 1 && temp.length === 0) {
                if (temp.length === 0 && th.referOnlyAndArranged(upnode)) {
                    var xx = upnode.location.x + dx + upnode.init_dim.width;
                    var r = self.arrange(th, xx, upnode.location.y, null, rl, upNodes);
                    rect = rect.union(r);
                } else {
                    var xx = Math.max(upnode.location.x + dx + upnode.init_dim.width, rect.x + rect.width + dx);
                    var r = self.arrange(th, xx, upnode.location.y, null, rl, upNodes);
                    rect = rect.union(r);
                }
            }
            var tx = lx; // +th.init_dim.width;
            var r = self.arrange(th, tx, ly, null, rl, upNodes);
            if (rl == null) {
                rl = new Rectangle(r.x, r.y, r.width, r.height);
            } else {
                rl = rl.union(r);
            }
            lx = Math.max(lx, r.x + r.width) + dx;
            rect = rect.union(r);
        }
        var ty = upnode.location.y;
        var dy3 = dy / 3;
        var xx = upnode.location.x + dx + upnode.init_dim.width;
        for (var i = 0; i < temp.length; i++) {
            var th = temp[i];
            th.nodes.push(th);
            if (upNodes != null) {
                upNodes.push(th);
            }
            th.location = new Point(xx, ty);
            th.arranged = true;
            th.booked = false;
            th.rect = new Rectangle(th.location.x, th.location.y, th.init_dim.width, th.init_dim.height);
            rect = rect.union(th.rect);
            ty = ty + th.init_dim.height + dy3;
        }
        return rect;
    };
    /////////////////////////////////////////////////////
    self.getReferOnly = function (listTH, th) {
        var count = listTH.length;
        var list = [];
        for (var i = 0; i < count; i++) {
            var tht = listTH[i];
            if (tht.referOnly(th)) {
                list.push(tht);
            }
        }
        return list;
    };
    /////////////////////////////////////////////////////
    self.orderLeft = function (upnode, list, x, y, bookedleft, upNodes, left) {
        var lx = x - dx;
        var ly = y;
        var rect = new Rectangle(x, y, 1, 1);
        for (var i = list.length - 1; i >= 0; i--) {
            var th = list[i];
            if (!th.arranged && !th.isConnectedToBetterLevel(upnode, upnode.level)) {
                if (!th.booked || (bookedleft.indexOf(th) >= 0)) {
                    var tx = lx - th.init_dim.width;
                    var r = self.arrange(th, tx, ly, null, left, upNodes);
                    lx = Math.min(lx, r.x) - dx;
                    rect = rect.union(r);
                }
            }
        }
        return rect;
    };
    /////////////////////////////////////////////////////
    self.orderLeftCenter = function (upnode, list, x, y, bookedleft, upNodes, left) {
        var lx = x - dx;
        var ly = y;
        var tlist = [];
        var rect = new Rectangle(x, y, 1, 1);
        for (var i = list.length - 1; i >= 0; i--) {
            var th = list[i];
            if (!th.arranged && !th.isConnectedToBetterLevel(upnode, upnode.level)) {
                if (!th.booked || (bookedleft.indexOf(th) >= 0)) {
                    tlist.unshift(th);
                }
            }
        }
        if (tlist.length > 1) {
            var w = 0;
            for (var i = 0; i < tlist.length - 1; i++) {
                var th = tlist[i];
                w = w + dx + th.init_dim.width;
            }
            lx = x + w / 2 - dx;
        }
        for (var i = tlist.length - 1; i >= 0; i--) {
            var th = tlist[i];
            if (!th.arranged && !th.isConnectedToBetterLevel(upnode, upnode.level)) {
                if (!th.booked || (bookedleft.indexOf(th) >= 0)) {
                    var tx = lx - th.init_dim.width;
                    var r = self.arrange(th, tx, ly, null, left, upNodes);
                    lx = Math.min(lx, r.x) - dx;
                    rect = rect.union(r);
                }
            }
        }
        return rect;
    };
    /////////////////////////////////////////////////////
    self.rearrangeNoneRefTables = function (nonRefs) {
        left = initialLeft;
        width = 35;
        height = 50;
        count = 0;
        var square = Math.sqrt(nonRefs.length);
        var maxTablePerRow = Math.round(square);
        if (Math.sqrt(square * square) != square) {
            maxTablePerRow++;
        }

        // Temporary
        maxTablePerRow++;
        var nrCount = nonRefs.length;
        for (var i = 0; i < nrCount; i++) {
            var th = nonRefs[i];
            count++;
            var dim = th.init_dim;
            width = dim.width;
            height = Math.max(dim.height, height);
            th.location = new Point(left, top);
            th.arranged = true;
            left = left + width + 50;
            if (count == maxTablePerRow) {
                count = 0;
                left = initialLeft;
                top = top + height + 150;
                height = 25;
            }
        }
    };
    /////////////////////////////////////////////////////
    self.translateArrangeRoots = function (listTH) {
        left = initialLeft;
        top = initialTop;
        var h = 0;
        var max = self.getRootsMaxWidth(listTH) + left + 5;
        var count = listTH.length;
        for (var i = 0; i < count; i++) {
            var th = listTH[i];
            var r = th.rect;
            if (left + r.width > max) {
                left = initialLeft;
                top = top + h + 2 * dy;
                h = 0;
            }
            h = Math.max(r.height, h);
            var tx = left - r.x;
            var ty = top - r.y;
            var count2 = th.nodes.length;
            for (var c = 0; c < count2; c++) {
                var tht = th.nodes[c];
                tht.location.x = tx + tht.location.x;
                tht.location.y = ty + tht.location.y;
            }
            left = left + r.width + 2 * dx;
        }
        top = top + h + 3 * dy;
        left = initialLeft;
    };
    /////////////////////////////////////////////////////
    self.getRootsMaxWidth = function (listTH) {
        var max = maxWidth;
        var count = listTH.length;
        for (var i = 0; i < count; i++) {
            var th = listTH[i];
            if (max < th.rect.width) {
                max = th.rect.width;
            }
        }
        return max;
    };
    /////////////////////////////////////////////////////
    self.applyArrange = function (list) {
        var count = list.length;
        for (var i = 0; i < count; i++) {
            var th = list[i];
            if (th.arranged) {
                th.element.position(th.location.x, th.location.y);
            }
        }
    };
} // END

export default AutoLayout;