function printCanvas(e, t, i, r) {
    var n = function (e, t, i, r) {
        var n = r / i;
        return i >= e && n <= 1 ? (i = e, r = e * n) : r >= t && (r = t, i = t / n),
        {
            width: i,
            height: r
        }
    },
    h = function () {
        var e = document.createElement("canvas");
        e.width = t,
        e.height = i;
        var h = e.getContext("2d");
        h.fillStyle = "white",
        h.fillRect(0, 0, e.width, e.height);
        var d = n(e.width, e.height, a.width, a.height),
            o = (e.width - d.width) / 2,
            w = (e.height - d.height) / 2;
        h.drawImage(a, o, w, d.width, d.height),
        r && r(e.toDataURL("image/png"))
    },
    a = new Image;
    a.onload = h,
    a.src = e
}
zg.Paint = function () {
    var e = viewer_.render_.renderer_.canvas_.width,
        t = viewer_.render_.renderer_.canvas_.height;
    printCanvas(viewer_.doImage(), e, t, function (e) {
            var t = window.open();
            t.document.open(),
            t.document.write('<iframe src="' + e + '" frameborder="0" style="border:0; top:; left:; bottom:; right:; width:100%; height:100%;" allowfullscreen></iframe>'),
            t.document.close()
        })
};