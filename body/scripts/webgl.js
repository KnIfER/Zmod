function createContextFromCanvas(t) {
    var e = null;
    try {
        e = t.getContext("webgl", {
            preserveDrawingBuffer: !0
        })
    } catch (t) {}
    if (!e) try {
        e = t.getContext("experimental-webgl")
    } catch (t) {}
    return e
}
function Shader(t, e, r) {
    if (this.gl_ = t, this.handle_ = t.createShader(r), t.shaderSource(this.handle_, e), t.compileShader(this.handle_), !t.getShaderParameter(this.handle_, t.COMPILE_STATUS)) {
        //throw this.info()
        console.log("throw this.info()");
    }
}
function vertexShader(t, e) {
    return new Shader(t, e, t.VERTEX_SHADER)
}
function fragmentShader(t, e) {
    return new Shader(t, e, t.FRAGMENT_SHADER)
}
function Program(t, e) {
    if (this.gl_ = t, this.handle_ = t.createProgram(), e.forEach(function (e) {
        t.attachShader(this.handle_, e.handle_)
    }, this), t.linkProgram(this.handle_), !t.getProgramParameter(this.handle_, t.LINK_STATUS)) throw this.info();
    var r = t.getProgramParameter(this.handle_, t.ACTIVE_ATTRIBUTES);
    this.attribs = [],
    this.set_attrib = {};
    for (var i = 0; i < r; i++) {
        var a = t.getActiveAttrib(this.handle_, i),
            n = t.getAttribLocation(this.handle_, a.name);
        this.attribs[n] = a,
        this.set_attrib[a.name] = n
    }
    var s = t.getProgramParameter(this.handle_, t.ACTIVE_UNIFORMS);
    this.uniforms = [],
    this.set_uniform = {};
    for (var o = 0; o < s; o++) {
        var _ = t.getActiveUniform(this.handle_, o);
        this.uniforms[o] = _,
        this.set_uniform[_.name] = t.getUniformLocation(this.handle_, _.name)
    }
    this.enabledVertexAttribArrays_ = {}
}
function textureFromArray(t, e, r, i, a) {
    var a = a || t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, a),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
    t.texImage2D(t.TEXTURE_2D, 0, t.RGB, e, r, 0, t.RGB, t.UNSIGNED_BYTE, i),
    a
}
function textureFromImage(t, e, r) {
    return r = r || t.createTexture(),
    t.bindTexture(t.TEXTURE_2D, r),
    t.texImage2D(t.TEXTURE_2D, 0, t.RGB, t.RGB, t.UNSIGNED_BYTE, e),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR),
    t.generateMipmap(t.TEXTURE_2D),
    r
}
function textureFromUrl(t, e, r) {
    var i = TEXTURE_CACHE[e];
    if (i) return i;
    var a = t.createTexture();
    textureFromArray(t, 1, 1, new Uint8Array([150, 150, 150]), a);
    var n = new Image;
    return CDN_ENABLED && (n.crossOrigin = ""),
    n.onload = function () {
        textureFromImage(t, n, a),
        r && r(t, a)
    },
    n.onerror = function () {
        textureFromArray(t, 1, 1, new Uint8Array([255, 255, 255]), a),
        r && r(t, a)
    },
    n.src = e,
    TEXTURE_CACHE[e] = a,
    a
}
function textureFromUrl2(t, e, r) {
    var i = TEXTURE_CACHE[e];
    if (i) return i;
    var a = t.createTexture(),
        n = new Image;
    return CDN_ENABLED && (n.crossOrigin = ""),
    n.onload = function () {
            textureFromImage2(t, n, a),
            r && r(t, a)
        },
    n.onerror = function () {
            textureFromArray(t, 1, 1, new Uint8Array([255, 255, 255]), a),
            r && r(t, a)
        },
    n.src = e,
    TEXTURE_CACHE[e] = a,
    a
}
function textureFromImage2(t, e, r) {
    return r = r || t.createTexture(),
    t.bindTexture(t.TEXTURE_2D, r),
    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR),
    t.generateMipmap(t.TEXTURE_2D),
    r
}
function attribBufferData(t, e) {
    var r = t.createBuffer();
    return t.bindBuffer(t.ARRAY_BUFFER, r),
    t.bufferData(t.ARRAY_BUFFER, e, t.STATIC_DRAW),
    r
}
function indexBufferData(t, e) {
    var r = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, r),
    t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.STATIC_DRAW),
    r
}
function addToDisplayList(t, e, r) {
    var i = t.length - 1;
    e === t[i] ? t[i] = r : t.push(e, r)
}
function Mesh(t, e, r, i, a, n, s, o, _, h) {
    this.gl_ = t,
    this.attribArrays_ = i,
    this.numIndices_ = r.length,
    this.texture_ = a || null,
    o && (this.bboxen_ = attribBufferData(t, o)),
    this.opt_bboxen_ = o,
    this.vbo_ = attribBufferData(t, e),
    this.ibo_ = indexBufferData(t, r),
    this.names_ = n || [],
    this.material = h,
    this.lengths_ = s || [],
    this.starts_ = [];
    for (var u = this.lengths_.length, f = 0, c = 0; c < u; ++c) this.starts_[c] = f,
    f += this.lengths_[c];
    if (void 0 !== _) {
        for (var l = -1, c = 0; c < u; c++) for (var m = this.starts_[c], d = this.lengths_[c], v = m; v < m + d; v++) r[v] >= l && (l = r[v] + 1);
        for (var p = new Float32Array(l), c = 0; c < u; c++) for (var m = this.starts_[c], d = this.lengths_[c], v = m; v < m + d; v++) p[r[v]] = _ + c;
        this.cbo_ = attribBufferData(t, p)
    }
    this.leaderPoints_ = [];
    for (var c = 0; c < u; c++) {
        for (var m = this.starts_[c], d = this.lengths_[c], g = 1e8, E = 1e8, R = 1e8, v = m; v < m + d; v++) {
            var b = r[v],
                T = e[8 * b + 0],
                A = e[8 * b + 1],
                x = e[8 * b + 2];
            A < E && (g = T, E = A, R = x)
        }
        this.leaderPoints_.push([g, E, R])
    }
}
function decompressAttribsInner_(t, e, r, i, a, n, s, o) {
    for (var _ = 0, h = e; h < r; h++) {
        var u = t.charCodeAt(h);
        _ += u >> 1 ^ -(1 & u),
        i[a] = o * (_ + s),
        a += n
    }
}
function decompressIndices_(t, e, r, i, a) {
    for (var n = 0, s = 0; s < r; s++) {
        var o = t.charCodeAt(e++);
        i[a++] = n - o,
        0 == o && n++
    }
}
function decompressAABBs_(t, e, r, i, a) {
    for (var n = 6 * r, s = e + n, o = new Float32Array(n), _ = 0, h = e; h < s; h += 6) {
        var u = t.charCodeAt(h + 0) + i[0],
            f = t.charCodeAt(h + 1) + i[1],
            c = t.charCodeAt(h + 2) + i[2],
            l = t.charCodeAt(h + 3) + 1,
            m = t.charCodeAt(h + 4) + 1,
            d = t.charCodeAt(h + 5) + 1;
        o[_++] = a[0] * u,
        o[_++] = a[1] * f,
        o[_++] = a[2] * c,
        o[_++] = a[0] * (u + l),
        o[_++] = a[1] * (f + m),
        o[_++] = a[2] * (c + d)
    }
    return o
}
function decompressMesh(t, e, r, i) {
    for (var a = r.decodeScales.length, n = r.decodeOffsets, s = r.decodeScales, o = e.attribRange[0], _ = e.attribRange[1], h = o, u = new Float32Array(a * _), f = 0; f < a; f++) {
        var c = h + _,
            l = s[f];
        l && decompressAttribsInner_(t, h, c, u, f, a, n[f], l),
        h = c
    }
    var m = (e.indexRange[0], 3 * e.indexRange[1]),
        d = new Uint16Array(m);
    decompressIndices_(t, h, m, d, 0);
    var v = void 0,
        p = e.bboxes;
    p && (v = decompressAABBs_(t, p, e.names.length, n, s)),
    i(u, d, v, e)
}
function downloadMesh(t, e, r, i) {
    function a(t, a) {
        for (; n < e.length;) {
            var s = e[n],
                o = s.bboxes + 6 * s.names.length;
            if (t.responseText.length < o) break;
            decompressMesh(t.responseText, s, r, i),
            ++n
        }
    }
    var n = 0;
    getHttpRequest(t, function (t, e) {
        200 !== t.status && 0 !== t.status || a(t, e)
    }, a)
}
function downloadMeshes(t, e, r, i) {
    for (var a in e) {
        downloadMesh(t + a, e[a], r, i)
    }
}
function downloadModel(t, e, r, i) {
    var e = MODELS[e],
        a = 0,
        n = 0;
    o3v.util.forEach(e.urls, function (t) {
            a += t.length
        }),
    n = a;
    var s = function (t, e, s, o) {
            void 0 !== r && r(t, e, s, o),
            a -= 1,
            updateProgress(a, n),
            0 == a && void 0 !== i && i()
        };
    downloadMeshes(t, e.urls, e.decodeParams, s)
}
function updateProgress(t, e) {
    if (e > 0 && e > t) {
        var r = (e - t) / e * 240;
        $("#loading-bar").css("width", r + "px")
    }
}
function Renderer(t, e) {
    getHttpRequest("body/scripts/shaders_alt.txt", this.onloadShaders.bind(this)),
    this.canvas_ = t,
    this.textureFromMaterialFunction_ = e;
    var r = createContextFromCanvas(t);
    this.gl_ = r,
    this.zNear_ = Math.sqrt(3),
    this.identity_ = mat4.identity(mat4.create()),
    this.model_ = mat4.identity(mat4.create()),
    this.view_ = mat4.identity(mat4.create()),
    this.proj_ = mat4.create(),
    this.mvp_ = mat4.create(),
    this.mv_ = mat4.create(),
    this.meshes_ = [],
    r.clearColor(0, 0, 0, 0),
    r.enable(r.CULL_FACE),
    r.enable(r.DEPTH_TEST),
    r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0),
    r.blendFunc(r.ONE, r.ONE_MINUS_SRC_ALPHA),
    this.handleResize(),
    mat4.translate(this.view_, [0, 0, -1]),
    this.selectionFbo_ = {
        width: 0,
        height: 0
    },
    this.forceColored_ = !1
}
var MatrixArray = "undefined" != typeof Float32Array ? Float32Array : Array,
    glMatrixArrayType = MatrixArray,
    vec3 = {},
    mat3 = {},
    mat4 = {},
    quat4 = {};
vec3.create = function (t) {
        var e = new MatrixArray(3);
        return t && (e[0] = t[0], e[1] = t[1], e[2] = t[2]),
        e
    },
vec3.set = function (t, e) {
        return e[0] = t[0],
        e[1] = t[1],
        e[2] = t[2],
        e
    },
vec3.add = function (t, e, r) {
        return r && t !== r ? (r[0] = t[0] + e[0], r[1] = t[1] + e[1], r[2] = t[2] + e[2], r) : (t[0] += e[0], t[1] += e[1], t[2] += e[2], t)
    },
vec3.subtract = function (t, e, r) {
        return r && t !== r ? (r[0] = t[0] - e[0], r[1] = t[1] - e[1], r[2] = t[2] - e[2], r) : (t[0] -= e[0], t[1] -= e[1], t[2] -= e[2], t)
    },
vec3.negate = function (t, e) {
        return e || (e = t),
        e[0] = -t[0],
        e[1] = -t[1],
        e[2] = -t[2],
        e
    },
vec3.scale = function (t, e, r) {
        return r && t !== r ? (r[0] = t[0] * e, r[1] = t[1] * e, r[2] = t[2] * e, r) : (t[0] *= e, t[1] *= e, t[2] *= e, t)
    },
vec3.normalize = function (t, e) {
        e || (e = t);
        var r = t[0],
            i = t[1],
            a = t[2],
            n = Math.sqrt(r * r + i * i + a * a);
        return n ? 1 === n ? (e[0] = r, e[1] = i, e[2] = a, e) : (n = 1 / n, e[0] = r * n, e[1] = i * n, e[2] = a * n, e) : (e[0] = 0, e[1] = 0, e[2] = 0, e)
    },
vec3.cross = function (t, e, r) {
        r || (r = t);
        var i = t[0],
            a = t[1],
            t = t[2],
            n = e[0],
            s = e[1],
            e = e[2];
        return r[0] = a * e - t * s,
        r[1] = t * n - i * e,
        r[2] = i * s - a * n,
        r
    },
vec3.length = function (t) {
        var e = t[0],
            r = t[1],
            t = t[2];
        return Math.sqrt(e * e + r * r + t * t)
    },
vec3.dot = function (t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    },
vec3.direction = function (t, e, r) {
        r || (r = t);
        var i = t[0] - e[0],
            a = t[1] - e[1],
            t = t[2] - e[2],
            e = Math.sqrt(i * i + a * a + t * t);
        return e ? (e = 1 / e, r[0] = i * e, r[1] = a * e, r[2] = t * e, r) : (r[0] = 0, r[1] = 0, r[2] = 0, r)
    },
vec3.lerp = function (t, e, r, i) {
        return i || (i = t),
        i[0] = t[0] + r * (e[0] - t[0]),
        i[1] = t[1] + r * (e[1] - t[1]),
        i[2] = t[2] + r * (e[2] - t[2]),
        i
    },
vec3.str = function (t) {
        return "[" + t[0] + ", " + t[1] + ", " + t[2] + "]"
    },
mat3.create = function (t) {
        var e = new MatrixArray(9);
        return t && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8]),
        e
    },
mat3.set = function (t, e) {
        return e[0] = t[0],
        e[1] = t[1],
        e[2] = t[2],
        e[3] = t[3],
        e[4] = t[4],
        e[5] = t[5],
        e[6] = t[6],
        e[7] = t[7],
        e[8] = t[8],
        e
    },
mat3.identity = function (t) {
        return t[0] = 1,
        t[1] = 0,
        t[2] = 0,
        t[3] = 0,
        t[4] = 1,
        t[5] = 0,
        t[6] = 0,
        t[7] = 0,
        t[8] = 1,
        t
    },
mat3.transpose = function (t, e) {
        if (!e || t === e) {
            var r = t[1],
                i = t[2],
                a = t[5];
            return t[1] = t[3],
            t[2] = t[6],
            t[3] = r,
            t[5] = t[7],
            t[6] = i,
            t[7] = a,
            t
        }
        return e[0] = t[0],
        e[1] = t[3],
        e[2] = t[6],
        e[3] = t[1],
        e[4] = t[4],
        e[5] = t[7],
        e[6] = t[2],
        e[7] = t[5],
        e[8] = t[8],
        e
    },
mat3.toMat4 = function (t, e) {
        return e || (e = mat4.create()),
        e[15] = 1,
        e[14] = 0,
        e[13] = 0,
        e[12] = 0,
        e[11] = 0,
        e[10] = t[8],
        e[9] = t[7],
        e[8] = t[6],
        e[7] = 0,
        e[6] = t[5],
        e[5] = t[4],
        e[4] = t[3],
        e[3] = 0,
        e[2] = t[2],
        e[1] = t[1],
        e[0] = t[0],
        e
    },
mat3.str = function (t) {
        return "[" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + "]"
    },
mat4.create = function (t) {
        var e = new MatrixArray(16);
        return t && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]),
        e
    },
mat4.set = function (t, e) {
        return e[0] = t[0],
        e[1] = t[1],
        e[2] = t[2],
        e[3] = t[3],
        e[4] = t[4],
        e[5] = t[5],
        e[6] = t[6],
        e[7] = t[7],
        e[8] = t[8],
        e[9] = t[9],
        e[10] = t[10],
        e[11] = t[11],
        e[12] = t[12],
        e[13] = t[13],
        e[14] = t[14],
        e[15] = t[15],
        e
    },
mat4.identity = function (t) {
        return t[0] = 1,
        t[1] = 0,
        t[2] = 0,
        t[3] = 0,
        t[4] = 0,
        t[5] = 1,
        t[6] = 0,
        t[7] = 0,
        t[8] = 0,
        t[9] = 0,
        t[10] = 1,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        t
    },
mat4.transpose = function (t, e) {
        if (!e || t === e) {
            var r = t[1],
                i = t[2],
                a = t[3],
                n = t[6],
                s = t[7],
                o = t[11];
            return t[1] = t[4],
            t[2] = t[8],
            t[3] = t[12],
            t[4] = r,
            t[6] = t[9],
            t[7] = t[13],
            t[8] = i,
            t[9] = n,
            t[11] = t[14],
            t[12] = a,
            t[13] = s,
            t[14] = o,
            t
        }
        return e[0] = t[0],
        e[1] = t[4],
        e[2] = t[8],
        e[3] = t[12],
        e[4] = t[1],
        e[5] = t[5],
        e[6] = t[9],
        e[7] = t[13],
        e[8] = t[2],
        e[9] = t[6],
        e[10] = t[10],
        e[11] = t[14],
        e[12] = t[3],
        e[13] = t[7],
        e[14] = t[11],
        e[15] = t[15],
        e
    },
mat4.determinant = function (t) {
        var e = t[0],
            r = t[1],
            i = t[2],
            a = t[3],
            n = t[4],
            s = t[5],
            o = t[6],
            _ = t[7],
            h = t[8],
            u = t[9],
            f = t[10],
            c = t[11],
            l = t[12],
            m = t[13],
            d = t[14],
            t = t[15];
        return l * u * o * a - h * m * o * a - l * s * f * a + n * m * f * a + h * s * d * a - n * u * d * a - l * u * i * _ + h * m * i * _ + l * r * f * _ - e * m * f * _ - h * r * d * _ + e * u * d * _ + l * s * i * c - n * m * i * c - l * r * o * c + e * m * o * c + n * r * d * c - e * s * d * c - h * s * i * t + n * u * i * t + h * r * o * t - e * u * o * t - n * r * f * t + e * s * f * t
    },
mat4.inverse = function (t, e) {
        e || (e = t);
        var r = t[0],
            i = t[1],
            a = t[2],
            n = t[3],
            s = t[4],
            o = t[5],
            _ = t[6],
            h = t[7],
            u = t[8],
            f = t[9],
            c = t[10],
            l = t[11],
            m = t[12],
            d = t[13],
            v = t[14],
            p = t[15],
            g = r * o - i * s,
            E = r * _ - a * s,
            R = r * h - n * s,
            b = i * _ - a * o,
            T = i * h - n * o,
            A = a * h - n * _,
            x = u * d - f * m,
            y = u * v - c * m,
            M = u * p - l * m,
            w = f * v - c * d,
            F = f * p - l * d,
            L = c * p - l * v,
            P = 1 / (g * L - E * F + R * w + b * M - T * y + A * x);
        return e[0] = (o * L - _ * F + h * w) * P,
        e[1] = (-i * L + a * F - n * w) * P,
        e[2] = (d * A - v * T + p * b) * P,
        e[3] = (-f * A + c * T - l * b) * P,
        e[4] = (-s * L + _ * M - h * y) * P,
        e[5] = (r * L - a * M + n * y) * P,
        e[6] = (-m * A + v * R - p * E) * P,
        e[7] = (u * A - c * R + l * E) * P,
        e[8] = (s * F - o * M + h * x) * P,
        e[9] = (-r * F + i * M - n * x) * P,
        e[10] = (m * T - d * R + p * g) * P,
        e[11] = (-u * T + f * R - l * g) * P,
        e[12] = (-s * w + o * y - _ * x) * P,
        e[13] = (r * w - i * y + a * x) * P,
        e[14] = (-m * b + d * E - v * g) * P,
        e[15] = (u * b - f * E + c * g) * P,
        e
    },
mat4.toRotationMat = function (t, e) {
        return e || (e = mat4.create()),
        e[0] = t[0],
        e[1] = t[1],
        e[2] = t[2],
        e[3] = t[3],
        e[4] = t[4],
        e[5] = t[5],
        e[6] = t[6],
        e[7] = t[7],
        e[8] = t[8],
        e[9] = t[9],
        e[10] = t[10],
        e[11] = t[11],
        e[12] = 0,
        e[13] = 0,
        e[14] = 0,
        e[15] = 1,
        e
    },
mat4.toMat3 = function (t, e) {
        return e || (e = mat3.create()),
        e[0] = t[0],
        e[1] = t[1],
        e[2] = t[2],
        e[3] = t[4],
        e[4] = t[5],
        e[5] = t[6],
        e[6] = t[8],
        e[7] = t[9],
        e[8] = t[10],
        e
    },
mat4.toInverseMat3 = function (t, e) {
        var r = t[0],
            i = t[1],
            a = t[2],
            n = t[4],
            s = t[5],
            o = t[6],
            _ = t[8],
            h = t[9],
            u = t[10],
            f = u * s - o * h,
            c = -u * n + o * _,
            l = h * n - s * _,
            m = r * f + i * c + a * l;
        return m ? (m = 1 / m, e || (e = mat3.create()), e[0] = f * m, e[1] = (-u * i + a * h) * m, e[2] = (o * i - a * s) * m, e[3] = c * m, e[4] = (u * r - a * _) * m, e[5] = (-o * r + a * n) * m, e[6] = l * m, e[7] = (-h * r + i * _) * m, e[8] = (s * r - i * n) * m, e) : null
    },
mat4.multiply = function (t, e, r) {
        r || (r = t);
        var i = t[0],
            a = t[1],
            n = t[2],
            s = t[3],
            o = t[4],
            _ = t[5],
            h = t[6],
            u = t[7],
            f = t[8],
            c = t[9],
            l = t[10],
            m = t[11],
            d = t[12],
            v = t[13],
            p = t[14],
            t = t[15],
            g = e[0],
            E = e[1],
            R = e[2],
            b = e[3],
            T = e[4],
            A = e[5],
            x = e[6],
            y = e[7],
            M = e[8],
            w = e[9],
            F = e[10],
            L = e[11],
            P = e[12],
            U = e[13],
            I = e[14],
            e = e[15];
        return r[0] = g * i + E * o + R * f + b * d,
        r[1] = g * a + E * _ + R * c + b * v,
        r[2] = g * n + E * h + R * l + b * p,
        r[3] = g * s + E * u + R * m + b * t,
        r[4] = T * i + A * o + x * f + y * d,
        r[5] = T * a + A * _ + x * c + y * v,
        r[6] = T * n + A * h + x * l + y * p,
        r[7] = T * s + A * u + x * m + y * t,
        r[8] = M * i + w * o + F * f + L * d,
        r[9] = M * a + w * _ + F * c + L * v,
        r[10] = M * n + w * h + F * l + L * p,
        r[11] = M * s + w * u + F * m + L * t,
        r[12] = P * i + U * o + I * f + e * d,
        r[13] = P * a + U * _ + I * c + e * v,
        r[14] = P * n + U * h + I * l + e * p,
        r[15] = P * s + U * u + I * m + e * t,
        r
    },
mat4.multiplyVec3 = function (t, e, r) {
        r || (r = e);
        var i = e[0],
            a = e[1],
            e = e[2];
        return r[0] = t[0] * i + t[4] * a + t[8] * e + t[12],
        r[1] = t[1] * i + t[5] * a + t[9] * e + t[13],
        r[2] = t[2] * i + t[6] * a + t[10] * e + t[14],
        r
    },
mat4.multiplyVec4 = function (t, e, r) {
        r || (r = e);
        var i = e[0],
            a = e[1],
            n = e[2],
            e = e[3];
        return r[0] = t[0] * i + t[4] * a + t[8] * n + t[12] * e,
        r[1] = t[1] * i + t[5] * a + t[9] * n + t[13] * e,
        r[2] = t[2] * i + t[6] * a + t[10] * n + t[14] * e,
        r[3] = t[3] * i + t[7] * a + t[11] * n + t[15] * e,
        r
    },
mat4.translate = function (t, e, r) {
        var i, a, n, s, o, _, h, u, f, c, l, m, d = e[0],
            v = e[1],
            e = e[2];
        return r && t !== r ? (i = t[0], a = t[1], n = t[2], s = t[3], o = t[4], _ = t[5], h = t[6], u = t[7], f = t[8], c = t[9], l = t[10], m = t[11], r[0] = i, r[1] = a, r[2] = n, r[3] = s, r[4] = o, r[5] = _, r[6] = h, r[7] = u, r[8] = f, r[9] = c, r[10] = l, r[11] = m, r[12] = i * d + o * v + f * e + t[12], r[13] = a * d + _ * v + c * e + t[13], r[14] = n * d + h * v + l * e + t[14], r[15] = s * d + u * v + m * e + t[15], r) : (t[12] = t[0] * d + t[4] * v + t[8] * e + t[12], t[13] = t[1] * d + t[5] * v + t[9] * e + t[13], t[14] = t[2] * d + t[6] * v + t[10] * e + t[14], t[15] = t[3] * d + t[7] * v + t[11] * e + t[15], t)
    },
mat4.scale = function (t, e, r) {
        var i = e[0],
            a = e[1],
            e = e[2];
        return r && t !== r ? (r[0] = t[0] * i, r[1] = t[1] * i, r[2] = t[2] * i, r[3] = t[3] * i, r[4] = t[4] * a, r[5] = t[5] * a, r[6] = t[6] * a, r[7] = t[7] * a, r[8] = t[8] * e, r[9] = t[9] * e, r[10] = t[10] * e, r[11] = t[11] * e, r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = t[15], r) : (t[0] *= i, t[1] *= i, t[2] *= i, t[3] *= i, t[4] *= a, t[5] *= a, t[6] *= a, t[7] *= a, t[8] *= e, t[9] *= e, t[10] *= e, t[11] *= e, t)
    },
mat4.rotate = function (t, e, r, i) {
        var a, n, s, o, _, h, u, f, c, l, m, d, v, p, g, E, R, b, T, A, x = r[0],
            y = r[1],
            r = r[2],
            M = Math.sqrt(x * x + y * y + r * r);
        return M ? (1 !== M && (M = 1 / M, x *= M, y *= M, r *= M), a = Math.sin(e), n = Math.cos(e), s = 1 - n, e = t[0], M = t[1], o = t[2], _ = t[3], h = t[4], u = t[5], f = t[6], c = t[7], l = t[8], m = t[9], d = t[10], v = t[11], p = x * x * s + n, g = y * x * s + r * a, E = r * x * s - y * a, R = x * y * s - r * a, b = y * y * s + n, T = r * y * s + x * a, A = x * r * s + y * a, x = y * r * s - x * a, y = r * r * s + n, i ? t !== i && (i[12] = t[12], i[13] = t[13], i[14] = t[14], i[15] = t[15]) : i = t, i[0] = e * p + h * g + l * E, i[1] = M * p + u * g + m * E, i[2] = o * p + f * g + d * E, i[3] = _ * p + c * g + v * E, i[4] = e * R + h * b + l * T, i[5] = M * R + u * b + m * T, i[6] = o * R + f * b + d * T, i[7] = _ * R + c * b + v * T, i[8] = e * A + h * x + l * y, i[9] = M * A + u * x + m * y, i[10] = o * A + f * x + d * y, i[11] = _ * A + c * x + v * y, i) : null
    },
mat4.rotateX = function (t, e, r) {
        var i = Math.sin(e),
            e = Math.cos(e),
            a = t[4],
            n = t[5],
            s = t[6],
            o = t[7],
            _ = t[8],
            h = t[9],
            u = t[10],
            f = t[11];
        return r ? t !== r && (r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = t[15]) : r = t,
        r[4] = a * e + _ * i,
        r[5] = n * e + h * i,
        r[6] = s * e + u * i,
        r[7] = o * e + f * i,
        r[8] = a * -i + _ * e,
        r[9] = n * -i + h * e,
        r[10] = s * -i + u * e,
        r[11] = o * -i + f * e,
        r
    },
mat4.rotateY = function (t, e, r) {
        var i = Math.sin(e),
            e = Math.cos(e),
            a = t[0],
            n = t[1],
            s = t[2],
            o = t[3],
            _ = t[8],
            h = t[9],
            u = t[10],
            f = t[11];
        return r ? t !== r && (r[4] = t[4], r[5] = t[5], r[6] = t[6], r[7] = t[7], r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = t[15]) : r = t,
        r[0] = a * e + _ * -i,
        r[1] = n * e + h * -i,
        r[2] = s * e + u * -i,
        r[3] = o * e + f * -i,
        r[8] = a * i + _ * e,
        r[9] = n * i + h * e,
        r[10] = s * i + u * e,
        r[11] = o * i + f * e,
        r
    },
mat4.rotateZ = function (t, e, r) {
        var i = Math.sin(e),
            e = Math.cos(e),
            a = t[0],
            n = t[1],
            s = t[2],
            o = t[3],
            _ = t[4],
            h = t[5],
            u = t[6],
            f = t[7];
        return r ? t !== r && (r[8] = t[8], r[9] = t[9], r[10] = t[10], r[11] = t[11], r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = t[15]) : r = t,
        r[0] = a * e + _ * i,
        r[1] = n * e + h * i,
        r[2] = s * e + u * i,
        r[3] = o * e + f * i,
        r[4] = a * -i + _ * e,
        r[5] = n * -i + h * e,
        r[6] = s * -i + u * e,
        r[7] = o * -i + f * e,
        r
    },
mat4.frustum = function (t, e, r, i, a, n, s) {
        s || (s = mat4.create());
        var o = e - t,
            _ = i - r,
            h = n - a;
        return s[0] = 2 * a / o,
        s[1] = 0,
        s[2] = 0,
        s[3] = 0,
        s[4] = 0,
        s[5] = 2 * a / _,
        s[6] = 0,
        s[7] = 0,
        s[8] = (e + t) / o,
        s[9] = (i + r) / _,
        s[10] = -(n + a) / h,
        s[11] = -1,
        s[12] = 0,
        s[13] = 0,
        s[14] = -n * a * 2 / h,
        s[15] = 0,
        s
    },
mat4.perspective = function (t, e, r, i, a) {
        return t = r * Math.tan(t * Math.PI / 360),
        e *= t,
        mat4.frustum(-e, e, -t, t, r, i, a)
    },
mat4.ortho = function (t, e, r, i, a, n, s) {
        s || (s = mat4.create());
        var o = e - t,
            _ = i - r,
            h = n - a;
        return s[0] = 2 / o,
        s[1] = 0,
        s[2] = 0,
        s[3] = 0,
        s[4] = 0,
        s[5] = 2 / _,
        s[6] = 0,
        s[7] = 0,
        s[8] = 0,
        s[9] = 0,
        s[10] = -2 / h,
        s[11] = 0,
        s[12] = -(t + e) / o,
        s[13] = -(i + r) / _,
        s[14] = -(n + a) / h,
        s[15] = 1,
        s
    },
mat4.lookAt = function (t, e, r, i) {
        i || (i = mat4.create());
        var a, n, s, o, _, h, u, f, c = t[0],
            l = t[1],
            t = t[2];
        return n = r[0],
        s = r[1],
        a = r[2],
        r = e[1],
        h = e[2],
        c === e[0] && l === r && t === h ? mat4.identity(i) : (r = c - e[0], h = l - e[1], u = t - e[2], f = 1 / Math.sqrt(r * r + h * h + u * u), r *= f, h *= f, u *= f, e = s * u - a * h, a = a * r - n * u, n = n * h - s * r, (f = Math.sqrt(e * e + a * a + n * n)) ? (f = 1 / f, e *= f, a *= f, n *= f) : n = a = e = 0, s = h * n - u * a, o = u * e - r * n, _ = r * a - h * e, (f = Math.sqrt(s * s + o * o + _ * _)) ? (f = 1 / f, s *= f, o *= f, _ *= f) : _ = o = s = 0, i[0] = e, i[1] = s, i[2] = r, i[3] = 0, i[4] = a, i[5] = o, i[6] = h, i[7] = 0, i[8] = n, i[9] = _, i[10] = u, i[11] = 0, i[12] = -(e * c + a * l + n * t), i[13] = -(s * c + o * l + _ * t), i[14] = -(r * c + h * l + u * t), i[15] = 1, i)
    },
mat4.str = function (t) {
        return "[" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + "]"
    },
quat4.create = function (t) {
        var e = new MatrixArray(4);
        return t && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3]),
        e
    },
quat4.set = function (t, e) {
        return e[0] = t[0],
        e[1] = t[1],
        e[2] = t[2],
        e[3] = t[3],
        e
    },
quat4.calculateW = function (t, e) {
        var r = t[0],
            i = t[1],
            a = t[2];
        return e && t !== e ? (e[0] = r, e[1] = i, e[2] = a, e[3] = -Math.sqrt(Math.abs(1 - r * r - i * i - a * a)), e) : (t[3] = -Math.sqrt(Math.abs(1 - r * r - i * i - a * a)), t)
    },
quat4.inverse = function (t, e) {
        return e && t !== e ? (e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e) : (t[0] *= -1, t[1] *= -1, t[2] *= -1, t)
    },
quat4.length = function (t) {
        var e = t[0],
            r = t[1],
            i = t[2],
            t = t[3];
        return Math.sqrt(e * e + r * r + i * i + t * t)
    },
quat4.normalize = function (t, e) {
        e || (e = t);
        var r = t[0],
            i = t[1],
            a = t[2],
            n = t[3],
            s = Math.sqrt(r * r + i * i + a * a + n * n);
        return 0 === s ? (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e) : (s = 1 / s, e[0] = r * s, e[1] = i * s, e[2] = a * s, e[3] = n * s, e)
    },
quat4.multiply = function (t, e, r) {
        r || (r = t);
        var i = t[0],
            a = t[1],
            n = t[2],
            t = t[3],
            s = e[0],
            o = e[1],
            _ = e[2],
            e = e[3];
        return r[0] = i * e + t * s + a * _ - n * o,
        r[1] = a * e + t * o + n * s - i * _,
        r[2] = n * e + t * _ + i * o - a * s,
        r[3] = t * e - i * s - a * o - n * _,
        r
    },
quat4.multiplyVec3 = function (t, e, r) {
        r || (r = e);
        var i = e[0],
            a = e[1],
            n = e[2],
            e = t[0],
            s = t[1],
            o = t[2],
            t = t[3],
            _ = t * i + s * n - o * a,
            h = t * a + o * i - e * n,
            u = t * n + e * a - s * i,
            i = -e * i - s * a - o * n;
        return r[0] = _ * t + i * -e + h * -o - u * -s,
        r[1] = h * t + i * -s + u * -e - _ * -o,
        r[2] = u * t + i * -o + _ * -s - h * -e,
        r
    },
quat4.toMat3 = function (t, e) {
        e || (e = mat3.create());
        var r = t[0],
            i = t[1],
            a = t[2],
            n = t[3],
            s = r + r,
            o = i + i,
            _ = a + a,
            h = r * s,
            u = r * o;
        r *= _;
        var f = i * o;
        return i *= _,
        a *= _,
        s *= n,
        o *= n,
        n *= _,
        e[0] = 1 - (f + a),
        e[1] = u + n,
        e[2] = r - o,
        e[3] = u - n,
        e[4] = 1 - (h + a),
        e[5] = i + s,
        e[6] = r + o,
        e[7] = i - s,
        e[8] = 1 - (h + f),
        e
    },
quat4.toMat4 = function (t, e) {
        e || (e = mat4.create());
        var r = t[0],
            i = t[1],
            a = t[2],
            n = t[3],
            s = r + r,
            o = i + i,
            _ = a + a,
            h = r * s,
            u = r * o;
        r *= _;
        var f = i * o;
        return i *= _,
        a *= _,
        s *= n,
        o *= n,
        n *= _,
        e[0] = 1 - (f + a),
        e[1] = u + n,
        e[2] = r - o,
        e[3] = 0,
        e[4] = u - n,
        e[5] = 1 - (h + a),
        e[6] = i + s,
        e[7] = 0,
        e[8] = r + o,
        e[9] = i - s,
        e[10] = 1 - (h + f),
        e[11] = 0,
        e[12] = 0,
        e[13] = 0,
        e[14] = 0,
        e[15] = 1,
        e
    },
quat4.slerp = function (t, e, r, i) {
        i || (i = t);
        var a, n, s = t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3];
        return Math.abs(s) >= 1 ? (i !== t && (i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = t[3]), i) : (a = Math.acos(s), n = Math.sqrt(1 - s * s), Math.abs(n) < .001 ? (i[0] = .5 * t[0] + .5 * e[0], i[1] = .5 * t[1] + .5 * e[1], i[2] = .5 * t[2] + .5 * e[2], i[3] = .5 * t[3] + .5 * e[3], i) : (s = Math.sin((1 - r) * a) / n, r = Math.sin(r * a) / n, i[0] = t[0] * s + e[0] * r, i[1] = t[1] * s + e[1] * r, i[2] = t[2] * s + e[2] * r, i[3] = t[3] * s + e[3] * r, i))
    },
quat4.str = function (t) {
        return "[" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + "]"
    },
Shader.prototype.info = function () {
        return this.gl_.getShaderInfoLog(this.handle_)
    },
Shader.prototype.type = function () {
        return this.gl_.getShaderParameter(this.handle_, this.gl_.SHADER_TYPE)
    },
Program.prototype.info = function () {
        return this.gl_.getProgramInfoLog(this.handle_)
    },
Program.prototype.use = function () {
        this.gl_.useProgram(this.handle_)
    },
Program.prototype.enableVertexAttribArrays = function (t) {
        for (var e = 0; e < t.length; ++e) {
            this.enabledVertexAttribArrays_[t[e]] = !0;
            var r = this.set_attrib[t[e]];
            void 0 !== r && this.gl_.enableVertexAttribArray(r)
        }
    },
Program.prototype.disableVertexAttribArrays = function (t) {
        for (var e = 0; e < t.length; ++e) {
            this.enabledVertexAttribArrays_[t[e]] = !1;
            var r = this.set_attrib[t[e]];
            void 0 !== r && this.gl_.disableVertexAttribArray(r)
        }
    },
Program.prototype.vertexAttribPointers = function (t) {
        for (var e = t.length, r = 0; r < e; ++r) {
            var i = t[r],
                a = this.set_attrib[i.name];
            if (this.enabledVertexAttribArrays_[i.name]) {
                    this.gl_.vertexAttribPointer(a, i.size, this.gl_.FLOAT, !! i.normalized, 4 * i.stride, 4 * i.offset)
                }
        }
    };
var TEXTURE_CACHE = {};
Mesh.prototype.bind = function (t, e) {
        var r = this.gl_;
        e || r.bindTexture(r.TEXTURE_2D, this.texture_),
        r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, this.ibo_),
        r.bindBuffer(r.ARRAY_BUFFER, this.vbo_),
        t.vertexAttribPointers(this.attribArrays_),
        e && (r.bindBuffer(r.ARRAY_BUFFER, this.cbo_), r.vertexAttribPointer(t.set_attrib.a_colorIndex, 1, r.FLOAT, !1, 4, 0))
    },
Mesh.prototype.draw = function (t, e) {
        if (0 !== t) {
            t = t || this.numIndices_,
            e = e || 0;
            var r = this.gl_;
            r.drawElements(r.TRIANGLES, t, r.UNSIGNED_SHORT, 2 * e)
        }
    },
Mesh.prototype.drawList = function (t, e, r) {
        for (var i = r.length, a = this.gl_, n = 0; n < i; n += 3) {
            var s = r[n],
                o = r[n + 1] - s,
                _ = r[n + 2],
                h = this.names_[_],
                u = this.material,
                f = defaultRoughness;
            switch (u) {
                case "f_allsystems_20u_z180_mandiblesg1":
                case "f_allsystems_20u_z168_r_scapulasg1":
                case "f_allsystems_20u_z121_r_costal_cartilage_1sg1":
                case "f_allsystems_20u_z158_r_tibiasg1":
                case "f_allsystems_20u_z243_atlas_vertebra_c1sg1":
                case "f_allsystems_20u_z15_r_lateral_cuneiformsg1":
                case "cranium_50_except_ear_skull_interiorsg":
                case "skeleton_disks":
                case "skeleton_arms":
                case "skeleton_legs_sg":
                case "skeleton_feet":
                    f = .51
                }
            switch (h) {
                case "skin":
                case "hair":
                case "clothes":
                case "shorts":
                    f = .55
                }
            if (h.startsWith("tooth") && (f = .1), a.uniform1f(viewer_.render_.renderer_.program_.set_uniform.u_roughness, f), viewer_.explodeRange > 0) {
                    var _ = r[n + 2],
                        c = [.5 * (this.opt_bboxen_[6 * _ + 0] + this.opt_bboxen_[6 * _ + 3]), .5 * (this.opt_bboxen_[6 * _ + 1] + this.opt_bboxen_[6 * _ + 4]), .5 * (this.opt_bboxen_[6 * _ + 2] + this.opt_bboxen_[6 * _ + 5])],
                        l = viewer_.explodePoint,
                        m = vec3.create();
                    vec3.subtract(c, l, m),
                    vec3.normalize(m),
                    m[0] *= .2 * viewer_.explodeRange,
                    m[1] *= .2 * viewer_.explodeRange,
                    m[2] *= .2 * viewer_.explodeRange;
                    var d = mat4.create();
                    mat4.identity(d),
                    mat4.translate(d, m),
                    a.uniformMatrix4fv(viewer_.render_.renderer_.program_.set_uniform.u_effect, !1, d)
                }
            this.bind(t, e),
            this.draw(o, s)
        }
    },
Mesh.prototype.bindAndDraw = function (t, e) {
        this.bind(t, e),
        this.draw()
    };
var MODELS = {},
    DEFAULT_ATTRIB_ARRAYS = [{
        name: "a_position",
        size: 3,
        stride: 8,
        offset: 0
    },
    {
        name: "a_texcoord",
        size: 2,
        stride: 8,
        offset: 3
    },
    {
        name: "a_normal",
        size: 3,
        stride: 8,
        offset: 5
    },
    {
        name: "a_colorIndex",
        size: 1,
        stride: 1,
        offset: 0
    }],
    BBOX_ATTRIB_ARRAYS = [{
        name: "a_position",
        size: 3,
        stride: 6,
        offset: 0
    },
    {
        name: "a_radius",
        size: 3,
        stride: 6,
        offset: 3
    }],
    DEFAULT_DECODE_PARAMS = {
        decodeOffsets: [-4095, -4095, -4095, 0, 0, -511, -511, -511],
        decodeScales: [1 / 8191, 1 / 8191, 1 / 8191, 1 / 1023, 1 / 1023, 1 / 1023, 1 / 1023, 1 / 1023]
    },
    defaultRoughness = .35;
o3v.cameraLookAt = function (t, e, r, i) {
        var a = new Float32Array(3),
            n = new Float32Array(3),
            s = new Float32Array(3),
            o = o3v.normalize(a, o3v.subVector(a, e, r)),
            _ = o3v.normalize(n, o3v.cross(n, i, o)),
            h = o3v.cross(s, o, _);
        return t[0] = _[0],
        t[1] = _[1],
        t[2] = _[2],
        t[3] = 0,
        t[4] = h[0],
        t[5] = h[1],
        t[6] = h[2],
        t[7] = 0,
        t[8] = o[0],
        t[9] = o[1],
        t[10] = o[2],
        t[11] = 0,
        t[12] = e[0],
        t[13] = e[1],
        t[14] = e[2],
        t[15] = 1,
        t
    },
o3v.subVector = function (t, e, r) {
        for (var i = e.length, a = 0; a < i; ++a) t[a] = e[a] - r[a];
        return t
    },
o3v.cross = function (t, e, r) {
        return t[0] = e[1] * r[2] - e[2] * r[1],
        t[1] = e[2] * r[0] - e[0] * r[2],
        t[2] = e[0] * r[1] - e[1] * r[0],
        t
    },
o3v.normalize = function (t, e) {
        for (var r = 0, i = e.length, a = 0; a < i; ++a) r += e[a] * e[a];
        if ((r = Math.sqrt(r)) > 1e-5) for (var a = 0; a < i; ++a) t[a] = e[a] / r;
        else for (var a = 0; a < i; ++a) t[a] = 0;
        return t
    },
Renderer.prototype.onloadShaders = function (t) {
        var e = {};
        t.responseText.split("/** ").forEach(function (t) {
            var r = t.split(" **/");
            e[r[0]] = r[1]
        });
        var r = this.gl_,
            i = e.shader_vertex,
            a = e.shader_fragment;
        this.normProgram_ = new Program(r, [vertexShader(r, i), fragmentShader(r, a)]);
        var n = e.shader_vertex_id,
            s = e.shader_fragment_id;
        this.idProgram_ = new Program(r, [vertexShader(r, n), fragmentShader(r, s)]),
        this.altProgram_ = new Program(r, [vertexShader(r, e.shader_vertex_annotate), fragmentShader(r, e.shader_fragment_annotate)]),
        this.textProgram_ = new Program(r, [vertexShader(r, e.shader_vertex_rect), fragmentShader(r, e.shader_fragment_rect)]),
        this.shadersLoaded_ = !0
    },
Renderer.prototype.handleResize = function () {
        this.canvas_.width = this.canvas_.clientWidth,
        this.canvas_.height = this.canvas_.clientHeight,
        this.gl_.viewport(0, 0, this.canvas_.width, this.canvas_.height)
    },
Renderer.prototype.drawAll_ = function (t) {
        for (var e = this.meshes_.length, r = 0; r < e; r++) this.meshes_[r].bindAndDraw(this.program_, t)
    },
Renderer.prototype.center = function (t) {
        return [.5 * (t[3] + t[0]), .5 * (t[4] + t[1]), .5 * (t[5] + t[2])]
    },
Renderer.prototype.drawLists_ = function (t, e) {
        for (var r = t.length, i = 0; i < r; i++) {
            var a = (this.gl_, t[i]),
                n = this.meshes_[i];
            n.bind(this.program_, e),
            n.drawList(this.program_, e, a)
        }
    },
Renderer.prototype.postRedisplayWithCamera = function (t) {
        mat4.perspective(t.fov, this.canvas_.clientWidth / this.canvas_.clientHeight, 1, 1e3, this.proj_);
        var e = t.pre,
            r = new Float32Array(16);
        o3v.cameraLookAt(r, t.eye, t.target, t.up),
        mat4.multiply(e, r, this.view_),
        mat4.inverse(this.view_);
        var i = new Float32Array(16);
        mat4.multiply(this.proj_, this.view_, i),
        mat4.multiply(i, this.model_, this.mvp_),
        mat4.multiply(this.view_, this.model_, this.mv_),
        this.postRedisplay()
    },
Renderer.prototype.postRedisplay = function () {
        var t = this;
        this.frameStart_ || (this.frameStart_ = Date.now(), window.requestAnimFrame(function () {
            t.draw_(),
            t.frameStart_ = 0
        }, this.canvas_))
    },
Renderer.prototype.ready = function () {
        return this.shadersLoaded_ && 0 === this.frameStart_
    },
Renderer.prototype.createOffscreenSurface_ = function (t, e) {
        var r = this.gl_;
        this.selectionFbo_.framebuffer || (this.selectionFbo_.framebuffer = r.createFramebuffer()),
        r.bindFramebuffer(r.FRAMEBUFFER, this.selectionFbo_.framebuffer),
        this.selectionFbo_.colorTexture || (this.selectionFbo_.colorTexture = r.createTexture(), r.bindTexture(r.TEXTURE_2D, this.selectionFbo_.colorTexture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE)),
        r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, t, e, 0, r.RGBA, r.UNSIGNED_BYTE, null),
        this.selectionFbo_.renderbuffer || (this.selectionFbo_.renderbuffer = r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, this.selectionFbo_.renderbuffer), r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_COMPONENT16, t, e), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, this.selectionFbo_.colorTexture, 0), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.RENDERBUFFER, this.selectionFbo_.renderbuffer)),
        r.checkFramebufferStatus(r.FRAMEBUFFER) != r.FRAMEBUFFER_COMPLETE && (o3v.log.error("Incomplete off-screen framebuffer"), this.selectionFbo_.framebuffer = null),
        r.bindFramebuffer(r.FRAMEBUFFER, null)
    },
Renderer.prototype.identify = function (t, e, r) {
        var i = this.gl_;
        if (this.selectionFbo_.width != this.canvas_.clientWidth || this.selectionFbo_.height != this.canvas_.clientHeight) {
            if (this.createOffscreenSurface_(this.canvas_.clientWidth, this.canvas_.clientHeight), !this.selectionFbo_.framebuffer) return o3v.log.error("Unable to identify without valid off-screen buffer."),
            null;
            var a = this.canvas_.clientWidth * this.canvas_.clientHeight * 4;
            this.selectionFbo_.selectionSurfaceArray = new Uint8Array(a),
            this.selectionFbo_.width = this.canvas_.clientWidth,
            this.selectionFbo_.height = this.canvas_.clientHeight
        }
        i.bindFramebuffer(i.FRAMEBUFFER, this.selectionFbo_.framebuffer),
        this.draw_(!0),
        i.readPixels(0, 0, this.selectionFbo_.width, this.selectionFbo_.height, i.RGBA, i.UNSIGNED_BYTE, this.selectionFbo_.selectionSurfaceArray),
        i.bindFramebuffer(i.FRAMEBUFFER, null);
        var n = this.findPixelInRect_(t, e, 10, this.selectionFbo_.width, this.selectionFbo_.height, this.selectionFbo_.selectionSurfaceArray);
        return n = Math.floor(n / this.selectionColorScale_),
        r && (r.value = n),
        0 != n ? this.colorToName_[n] : null
    },
Renderer.prototype.findPixelInRect_ = function (t, e, r, i, a, n) {
        var s = this.getPixel_(t, e, i, a, n);
        if (0 != s) return s;
        for (var o = 1; o <= r / 2; ++o) {
            for (var _ = e - o; _ <= e + o; ++_) if (!(_ < 0)) {
                if (_ >= a) break;
                if (0 != (s = this.getPixel_(t - o, _, i, a, n))) return s;
                if (0 != (s = this.getPixel_(t + o, _, i, a, n))) return s
            }
            for (var h = t - o + 1; h <= t + o - 1; ++h) if (!(h < 0)) {
                if (h >= i) break;
                if (0 != (s = this.getPixel_(h, e - o, i, a, n))) return s;
                if (0 != (s = this.getPixel_(h, e + o, i, a, n))) return s
            }
        }
        return 0
    },
Renderer.prototype.getPixel_ = function (t, e, r, i, a) {
        if (t < 0 || t >= r || e < 0 || e >= i) return 0;
        t = Math.floor(t),
        e = Math.floor(e);
        var n = 4 * ((i - 1 - e) * r + t),
            s = a[n + 0],
            o = a[n + 1];
        return a[n + 2] + 256 * o + 256 * s * 256
    },
Renderer.prototype.draw_ = function (t) {
        if (this.shadersLoaded_) {
            this.forceColored_ && (t = !0),
            this.program_ = t ? this.idProgram_ : this.normProgram_,
            this.program_.use(),
            t ? (this.program_.enableVertexAttribArrays(["a_position", "a_colorIndex"]), this.program_.disableVertexAttribArrays(["a_normal", "a_texcoord"])) : (this.program_.enableVertexAttribArrays(["a_position", "a_texcoord", "a_normal"]), this.program_.disableVertexAttribArrays(["a_colorIndex"]));
            var e = this.gl_;
            if (t && (this.selectionColorScale_ = Math.floor(16777215 / this.maxColorIndex_), e.uniform1f(this.program_.set_uniform.u_colorScale, this.selectionColorScale_)), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e.uniformMatrix4fv(this.program_.set_uniform.u_mv, !1, this.mv_), e.uniformMatrix4fv(this.program_.set_uniform.u_mvp, !1, this.mvp_), e.uniformMatrix4fv(this.program_.set_uniform.u_proj, !1, this.proj_), e.uniformMatrix3fv(this.program_.set_uniform.u_model, !1, mat4.toMat3(this.model_)), e.uniformMatrix4fv(this.program_.set_uniform.u_effect, !1, this.identity_), 0 == viewer_.sliceX && 0 == viewer_.sliceY && 0 == viewer_.sliceZ ? (e.uniform4fv(this.program_.set_uniform.u_slice1, [0, 0, 0, 0]), e.uniform4fv(this.program_.set_uniform.u_slice2, [0, 0, 0, 0]), e.uniform4fv(this.program_.set_uniform.u_slice3, [0, 0, 0, 0])) : (e.uniform4fv(this.program_.set_uniform.u_slice1, [0, 0, 0, 1]), e.uniform4fv(this.program_.set_uniform.u_slice2, [0, 0, 0, 1]), e.uniform4fv(this.program_.set_uniform.u_slice3, [0, 0, 0, 1])), 0 != viewer_.sliceX && e.uniform4fv(this.program_.set_uniform.u_slice1, [viewer_.sliceX, 0, 0, -viewer_.slicePoint[0] * viewer_.sliceX]), 0 != viewer_.sliceY && e.uniform4fv(this.program_.set_uniform.u_slice2, [0, viewer_.sliceY, 0, -viewer_.slicePoint[1] * viewer_.sliceY]), 0 != viewer_.sliceZ && e.uniform4fv(this.program_.set_uniform.u_slice3, [0, 0, viewer_.sliceZ, -viewer_.slicePoint[2] * viewer_.sliceZ]), e.uniform1f(this.program_.set_uniform.u_opacity, 1), e.uniform1f(this.program_.set_uniform.u_roughness, defaultRoughness), void 0 !== this.opacityLists_) {
                for (var r = (this.meshes_, 0); r < this.opacityLists_.length; r++) {
                    var i = this.opacityLists_[r].opacity;
                    1 == i && this.drawLists_(this.opacityLists_[r].drawLists, t)
                }
                e.enable(e.BLEND);
                for (var r = 0; r < this.opacityLists_.length; r++) {
                    var i = this.opacityLists_[r].opacity;
                    t ? i > .33 && 1 != i && (e.uniform1f(this.program_.set_uniform.u_opacity, i), this.drawLists_(this.opacityLists_[r].drawLists, t)) : 0 != i && 1 != i && (e.uniform1f(this.program_.set_uniform.u_opacity, i), this.drawLists_(this.opacityLists_[r].drawLists, t))
                }
                e.disable(e.BLEND)
            } else this.drawAll_(t);
            if (!t) {
                this.program_ = this.altProgram_,
                this.program_.use(),
                this.program_.enableVertexAttribArrays(["a_position"]),
                this.program_.disableVertexAttribArrays(["a_normal", "a_texcoord", "a_colorIndex"]),
                e.uniform4fv(this.program_.set_uniform.u_color, [.3, .55, .75, 1]);
                var a = textureFromUrl2(e, "white from error", function () {});
                e.bindTexture(e.TEXTURE_2D, a)
            }
            if (e.uniformMatrix4fv(this.program_.set_uniform.u_mv, !1, this.mv_), e.uniformMatrix4fv(this.program_.set_uniform.u_mvp, !1, this.mvp_), e.uniformMatrix4fv(this.program_.set_uniform.u_proj, !1, this.proj_), e.uniformMatrix4fv(this.program_.set_uniform.u_effect, !1, this.identity_), e.depthMask(!1), e.disable(e.CULL_FACE), viewer_.annotator.draw(e, t, this), viewer_.label_.drawGL(e), e.disable(e.DEPTH_TEST), t || ((viewer_.explodeRange > 0 || viewer_.toolMode == o3v.Viewer.TOOL_EXPLODE) && viewer_.annotator.drawCross(e, viewer_.explodePoint, 0), 0 == viewer_.sliceX && 0 == viewer_.sliceY && 0 == viewer_.sliceZ && viewer_.toolMode != o3v.Viewer.TOOL_SLICE || viewer_.annotator.drawCross(e, viewer_.slicePoint, 0)), !t) {
                this.program_ = this.textProgram_,
                this.program_.use(),
                this.program_.enableVertexAttribArrays(["a_position", "a_texcoord"]),
                this.program_.disableVertexAttribArrays(["a_normal", "a_colorIndex"]),
                e.uniformMatrix4fv(this.program_.set_uniform.u_mv, !1, this.mv_),
                e.uniformMatrix4fv(this.program_.set_uniform.u_mvp, !1, this.mvp_),
                e.uniformMatrix4fv(this.program_.set_uniform.u_proj, !1, this.proj_),
                e.uniformMatrix4fv(this.program_.set_uniform.u_effect, !1, this.identity_);
                var a = textureFromUrl2(e, "body/images/ano-target.png", function () {});
                e.bindTexture(e.TEXTURE_2D, a),
                e.uniform4fv(this.program_.set_uniform.u_color, [1, 1, 1, 1]),
                e.enable(e.BLEND),
                e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
                viewer_.annotator.draw2(e, t, this),
                e.disable(e.BLEND),
                e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA)
            }
            e.enable(e.DEPTH_TEST),
            e.enable(e.CULL_FACE),
            e.depthMask(!0),
            e.bindTexture(e.TEXTURE_2D, null)
        }
    },
Renderer.prototype.updateMeshInfo = function () {
        this.entityToMeshInfo_ = {};
        for (var t = 0; t < this.meshes_.length; t++) for (var e = this.meshes_[t], r = 0; r < e.names_.length; r++) {
            var i = e.names_[r],
                a = {};
            a.index = t,
            a.start = e.starts_[r],
            a.end = e.starts_[r] + e.lengths_[r],
            a.nameIndex = r,
            a.leaderPoint = e.leaderPoints_[r],
            void 0 !== this.entityToMeshInfo_[i] ? 
            (/* o3v.log.info("multiple meshes for '", i, "': ", this.entityToMeshInfo_[i], a), */ this.entityToMeshInfo_[i].push(a)) 
            : this.entityToMeshInfo_[i] = [a]
        }
    },
Renderer.prototype.getLeaderPoint = function (t, e) {
        var r = this.entityToMeshInfo_[t];
        if (void 0 == r || 0 == r.length) return e.ctr;
        for (var i = r[0].leaderPoint, a = 0; a < r.length; a++) r[a].leaderPoint[1] < i[1] && (i = r[a].leaderPoint);
        return i
    },
Renderer.prototype.updateOpacity = function (t) {
        this.opacityLists_ = [],
        o3v.util.forEach(t, function (e, r) {
            t = {},
            t.opacity = parseFloat(r),
            t.drawLists = [];
            for (var i = 0; i < this.meshes_.length; i++) t.drawLists[i] = [];
            o3v.util.forEach(e, function (e, r) {
                for (var i = 0; i < this.entityToMeshInfo_[r].length; i++) {
                    var a = this.entityToMeshInfo_[r][i];
                    t.drawLists[a.index].push(a.start),
                    t.drawLists[a.index].push(a.end),
                    t.drawLists[a.index].push(a.nameIndex)
                }
            }, this),
            this.opacityLists_.push(t)
        }, this),
        this.opacityLists_.sort(function (t, e) {
            return e.opacity > t.opacity
        })
    },
Renderer.prototype.onMeshLoad = function (t, e, r, i) {
        for (var a = this.textureFromMaterialFunction_(this.gl_, i.material, this.postRedisplay.bind(this)), n = this.maxColorIndex_, s = 0; s < i.names.length; s++) this.colorToName_[n + s] = i.names[s];
        this.maxColorIndex_ += i.lengths.length,
        this.meshes_.push(new Mesh(this.gl_, t, e, DEFAULT_ATTRIB_ARRAYS, a, i.names, i.lengths, r, n, i.material))
    },
Renderer.prototype.reset = function () {
        this.meshes_ = [],
        this.postRedisplay(),
        this.maxColorIndex_ = 100,
        this.colorToName_ = {},
        this.opacityLists_ = []
    },
Renderer.prototype.getViewportCoords = function (t) {
        var t = [t[0], t[1], t[2], 1],
            e = mat4.create();
        mat4.multiply(this.mvp_, t, e);
        var r = e[0] / e[3],
            i = e[1] / e[3],
            a = e[2] / e[3];
        return r = (r + 1) * this.canvas_.width / 2,
        i = (2 - (i + 1)) * this.canvas_.height / 2,
        [r, i, a]
    },
Renderer.prototype.getModelCoords = function (t) {
        var e = 2 * t[0] / this.canvas_.width - 1,
            r = -(2 * t[1] / this.canvas_.height - 1),
            i = mat4.create();
        mat4.inverse(this.mvp_, i);
        var a = 1;
        3 == t.length && (a = t[2]);
        var n = [e, r, a, 1],
            s = [0, 0, 0, 0];
        return mat4.multiplyVec4(i, n, s),
        s[0] /= s[3],
        s[1] /= s[3],
        s[2] /= s[3],
        s
    },
Renderer.prototype.toggleColored = function () {
        this.forceColored_ = !this.forceColored_
    },
o3v.webGLUtil = {
        browserSupportsWebGL: function (t) {
            try {
                if (!t) return !1;
                if (!window.WebGLRenderingContext) return !1;
                var e = t.getContext("webgl");
                return e || (e = t.getContext("experimental-webgl")),
                !! e
            } catch (t) {
                return !1
            }
        }
    };