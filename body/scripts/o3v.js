function getHttpRequest(t, e, i) {
    var o = createCORSRequest("GET", t);
    o.onload = function (t) {
        //console.log('onload json : '+o);
        //console.log('onload json : '+t);
        e(o, t);
    },
    i && (o.onprogress = function (t) {
        i(o, t)
    }),
    o.send(null)
}
function createCORSRequest(t, e) {
    var i = new XMLHttpRequest;
    return "withCredentials" in i ? i.open(t, e, !0) : "undefined" != typeof XDomainRequest ? (i = new XDomainRequest, i.open(t, e)) : i = null,
    i
}
function Annotator() {
    this.tates = [],
    this.vertexBuffer = null,
    this.target = null,
    this.doLock = !0,
    this.x = 0
}
o3v.LOG_NONE = 0,
o3v.LOG_ERROR = 1,
o3v.LOG_WARNING = 2,
o3v.LOG_INFO = 3,
o3v.LOG_LEVEL = o3v.LOG_INFO,
o3v.log = {
    info: function () {
        if (o3v.LOG_LEVEL >= o3v.LOG_INFO && void 0 !== window.console) {
            for (var t = ["INFO: "], e = 0; e < arguments.length; e++) t[e + 1] = arguments[e];
            window.console.log.apply(window.console, t)
        }
    },
    warning: function () {
        if (o3v.LOG_LEVEL >= o3v.LOG_WARNING && void 0 !== window.console) {
            for (var t = ["WARNING: "], e = 0; e < arguments.length; e++) t[e + 1] = arguments[e];
            window.console.log.apply(window.console, t)
        }
    },
    error: function () {
        if (o3v.LOG_LEVEL >= o3v.LOG_ERROR && void 0 !== window.console) {
            for (var t = ["ERROR: "], e = 0; e < arguments.length; e++) t[e + 1] = arguments[e];
            window.console.log.apply(window.console, t)
        }
    }
},
o3v.uiSettings = {
    ZINDEX_VIEWER: 0,
    ZINDEX_MAINUI_STATUS_LOWER: 1,
    ZINDEX_MAINUI_STATUS_UPPER: 2,
    ZINDEX_MAINUI: 3
};
var HANDEDNESS_ = {
    LEFT: 0,
    RIGHT: 1
};
o3v.growBBox = function (t, e) {
    return void 0 === t ? e.slice(0) : (t[0] > e[0] && (t[0] = e[0]), t[1] > e[1] && (t[1] = e[1]), t[2] > e[2] && (t[2] = e[2]), t[3] < e[3] && (t[3] = e[3]), t[4] < e[4] && (t[4] = e[4]), t[5] < e[5] && (t[5] = e[5]), t)
},
o3v.util = {},
o3v.util.isEmpty = function (t) {
    return 0 === Object.keys(t).length
},
o3v.util.isArray = function (t) {
    return "[object Array]" === Object.prototype.toString.call(t)
},
o3v.util.cloneObject = function (t) {
    return $.extend({}, t)
},
o3v.util.extendObject = function (t, e) {
    return $.extend(t, e)
},
o3v.util.objectContains = function (t, e) {
    for (var i in t) if (t[i] == e) return !0;
    return !1
},
o3v.util.getObjectCount = function (t) {
    return Object.keys(t).length
},
o3v.util.forEach = function (t, e, i) {
    for (var o in t) e.call(i, t[o], o, t)
},
o3v.util.createSet = function (t) {
    var e = arguments.length;
    if (1 == e && o3v.util.isArray(arguments[0])) return o3v.util.createSet.apply(null, arguments[0]);
    for (var i = {}, o = 0; o < e; o++) i[arguments[o]] = !0;
    return i
},
o3v.util.setIfUndefined = function (t, e, i) {
    return e in t ? t[e] : t[e] = i
},
o3v.util.isDef = function (t) {
    return void 0 !== t
},
goog = {},
goog.math = {},
goog.math.Bezier = function (t, e, i, o, n, s, a, r) {
    this.x0 = t,
    this.y0 = e,
    this.x1 = i,
    this.y1 = o,
    this.x2 = n,
    this.y2 = s,
    this.x3 = a,
    this.y3 = r
},
goog.math.Bezier.KAPPA = 4 * (Math.sqrt(2) - 1) / 3,
goog.math.Bezier.prototype.clone = function () {
    return new goog.math.Bezier(this.x0, this.y0, this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
},
goog.math.Bezier.prototype.equals = function (t) {
    return this.x0 == t.x0 && this.y0 == t.y0 && this.x1 == t.x1 && this.y1 == t.y1 && this.x2 == t.x2 && this.y2 == t.y2 && this.x3 == t.x3 && this.y3 == t.y3
},
goog.math.Bezier.prototype.flip = function () {
    var t = this.x0;
    this.x0 = this.x3,
    this.x3 = t,
    t = this.y0,
    this.y0 = this.y3,
    this.y3 = t,
    t = this.x1,
    this.x1 = this.x2,
    this.x2 = t,
    t = this.y1,
    this.y1 = this.y2,
    this.y2 = t
},
goog.math.Bezier.prototype.getPoint = function (t) {
    if (0 == t) return new goog.math.Coordinate(this.x0, this.y0);
    if (1 == t) return new goog.math.Coordinate(this.x3, this.y3);
    var e = goog.math.lerp(this.x0, this.x1, t),
        i = goog.math.lerp(this.y0, this.y1, t),
        o = goog.math.lerp(this.x1, this.x2, t),
        n = goog.math.lerp(this.y1, this.y2, t),
        s = goog.math.lerp(this.x2, this.x3, t),
        a = goog.math.lerp(this.y2, this.y3, t);
    return e = goog.math.lerp(e, o, t),
    i = goog.math.lerp(i, n, t),
    o = goog.math.lerp(o, s, t),
    n = goog.math.lerp(n, a, t),
    new goog.math.Coordinate(goog.math.lerp(e, o, t), goog.math.lerp(i, n, t))
},
goog.math.Bezier.prototype.subdivideLeft = function (t) {
    if (1 != t) {
        var e = goog.math.lerp(this.x0, this.x1, t),
            i = goog.math.lerp(this.y0, this.y1, t),
            o = goog.math.lerp(this.x1, this.x2, t),
            n = goog.math.lerp(this.y1, this.y2, t),
            s = goog.math.lerp(this.x2, this.x3, t),
            a = goog.math.lerp(this.y2, this.y3, t);
        this.x1 = e,
        this.y1 = i,
        e = goog.math.lerp(e, o, t),
        i = goog.math.lerp(i, n, t),
        o = goog.math.lerp(o, s, t),
        n = goog.math.lerp(n, a, t),
        this.x2 = e,
        this.y2 = i,
        this.x3 = goog.math.lerp(e, o, t),
        this.y3 = goog.math.lerp(i, n, t)
    }
},
goog.math.Bezier.prototype.subdivideRight = function (t) {
    this.flip(),
    this.subdivideLeft(1 - t),
    this.flip()
},
goog.math.Bezier.prototype.subdivide = function (t, e) {
    this.subdivideRight(t),
    this.subdivideLeft((e - t) / (1 - t))
},
goog.math.Bezier.prototype.solvePositionFromXValue = function (t) {
    var e = (t - this.x0) / (this.x3 - this.x0);
    if (e <= 0) return 0;
    if (e >= 1) return 1;
    for (var i = 0, o = 1, n = 0; n < 8; n++) {
        var s = this.getPoint(e).x,
            a = (this.getPoint(e + 1e-6).x - s) / 1e-6;
        if (Math.abs(s - t) < 1e-6) return e;
        if (Math.abs(a) < 1e-6) break;
        s < t ? i = e : o = e,
        e -= (s - t) / a
    }
    for (var n = 0; Math.abs(s - t) > 1e-6 && n < 8; n++) s < t ? (i = e, e = (e + o) / 2) : (o = e, e = (e + i) / 2),
    s = this.getPoint(e).x;
    return e
},
goog.math.Bezier.prototype.solveYValueFromXValue = function (t) {
    return this.getPoint(this.solvePositionFromXValue(t)).y
},
goog.math.Coordinate = function (t, e) {
    this.x = o3v.util.isDef(t) ? t : 0,
    this.y = o3v.util.isDef(e) ? e : 0
},
goog.math.Coordinate.prototype.clone = function () {
    return new goog.math.Coordinate(this.x, this.y)
},
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")"
}),
goog.math.Coordinate.equals = function (t, e) {
    return t == e || !(!t || !e) && (t.x == e.x && t.y == e.y)
},
goog.math.Coordinate.distance = function (t, e) {
    var i = t.x - e.x,
        o = t.y - e.y;
    return Math.sqrt(i * i + o * o)
},
goog.math.Coordinate.squaredDistance = function (t, e) {
    var i = t.x - e.x,
        o = t.y - e.y;
    return i * i + o * o
},
goog.math.Coordinate.difference = function (t, e) {
    return new goog.math.Coordinate(t.x - e.x, t.y - e.y)
},
goog.math.Coordinate.sum = function (t, e) {
    return new goog.math.Coordinate(t.x + e.x, t.y + e.y)
},
goog.math.lerp = function (t, e, i) {
    return t + i * (e - t)
},
window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function (t, e) {
    window.setTimeout(t, 16)
};
var zg = {};
zg.id = 1,
zg.PushButton = function (t, e, i, o) {
    var n = {
        position: "relative",
        width: "100px"
    };
    return void 0 == o && (o = "body", n = {
        position: "absolute",
        width: "100px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }),
    $("<div>").appendTo(o).css(n).css(e).button(t).click(i)
},
zg.CheckBox = function (t, e, i) {
    var o = {
        position: "absolute",
        width: "100px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    },
        n = "check" + this.id++,
        s = $("<input type='checkbox' id='" + n + "' />").appendTo("body"),
        a = $("<label for='" + n + "'>" + t.label + "</label>").appendTo("body");
    return s.css(o).css(e).button(t).click(i),
    a.css(o).css(e),
    s
},
zg.RadioButtons = function (t, e, i, o, n) {
    var s = {
        position: "relative",
        width: "50%"
    };
    void 0 == n && (n = "body", s = {
        position: "absolute",
        width: "100px",
        padding: "0",
        margin: "0",
        border: "0",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    });
    for (var a = "radio" + this.id++, r = $("<span id='" + a + "' />").appendTo(n), h = 0; h < t.length; h++) {
        var l = a + "item" + h,
            d = "";
        0 == h && (d = "checked='checked'");
        var c = ($("<input name='" + a + "' type='radio' id='" + l + "' " + d + " value='" + h + "' />").appendTo("#" + a), $("<label id='l" + l + "' for='" + l + "'>" + t[h].label + "</label>").appendTo("#" + a));
        t[h].css && c.css(t[h].css)
    }
    return r.css(s).css(i).buttonset(e).click(o),
    r
},
zg.Menu = function (t, e, i, o, n) {
    for (var s = {
        position: t,
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }, a = "menu" + this.id++, r = $("<ul id='" + a + "' />").appendTo(e), h = 0; h < i.length; h++) {
        var l = i[h];
        if (l instanceof Object) for (var d = $("<li><a href='#'>" + l.label + "</a></li>").appendTo("#" + a), c = $("<ul class='zgsubmenu' ></li>").appendTo(d), u = 0; u < l.values.length; u++) {
            $("<li><a href='#'>" + l.values[u] + "</a></li>").appendTo(c)
        } else var d = $("<li><a href='#'>" + l + "</a></li>").appendTo("#" + a)
    }
    return r.css(s).css(o).menu({
        select: n
    }),
    r
},
zg.List = function (t, e, i, o, n) {
    var s = {
        position: "relative",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    };
    void 0 == o && (o = "body", s = {
        position: "absolute",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    });
    var a = "selectable" + this.id++,
        r = $("<ol class='my-selectable' id='" + a + "' />").appendTo(o);
    r.css(s).css(e).selectable({
            stop: i
        });
    for (var h = 0; h < t.length; h++) {
            var l = t[h];
            $("<li class='ui-widget-content' >" + l + "</li>").css({
                margin: "3px 0px",
                padding: "0.4em",
                height: "15px",
                "list-style-type": "none"
            }).appendTo(r)
        }
    return r
},
zg.ListAdd = function (t, e, i) {
    t.css({
        margin: "0",
        padding: 0
    });
    var o = $("<li class='ui-widget-content' >" + e + "</li>").css({
        margin: "3px 0px",
        padding: "0.4em",
        height: "15px",
        "list-style-type": "none"
    }).appendTo(t);
    if (i) var n = $("<div>").appendTo(o).css({
        position: "absolute",
        right: "5px",
        height: "0px"
    }),
        s = $("<button type='button'>").appendTo(n).css({
            top: "-18px",
            right: "-3px",
            width: "22px",
            height: "22px"
        }).button({
            icons: {
                primary: "ui-icon-trash"
            },
            text: !1
        }).click(function () {
            i(o, s)
        })
},
zg.ListClear = function (t) {
    $(".ui-widget-content", t).each(function () {
        $(this).remove()
    })
},
zg.Accordion = function () {
    this.sections = []
},
zg.Accordion.prototype.AddSection = function (t, e) {
    var i = {};
    i.label = t,
    i.movie = e,
    this.sections.push(i)
},
zg.Accordion.prototype.Create = function (t, e) {
    if(true) return;
    for (var i = {
        position: "absolute",
        width: "260px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }, o = "accordion" + zg.id++, n = $("<div id='" + o + "' />").appendTo(t), s = 0; s < this.sections.length; s++) {
        var a = this.sections[s],
            r = $("<div></div>").appendTo("#" + o);
        $("<span>" + a.label + "</span>").appendTo(r),
        $("<span><input type='button' class='videoicon' style='cursor: pointer; border-style:none; background-color:transparent;' onclick=\"window.open('" + a.movie + "', '_blank');\" /></span>").appendTo(r).css({
                position: "absolute",
                right: "4px",
                top: "4px"
            });
        var h = "div" + zg.id++,
            l = $("<div id='" + h + "'/>").appendTo("#" + o);
        this.sections[s].divId = h,
        this.sections[s].div = l
    }
    n.css(i).css(e).accordion({
        heightStyle: "content",
        collapsible: !0,
        active: !1
    });
    $('<div id="zygote-ads" style="margin-top:20px; width:100%; display:none;"></div>').appendTo("#" + o);
    this.widget = n
},
zg.SetDialogColor = function (t) {
    var e;
    document.all ? e = "rules" : document.getElementById && (e = "cssRules");
    for (var i = 0; i < document.styleSheets.length; i++) for (var o = 0; o < document.styleSheets[i][e].length; o++)".ui-dialog" == document.styleSheets[i][e][o].selectorText && (document.styleSheets[i][e][o].style.backgroundColor = t)
},
zg.Slider = function (t, e, i, o) {
    var n = {
        position: "relative",
        width: "100px"
    };
    return void 0 == o && (o = "body", n = {
        position: "absolute",
        width: "100px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }),
    $("<div>").appendTo(o).css(n).css(e).slider(t).on("slide", i)
},
zg.Label = function (t, e, i, o) {
    var n = {
        position: "relative",
        width: "100px"
    };
    return void 0 == o && (o = "body", n = {
        position: "absolute",
        width: "100px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }),
    $("<span>" + t.label + "</span>").appendTo(o).css(n).css(e)
},
zg.Quizridget = function (t, e, i, o) {
    var n = {
        position: "relative",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    };
    void 0 == o && (o = "body", n = {
        position: "absolute",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    });
    var s = "selectable" + this.id++,
        a = $("<ol class='my-selectable' id='" + s + "' />").appendTo(o);
    a.css(n).css(e).selectable({
            stop: i
        });
    for (var r = 0; r < t.length; r++) {
            var h = t[r];
            $("<li class='ui-widget-content' >" + h + "</li>").appendTo(a)
        }
    return a
},
zg.save = function (t, e) {
    var i = {};
    zg.writeHeader(i),
    zg.writeCamera(i),
    zg.writeSelection(i),
    zg.writeModel(i),
    viewer_.annotator.write(i),
    zg.account.saveFile(t, JSON.stringify(i), e)
},
zg.writeHeader = function (t) {
    var e = {};
    e.version = 1,
    t.header = e
},
zg.writeModel = function (t) {
    var e = {};
    e.id = viewer_.contentManager_.modelId(),
    e.layers = viewer_.layersUI_.getState2(),
    e.hiddens = [],
    e.showns = [];
    for (var i = viewer_.contentManager_.metadata_, o = i.layerNames_, n = 0; n < o.length; n++) {
        var s = o[n],
            a = i.layerNameToId_[s];
        zg.writeHiddens(i, a, !1, e.hiddens, e.showns)
    }
    t.model = e
},
zg.writeHiddens = function (t, e, i, o, n) {
    var s = viewer_.contentManager_.metadata_.entities_[e];
    void 0 != s.ammHidden && s.ammHidden != i && (i ? n.push(s.externalId) : o.push(s.externalId), i = s.ammHidden);
    var a = s.childIds;
    for (var r in a) zg.writeHiddens(t, r, i, o, n)
},
zg.writeCamera = function (t) {
    var e = {};
    e.nav = viewer_.navigator_.getState(),
    t.camera = e
},
zg.writeSelection = function (t) {
    var e = {};
    e.state = viewer_.select_.getStateExtId(),
    t.selection = e
},
zg.writePins = function (t) {
    var e = [],
        i = viewer_.select_.getPinned();
    o3v.util.forEach(i, function (t, i) {
            e.push({
                id: t.externalId
            })
        }),
    t.pins = e
},
zg.load = function (t) {
    viewer_.select_.clearSelection(),
    viewer_.select_.clearPinned(!0),
    zg.account.loadFile(t, zg.loadCallback),
    viewer_.annotator.deleteAll()
},
zg.loadCallback = function (t) {
    t = jQuery.parseJSON(t.data);
    var e = new zg.Loader(t);
    t.model.id != viewer_.contentManager_.modelId() ? viewer_.loadModel(t.model.id, e.onModelLoaded.bind(e)) : (e.onModelLoaded(), viewer_.navUI_.heirachyUI())
},
zg.Loader = function (t) {
    this.json_ = t
},
zg.Loader.prototype.onModelLoaded = function () {
    this.handle(this.json_)
},
zg.Loader.prototype.handle = function (t) {
    for (var e in t) if ("model" == e) this.handleModel(t[e]);
    else if ("camera" == e) this.handleCamera(t[e]);
    else if ("selection" == e) this.handleSelection(t[e]);
    else if ("annotator" == e) viewer_.annotator.read(t[e]);
    else if ("pins" == e) {
        for (var i = t[e], o = [], n = 0; n < i.length; n++) {
            var s = i[n].id,
                a = viewer_.contentManager_.metadata_.externalIdToId(s);
            o.push(a)
        }
        viewer_.select_.pinMultiple(o)
    }
},
zg.Loader.prototype.handleModel = function (t) {
    var e = [],
        i = [];
    for (var o in t)"layers" == o ? viewer_.layersUI_.restoreState("," + t[o]) : "hiddens" == o ? e = t[o] : "showns" == o && (i = t[o]);
    var n = viewer_.contentManager_.metadata_,
        s = n.layerNames_;
    o3v.log.info("layerCount " + s.length);
    for (var a = 0; a < s.length; a++) {
            var r = s[a],
                h = n.layerNameToId_[r],
                l = !0;
            e.indexOf(r) >= 0 && (l = !1),
            o3v.log.info("layer " + a + ", " + r),
            this.recurseHS(n, h, l, e, i)
        }
},
zg.Loader.prototype.recurseHS = function (t, e, i, o, n) {
    var s = t.entities_[e];
    o.indexOf(s.externalId) >= 0 && (i = !1),
    n.indexOf(s.externalId) >= 0 && (i = !0),
    s.ammHidden = !i;
    var a = s.childIds;
    for (var r in a) this.recurseHS(t, r, i, o, n)
},
zg.Loader.prototype.handleCamera = function (t) {
    for (var e in t)"nav" == e && viewer_.navigator_.restoreState(t[e])
},
zg.Loader.prototype.handleSelection = function (t) {
    for (var e in t)"state" == e && viewer_.select_.restoreStateExtId(t[e])
},
o3v.EntityMetadata = function (t) {
    this.log_ = o3v.log,
    this.entities_ = {},
    this.externalIdToId_ = {},
    this.layers_ = {},
    this.layerNameToId_ = {},
    this.sublayers_ = {},
    this.sublayers2_ = {},
    this.hasSublayers2_ = !1,
    this.forceTransparent_ = [],
    this.symmetries_ = {},
    this.hidden_ = {},
    this.loadEntities_(t),
    this.loadDag_(t),
    this.loadLayers_(t)
    //this.log_.info("loaded entity metadata: ", t)
},
o3v.makeName = function (t) {
    return t.replace(/_/g, " ").replace(/^r /, "").replace(/^l /, "")
},
o3v.EntityMetadata.prototype.loadEntities_ = function (t) {
    t.leafs.forEach(function (t) {
        this.loadEntity_(t, !0)
    }, this),
    t.nodes.forEach(function (t) {
        this.loadEntity_(t, !1)
    }, this),
    t.hidden.forEach(function (t) {
        this.hidden_[t] = !0
    }, this),
    t.symmetries.forEach(this.computeSymmetryObject_, this),
    this.entitiesWithOverriddenNames_ = {}
},
o3v.EntityMetadata.prototype.loadEntity_ = function (t, e) {
    var i = +t[0],
        o = "" + t[1],
        n = [o3v.makeName(o)],
        s = {};
    s.externalId = o,
    s.names = n,
    s.nameIds = [o],
    s.parentIds = {},
    "r_conjunctiva" != o && "cornea" != o && "lens" != o || this.forceTransparent_.push(i),
    this.entities_[i] = s,
    e && (this.externalIdToId_[o] = i)
},
o3v.EntityMetadata.prototype.loadDag_ = function (t) {
    t.dag.forEach(function (t) {
        var e = t[0],
            i = t[1];
        this.entities_[e].childIds = o3v.util.createSet(i),
        i.forEach(function (t) {
                this.entities_[t].parentIds[e] = !0
            }, this)
    }, this)
},
o3v.EntityMetadata.prototype.loadLayers_ = function (t) {
    t.layers.forEach(function (t) {
        this.layers_[t] = !0,
        this.layerNameToId_[this.getEntity(t).name] = t
    }, this);
    var e = {},
        i = {};
    t.sublayers.forEach(function (t) {
            var i = t[0],
                o = t[1],
                n = [];
            o.forEach(function (t) {
                    var i = t[0],
                        o = t[1];
                    n[i] = [],
                    o.forEach(function (t) {
                            n[i].push(t),
                            e[t] = !0
                        }, this)
                }, this),
            this.sublayers_[i] = n
        }, this),
    this.hasSublayers2_ = !1,
    "sublayers2" in t && (this.hasSublayers2_ = !0, t.sublayers2.forEach(function (t) {
            var e = t[0],
                o = t[1],
                n = [],
                s = 0;
            o.forEach(function (t) {
                    var e = t;
                    n[s] = [],
                    e.forEach(function (t) {
                        n[s].push(t),
                        i[t] = !0
                    }, this),
                    s++
                }, this),
            this.sublayers2_[e] = n
        }, this)),
    o3v.util.forEach(this.sublayers_, function (t) {
            for (var e = 0; e < t.length; e++) void 0 === t[e] && (t[e] = [])
        }, this),
    o3v.util.forEach(this.sublayers2_, function (t) {
            for (var e = 0; e < t.length; e++) void 0 === t[e] && (t[e] = [])
        }, this),
    o3v.util.forEach(this.layers_, function (t, e) {
            void 0 === this.sublayers_[e] && (this.sublayers_[e] = []);
            var i = this.sublayers_[e];
            i[i.length] = []
        }, this),
    o3v.util.forEach(this.layers_, function (t, e) {
            void 0 === this.sublayers2_[e] && (this.sublayers2_[e] = []);
            var i = this.sublayers2_[e];
            i[i.length] = []
        }, this),
    o3v.util.forEach(this.entities_, function (t, o) {
            if (void 0 === e[o] && void 0 === t.childIds) {
                var n = this.getLayerId(o);
                if (n) {
                    var s = this.sublayers_[n];
                    s[s.length - 1].push(parseInt(o))
                } else this.log_.warning("Failed to find layer for leaf entity ", o, " ", t.names[0])
            }
            if (void 0 === i[o] && void 0 === t.childIds) {
                var n = this.getLayerId(o);
                if (n) {
                    var s = this.sublayers2_[n];
                    s[s.length - 1].push(parseInt(o))
                } else this.log_.warning("Failed to find layer for leaf entity ", o, " ", t.names[0])
            }
        }, this)
},
o3v.EntityMetadata.prototype.getLayerId = function (t) {
    var e = this.entities_[t],
        i = 0;
    return o3v.util.forEach(e.parentIds, function (t, e) {
            if (void 0 !== this.layers_[e]) i = e;
            else {
                var o = this.getLayerId(e);
                0 != o && (i = o)
            }
        }, this),
    i
},
o3v.EntityMetadata.prototype.externalIdToId = function (t) {
    return this.externalIdToId_[t.toLowerCase()]
},
o3v.EntityMetadata.prototype.getEntity = function (t) {
    return this.entities_[t]
},
o3v.EntityMetadata.prototype.getLayers = function () {
    return this.layers_
},
o3v.EntityMetadata.prototype.getSublayers = function () {
    return this.sublayers_
},
o3v.EntityMetadata.prototype.getSublayers2 = function () {
    return this.sublayers2_
},
o3v.EntityMetadata.prototype.hasSublayers2 = function () {
    return this.hasSublayers2_
},
o3v.EntityMetadata.prototype.getForceTransparent = function () {
    return this.forceTransparent_
},
o3v.EntityMetadata.prototype.getSymmetries = function () {
    return this.symmetries_
},
o3v.EntityMetadata.prototype.getHidden = function () {
    return this.hidden_
},
o3v.EntityMetadata.prototype.computeSymmetryObject_ = function (t) {
    var e = t[0],
        i = {};
    i.childIds = [],
    i.childIds[HANDEDNESS_.LEFT] = t[1],
    i.childIds[HANDEDNESS_.RIGHT] = t[2],
    i.singularName = o3v.makeName("" + t[3]),
    this.symmetries_[e] = i
},
o3v.EntityMetadata.prototype.computeName_ = function (t) {
    var e = +t[0],
        i = t[1];
    this.entitiesWithOverriddenNames_[e] ? this.entities_[e].names.push(i) : (this.entities_[e].names = [i], this.entitiesWithOverriddenNames_[e] = !0)
},
o3v.EntityModel = function (t, e) {
    this.log_ = o3v.log,
    this.entities_ = {},
    this.externalIdToId_ = {},
    this.searchToEntityIds_ = {},
    this.searchMatcher_ = null,
    this.rootId_,
    this.layerNames_ = [],
    this.layerNameToId_ = {},
    this.unselectable_ = o3v.util.cloneObject(e.getHidden()),
    this.loadLeafEntities_(t, e),
    this.nonSearchableEntityIds_ = o3v.util.cloneObject(e.getHidden()),
    this.computeDagAndSymmetries_(e),
    this.computeRoot_(),
    this.computeSplits_(),
    this.computeLayers_(e),
    this.computeSearches_(e),
    this.sublayers_ = this.loadSublayers_(e.getSublayers()),
    this.sublayers2_ = e.getSublayers2(),
    this.hasSublayers2_ = e.hasSublayers2_,
    this.forceTransparent_ = e.forceTransparent_,
    this.ammHidden = !1
},
o3v.EntityModel.MAX_SPLIT_COUNT_ = 25,
o3v.EntityModel.prototype.loadSublayers_ = function (t) {
    var e = {};
    return o3v.util.forEach(t, function (t, i) {
        e[i] = [],
        t.forEach(function (t) {
            e[i][e[i].length] = [],
            t.forEach(function (t) {
                void 0 !== this.entities_[t] && e[i][e[i].length - 1].push(t)
            }, this)
        }, this)
    }, this),
    e
},
o3v.EntityModel.prototype.loadLeafEntities_ = function (t, e) {
    for (var i in t.urls) for (var o = t.urls[i].length, n = 0; n < o; ++n) t.urls[i][n].names.forEach(function (t) {
        var i = e.externalIdToId(t),
            o = e.getEntity(i);
        if (i) {
                var n = {};
                n.name = o.names[0],
                n.externalId = t,
                n.parentIds = o.parentIds,
                this.entities_[i] = n,
                this.externalIdToId_[t] = i
            } else this.log_.error("Missing leaf geometry ", t, " in metadata.")
    }, this)
},
o3v.EntityModel.prototype.computeDagAndSymmetries_ = function (t) {
    var e = t.getSymmetries(),
        i = {};
    o3v.util.forEach(e, function (t, e) {
            o3v.util.forEach(HANDEDNESS_, function (e) {
                var o = t.childIds[e];
                this.nonSearchableEntityIds_[o] = !0,
                i[o] = e
            }, this)
        }, this);
    for (var o = Object.keys(this.entities_).map(function (t) {
            return +t
        }); o.length;) {
            var n = o.shift(),
                s = this.entities_[n],
                a = {};
            for (var r in s.parentIds) {
                    if (r = +r, !this.entities_[r]) {
                        var h = t.getEntity(r),
                            l = {};
                        if (l.name = h.names[0], l.externalId = h.nameIds[0], l.parentIds = h.parentIds, l.childIds = o3v.util.createSet(), this.entities_[r] = l, e[r]) {
                                var d = e[r];
                                o3v.util.forEach(HANDEDNESS_, function (t) {
                                    var e = d.childIds[t],
                                        i = {};
                                    i.name = d.singularName,
                                    i.parentIds = o3v.util.createSet(),
                                    i.parentIds[r] = !0,
                                    i.childIds = o3v.util.createSet(),
                                    l.childIds[e] = !0,
                                    this.entities_[e] = i,
                                    o.push(e)
                                }, this)
                            }
                        o.push(r)
                    }
                    var l = this.entities_[r];
                    if (e[r] && !l.childIds[n]) if (e[n]) {
                        var c = e[r],
                            u = e[n];
                        a[r] = !0,
                        l.childIds[n] = !0,
                        o3v.util.forEach(HANDEDNESS_, function (t) {
                                var e = c.childIds[t],
                                    i = u.childIds[t],
                                    o = this.entities_[e],
                                    n = this.entities_[i];
                                o.childIds[i] = !0,
                                n.parentIds[e] = !0
                            }, this)
                    } else {
                        var p = function (t, e) {
                            return o3v.util.objectContains(i, t) ? i[t] : e.externalId && e.externalId.match(/^l_/i) ? HANDEDNESS_.LEFT : e.externalId && e.externalId.match(/^r_/i) ? HANDEDNESS_.RIGHT : void this.log_.error("paired entity of unknown handedness ", t, " ", e.name)
                        }(n, s),
                            d = e[r],
                            v = d.childIds[p],
                            _ = this.entities_[v];
                        _ ? (_.childIds[n] = !0, a[v] = !0) : this.log_.error("no subparent for ", l.name, " -> ", s.name)
                    } else l.childIds && (l.childIds[n] = !0),
                    a[r] = !0
                }
            s.parentIds = a
        }
},
o3v.EntityModel.prototype.computeRoot_ = function () {
    o3v.util.forEach(this.entities_, function (t, e) {
        o3v.util.isEmpty(t.parentIds) && (this.rootId_ ? this.log_.error("MULTIPLE ROOTS", this.rootId_, " ", e, " ", this.entities_[this.rootId_].name, " ", this.entities_[e].name) : this.rootId_ = e)
    }, this)
},
o3v.EntityModel.prototype.computeBboxes = function (t) {
    var e = this.getLeafIds(this.rootId_);
    o3v.util.forEach(e, function (e, i) {
        var o = this.entities_[i];
        o.bbox = t[o.externalId]
    }, this);
    for (var i = e, o = Object.keys(e); o.length;) {
        var n = o.shift();
        if (i[n]) {
            delete i[n];
            var s = this.entities_[n];
            o3v.util.forEach(s.parentIds, function (t, e) {
                var n = this.entities_[e];
                void 0 !== s.bbox ? (n.bbox = o3v.growBBox(n.bbox, s.bbox), i[e] = !0, o.push(e)) : o3v.log.error("error adding ", s.name, " to ", n.name)
            }, this)
        }
    }
    o3v.util.forEach(this.entities_, function (t) {
        void 0 !== t.bbox ? (t.ctr = [], t.ctr[0] = .5 * (t.bbox[0] + t.bbox[3]), t.ctr[1] = .5 * (t.bbox[1] + t.bbox[4]), t.ctr[2] = .5 * (t.bbox[2] + t.bbox[5])) : o3v.log.error("no bbox or center for entity", t)
    })
},
o3v.EntityModel.prototype.computeOneSplit_ = function (t, e) {
    if (!t.childIds) return null;
    var i = {};
    if (1 == o3v.util.getObjectCount(t.childIds)) {
        var o = +Object.keys(t.childIds)[0];
        return this.computeOneSplit_(this.getEntity(o), o)
    }
    var n = this.getLeafIds(e),
        s = {};
    for (var o in t.childIds) if (!this.unselectable_[o]) {
            var a = this.getLeafIds(+o);
            a && o3v.util.getObjectCount(a) > 1 && (s[o] = a)
        }
    var r = Object.keys(s);
    r.sort(function (t, e) {
            return o3v.util.getObjectCount(s[e]) - o3v.util.getObjectCount(s[t])
        }),
    r.forEach(function (t) {
            var e = !1,
                o = s[t];
            for (var a in o) if (n[a]) {
                    e = !0;
                    break
                }
            if (e) {
                    i[t] = !0;
                    for (var a in o) delete n[a]
                }
        });
    for (var h in n) this.unselectable_[h] || (i[h] = !0);
    return o3v.util.getObjectCount(i) <= 1 ? null : o3v.util.getObjectCount(i) <= o3v.EntityModel.MAX_SPLIT_COUNT_ ? i 
        : (/*this.log_.warning("entity ", t.name, " splits into too many: ", o3v.util.getObjectCount(i), " ", i),*/ o3v.debug ? i : null)
},
o3v.EntityModel.prototype.computeSplits_ = function () {
    o3v.util.forEach(this.entities_, function (t, e) {
        if (!this.unselectable_[e]) {
            var i = this.computeOneSplit_(t, e);
            i && (t.split_ = i)
        }
    }, this)
},
o3v.EntityModel.prototype.propagateLayerDown_ = function (t, e) {
    var i = this.entities_[e];
    if (i.layers || (i.layers = {}), i.childIds) for (var o in i.childIds) this.propagateLayerDown_(t, +o);
    else i.layers[t] = !0
},
o3v.EntityModel.prototype.propagateLayerUp_ = function (t, e) {
    var i = this.entities_[e];
    i.layers || (i.layers = {}),
    i.layers[t] = !0;
    for (var o in i.parentIds) this.propagateLayerUp_(t, +o)
},
o3v.EntityModel.prototype.computeLayers_ = function (t) {
    Object.keys(t.getLayers()).forEach(function (e) {
        if (this.entities_[e]) {
            var i = t.getEntity(e).externalId;
            this.layerNames_.push(i),
            this.entities_[e].externalId = i,
            this.layerNameToId_[i] = e
        }
    }, this),
    Object.keys(t.getLayers()).forEach(function (t) {
        this.entities_[t] && this.propagateLayerDown_(t, t)
    }, this),
    o3v.util.forEach(this.entities_, function (t) {
        t.childIds || t.layers && 1 == o3v.util.getObjectCount(t.layers) || this.log_.error("leaf entity not in one layer: ", t.name)
    }, this),
    o3v.util.forEach(this.entities_, function (t, e) {
        t.childIds || this.propagateLayerUp_(Object.keys(t.layers)[0], e)
    }, this),
    o3v.util.forEach(this.entities_, function (t) {
        o3v.util.isEmpty(t.layers) || (t.layers = Object.keys(t.layers))
    })
},
o3v.EntityModel.prototype.computeSearches_ = function (t) {
    var e = t.getSymmetries();
    for (var i in this.entities_) if (i = +i, !this.nonSearchableEntityIds_[i]) {
        var o = t.getEntity(i).names.slice(0);
        e[i] && (o[0] = e[i].singularName),
        o.forEach(function (t) {
            o3v.util.setIfUndefined(this.searchToEntityIds_, t, []),
            this.searchToEntityIds_[t].push(i)
        }, this)
    }
    var n = Object.keys(this.searchToEntityIds_);
    n.sort(function (t, e) {
        return t.length - e.length
    }),
    this.autocompleteList_ = n
},
o3v.EntityModel.prototype.getSelectable_ = function (t) {
    if (this.unselectable_[t]) {
        var e = Object.keys(this.entities_[t].parentIds),
            i = o3v.util.getObjectCount(this.getRootEntity().childIds) + 1,
            o = -1;
        return e.forEach(function (t) {
                var e = this.entities_[t],
                    n = o3v.util.getObjectCount(e.childIds);
                n < i && (i = n, o = t)
            }, this),
        -1 == o ? (this.log_.error("Unable to find entity id under click."), this.rootId_) : this.getSelectable_(o)
    }
    return t
},
o3v.EntityModel.prototype.externalIdToId = function (t) {
    return this.getSelectable_(this.externalIdToId_[t])
},
o3v.EntityModel.prototype.getEntity = function (t) {
    return this.entities_[t]
},
o3v.EntityModel.prototype.getRootEntity = function () {
    return this.entities_[this.rootId_]
},
o3v.EntityModel.prototype.getLeafIds = function (t) {
    var e = {},
        i = this.entities_[t];
    if (i.childIds) {
            for (var o in i.childIds) o3v.util.extendObject(e, this.getLeafIds(+o));
            return e
        }
    return e[t] = !0,
    e
},
o3v.EntityModel.prototype.isSplittable = function (t) {
    return !!this.getEntity(t).split_
},
o3v.EntityModel.prototype.getSplit = function (t) {
    return this.getEntity(t).split_
},
o3v.EntityModel.prototype.getLayerNames = function () {
    return this.layerNames_
},
o3v.EntityModel.prototype.layerNameToId = function (t) {
    return this.layerNameToId_[t]
},
o3v.EntityModel.prototype.searchToEntityIds = function (t) {
    return this.searchToEntityIds_[t]
},
o3v.EntityModel.prototype.getAutocompleteList = function () {
    return zg.account.isLiteUser() ? this.autocompleteList_.filter(function (t) {
        return "clothes" != t && "shorts" != t && "female skin" != t && "skin" != t && "m_skin" != t && "male skin" != t
    }) : this.autocompleteList_
},
o3v.EntityModel.prototype.getSublayers = function () {
    return this.sublayers_
},
o3v.EntityModel.prototype.getSublayers2 = function () {
    return this.sublayers2_
},
o3v.EntityModel.prototype.hasSublayers2 = function () {
    return this.hasSublayers2_
},
o3v.EntityModel.prototype.getForceTransparent = function () {
    return this.forceTransparent_
},
o3v.ContentManager = function () {
    this.models_ = o3v.MODELS,
    this.metadata_ = null,
    this.currentModel_ = -1,
    this.scriptsLoaded_ = {},
    this.metadataLoaded_ = {}
},
o3v.ContentManager.prototype.nextModel = function (t, e, i, o) {
    this.currentModel_ = (this.currentModel_ + 1) % this.models_.length,
    t(this.models_[this.currentModel_]),
    this.loadModel_(this.models_[this.currentModel_], e, i, o)
},
o3v.ContentManager.prototype.loadModel = function (t, e, i, o, n, s) {
    for (var a = 0, a = 0; a < this.models_.length && t != this.models_[a][e]; a++);
    this.currentModel_ = a,
    i(this.models_[this.currentModel_]),
    this.loadModel_(this.models_[this.currentModel_], o, n, s)
},
o3v.ContentManager.prototype.getCurrentModelInfo = function () {
    return this.models_[this.currentModel_]
},
o3v.ContentManager.prototype.loadModel_ = function (t, e, i, o) {
    var n = t.scriptFile;
    this.scriptsLoaded_[n] ? this.loadModelAfterScript_(t, e, i, o) : $.getScript(n, function () {
        this.scriptsLoaded_[n] = !0,
        this.loadModelAfterScript_(t, e, i, o)
    }.bind(this))
},
o3v.ContentManager.prototype.loadModelAfterScript_ = function (t, e, i, o) {
    downloadModel(t.modelUri, t.name, e, i),
    this.loadMetadata_(t.metadataFile, MODELS[t.name], o)
},
o3v.ContentManager.prototype.loadMetadata_ = function (t, e, i) {
    function o(o) {
        //console.log('onload json json : '+o.responseText);
        var n = new o3v.EntityMetadata(JSON.parse(o.responseText));
        s.metadata_ = new o3v.EntityModel(e, n),
        s.metadataLoaded_[t] = this.metadata_,
        i()
    }
    var n = this.metadataLoaded_[t];
    if (n) this.metadata_ = n,
    i();
    else {
        var s = this;
        getHttpRequest(t, o)
    }
},
o3v.ContentManager.prototype.getMetadata = function () {
    return this.metadata_
},
o3v.ContentManager.prototype.modelId = function () {
    return this.models_[this.currentModel_].id
},
o3v.ContentManager.prototype.getModelLabels = function () {
    for (var t = [], e = {}, i = 0; i < this.models_.length; i++) {
        var o = this.models_[i],
            n = o.label;
        o.uiPath ? (e[o.uiPath] || (e[o.uiPath] = {
                label: o.uiPath,
                values: []
            }, t.push(e[o.uiPath])), e[o.uiPath].values.push(n)) : t.push(n)
    }
    return t
},
o3v.LayerOpacityManager = function () {
    this.layerOpacities_ = null,
    this.callbacks = []
},
o3v.LayerOpacityManager.prototype.init = function (t) {
    this.layerOpacities_ = [];
    for (var e = 0; e < t; ++e) this.layerOpacities_.push(1)
},
o3v.LayerOpacityManager.prototype.getLayerOpacities = function () {
    return this.layerOpacities_
},
o3v.LayerOpacityManager.prototype.setLayerOpacity = function (t, e, i) {
    this.layerOpacities_[t] = e,
    this.updateAllBut(i)
},
o3v.LayerOpacityManager.prototype.setLayerOpacities = function (t, e) {
    this.layerOpacities_ = t.slice(),
    this.updateAllBut(e)
},
o3v.LayerOpacityManager.prototype.addView = function (t) {
    for (var e = this.callbacks.length, i = 0; i < e; ++i) if (this.callbacks[i] == t) return;
    this.callbacks.push(t)
},
o3v.LayerOpacityManager.prototype.updateAllBut = function (t) {
    for (var e = this.callbacks.length, i = 0; i < e; ++i) {
        var o = this.callbacks[i];
        o != t && o()
    }
},
o3v.History = function (t) {
    this.window_ = t,
    this.registry_ = {}
},
o3v.History.GET_STATE_ = 0,
o3v.History.RESTORE_STATE_ = 1,
o3v.History.UPDATE_DELAY_MS_ = 5e3,
o3v.History.prototype.timeout_,
o3v.History.prototype.suppressed_ = !1,
o3v.History.NO_RESTART = 0,
o3v.History.RESTART = 1,
o3v.History.NEXT_MODEL = 2,
o3v.History.prototype.restart_restore = o3v.History.NO_RESTART,
o3v.History.prototype.start = function () {
    $(this.window_).bind("hashchange", function (t) {
        this.restoreState_(this.window_.location.hash)
    }.bind(this)),
    this.restoreState_(this.window_.location.hash)
},
o3v.History.prototype.reset = function () {
    this.timeout_ && this.window_.clearTimeout(this.timeout_),
    this.window_.location.hash = ""
},
o3v.History.prototype.register = function (t, e, i) {
    void 0 !== this.registry_[t] && o3v.log.error("id ", t, " already registered in history"),
    this.registry_[t] = [e, i]
},
o3v.History.prototype.unregister = function (t) {
    delete this.registry_[t]
},
o3v.History.prototype.update = function (t) {
    this.timeout_ && this.window_.clearTimeout(this.timeout_);
    var e = this.generateState_(),
        i = function () {
            this.generateState_() == e ? this.window_.location.hash != e && (this.suppressed_ = !0, o3v.log.info("history saving state: " + e), this.window_.location.hash = e, saveState(e)) : this.update()
        }.bind(this);
    t ? (this.timeout_ = void 0, i()) : this.timeout_ = this.window_.setTimeout(i, o3v.History.UPDATE_DELAY_MS_)
},
o3v.History.prototype.encode_ = function (t) {
    var e = encodeURIComponent(t);
    return e = e.replace(/%2B/g, "+"),
    e = e.replace(/%3A/g, ":"),
    e = e.replace(/%2C/g, ","),
    e = e.replace(/%3B/g, ";")
},
o3v.History.prototype.decode_ = function (t) {
    return t = t.replace(/;/g, "%3B"),
    t = t.replace(/,/g, "%2C"),
    t = t.replace(/:/g, "%3A"),
    t = t.replace(/\+/g, "%2B"),
    decodeURIComponent(t)
},
o3v.History.prototype.generateState_ = function () {
    var t = [];
    for (var e in this.registry_) {
        var i = this.registry_[e][o3v.History.GET_STATE_]();
        t.push(e + "=" + this.encode_(i))
    }
    return t.join("&")
},
o3v.History.prototype.restoreState_ = function (t) {
    try {
        if (this.suppressed_) return void(this.suppressed_ = !1);
        o3v.log.info("history restoring state: " + t),
        t = t.replace(/^#/, "");
        for (var e = t.split("&"), i = 0; i < e.length; i++) {
            var o = e[i].split("=");
            if (2 == o.length) {
                var n = o[0];
                if ("layers" == n) {
                    var s = this.decode_(o[1]);
                    if (this.registry_[n][o3v.History.RESTORE_STATE_]("model_check," + s)) break;
                    return
                }
            }
        }
        for (var a = 0; a < e.length; a++) {
            var r = e[a].split("=");
            if (2 == r.length) {
                var h = r[0];
                if (this.registry_[h]) {
                    var l = this.decode_(r[1]);
                    this.registry_[h][o3v.History.RESTORE_STATE_](l)
                }
            }
        }
    } catch (t) {
        o3v.log_.warning("history restoring state", t)
    }
},
o3v.History.prototype.checkRestartRestore = function () {
    this.restart_restore != o3v.History.NO_RESTART && this.restoreState_(this.window_.location.hash)
},
o3v.LayersUI = function (t, e) {
    this.layerOpacityManager_ = t,
    this.singleSlider_ = new o3v.LayersUI.SingleSlider(t),
    this.multiSlider_ = new o3v.LayersUI.MultiSlider(t),
    this.icons_ = new o3v.LayersUI.Icons(t),
    this.sliderToggle_ = new o3v.LayersUI.SliderToggle(this.singleSlider_, this.multiSlider_),
    this.state_ = "",
    this.history = e,
    this.history.register("layers", this.getState.bind(this), this.restoreState.bind(this))
},
o3v.LayersUI.ICON_WIDTH = 45,
o3v.LayersUI.ICON_HEIGHT = 47,
o3v.LayersUI.ICON_HEIGHT_SMALL = 47,
o3v.LayersUI.ICON_HEIGHT_LARGE = 120,
o3v.LayersUI.numLayers = 0,
o3v.LayersUI.prototype.buildAll = function (t, e, i) {
    o3v.LayersUI.numLayers = e,
    o3v.LayersUI.ICON_HEIGHT = e <= 1 ? o3v.LayersUI.ICON_HEIGHT_LARGE : o3v.LayersUI.ICON_HEIGHT_SMALL,
    this.singleSlider_.build(t, e, !1),
    this.multiSlider_.build(t, e, !1),
    this.icons_.build(t, e, i),
    this.sliderToggle_.build(this.icons_.getLastIcon())
},
o3v.LayersUI.prototype.getState = function () {
    var t = [window.viewer_.contentManager_.currentModel_, this.sliderToggle_.single ? "1" : "0", this.singleSlider_.slider.slider("value")];
    return this.sliderToggle_.single || (t = t.concat(this.multiSlider_.getValues())),
    t.join(",")
},
o3v.LayersUI.prototype.getState2 = function () {
    var t = [this.sliderToggle_.single ? "1" : "0", this.singleSlider_.slider.slider("value")];
    return this.sliderToggle_.single || (t = t.concat(this.multiSlider_.getValues())),
    t.join(",")
},
o3v.LayersUI.prototype.restoreState = function (t) {
    if (t) {
        var e = t.split(","),
            i = e.shift();
        if ("model_check" == i) return i = e.shift(),
        !(window.viewer_.contentManager_.currentModel_ != i || !window.viewer_.loadedMetadata_) || (window.viewer_.loadedMetadata_ ? (window.viewer_.nextModelCallback(), this.history.restart_restore = o3v.History.RESTART) : this.history.restart_restore = o3v.History.NEXT_MODEL, !1);
        this.history.restart_restore = o3v.History.NO_RESTART;
        var o = 1 == e.shift();
        this.sliderToggle_.setToggle(o);
        var n = e.shift();
        this.singleSlider_.slider.slider("value", n),
        o ? this.singleSlider_.setOpacitiesFromFraction(n / this.singleSlider_.range, !1) : this.multiSlider_.setValues(e)
    }
    return !0
},
o3v.LayersUI.SingleSlider = function (t) {
    this.layerOpacityManager_ = t,
    this.updateCallback_ = this.update.bind(this),
    this.slider = null,
    this.range = 1e4,
    this.numLayers = 0,
    this.HANDLE_WIDTH = 51
},
o3v.LayersUI.SingleSlider.prototype.build = function (t, e) {
    this.numLayers = e,
    this.slider && this.slider.remove(),
    this.slider = $("<div>").appendTo("body").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: this.range,
        value: this.range,
        slide: function (t, e) {
            this.setOpacitiesFromFraction(e.value / this.range, !0)
        }.bind(this),
        stop: function () {
            document.activeElement.blur()
        }
    }).css({
        position: "absolute",
        border: "none",
        "border-left": "2px solid #6799CC",
        "border-right": "2px solid #6799CC",
        "border-radius": 0,
        background: "none",
        width: o3v.LayersUI.ICON_WIDTH + "px",
        height: this.numLayers * o3v.LayersUI.ICON_HEIGHT + "px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }).position({
        my: "top",
        at: "bottom",
        of: t,
        collision: "none"
    });
    var i = this.slider.get(0).childNodes;
    i[0].style.background = "none";
    var o = i[1].style;
    o.width = this.HANDLE_WIDTH + "px",
    o.opacity = .7,
    o.outlineStyle = "none",
    this.setOpacitiesFromFraction(1, !1),
    this.layerOpacityManager_.addView(this.updateCallback_)
},
o3v.LayersUI.SingleSlider.prototype.setOpacitiesFromFraction = function (t, e) {
    for (var i = t * this.numLayers, o = [], n = 0; n < this.numLayers; ++n) i <= n ? o.push(0) : i >= n + 1 ? o.push(1) : o.push(i - n);
    this.layerOpacityManager_.setLayerOpacities(o, this.updateCallback_),
    e && window.viewer_.layersUI_.history.update()
},
o3v.LayersUI.SingleSlider.prototype.show = function (t) {
    this.slider.css({
        visibility: t ? "visible" : "hidden"
    }),
    this.slider.slider(t ? "enable" : "disable")
},
o3v.LayersUI.SingleSlider.prototype.update = function () {
    for (var t = this.layerOpacityManager_.getLayerOpacities(), e = t.length, i = 0, o = e - 1; o > -1; --o) if (t[o] > 0) {
        i = (o + t[o]) / e;
        break
    }
    this.slider.slider("value", i * this.range),
    window.viewer_.layersUI_.history.update()
},
o3v.LayersUI.MultiSlider = function (t) {
    this.layerOpacityManager_ = t,
    this.updateCallback_ = this.update.bind(this),
    this.sliders = null,
    this.range = 1e4,
    this.numLayers = 0,
    this.HANDLE_HEIGHT = 43
},
o3v.LayersUI.MultiSlider.prototype.build = function (t, e) {
    if (this.sliders) for (var i = 0; i < this.numLayers; ++i) this.sliders[i].remove();
    for (this.sliders = [], this.numLayers = e, i = 0; i < this.numLayers; ++i) {
        var o = $("<div>").appendTo("body").slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: this.range,
            value: this.range,
            slide: function (t, e) {
                var i = this.sliders.length - 1 - $(t.target).data("id");
                this.layerOpacityManager_.setLayerOpacity(i, e.value / this.range, this.updateCallback_)
            }.bind(this),
            stop: function () {
                document.activeElement.blur()
            }
        }).css({
            position: "absolute",
            border: "none",
            "border-left": "2px solid #6799CC",
            "border-right": "2px solid #6799CC",
            "border-radius": 0,
            background: "none",
            visibility: "hidden",
            width: o3v.LayersUI.ICON_WIDTH + "px",
            height: o3v.LayersUI.ICON_HEIGHT + "px",
            "z-index": o3v.uiSettings.ZINDEX_MAINUI
        }).position({
            my: "top",
            at: "bottom",
            of: 0 === i ? t : this.sliders[i - 1],
            collision: "none"
        }).data("id", i);
        this.sliders.push(o);
        var n = o.get(0).childNodes;
        n[0].style.background = "none";
        var s = n[1].style;
        s.height = this.HANDLE_HEIGHT + "px",
        s.opacity = .7,
        s.outlineStyle = "none"
    }
    this.layerOpacityManager_.addView(this.updateCallback_)
},
o3v.LayersUI.MultiSlider.prototype.show = function (t) {
    for (var e = this.sliders.length, i = 0; i < e; ++i) this.sliders[i].css({
        visibility: t ? "visible" : "hidden"
    }),
    this.sliders[i].slider(t ? "enable" : "disable")
},
o3v.LayersUI.MultiSlider.prototype.update = function () {
    for (var t = this.layerOpacityManager_.getLayerOpacities(), e = this.sliders.length, i = 0; i < e; ++i) {
        var o = e - 1 - i;
        this.sliders[i].slider("value", t[o] * this.range)
    }
},
o3v.LayersUI.MultiSlider.prototype.getValues = function () {
    for (var t = [], e = this.sliders.length, i = 0; i < e; i++) t[i] = this.sliders[i].slider("option", "value");
    return t
},
o3v.LayersUI.MultiSlider.prototype.setValues = function (t) {
    for (var e = this.sliders.length, i = 0; i < e; i++) {
        this.sliders[i].slider("value", t[i]),
        this.layerOpacityManager_.setLayerOpacity(e - 1 - i, t[i] / this.range, this.updateCallback_)
    }
},
o3v.LayersUI.Icons = function (t) {
    this.layerOpacityManager_ = t,
    this.updateCallback_ = this.update.bind(this),
    this.activeIcons = [],
    this.inactiveIcons = [],
    this.lastIcon = null
},
o3v.LayersUI.Icons.prototype.getLastIcon = function () {
    return this.lastIcon
},
o3v.LayersUI.Icons.prototype.build = function (t, e, i) {
    if (this.activeIcons) {
        for (var o = this.activeIcons.length, n = 0; n < o; ++n) this.activeIcons[n].remove(),
        this.inactiveIcons[n].remove();
        this.activeIcons = [],
        this.inactiveIcons = []
    }
    for (n = 0; n < e; ++n) {
        var s = n * o3v.LayersUI.ICON_HEIGHT,
            a = $("<div>").appendTo("body").css({
                position: "absolute",
                width: o3v.LayersUI.ICON_WIDTH + "px",
                height: o3v.LayersUI.ICON_HEIGHT + "px",
                "background-image": "url(" + i + ")",
                "background-position": "0px -" + s + "px",
                "z-index": o3v.uiSettings.ZINDEX_MAINUI_STATUS_LOWER
            });
        this.inactiveIcons.push(a),
        a.position({
                my: "top",
                at: "bottom",
                of: 0 === n ? t : this.inactiveIcons[n - 1],
                collision: "none"
            });
        var r = $("<div>").appendTo("body").css({
                position: "absolute",
                width: o3v.LayersUI.ICON_WIDTH + "px",
                height: o3v.LayersUI.ICON_HEIGHT + "px",
                "background-image": "url(" + i + ")",
                "background-position": "-" + o3v.LayersUI.ICON_WIDTH + "px -" + s + "px",
                "z-index": o3v.uiSettings.ZINDEX_MAINUI_STATUS_UPPER
            });
        this.activeIcons.push(r),
        r.position({
                my: "top",
                at: "bottom",
                of: 0 === n ? t : this.activeIcons[n - 1],
                collision: "none"
            })
    }
    this.lastIcon = this.activeIcons[this.activeIcons.length - 1],
    this.layerOpacityManager_.addView(this.updateCallback_)
},
o3v.LayersUI.Icons.prototype.update = function () {
    for (var t = this.layerOpacityManager_.getLayerOpacities(), e = this.activeIcons.length, i = 0; i < e; ++i) {
        var o = e - 1 - i;
        this.activeIcons[i].get(0).style.opacity = t[o]
    }
},
o3v.LayersUI.SliderToggle = function (t, e) {
    this.button = null,
    this.single = !0,
    this.helpBtn = null,
    this.helpInner = null,
    this.singleSlider_ = t,
    this.multiSlider_ = e
},
o3v.LayersUI.SliderToggle.prototype.build = function (t) {
    this.button && (this.button.remove(), this.helpBtn.remove(), this.helpInner.remove()),
    this.button = $("<div>").appendTo("body").css({
        position: "absolute",
        width: "45px",
        height: "50px",
        "border-left": "2px solid #6799CC",
        "border-bottom-left-radius": "16px",
        "border-bottom-right-radius": "16px",
        "border-bottom": "2px solid #6799CC",
        "border-right": "2px solid #6799CC",
        "border-top": "1px solid #C6D9EC",
        "background-position": "center center",
        "background-repeat": "no-repeat",
        "background-color": "#fff",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI_STATUS_UPPER
    }).position({
        my: "top",
        at: "bottom",
        of: t,
        collision: "none"
    }).click(this.toggleSliders.bind(this)),
    this.helpBtn = $("<div>").appendTo("body").css({
        position: "absolute",
        width: "45px",
        height: "74px",
        "background-image": "url('body/images/help.png')",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI_STATUS_UPPER - 1
    }).position({
        my: "top",
        at: "bottom",
        of: t,
        collision: "none"
    }).click(),
    this.helpInner = $("<div>").appendTo("body").css({
        position: "absolute",
        width: "45px",
        height: "74px",
        "border-left": "2px solid #dbdbdb",
        "border-bottom-left-radius": "16px",
        "border-bottom-right-radius": "16px",
        "border-bottom": "2px solid #dbdbdb",
        "border-right": "2px solid #dbdbdb",
        "border-top": 0,
        "background-position": "center center",
        "background-repeat": "no-repeat",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI_STATUS_UPPER - 1
    }).position({
        my: "top",
        at: "bottom",
        of: t,
        collision: "none"
    }).click(function () {
        viewer_.toggleHelp_()
    }),
    this.setArt()
},
o3v.LayersUI.SliderToggle.prototype.setArt = function () {
    this.button.css({
        "background-image": this.single ? "url(body/img/toggle_single_slider.png)" : "url(body/img/toggle_multiple_sliders.png)"
    })
},
o3v.LayersUI.SliderToggle.prototype.toggleSliders = function () {
    this.single = !this.single,
    1 == o3v.LayersUI.numLayers && (this.single = !0),
    this.setArt(),
    this.singleSlider_.show(this.single),
    this.multiSlider_.show(!this.single)
},
o3v.LayersUI.SliderToggle.prototype.setToggle = function (t) {
    this.single != t && this.toggleSliders()
},
o3v.Gestures = function () {
    this.isMac_ = navigator.platform && 0 == navigator.platform.indexOf("Mac")
},
o3v.Gestures.prototype.isHideClick = function (t, e) {
    return !(!t || this.isMac_) || !(!e || !this.isMac_)
},
o3v.SelectManager = function (t, e, i) {
    this.changeCallback_ = t,
    this.layerSelectionRefcount_ = {},
    this.selectedEntities_ = {},
    this.pinnedEntities_ = {},
    this.hiddenEntities_ = {},
    this.interpolants_ = {},
    this.CURRENT_LAYER_INTERPOLANT = -1,
    this.OTHER_LAYER_INTERPOLANT = -2,
    this.CURRENT_LAYER_OPACITY_MAX_MODIFIER = -.6,
    this.CURRENT_LAYER_OPACITY_MODIFIER_STEP = .1,
    this.CURRENT_LAYER_OPACITY_MIN_MODIFIER = -.9,
    this.OTHER_LAYER_OPACITY_DEMOTION = .15,
    this.PINNED_ENTITY_OPACITY_MODIFIER = 1,
    this.SELECTED_ENTITY_OPACITY_MODIFIER = 1,
    this.HIDDEN_ENTITY_OPACITY_MODIFIER = -1,
    this.NEUTRAL_OPACITY_MODIFIER = 0,
    this.mode_ = 0,
    this.MODE_NORMAL = 0,
    this.MODE_PIN = 1,
    this.MODE_HIDE = 2,
    this.history = i,
    this.history.register("sel", this.getState.bind(this), this.restoreState.bind(this))
},
o3v.SelectManager.prototype.reset = function (t) {
    this.reset_(),
    this.mode_ = this.MODE_NORMAL,
    this.entityStore_ = t
},
o3v.SelectManager.prototype.getState = function () {
    return "p:" + Object.keys(this.pinnedEntities_).join(",") + ";h:" + Object.keys(this.hiddenEntities_).join(",") + ";s:" + Object.keys(this.selectedEntities_).join(",") + ";c:" + this.getSelectedLayerOpacityModifier() + ";o:" + this.getOtherLayerOpacityModifier()
},
o3v.SelectManager.prototype.getStateExtId = function () {
    return "p:" + this.toExtId(this.pinnedEntities_).join(",") + ";h:" + this.toExtId(this.hiddenEntities_).join(",") + ";s:" + this.toExtId(this.selectedEntities_).join(",") + ";c:" + this.getSelectedLayerOpacityModifier() + ";o:" + this.getOtherLayerOpacityModifier()
},
o3v.SelectManager.prototype.restoreState = function (t) {
    if (this.reset_(), t) {
        var e = t.split(";");
        for (var i in e) {
            var o = e[i].split(":");
            "s" == o[0] ? this.selectMultiple(o[1].split(","), !0) : "p" == o[0] ? this.pinMultiple(o[1].split(","), !0) : "h" == o[0] ? this.hideMultiple(o[1].split(","), !0) : "c" == o[0] ? this.setFuture_(this.CURRENT_LAYER_INTERPOLANT, parseFloat(o[1]), 1) : "o" == o[0] && this.setFuture_(this.OTHER_LAYER_INTERPOLANT, parseFloat(o[1]), 1)
        }
    }
    this.signalChange_(!0)
},
o3v.SelectManager.prototype.toIds = function (t) {
    for (var e = [], i = 0; i < t.length; i++) {
        var o = t[i],
            n = this.entityStore_.externalIdToId(o);
        void 0 != n && e.push(n)
    }
    return e
},
o3v.SelectManager.prototype.toExtId = function (t) {
    var e = [];
    for (var i in t) {
        var o = t[i],
            n = o.externalId;
        void 0 != n && e.push(n)
    }
    return e
},
o3v.SelectManager.prototype.restoreStateExtId = function (t) {
    if (this.reset_(), t) {
        var e = t.split(";");
        for (var i in e) {
            var o = e[i].split(":");
            "s" == o[0] ? this.selectMultiple(this.toIds(o[1].split(",")), !0) : "p" == o[0] ? this.pinMultiple(this.toIds(o[1].split(",")), !0) : "h" == o[0] ? this.hideMultiple(this.toIds(o[1].split(",")), !0) : "c" == o[0] ? this.setFuture_(this.CURRENT_LAYER_INTERPOLANT, parseFloat(o[1]), 1) : "o" == o[0] && this.setFuture_(this.OTHER_LAYER_INTERPOLANT, parseFloat(o[1]), 1)
        }
    }
    this.signalChange_(!0)
},
o3v.SelectManager.prototype.reset_ = function () {
    this.clearHidden(!0),
    this.clearPinned(!0),
    this.clearSelected(!0),
    this.interpolants_[this.CURRENT_LAYER_INTERPOLANT] = new o3v.Interpolant(this.NEUTRAL_OPACITY_MODIFIER),
    this.interpolants_[this.OTHER_LAYER_INTERPOLANT] = new o3v.Interpolant(this.NEUTRAL_OPACITY_MODIFIER)
},
o3v.SelectManager.prototype.entityAllowed_ = function (t) {
    return !(!t || !this.entityStore_.getEntity(t))
},
o3v.SelectManager.prototype.calculateSelectedLayerOpacityModifier_ = function () {
    var t = this.CURRENT_LAYER_OPACITY_MAX_MODIFIER + this.CURRENT_LAYER_OPACITY_MODIFIER_STEP;
    for (var e in this.layerSelectionRefcount_) this.layerSelectionRefcount_[e] && (t -= this.CURRENT_LAYER_OPACITY_MODIFIER_STEP);
    return t < this.CURRENT_LAYER_OPACITY_MIN_MODIFIER && (t = this.CURRENT_LAYER_OPACITY_MIN_MODIFIER),
    t
},
o3v.SelectManager.prototype.setFutureOpacities_ = function (t, e) {
    this.selectedEntities_[t] ? this.setFuture_(t, this.SELECTED_ENTITY_OPACITY_MODIFIER, e) : this.pinnedEntities_[t] ? this.setFuture_(t, this.PINNED_ENTITY_OPACITY_MODIFIER, e) : this.hiddenEntities_[t] ? this.setFuture_(t, this.HIDDEN_ENTITY_OPACITY_MODIFIER, e) : this.setFuture_(t, this.NEUTRAL_OPACITY_MODIFIER, e),
    this.setFutureLayerOpacities_()
},
o3v.SelectManager.prototype.setFutureLayerOpacities_ = function () {
    if (this.haveSelected()) {
        var t = this.calculateSelectedLayerOpacityModifier_(),
            e = Math.max(t - this.OTHER_LAYER_OPACITY_DEMOTION, -1);
        this.setFuture_(this.CURRENT_LAYER_INTERPOLANT, t, this.getEntityOpacityModifier(this.CURRENT_LAYER_INTERPOLANT)),
        this.setFuture_(this.OTHER_LAYER_INTERPOLANT, e, this.getEntityOpacityModifier(this.OTHER_LAYER_INTERPOLANT))
    } else this.setFuture_(this.CURRENT_LAYER_INTERPOLANT, this.NEUTRAL_OPACITY_MODIFIER, this.getEntityOpacityModifier(this.CURRENT_LAYER_INTERPOLANT)),
    this.setFuture_(this.OTHER_LAYER_INTERPOLANT, this.NEUTRAL_OPACITY_MODIFIER, this.getEntityOpacityModifier(this.OTHER_LAYER_INTERPOLANT))
},
o3v.SelectManager.prototype.setFuture_ = function (t, e, i) {
    this.interpolants_[t] || (this.interpolants_[t] = new o3v.Interpolant(i)),
    this.interpolants_[t].setFuture(e)
},
o3v.SelectManager.prototype.signalChange_ = function (t) {
    this.changeCallback_(),
    t || this.history.update()
},
o3v.SelectManager.prototype.selectEntity_ = function (t) {
    var e = this.entityStore_.getEntity(t);
    if (e && !this.selectedEntities_[t]) {
        var i = this.getEntityOpacityModifier(t);
        e.layers.forEach(function (t) {
            o3v.util.setIfUndefined(this.layerSelectionRefcount_, t, 0),
            this.layerSelectionRefcount_[t]++
        }, this),
        this.selectedEntities_[t] = e,
        this.setFutureOpacities_(t, i)
    }
},
o3v.SelectManager.prototype.unselectEntity_ = function (t) {
    var e = this.selectedEntities_[t];
    if (e) {
        var i = this.getEntityOpacityModifier(t);
        e.layers.forEach(function (t) {
            this.layerSelectionRefcount_[t]--
        }, this),
        delete this.selectedEntities_[t],
        this.setFutureOpacities_(t, i)
    }
},
o3v.SelectManager.prototype.hideEntity_ = function (t) {
    var e = this.entityStore_.getEntity(t);
    if (e && !this.hiddenEntities_[t]) {
        var i = this.getEntityOpacityModifier(t);
        this.hiddenEntities_[t] = e,
        this.setFutureOpacities_(t, i)
    }
},
o3v.SelectManager.prototype.unhideEntity_ = function (t) {
    if (this.hiddenEntities_[t]) {
        var e = this.getEntityOpacityModifier(t);
        delete this.hiddenEntities_[t],
        this.setFutureOpacities_(t, e)
    }
},
o3v.SelectManager.prototype.pinEntity_ = function (t) {
    var e = this.entityStore_.getEntity(t);
    if (e && !this.pinnedEntities_[t]) {
        var i = this.getEntityOpacityModifier(t);
        this.pinnedEntities_[t] = e,
        this.setFutureOpacities_(t, i)
    }
},
o3v.SelectManager.prototype.unpinEntity_ = function (t) {
    if (this.pinnedEntities_[t]) {
        var e = this.getEntityOpacityModifier(t);
        delete this.pinnedEntities_[t],
        this.setFutureOpacities_(t, e)
    }
},
o3v.SelectManager.prototype.getEntityOpacityModifier = function (t) {
    return this.interpolants_[t] ? this.interpolants_[t].getPresent() : this.hiddenEntities_[t] ? this.HIDDEN_ENTITY_OPACITY_MODIFIER : this.selectedEntities_[t] ? this.SELECTED_ENTITY_OPACITY_MODIFIER : this.pinnedEntities_[t] ? this.PINNED_ENTITY_OPACITY_MODIFIER : this.NEUTRAL_OPACITY_MODIFIER
},
o3v.SelectManager.prototype.getSelectedLayerOpacityModifier = function () {
    return this.getEntityOpacityModifier(this.CURRENT_LAYER_INTERPOLANT)
},
o3v.SelectManager.prototype.getOtherLayerOpacityModifier = function () {
    return this.getEntityOpacityModifier(this.OTHER_LAYER_INTERPOLANT)
},
o3v.SelectManager.prototype.haveSelected = function () {
    return !o3v.util.isEmpty(this.selectedEntities_)
},
o3v.SelectManager.prototype.havePinned = function () {
    return !o3v.util.isEmpty(this.pinnedEntities_)
},
o3v.SelectManager.prototype.haveHidden = function () {
    return !o3v.util.isEmpty(this.hiddenEntities_)
},
o3v.SelectManager.prototype.getLayersWithSelected = function () {
    var t = {};
    return o3v.util.forEach(this.layerSelectionRefcount_, function (e, i) {
        e > 0 && (t[i] = !0)
    }),
    t
},
o3v.SelectManager.prototype.getLayersWithPinned = function () {
    var t = {};
    this.getPinned();
    return o3v.util.forEach(this.getPinned(), function (e, i) {
        e.layers.forEach(function (e) {
            t[e] = !0
        })
    }),
    t
},
o3v.SelectManager.prototype.getPinned = function () {
    return this.pinnedEntities_
},
o3v.SelectManager.prototype.getSelected = function () {
    return this.selectedEntities_
},
o3v.SelectManager.prototype.getHidden = function () {
    return this.hiddenEntities_
},
o3v.SelectManager.prototype.hide = function (t, e) {
    this.hideMultiple([t], e)
},
o3v.SelectManager.prototype.hideMultiple = function (t, e) {
    t.forEach(function (t) {
        this.entityAllowed_(t) && (this.unselect(t, e), this.unpin(t, e), this.hideEntity_(t))
    }, this),
    this.signalChange_(e)
},
o3v.SelectManager.prototype.unhide = function (t, e) {
    this.unhideEntity_(t),
    this.signalChange_(e)
},
o3v.SelectManager.prototype.clearHidden = function (t) {
    t || o3v.Analytics.trackPage("/ui/clear-hidden");
    for (var e in this.hiddenEntities_) this.unhideEntity_(e);
    this.signalChange_(t)
},
o3v.SelectManager.prototype.select = function (t, e) {
    this.selectMultiple([t], e)
},
o3v.SelectManager.prototype.selectMultiple = function (t, e) {
    this.clearSelected(!1, !0),
    t.forEach(function (t) {
        this.entityAllowed_(t) && this.selectEntity_(t)
    }, this),
    this.signalChange_(e)
},
o3v.SelectManager.prototype.unselect = function (t, e) {
    this.unselectEntity_(t),
    this.signalChange_(e)
},
o3v.SelectManager.prototype.clearSelected = function (t, e) {
    for (var i in this.selectedEntities_) this.unselectEntity_(i);
    e || this.signalChange_(t)
},
o3v.SelectManager.prototype.pin = function (t, e) {
    this.pinMultiple([t], e)
},
o3v.SelectManager.prototype.pinMultiple = function (t, e) {
    t.forEach(function (t) {
        this.entityAllowed_(t) && (this.unhide(t, e), this.unselect(t, e), this.pinEntity_(t, e))
    }, this),
    this.signalChange_(e)
},
o3v.SelectManager.prototype.unpin = function (t, e) {
    this.unpinEntity_(t),
    this.signalChange_(e)
},
o3v.SelectManager.prototype.togglePin = function (t) {
    this.pinnedEntities_[t] ? this.unpin(t) : this.pin(t)
},
o3v.SelectManager.prototype.togglePinMultiple = function (t) {
    t.forEach(function (t) {
        this.togglePin(t)
    }, this)
},
o3v.SelectManager.prototype.clearPinned = function (t) {
    t || o3v.Analytics.trackPage("/ui/clear-pinned");
    for (var e in this.pinnedEntities_) this.unpinEntity_(e);
    this.signalChange_(t)
},
o3v.SelectManager.prototype.pickMultiple = function (t) {
    this.mode_ == this.MODE_PIN ? this.togglePinMultiple(t) : this.mode_ == this.MODE_HIDE ? this.hideMultiple(t) : 1 == t.length && this.selectedEntities_[t] && 1 == o3v.util.getObjectCount(this.selectedEntities_) ? this.clearSelected() : this.selectMultiple(t)
},
o3v.SelectManager.prototype.expandSelected = function (t) {
    var e = {};
    o3v.util.extendObject(e, this.entityStore_.getSplit(t)),
    o3v.util.extendObject(e, this.getSelected()),
    delete e[t],
    this.selectMultiple(Object.keys(e))
},
o3v.SelectManager.prototype.expandPinned = function (t) {
    this.unpin(t),
    this.pinMultiple(Object.keys(this.entityStore_.getSplit(t)))
},
o3v.SelectManager.prototype.setMode = function (t) {
    this.mode_ = t
},
o3v.SelectManager.prototype.recalculate = function () {
    var t = !1,
        e = [];
    for (var i in this.interpolants_) {
            var o = this.interpolants_[i],
                n = o.tween();
            t |= n,
            i == this.CURRENT_LAYER_INTERPOLANT || i == this.OTHER_LAYER_INTERPOLANT || n || e.push(i)
        }
    return e.forEach(function (t) {
            delete this.interpolants_[t]
        }, this),
    t
},
o3v.SelectManager.prototype.clearSelection = function () {
    this.clearHidden(!0),
    this.clearSelected(!0),
    this.signalChange_()
},
o3v.Label = function (t, e, i, o, n, s, a) {
    this.currentLabels_ = {},
    this.navigator_ = s,
    this.gestures_ = a,
    this.types_ = {},
    this.types_[o3v.Label.TYPE_SELECT_] = {
        className: "label_select"
    },
    this.types_[o3v.Label.TYPE_SELECT_EXPANDABLE_] = {
        className: "label_select_expandable"
    },
    this.types_[o3v.Label.TYPE_PIN_] = {
        className: "label_pin"
    },
    this.types_[o3v.Label.TYPE_PIN_EXPANDABLE_] = {
        className: "label_pin_expandable"
    },
    this.inputHandler_ = t,
    this.selectManager_ = e,
    this.renderInterface_ = i,
    this.canvas_ = o,
    this.labelContainer_ = n,
    this.showBoundingBox_ = !1
},
o3v.Label.TYPE_SELECT_ = 0;
o3v.Label.TYPE_SELECT_EXPANDABLE_ = 1,
o3v.Label.TYPE_PIN_ = 2,
o3v.Label.TYPE_PIN_EXPANDABLE_ = 3,
o3v.Label.EXPAND_ICON_WIDTH_ = 18,
o3v.Label.INFO_ICON_WIDTH_ = 16,
o3v.Label.CENTER_ICON_WIDTH_ = 16,
o3v.Label.HIDE_ICON_WIDTH_ = 19,
o3v.Label.PIN_ICON_WIDTH_ = 16,
o3v.Label.CLOSE_ICON_WIDTH_ = 16,
o3v.Label.prototype.toggleBoundingBox = function () {
    this.showBoundingBox_ = !this.showBoundingBox_;
    for (var t = 0, t = 0; t < 8; t++) $("#r" + t)[0].style.left = "-100px",
    $("#r" + t)[0].style.top = "-100px"
},
o3v.Label.prototype.reset = function (t) {
    this.entityStore_ = t
},
o3v.Label.prototype.unregisterLabel_ = function (t) {
    this.inputHandler_.unregisterHandler(this.inputHandler_.CLICK, t.dom),
    $(t.dom).remove()
},
o3v.Label.prototype.clearLabels = function () {
    o3v.util.forEach(this.currentLabels_, this.inputHandler.unregisterLabel_.bind(this)),
    this.currentLabels_ = {}
},
o3v.Label.prototype.refresh = function () {
    var t = {};
    for (var e in this.selectManager_.getPinned()) t[e] = this.entityStore_.isSplittable(e) ? {
        type: o3v.Label.TYPE_PIN_EXPANDABLE_
    } : {
        type: o3v.Label.TYPE_PIN_
    };
    if (viewer_.toolMode != o3v.Viewer.TOOL_QUIZ) for (var e in this.selectManager_.getSelected()) t[e] = this.entityStore_.isSplittable(e) ? {
        type: o3v.Label.TYPE_SELECT_EXPANDABLE_
    } : {
        type: o3v.Label.TYPE_SELECT_
    };
    var i = [];
    o3v.util.forEach(this.currentLabels_, function (e, o) {
        t[o] && t[o].type == e.type || i.push(o)
    }, this),
    i.forEach(function (t) {
        this.unregisterLabel_(this.currentLabels_[t]),
        delete this.currentLabels_[t]
    }, this),
    o3v.util.forEach(this.currentLabels_, function (t, e) {
        var i = this.getCoords_(e),
            o = t.dom;
        o.style.left = Math.round(t.x + i[0] - o.offsetWidth / 2) + "px",
        o.style.top = Math.round(t.y + i[1] - o.offsetHeight / 2) + "px"
    }, this),
    o3v.util.forEach(t, function (t, e) {
        if (!this.currentLabels_[e]) {
            var i = this.getCoords_(e),
                o = $._(this.entityStore_.getEntity(e).name),
                n = this.types_[t.type].className,
                s = $('<div id="outer-label">').addClass("outer_label").appendTo(this.labelContainer_),
                a = $('<div id="inner-label">').addClass(n).text(o).appendTo(s),
                r = a.get(0),
                h = s.get(0);
            h.style.left = Math.round(i[0] - h.offsetWidth / 2) + "px",
            h.style.top = Math.round(i[1] - h.offsetHeight / 2) + "px",
            a.mousedown(function (t) {
                    console.log("hey it's a lable got clicked!");
                    console.log(a);
                    r.setCapture ? r.setCapture() : viewer_.inputHandler_.setCaptureHack = a,
                    a.mouseDown = !0,
                    a.startMouseX = t.screenX,
                    a.startMouseY = t.screenY,
                    a.startX = parseInt(h.style.left.substring(0, h.style.left.length - 2)),
                    a.startY = parseInt(h.style.top.substring(0, h.style.top.length - 2))
                }),
            a.hackMove = function (t) {
                    if (a.mouseDown) {
                        var e = t.screenX - a.startMouseX,
                            i = t.screenY - a.startMouseY;
                        a.x = e,
                        a.y = i,
                        h.style.left = Math.round(e + a.startX) + "px",
                        h.style.top = Math.round(i + a.startY) + "px"
                    }
            },
            //a.mousemove(function (t) {
            //        if (a.mouseDown) {
            //            var e = t.screenX - a.startMouseX,
            //                i = t.screenY - a.startMouseY;
            //            a.x = e,
            //            a.y = i,
            //            h.style.left = Math.round(e + a.startX) + "px",
            //            h.style.top = Math.round(i + a.startY) + "px"
            //        }
            //    }),
            a.mouseup(function (t) {
                    console.log("hey it's a lable got up clicked!");
                    r.releaseCapture ? r.releaseCapture() : viewer_.inputHandler_.setCaptureHack = null,
                    a.mouseDown && viewer_.changeCallback(),
                    a.mouseDown = !1,
                    viewer_.inputHandler_.setCaptureHack=0
                }),
            //this.inputHandler_.registerHandler(o3v.InputHandler.CLICK, r, this.makeHandler_(e, r, t.type).bind(this), !0),
            this.currentLabels_[e] = {
                    type: t.type,
                    dom: h,
                    outer: s
                }
        }
    }, this)
},
o3v.Label.prototype.drawGL = function (t) {
    viewer_.explodeRange > .01 || o3v.util.forEach(this.currentLabels_, function (e, i) {
        var o = this.selectManager_.entityStore_.getEntity(i),
            n = viewer_.render_.renderer_.getLeaderPoint(o.externalId, o),
            s = e.dom,
            a = (this.getCoords_(i), parseInt(s.style.left.substring(0, s.style.left.length - 2))),
            r = parseInt(s.style.top.substring(0, s.style.top.length - 2)),
            h = s.children[0].clientWidth,
            l = [a + h / 2, r, 0],
            d = viewer_.render_.renderer_.getModelCoords(l);
        viewer_.annotator.drawLine(t, d, n)
    }, this)
},
o3v.Label.prototype.makeHandler2_ = function (t, e, i) {
    return i == o3v.Label.TYPE_SELECT_ || i == o3v.Label.TYPE_SELECT_EXPANDABLE_ ?
    function (o, n, s) {
        var a = e.getBoundingClientRect();
        if (i == o3v.Label.TYPE_SELECT_EXPANDABLE_ && o - a.left < o3v.Label.EXPAND_ICON_WIDTH_) this.selectManager_.expandSelected(t);
        else if (o > a.right - o3v.Label.CLOSE_ICON_WIDTH_) {
            var r = viewer_.contentManager_.metadata_.entities_[t];
            zg.account.isLiteUser() || (r.ammHidden = !r.ammHidden, r.ammHidden ? viewer_.navUI_.tree_.jstree("uncheck_node", "#ei" + t) : viewer_.navUI_.tree_.jstree("check_node", "#ei" + t)),
            this.selectManager_.unselect(t)
        } else o > a.right - (o3v.Label.PIN_ICON_WIDTH_ + o3v.Label.CLOSE_ICON_WIDTH_) ? this.selectManager_.pin(t) : s[o3v.InputHandler.SHIFT] ? this.selectManager_.pin(t) : this.gestures_.isHideClick(s[o3v.InputHandler.CONTROL], s[o3v.InputHandler.META]) ? this.selectManager_.hide(t) : o3v.util.getObjectCount(this.selectManager_.getSelected()) > 1 ? this.selectManager_.select(t) : this.selectManager_.clearSelected();
        this.selectManager_.haveSelected() ? this.navigator_.goToBBox(this.navigator_.unifyBoundingBoxes(this.selectManager_.getSelected()), !0) : this.navigator_.resetNavParameters()
    } : function (o, n, s) {
        var a = e.getBoundingClientRect();
        i == o3v.Label.TYPE_PIN_EXPANDABLE_ && o - a.left < o3v.Label.EXPAND_ICON_WIDTH_ ? this.selectManager_.expandPinned(t) : this.gestures_.isHideClick(s[o3v.InputHandler.CONTROL], s[o3v.InputHandler.META]) ? this.selectManager_.hide(t) : s[o3v.InputHandler.SHIFT] ? this.selectManager_.unpin(t) : o > a.right - o3v.Label.CLOSE_ICON_WIDTH_ ? this.selectManager_.unpin(t) : (this.selectManager_.select(t), this.selectManager_.haveSelected() ? this.navigator_.goToBBox(this.navigator_.unifyBoundingBoxes(this.selectManager_.getSelected()), !0) : this.navigator_.resetNavParameters())
    }
},
o3v.Label.prototype.makeHandler_ = function (t, e, i) {
    return i == o3v.Label.TYPE_SELECT_ || i == o3v.Label.TYPE_SELECT_EXPANDABLE_ ?
    function (o, n, s) {
        var a = e.getBoundingClientRect(),
            r = a.right - o,
            h = o - a.left;
        if (h >= 0 && r >= 0 && (h -= o3v.Label.INFO_ICON_WIDTH_) < 0) if (i == o3v.Label.TYPE_SELECT_EXPANDABLE_) this.selectManager_.expandSelected(t);
        else {
                var l = e.parentElement,
                    d = $(l).find("#extra");
                if (d.length) d.remove();
                else {
                        var c = this.selectManager_.entityStore_.getEntity(t),
                            u = $('<div id="extra">').addClass("wiki").appendTo(l);
                        u.load("body/wiki/" + c.externalId)
                    }
            }
        if (h >= 0 && r >= 0 && (r -= o3v.Label.CLOSE_ICON_WIDTH_) < 0 && this.selectManager_.unselect(t), h >= 0 && r >= 0 && (r -= o3v.Label.PIN_ICON_WIDTH_) < 0 && this.selectManager_.pin(t), h >= 0 && r >= 0 && (r -= o3v.Label.HIDE_ICON_WIDTH_) < 0) {
                var c = viewer_.contentManager_.metadata_.entities_[t];
                c.ammHidden = !c.ammHidden,
                zg.account.isLiteUser() || (c.ammHidden ? viewer_.navUI_.tree_.jstree("uncheck_node", "#ei" + t) : viewer_.navUI_.tree_.jstree("check_node", "#ei" + t)),
                this.selectManager_.unselect(t)
            }
        if (h >= 0 && r >= 0 && (r -= o3v.Label.HIDE_ICON_WIDTH_) < 0) {
                var c = viewer_.contentManager_.metadata_.entities_[t];
                if (this.selectManager_.haveSelected()) {
                    var p = this.navigator_.focusOnEntitiesNav(viewer_.select_.getSelected());
                    viewer_.navigator_.goToBBoxNav(p, !0)
                }
            }
        h >= 0 && r >= 0 && (s[o3v.InputHandler.SHIFT] ? this.selectManager_.pin(t) : this.gestures_.isHideClick(s[o3v.InputHandler.CONTROL], s[o3v.InputHandler.META]) ? this.selectManager_.hide(t) : o3v.util.getObjectCount(this.selectManager_.getSelected()) > 1 ? this.selectManager_.select(t) : this.selectManager_.clearSelected()),
        this.selectManager_.haveSelected() && this.navigator_.goToBBox(this.navigator_.unifyBoundingBoxes(this.selectManager_.getSelected()), !0)
    } : function (o, n, s) {
        var a = e.getBoundingClientRect(),
            r = a.right - o;
        a.left;
        i == o3v.Label.TYPE_PIN_EXPANDABLE_ && o - a.left < o3v.Label.EXPAND_ICON_WIDTH_ ? this.selectManager_.expandPinned(t) : this.gestures_.isHideClick(s[o3v.InputHandler.CONTROL], s[o3v.InputHandler.META]) ? this.selectManager_.hide(t) : s[o3v.InputHandler.SHIFT] ? this.selectManager_.unpin(t) : (r >= 0 && (r -= o3v.Label.CLOSE_ICON_WIDTH_) < 0 && this.selectManager_.unpin(t), r >= 0 && (r -= o3v.Label.CLOSE_ICON_WIDTH_) < 0 && (this.selectManager_.unpin(t), this.selectManager_.select(t)))
    }
},
o3v.Label.prototype.getCoords_ = function (t) {
    var e = this.selectManager_.entityStore_.getEntity(t),
        i = this.renderInterface_.getViewportCoords(e.ctr),
        o = [e.bbox[0], e.bbox[3]],
        n = [e.bbox[1], e.bbox[4]],
        s = [e.bbox[2], e.bbox[5]],
        a = 0;
    for (var r in o) for (var h in n) for (var l in s) {
            var d = [o[r], n[h], s[l]],
                c = this.renderInterface_.getViewportCoords(d);
            i[1] = Math.max(i[1], c[1]),
            this.showBoundingBox_ && ($("#r" + a)[0].style.left = Math.round(c[0]) + "px", $("#r" + a)[0].style.top = Math.round(c[1]) + "px", a++)
        }
    i[1] += 20;
    var u = this.canvas_.clientHeight - 75;
    return i[1] > u && (i[1] = u),
    i[0] = Math.max(75, i[0]),
    i[0] = Math.min(this.canvas_.clientWidth - 75, i[0]),
    canvasWidth = this.canvas_.clientWidth,
    i[0] > canvasWidth / 2 ? i[0] += canvasWidth / 8 : i[0] < canvasWidth / 2 && (i[0] -= canvasWidth / 8 + 75),
    i
},
o3v.navUI = function (t, e, i) {
    homeBtn = null,
    upBtn = null,
    leftBtn = null,
    rightBtn = null,
    downBtn = null,
    zoomIn = null,
    zoomOut = null,
    this.reset_ = t,
    this.omove_ = e,
    this.ozoom_ = i,
    this.fileNames_ = [],
    this.move_ = function (t, e) {
        void 0 != t && (this.movedx_ = t),
        void 0 != e && (this.movedy_ = e),
        0 == this.movedx_ && 0 == this.movedy_ || (this.omove_(this.movedx_, this.movedy_), setTimeout(this.move_.bind(this), 100))
    },
    this.zoom_ = function (t, e) {
        void 0 != t && (this.zoomdx_ = t),
        void 0 != e && (this.zoomdy_ = e),
        0 == this.zoomdx_ && 0 == this.zoomdy_ || (this.ozoom_(this.zoomdx_, this.zoomdy_), setTimeout(this.zoom_.bind(this), 100))
    };
    var o = {
        position: "absolute",
        width: "20px",
        height: "20px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    };
 
    this.screenShot = $("<div>").appendTo("body").css(o).css({
        left: "49.3%",
        top: "1px",
        display: "none"
    }).button({
        icons: {
            primary: "ui-icon-image"
        },
        text: !1
    }).click(function () {
        if (void 0 == account || "professional" != account.account_type) return void alert("'This feature requires a professional subscription.'");
        new zg.Paint
    }.bind(this)),
    this.navHome = $("<div>").appendTo("body").css(o).css({
        left: "32px",
        top: "64px"
    }).button({
        icons: {
            primary: "ui-icon-home"
        },
        text: !1
    }).click(function () {
        this.reset_()
    }.bind(this));
    var n = this.navHome.get(0);
    //if(false)
    this.navUp = $("<div>").appendTo("body").css(o).button({
        icons: {
            primary: "ui-icon-triangle-1-n"
        },
        text: !1
    }).position({
        my: "bottom",
        at: "top",
        of: n,
        collision: "none"
    }).mousedown(function () {
        this.move_(0, -o3v.navUI.MOVE_FACTOR)
    }.bind(this)).mouseup(function () {
        this.move_(0, 0)
    }.bind(this)),
    this.navLeft = $("<div>").appendTo("body").css(o).button({
        icons: {
            primary: "ui-icon-triangle-1-w"
        },
        text: !1
    }).position({
        my: "right",
        at: "left",
        of: n,
        collision: "none"
    }).mousedown(function () {
        this.move_(-o3v.navUI.MOVE_FACTOR, 0)
    }.bind(this)).mouseup(function () {
        this.move_(0, 0)
    }.bind(this)),
    this.navRight = $("<div>").appendTo("body").css(o).button({
        icons: {
            primary: "ui-icon-triangle-1-e"
        },
        text: !1
    }).position({
        my: "left",
        at: "right",
        of: n,
        collision: "none"
    }).mousedown(function () {
        this.move_(o3v.navUI.MOVE_FACTOR, 0)
    }.bind(this)).mouseup(function () {
        this.move_(0, 0)
    }.bind(this)),
    this.navDown = $("<div>").appendTo("body").css(o).button({
        icons: {
            primary: "ui-icon-triangle-1-s"
        },
        text: !1
    }).position({
        my: "top",
        at: "bottom",
        of: n,
        collision: "none"
    }).mousedown(function () {
        this.move_(0, o3v.navUI.MOVE_FACTOR)
    }.bind(this)).mouseup(function () {
        this.move_(0, 0)
    }.bind(this)),
    this.navZoomIn = $("<div>").appendTo("body").css(o).button({
        icons: {
            primary: "ui-icon-plus"
        },
        text: !1
    }).position({
        my: "top",
        at: "bottom",
        of: this.navDown.get(0),
        offset: "10 7",
        collision: "none"
    }).mousedown(function () {
        this.zoom_(0, o3v.navUI.ZOOM_FACTOR)
    }.bind(this)).mouseup(function () {
        this.zoom_(0, 0)
    }.bind(this)),
    this.navZoomOut = $("<div>").appendTo("body").css(o).button({
        icons: {
            primary: "ui-icon-minus"
        },
        text: !1
    }).position({
        my: "right",
        at: "left",
        of: this.navZoomIn.get(0),
        collision: "none"
    }).mousedown(function () {
        this.zoom_(0, -o3v.navUI.ZOOM_FACTOR)
    }.bind(this)).mouseup(function () {
        this.zoom_(0, 0)
    }.bind(this)),
    this.navReset0 = zg.PushButton({
        label: "Unhide All"
    }, {
        right: "155px",
        top: "58px",
        width: "77px"
    }, function () {
        for (var t = viewer_.contentManager_.metadata_, e = t.layerNames_, i = 0; i < e.length; i++) {
            var o = e[i],
                n = t.layerNameToId_[o];
            o3v.recurseHide(n, !1)
        }
        this.heirachyUI(),
        viewer_.changeCallback()
    }.bind(this)),
    this.navHelp = zg.PushButton({
        icons: {
            primary: "ui-icon-zgvideo"
        },
        text: !1
    }, {
        right: "16px",
        top: "58px",
        width: "26px",
        height: "26px"
    }, function () {
        window.open("http://www.youtube.com/watch?v=M5TysvPJMVo", "_blank")
    }.bind(this)),
    this.navMode = zg.RadioButtons([{
        label: "Capsule",
        css: {
            width: "62px"
        }
    },
    {
        label: "Orbit",
        css: {
            width: "48px"
        }
    }], {}, {}, function (t) {
        var e = $(this).find(".ui-state-active").attr("id"),
            i = e.length > 0 && "1" == e[e.length - 1];
        if (0 != i && (void 0 == account || void 0 == account.account_type || "lite" == account.account_type)) return viewer_.navUI_.didWarn || alert("A paid subscription is required to use this feature."),
        viewer_.navUI_.didWarn = !0,
        void setTimeout(function () {
                viewer_.navUI_.pressFirstRadio(viewer_.navUI_.navMode)
            }, 100);
        viewer_.navigator_.setOrbitMode(i),
        0 == i && viewer_.navigator_.resetNavParameters()
    }),
    this.navMode.css({
        position: "absolute",
        right: "38px",
        width: "117px",
        top: "58px"
    }),
    this.navPresets = null,
    this.rightPane = new zg.Accordion,
    this.SECTION_SAVES = this.rightPane.sections.length,
    this.rightPane.AddSection("My Scenes", "http://www.youtube.com/watch?v=1WeKJcTPM50"),
    this.SECTION_PRESETS = this.rightPane.sections.length,
    this.rightPane.AddSection("Zygote Scenes", "http://www.youtube.com/watch?v=1WeKJcTPM50"),
    this.SECTION_HIERARCHY = this.rightPane.sections.length,
    this.rightPane.AddSection("Hierarchy", "http://www.youtube.com/watch?v=EV0sUi01qKs"),
    this.SECTION_ANNOTATIONS = this.rightPane.sections.length,
    this.rightPane.AddSection("Annotations", "http://www.youtube.com/watch?v=KmscL8oH11Y"),
    this.SECTION_TOOLS = this.rightPane.sections.length,
    this.rightPane.AddSection("Tools", "http://www.youtube.com/watch?v=nREdqCM8RXs"),
    this.rightPane.Create("body", {
        right: "16px",
        top: "89px",
        width: "218px"
    }),
    
    
    this.freeRide = [], 
    this.paidFor = [],
    this.heirachy = $('<div id="demo1"></div>').appendTo("#" + this.rightPane.sections[this.SECTION_HIERARCHY].divId),
    this.paidFor.push(this.heirachy),
    this.annotateBtn = zg.PushButton({
        label: "Create"
    }, {
        width: "53%"
    }, function () {
        var t = (viewer_.annotator.create(), this.annotateMode.attr("id")),
            e = "l" + t + "item1";
        document.getElementById(e).click()
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_ANNOTATIONS].divId),
    this.paidFor.push(this.annotateBtn),
    this.annotateDeleteBtn = zg.PushButton({
        label: "Erase All"
    }, {
        width: "43%"
    }, function () {
        confirm("Delete all annotations?") && viewer_.annotator.deleteAll()
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_ANNOTATIONS].divId),
    this.paidFor.push(this.annotateDeleteBtn),
    this.annotateMode = zg.RadioButtons([{
        label: "Lock"
    },
    {
        label: "Move"
    }], {}, {
        width: "54%"
    }, function (t) {
        var e = $(this).find(".ui-state-active").attr("id"),
            i = e.length > 0 && "1" == e[e.length - 1];
        viewer_.annotator.setLock(!i)
    }, "#" + this.rightPane.sections[this.SECTION_ANNOTATIONS].divId),
    this.paidFor.push(this.annotateMode),
    this.toolMode = zg.RadioButtons([{
        label: "Pick",
        css: {
            width: "23%"
        }
    },
    {
        label: "Slice",
        css: {
            width: "24%"
        }
    },
    {
        label: "Explode",
        css: {
            width: "31%"
        }
    },
    {
        label: "Quiz",
        css: {
            width: "22%"
        }
    }], {}, {
        width: "97%"
    }, function (t) {
        var e = $(this.toolMode).find(".ui-state-active").attr("id"),
            i = e[e.length - 1] - "0";
        switch (this.sliderLabel.hide(), this.slider.hide(), this.sliceXMode.hide(), this.sliceYMode.hide(), this.sliceZMode.hide(), i) {
            case 0:
                viewer_.toolMode = 1;
                break;
            case 1:
                viewer_.toolMode = 2,
                this.sliceXMode.show(),
                this.sliceYMode.show(),
                this.sliceZMode.show();
                break;
            case 2:
                viewer_.toolMode = 3,
                this.sliderLabel.show(),
                this.slider.show();
                break;
            case 3:
                viewer_.toolMode = 4
            }
        viewer_.changeCallback()
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.paidFor.push(this.toolMode),
    $("<br><br>").appendTo("#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.sliderLabel = zg.Label({
        label: "Strength"
    }, {
        width: "90%",
        "text-align": "center",
        margin: "0px auto 5px",
        display: "block"
    }, function (t, e) {}, "#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.paidFor.push(this.sliderLabel),
    this.slider = zg.Slider({
        label: "Create"
    }, {
        width: "90%",
        "margin-left": "auto",
        "margin-right": "auto",
        display: "none"
    }, function (t, e) {
        viewer_.explodeRange = e.value,
        viewer_.changeCallback()
    }, "#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.sliderLabel.hide(),
    this.slider.hide(),
    this.paidFor.push(this.slider),
    this.sliceXMode = zg.RadioButtons([{
        label: "Off",
        css: {
            width: "20%"
        }
    },
    {
        label: "Right",
        css: {
            width: "30%"
        }
    },
    {
        label: "Left",
        css: {
            width: "30%"
        }
    }], {}, {
        width: "97%"
    }, function (t) {
        var e = $(this.sliceXMode).find(".ui-state-active").attr("id"),
            i = e[e.length - 1] - "0";
        viewer_.sliceX = -1 * (2 != i ? i : -1),
        viewer_.changeCallback()
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    $("<br>").appendTo("#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.sliceYMode = zg.RadioButtons([{
        label: "Off",
        css: {
            width: "20%"
        }
    },
    {
        label: "Bottom",
        css: {
            width: "30%"
        }
    },
    {
        label: "Top",
        css: {
            width: "30%"
        }
    }], {}, {
        width: "97%"
    }, function (t) {
        var e = $(this.sliceYMode).find(".ui-state-active").attr("id"),
            i = e[e.length - 1] - "0";
        viewer_.sliceY = -1 * (2 != i ? i : -1),
        viewer_.changeCallback()
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    $("<br>").appendTo("#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.sliceZMode = zg.RadioButtons([{
        label: "Off",
        css: {
            width: "20%"
        }
    },
    {
        label: "Back",
        css: {
            width: "30%"
        }
    },
    {
        label: "Front",
        css: {
            width: "30%"
        }
    }], {}, {
        width: "97%"
    }, function (t) {
        var e = $(this.sliceZMode).find(".ui-state-active").attr("id"),
            i = e[e.length - 1] - "0";
        viewer_.sliceZ = -1 * (2 != i ? i : -1),
        viewer_.changeCallback()
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    $("<br>").appendTo("#" + this.rightPane.sections[this.SECTION_TOOLS].divId),
    this.sliceXMode.hide(),
    this.sliceYMode.hide(),
    this.sliceZMode.hide(),
    this.fileSaveBtn = zg.PushButton({
        label: "Save"
    }, {
        width: "29%",
        float: "right"
    }, function () {
        var t = prompt("Name?");
        if (t && (-1 == this.fileNames_.indexOf(t) || confirm("File by that name already exists. \nSave over existing " + t + "?"))) {
            var e = "/scenes/" + t + ".json";
            zg.save(e, this.folderUpdate.bind(this))
        }
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_SAVES].divId),
    this.paidFor.push(this.fileSaveBtn),
    this.fileResetBtn = zg.PushButton({
        label: "Reset"
    }, {
        width: "29%"
    }, function () {
        if (confirm("Reset Scene?")) {
            viewer_.annotator.deleteAll(),
            this.reset_(),
            viewer_.select_.clearSelection(),
            viewer_.select_.clearPinned(!0);
            var t = viewer_.contentManager_.metadata_;
            viewer_.opacity_.reset(t),
            viewer_.layersUI_.restoreState("1,1,10000"),
            viewer_.navUI_.resetTools(),
            viewer_.resetTools();
            for (var e = t.layerNames_, i = 0; i < e.length; i++) {
                var o = e[i],
                    n = t.layerNameToId_[o];
                o3v.recurseHide(n, !1)
            }
            this.heirachyUI()
        }
    }.bind(this), "#" + this.rightPane.sections[this.SECTION_SAVES].divId),
    this.paidFor.push(this.fileResetBtn),
    $("<div></div>").appendTo("#" + this.rightPane.sections[this.SECTION_SAVES].divId).css({
        clear: "both"
    }),
    this.fileSelection = [],
    this.fileList = zg.List([], {
        width: "100%"
    }, null, "#" + this.rightPane.sections[this.SECTION_SAVES].divId),
    this.fileList.on("selectableselected", function (t, e) {
        if (!this.blockLoad) {
            this.blockLoad = !0,
            setTimeout(function () {
                this.blockLoad = !1
            }.bind(this), 1e3);
            var i = e.selected,
                o = zg.extractName(i.innerHTML),
                n = "/scenes/" + o + ".json";
            setTimeout(function () {
                    confirm("Load " + o + "?") && (viewer_.navUI_.resetTools(), viewer_.resetTools(), zg.load(n)),
                    $("#" + viewer_.navUI_.fileList[0].id + " .ui-selected").removeClass("ui-selected")
                }, 100)
        }
    }.bind(this)),
    this.paidFor.push(this.fileList),
    $("<div></div>").appendTo("#" + this.rightPane.sections[this.SECTION_SAVES].divId).css({
        height: "8px"
    }),
    this.zygoteList = zg.List([], {
        width: "100%"
    }, null, "#" + this.rightPane.sections[this.SECTION_PRESETS].divId),
    this.zygoteList.on("selectableselected", function (t, e) {
        if (!this.blockLoad) {
            this.blockLoad = !0,
            setTimeout(function () {
                this.blockLoad = !1
            }.bind(this), 1e3);
            var i = e.selected,
                o = zg.extractName(i.innerHTML),
                n = "/zygote_scenes/" + o + ".json";
            setTimeout(function () {
                    confirm("Load " + o + "?") && (viewer_.navUI_.resetTools(), viewer_.resetTools(), zg.load(n)),
                    $("#" + viewer_.navUI_.zygoteList[0].id + " .ui-selected").removeClass("ui-selected")
                }, 100)
        }
    }.bind(this)),
    $("<div></div>").appendTo("#" + this.rightPane.sections[this.SECTION_PRESETS].divId).css({
        height: "8px"
    }),
    this.paidFor.push(this.zygoteList),
    this.refresh(),
    this.created = !0
},
o3v.navUI.prototype.pressFirstRadio = function (t) {
    var e = $(t).attr("id"),
        i = e + "item0";
    $(t).find("#" + i).click()
},
o3v.navUI.prototype.pressRadio = function (t, e) {
    var i = $(t).attr("id"),
        o = i + "item" + e;
    $(t).find("#" + o).click()
},
o3v.navUI.prototype.resetTools = function () {
    this.pressFirstRadio(this.toolMode),
    this.pressFirstRadio(this.sliceXMode),
    this.pressFirstRadio(this.sliceYMode),
    this.pressFirstRadio(this.sliceZMode)
},
zg.extractName = function (t) {
    var e = t.indexOf("<div");
    return -1 != e && (t = t.substring(0, e)),
    t
},
o3v.navUI.prototype.refresh = function () {
    if (void 0 == account || void 0 == account.account_type || "lite" == account.account_type) {
        this.created && this.resetTools(),
        this.sliceXMode.hide(),
        this.sliceYMode.hide(),
        this.sliceZMode.hide();
        for (var t = 0; t < this.freeRide.length; t++) this.freeRide[t].show();
        for (var t = 0; t < this.paidFor.length; t++) this.paidFor[t].hide()
    } else {
        for (var t = 0; t < this.freeRide.length; t++) this.freeRide[t].hide();
        for (var t = 0; t < this.paidFor.length; t++) this.paidFor[t].show()
    }
    this.folderUpdate(),
    this.heirachyUI()
},
o3v.navUI.prototype.folderUpdate = function () {
    //zg.account.listFolder("/scenes", this.folderListCallback.bind(this)),
    //zg.account.listFolder("/zygote_scenes", this.zygoteListCallback.bind(this))
},
o3v.navUI.prototype.folderListCallback = function (t) {
    if (this.fileNames_ = [], zg.ListClear(this.fileList), t.files) for (var e = 0; e < t.files.length; e++) {
        var i = t.files[e],
            o = i.name.substr(0, i.name.length - 5);
        this.fileNames_.push(o),
        zg.ListAdd(this.fileList, o, function (t, e) {
                var i = t[0],
                    o = zg.extractName(i.innerHTML),
                    n = "/scenes/" + o + ".json";
                confirm("Delete " + o + "?") && (zg.account.removeFile(n, function () {}), t.remove())
            })
    }
},
o3v.navUI.prototype.zygoteListCallback = function (t) {
    if (zg.ListClear(this.zygoteList), t.files) for (var e = 0; e < t.files.length; e++) {
        var i = t.files[e],
            o = i.name.substr(0, i.name.length - 5);
        zg.ListAdd(this.zygoteList, o)
    }
},
o3v.navUI.prototype.presetsUI = function (t) {},
o3v.navUI.prototype.heirachyUI = function () {
    if (void 0 != account && ("premium" == account.account_type || "professional" == account.account_type)) {
        viewer_.ui_.showLoadingFeedback(!0);
        var t = {
            object: this,
            meta: viewer_.contentManager_.metadata_,
            i: 0,
            result: [],
            onIterate: function (t) {
                var e = t.meta,
                    i = t.i,
                    o = e.layerNames_,
                    n = o[i],
                    s = e.layerNameToId_[n],
                    a = e.entities_[s],
                    r = "jstree-checked";
                a.ammHidden && (r = "jstree-unchecked");
                var h = {
                        data: n,
                        metadata: {
                            mid: s
                        },
                        attr: {
                            id: "ei" + s,
                            class: r
                        }
                    },
                    l = t.object.recurseHeirachy(e, s);
                l && l.data.length > 0 && (h.children = l.data),
                l.checked != r && (h.attr.class = "jstree-undetermined"),
                t.result.push(h),
                t.i++,
                updateProgress(o.length - t.i, o.length + 1),
                t.i == o.length ? setTimeout(function () {
                        t.onFinish(t)
                    }, 50) : setTimeout(function () {
                        t.onIterate(t)
                    }, 50)
            },
            onFinish: function (t) {
                var e = t.result;
                t.object.tree_ = t.object.heirachy.css({
                    "max-height": "300px"
                }).jstree({
                    json_data: {
                        data: e
                    },
                    themes: {
                        icons: !1
                    },
                    plugins: ["themes", "json_data", "ui", "crrm", "checkbox"],
                    core: {
                        initially_open: ["phtml_1"]
                    }
                }).bind("select_node.jstree", function (t, e) {
                    for (var i = viewer_.navUI_.tree_.jstree("get_selected", null, !0), o = [], n = 0; n < i.length; n++) {
                        var s = i[n];
                        o.push($(s).data().mid)
                    }
                    viewer_.select_.selectMultiple(o)
                }).bind("deselect_node.jstree", function (t, e) {
                    for (var i = viewer_.navUI_.tree_.jstree("get_selected", null, !0), o = [], n = 0; n < i.length; n++) {
                        var s = i[n];
                        o.push($(s).data().mid)
                    }
                    0 == o.length ? viewer_.select_.clearSelected() : viewer_.select_.selectMultiple(o)
                }).bind("check_node.jstree", function (t, e) {
                    var i = $(e.rslt.obj).data().mid;
                    o3v.recurseHide(i, !1),
                    viewer_.changeCallback()
                }).bind("uncheck_node.jstree", function (t, e) {
                    var i = $(e.rslt.obj).data().mid;
                    o3v.recurseHide(i, !0),
                    viewer_.changeCallback()
                }),
                t.object.folderUpdate(),
                viewer_.ui_.showLoadingFeedback(!1)
            }
        };
        t.onIterate(t)
    }
},
o3v.recurseHide = function (t, e) {
    var i = viewer_.contentManager_.metadata_.entities_[t];
    i.ammHidden = e;
    var o = i.childIds;
    for (var n in o) this.recurseHide(n, e)
},
o3v.navUI.prototype.resetPresetsUI = function () {},
o3v.navUI.prototype.modelsUI = function (t) {},
o3v.navUI.prototype.buildHeirachy = function (t) {
    for (var e = [], i = t.layerNames_, o = 0; o < i.length; o++) {
        var n = i[o],
            s = t.layerNameToId_[n],
            a = t.entities_[s],
            r = "jstree-checked";
        a.ammHidden && (r = "jstree-unchecked"),
        r = "jstree-undetermined";
        var h = {
                data: n,
                metadata: {
                    mid: s
                },
                attr: {
                    id: "ei" + s,
                    class: r
                }
            },
            l = this.recurseHeirachy(t, s);
        l && l.length > 0 && (h.children = l),
        e.push(h)
    }
    return e
},
o3v.navUI.prototype.buildHeirachyAux = function (t) {},
o3v.navUI.prototype.recurseHeirachy = function (t, e, i) {
    var o = {
        data: [],
        checked: ""
    },
        n = t.entities_[e],
        s = n.childIds,
        a = null;
    for (var r in s) {
            var h = t.entities_[r],
                l = h.externalId;
            l = void 0 == l ? r : l.replace("_", " ", "g");
            var d = "jstree-checked";
            h.ammHidden && (d = "jstree-unchecked");
            var c = {
                    data: l,
                    metadata: {
                        mid: r
                    },
                    attr: {
                        id: "ei" + r,
                        class: d
                    }
                },
                u = this.recurseHeirachy(t, r);
            u.data && u.data.length > 0 && (c.children = u.data, u.checked != d && (c.attr.class = "jstree-undetermined")),
            null == a ? o.checked = d : d != a && (o.checked = "jstree-undetermined"),
            o.data.push(c),
            a = d
        }
    return o
},
o3v.navUI.MOVE_FACTOR = 15,
o3v.navUI.ZOOM_FACTOR = 100,
o3v.math = {},
o3v.math.subVector = function (t, e) {
    for (var i = [], o = t.length, n = 0; n < o; ++n) i[n] = t[n] - e[n];
    return i
},
o3v.math.degToRad = function (t) {
    return t * Math.PI / 180
},
o3v.math.dot = function (t, e) {
    for (var i = 0, o = t.length, n = 0; n < o; ++n) i += t[n] * e[n];
    return i
},
o3v.math.cross = function (t, e) {
    return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
},
o3v.math.normalize = function (t) {
    for (var e = [], i = 0, o = t.length, n = 0; n < o; ++n) i += t[n] * t[n];
    if ((i = Math.sqrt(i)) > 1e-5) for (var n = 0; n < o; ++n) e[n] = t[n] / i;
    else e = [0, 0, 0];
    return e
},
o3v.Navigator = function (t, e, i) {
    this.changeCallback_ = t,
    this.canvas_ = e,
    this.rootBbox_ = null,
    this.camera = {},
    this.originCamera = {},
    this.rotationStartPercent = .01,
    this.entityCapsule = !1,
    this.interpolants = [],
    this.dolly = {},
    this.theta = {},
    this.extra = {},
    this.phi = 0,
    this.pre = new Float32Array(16),
    this.pre0 = new Float32Array(16),
    this.start = [0, 0],
    mat4.identity(this.pre),
    this.rotationReduction = .01,
    this.zoomReduction = .05,
    this.verticalReduction = .1,
    this.verticalAdjustmentPercent = .9,
    this.verticalAdjustment = 100,
    this.vertMaxLimit = {},
    this.vertMinLimit = {},
    this.zoomNearLimit = -10,
    this.zoomFarLimit = 300,
    this.startPan = .1,
    this.center = [0, 0, 0],
    this.cameraTargetX = {},
    this.cameraTargetY = {},
    this.cameraTargetZ = {},
    this.z_dist = 0,
    this.doOrbit = !1,
    this.orbitOffsetY = 0,
    this.capsulePhi = 0,
    this.sagittalPlane = 0,
    this.coronalPlane = -1,
    this.artisticOffset = .2,
    this.lengthRatioComparison = .75,
    this.minimumCapsuleHeight = 3,
    this.minZoomValue = 10,
    this.maxZoomValue = 100,
    this.zoomAmplificationFactor = 1.5,
    this.zoomPercent = .75,
    this.M_PI = Math.PI,
    this.M_2PI = 2 * Math.PI,
    this.theta = new o3v.Interpolant(Math.PI / 2, this.interpolants),
    this.dolly.x = new o3v.Interpolant(0, this.interpolants),
    this.dolly.y = new o3v.Interpolant(120, this.interpolants),
    this.dolly.z = new o3v.Interpolant(160, this.interpolants),
    this.extra.x = new o3v.Interpolant(0, this.interpolants),
    this.extra.y = new o3v.Interpolant(0, this.interpolants),
    this.extra.z = new o3v.Interpolant(0, this.interpolants),
    this.extra.ry = new o3v.Interpolant(0, this.interpolants),
    this.offset = [0, 0, 0],
    this.initializeCamera(),
    this.state_ = "",
    this.history = i,
    this.history.register("nav", this.getState.bind(this), this.restoreState.bind(this))
},
o3v.Navigator.prototype.getCamera = function () {
    return this.camera
},
o3v.Navigator.prototype.setOriginCameraAndModelRoot = function (t) {
    var e = .5 * (t[3] + t[0]),
        i = .5 * (t[4] + t[1]),
        o = .5 * (t[5] + t[2]);
    this.camera = {
            eye: new Float32Array([e, i, 160]),
            target: new Float32Array([e, i, o]),
            up: new Float32Array([0, 1, 0]),
            fov: 40,
            pre: this.pre
        },
    this.resetModel(t)
},
o3v.Navigator.prototype.resetModel = function (t) {
    this.rootBbox_ = t,
    this.resetNavParameters()
},
o3v.Navigator.prototype.reset = function (t) {
    this.extra.x.setFuture(0),
    this.extra.y.setFuture(0),
    this.extra.z.setFuture(0),
    this.extra.ry.setFuture(0);
    var e = this.calculateNavigateValues(this.rootBbox_);
    this.doNavigate2(e.x, e.y, e.z, 0, 0, 0, 0, t),
    this.resetNavParameters()
},
o3v.Navigator.prototype.initializeCamera = function () {
    this.vertMaxLimit = new o3v.Interpolant(150, this.interpolants),
    this.vertMinLimit = new o3v.Interpolant(0, this.interpolants),
    this.cameraTargetX = new o3v.Interpolant(0, this.interpolants),
    this.cameraTargetY = new o3v.Interpolant(0, this.interpolants),
    this.cameraTargetZ = new o3v.Interpolant(0, this.interpolants),
    this.setOriginCameraAndModelRoot([-200, -200, -200, -200, -200, -200])
},
o3v.Navigator.prototype.setNavParametersToBbox = function (t) {
    var e = new Float32Array(3);
    e[0] = .5 * (t[0] + t[3]),
    e[1] = .5 * (t[1] + t[4]),
    e[2] = .5 * (t[2] + t[5]),
    this.setNavParameters(t[4], t[1], this.zoomNearLimit, this.zoomFarLimit, e, 0)
},
o3v.Navigator.prototype.resetNavParameters = function () {
    var t = this.rootBbox_;
    t && (this.setNavParametersToBbox(t), mat4.identity(this.pre), this.changeCallback_(!0))
},
o3v.Navigator.prototype.setNavParameters = function (t, e, i, o, n, s) {
    var a = t,
        r = e,
        h = t - e;
    if (h < this.minimumCapsuleHeight) {
            var l = (this.minimumCapsuleHeight - h) / 2;
            a += l,
            r -= l
        }
    this.vertMaxLimit.setFuture(a),
    this.vertMinLimit.setFuture(r),
    this.verticalAdjustment = this.verticalAdjustmentPercent * (t - e),
    this.zoomNearLimit = i,
    this.zoomFarLimit = o;
    var d = n[0],
        c = n[1],
        u = n[2];
    this.cameraTargetX.setFuture(d),
    this.cameraTargetY.setFuture(c),
    this.cameraTargetZ.setFuture(u),
    this.center = n,
    this.z_dist = s
},
o3v.Navigator.prototype.getState = function () {
    return this.state_
},
o3v.Navigator.prototype.restoreState = function (t) {
    if (t) {
        var e = t.split(",");
        0 != parseFloat(e[3]) || 0 != parseFloat(e[4]) || 0 != parseFloat(e[5]) || 0 != parseFloat(e[6]) ? (viewer_.navUI_.pressRadio(viewer_.navUI_.navMode, 1), this.doOrbit = !0) : (viewer_.navUI_.pressRadio(viewer_.navUI_.navMode, 0), this.doOrbit = !1),
        this.doNavigate2(parseFloat(e[0]), parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]), parseFloat(e[4]), parseFloat(e[5]), parseFloat(e[6]), !1)
    } else this.reset(!1)
},
o3v.Navigator.prototype.projectedMinMax = function (t, e) {
    for (var i = [
        [t[0], t[1], t[2]],
        [t[0], t[4], t[2]],
        [t[0], t[1], t[5]],
        [t[0], t[4], t[5]],
        [t[3], t[1], t[2]],
        [t[3], t[4], t[2]],
        [t[3], t[1], t[5]],
        [t[3], t[4], t[5]]
    ], o = [], n = 0; n < 8; n++) {
        var s = o3v.math.subVector(i[n], this.camera.eye);
        o[n] = o3v.math.dot(e, s)
    }
    for (var a = -Number.MAX_VALUE, r = Number.MAX_VALUE, n = 0; n < 8; n++) a = Math.max(a, o[n]),
    r = Math.min(r, o[n]);
    return a - r
},
o3v.Navigator.prototype.unifyBoundingBoxes = function (t) {
    var e;
    return o3v.log.info("focusing on entities", t),
    o3v.util.forEach(t, function (t) {
        e = o3v.growBBox(e, t.bbox)
    }),
    e
},
o3v.Navigator.prototype.focusOnEntities = function (t) {
    var e;
    return o3v.util.isEmpty(t) ? (o3v.log.info("focusOnEntities empty; resetting view"), this.resetNavParameters()) : (o3v.log.info("focusing on entities", t), e = this.unifyBoundingBoxes(t)),
    e
},
o3v.Navigator.prototype.focusOnEntitiesNav = function (t) {
    var e;
    return o3v.util.isEmpty(t) ? (o3v.log.info("focusOnEntities empty; resetting view"), this.resetNavParameters()) : (o3v.log.info("focusing on entities", t), e = this.unifyBoundingBoxes(t), this.setNavParametersToBbox(e)),
    e
},
o3v.Navigator.prototype.goToBBox = function (t, e) {
    this.doOrbit
},
o3v.Navigator.prototype.goToBBoxNav = function (t, e) {
    var i = this.calculateNavigateValues(t, e);
    this.doNavigate(i.x, i.y, i.z, 0, 0, 0, 0, !1),
    this.extra.x.setFuture(0),
    this.extra.y.setFuture(0),
    this.extra.z.setFuture(0),
    this.extra.ry.setFuture(0)
},
o3v.Navigator.prototype.calculateNavigateValues = function (t, e) {
    var i = t[0] - t[3],
        o = (t[1], t[4], t[2] - t[5]);
    o3v.log.info("center", this.center);
    var n = .5 * (t[0] + t[3]),
        s = .5 * (t[1] + t[4]),
        a = .5 * (t[2] + t[5]),
        r = Math.sqrt(n * n + a * a),
        h = Math.atan2(i, o),
        l = i / o;
    o3v.log.info("ratio: ", l),
    o3v.log.info("cz: ", a),
    l > this.lengthRatioComparison ? (h = Math.PI / 2, a < this.coronalPlane && (h = -Math.PI / 2)) : (h = 0, n < this.sagittalPlane && (h = Math.PI)),
    l > 1 && n > this.sagittalPlane || l < 1 && n < this.sagittalPlane ? h -= this.artisticOffset : h += this.artisticOffset;
    var d = this.projectedMinMax(t, this.camera.up),
        c = this.zoomPercent * o3v.math.degToRad(this.camera.fov),
        u = d / Math.tan(c),
        p = o3v.math.cross(this.camera.up, o3v.math.subVector(this.camera.eye, this.camera.target));
    p = o3v.math.normalize(p);
    var v = this.projectedMinMax(t, p),
        _ = this.zoomPercent * o3v.math.degToRad(this.camera.fov * this.canvas_.clientWidth / this.canvas_.clientHeight),
        g = v / Math.tan(_),
        y = Math.max(u, g),
        f = (y - this.minZoomValue) / (this.maxZoomValue - this.minZoomValue);
    f = Math.max(0, Math.min(1, f));
    var m = f * (1 - 1 / this.zoomAmplificationFactor) + 1 / this.zoomAmplificationFactor,
        I = Math.max(this.minZoomValue, y),
        b = I / m,
        E = s,
        M = r + b;
    return e && (h = this.theta.getFuture(), M = this.dolly.z.getFuture()),
    {
            x: h,
            y: E,
            z: M
        }
},
o3v.Navigator.prototype.absClamp = function (t, e) {
    var i = t;
    return i > e ? i = e : i < -e && (i = -e),
    i
},
o3v.Navigator.prototype.absLimit = function (t, e, i) {
    return t < e && t > -e ? i : t
},
o3v.Navigator.prototype.setOrbitMode = function (t) {
    this.doOrbit = t,
    t || (this.extra.x.setFuture(0), this.extra.y.setFuture(0), this.extra.z.setFuture(0), this.extra.ry.setFuture(0), this.doNavigateDelta(0, 0, 0, !0, 0, 0, 0)),
    this.changeCallback_(!0)
},
o3v.Navigator.prototype.recalculate = function () {
    var t = o3v.Interpolant.tweenAll(this.interpolants),
        e = this.theta.getPresent(),
        i = this.dolly.z.getPresent(),
        o = this.dolly.y.getPresent(),
        n = this.vertMaxLimit.getPresent(),
        s = this.vertMinLimit.getPresent(),
        a = this.extra.x.getPresent(),
        r = this.extra.y.getPresent(),
        h = this.extra.z.getPresent(),
        l = i * Math.cos(e) + this.cameraTargetX.getPresent(),
        d = o,
        c = i * Math.sin(e) + this.cameraTargetZ.getPresent(),
        u = o,
        p = n - s,
        v = this.rotationStartPercent * p,
        _ = 0,
        g = d,
        y = n - v,
        f = s + v,
        m = this.extra.ry.getPresent();
    if (d < f ? (_ = -1, u = f, g = this.absClamp(v + (s - d), this.verticalAdjustment + v)) : d > y && (_ = 1, u = y, g = this.absClamp(v - (n - d), this.verticalAdjustment + v)), _ || this.doOrbit) {
            var I = m;
            _ && !this.doOrbit && (this.capsulePhi = _ * Math.PI / 2 * (g / (this.verticalAdjustment + v)), I += this.capsulePhi),
            this.doOrbit && (I = this.capsulePhi + m),
            this.orbitPhi = m,
            l *= Math.cos(I),
            d = u + i * Math.sin(I),
            c *= Math.cos(I);
            var b = Math.PI / 2 - I;
            this.camera.up = [-Math.cos(e) * Math.cos(b), Math.sin(b), -Math.sin(e) * Math.cos(b)]
        } else this.camera.up = [0, 1, 0];
    return this.camera.eye = [l + a, d + r, c + h],
    this.camera.target = [this.center[0] + a, u + r, this.center[2] + h],
    this.camera.pre = this.pre,
    t
},
o3v.Navigator.prototype.doNavigate = function (t, e, i, o, n, s, a, r, h, l) {
    var d = !1;
    o || (o = 0),
    n || (n = 0),
    s || (s = 0),
    a || (a = 0),
    this.doOrbit && (l && l.ctrlKey && (d = !0), d ? (this.extra.x.setFuture(o), this.extra.y.setFuture(n), this.extra.z.setFuture(s)) : this.extra.ry.setFuture(a));
    var c = this.vertMinLimit.getFuture() - this.verticalAdjustment,
        u = this.vertMaxLimit.getFuture() + this.verticalAdjustment;
    d || this.theta.setFuture(t),
    e < c && (e = c),
    e > u && (e = u),
    this.doOrbit || this.dolly.y.setFuture(e),
    i < this.zoomNearLimit && (i = this.zoomNearLimit),
    i > this.zoomFarLimit && (i = this.zoomFarLimit),
    this.dolly.z.setFuture(i),
    this.changeCallback_(),
    this.state_ = [Math.round(100 * t) / 100, Math.round(100 * e) / 100, Math.round(100 * i) / 100, Math.round(100 * o) / 100, Math.round(100 * n) / 100, Math.round(100 * s) / 100, Math.round(100 * a) / 100].join(","),
    r && this.history.update()
},
o3v.Navigator.prototype.doNavigate2 = function (t, e, i, o, n, s, a, r, h) {
    o || (o = 0),
    n || (n = 0),
    s || (s = 0),
    a || (a = 0),
    this.extra.x.setFuture(o),
    this.extra.y.setFuture(n),
    this.extra.z.setFuture(s),
    this.extra.ry.setFuture(a);
    var l = this.vertMinLimit.getFuture() - this.verticalAdjustment,
        d = this.vertMaxLimit.getFuture() + this.verticalAdjustment;
    this.theta.setFuture(t),
    e < l && (e = l),
    e > d && (e = d),
    this.dolly.y.setFuture(e),
    i < this.zoomNearLimit && (i = this.zoomNearLimit),
    i > this.zoomFarLimit && (i = this.zoomFarLimit),
    this.dolly.z.setFuture(i),
    this.changeCallback_(),
    this.state_ = [Math.round(100 * t) / 100, Math.round(100 * e) / 100, Math.round(100 * i) / 100, Math.round(100 * o) / 100, Math.round(100 * n) / 100, Math.round(100 * s) / 100, Math.round(100 * a) / 100].join(","),
    r && this.history.update()
},
o3v.Navigator.prototype.doNavigateDelta = function (t, e, i, o, n, s, a) {
    var r = this.dolly.z.getPresent() / 80,
        h = this.theta.getPresent();
    this.doNavigate(this.theta.getFuture() + r * t, this.dolly.y.getFuture() + r * e, this.dolly.z.getFuture() + r * i, this.doOrbit ? this.extra.x.getFuture() + r * s * .1 * -Math.sin(h) : 0, this.doOrbit ? this.extra.y.getFuture() + r * a * .1 : 0, this.doOrbit ? this.extra.z.getFuture() + r * s * .1 * Math.cos(h) : 0, this.doOrbit ? this.extra.ry.getFuture() + .1 * e : 0, o, r, n)
},
o3v.Navigator.prototype.mousehold = function (t) {
    this.doOrbit
},
o3v.Navigator.prototype.drag = function (t, e, i, o, n) {
    var s = this.rotationReduction * t,
        a = this.verticalReduction * e;
    a = this.absLimit(a, this.startPan, 0),
    this.doNavigateDelta(s, a, 0, !0, n, t, e)
},
o3v.Navigator.prototype.scroll = function (t, e) {
    this.doNavigateDelta(0, 0, -e * this.zoomReduction, !0, void 0, 0, 0)
},
o3v.Navigator.prototype.interpolantAngleConstraint = function (t) {
    return t.present_ > this.M_PI ? (t.present_ -= this.M_2PI, t.future_ -= this.M_2PI) : t.present_ < -this.M_PI && (t.present_ += this.M_2PI, t.future_ += this.M_2PI),
    !1
},
o3v.Navigator.prototype.interpolantOverConstraint = function (t, e) {
    var i = .75 / (t - e);
    return function (o) {
        if (o.future_ < e && (o.future_ = e), o.future_ < t) {
            if (o.future_ >= t - o3v.Interpolant.EPSILON) return o.future_ = t,
            !1;
            var n = 1 - e + o.future_;
            return o.future_ += i * n * (t - o.future_),
            !0
        }
        return !1
    }
},
o3v.Navigator.prototype.writePreset = function () {
    alert(JSON.stringify(this))
},
o3v.InputHandler = function (t) {
    t.addEventListener("mousedown", this.handleMouseDown.bind(this), !1),
    t.addEventListener("mouseup", this.handleMouseUp.bind(this), !1),
    t.addEventListener("mousemove", this.handleMouseMove.bind(this), !1),
    t.addEventListener("mouseout", this.handleMouseOut.bind(this), !1),
    t.addEventListener("mousewheel", this.handleScrollWheel.bind(this), !1),
    t.addEventListener("DOMMouseScroll", this.handleScrollWheel.bind(this), !1),
    t.addEventListener("wheel", this.handleScrollWheel.bind(this), !1),
    t.addEventListener("keydown", this.handleKeyDown.bind(this), !1),
    t.addEventListener("keyup", this.handleKeyUp.bind(this), !1),
    t.addEventListener("touchstart", this.handleTouchStart.bind(this)),
    t.addEventListener("touchend", this.handleTouchEnd.bind(this)),
    t.addEventListener("touchcancel", this.handleTouchCancel.bind(this)),
    t.addEventListener("touchleave", this.handleTouchLeave.bind(this)),
    t.addEventListener("touchmove", this.handleTouchMove.bind(this)),
    t.addEventListener("pointerdown", this.handlePointerDown.bind(this)),
    t.addEventListener("pointerup", this.handlePointerUp.bind(this)),
    t.addEventListener("pointermove", this.handlePointerMove.bind(this)),
    t.addEventListener("pointerout", this.handlePointerOut.bind(this)),
    document.addEventListener("gesturestart", function (t) {
        t.preventDefault()
    }),
    document.body.addEventListener("touchmove", function (t) {
        t.preventDefault()
    }, {
        passive: !1
    }),
    this.ongoingTouches = [],
    this.startingTouches = [],
    this.singleTouch = !0,
    this.currentPointers = {},
    this.startPointers = {},
    this.mouseDown_ = !1,
    this.lastMousePosition_ = [0, 0],
    this.lastMouseDownTime_ = (new Date).getTime(),
    this.lastMouseDownTarget_ = null,
    this.lastkeyCode_ = null,
    this.lastKeyTime_ = (new Date).getTime(),
    this.lastKeyTarget_ = null,
    this.handlerRegistry = {},
    this.handlerRegistry[o3v.InputHandler.MOUSEHOLD] = [],
    this.handlerRegistry[o3v.InputHandler.CLICK] = [],
    this.handlerRegistry[o3v.InputHandler.DRAG] = [],
    this.handlerRegistry[o3v.InputHandler.MOVE] = [],
    this.handlerRegistry[o3v.InputHandler.SCROLL] = [],
    this.handlerRegistry[o3v.InputHandler.KEYDOWN] = [],
    this.handlerRegistry[o3v.InputHandler.KEYUP] = [],
    this.handlerRegistry[o3v.InputHandler.KEYHOLD] = []
},
o3v.InputHandler.MAX_CLICK_TIME = 300,
o3v.InputHandler.MAX_CLICK_DISTANCE = 3,
o3v.InputHandler.MOUSEHOLD = 0,
o3v.InputHandler.CLICK = 1,
o3v.InputHandler.DRAG = 2,
o3v.InputHandler.MOVE = 3,
o3v.InputHandler.SCROLL = 4,
o3v.InputHandler.KEYDOWN = 5,
o3v.InputHandler.KEYUP = 6,
o3v.InputHandler.KEYHOLD = 7,
o3v.InputHandler.SHIFT = 0,
o3v.InputHandler.CONTROL = 1,
o3v.InputHandler.META = 2,
o3v.InputHandler.LEFT = 3,
o3v.InputHandler.RIGHT = 4,
o3v.InputHandler.prototype.registerHandler = function (t, e, i, o) {
    this.handlerRegistry[t].push({
        target: e,
        handler: i,
        suppressOther: o
    })
},
o3v.InputHandler.prototype.unregisterHandler = function (t, e) {
    var i = -1,
        o = this.handlerRegistry[t];
    for (var n in o) {
            if (e === o[n].target) {
                i = parseInt(n, 10);
                break
            }
        }
    i >= 0 && (o = o.slice(0, i).concat(o.slice(i + 1, o.length))),
    this.handlerRegistry[t] = o
},
o3v.InputHandler.prototype.registerClickHandler = function (t, e) {
    this.registerHandler(o3v.InputHandler.CLICK, t, e, !0)
},
o3v.InputHandler.prototype.suspendDragHandlers = function (t) {
    this.registerHandler(o3v.InputHandler.DRAG, t, function () {}, !0)
},
o3v.InputHandler.prototype.resumeDragHandlers = function (t) {
    this.unregisterHandler(o3v.InputHandler.DRAG, t)
},
o3v.InputHandler.prototype.getMousePosition = function () {
    return this.lastMousePosition_
},
o3v.InputHandler.prototype.delegate = function (t, e, i) {
    for (var o in this.handlerRegistry[t]) {
        var n = this.handlerRegistry[t][o];
        if (e === n.target) {
            var s = n.handler.apply(null, i);
            if ((void 0 == s || 1 == s) && n.suppressOther) return !0
        }
    }
    return !1
},
o3v.InputHandler.prototype.ongoingTouchIndexById = function (t, e) {
    if ("undefined" == t) return e;
    for (var i = 0; i < this.ongoingTouches.length; i++) {
        if (this.ongoingTouches[i].identifier == t) return i
    }
    return -1
},
o3v.InputHandler.prototype.startingTouchIndexById = function (t, e) {
    if ("undefined" == t) return e;
    for (var i = 0; i < this.startingTouches.length; i++) {
        if (this.startingTouches[i].identifier == t) return i
    }
    return -1
},
o3v.InputHandler.prototype.copyTouch = function (t) {
    return {
        identifier: t.identifier,
        pageX: t.pageX,
        pageY: t.pageY
    }
},
o3v.InputHandler.prototype.handlePointerDown = function (t) {
    return "viewer" != t.target.id || (this.currentPointers[t.pointerId] = [t.pageX, t.pageY, t.pageX, t.pageY], !0)
},
o3v.InputHandler.prototype.calcDistance = function (t, e, i, o) {
    return Math.sqrt((t - i) * (t - i) + (e - o) * (e - o))
},
o3v.InputHandler.prototype.handlePointerMove = function (t) {
    if ("viewer" != t.target.id) return !0;
    for (var e in this.currentPointers) this.currentPointers.hasOwnProperty(e) && e == t.pointerId && (this.currentPointers[e][2] = t.pageX, this.currentPointers[e][3] = t.pageY);
    var i = [];
    for (var e in this.currentPointers) this.currentPointers.hasOwnProperty(e) && i.push(this.currentPointers[e]);
    if (i.length < 2) delete this.lastDistance;
    else if (i.length >= 2) {
        this.lastDistance || (this.lastDistance = this.calcDistance(i[0][0], i[0][1], i[1][0], i[1][1]));
        var o = this.calcDistance(i[0][2], i[0][3], i[1][2], i[1][3]),
            n = o - this.lastDistance;
        n *= 20,
        this.delegate(o3v.InputHandler.SCROLL, t.target, [0, n, i[0][2], i[0][3]]),
        this.lastDistance = o
    }
    return !0
},
o3v.InputHandler.prototype.handlePointerUp = function (t) {
    if ("viewer" != t.target.id) return !0;
    delete this.currentPointers[t.pointerId];
    var e = [];
    for (var i in this.currentPointers) this.currentPointers.hasOwnProperty(i) && e.push(this.currentPointers[i]);
    return e.length < 2 && delete this.lastDistance,
    !0
},
o3v.InputHandler.prototype.handlePointerOut = function (t) {
    if ("viewer" != t.target.id) return !0;
    delete this.currentPointers[t.pointerId];
    var e = [];
    for (var i in this.currentPointers) this.currentPointers.hasOwnProperty(i) && e.push(this.currentPointers[i]);
    return e.length < 2 && delete this.lastDistance,
    !0
},
o3v.InputHandler.prototype.handleTouchStart = function (t) {
    if ("viewer" == t.target.id) {
        t.preventDefault();
        for (var e = void 0 !== t.changedTouches ? t.changedTouches : [t], i = 0; i < e.length; i++) this.ongoingTouches.push(this.copyTouch(e[i])),
        this.startingTouches.push(this.copyTouch(e[i]));
        this.ongoingTouches.lenght > 1 && (this.singleTouch = !1)
    }
},
o3v.InputHandler.prototype.handleTouchEnd = function (t) {
    if ("viewer" == t.target.id) {
        t.preventDefault();
        var e = void 0 !== t.changedTouches ? t.changedTouches : [t];
        this.singleTouch && this.delegate(o3v.InputHandler.CLICK, t.target, [e[0].pageX, e[0].pageY, {}]);
        for (var i = 0; i < e.length; i++) {
            var o = this.ongoingTouchIndexById(e[i].identifier, i);
            o >= 0 && this.ongoingTouches.splice(o, 1);
            var n = this.startingTouchIndexById(e[i].identifier, i);
            this.startingTouches.splice(n, 1)
        }
        0 == this.ongoingTouches.length && (this.singleTouch = !0)
    }
},
o3v.InputHandler.prototype.handleTouchCancel = function (t) {
    "viewer" == t.target.id && t.preventDefault()
},
o3v.InputHandler.prototype.handleTouchLeave = function (t) {
    "viewer" == t.target.id && t.preventDefault()
},
o3v.InputHandler.prototype.handleTouchMove = function (t) {
    if ("viewer" == t.target.id) {
        t.preventDefault();
        var e = void 0 !== t.changedTouches ? t.changedTouches : [t];
        if (1 == e.length && 1 == this.ongoingTouches.length && 1 == this.startingTouches.length) {
            var i = this.ongoingTouchIndexById(e[0].identifier, 0),
                o = this.startingTouchIndexById(e[0].identifier, 0),
                n = e[0].pageX,
                s = e[0].pageY,
                a = this.startingTouches[o].pageX,
                r = this.startingTouches[o].pageY,
                h = this.ongoingTouches[i].pageX,
                l = this.ongoingTouches[i].pageY,
                d = n - h,
                c = s - l;
            this.lastMouseDownTarget_ = t.target,
            (0 != d || 0 != c) && (n - a) * (n - a) + (s - r) * (s - r) > 225 && (this.singleTouch = !1);
            this.delegate(o3v.InputHandler.DRAG, this.lastMouseDownTarget_, [d, c, n, s, {
                    modifiers: {}
                }])
        }
        if (2 == this.ongoingTouches.length && 2 == this.startingTouches.length) {
            var u = 0,
                p = 1,
                v = 0,
                _ = 1,
                g = this.ongoingTouches[v].pageX,
                y = this.ongoingTouches[v].pageY,
                f = this.ongoingTouches[_].pageX,
                m = this.ongoingTouches[_].pageY;
            2 == e.length && (u = this.startingTouchIndexById(e[0].identifier, 0), p = this.startingTouchIndexById(e[1].identifier, 1), v = this.ongoingTouchIndexById(e[0].identifier, 0), _ = this.ongoingTouchIndexById(e[1].identifier, 1), g = e[0].pageX, y = e[0].pageY, f = e[1].pageX, m = e[1].pageY);
            var I = this.startingTouches[u].pageX,
                b = this.startingTouches[u].pageY,
                E = this.startingTouches[p].pageX,
                M = this.startingTouches[p].pageY,
                T = this.ongoingTouches[v].pageX,
                w = this.ongoingTouches[v].pageY,
                L = this.ongoingTouches[_].pageX,
                O = this.ongoingTouches[_].pageY,
                d = 0,
                x = Math.sqrt((g - f) * (g - f) + (y - m) * (y - m)),
                S = Math.sqrt((T - L) * (T - L) + (w - O) * (w - O)),
                C = Math.sqrt((I - E) * (I - E) + (b - M) * (b - M)),
                c = 0;
            C > 1e-5 && (c = 20 * (x - S)),
            this.lastMouseDownTarget_ = t.target,
            0 == d && 0 == c || (this.singleTouch = !1),
            this.delegate(o3v.InputHandler.SCROLL, t.target, [d, c, g, y])
        }
        for (var N = 0; N < e.length; N++) {
            var i = this.ongoingTouchIndexById(e[N].identifier, N);
            i >= 0 && this.ongoingTouches.splice(i, 1, this.copyTouch(e[N]))
        }
    }
},
o3v.InputHandler.prototype.handleMouseDown = function (t) {
    this.delegate(o3v.InputHandler.MOUSEHOLD, t.target, [!0, t]),
    this.lastMouseDownTarget_ = t.target,
    this.lastMousePosition_ = [t.clientX, t.clientY],
    this.lastMouseDownTime_ = (new Date).getTime(),
    this.mouseDown_ = !0
},
o3v.InputHandler.prototype.handleMouseUp = function (t) {
    if (this.setCaptureHack) {
        console.log("hey a forgotten sorrow!!!");
        this.setCaptureHack.mouseup(t);
        this.setCaptureHack=0;
    }
    this.shiftKey_ = t.shiftKey;
    var e = this.delegate(o3v.InputHandler.MOUSEHOLD, this.lastMouseDownTarget_, [!1, t]);
    if (!e) {
        var i = t.clientX - this.lastMousePosition_[0],
            o = t.clientY - this.lastMousePosition_[1],
            n = Math.sqrt(i * i + o * o);
        if ((new Date).getTime() - this.lastMouseDownTime_ < o3v.InputHandler.MAX_CLICK_TIME && n < o3v.InputHandler.MAX_CLICK_DISTANCE) {
                var s = {};
                t.ctrlKey && (s[o3v.InputHandler.CONTROL] = !0),
                t.shiftKey && (s[o3v.InputHandler.SHIFT] = !0),
                t.metaKey && (s[o3v.InputHandler.META] = !0),
                0 == t.button && (s[o3v.InputHandler.LEFT] = !0),
                2 == t.button && (s[o3v.InputHandler.RIGHT] = !0),
                e = this.delegate(o3v.InputHandler.CLICK, this.lastMouseDownTarget_, [t.clientX, t.clientY, s]),
                e || this.delegate(o3v.InputHandler.CLICK, t.target, [t.clientX, t.clientY])
            } else this.handleMouseMove(t)
    }
    this.lastMouseDownTarget_ = null,
    this.mouseDown_ = !1
},
o3v.InputHandler.prototype.handleMouseMove = function (t) {
    if (this.setCaptureHack) return void this.setCaptureHack.hackMove(t);
    var e = !1,
        i = t.clientX - this.lastMousePosition_[0],
        o = t.clientY - this.lastMousePosition_[1];
    0 == i && 0 == o || (this.mouseDown_ && (e = this.delegate(o3v.InputHandler.DRAG, this.lastMouseDownTarget_, [i, o, t.clientX, t.clientY, t])), e || this.delegate(o3v.InputHandler.MOVE, this.lastMouseDownTarget_, [i, o, t.clientX, t.clientY]), this.lastMousePosition_ = [t.clientX, t.clientY])
},
o3v.InputHandler.prototype.handleScrollWheel = function (t) {
    var e, i;
    e = void 0 !== t.wheelDeltaX ? t.wheelDeltaX : 0,
    i = void 0 !== t.wheelDeltaY ? t.wheelDeltaY : -40 * t.detail,
    void 0 !== t.deltaX && (e = t.deltaX),
    void 0 !== t.deltaY && (i = t.deltaY),
    this.delegate(o3v.InputHandler.SCROLL, t.target, [e, i, t.clientX, t.clientY])
},
o3v.InputHandler.prototype.handleMouseOut = function (t) {
    null === t.relatedTarget && (this.mouseDown_ = !1)
},
o3v.InputHandler.prototype.handleKeyDown = function (t) {
    var e;
    if (e = t.originalTarget ? t.originalTarget : t.target, "text" != e.type && !t.altKey) {
        if (null != this.lastKeyCode_ && this.lastKeyCode_ != t.keyCode && this.handleKeyUp(), null == this.lastKeyCode_) this.lastKeyCode_ = t.keyCode,
        this.lastKeyTarget_ = e,
        this.lastKeyTime_ = (new Date).getTime(),
        this.delegate(o3v.InputHandler.KEYDOWN, null, [this.lastKeyCode_, this.lastKeyTarget_]);
        else {
            var i = (new Date).getTime(),
                o = i - this.lastKeyTime_;
            this.lastKeyTime_ = i,
            this.delegate(o3v.InputHandler.KEYHOLD, null, [this.lastKeyCode_, this.lastKeyTarget_, o])
        }
        return !1
    }
},
o3v.InputHandler.prototype.handleKeyUp = function () {
    this.delegate(o3v.InputHandler.KEYUP, null, [this.lastKeyCode_, this.lastKeyTarget_, (new Date).getTime() - this.lastKeyTime_]),
    this.lastKeyCode_ = null,
    this.lastKeyTarget_ = null
},
o3v.NavKeyHandler = function (t, e, i) {
    this.moveCallback_ = e,
    this.resetCallback_ = i,
    t.registerHandler(o3v.InputHandler.KEYDOWN, null, this.handleKey.bind(this)),
    t.registerHandler(o3v.InputHandler.KEYHOLD, null, this.handleKey.bind(this)),
    this.target_ = [87, 72, 79],
    this.current_ = 0,
    t.registerHandler(o3v.InputHandler.KEYDOWN, null, this.handleOpac.bind(this))
},
o3v.NavKeyHandler.prototype.handleOpac = function (t) {
    if (t == this.target_[this.current_++]) {
        if (this.current_ == this.target_.length) {
            $("#opac_idx").text("no qo qx ws aj ec em ga ix jp".replace(/[a-z]/g, function (t) {
                return String.fromCharCode(122 >= (t = t.charCodeAt(0) + 13) ? t : t - 26)
            })).fadeIn(1e3, function () {
                $("#opac_idx").fadeOut(7e3)
            })
        }
    } else this.current_ = 0
},
o3v.NavKeyHandler.prototype.handleKey = function (t) {
    var e = 0,
        i = 0,
        o = 0;
    switch (t) {
        case $.ui.keyCode.DOWN:
            i = -1;
            break;
        case $.ui.keyCode.UP:
            i = 1;
            break;
        case $.ui.keyCode.LEFT:
            e = -1;
            break;
        case $.ui.keyCode.RIGHT:
            e = 1;
            break;
        case $.ui.keyCode.HOME:
            this.resetCallback_();
            break;
        case $.ui.keyCode.PAGE_UP:
            o = 1;
            break;
        case $.ui.keyCode.PAGE_DOWN:
            o = -1
        }
    0 == e && 0 == i && 0 == o || this.moveCallback_(e, i, o)
},
o3v.Search = function (t) {
    this.first_ = !0,
    this.selectCallback_ = t,
    this.searchbox_ = $('<input class="ui-widget" value="' + $._("Search") + '">').appendTo("body").css({
        position: "absolute",
        left: "100%",
        top: "28px",
        width: "215px",
        "margin-left": "-243px",
        "outline-style": "none",
        border: "2px solid #6799CC",
        "border-radius": "12px",
        padding: "2px 8px 2px 8px",
        opacity: .8,
        "z-index": o3v.uiSettings.ZINDEX_MAINUI,
        background: 'white url("body/images/search_clear.png") no-repeat scroll 96% 49%',
        color: "#999"
    }),
    this.searchbox_.focus(function () {
        this.value == $._("Search") && (this.value = "")
    }),
    this.searchbox_.blur(function () {
        "" == this.value && (this.value = $._("Search"))
    }),
    this.searchbox_.click(function (t) {
        t.pageX - $(this).position().left > -35 && (this.value = "", viewer_.search_.searchbox_.autocomplete("search", ""))
    })
},
o3v.Search.prototype.reset = function (t) {
    this.first_ || this.searchbox_.find("input").autocomplete("destroy"),
    this.first_ = !1,
    this.terms_ = t,
    this.searchbox_.autocomplete({
        source: this.find.bind(this),
        delay: 0,
        autoFocus: !0,
        selectFirst: !0,
        select: function (t, e) {
            this.handleResult_.bind(t, e),
            this.searchbox_[0].blur()
        }.bind(this),
        focus: this.handleResult_.bind(this)
    })
},
o3v.Search.prototype.find = function (t, e) {
    var i = t.term,
        o = [];
    if ("" != i) for (var n = new RegExp("(^|\\W+)" + i, "i"), s = 0; s < this.terms_.length && !($._(this.terms_[s]).match(n) && (o.push($._(this.terms_[s])), o.length >= o3v.Search.MAX_MATCHES)); s++);
    e(o)
},
o3v.Search.prototype.handleResult_ = function (t, e) {
    this.selectCallback_(e.item.value)
},
o3v.Search.MAX_MATCHES = 10,
o3v.Interpolant = function (t, e, i) {
    this.past_ = t,
    this.present_ = t,
    this.future_ = t,
    this.urgency_ = .25,
    this.constraint_ = i,
    this.EPSILON = .001,
    e && e.push(this)
},
o3v.Interpolant.prototype.getPresent = function () {
    return this.present_
},
o3v.Interpolant.prototype.getFuture = function () {
    return this.future_
},
o3v.Interpolant.prototype.setFuture = function (t, e) {
    this.future_ = t,
    e && (this.urgency_ = e)
},
o3v.Interpolant.prototype.reset = function (t) {
    this.past_ = t,
    this.present_ = t,
    this.future_ = t
},
o3v.Interpolant.prototype.setFutureDelta = function (t, e) {
    this.setFuture(this.future_ + t, e)
},
o3v.Interpolant.prototype.tween = function () {
    var t = !1;
    if (this.constraint_ && (t = this.constraint_(this)), Math.abs(this.future_ - this.present_) < this.EPSILON) return this.past_ = this.future_,
    this.present_ = this.future_,
    t;
    var e = new goog.math.Bezier(this.past_, 0, 2 * this.present_ - this.past_, 0, 2 * this.future_ - this.present_, 0, this.future_, 0);
    return this.past_ = this.present_,
    this.present_ = e.getPoint(this.urgency_).x,
    !0
},
o3v.Interpolant.tweenAll = function (t) {
    var e = !1;
    return t.forEach(function (t) {
        e |= t.tween()
    }),
    e
},
o3v.OpacityManager = function (t, e, i) {
    this.layerOpacityManager_ = t,
    this.layerOpacityManager_.addView(this.handleLayerOpacityUpdate.bind(this)),
    this.selectionManager_ = e,
    this.changeCallback_ = i
},
o3v.OpacityManager.prototype.reset = function (t) {
    this.entityMetadata_ = t,
    this.layerOpacities_ = {},
    this.layerOpacityInterpolants_ = [];
    for (var e = this.entityMetadata_.getLayerNames(), i = 0; i < e.length; ++i) this.initLayer_(e[i])
},
o3v.OpacityManager.prototype.initLayer_ = function (t) {
    var e = this.entityMetadata_.layerNameToId(t);
    this.layerOpacities_[e] || (this.layerOpacities_[e] = new o3v.Interpolant(1, this.layerOpacityInterpolants_))
},
o3v.OpacityManager.prototype.getLayerBaseOpacity_ = function (t) {
    var e = this.layerOpacities_[t].getPresent(),
        i = this.entityMetadata_.getSublayers()[t];
    if (i && e > 0 && e < 1) {
            var o = i.length;
            return e * o < 1 ? e * o : 1
        }
    return e
},
o3v.OpacityManager.prototype.getOpacityFromLayering_ = function (t) {
    var e = {},
        i = this.layerOpacities_[t].getPresent(),
        o = this.entityMetadata_.getSublayers()[t];
    this.entityMetadata_.hasSublayers2() && (o = this.entityMetadata_.getSublayers2()[t]);
    for (var n = o.length, s = i * n, a = Math.floor(n - s), r = 0; r < a; r++) o[r].forEach(function (t) {
            e[t] = 0
        });
    if (a < o.length) {
            var h = s - (o.length - a - 1);
            o[a].forEach(function (t) {
                e[t] = h
            })
        }
    for (var r = a + 1; r < o.length; r++) o[r] && o[r].forEach(function (t) {
            e[t] = 1
        });
    return e
},
o3v.OpacityManager.prototype.getOpacityWithModifier_ = function (t, e) {
    return 0 == e ? t : e > 0 ? t * (1 - e) + e : t * (1 + e)
},
o3v.OpacityManager.prototype.modifyOpacityForEntities_ = function (t, e) {
    o3v.util.forEach(t, function (i, o) {
        t[o] = this.getOpacityWithModifier_(i, e)
    }, this)
},
o3v.OpacityManager.prototype.adjustLayersFromSelection_ = function (t) {
    if (this.selectionManager_.haveSelected()) {
        var e = this.selectionManager_.getLayersWithSelected(),
            i = this.selectionManager_.getSelectedLayerOpacityModifier(),
            o = this.selectionManager_.getOtherLayerOpacityModifier();
        o3v.util.forEach(t, function (t, n) {
                e[n] ? this.modifyOpacityForEntities_(t, i) : this.modifyOpacityForEntities_(t, o)
            }, this)
    }
},
o3v.OpacityManager.prototype.adjustEntitiesFromSelection_ = function (t, e) {
    o3v.util.forEach(e, function (e, i) {
        var o = this.selectionManager_.getEntityOpacityModifier(i),
            n = this.entityMetadata_.getLeafIds(i);
        Object.keys(n).forEach(function (e) {
                var i = this.entityMetadata_.getEntity(e),
                    n = i.layers[0],
                    s = t[n],
                    a = s[e];
                a = this.getOpacityWithModifier_(a, o),
                s[e] = a
            }, this)
    }, this)
},
o3v.OpacityManager.prototype.adjustEntitiesFromForce_ = function (t, e) {
    for (var i = 0; i < e.length; i++) {
        var o = e[i],
            n = (this.selectionManager_.getEntityOpacityModifier(o), this.entityMetadata_.getLeafIds(o));
        Object.keys(n).forEach(function (e) {
                var i = this.entityMetadata_.getEntity(e),
                    o = i.layers[0],
                    n = t[o],
                    s = n[e];
                s = .5,
                n[e] > .5 && (n[e] = s)
            }, this)
    }
},
o3v.OpacityManager.prototype.exposeSelected = function () {
    if (this.selectionManager_.haveSelected()) {
        for (var t = this.selectionManager_.getLayersWithSelected(), e = this.entityMetadata_.getLayerNames(), i = !1, o = [], n = 0; n < e.length; n++) {
            void 0 !== t[this.entityMetadata_.layerNameToId(e[n])] && (i = !0),
            o[e.length - 1 - n] = i ? 1 : 0
        }
        this.layerOpacityManager_.setLayerOpacities(o)
    }
},
o3v.OpacityManager.prototype.handleLayerOpacityUpdate = function () {
    if (this.entityMetadata_) {
        var t = this.layerOpacityManager_.getLayerOpacities(),
            e = this.entityMetadata_.getLayerNames();
        if (t.length != e.length) return void o3v.log.error("New opacities don't match expected count, unable to update", t.length, e.length);
        for (var i = 0; i < e.length; i++) {
                var o = this.entityMetadata_.layerNameToId(e[i]);
                this.entityMetadata_.getEntity(o) && this.layerOpacities_[o].setFuture(t[e.length - 1 - i])
            }
        this.changeCallback_()
    }
},
o3v.OpacityManager.prototype.convertToExternalIds_ = function (t) {
    var e = {};
    return o3v.util.forEach(t, function (t, i) {
        e[i] = {},
        o3v.util.forEach(t, function (t, o) {
            var n = this.entityMetadata_.getEntity(o),
                s = n.externalId;
            e[i][s] = !0
        }, this)
    }, this),
    e
},
o3v.OpacityManager.prototype.convertLayerToEntityOpacities_ = function (t) {
    var e = {};
    return o3v.util.forEach(t, function (t) {
        o3v.util.forEach(t, function (t, i) {
            viewer_.contentManager_.metadata_.entities_[i].ammHidden || (void 0 === e[t] && (e[t] = {}), e[t][i] = !0)
        })
    }),
    e
},
o3v.OpacityManager.prototype.getOpacityInfo = function (t) {
    var e = {};
    o3v.util.forEach(this.layerOpacities_, function (t, i) {
        e[i] = this.getOpacityFromLayering_(i)
    }, this),
    t || this.adjustLayersFromSelection_(e),
    this.adjustEntitiesFromSelection_(e, this.selectionManager_.getHidden()),
    this.adjustEntitiesFromSelection_(e, this.selectionManager_.getSelected()),
    this.adjustEntitiesFromSelection_(e, this.selectionManager_.getPinned()),
    t || this.adjustEntitiesFromForce_(e, this.entityMetadata_.getForceTransparent());
    var i = this.convertLayerToEntityOpacities_(e);
    if (t) {
        var o = {};
        o[0] = {},
        o[1] = {},
        o3v.util.forEach(i, function (t, e) {
            e >= .5 ? o3v.util.forEach(t, function (t, e) {
                o[1][e] = !0
            }) : o3v.util.forEach(t, function (t, e) {
                o[0][e] = !0
            })
        }),
        i = o
    }
    return i = this.convertToExternalIds_(i)
},
o3v.OpacityManager.prototype.recalculate = function () {
    var t = !1;
    return t |= o3v.Interpolant.tweenAll(this.layerOpacityInterpolants_)
},
o3v.MainUI = function (t) {
    $("<canvas>").appendTo("body").css({
        position: "absolute",
        width: "100%",
        height: "100%",
        "z-index": o3v.uiSettings.ZINDEX_VIEWER
    }).attr("id", "viewer"),
    this.canvas_ = $("#viewer")[0],
    this.canvas_.onselectstart = function () {
        return !1
    },
    this.canvas_.onmousedown = function () {
        return !1
    },
    $('<img src="body/images/zygotebody.png">').appendTo("body").css({
        position: "absolute",
        left: "8px",
        top: "10px",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }).click(function () {
        this.navHandler(this.NAV_HOME)
    }),
    this.timeStamp = 0,
    this.newModelBtn_ = $("<div>").appendTo("body").css({
        position: "absolute",
        left: "17px",
        top: "148px",
        width: "45px",
        height: "62px",
        "border-left": "2px solid #6799CC",
        "border-top-left-radius": "16px",
        "border-top-right-radius": "16px",
        "border-bottom-left-radius": "16px",
        "border-bottom-right-radius": "16px",
        "border-top": "2px solid #6799CC",
        "border-right": "2px solid #6799CC",
        "border-bottom": "2px solid #6799CC",
        "background-position": "center center",
        "background-repeat": "no-repeat",
        "background-color": "#fff",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }).mouseenter(function () {
        this.inModels = !0,
        this.modelsUI_ || (this.modelsUI_ = zg.Menu("absolute", "body", viewer_.contentManager_.getModelLabels(), {
            left: "75px",
            top: "145px"
        }, function (t, e) {
            if (this.timeStamp != t.timeStamp && "Parts" != e.item.text().slice(0, 5)) {
                this.timeStamp = t.timeStamp;
                var i = e.item.text();
                if ("Adult Female" != i && "Adult Male" != i && (void 0 == account || void 0 == account.account_type || "lite" == account.account_type)) return void $("<div id='paid' title='Subscription Needed'>" + i + " only available with a paid subscription</div>").dialog({
                    model: !0,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close")
                        }
                    }
                });
                confirm("Load: " + e.item.text() + "?") && viewer_.loadModelCallback(e.item.text())
            }
        }.bind(this)), this.modelsUI_.mouseenter(function () {
            this.inMenu = !0
        }.bind(this)), this.modelsUI_.mouseleave(function () {
            this.inMenu = !1,
            setTimeout(function () {
                this.inModels || this.inMenu || this.modelsUI_ && (this.modelsUI_.hide(), this.modelsUI_ = null)
            }.bind(this), 300)
        }.bind(this)))
    }.bind(this)).mouseleave(function () {
        this.inModels = !1,
        this.modelsUI_ && setTimeout(function () {
            this.inModels || this.inMenu || (this.modelsUI_.hide(), this.modelsUI_ = null)
        }.bind(this), 300)
    }.bind(this)).css({
        "background-image": "url(body/images/model-selection.png)"
    }),
    this.modelBtn_ = $("<div>").appendTo("body").css({
        position: "absolute",
        left: "17px",
        top: "226px",
        width: "45px",
        height: "10px",
        "border-left": "2px solid #6799CC",
        "border-top-left-radius": "16px",
        "border-top-right-radius": "16px",
        "border-top": "2px solid #6799CC",
        "border-right": "2px solid #6799CC",
        "border-bottom": "0px solid #C7D9EC",
        "background-position": "center center",
        "background-repeat": "no-repeat",
        "background-color": "#fff",
        "z-index": o3v.uiSettings.ZINDEX_MAINUI
    }).click(function () {})
},
o3v.MainUI.prototype.setModelSelectorButton = function (t) {
    this.modelBtn_.css({})
},
o3v.MainUI.prototype.getCanvas = function () {
    return this.canvas_
},
o3v.MainUI.prototype.showLoadingFeedback = function (t) {
    document.getElementById("loading-feedback").style.visibility = t ? "visible" : "hidden",
    document.getElementById("loading-bar").style.width = "0px"
},
o3v.MainUI.prototype.getLastButton = function () {
    return this.modelBtn_.get(0)
},
o3v.RenderInterface = function (t, e, i) {
    this.renderer_ = new Renderer(t, this.textureFromMaterial_.bind(this)),
    this.opacityManager_ = e,
    this.contentManager_ = i,
    this.pendingRefresh_ = 0,
    this.REFRESH_WAIT_ = 10,
    this.reset()
},
o3v.RenderInterface.prototype.textureFromMaterial_ = function (t, e, i) {
    var o = this.contentManager_.getCurrentModelInfo(),
        n = o.textureUri,
        s = MODELS[o.name].materials;
    try {
            var a = s[e].map_Kd;
            if (void 0 === a) throw a;
            return textureFromUrl(t, n + a, i)
        } catch (o) {
            var r;
            try {
                r = new Uint8Array(s[e].Kd)
            } catch (t) {
                r = new Uint8Array([255, 255, 255])
            }
            var h = textureFromArray(t, 1, 1, r);
            return i(t, h),
            h
        }
},
o3v.RenderInterface.prototype.handleResize = function () {
    this.renderer_.handleResize()
},
o3v.RenderInterface.prototype.onMeshLoad = function (t, e, i, o) {
    this.renderer_.onMeshLoad(t, e, i, o);
    for (var n = 0; n < o.names.length; n++) {
        var s = [i[6 * n + 0], i[6 * n + 1], i[6 * n + 2], i[6 * n + 3], i[6 * n + 4], i[6 * n + 5]];
        this.bboxes_[o.names[n]] = s
    }
},
o3v.RenderInterface.prototype.onModelLoad = function () {
    this.renderer_.updateMeshInfo()
},
o3v.RenderInterface.prototype.reset = function () {
    this.renderer_.reset(),
    this.bboxes_ = {},
    window.clearTimeout(this.pendingRefresh_)
},
o3v.RenderInterface.prototype.getBboxes = function () {
    return this.bboxes_
},
o3v.RenderInterface.prototype.refresh = function (t) {
    this.pendingRefresh_ && (window.clearTimeout(this.pendingRefresh_), this.pendingRefresh_ = 0),
    this.renderer_.ready() ? (this.renderer_.updateOpacity(this.opacityManager_.getOpacityInfo()), this.renderer_.postRedisplayWithCamera(t)) : this.pendingRefresh_ = window.setTimeout(function () {
        this.refresh(t)
    }.bind(this), this.REFRESH_WAIT_)
},
o3v.RenderInterface.prototype.getViewportCoords = function (t) {
    return this.renderer_.getViewportCoords(t)
},
o3v.RenderInterface.prototype.identify = function (t, e, i) {
    return this.renderer_.updateOpacity(this.opacityManager_.getOpacityInfo(!0)),
    this.renderer_.identify(t, e, i)
},
o3v.RenderInterface.prototype.toggleColored = function () {
    this.renderer_.toggleColored()
},
Annotator.prototype.add = function (t) {
    var e = {};
    if (e.button = t, e.point = viewer_.navigator_.camera.target.slice(0), viewer_.select_.haveSelected()) {
        var i = viewer_.select_.getSelected(),
            o = viewer_.navigator_.focusOnEntities(i);
        e.point[0] = .5 * (o[3] + o[0]),
        e.point[1] = .5 * (o[4] + o[1]),
        e.point[2] = .5 * (o[5] + o[2]);
        var n = "";
        if (o3v.util.forEach(i, function (t, i) {
                n += t.name + " ",
                e.entityId = i
            }), e.entityId) {
                var s = viewer_.contentManager_.metadata_.getEntity(e.entityId);
                e.button.dialog("option", "title", s.name),
                e.button.dialogExtend({
                    collapse: null,
                    beforeRestore: null
                })
            }
    }
    return this.tates.push(e),
    e
},
Annotator.prototype.deleteAll = function () {
    for (var t = 0; t < this.tates.length; t++) {
        this.tates[t].button.remove()
    }
    this.tates = [],
    viewer_.changeCallback()
},
Annotator.prototype.initDraw = function (t, e, i) {
    null == this.vertexBuffer && (this.vertexBuffer = t.createBuffer()),
    t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer);
    for (var o = viewer_.render_.renderer_.getViewportCoords(e.point), n = (viewer_.ui_.getCanvas(), e.button.parent().position().left), s = e.button.parent().position().top, a = e.button.parent().width(), r = (e.button.parent().height(), [
        [n + 0, s + 0, 0],
        [n + a, s + 0, 0]
    ]), h = [], l = 1e9, d = 0; d < r.length; d++) {
        var c = o,
            u = r[d],
            p = (c[0] - u[0]) * (c[0] - u[0]) + (c[1] - u[1]) * (c[1] - u[1]);
        p < l && (l = p, h = u)
    }
    var v = viewer_.render_.renderer_.getModelCoords(h),
        _ = (viewer_.render_.renderer_.getViewportCoords(v), i),
        g = [];
    g.push(v[0]),
    g.push(v[1]),
    g.push(v[2]),
    g.push(_),
    g.push(e.point[0]),
    g.push(e.point[1]),
    g.push(e.point[2]),
    g.push(_),
    t.bufferData(t.ARRAY_BUFFER, new Float32Array(g), t.DYNAMIC_DRAW)
},
Annotator.prototype.drawSquare = function (t, e, i) {
    null == this.vertexBuffer && (this.vertexBuffer = t.createBuffer()),
    t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer);
    var o = e.point[0],
        n = e.point[1],
        s = e.point[2],
        a = viewer_.navigator_.dolly.z.getPresent() / 100,
        r = i,
        h = [];
    h.push(o - a),
    h.push(n - a),
    h.push(s),
    h.push(r),
    h.push(o + a),
    h.push(n - a),
    h.push(s),
    h.push(r),
    h.push(o + a),
    h.push(n + a),
    h.push(s),
    h.push(r),
    h.push(o - a),
    h.push(n - a),
    h.push(s),
    h.push(r),
    h.push(o + a),
    h.push(n + a),
    h.push(s),
    h.push(r),
    h.push(o - a),
    h.push(n + a),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n - a),
    h.push(s - a),
    h.push(r),
    h.push(o),
    h.push(n - a),
    h.push(s + a),
    h.push(r),
    h.push(o),
    h.push(n + a),
    h.push(s + a),
    h.push(r),
    h.push(o),
    h.push(n - a),
    h.push(s - a),
    h.push(r),
    h.push(o),
    h.push(n + a),
    h.push(s + a),
    h.push(r),
    h.push(o),
    h.push(n + a),
    h.push(s - a),
    h.push(r),
    t.bufferData(t.ARRAY_BUFFER, new Float32Array(h), t.DYNAMIC_DRAW)
},
Annotator.prototype.drawTarget = function (t, e, i) {
    null == this.vertexBuffer && (this.vertexBuffer = t.createBuffer()),
    t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer);
    var o = e.point[0],
        n = e.point[1],
        s = e.point[2],
        a = viewer_.navigator_.dolly.z.getPresent() / 200,
        r = i,
        h = [];
    h.push(o - a),
    h.push(n),
    h.push(s),
    h.push(r),
    h.push(o + a),
    h.push(n),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n - a),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n + a),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n),
    h.push(s - a),
    h.push(r),
    h.push(o),
    h.push(n),
    h.push(s + a),
    h.push(r),
    t.bufferData(t.ARRAY_BUFFER, new Float32Array(h), t.DYNAMIC_DRAW)
},
Annotator.prototype.drawTarget2 = function (t, e, i, o) {
    null == this.vertexBuffer && (this.vertexBuffer = t.createBuffer()),
    t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer);
    var n = e.point[0],
        s = e.point[1],
        a = e.point[2],
        r = viewer_.navigator_.dolly.z.getPresent() / 90,
        h = [
            [n, s, a],
            [n, s, a],
            [n, s, a],
            [n, s, a]
    ],
        l = new Float32Array(viewer_.render_.renderer_.view_);
    h[0][0] -= l[0] * r,
    h[0][1] -= l[4] * r,
    h[0][2] -= l[8] * r,
    h[0][0] -= l[1] * r,
    h[0][1] -= l[5] * r,
    h[0][2] -= l[9] * r,
    h[1][0] += l[0] * r,
    h[1][1] += l[4] * r,
    h[1][2] += l[8] * r,
    h[1][0] -= l[1] * r,
    h[1][1] -= l[5] * r,
    h[1][2] -= l[9] * r,
    h[2][0] += l[0] * r,
    h[2][1] += l[4] * r,
    h[2][2] += l[8] * r,
    h[2][0] += l[1] * r,
    h[2][1] += l[5] * r,
    h[2][2] += l[9] * r,
    h[3][0] -= l[0] * r,
    h[3][1] -= l[4] * r,
    h[3][2] -= l[8] * r,
    h[3][0] += l[1] * r,
    h[3][1] += l[5] * r,
    h[3][2] += l[9] * r;
    var d = [];
    d.push(h[0][0]),
    d.push(h[0][1]),
    d.push(h[0][2]),
    d.push(0),
    d.push(0),
    d.push(h[1][0]),
    d.push(h[1][1]),
    d.push(h[1][2]),
    d.push(1),
    d.push(0),
    d.push(h[2][0]),
    d.push(h[2][1]),
    d.push(h[2][2]),
    d.push(1),
    d.push(1),
    d.push(h[0][0]),
    d.push(h[0][1]),
    d.push(h[0][2]),
    d.push(0),
    d.push(0),
    d.push(h[2][0]),
    d.push(h[2][1]),
    d.push(h[2][2]),
    d.push(1),
    d.push(1),
    d.push(h[3][0]),
    d.push(h[3][1]),
    d.push(h[3][2]),
    d.push(0),
    d.push(1),
    t.bufferData(t.ARRAY_BUFFER, new Float32Array(d), t.DYNAMIC_DRAW),
    o.program_.vertexAttribPointers([{
            name: "a_position",
            stride: 5,
            offset: 0,
            size: 3,
            normalized: !1
        },
        {
            name: "a_texcoord",
            stride: 5,
            offset: 3,
            size: 2,
            normalized: !1
        }]),
    t.drawArrays(t.TRIANGLES, 0, 6)
},
Annotator.prototype.drawCross = function (t, e, i) {
    null == this.vertexBuffer && (this.vertexBuffer = t.createBuffer()),
    t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer);
    var o = e[0],
        n = e[1],
        s = e[2],
        a = viewer_.navigator_.dolly.z.getPresent() / 80,
        r = i,
        h = [];
    h.push(o - a),
    h.push(n),
    h.push(s),
    h.push(r),
    h.push(o + a),
    h.push(n),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n - a),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n + a),
    h.push(s),
    h.push(r),
    h.push(o),
    h.push(n),
    h.push(s - a),
    h.push(r),
    h.push(o),
    h.push(n),
    h.push(s + a),
    h.push(r),
    t.bufferData(t.ARRAY_BUFFER, new Float32Array(h), t.DYNAMIC_DRAW),
    t.vertexAttribPointer(0, 3, t.FLOAT, !1, 16, 0),
    t.drawArrays(t.LINES, 0, 6)
},
Annotator.prototype.drawLine = function (t, e, i) {
    null == this.vertexBuffer && (this.vertexBuffer = t.createBuffer()),
    t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer);
    var o = [];
    o.push(e[0]),
    o.push(e[1]),
    o.push(e[2]),
    o.push(0),
    o.push(i[0]),
    o.push(i[1]),
    o.push(i[2]),
    o.push(0),
    t.bufferData(t.ARRAY_BUFFER, new Float32Array(o), t.DYNAMIC_DRAW),
    t.vertexAttribPointer(0, 3, t.FLOAT, !1, 16, 0),
    t.drawArrays(t.LINES, 0, 2)
},
Annotator.prototype.resolveIndex = function (t) {
    for (var e = 0, i = 0; i < this.tates.length; i++) {
        if (0 != this.tates[i].button.dialog("isOpen") && (e++, t == e)) return i
    }
    return -1
},
Annotator.prototype.draw = function (t, e, i) {
    for (var o = 0, n = 0; n < this.tates.length; n++) {
        var s = this.tates[n];
        if (s.button.dialog("isOpen")) {
            o++;
            var a = "minimized" == s.button.dialogExtend("state");
            if (void 0 != s.entityId && a) {
                var r = viewer_.contentManager_.metadata_.getEntity(s.entityId);
                if (r.ammHidden) continue;
                var h = viewer_.opacity_.getOpacityFromLayering_(r.layers[0])[s.entityId];
                if (h <= .1) continue
            }
            if (void 0 != s.entityId2 && a) {
                var r = viewer_.contentManager_.metadata_.getEntity(s.entityId2);
                if (r.ammHidden) continue;
                var h = viewer_.opacity_.getOpacityFromLayering_(r.layers[0])[s.entityId2];
                if (h <= .1) continue
            }
            this.initDraw(t, s, o, e),
            t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
            e ? i.program_.vertexAttribPointers([{
                name: "a_position",
                stride: 4,
                offset: 0,
                size: 3,
                normalized: !1
            },
            {
                name: "a_colorIndex",
                stride: 4,
                offset: 3,
                size: 1,
                normalized: !1
            }]) : t.vertexAttribPointer(0, 3, t.FLOAT, !1, 16, 0),
            a || t.drawArrays(t.LINES, 0, 2),
            t.disable(t.DEPTH_TEST),
            e ? (this.drawSquare(t, s, o), i.program_.vertexAttribPointers([{
                name: "a_position",
                stride: 4,
                offset: 0,
                size: 3,
                normalized: !1
            },
            {
                name: "a_colorIndex",
                stride: 4,
                offset: 3,
                size: 1,
                normalized: !1
            }]), t.drawArrays(t.TRIANGLES, 0, 12)) : a || (this.drawTarget(t, s, o), t.vertexAttribPointer(0, 3, t.FLOAT, !1, 16, 0), t.drawArrays(t.LINES, 0, 6)),
            t.enable(t.DEPTH_TEST)
        }
    }
},
Annotator.prototype.draw2 = function (t, e, i) {
    for (var o = 0, n = 0; n < this.tates.length; n++) {
        var s = this.tates[n];
        if (s.button.dialog("isOpen")) {
            o++;
            var a = "minimized" == s.button.dialogExtend("state");
            if (void 0 != s.entityId && a) {
                var r = viewer_.contentManager_.metadata_.getEntity(s.entityId);
                if (r.ammHidden) continue;
                var h = viewer_.opacity_.getOpacityFromLayering_(r.layers[0])[s.entityId];
                if (h <= .1) continue
            }
            if (void 0 != s.entityId2 && a) {
                var r = viewer_.contentManager_.metadata_.getEntity(s.entityId2);
                if (r.ammHidden) continue;
                var h = viewer_.opacity_.getOpacityFromLayering_(r.layers[0])[s.entityId2];
                if (h <= .1) continue
            }
            this.doLock ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST),
            e || a && this.drawTarget2(t, s, o, i),
            t.enable(t.DEPTH_TEST)
        }
    }
},
Annotator.prototype.write = function (t) {
    for (var e = {}, i = [], o = 0; o < this.tates.length; o++) {
        var n = this.tates[o];
        if (0 != n.button.dialog("isOpen")) {
            var s = {};
            s.state = n.button.dialogExtend("state"),
            n.button.dialogExtend("restore");
            var a = n.button.parent().position().left,
                r = n.button.parent().position().top,
                h = n.button.parent().width(),
                l = n.button.parent().height(),
                d = viewer_.render_.renderer_.canvas_.width,
                c = viewer_.render_.renderer_.canvas_.height;
            a /= d,
            h /= d,
            r /= c,
            l /= c,
            s.rect = [a, r, h, l],
            s.text = [a, r, h, l];
            var u = n.button.parent().find("#mytext");
            s.text = u.val(),
            s.point = n.point,
            n.entityId && (s.entity = viewer_.contentManager_.metadata_.getEntity(n.entityId).externalId),
            n.entityId2 && (s.entity2 = viewer_.contentManager_.metadata_.getEntity(n.entityId2).externalId),
            "collapsed" == s.state ? n.button.dialogExtend("collapse") : "minimized" == s.state && n.button.dialogExtend("minimize"),
            i.push(s)
        }
    }
    e.values = i,
    t.annotator = e
},
Annotator.prototype.read = function (t) {
    for (var e = t.values, i = 0; i < e.length; i++) {
        var o = this.create(),
            t = e[i],
            n = "";
        for (var s in t) if ("rect" == s) {
                var a = t[s],
                    r = a[0],
                    h = a[1],
                    l = a[2],
                    d = a[3],
                    c = viewer_.render_.renderer_.canvas_.width,
                    u = viewer_.render_.renderer_.canvas_.height;
                r *= c,
                l *= c,
                h *= u,
                d *= u,
                o.button.dialog("option", "position", [r, h]),
                o.button.dialog("option", "width", l),
                o.button.dialog("option", "minHeight", d)
            } else if ("text" == s) {
                var p = o.button.parent().find("#mytext");
                p.val(t[s])
            } else if ("state" == s) n = t[s];
        else if ("entity" == s) {
                o.entityId = viewer_.contentManager_.metadata_.externalIdToId(t[s]);
                var v = viewer_.contentManager_.metadata_.getEntity(o.entityId);
                o.button.dialog("option", "title", v.name),
                o.button.dialogExtend({
                    collapse: null,
                    beforeRestore: null
                })
            } else "entity2" == s ? o.entityId2 = viewer_.contentManager_.metadata_.externalIdToId(t[s]) : "point" == s && (o.point = t[s].slice());
        "collapsed" == n ? o.button.dialogExtend("collapse") : "minimized" == n && o.button.dialogExtend("minimize")
    }
},
Annotator.prototype.create = function () {
    var t = $("<div id='annotationId'> <textarea id='mytext'></textarea> </div>").css({
        zIndex: 0
    }).dialog({
        stack: !1,
        dialogClass: "annotation",
        minHeight: 50,
        width: 200,
        drag: function (t, e) {
            viewer_.changeCallback()
        },
        resize: function (t, e) {
            viewer_.changeCallback()
        },
        open: function (t, e) {
            viewer_.changeCallback()
        },
        close: function (t, e) {
            viewer_.changeCallback()
        },
        beforeClose: function (t, e) {
            return confirm("Delete this Annotation?")
        }
    }).dialogExtend({
        closable: !0,
        collapsable: !0,
        minimizable: !0,
        icons: {
            close: "ui-icon-trash",
            restore: "ui-icon-triangle-1-s"
        },
        beforeMinimize: function (t) {
            $(t.target).dialogExtend("restore"),
            $(t.target).dialogExtend("collapse")
        },
        collapse: function (t) {
            var e = $(t.target).parent().find("#mytext"),
                i = e.val().split("\n");
            if (i.length > 0) {
                    var o = i[0];
                    $(t.target).dialog("option", "title", o)
                }
        },
        beforeRestore: function (t) {
            $(t.target).dialog("option", "title", "")
        },
        minimize: function (t) {
            viewer_.changeCallback()
        }
    });
    return this.add(t)
},
Annotator.prototype.setLock = function (t) {
    this.doLock = t,
    viewer_.changeCallback()
},
Annotator.prototype.import = function (t) {
    for (var e = 0; e < t.length; e++) {
        var i = t[e],
            o = this.create();
        o.point = i.point.slice(0);
        o.button.parent().find("#mytext").val(i.name)
    }
},
window.mobilecheck = function () {
    var t = !1;
    return function (e) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
    }(navigator.userAgent || navigator.vendor || window.opera),
    t
},
o3v.Viewer = function () {
    if (!this.checkWebGL()) return void(window.location.href = "nowebgl");
    if (window.mobilecheck()) 
        for (var t = 0; t < o3v.MODELS.length; t++) {
            //o3v.MODELS[t].mobileModelUri && (o3v.MODELS[t].modelUri = o3v.MODELS[t].mobileModelUri),
            //o3v.MODELS[t].mobileTextureUri && (o3v.MODELS[t].textureUri = o3v.MODELS[t].mobileTextureUri);
    }
    this.history_ = new o3v.History(window),
    this.presets_ = [],
    this.userId_ = 1,
    this.ui_ = new o3v.MainUI(this.nextModelCallback.bind(this)),
    this.navigator_ = new o3v.Navigator(this.changeCallback.bind(this), this.ui_.getCanvas(), this.history_),
    this.select_ = new o3v.SelectManager(this.changeCallback.bind(this), this.navigator_, this.history_),
    this.layerOpacityManager_ = new o3v.LayerOpacityManager,
    this.layersUI_ = new o3v.LayersUI(this.layerOpacityManager_, this.history_),
    this.opacity_ = new o3v.OpacityManager(this.layerOpacityManager_, this.select_, this.changeCallback.bind(this)),
    this.contentManager_ = new o3v.ContentManager,
    this.render_ = new o3v.RenderInterface(this.ui_.getCanvas(), this.opacity_, this.contentManager_),
    window.addEventListener("resize", function () {
        this.render_.handleResize(),
        this.changeCallback()
    }.bind(this), !1),
    this.search_ = new o3v.Search(this.selectCallback.bind(this));
    var e = new o3v.InputHandler(window);
    this.setupInputHandlers_(e),
    this.inputHandler_ = e,
    this.navUI_ = new o3v.navUI(this.navigator_.reset.bind(this.navigator_), this.navigator_.drag.bind(this.navigator_), this.navigator_.scroll.bind(this.navigator_)),
    this.gestures_ = new o3v.Gestures,
    this.label_ = new o3v.Label(e, this.select_, this.render_, this.ui_.getCanvas(), $("#labelcontainer")[0], this.navigator_, this.gestures_),
    this.quiz_ = new zg.Quiz,
    this.annotator = new Annotator,
    this.loadedModel_ = !1,
    this.loadedMetadata_ = !1,
    this.ui_.showLoadingFeedback(!0),
    this.contentManager_.nextModel(this.onModelInfoLoad_.bind(this), this.render_.onMeshLoad.bind(this.render_), this.onModelLoad_.bind(this), this.onMetadataLoad_.bind(this)),
    this.historyStarted_ = !1,
    this.loadPresets(),
    this.navUI_.modelsUI(this.contentManager_.getModelLabels()),
    this.toolMode = 1,
    this.explodePoint = [0, 120, 0],
    this.explodeRange = 0,
    this.slicePoint = [0, 155, 0],
    this.sliceX = 0,
    this.sliceY = 0,
    this.sliceZ = 0
},
o3v.Viewer.TOOL_SELECT = 1,
o3v.Viewer.TOOL_SLICE = 2,
o3v.Viewer.TOOL_EXPLODE = 3,
o3v.Viewer.TOOL_QUIZ = 4,
o3v.Viewer.REFRESH_INTERVAL_ = 20,
o3v.Viewer.prototype.checkWebGL = function () {
    return !!o3v.webGLUtil.browserSupportsWebGL(document.getElementById("gltest"))
},
o3v.Viewer.prototype.onModelInfoLoad_ = function (t) {
    this.ui_.setModelSelectorButton("body/images/help.png"),
    this.layersUI_.buildAll(this.ui_.getLastButton(), t.numLayers, t.layerIconsFile),
    this.layerOpacityManager_.init(t.numLayers)
},
o3v.Viewer.prototype.onMetadataLoad_ = function () {
    var t = this.contentManager_.getMetadata();
    this.search_.reset(this.contentManager_.getMetadata().getAutocompleteList()),
    this.select_.reset(t),
    this.label_.reset(t),
    this.opacity_.reset(t),
    this.loadedMetadata_ = !0,
    this.loadedModel_ && this.onModelAndMetadataLoad_()
},
o3v.Viewer.prototype.onModelLoad_ = function () {
    this.loadedModel_ = !0,
    this.render_.onModelLoad(),
    this.loadedMetadata_ && this.onModelAndMetadataLoad_()
},
o3v.Viewer.prototype.resetTools = function () {
    this.toolMode = 1,
    this.explodePoint = [0, 120, 0],
    this.explodeRange = 0,
    this.slicePoint = [0, 155, 0],
    this.sliceX = 0,
    this.sliceY = 0,
    this.sliceZ = 0
},
o3v.Viewer.prototype.onModelAndMetadataLoad_ = function () {
    this.contentManager_.getMetadata().computeBboxes(this.render_.getBboxes()),
    this.navigator_.resetModel(this.contentManager_.getMetadata().getRootEntity().bbox),
    this.ui_.showLoadingFeedback(!1),
    this.historyStarted_ ? (this.navigator_.reset(), this.modelReady ? this.modelReady() : this.history_.checkRestartRestore()) : (this.history_.start(), this.historyStarted_ = !0, this.modelReady ? this.modelReady() : this.history_.checkRestartRestore()),
    this.modelReady = null,
    this.changeCallback(),
    this.navUI_.refresh()
},
o3v.Viewer.prototype.nextModelCallback = function () {
    this.loadedModel_ = !1,
    this.loadedMetadata_ = !1,
    this.navUI_.resetTools(),
    this.resetTools(),
    this.render_.reset(),
    this.ui_.showLoadingFeedback(!0),
    this.contentManager_.nextModel(this.onModelInfoLoad_.bind(this), this.render_.onMeshLoad.bind(this.render_), this.onModelLoad_.bind(this), this.onMetadataLoad_.bind(this)),
    this.navUI_.resetPresetsUI(),
    this.loadPresets()
},
o3v.Viewer.prototype.loadModelCallback = function (t, e) {
    this.select_.clearSelection(),
    void 0 == e && (e = "label"),
    this.loadedModel_ = !1,
    this.loadedMetadata_ = !1,
    this.navUI_.resetTools(),
    this.resetTools(),
    this.render_.reset(),
    this.annotator.deleteAll(),
    this.ui_.showLoadingFeedback(!0),
    this.contentManager_.loadModel(t, e, this.onModelInfoLoad_.bind(this), this.render_.onMeshLoad.bind(this.render_), this.onModelLoad_.bind(this), this.onMetadataLoad_.bind(this)),
    this.navUI_.resetPresetsUI(),
    this.loadPresets()
},
o3v.Viewer.prototype.loadModel = function (t, e) {
    this.navUI_.resetTools(),
    this.resetTools(),
    this.modelReady = e,
    this.loadModelCallback(t, "id")
},
o3v.Viewer.prototype.changeCallback = function (t) {
    if (!this.loadedMetadata_ || !this.loadedModel_) return void window.setTimeout(this.changeCallback.bind(this), o3v.Viewer.REFRESH_INTERVAL_);
    if (t) {
        var e = !1;
        if (e = this.select_.recalculate() || e, e = this.opacity_.recalculate() || e, !(e = this.navigator_.recalculate() || e)) return
    }
    this.render_.refresh(this.navigator_.camera),
    this.label_.refresh(),
    window.setTimeout(function () {
        this.changeCallback(!0)
    }.bind(this), o3v.Viewer.REFRESH_INTERVAL_)
},
o3v.Viewer.prototype.selectCallback = function (t) {
    if (this.loadedMetadata_ && this.loadedModel_) {
        var e = this.contentManager_.getMetadata().searchToEntityIds(t);
        if (this.select_.selectMultiple(e), this.select_.haveSelected()) {
            this.opacity_.exposeSelected();
            var i = this.navigator_.focusOnEntities(this.select_.getSelected());
            this.navigator_.goToBBox(i)
        } else this.navigator_.resetNavParameters()
    }
},
o3v.Viewer.prototype.handleClick = function (t, e, i) {
    var o = {},
        n = this.render_.identify(t, e, o);
    if (this.dragTate = 0 < o.value && o.value < 100 ? o.value : null, n) {
            var s = this.contentManager_.getMetadata().externalIdToId(n),
                a = this.contentManager_.getMetadata().getEntity(s);
            if (zg.account.isLiteUser() && ("clothes" == a.name || "shorts" == a.name || "female skin" == a.name || "skin" == a.name || "m_skin" == a.name || "male skin" == a.name)) return;
            if (this.gestures_.isHideClick(i[o3v.InputHandler.CONTROL], i[o3v.InputHandler.META])) this.select_.hide(s);
            else if (i[o3v.InputHandler.SHIFT]) this.select_.togglePin(s);
            else if (this.toolMode == o3v.Viewer.TOOL_QUIZ) this.select_.pickMultiple([s]),
            this.quiz_.show(this.select_.getSelected());
            else {
                    this.select_.pickMultiple([s]);
                    var r = this.navigator_.focusOnEntities(this.select_.getSelected());
                    this.navigator_.goToBBox(r, !0)
                }
        } else this.select_.clearSelection(),
    this.navigator_.doOrbit || this.navigator_.resetNavParameters(),
    this.quiz_.hide();
    this.changeCallback()
};
o3v.Viewer.prototype.handleMousehold = function (t, e) {
    var i = {};
    this.render_.identify(e.clientX, e.clientY, i);
    if (this.toolMode == o3v.Viewer.TOOL_EXPLODE) return !0;
    if (0 < i.value && i.value < 100) {
        this.dragTate = i.value;
        var o = this.annotator.resolveIndex(this.dragTate);
        if (-1 != o) {
            var n = this.annotator.tates[o];
            if ("minimized" == n.button.dialogExtend("state")) return n.button.dialogExtend("restore"),
            n.button.dialogExtend("collapse"),
            this.changeCallback(),
            this.dragTate = null,
            !0
        }
        return !this.annotator.doLock || (this.dragTate = null, !1)
    }
    return this.dragTate = null,
    !1
},
o3v.Viewer.prototype.handleDrag = function (t, e, i, o, n) {
    if (n.altKey) return !1;
    if (this.toolMode == o3v.Viewer.TOOL_EXPLODE) {
        var s = (this.navigator_.dolly.z.getPresent(), viewer_.render_.renderer_.getViewportCoords(this.explodePoint)),
            a = viewer_.render_.renderer_.getModelCoords([i, o, s[2]]);
        return this.explodePoint[0] = a[0],
        this.explodePoint[1] = a[1],
        this.explodePoint[2] = a[2],
        this.changeCallback(),
        !0
    }
    if (this.toolMode == o3v.Viewer.TOOL_SLICE) {
        var s = (this.navigator_.dolly.z.getPresent(), viewer_.render_.renderer_.getViewportCoords(this.slicePoint)),
            a = viewer_.render_.renderer_.getModelCoords([i, o, s[2]]);
        return this.slicePoint[0] = a[0],
        this.slicePoint[1] = a[1],
        this.slicePoint[2] = a[2],
        this.changeCallback(),
        !0
    }
    if (this.dragTate) {
        var r = this.annotator.resolveIndex(this.dragTate),
            s = (this.navigator_.dolly.z.getPresent(), viewer_.render_.renderer_.getViewportCoords(this.annotator.tates[r].point)),
            a = viewer_.render_.renderer_.getModelCoords([i, o, s[2]]);
        return this.annotator.tates[r].point[0] = a[0],
        this.annotator.tates[r].point[1] = a[1],
        this.annotator.tates[r].point[2] = a[2],
        this.changeCallback(),
        !0
    }
    return !1
},
o3v.Viewer.prototype.setupInputHandlers_ = function (t) {
    t.registerHandler(o3v.InputHandler.MOUSEHOLD, $("#viewer")[0], this.handleMousehold.bind(this), !0),
    t.registerHandler(o3v.InputHandler.DRAG, $("#viewer")[0], this.handleDrag.bind(this), !0),
    t.registerHandler(o3v.InputHandler.DRAG, $("#viewer")[0], this.navigator_.drag.bind(this.navigator_), !0),
    t.registerHandler(o3v.InputHandler.SCROLL, $("#viewer")[0], this.navigator_.scroll.bind(this.navigator_), !0),
    t.registerHandler(o3v.InputHandler.CLICK, $("#viewer")[0], this.handleClick.bind(this), !0),
    new o3v.NavKeyHandler(t, function (t, e, i) {
        this.navigator_.drag(10 * t, -10 * e),
        this.navigator_.scroll(0, 30 * i)
    }.bind(this), this.navigator_.reset.bind(this.navigator_)),
    t.registerHandler(o3v.InputHandler.KEYDOWN, null, function (t) {}.bind(this))
},
o3v.Viewer.prototype.toggleHelp_ = function () {
    $("#facebox #help-content").is(":visible") ? $(document).trigger("close.facebox") : $("#link-help").trigger("click")
},
o3v.Viewer.prototype.loadPresets = function () {
    this.presets_ = []
},
o3v.Viewer.prototype.parsePresets = function (t) {
    for (var e = [], i = 0; i < t.length; i++) {
        var o = t[i];
        this.presets_.push(o),
        e.push(o.name)
    }
    this.navUI_.presetsUI(e)
},
o3v.Viewer.prototype.createPreset = function (t) {
    var e = {
        name: t,
        history: this.history_.generateState_(),
        select: this.select_.getStateExtId()
    };
    this.presets_.push(e)
},
o3v.Viewer.prototype.savePresets = function () {
    $.ajax({
        type: "PUT",
        url: "server/index.php/users/" + this.userId_ + "/models/" + this.contentManager_.modelId() + "/presets",
        contentType: "application/json",
        data: JSON.stringify(this.presets_),
        success: function (t) {
            alert("Presets Saved")
        }
    })
},
o3v.Viewer.prototype.doPreset = function (t) {
    this.select_.clearSelection(),
    this.navigator_.resetNavParameters();
    for (var e = 0; e < this.presets_.length; e++) {
        var i = this.presets_[e];
        if (i.name == t) return this.history_.restoreState_(i.history),
        void("select" in i && this.select_.restoreStateExtId(i.select))
    }
},
o3v.Viewer.prototype.doImage = function () {
    return this.render_.renderer_.canvas_.toDataURL()
};