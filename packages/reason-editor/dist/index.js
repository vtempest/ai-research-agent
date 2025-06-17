var yn = Object.defineProperty;
var vn = (t, e, n) => e in t ? yn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var L = (t, e, n) => vn(t, typeof e != "symbol" ? e + "" : e, n);
function We(t) {
  if (!t) return t;
  if (typeof t.toJSON == "function" && (t = t.toJSON()), Array.isArray(t)) return t.map(We);
  if (typeof t == "object") {
    const e = {};
    return Object.keys(t).forEach((n) => e[n] = We(t[n])), e;
  }
  return t;
}
const Ln = {};
function k(t, e, n = Ln) {
  if (t === e) return !0;
  const s = typeof t, r = typeof t;
  if (s === "number" && r === "number" && isNaN(t) && isNaN(e))
    return !0;
  if (!t || !e || s !== "object" || r !== "object" || t.constructor !== e.constructor)
    return !1;
  if (t.valueOf() !== t)
    return k(t.valueOf(), e.valueOf(), n);
  const i = n.shallow ? En : k;
  if (typeof t[Symbol.iterator] == "function") {
    const l = t[Symbol.iterator](), a = e[Symbol.iterator]();
    let u = l.next(), f = a.next();
    for (; !u.done && !f.done; ) {
      if (!i(u.value, f.value, n)) return !1;
      u = l.next(), f = a.next();
    }
    return u.done === f.done;
  }
  let o = Object.keys(t), c = Object.keys(e);
  if (n.excludeProps) {
    const l = wn(n.excludeProps);
    o = o.filter(l), c = c.filter(l);
  }
  return (n.partial || o.length === c.length) && c.every(
    (l) => t.hasOwnProperty(l) && i(e[l], t[l], n)
  );
}
function En(t, e) {
  return t === e;
}
function wn(t) {
  return (e) => !t.has(e);
}
function ee(t) {
  return t === Object(t) && !Array.isArray(t);
}
function Bt(t) {
  if (t == null) return !0;
  if (!ee(t)) return !1;
  for (const e in t)
    if (!Bt(t[e])) return !1;
  return !0;
}
var Ue;
((t) => {
  function e(i = {}, o = {}, c) {
    typeof i != "object" && (i = {}), typeof o != "object" && (o = {});
    let l = We(o);
    for (const a in i)
      ee(i[a]) && ee(l[a]) && (l[a] = e(i[a], l[a], c));
    c || (l = Object.keys(l).reduce((a, u) => (Bt(l[u]) || (a[u] = l[u]), a), {}));
    for (const a in i)
      i[a] !== void 0 && o[a] === void 0 && (l[a] = i[a]);
    return Object.keys(l).length > 0 ? l : void 0;
  }
  t.compose = e;
  function n(i = {}, o = {}) {
    typeof i != "object" && (i = {}), typeof o != "object" && (o = {});
    const c = Object.keys(i).concat(Object.keys(o)).reduce((l, a) => (k(i[a], o[a]) || (o[a] === void 0 ? l[a] = null : ee(i[a]) && ee(o[a]) ? l[a] = n(i[a], o[a]) : l[a] = o[a]), l), {});
    return Object.keys(c).length > 0 ? c : void 0;
  }
  t.diff = n;
  function s(i = {}, o = {}) {
    i = i || {};
    const c = Object.keys(o).reduce((l, a) => (!k(o[a], i[a]) && i[a] !== void 0 && (ee(i[a]) && ee(o[a]) ? l[a] = s(i[a], o[a]) : l[a] = o[a]), l), {});
    return Object.keys(i).reduce((l, a) => (i[a] !== o[a] && o[a] === void 0 && (l[a] = null), l), c);
  }
  t.invert = s;
  function r(i, o, c = !1) {
    if (typeof i != "object")
      return o;
    if (typeof o != "object")
      return;
    if (!c)
      return o;
    const l = Object.keys(o).reduce((a, u) => (i[u] === void 0 ? a[u] = o[u] : ee(i[u]) && ee(o[u]) && (a[u] = r(i[u], o[u], !0)), a), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  t.transform = r;
})(Ue || (Ue = {}));
const H = Ue;
var U = -1, z = 1, C = 0;
function he(t, e, n, s, r) {
  if (t === e)
    return t ? [[C, t]] : [];
  if (n != null) {
    var i = _n(t, e, n);
    if (i)
      return i;
  }
  var o = Ke(t, e), c = t.substring(0, o);
  t = t.substring(o), e = e.substring(o), o = De(t, e);
  var l = t.substring(t.length - o);
  t = t.substring(0, t.length - o), e = e.substring(0, e.length - o);
  var a = An(t, e);
  return c && a.unshift([C, c]), l && a.push([C, l]), qe(a, r), s && Tn(a), a;
}
function An(t, e) {
  var n;
  if (!t)
    return [[z, e]];
  if (!e)
    return [[U, t]];
  var s = t.length > e.length ? t : e, r = t.length > e.length ? e : t, i = s.indexOf(r);
  if (i !== -1)
    return n = [
      [z, s.substring(0, i)],
      [C, r],
      [z, s.substring(i + r.length)]
    ], t.length > e.length && (n[0][0] = n[2][0] = U), n;
  if (r.length === 1)
    return [
      [U, t],
      [z, e]
    ];
  var o = xn(t, e);
  if (o) {
    var c = o[0], l = o[1], a = o[2], u = o[3], f = o[4], h = he(c, a), g = he(l, u);
    return h.concat([[C, f]], g);
  }
  return Nn(t, e);
}
function Nn(t, e) {
  for (var n = t.length, s = e.length, r = Math.ceil((n + s) / 2), i = r, o = 2 * r, c = new Array(o), l = new Array(o), a = 0; a < o; a++)
    c[a] = -1, l[a] = -1;
  c[i + 1] = 0, l[i + 1] = 0;
  for (var u = n - s, f = u % 2 !== 0, h = 0, g = 0, d = 0, p = 0, m = 0; m < r; m++) {
    for (var b = -m + h; b <= m - g; b += 2) {
      var v = i + b, y;
      b === -m || b !== m && c[v - 1] < c[v + 1] ? y = c[v + 1] : y = c[v - 1] + 1;
      for (var x = y - b; y < n && x < s && t.charAt(y) === e.charAt(x); )
        y++, x++;
      if (c[v] = y, y > n)
        g += 2;
      else if (x > s)
        h += 2;
      else if (f) {
        var E = i + u - b;
        if (E >= 0 && E < o && l[E] !== -1) {
          var w = n - l[E];
          if (y >= w)
            return it(t, e, y, x);
        }
      }
    }
    for (var T = -m + d; T <= m - p; T += 2) {
      var E = i + T, w;
      T === -m || T !== m && l[E - 1] < l[E + 1] ? w = l[E + 1] : w = l[E - 1] + 1;
      for (var M = w - T; w < n && M < s && t.charAt(n - w - 1) === e.charAt(s - M - 1); )
        w++, M++;
      if (l[E] = w, w > n)
        p += 2;
      else if (M > s)
        d += 2;
      else if (!f) {
        var v = i + u - T;
        if (v >= 0 && v < o && c[v] !== -1) {
          var y = c[v], x = i + y - v;
          if (w = n - w, y >= w)
            return it(t, e, y, x);
        }
      }
    }
  }
  return [
    [U, t],
    [z, e]
  ];
}
function it(t, e, n, s) {
  var r = t.substring(0, n), i = e.substring(0, s), o = t.substring(n), c = e.substring(s), l = he(r, i), a = he(o, c);
  return l.concat(a);
}
function Ke(t, e) {
  if (!t || !e || t.charAt(0) !== e.charAt(0))
    return 0;
  for (var n = 0, s = Math.min(t.length, e.length), r = s, i = 0; n < r; )
    t.substring(i, r) == e.substring(i, r) ? (n = r, i = n) : s = r, r = Math.floor((s - n) / 2 + n);
  return Pt(t.charCodeAt(r - 1)) && r--, r;
}
function ot(t, e) {
  var n = t.length, s = e.length;
  if (n == 0 || s == 0)
    return 0;
  n > s ? t = t.substring(n - s) : n < s && (e = e.substring(0, n));
  var r = Math.min(n, s);
  if (t == e)
    return r;
  for (var i = 0, o = 1; ; ) {
    var c = t.substring(r - o), l = e.indexOf(c);
    if (l == -1)
      return i;
    o += l, (l == 0 || t.substring(r - o) == e.substring(0, o)) && (i = o, o++);
  }
}
function De(t, e) {
  if (!t || !e || t.slice(-1) !== e.slice(-1))
    return 0;
  for (var n = 0, s = Math.min(t.length, e.length), r = s, i = 0; n < r; )
    t.substring(t.length - r, t.length - i) == e.substring(e.length - r, e.length - i) ? (n = r, i = n) : s = r, r = Math.floor((s - n) / 2 + n);
  return jt(t.charCodeAt(t.length - r)) && r--, r;
}
function xn(t, e) {
  var n = t.length > e.length ? t : e, s = t.length > e.length ? e : t;
  if (n.length < 4 || s.length * 2 < n.length)
    return null;
  function r(g, d, p) {
    for (var m = g.substring(p, p + Math.floor(g.length / 4)), b = -1, v = "", y, x, E, w; (b = d.indexOf(m, b + 1)) !== -1; ) {
      var T = Ke(
        g.substring(p),
        d.substring(b)
      ), M = De(
        g.substring(0, p),
        d.substring(0, b)
      );
      v.length < M + T && (v = d.substring(b - M, b) + d.substring(b, b + T), y = g.substring(0, p - M), x = g.substring(p + T), E = d.substring(0, b - M), w = d.substring(b + T));
    }
    return v.length * 2 >= g.length ? [
      y,
      x,
      E,
      w,
      v
    ] : null;
  }
  var i = r(
    n,
    s,
    Math.ceil(n.length / 4)
  ), o = r(
    n,
    s,
    Math.ceil(n.length / 2)
  ), c;
  if (!i && !o)
    return null;
  o ? i ? c = i[4].length > o[4].length ? i : o : c = o : c = i;
  var l, a, u, f;
  t.length > e.length ? (l = c[0], a = c[1], u = c[2], f = c[3]) : (u = c[0], f = c[1], l = c[2], a = c[3]);
  var h = c[4];
  return [l, a, u, f, h];
}
function Tn(t) {
  for (var e = !1, n = [], s = 0, r = null, i = 0, o = 0, c = 0, l = 0, a = 0; i < t.length; )
    t[i][0] == C ? (n[s++] = i, o = l, c = a, l = 0, a = 0, r = t[i][1]) : (t[i][0] == z ? l += t[i][1].length : a += t[i][1].length, r && r.length <= Math.max(o, c) && r.length <= Math.max(l, a) && (t.splice(n[s - 1], 0, [
      U,
      r
    ]), t[n[s - 1] + 1][0] = z, s--, s--, i = s > 0 ? n[s - 1] : -1, o = 0, c = 0, l = 0, a = 0, r = null, e = !0)), i++;
  for (e && qe(t), Mn(t), i = 1; i < t.length; ) {
    if (t[i - 1][0] == U && t[i][0] == z) {
      var u = t[i - 1][1], f = t[i][1], h = ot(u, f), g = ot(f, u);
      h >= g ? (h >= u.length / 2 || h >= f.length / 2) && (t.splice(i, 0, [
        C,
        f.substring(0, h)
      ]), t[i - 1][1] = u.substring(
        0,
        u.length - h
      ), t[i + 1][1] = f.substring(h), i++) : (g >= u.length / 2 || g >= f.length / 2) && (t.splice(i, 0, [
        C,
        u.substring(0, g)
      ]), t[i - 1][0] = z, t[i - 1][1] = f.substring(
        0,
        f.length - g
      ), t[i + 1][0] = U, t[i + 1][1] = u.substring(g), i++), i++;
    }
    i++;
  }
}
var ct = /[^a-zA-Z0-9]/, lt = /\s/, at = /[\r\n]/, Fn = /\n\r?\n$/, kn = /^\r?\n\r?\n/;
function Mn(t) {
  function e(g, d) {
    if (!g || !d)
      return 6;
    var p = g.charAt(g.length - 1), m = d.charAt(0), b = p.match(ct), v = m.match(ct), y = b && p.match(lt), x = v && m.match(lt), E = y && p.match(at), w = x && m.match(at), T = E && g.match(Fn), M = w && d.match(kn);
    return T || M ? 5 : E || w ? 4 : b && !y && x ? 3 : y || x ? 2 : b || v ? 1 : 0;
  }
  for (var n = 1; n < t.length - 1; ) {
    if (t[n - 1][0] == C && t[n + 1][0] == C) {
      var s = t[n - 1][1], r = t[n][1], i = t[n + 1][1], o = De(s, r);
      if (o) {
        var c = r.substring(r.length - o);
        s = s.substring(0, s.length - o), r = c + r.substring(0, r.length - o), i = c + i;
      }
      for (var l = s, a = r, u = i, f = e(s, r) + e(r, i); r.charAt(0) === i.charAt(0); ) {
        s += r.charAt(0), r = r.substring(1) + i.charAt(0), i = i.substring(1);
        var h = e(s, r) + e(r, i);
        h >= f && (f = h, l = s, a = r, u = i);
      }
      t[n - 1][1] != l && (l ? t[n - 1][1] = l : (t.splice(n - 1, 1), n--), t[n][1] = a, u ? t[n + 1][1] = u : (t.splice(n + 1, 1), n--));
    }
    n++;
  }
}
function qe(t, e) {
  t.push([C, ""]);
  for (var n = 0, s = 0, r = 0, i = "", o = "", c; n < t.length; ) {
    if (n < t.length - 1 && !t[n][1]) {
      t.splice(n, 1);
      continue;
    }
    switch (t[n][0]) {
      case z:
        r++, o += t[n][1], n++;
        break;
      case U:
        s++, i += t[n][1], n++;
        break;
      case C:
        var l = n - r - s - 1;
        if (e) {
          if (l >= 0 && $t(t[l][1])) {
            var a = t[l][1].slice(-1);
            if (t[l][1] = t[l][1].slice(
              0,
              -1
            ), i = a + i, o = a + o, !t[l][1]) {
              t.splice(l, 1), n--;
              var u = l - 1;
              t[u] && t[u][0] === z && (r++, o = t[u][1] + o, u--), t[u] && t[u][0] === U && (s++, i = t[u][1] + i, u--), l = u;
            }
          }
          if (zt(t[n][1])) {
            var a = t[n][1].charAt(0);
            t[n][1] = t[n][1].slice(1), i += a, o += a;
          }
        }
        if (n < t.length - 1 && !t[n][1]) {
          t.splice(n, 1);
          break;
        }
        if (i.length > 0 || o.length > 0) {
          i.length > 0 && o.length > 0 && (c = Ke(o, i), c !== 0 && (l >= 0 ? t[l][1] += o.substring(
            0,
            c
          ) : (t.splice(0, 0, [
            C,
            o.substring(0, c)
          ]), n++), o = o.substring(c), i = i.substring(c)), c = De(o, i), c !== 0 && (t[n][1] = o.substring(o.length - c) + t[n][1], o = o.substring(
            0,
            o.length - c
          ), i = i.substring(
            0,
            i.length - c
          )));
          var f = r + s;
          i.length === 0 && o.length === 0 ? (t.splice(n - f, f), n = n - f) : i.length === 0 ? (t.splice(n - f, f, [z, o]), n = n - f + 1) : o.length === 0 ? (t.splice(n - f, f, [U, i]), n = n - f + 1) : (t.splice(
            n - f,
            f,
            [U, i],
            [z, o]
          ), n = n - f + 2);
        }
        n !== 0 && t[n - 1][0] === C ? (t[n - 1][1] += t[n][1], t.splice(n, 1)) : n++, r = 0, s = 0, i = "", o = "";
        break;
    }
  }
  t[t.length - 1][1] === "" && t.pop();
  var h = !1;
  for (n = 1; n < t.length - 1; )
    t[n - 1][0] === C && t[n + 1][0] === C && (t[n][1].substring(
      t[n][1].length - t[n - 1][1].length
    ) === t[n - 1][1] ? (t[n][1] = t[n - 1][1] + t[n][1].substring(
      0,
      t[n][1].length - t[n - 1][1].length
    ), t[n + 1][1] = t[n - 1][1] + t[n + 1][1], t.splice(n - 1, 1), h = !0) : t[n][1].substring(0, t[n + 1][1].length) == t[n + 1][1] && (t[n - 1][1] += t[n + 1][1], t[n][1] = t[n][1].substring(t[n + 1][1].length) + t[n + 1][1], t.splice(n + 1, 1), h = !0)), n++;
  h && qe(t, e);
}
function Pt(t) {
  return t >= 55296 && t <= 56319;
}
function jt(t) {
  return t >= 56320 && t <= 57343;
}
function zt(t) {
  return jt(t.charCodeAt(0));
}
function $t(t) {
  return Pt(t.charCodeAt(t.length - 1));
}
function In(t) {
  for (var e = [], n = 0; n < t.length; n++)
    t[n][1].length > 0 && e.push(t[n]);
  return e;
}
function Be(t, e, n, s) {
  return $t(t) || zt(s) ? null : In([
    [C, t],
    [U, e],
    [z, n],
    [C, s]
  ]);
}
function _n(t, e, n) {
  var s = typeof n == "number" ? { index: n, length: 0 } : n.oldRange, r = typeof n == "number" ? null : n.newRange, i = t.length, o = e.length;
  if (s.length === 0 && (r === null || r.length === 0)) {
    var c = s.index, l = t.slice(0, c), a = t.slice(c), u = r ? r.index : null;
    e: {
      var f = c + o - i;
      if (u !== null && u !== f || f < 0 || f > o)
        break e;
      var h = e.slice(0, f), g = e.slice(f);
      if (g !== a)
        break e;
      var d = Math.min(c, f), p = l.slice(0, d), m = h.slice(0, d);
      if (p !== m)
        break e;
      var b = l.slice(d), v = h.slice(d);
      return Be(p, b, v, a);
    }
    e: {
      if (u !== null && u !== c)
        break e;
      var y = c, h = e.slice(0, y), g = e.slice(y);
      if (h !== l)
        break e;
      var x = Math.min(i - y, o - y), E = a.slice(a.length - x), w = g.slice(g.length - x);
      if (E !== w)
        break e;
      var b = a.slice(0, a.length - x), v = g.slice(0, g.length - x);
      return Be(l, b, v, E);
    }
  }
  if (s.length > 0 && r && r.length === 0)
    e: {
      var p = t.slice(0, s.index), E = t.slice(s.index + s.length), d = p.length, x = E.length;
      if (o < d + x)
        break e;
      var m = e.slice(0, d), w = e.slice(o - x);
      if (p !== m || E !== w)
        break e;
      var b = t.slice(d, i - x), v = e.slice(d, o - x);
      return Be(p, b, v, E);
    }
  return null;
}
function q(t, e, n, s) {
  return he(t, e, n, s, !0);
}
q.INSERT = z;
q.DELETE = U;
q.EQUAL = C;
var fe;
((t) => {
  function e(s) {
    return new Ht(s);
  }
  t.iterator = e;
  function n(s) {
    return typeof s.delete == "number" ? s.delete : typeof s.retain == "number" ? s.retain : typeof s.insert == "string" ? s.insert.length : 1;
  }
  t.length = n;
})(fe || (fe = {}));
const D = fe;
class Ht {
  constructor(e) {
    L(this, "ops");
    L(this, "index");
    L(this, "offset");
    this.ops = e, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return !!this.peek();
  }
  next(e) {
    e || (e = 1 / 0);
    const n = this.ops[this.index];
    if (n) {
      const s = this.offset, r = fe.length(n);
      if (e >= r - s ? (e = r - s, this.index += 1, this.offset = 0) : this.offset += e, typeof n.delete == "number")
        return { delete: e };
      {
        if (r === e) return n;
        const i = {};
        return n.attributes && (i.attributes = n.attributes), typeof n.retain == "number" ? i.retain = e : typeof n.insert == "string" ? i.insert = n.insert.substr(s, e) : i.insert = n.insert, i;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? fe.length(this.ops[this.index]) - this.offset : 1 / 0;
  }
  peekType() {
    const e = this.ops[this.index];
    return e ? typeof e.delete == "number" ? "delete" : typeof e.retain == "number" ? "retain" : "insert" : "retain";
  }
  rest() {
    if (this.hasNext()) {
      if (this.offset === 0)
        return this.ops.slice(this.index);
      {
        const e = this.offset, n = this.index, s = this.next(), r = this.ops.slice(this.index);
        return this.offset = e, this.index = n, [s].concat(r);
      }
    } else return [];
  }
}
const Sn = "\0", $ = class $ {
  constructor(e) {
    L(this, "ops");
    Array.isArray(e) ? this.ops = e : e != null && Array.isArray(e.ops) ? this.ops = e.ops : this.ops = [];
  }
  insert(e, n) {
    const s = {};
    return typeof e == "string" && e.length === 0 ? this : (s.insert = e, n != null && typeof n == "object" && Object.keys(n).length > 0 && (s.attributes = n), this.push(s));
  }
  delete(e) {
    return e <= 0 ? this : this.push({ delete: e });
  }
  retain(e, n) {
    if (e <= 0)
      return this;
    const s = { retain: e };
    return n != null && typeof n == "object" && Object.keys(n).length > 0 && (s.attributes = n), this.push(s);
  }
  push(e) {
    let n = this.ops.length, s = this.ops[n - 1];
    if (typeof s == "object") {
      if (typeof e.delete == "number" && typeof s.delete == "number")
        return this.ops[n - 1] = { delete: s.delete + e.delete }, this;
      if (typeof s.delete == "number" && e.insert != null && (n -= 1, s = this.ops[n - 1], typeof s != "object"))
        return this.ops.unshift(e), this;
      if (k(e.attributes, s.attributes)) {
        if (typeof e.insert == "string" && typeof s.insert == "string")
          return this.ops[n - 1] = { insert: s.insert + e.insert }, typeof e.attributes == "object" && (this.ops[n - 1].attributes = e.attributes), this;
        if (typeof e.retain == "number" && typeof s.retain == "number")
          return this.ops[n - 1] = { retain: s.retain + e.retain }, typeof e.attributes == "object" && (this.ops[n - 1].attributes = e.attributes), this;
      }
    }
    return n === this.ops.length ? this.ops.push(e) : this.ops.splice(n, 0, e), this;
  }
  chop() {
    const e = this.ops[this.ops.length - 1];
    return e && e.retain && !e.attributes && this.ops.pop(), this;
  }
  filter(e) {
    return this.ops.filter(e);
  }
  forEach(e) {
    this.ops.forEach(e);
  }
  map(e) {
    return this.ops.map(e);
  }
  partition(e) {
    const n = [], s = [];
    return this.forEach((r) => {
      (e(r) ? n : s).push(r);
    }), [n, s];
  }
  reduce(e, n) {
    return this.ops.reduce(e, n);
  }
  changeLength() {
    return this.reduce((e, n) => n.insert ? e + D.length(n) : n.delete ? e - n.delete : e, 0);
  }
  length() {
    return this.reduce((e, n) => e + D.length(n), 0);
  }
  slice(e = 0, n = 1 / 0) {
    const s = [], r = D.iterator(this.ops);
    let i = 0;
    for (; i < n && r.hasNext(); ) {
      let o;
      i < e ? o = r.next(e - i) : (o = r.next(n - i), s.push(o)), i += D.length(o);
    }
    return new $(s);
  }
  compose(e, n) {
    const s = D.iterator(this.ops), r = D.iterator(e.ops), i = [], o = r.peek();
    if (o != null && typeof o.retain == "number" && o.attributes == null) {
      let l = o.retain;
      for (; s.peekType() === "insert" && s.peekLength() <= l; )
        l -= s.peekLength(), i.push(s.next());
      o.retain - l > 0 && r.next(o.retain - l);
    }
    const c = new $(i);
    for (; s.hasNext() || r.hasNext(); )
      if (r.peekType() === "insert")
        c.push(r.next());
      else if (s.peekType() === "delete")
        c.push(s.next());
      else {
        const l = Math.min(s.peekLength(), r.peekLength()), a = s.next(l), u = r.next(l);
        if (typeof u.retain == "number") {
          let f;
          const h = u.attributes && H.compose(
            a.attributes,
            u.attributes,
            !n && typeof a.retain == "number"
          );
          if (u.attributes && !k(h, a.attributes) ? (f = {}, typeof a.retain == "number" ? f.retain = l : f.insert = a.insert, h && (f.attributes = h)) : a.retain === 1 / 0 ? f = u : f = a, c.push(f), u.retain === 1 / 0 || !r.hasNext() && k(c.ops[c.ops.length - 1], f)) {
            const g = new $(s.rest());
            return c.concat(g).chop();
          }
        } else typeof u.delete == "number" && typeof a.retain == "number" && c.push(u);
      }
    return c.chop();
  }
  concat(e) {
    const n = new $(this.ops.slice());
    return e.ops.length > 0 && (n.push(e.ops[0]), n.ops = n.ops.concat(e.ops.slice(1))), n;
  }
  diff(e, n) {
    if (this.ops === e.ops)
      return new $();
    const s = [this, e].map((l) => l.map((a) => {
      if (a.insert != null)
        return typeof a.insert == "string" ? a.insert : Sn;
      const u = l === e ? "on" : "with";
      throw new Error("diff() called " + u + " non-document");
    }).join("")), r = new $(), i = q(s[0], s[1], n), o = D.iterator(this.ops), c = D.iterator(e.ops);
    return i.forEach((l) => {
      let a = l[1].length;
      for (; a > 0; ) {
        let u = 0;
        switch (l[0]) {
          case q.INSERT:
            u = Math.min(c.peekLength(), a), r.push(c.next(u));
            break;
          case q.DELETE:
            u = Math.min(a, o.peekLength()), o.next(u), r.delete(u);
            break;
          case q.EQUAL:
            u = Math.min(o.peekLength(), c.peekLength(), a);
            const f = o.next(u), h = c.next(u);
            k(f.insert, h.insert) ? r.retain(u, H.diff(f.attributes, h.attributes)) : r.push(h).delete(u);
            break;
        }
        a -= u;
      }
    }), r.chop();
  }
  eachLine(e, n = `
`) {
    const s = D.iterator(this.ops);
    let r = new $(), i = 0;
    for (; s.hasNext(); ) {
      if (s.peekType() !== "insert")
        return;
      const o = s.peek(), c = D.length(o) - s.peekLength(), l = typeof o.insert == "string" ? o.insert.indexOf(n, c) - c : -1;
      if (l < 0)
        r.push(s.next());
      else if (l > 0)
        r.push(s.next(l));
      else {
        if (e(r, s.next(1).attributes || {}, i) === !1)
          return;
        i += 1, r = new $();
      }
    }
    r.length() > 0 && e(r, {}, i);
  }
  invert(e) {
    const n = new $();
    return this.reduce((s, r) => {
      if (r.insert)
        n.delete(D.length(r));
      else {
        if (r.retain && r.attributes == null)
          return n.retain(r.retain), s + r.retain;
        if (r.delete || r.retain) {
          const i = r.delete || r.retain;
          return e.slice(s, s + i).forEach((c) => {
            r.delete ? n.push(c) : r.retain && r.attributes && n.retain(D.length(c), H.invert(r.attributes, c.attributes));
          }), s + i;
        }
      }
      return s;
    }, 0), n.chop();
  }
  transform(e, n = !1) {
    if (n = !!n, typeof e == "number")
      return this.transformPosition(e, n);
    const s = e, r = D.iterator(this.ops), i = D.iterator(s.ops), o = new $();
    for (; r.hasNext() || i.hasNext(); )
      if (r.peekType() === "insert" && (n || i.peekType() !== "insert"))
        o.retain(D.length(r.next()));
      else if (i.peekType() === "insert")
        o.push(i.next());
      else {
        const c = Math.min(r.peekLength(), i.peekLength()), l = r.next(c), a = i.next(c);
        if (l.delete)
          continue;
        a.delete ? o.push(a) : o.retain(c, H.transform(l.attributes, a.attributes, n));
      }
    return o.chop();
  }
  transformPosition(e, n = !1) {
    n = !!n;
    const s = D.iterator(this.ops);
    let r = 0;
    for (; s.hasNext() && r <= e; ) {
      const i = s.peekLength(), o = s.peekType();
      if (s.next(), o === "delete") {
        e -= Math.min(i, e - r);
        continue;
      } else o === "insert" && (r < e || !n) && (e += i);
      r += i;
    }
    return e;
  }
};
L($, "Op", D), L($, "AttributeMap", H);
let S = $;
function O(t) {
  return t && (t[0] > t[1] && (t = [t[1], t[0]]), t);
}
function Wt(t) {
  return t.map(
    (e) => typeof e.insert == "string" ? e.insert : e.insert ? " " : ""
  ).join("");
}
const Rn = /* @__PURE__ */ new Map(), Dn = {
  id: "",
  attributes: {},
  content: new S([{ retain: 1 / 0 }]),
  length: 1 / 0
};
var de;
((t) => {
  function e(h, g) {
    return new On(h, g);
  }
  t.iterator = e;
  function n(h) {
    const g = /* @__PURE__ */ new Map();
    return h.forEach(
      (d) => g.set(d.id || t.createId(g), d)
    ), g;
  }
  t.linesToLineIds = n;
  function s(h) {
    return h.length;
  }
  t.length = s;
  function r(h) {
    return console.warn("getId() is deprecated"), h.id;
  }
  t.getId = r;
  function i(h, g) {
    return k(h.attributes, g.attributes) && k(h.content.ops, g.content.ops);
  }
  t.equal = i;
  function o(h, g) {
    const d = [], p = new Map(g || []);
    return h.eachLine((m, b) => {
      const v = t.create(
        m,
        Object.keys(b).length ? b : void 0,
        p
      );
      p.set(v.id, v), d.push(v);
    }), d;
  }
  t.fromDelta = o;
  function c(h) {
    let g = new S();
    return h.forEach((d) => {
      g = g.concat(d.content), g.insert(`
`, d.attributes);
    }), g;
  }
  t.toDelta = c;
  function l(h = new S(), g = {}, d) {
    const p = h.length() + 1;
    return typeof d != "string" && (d = f(d)), { id: d, attributes: g, content: h, length: p };
  }
  t.create = l;
  function a(h, g = new S(), d) {
    const p = h ? h.id : f(d), m = h ? h.attributes : {};
    return { id: p, attributes: m, content: g, length: 1 };
  }
  t.createFrom = a;
  function u(h) {
    const g = /* @__PURE__ */ new Map();
    let d = 0;
    return h.forEach((p) => {
      g.set(p, [d, d += p.length]);
    }), g;
  }
  t.getLineRanges = u;
  function f(h = Rn) {
    let g;
    for (; h[g = Math.random().toString(36).slice(2)]; ) ;
    return g;
  }
  t.createId = f;
})(de || (de = {}));
const P = de;
class On {
  constructor(e, n) {
    L(this, "lines");
    L(this, "index");
    L(this, "offset");
    L(this, "lineIds");
    this.lines = e, this.index = 0, this.offset = 0, this.lineIds = n ? new Map(n) : de.linesToLineIds(e);
  }
  hasNext() {
    return !!this.peek();
  }
  next(e) {
    e || (e = 1 / 0);
    const n = this.lines[this.index];
    if (n) {
      const s = this.offset, r = n.length;
      if (e >= r - s ? (e = r - s, this.index += 1, this.offset = 0) : this.offset += e, s === 0 && e >= n.length)
        return n;
      {
        const i = s === 0 ? n.id : de.createId(this.lineIds), o = {
          id: i,
          attributes: n.attributes,
          content: n.content.slice(s, e),
          length: e - s
        };
        return s !== 0 && this.lineIds.set(i, o), o;
      }
    } else
      return Dn;
  }
  peek() {
    return this.lines[this.index];
  }
  peekLength() {
    return this.lines[this.index] ? this.lines[this.index].length - this.offset : 1 / 0;
  }
  rest() {
    if (this.hasNext()) {
      if (this.offset === 0)
        return this.lines.slice(this.index);
      {
        const e = this.offset, n = this.index, s = this.next(), r = this.lines.slice(this.index);
        return this.offset = e, this.index = n, [s].concat(r);
      }
    } else return [];
  }
}
var Ye;
((t) => {
  function e(s, r) {
    return new Cn(s, r);
  }
  t.iterator = e;
  function n(s) {
    return D.length(s);
  }
  t.length = n;
})(Ye || (Ye = {}));
const Pe = Ye;
class Cn {
  constructor(e, n) {
    L(this, "lineIterator");
    L(this, "opIterator");
    this.lineIterator = P.iterator(e, n);
    const s = this.lineIterator.peek();
    this.opIterator = D.iterator((s == null ? void 0 : s.content.ops) || []);
  }
  hasNext() {
    return this.opIterator.hasNext() || this.lineIterator.hasNext();
  }
  next(e) {
    let n = this.opIterator.next(e);
    return n.retain === 1 / 0 && this.lineIterator.hasNext() && (n = ut(this.nextLine())), n;
  }
  nextLine() {
    const e = this.lineIterator.next(), n = this.lineIterator.peek();
    return this.opIterator = new Ht((n == null ? void 0 : n.content.ops) || []), e;
  }
  peek() {
    return this.opIterator.hasNext() || !this.lineIterator.hasNext() ? this.opIterator.peek() : ut(this.peekLine());
  }
  peekLine() {
    return this.lineIterator.peek();
  }
  peekLength() {
    return this.opIterator.hasNext() || !this.lineIterator.hasNext() ? this.opIterator.peekLength() : 1;
  }
  peekLineLength() {
    return this.lineIterator.peekLength();
  }
  peekType() {
    return this.opIterator.hasNext() ? this.opIterator.peekType() : this.lineIterator.hasNext() ? "insert" : "retain";
  }
  restCurrentLine() {
    return this.opIterator.rest();
  }
  restLines() {
    return this.opIterator.offset && this.lineIterator.next(this.opIterator.offset), this.lineIterator.rest();
  }
}
function ut(t) {
  const e = { insert: `
` };
  return t.attributes && (e.attributes = t.attributes), e;
}
class J {
  constructor(e, n = new S(), s, r) {
    L(this, "_pos");
    L(this, "doc");
    L(this, "delta");
    L(this, "selection");
    L(this, "activeFormats");
    this._pos = 0, this.doc = e, this.delta = n, this.selection = s, this.activeFormats = r;
  }
  get contentChanged() {
    return this.delta.ops.length > 0;
  }
  get selectionChanged() {
    var e;
    return this.selection !== void 0 && !k(this.selection, (e = this.doc) == null ? void 0 : e.selection);
  }
  apply() {
    throw new Error("Must be overridden by creator of change (e.g. Editor).");
  }
  setDelta(e) {
    return this.delta = e, this._pos = e.length(), this;
  }
  setActiveFormats(e) {
    return this.activeFormats = e, this;
  }
  select(e) {
    return this.selection = typeof e == "number" ? [e, e] : e, this;
  }
  delete(e, n) {
    if (!e || !this.doc) return this;
    let [s, r] = O(e);
    if (s === r) return this;
    if (s = Math.min(this.doc.length - 1, Math.max(0, s)), r = Math.min(this.doc.length, Math.max(0, r)), s === r) return this;
    const i = r - s;
    this.doc.selection && (this.selection = [s, s]), this.compose(s, (c) => c.delete(i), i);
    const o = this.doc.getLineRange(s);
    if (!(n != null && n.dontFixNewline) && o[1] <= r) {
      const c = this.doc.getLineAt(s).attributes;
      this.formatLine(r, c);
    }
    return this;
  }
  insert(e, n, s, r) {
    if (!this.doc) return this;
    if (e = this.normalizePoint(e), this.doc.selection) {
      const c = e + (typeof n == "string" ? n.length : 1);
      this.selection = [c, c];
    }
    const { id: i, ...o } = this.doc.getLineAt(e).attributes;
    if (typeof n != "string")
      this.compose(e, (c) => c.insert(n, s));
    else if (n === `
`)
      r != null && r.dontFixNewline ? this.compose(e, (c) => c.insert(`
`, { ...s })) : (this.compose(e, (c) => c.insert(`
`, o)), this.formatLine(e, { ...s }));
    else if (s || (s = this.getFormatAt(e)), n.includes(`
`)) {
      const c = n.split(`
`);
      this.compose(e, (l) => (c.forEach((a, u) => {
        u && l.insert(`
`, u === 1 ? o : {}), a.length && l.insert(a, s);
      }), l));
    } else
      this.compose(e, (c) => c.insert(n, s));
    return this;
  }
  insertContent(e, n) {
    if (!this.doc) return this;
    if (e = this.normalizePoint(e), this.doc.selection) {
      const i = n.ops.filter((c) => c.delete);
      for (; i.length && i[i.length - 1].retain; ) i.pop();
      const o = e + i.reduce((c, l) => c + D.length(l), 0);
      this.selection = [o, o];
    }
    const r = Wt(n).indexOf(`
`);
    return r !== -1 && (n = n.compose(
      new S().retain(r).retain(1, this.doc.getLineFormat(e))
    )), this.compose(e, (i) => i.concat(n)), this;
  }
  formatText(e, n) {
    return this.doc ? (e = O(e), e[1] - e[0] ? (n && Object.keys(n).forEach(
      (r) => n[r] === !1 && (n[r] = null)
    ), this.doc.getLineRanges(e).forEach(([r, i]) => {
      r = Math.max(e[0], r), i = Math.min(e[1], i - 1);
      const o = i - r;
      this.compose(r, (c) => c.retain(o, n), o);
    }), this) : this) : this;
  }
  toggleTextFormat(e, n) {
    if (!this.doc) return this;
    typeof e == "number" && (e = [e, e]), e = O(e);
    const s = this.doc.getTextFormat(e);
    return Qe(n, s) && (n = H.invert(n)), this.formatText(e, n);
  }
  formatLine(e, n, s) {
    if (!this.doc) return this;
    const r = this.doc;
    return typeof e == "number" && (e = [e, e]), e = O(e), this.doc.getLineRanges(e).forEach(([, i]) => {
      i--, s || (n = { ...H.invert(r.getLineFormat(i)), ...n }), this.compose(i, (o) => o.retain(1, n), 1);
    }), this.delta.chop(), this;
  }
  toggleLineFormat(e, n) {
    if (!this.doc) return this;
    typeof e == "number" && (e = [e, e]), e = O(e);
    const s = this.doc.getLineFormat(e);
    return Qe(n, s) && (n = H.invert(n)), this.formatLine(e, n);
  }
  removeFormat(e) {
    if (!this.doc) return this;
    e = O(e);
    const n = H.invert(this.doc.getFormats(e)), s = e[1] - e[0];
    return this.compose(
      e[0],
      (r) => r.retain(s, n),
      s
    );
  }
  transform(e, n) {
    const s = this.delta.transform(e.delta, n), r = e.selection && this.transformSelection(e.selection);
    return new J(null, s, r);
  }
  transformSelection(e, n) {
    if (!e) return e;
    const s = this.delta.transformPosition(e[0], n), r = this.delta.transformPosition(e[1], n);
    return s === e[0] && r === e[1] ? e : [s, r];
  }
  transformAgainst(e, n) {
    return (e.ops ? new J(null, e) : e).transform(this, !n);
  }
  isFor(e) {
    return this.doc === e;
  }
  clone() {
    var e;
    return new J(
      this.doc,
      new S(this.delta.ops.slice()),
      (e = this.selection) == null ? void 0 : e.slice()
    );
  }
  compose(e, n, s) {
    return this._pos <= e ? this.delta = n(this.delta.retain(e - this._pos)) : this.delta = this.delta.compose(n(new S().retain(e))), this._pos = Math.max(e + (s || 0), this._pos), this;
  }
  normalizePoint(e, n = this.doc ? this.doc.length - 1 : 0) {
    return Math.max(0, Math.min(n, e));
  }
  getFormatAt(e) {
    let n;
    if (this.doc) {
      const s = this.doc.getTextFormat(e), r = this.doc.getTextFormat(e + 1);
      s && r && (n = s === r ? s : Bn(r, Object.keys(s)));
    }
    return n;
  }
}
function Qe(t, e) {
  return Object.keys(t).every(
    (n) => k(e[n], t[n])
  );
}
function Bn(t, e) {
  const n = {};
  return Object.keys(t).forEach((s) => {
    t[s] === e[s] && (n[s] = t[s]);
  }), n;
}
const ht = [0, 0], Pn = {}, jn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new Set(["id"]);
class W {
  constructor(e, n = null) {
    L(this, "_ranges");
    L(this, "byId");
    L(this, "lines");
    L(this, "length");
    L(this, "selection");
    if (e && e.lines) {
      const s = e;
      this.lines = s.lines, this.byId = s.byId, this._ranges = s._ranges, this.length = s.length;
    } else
      this.byId = /* @__PURE__ */ new Map(), e && Array.isArray(e) ? this.lines = e : e ? this.lines = P.fromDelta(e) : this.lines = [P.create()], this.lines.length || this.lines.push(P.create()), this.byId = P.linesToLineIds(this.lines), this.lines.forEach((s) => {
        if (this.byId.get(s.id) !== s)
          throw new Error("TextDocument has duplicate line ids: " + s.id);
      }), this._ranges = P.getLineRanges(this.lines), this.length = this.lines.reduce(
        (s, r) => s + r.length,
        0
      );
    n && (n = n.map(
      (s) => Math.min(this.length, Math.max(0, s))
    ), n[0] === n[1] && n[0] === this.length && n[0]--), this.selection = n;
  }
  get change() {
    const e = new J(this);
    return e.apply = () => this.apply(e), e;
  }
  getText(e) {
    return e && (e = O(e)), Wt(
      e ? this.slice(e[0], e[1]) : this.slice(0, this.length - 1)
    );
  }
  getLineBy(e) {
    return this.byId.get(e);
  }
  getLineAt(e) {
    return this.lines.find((n) => {
      const [s, r] = this.getLineRange(n);
      return s <= e && r > e;
    });
  }
  getLinesAt(e, n) {
    let s, r;
    return Array.isArray(e) ? [s, r] = O(e) : s = r = e, this.lines.filter((i) => {
      const [o, c] = this.getLineRange(i);
      return n ? o >= s && c <= r : (o < r || o === s) && c > s;
    });
  }
  getLineRange(e) {
    const { lines: n, _ranges: s } = this;
    if (typeof e == "number") {
      for (let r = 0; r < n.length; r++) {
        const i = s.get(n[r]) || ht;
        if (i[0] <= e && i[1] > e) return i;
      }
      return ht;
    } else
      return typeof e == "string" && (e = this.getLineBy(e)), s.get(e);
  }
  getLineRanges(e) {
    return e == null ? Array.from(this._ranges.values()) : this.getLinesAt(e).map((n) => this.getLineRange(n));
  }
  getLineFormat(e = this.selection, n) {
    let s = e;
    return Array.isArray(e) && ([e, s] = O(e)), e === s && s++, ft(P, this.lines, e, s, void 0, n);
  }
  getTextFormat(e = this.selection, n) {
    let s = e;
    return Array.isArray(e) && ([e, s] = O(e)), e === s && e--, ft(
      Pe,
      this.lines,
      e,
      s,
      (r) => r.insert !== `
`,
      n
    );
  }
  getFormats(e = this.selection, n) {
    return {
      ...this.getTextFormat(e, n),
      ...this.getLineFormat(e, n)
    };
  }
  slice(e = 0, n = 1 / 0) {
    const s = [], r = Pe.iterator(this.lines);
    let i = 0;
    for (; i < n && r.hasNext(); ) {
      let o;
      i < e ? o = r.next(e - i) : (o = r.next(n - i), s.push(o)), i += D.length(o);
    }
    return new S(s);
  }
  apply(e, n, s) {
    var f;
    let r;
    if (e.delta ? (r = e.delta, n = e.selection) : r = e, !r.ops.length && (n === void 0 || k(this.selection, n)))
      return this;
    if (!r.ops.length && n)
      return new W(this, n);
    n === void 0 && this.selection && (n = [
      r.transformPosition(this.selection[0]),
      r.transformPosition(this.selection[1])
    ], k(this.selection, n) && (n = this.selection));
    const i = Pe.iterator(this.lines, this.byId), o = D.iterator(r.ops), c = [], l = o.peek();
    if (l && l.retain && !l.attributes) {
      let h = l.retain;
      for (; i.peekLineLength() <= h; )
        h -= i.peekLineLength(), c.push(i.nextLine());
      l.retain - h > 0 && o.next(l.retain - h);
    }
    if (!i.hasNext() && s)
      throw new Error(
        "apply() called with change that extends beyond document"
      );
    let a = P.createFrom(i.peekLine());
    function u(h) {
      h.length = h.content.length() + 1, c.push(h);
    }
    for (; i.hasNext() || o.hasNext(); )
      if (o.peekType() === "insert") {
        const h = o.peek(), g = typeof h.insert == "string" ? h.insert.indexOf(`
`, o.offset) : -1;
        if (g < 0)
          a.content.push(o.next());
        else {
          const d = g - o.offset;
          d && a.content.push(o.next(d));
          const p = o.next(1);
          u(P.create(a.content, p.attributes, a.id)), a = P.create(void 0, a.attributes);
        }
      } else {
        const h = Math.min(i.peekLength(), o.peekLength()), g = i.next(h), d = o.next(h);
        if (typeof g.retain == "number") {
          if (s)
            throw new Error(
              "apply() called with change that extends beyond document"
            );
          continue;
        }
        if (typeof d.retain == "number") {
          const p = g.insert === `
`;
          let m = g;
          const b = d.attributes && H.compose(g.attributes, d.attributes);
          if (d.attributes && !k(b, g.attributes) && (p ? a.attributes = b || {} : (m = { insert: g.insert }, b && (m.attributes = b))), p ? (u(a), a = P.createFrom(i.peekLine())) : a.content.push(m), d.retain === 1 / 0 || !o.hasNext()) {
            if (i.opIterator.index !== 0 || i.opIterator.offset !== 0) {
              const v = i.restCurrentLine();
              for (let y = 0; y < v.length; y++)
                a.content.push(v[y]);
              u(a), i.nextLine();
            }
            c.push(...i.restLines());
            break;
          }
        } else typeof d.delete == "number" && g.insert === `
` && (a = P.create(a.content, (f = i.peekLine()) == null ? void 0 : f.attributes, a.id));
      }
    return c.length || c.push(a), new W(c, n);
  }
  replace(e, n) {
    return new W(e, n);
  }
  toDelta() {
    const e = jn;
    let n = e.get(this);
    return n || (n = P.toDelta(this.lines), e.set(this, n)), n;
  }
  equals(e, n) {
    return this === e || ((n == null ? void 0 : n.contentOnly) || k(this.selection, e.selection)) && k(this.lines, e.lines, { excludeProps: zn });
  }
  toJSON() {
    return this.toDelta();
  }
  toString() {
    return this.lines.map(
      (e) => e.content.map((n) => typeof n.insert == "string" ? n.insert : " ").join("")
    ).join(`
`) + `
`;
  }
}
function ft(t, e, n, s, r, i) {
  const o = t.iterator(e);
  let c, l = 0;
  for (o.skip && (l += o.skip(n)); l < s && o.hasNext(); ) {
    const a = o.next();
    l += t.length(a), l > n && (!r || r(a)) && (a.attributes ? c ? i != null && i.allFormats ? c = H.compose(c, a.attributes) : c = $n(
      c,
      a.attributes,
      i == null ? void 0 : i.nameOnly
    ) : c = { ...a.attributes } : c = {});
  }
  return c || Pn;
}
function $n(t, e, n) {
  return Object.keys(e).reduce(function(s, r) {
    return n ? r in t && r in e && (s[r] = !0) : k(t[r], e[r], { partial: !0 }) ? s[r] = e[r] : k(e[r], t[r], { partial: !0 }) && (s[r] = t[r]), s;
  }, {});
}
const Xe = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap();
class Wn {
  on(e, n, s) {
    this.addEventListener(e, n, s);
  }
  off(e, n, s) {
    this.removeEventListener(e, n, s);
  }
  addEventListener(e, n, s) {
    s != null && s.once && (n = dt(this, e, n, !0)), Ae(this, e, !0).add(n);
  }
  removeEventListener(e, n, s) {
    if (s != null && s.once && (n = dt(this, e, n)), !n) return;
    const r = Ae(this, e);
    r && r.delete(n);
  }
  dispatchEvent(e, n) {
    let s = !1;
    e.bubbles && (e.stopImmediatePropagation = e.stopPropagation = () => s = !0);
    const r = Ae(this, e.type);
    if (r)
      for (let i of r) {
        if (n)
          try {
            i.call(this, e);
          } catch (o) {
            try {
              this.dispatchEvent(new ErrorEvent("error", { error: o }));
            } catch {
            }
          }
        else
          i.call(this, e);
        if (s) break;
      }
  }
}
function Ae(t, e, n = !1) {
  let s = Xe.get(t);
  return !s && n && Xe.set(t, s = /* @__PURE__ */ Object.create(null)), s && s[e] || n && (s[e] = /* @__PURE__ */ new Set());
}
function dt(t, e, n, s = !1) {
  let r = Hn.get(t);
  !r && s && Xe.set(t, r = /* @__PURE__ */ Object.create(null));
  const i = r && r[e] || s && (r[e] = /* @__PURE__ */ new Map());
  if (!i.has(n) && s) {
    const o = (c) => {
      const l = Ae(t, e);
      l && l.delete(n), n.call(t, c);
    };
    i.set(n, o);
  }
  return i && i.get(n);
}
const Ze = {
  renderKeys: !1
}, Un = [], Yn = "http://www.w3.org/2000/svg", Je = "data-key", Qn = /* @__PURE__ */ new Set(["value", "selected", "checked", "contentEditable"]), K = (t) => t == null ? t : t.key, Ut = (t, e) => {
  e && e !== t.key && (t.key = e, Ze.renderKeys && t.setAttribute(Je, e)), !e && t.key && (delete t.key, Ze.renderKeys && t.removeAttribute(Je));
}, gt = (t) => {
  t.currentTarget.events[t.type](t);
}, Yt = (t, e, n, s, r) => {
  e === "key" || (e[0] === "o" && e[1] === "n" ? ((t.events || (t.events = {}))[e = e.slice(2)] = s) ? n || t.addEventListener(e, gt) : t.removeEventListener(e, gt) : s == null ? t.removeAttribute(e) : !r && e !== "list" && e !== "form" && e in t ? t[e] = s ?? "" : t.setAttribute(e, s));
}, ke = (t, e) => {
  if (typeof t == "string")
    return document.createTextNode(t);
  var n = t.props, s = (e = e || t.type === "svg") ? document.createElementNS(Yn, t.type, { is: n.is }) : document.createElement(t.type, { is: n.is });
  for (var r in n) Yt(s, r, null, n[r], e);
  return Ut(s, K(t)), t.children.forEach((i) => s.appendChild(ke(ce(i), e))), s;
}, Qt = (t, e) => {
  const n = {};
  for (let s = 0; s < t.attributes.length; s++) {
    const { name: r, value: i } = t.attributes[s];
    r in t && r !== "list" && !e ? n[r] = t[r] : (!Ze.renderKeys || r !== Je) && (n[r] = i === "" ? !0 : i);
  }
  return n;
}, re = (t, e, n, s, r) => {
  if (typeof s == "string")
    n != null && n.nodeType === Node.TEXT_NODE ? n.nodeValue !== s && (e.nodeValue = s) : (e = t.insertBefore(ke(s, r), e), n != null && t.removeChild(n));
  else if (n == null || n.nodeName.toLowerCase() !== s.type)
    e = t.insertBefore(ke(ce(s), r), e), n != null && t.removeChild(n);
  else {
    var i = Qt(n, r), o = s.props;
    r = r || s.type === "svg";
    for (var c in { ...i, ...o })
      (Qn.has(c) ? e[c] : i[c]) !== o[c] && Yt(e, c, i[c], o[c], r);
    Ut(e, s.key), Xt(e, s.children, r);
  }
  return e;
}, Xt = (t, e, n, s = Array.from(t.childNodes)) => {
  for (var r, i, o, c, l = 0, a = 0, u = s.length - 1, f = e.length - 1; a <= f && l <= u && !((o = K(s[l])) == null || o !== K(e[a])); )
    re(t, s[l], s[l++], e[a] = ce(e[a++]), n);
  for (; a <= f && l <= u && !((o = K(s[u])) == null || o !== K(e[f])); )
    s[u] = re(
      t,
      s[u],
      s[u--],
      e[f] = ce(e[f--]),
      n
    );
  if (l > u) {
    const h = s[l] || s[l - 1] && s[l - 1].nextSibling || null;
    for (; a <= f; )
      t.insertBefore(ke(e[a] = ce(e[a++]), n), h);
  } else if (a > f)
    for (; l <= u; )
      t.removeChild(s[l++]);
  else {
    const h = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set();
    for (let d = l; d <= u; d++)
      (o = K(s[d])) != null && h.set(o, s[d]);
    for (; a <= f; ) {
      if (o = K(i = s[l]), c = K(e[a] = ce(e[a])), g.has(o) || c != null && c === K(s[l + 1])) {
        o == null && t.removeChild(i), l++;
        continue;
      }
      c == null ? (o == null && (re(t, i, i, e[a], n), a++), l++) : (o === c ? (re(t, i, i, e[a], n), g.add(c), l++) : (r = h.get(c)) != null ? (re(t, t.insertBefore(r, i), r, e[a], n), g.add(c)) : re(t, i, null, e[a], n), a++);
    }
    for (; l <= u; )
      K(i = s[l++]) == null && t.removeChild(i);
    for (const [d, p] of h)
      g.has(d) || t.removeChild(p);
  }
  return t;
}, ce = (t) => t !== !0 && t !== !1 && t ? t : "", Zt = (t, e, n, s) => ({
  type: t,
  props: e,
  children: n,
  key: s
}), Xn = (t) => t.nodeType === Node.TEXT_NODE ? t.nodeValue : Zt(
  t.nodeName.toLowerCase(),
  Qt(t),
  Un.map.call(t.childNodes, Xn),
  K(t)
), _ = (t, e, n) => typeof t == "function" ? t(e || {}, n) : Zt(t, e || {}, Array.isArray(n) ? n : n == null ? [] : [n], e == null ? void 0 : e.key), wr = { createElement: _ }, me = (t, e, n) => (Array.isArray(e) ? t = Xt(t, e, t instanceof window.SVGElement, n) : t = re(t.parentNode, t, t, e), t), Zn = /;\s*$/, Jn = {
  name: "decoration",
  selector: "span.format.decoration",
  fromDom: !1,
  render: (t, e) => Ve(_("span", {}, e), t, ["format", "decoration"])
}, Gn = {
  name: "decoration",
  selector: ".embed.decoration",
  fromDom: !1,
  noFill: !0,
  render: (t, e) => {
    const n = "embed decoration", { name: s, ...r } = t.decoration;
    return r.class = r.class ? n + " " + r.class : n, _(s || "span", r, e);
  }
};
class Kn extends Event {
  constructor(n, s) {
    super(n, s);
    L(this, "old");
    L(this, "doc");
    L(this, "change");
    L(this, "changedLines");
    this.old = s.old, this.doc = s.doc, this.change = s.change, this.changedLines = s.changedLines;
  }
}
function qn(t) {
  t.typeset.formats.add(Jn), t.typeset.embeds.add(Gn);
  const e = /* @__PURE__ */ new Map();
  let n = t.doc, s = n, r = n, i = !1;
  t.on("change", u), t.on("render", h);
  function o(g) {
    if (!g) throw new TypeError("A decoration name is required");
    const d = e.get(g);
    return new Vn(g, t.doc, d, a, c);
  }
  function c(g) {
    var m, b;
    if (!g) throw new TypeError("A decoration name is required");
    const d = e.get(g);
    if (!d) return !1;
    const p = Jt(g, d, n);
    return e.delete(g), e.size ? r = r.apply(p) : r = n, i || ((m = t.modules.rendering) == null || m.render({ old: s, doc: r }), (b = t.modules.selection) == null || b.renderSelection()), !0;
  }
  function l() {
    e.size && e.clear(), r = n;
  }
  function a(g, d) {
    var b, v;
    const p = e.get(g), m = p ? p.compose(d, !0) : d;
    k(m, p) || !p && !m.ops.length || (m.ops.length ? e.set(g, m) : e.delete(g), r = e.size ? r.apply(d, null) : n, i || ((b = t.modules.rendering) == null || b.render({ old: s, doc: r }), (v = t.modules.selection) == null || v.renderSelection()));
  }
  function u(g) {
    const { change: d, changedLines: p } = g;
    if (n = g.doc, d) {
      if (d.contentChanged) {
        for (let [m, b] of e)
          b = d.delta.transform(b, !0), b.ops.length ? e.set(m, b) : e.delete(m);
        r = e.size ? r.apply(d.delta, null) : n, e.size && r.lines.forEach((m, b) => {
          const v = n.lines[b];
          m !== v && m.id !== v.id && (m.id = v.id);
        });
      }
    } else
      l();
    f(d, p);
  }
  function f(g, d) {
    const p = { old: s, doc: n, change: g, changedLines: d };
    i = !0, t.dispatchEvent(new Kn("decorate", p)), i = !1;
  }
  function h() {
    s = r;
  }
  return {
    get old() {
      return s;
    },
    get doc() {
      return r;
    },
    getDecorator: o,
    removeDecorations: c,
    clearDecorations: l,
    gatherDecorations: f,
    init() {
      f();
    },
    destroy() {
      t.off("change", u), t.off("render", h);
    }
  };
}
class Vn {
  constructor(e, n, s, r, i) {
    L(this, "change");
    L(this, "_name");
    L(this, "_doc");
    L(this, "_decoration");
    L(this, "_apply");
    L(this, "_remove");
    this._name = e, this._doc = n, this.change = new J(n), this._decoration = s, this._apply = r, this._remove = i;
  }
  hasDecorations() {
    return !!this._decoration && this._decoration.ops.length > 0 || this.change.delta.ops.length > 0;
  }
  getDecoration() {
    return this._decoration ? this._decoration.compose(this.change.delta) : this.change.delta;
  }
  apply() {
    return this._apply(this._name, this.change.delta);
  }
  remove() {
    return this._remove(this._name);
  }
  clear(e) {
    return this.hasDecorations() ? (e ? this.change.setDelta(this.change.delta.compose(this.invert(e))) : this.change.setDelta(this.invert()), this) : this;
  }
  clearLines(e) {
    if (!e.length) return this;
    const n = this._doc, s = [n.getLineRange(e[0])[0], n.getLineRange(e[e.length - 1])[1]];
    if (e.length === 1 || e.every((l, a) => !a || n.getLineRange(e[a - 1])[1] === n.getLineRange(l)[0]))
      return this.clear(s);
    const i = this.invert(s), o = new S();
    let c = 0;
    return e.forEach((l) => {
      const [a, u] = n.getLineRange(l);
      o.retain(a - c).concat(i.slice(a, u)), c = u;
    }), this.change.setDelta(this.change.delta.compose(o)), this;
  }
  // Clear line of these decorations at position, by id, or by instance
  clearLine(e) {
    const n = this._doc, s = typeof e == "number" ? n.getLineAt(e) : typeof e == "string" ? n.getLineBy(e) : e;
    return this.clearLines([s]);
  }
  invert(e) {
    return this._decoration ? Jt(this._name, this._decoration, this._doc, e) : new S();
  }
  decorateText(e, n = { class: this._name }) {
    return this.change.formatText(e, { decoration: { [this._name]: n } }), this;
  }
  decorateLine(e, n = { class: this._name }) {
    return this.change.formatLine(e, { decoration: { [this._name]: n } }, !0), this;
  }
  insertDecoration(e, n = { class: this._name }) {
    if (typeof n == "string")
      throw new Error("You may only insert embed decorations");
    return this.change.insert(e, { decoration: n }), this;
  }
}
function Ve(t, e, n) {
  if (!e || !e.decoration) return t;
  const s = new Set(n);
  let r = "", i = t.props;
  Object.values(e.decoration).forEach((c) => {
    const { class: l, style: a, ...u } = c;
    l && s.add(l.trim()), a && (r += a.trim()), r && !Zn.test(r) && (r += ";"), i = { ...u, ...i };
  });
  const o = Array.from(s).join(" ").trim();
  return o && (i.class = i.class ? i.class + " " + o : o), r && (i.style = i.style ? i.style + ";" + r : r), t.props = i, t;
}
function Jt(t, e, n, s) {
  let r = n.toDelta();
  return s && (r = r.slice(s[0], s[1]), e = e.slice(s[0], s[1])), e = e.invert(r), e.ops.forEach((i) => {
    var o;
    ((o = i.attributes) == null ? void 0 : o.decoration) === null && (i.attributes.decoration = { [t]: null });
  }), s && (e = new S().retain(s[0]).concat(e)), e;
}
const es = [], pt = _("br", {}), Ne = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap();
function V(t, e) {
  var n, s;
  return (s = (n = et.get(t)) == null ? void 0 : n.get(e)) == null ? void 0 : s[0];
}
function Me(t, e) {
  var n, s;
  return (s = (n = et.get(t)) == null ? void 0 : n.get(e)) == null ? void 0 : s[1];
}
function tt(t) {
  const { root: e, doc: n } = t, s = ie(t, n.lines), r = /* @__PURE__ */ new WeakMap();
  for (let o = 0; o < e.children.length; o++) {
    const c = e.children[o];
    if (!c.key) continue;
    const l = s.byKey[c.key];
    if (l)
      if (Array.isArray(l)) {
        r.set(c, [n.getLineRange(l[0])[0], n.getLineRange(l[l.length - 1])[1]]);
        const a = c.querySelectorAll(t.typeset.lines.selector);
        for (let u = 0; u < a.length; u++) {
          const f = a[u], h = n.getLineBy(f.key);
          h && r.set(f, n.getLineRange(h));
        }
      } else
        r.set(c, n.getLineRange(l));
  }
  const i = e.querySelectorAll(t.typeset.lines.selector);
  for (let o = 0; o < i.length; o++) {
    const c = i[o];
    if (r.has(c) || !c.key) continue;
    const l = n.getLineBy(c.key);
    r.set(c, n.getLineRange(l));
  }
  et.set(e, r);
}
function Ge(t, e) {
  const { root: n } = t;
  t.dispatchEvent(new Event("rendering")), me(n, Gt(t, e)), tt(t), t.dispatchEvent(new Event("render")), t.dispatchEvent(new Event("rendered"));
}
function vt(t, e, n) {
  const { root: s } = t, r = ie(t, e.lines).combined, i = ie(t, n.lines).combined, [o, c] = Vt(r, i);
  k(o, c) || (o[0] = Math.max(0, o[0] - 1), c[0] = Math.max(0, c[0] - 1), o[1] = Math.min(r.length, o[1] + 1), c[1] = Math.min(i.length, c[1] + 1), s.childNodes.length !== r.length && (o[1] += s.childNodes.length - r.length));
  const l = Array.from(s.childNodes).slice(o[0], o[1]), a = i.slice(c[0], c[1]);
  if (!l.length && !a.length) return Ge(t, n);
  t.dispatchEvent(new Event("rendering")), me(s, Kt(t, a), l), tt(t), t.dispatchEvent(new Event("render")), t.dispatchEvent(new Event("rendered"));
}
function Gt(t, e, n) {
  return Kt(t, ie(t, e.lines).combined, n);
}
function Kt(t, e, n) {
  return e.map((s) => qt(t, s, n)).filter(Boolean);
}
function qt(t, e, n) {
  return Array.isArray(e) ? ns(t, e, n) : ts(t, e, n);
}
function ts(t, e, n) {
  const s = Ie(t, e);
  if (!s.render) throw new Error("No render method defined for line");
  const r = s.render(e.attributes, nt(t, e), e, t, n);
  return Ve(r, e.attributes), r.key = e.id, r;
}
function ns(t, e, n) {
  const s = Ie(t, e[0]);
  if (!s.renderMultiple) throw new Error("No render method defined for line");
  const r = s.renderMultiple(
    e.map((i) => [i.attributes, nt(t, i), i.id]),
    t,
    n
  );
  return r.key = e[0].id, r;
}
function ie(t, e) {
  const n = yt.get(e);
  if (n) return n;
  const s = [], r = {};
  let i = [];
  e.forEach((c, l) => {
    const a = Ie(t, c);
    if (a.shouldCombine) {
      i.push(c);
      const u = e[l + 1];
      if (!u || Ie(t, u) !== a || !a.shouldCombine(i[0].attributes, u.attributes)) {
        const f = bt.get(i[0]);
        f && f.length === i.length && i.every((h, g) => f[g] === h) ? i = f : bt.set(i[0], i), s.push(i), r[i[0].id] = i, i = [];
      }
    } else a.render && (s.push(c), r[c.id] = c);
  });
  const o = { combined: s, byKey: r };
  return yt.set(e, o), o;
}
function Vt(t, e) {
  const n = t.length, s = e.length, r = Math.min(n, s);
  let i = 0, o = 0, c = 0, l = 0;
  for (let a = 0; a < r; a++)
    if (!Lt(t[a], e[a])) {
      i = c = a;
      break;
    }
  for (let a = 0; a < r; a++)
    if (!Lt(t[n - a - 1], e[s - a - 1])) {
      o = n - a, l = s - a;
      break;
    }
  return [
    [i, o],
    [c, l]
  ];
}
function nt(t, e, n) {
  const { lines: s, formats: r, embeds: i } = t.typeset;
  let o = [], c = [], l = !0, a;
  return e.content.ops.forEach((u, f, h) => {
    let g = [];
    if (u.insert === "	" && u.attributes && (a = s.findByAttributes(u.attributes)) && a.child) {
      a.render && (o = _e(o), l && o.push(pt), c.push(a.render(u.attributes, o, e, t, n)), o = []);
      return;
    }
    if (typeof u.insert == "string") {
      const d = h[f - 1], p = h[f + 1];
      let m = u.insert.replace(/  /g, "  ").replace(/  /g, "  ");
      (!d || typeof d.insert == "object") && (m = m.replace(/^ /, " ")), (!p || typeof p.insert == "object" || rs(p)) && (m = m.replace(/ $/, " ")), l = !1, g.push(m);
    } else if (u.insert) {
      const d = i.findByAttributes(u.insert);
      d != null && d.render && (g.push(d.render(u.insert, es, e, t, n)), d.name === "br" ? l = !0 : d.noFill || (l = !1));
    }
    u.attributes && Object.keys(u.attributes).sort((d, p) => r.priority(p) - r.priority(d)).forEach((d) => {
      const p = r.get(d);
      if (p != null && p.render) {
        const m = p.render(u.attributes, g, e, t, n);
        m && (Ne.set(m, p), g = [m]);
      }
    }), o.push.apply(o, g);
  }), o = _e(o), l && o.push(pt), c.length ? c : o;
}
function Lt(t, e) {
  return t === e ? !0 : Array.isArray(t) && Array.isArray(e) && t.length === e.length && t.every((n, s) => n === e[s]);
}
function Ie(t, e) {
  let n = mt.get(e.attributes);
  return n || (n = t.typeset.lines.findByAttributes(e.attributes, !0), mt.set(e.attributes, n)), n;
}
function _e(t) {
  const e = [];
  if (t.forEach((n, s) => {
    const r = e.length - 1, i = e[r];
    i && typeof i != "string" && typeof n != "string" && Ne.has(i) && Ne.get(i) === Ne.get(n) && ss(i.props, n.props) ? i.children = i.children.concat(n.children) : i && typeof i == "string" && typeof n == "string" ? e[r] += n : (e.push(n), i && typeof i != "string" && i.children && (i.children = _e(i.children)));
  }), e.length) {
    const n = e[e.length - 1];
    n && typeof n != "string" && n.children && (n.children = _e(n.children));
  }
  return e;
}
function ss(t, e) {
  return Object.keys({ ...t, ...e }).every((n) => n.slice(0, 2) === "on" || t[n] === e[n]);
}
function rs(t) {
  return typeof t.insert == "string" && t.insert[0] === " ";
}
const is = NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT;
function be(t, e) {
  return (t.ownerDocument || document).createTreeWalker(t, is, {
    acceptNode(n) {
      if (n.nodeType === Node.TEXT_NODE && n.nodeValue === "")
        return NodeFilter.FILTER_REJECT;
      if (e) {
        const s = e(n);
        return s ? s === !0 ? NodeFilter.FILTER_ACCEPT : s : NodeFilter.FILTER_REJECT;
      } else
        return NodeFilter.FILTER_ACCEPT;
    }
  });
}
const en = "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video", os = /[\0-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200C\u200E-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB\uE000-\uF8FF]|\uD800[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, cs = { STYLE: !0, SCRIPT: !0, LINK: !0, META: !0, TITLE: !0 }, ls = /[ \t\n\r]+/g, as = {};
function ge(t, e) {
  return e.nodeName !== "BR" ? !1 : us(t, e);
}
function us(t, e) {
  const n = e.closest && e.closest(t.typeset.lines.selector);
  if (!n) return !1;
  const s = be(n);
  s.currentNode = e;
  const r = s.nextNode();
  return !r || r instanceof HTMLElement && r.matches(en);
}
function tn(t, e) {
  return me(document.createElement("div"), Gt(t, e, !0)).innerHTML;
}
function hs(t, e) {
  return me(document.createElement("div"), nt(t, P.create(e), !0)).innerHTML;
}
function Et(t, e, n) {
  return new W(nn(t, e), n);
}
function nn(t, e, n) {
  const r = new window.DOMParser().parseFromString(e, "text/html"), i = pe(t, {
    root: r.body,
    possiblePartial: n == null ? void 0 : n.possiblePartial,
    collapseWhitespace: n == null ? void 0 : n.collapseWhitespace
  });
  return sn(i), i;
}
function fs(t, e) {
  return new W(pe(t, { root: e }));
}
function Ar(t, e) {
  const n = P.fromDelta(pe(t, { root: e }), t.doc.byId);
  return n.length ? t.typeset.lines.findByAttributes(n[0].attributes, !0).renderMultiple ? n : n[0] : void 0;
}
function sn(t) {
  t.ops = t.filter((e) => (typeof e.insert == "string" && (e.insert = e.insert.replace(os, "").replace(/\r\n?/g, `
`)), !!e.insert || !!e.retain || !!e.delete));
}
function pe(t, e = as) {
  const { lines: n, embeds: s } = t.typeset, r = e.root || t.root, i = e.collapseWhitespace != null ? e.collapseWhitespace : !0;
  var o = be(r, (d) => !cs[d.nodeName]);
  const c = new S();
  let l, a = !1, u = !1, f = !0, h, g;
  for (e.startNode ? (o.currentNode = e.startNode, o.previousNode(), e.offset && c.retain(e.offset, void 0)) : o.currentNode = r; (h = o.nextNode()) && h !== e.endNode; )
    if (ge(t, h))
      f = !1;
    else if (h.nodeName === "BR" && h.className === "Apple-interchange-newline")
      c.insert(`
`, !l || l.unknownLine ? {} : l);
    else if (h.nodeType === Node.TEXT_NODE) {
      let d = h.parentNode;
      if (h.nodeValue == null || !h.nodeValue.replace(/\s+/g, "") && (h.parentNode === r || h.previousSibling && n.matches(h.previousSibling) || h.nextSibling && n.matches(h.nextSibling)))
        continue;
      const p = h.nodeValue, b = (i ? p.replace(ls, " ") : p).replace(/\xA0/g, " ");
      if (!b || b === " " && d.classList.contains("EOP")) continue;
      const v = wt(d, r, t);
      f = !1, c.insert(b, v);
    } else if (s.matches(h)) {
      const d = s.findByNode(h);
      if (d) {
        const p = wt(h.parentNode, r, t);
        d.fromDom !== !1 && c.insert(d.fromDom ? d.fromDom(h) : { [d.name]: !0 }, p);
      }
    } else if (n.matches(h) || h.nodeType === Node.ELEMENT_NODE && h.matches(en)) {
      if (u = !n.matches(h), u) {
        let p = h.parentNode;
        for (; p && !n.matches(p) && p !== r; )
          p = p.parentNode;
        if (p && p !== r)
          continue;
      }
      const d = n.findByNode(h, !0);
      if (d === n.default && (!h.parentNode || n.matches(h.parentNode)))
        continue;
      if (d.frozen)
        for (; o.lastChild(); ) ;
      if (g && (c.insert("	", g), g = null), d.child || (a ? (!l || !l.unknownLine || !f) && (c.insert(`
`, !l || l.unknownLine ? {} : l), f = !0) : a = !0), u)
        l = { unknownLine: u };
      else if (d && d !== n.default) {
        const p = d.fromDom ? d.fromDom(h) : { [d.name]: !0 };
        d.child ? g = p : l = p;
      } else
        l = {};
      !d.child && e.includeIds && h.key && (l.id = h.key);
    }
  return (!u || !f) && (a || !e.possiblePartial) && c.insert(`
`, !l || l.unknownLine ? {} : l), c;
}
function wt(t, e, n) {
  const { lines: s, formats: r } = n.typeset, i = {};
  for (; t && !s.matches(t) && t !== e; ) {
    if (r.matches(t)) {
      const o = r.findByNode(t);
      o && o.fromDom !== !1 && (i[o.name] = o.fromDom ? o.fromDom(t) : !0);
    } else t.hasAttribute("style") && r.list.forEach((o) => {
      o.styleSelector && t.matches(o.styleSelector) && (i[o.name] = o.fromDom ? o.fromDom(t) : !0);
    });
    t = t.parentNode;
  }
  return i;
}
const ds = {
  copyPlainText: !0,
  copyHTML: !0
}, At = { text: "", html: "" };
function gs(t, e = ds) {
  function n(i) {
    const { doc: o } = t, c = O(i || o.selection);
    if (!c) return At;
    const l = o.slice(c[0], c[1]);
    if (!l.ops.length) return At;
    const a = l.map((f) => typeof f.insert == "string" ? f.insert : " ").join("");
    let u;
    return a.includes(`
`) ? (l.push({ insert: `
`, attributes: o.getLineFormat(c[1]) }), u = tn(t, new W(l))) : u = hs(t, l), { text: a, html: u };
  }
  function s(i) {
    if (!t.enabled || !t.doc.selection || i.defaultPrevented) return;
    i.preventDefault();
    const o = i.clipboardData;
    if (!o) return;
    const { text: c, html: l } = n();
    e.copyHTML && l && o.setData("text/html", l), e.copyPlainText && c && o.setData("text/plain", c);
  }
  function r(i) {
    s(i), t.delete();
  }
  return {
    commands: {
      getCopy: n
    },
    init() {
      t.root.addEventListener("copy", s), t.root.addEventListener("cut", r);
    },
    destroy() {
      t.root.removeEventListener("copy", s), t.root.removeEventListener("cut", r);
    }
  };
}
var Z = /* @__PURE__ */ ((t) => (t.api = "api", t.user = "user", t.history = "history", t.input = "input", t.paste = "paste", t))(Z || {});
const ps = ms();
function ms(t = {}) {
  return function(e) {
    let n = 0, s = "", r = !1, i = Nt();
    const o = { maxStack: 500, delay: 0, unrecordedSources: /* @__PURE__ */ new Set(), ...t };
    function c(y) {
      y.inputType === "historyUndo" ? (y.preventDefault(), l()) : y.inputType === "historyRedo" && (y.preventDefault(), a());
    }
    function l() {
      d("undo", "redo");
    }
    function a() {
      d("redo", "undo");
    }
    function u() {
      return i.undo.length > 0;
    }
    function f() {
      return i.redo.length > 0;
    }
    function h() {
      n = 0;
    }
    function g() {
      i = Nt();
    }
    function d(y, x) {
      if (i[y].length === 0) return;
      const E = i[y].pop();
      i[x].push(E), h(), r = !0, e.update(E[y], Z.history), r = !1;
    }
    function p(y, x) {
      const E = Date.now(), w = ys(y);
      i.redo.length = 0;
      const T = new J(null, y.delta.invert(x.toDelta()), x.selection);
      if ((!w || s !== w) && h(), s = w, n && (!o.delay || n + o.delay > E) && i.undo.length) {
        const M = i.undo[i.undo.length - 1];
        M.redo.delta = M.redo.delta.compose(y.delta), M.redo.selection = y.selection, M.undo.delta = T.delta.compose(M.undo.delta);
      } else {
        const M = new J(null, y.delta, y.selection);
        n = E, i.undo.push({ redo: M, undo: T });
      }
      i.undo.length > o.maxStack && i.undo.shift();
    }
    function m({ change: y, old: x, source: E }) {
      if (!y) return g();
      if (!r) {
        if (!y.contentChanged) return h();
        E !== Z.api && !o.unrecordedSources.has(E) ? p(y, x) : bs(i, y);
      }
    }
    function b(y) {
      i = y;
    }
    function v() {
      return i;
    }
    return {
      options: o,
      hasUndo: u,
      hasRedo: f,
      undo: l,
      redo: a,
      cutoffHistory: h,
      clearHistory: g,
      setStack: b,
      getStack: v,
      getActive() {
        return { undo: u(), redo: f() };
      },
      commands: {
        undo: l,
        redo: a
      },
      shortcuts: {
        "win:Ctrl+Z": "undo",
        "mac:Cmd+Z": "undo",
        "win:Ctrl+Y": "redo",
        "mac:Cmd+Shift+Z": "redo"
      },
      init() {
        e.on("change", m), e.root.addEventListener("beforeinput", c);
      },
      destroy() {
        e.off("change", m), e.root.removeEventListener("beforeinput", c);
      }
    };
  };
}
function Nt() {
  return {
    undo: [],
    redo: []
  };
}
function bs(t, e) {
  const n = e.ops ? new J(null, e) : e;
  t.undo.forEach((s) => {
    s.undo = n.transform(s.undo, !0), s.redo = n.transform(s.redo, !0);
  }), t.redo.forEach((s) => {
    s.undo = n.transform(s.undo, !0), s.redo = n.transform(s.redo, !0);
  });
}
function ys(t) {
  var r;
  const { ops: e } = t.delta;
  let n = 0, s = e.length - 1;
  if (e[n].retain && !e[n].attributes && n++, e[s].retain === 1 && ((r = e[s].attributes) != null && r.id) && s--, n === s) {
    const i = e[n];
    if (i.delete) return "delete";
    if (i.insert === `
`) return "newline";
    if (typeof i.insert == "string") return "insert";
  }
  return "";
}
const je = [null, 0];
function vs(t, e, n) {
  const s = t.root.ownerDocument;
  if ("caretPositionFromPoint" in s)
    try {
      const r = s.caretPositionFromPoint(e, n);
      if (r)
        return Se(t, r.offsetNode, r.offset);
    } catch {
    }
  if (s.caretRangeFromPoint) {
    const r = s.caretRangeFromPoint(e, n);
    if (r)
      return Se(t, r.startContainer, r.startOffset);
  }
  return null;
}
function Nr(t, e) {
  const { root: n } = t;
  if (!n.ownerDocument) return;
  const s = Array.from(n.querySelectorAll(t.typeset.lines.selector)).filter(
    (i) => i.key
  ), r = s[s.length - 1];
  for (const i of s) {
    const o = i.getBoundingClientRect();
    if (o.bottom >= e || i === r)
      return { line: t.doc.getLineBy(i.key), element: i, rect: o, belowMid: e > o.top + o.height / 2 };
  }
}
function Ls(t, e) {
  e[0] > e[1] && (e = [e[1], e[0]]);
  const [n, s, r, i] = on(t, e), o = t.root.ownerDocument.createRange();
  return n && r && (o.setStart(n, s), o.setEnd(r, i)), o;
}
function xt(t, e) {
  const n = Ls(t, e);
  if ((n == null ? void 0 : n.endContainer.nodeType) === Node.ELEMENT_NODE)
    try {
      n.setEnd(n.endContainer, n.endOffset + 1);
    } catch {
    }
  return n;
}
function Se(t, e, n, s) {
  var o;
  const { root: r } = t, { lines: i } = t.typeset;
  if (!r.contains(e))
    return -1;
  if (e.nodeType === Node.ELEMENT_NODE) {
    if (e.childNodes.length === n) {
      if (Me(r, e) != null) return Me(r, e) - 1;
      e.childNodes.length && (e = e.childNodes[n - 1], n = ws(t, e));
    } else
      e = e.childNodes[n], n = 0;
    const c = V(r, e);
    if (c != null)
      return (o = i.findByNode(e)) != null && o.frozen ? c + n : (s == null || s < c ? c : c - 1) + n;
  }
  return rn(t, e) + n;
}
function rn(t, e) {
  var a;
  const { root: n } = t;
  if (!n.ownerDocument) return -1;
  const { lines: s, embeds: r } = t.typeset, i = be(n);
  i.currentNode = e;
  let o, c = 0, l;
  for (; (o = i.previousNode()) && o !== n; )
    if ((l = V(n, o)) != null) {
      c += l;
      break;
    } else o.nodeType === Node.TEXT_NODE ? c += Re(s, o) : (a = o.classList) != null && a.contains("decoration") || (r.matches(o) && !ge(t, o) || s.matches(o) && !o.contains(e)) && c++;
  return c;
}
function Es(t, e) {
  const { root: n } = t;
  return n.ownerDocument ? Array.from(n.querySelectorAll(t.typeset.lines.selector)).find(
    (r) => V(n, r) <= e && Me(n, r) > e
  ) : void 0;
}
function ws(t, e) {
  var c;
  const { lines: n, embeds: s } = t.typeset;
  if (s.matches(e) && !ge(t, e))
    return 1;
  if (e.nodeType === Node.TEXT_NODE) return Re(n, e);
  const r = be(e);
  let i = n.findByNode(e) ? 1 : 0, o;
  for (; o = r.nextNode(); )
    o.nodeType === Node.TEXT_NODE ? i += Re(n, o) : (c = o.classList) != null && c.contains("decoration") || (s.matches(o) && !ge(t, o) || n.matches(o)) && i++;
  return i;
}
function on(t, e) {
  if (e == null)
    return [null, 0, null, 0];
  {
    const n = e[0] <= e[1], s = n ? 1 : -1, r = e[0] === e[1], [i, o, c] = Tt(t, e[0], n ? 0 : 1), [l, a] = r && !c ? [i, o] : c && (r || e[1] - e[0] === s * t.doc.getLineAt(e[0]).length) ? [i, o + (n ? 1 : -1)] : Tt(t, e[1], n ? 1 : 0);
    return [i, o, l, a];
  }
}
function Tt(t, e, n) {
  var g;
  const { root: s } = t;
  if (!s.ownerDocument) return je;
  const { lines: r, embeds: i } = t.typeset, o = Array.from(s.childNodes), c = Es(t, e);
  if (!c) return je;
  if (r.findByNode(c, !0).frozen)
    return [c.parentNode, o.indexOf(c) + n, !0];
  e -= V(s, c);
  const a = !e, u = be(c);
  let f, h = !1;
  for (; f = u.nextNode(); )
    if (f.nodeType === Node.TEXT_NODE) {
      const d = Re(r, f);
      if (e <= d) return [f, e];
      e -= d;
    } else if (!((g = f.classList) != null && g.contains("decoration"))) {
      if (i.matches(f) && !ge(t, f)) {
        const d = i.findByNode(f);
        if (!d || d.fromDom === !1)
          continue;
        if (e -= 1, e <= 0) {
          const p = Array.from(f.parentNode.childNodes);
          return [f.parentNode, p.indexOf(f) + 1 + e];
        }
      } else if (r.matches(f) && (h ? e -= 1 : h = !0, e === 0)) {
        const d = u.firstChild();
        if (d && d.nodeType === Node.TEXT_NODE)
          return [d, 0];
        if (d) {
          const p = Array.from(f.childNodes);
          return [f, p.indexOf(d)];
        } else
          return [f, 0];
      }
    }
  return a ? [c, 0] : je;
}
function Re(t, e) {
  const n = e.nodeValue || "";
  return n.trim() || !(t.matches(e.previousSibling) || t.matches(e.nextSibling)) ? n.length : 0;
}
function cn(t) {
  var i;
  const { root: e } = t, n = t.doc.selection;
  if (!e.ownerDocument) return null;
  const s = e.ownerDocument.getSelection(), { lines: r } = t.typeset;
  if (s == null || s.anchorNode == null || s.focusNode == null || !e.contains(s.anchorNode))
    return null;
  {
    const o = Se(
      t,
      s.anchorNode,
      s.anchorOffset,
      n && n[0]
    ), c = s.anchorNode === s.focusNode && s.anchorOffset === s.focusOffset, l = r.findByAttributes((i = t.doc.getLineAt(o)) == null ? void 0 : i.attributes, !0).frozen;
    let a = c ? o : Se(
      t,
      s.focusNode,
      s.focusOffset,
      !l && n ? n[1] : null
    );
    return [o, a];
  }
}
function xe(t, e) {
  const { root: n } = t;
  if (!n.ownerDocument) return;
  const s = n.ownerDocument.getSelection();
  if (!s) return;
  const r = s.anchorNode && n.contains(s.anchorNode) && document.activeElement !== document.body;
  if (e == null)
    r && (s.removeAllRanges(), n.classList.contains("focus") && n.classList.remove("focus"));
  else {
    const [i, o, c, l] = on(t, e), a = e[0] === e[1] ? "Caret" : "Range";
    i && c && (s.anchorNode !== i || s.anchorOffset !== o || s.focusNode !== c || s.focusOffset !== l || s.type !== a) && s.setBaseAndExtent(i, o, c, l), r || n.focus(), n.classList.contains("focus") || n.classList.add("focus");
  }
  n.dispatchEvent(new Event("select", { bubbles: !0 }));
}
const As = navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform), Ns = As || /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, Ft = !Ns && /Mobi|Android/.test(navigator.userAgent) && !window.MSStream, xs = {
  characterData: !0,
  characterDataOldValue: !0,
  subtree: !0,
  childList: !0
};
function Ts(t) {
  let e = !1, n = !1, s = [];
  function r(p) {
    n = !0;
  }
  function i(p) {
    n = !1, s.length && (l(s), s = []);
  }
  function o() {
    if (n) return;
    const p = f.takeRecords();
    p.length && l(p);
  }
  function c(p) {
    let m = !1;
    const b = p.ops[p.ops.length - 1];
    return b != null && b.insert && b.insert.br && (m = !0), m;
  }
  function l(p) {
    if (n) {
      s.push(...p);
      return;
    }
    if (!t.enabled)
      return t.render();
    let m = a(p), b = cn(t);
    if (!m) {
      const v = ks(t.root, p);
      m = u(v);
    }
    if (e && (c(m) && (m.ops.pop(), m.insert(`
`)), b !== null && (b[0]++, b[1]++), e = !1), m && m.ops.length) {
      sn(m);
      const v = t.doc;
      t.update(new J(t.doc, m, b, t.activeFormats), Z.input), t.doc.lines === v.lines && t.render();
    }
  }
  function a(p) {
    const m = Fs(p);
    if (!m || m.oldValue == null || m.target.nodeValue == null) return null;
    const b = new S(), v = rn(t, m.target);
    b.retain(v);
    let y;
    return t.doc.selection && (y = O(t.doc.selection)[0] - v, y < 0 && (y = 0)), q(
      m.oldValue.replace(/\xA0/g, " "),
      m.target.nodeValue.replace(/\xA0/g, " "),
      y
    ).forEach(([E, w]) => {
      E === q.EQUAL ? b.retain(w.length) : E === q.DELETE ? b.delete(w.length) : E === q.INSERT && b.insert(w, t.activeFormats);
    }), b.chop(), b;
  }
  function u(p) {
    const { doc: m } = t;
    if (p) {
      const [b, v] = p, y = V(t.root, b), x = Me(t.root, v), E = pe(t, {
        startNode: b,
        endNode: v.nextElementSibling || void 0,
        collapseWhitespace: !1
      });
      let w = m.toDelta().slice(y, x).diff(E);
      return w.ops.length && y && (w = new S().retain(y).concat(w)), w;
    } else {
      const b = pe(t, { collapseWhitespace: !1 });
      return m.toDelta().diff(b);
    }
  }
  const f = new window.MutationObserver(l);
  function h() {
    f.disconnect();
  }
  function g() {
    f.observe(t.root, xs);
  }
  function d(p) {
    var m;
    p.data && ((m = p.data) != null && m.includes(`
`)) && (e = !0);
  }
  return {
    allowComposition(p = !0) {
      p ? (t.root.addEventListener("compositionstart", r), t.root.addEventListener("compositionend", i)) : (t.root.removeEventListener("compositionstart", r), t.root.removeEventListener("compositionend", i));
    },
    init() {
      t.root.addEventListener("input", o), t.on("rendering", h), t.on("render", g), Ft && t.root.addEventListener("beforeinput", d);
    },
    destroy() {
      f.disconnect(), t.root.removeEventListener("input", o), t.root.removeEventListener("compositionstart", r), t.root.removeEventListener("compositionend", i), t.off("rendering", h), t.off("render", g), Ft && t.root.removeEventListener("beforeinput", d);
    }
  };
}
function Fs(t) {
  const e = /* @__PURE__ */ new Set();
  if (t = t.filter((o) => o.type !== "characterData" ? !0 : e.has(o.target) ? !1 : (e.add(o.target), !0)), t.length > 3) return null;
  const n = t.find((o) => o.type === "characterData");
  if (!n) return null;
  const s = t.find((o) => o.addedNodes.length === 1 && o.addedNodes[0].nodeName === "#text"), r = t.find((o) => o.addedNodes.length === 1 && o.addedNodes[0].nodeName === "BR" || o.removedNodes.length === 1 && o.removedNodes[0].nodeName === "BR");
  return 1 + (s ? 1 : 0) + (r ? 1 : 0) < t.length || s && s.addedNodes[0] !== n.target ? null : n;
}
function ks(t, e) {
  let n, s;
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (i.target === t) return;
    const o = Ms(t, i.target);
    if (o && o.key)
      (!n || V(t, o) < V(t, n)) && (n = o), (!s || V(t, o) > V(t, s)) && (s = o);
    else
      return;
  }
  if (n && s) return [n, s];
}
function Ms(t, e) {
  for (; e && e.parentNode !== t; ) e = e.parentNode;
  return e;
}
const Is = {
  Control: !0,
  Meta: !0,
  Shift: !0,
  Alt: !0
}, Oe = navigator.userAgent.indexOf("Macintosh") !== -1, ln = Oe ? /Cmd/ : /Ctrl/;
class st extends KeyboardEvent {
  constructor(n, s) {
    super(n, s);
    L(this, "shortcut");
    L(this, "osShortcut");
    L(this, "modShortcut");
    this.shortcut = (s == null ? void 0 : s.shortcut) || "", this.osShortcut = `${Oe ? "mac" : "win"}:${this.shortcut}`, this.modShortcut = this.shortcut.replace(ln, "Mod");
  }
  static fromKeyboardEvent(n) {
    return n.shortcut = an(n), new st("shortcut", n);
  }
}
function _s(t) {
  return t.shortcut = an(t), t.osShortcut = `${Oe ? "mac" : "win"}:${t.shortcut}`, t.modShortcut = t.shortcut.replace(ln, "Mod"), t;
}
function an(t) {
  const e = [];
  let n = t.key;
  return n ? (n === " " && (n = "Space"), t.metaKey && e.push("Cmd"), t.ctrlKey && e.push("Ctrl"), t.altKey && e.push("Alt"), t.shiftKey && e.push("Shift"), Is[n] || (Oe && t.altKey && t.code && t.code.startsWith("Key") && (n = t.code.replace("Key", "")), n.length === 1 && (n = n.toUpperCase()), e.push(n)), e.join("+")) : "";
}
const ve = {}, Ss = window.chrome && typeof window.chrome == "object";
function Rs(t) {
  function e(u) {
    if (u.defaultPrevented) return;
    if (t.doc.selection) {
      const { lines: Y } = t.typeset, N = t.doc.getLinesAt(t.doc.selection);
      if (N.length) {
        const A = Y.findByAttributes(N[0].attributes);
        if (A != null && A.onEnter && N.every((F) => A === Y.findByAttributes(F.attributes))) {
          u.preventDefault(), A.onEnter(t);
          return;
        }
      }
    }
    const {
      typeset: { lines: f },
      doc: h
    } = t;
    let { selection: g } = h;
    if (!g) return;
    u.preventDefault();
    const [d, p] = g, m = d === p, b = h.getLineAt(g[0]), [v, y] = h.getLineRange(g[0]);
    let { id: x, ...E } = b.attributes, w;
    const T = f.findByAttributes(E, !0), M = p === v, G = p === y - 1;
    if (m && a(b)) {
      const Y = T.onEmptyEnter && T.onEmptyEnter(t, b), N = !T.onEmptyEnter && T !== f.default && !T.contained && !T.defaultFollows && !T.frozen;
      if ((Y || N) && o(f, h.getLineAt(d)))
        return;
    }
    d === v && p === y && T.frozen ? (d === 0 ? (w = { dontFixNewline: !0 }, g = [d, d]) : p === h.length ? g = [p - 1, p - 1] : (w = { dontFixNewline: !0 }, g = [p, p]), E = T.nextLineAttributes ? T.nextLineAttributes(E) : ve) : G && (T.nextLineAttributes || T.defaultFollows || T.frozen) ? E = T.nextLineAttributes ? T.nextLineAttributes(E) : ve : M && !G && (T.defaultFollows && (E = ve), w = { dontFixNewline: !0 }), t.insert(`
`, E, g, w), d === v && p === y && T.frozen && t.select(d === 0 ? 0 : p);
  }
  function n(u) {
    if (u.defaultPrevented) return;
    const { typeset: f, doc: h } = t;
    if (!f.embeds.get("br")) return e(u);
    h.selection && (u.preventDefault(), t.insert({ br: !0 }));
  }
  function s(u) {
    i(u, -1);
  }
  function r(u) {
    i(u, 1);
  }
  function i(u, f) {
    if (u.defaultPrevented) return;
    const {
      typeset: { lines: h },
      doc: g
    } = t, { selection: d } = g;
    if (!d) return;
    const [p, m] = d, b = p === m, [v, y] = g.getLineRange(p);
    if (!(b && (!Ss || u.ctrlKey || u.altKey || u.metaKey) && (f === -1 && p !== v || f === 1 && p !== y - 1)))
      if (u.preventDefault(), f === -1 && d[0] + d[1] === 0)
        o(h, g.getLineAt(p), !0);
      else {
        const x = O(d), E = g.getLineAt(x[0]), w = h.findByAttributes(E.attributes, !0);
        if (b && (f === -1 && p === v || f === 1 && p === y - 1) && !w.contained) {
          const M = g.lines[g.lines.indexOf(E) + f], [G, Y] = f === 1 ? [E, M] : [M, E];
          if (G && a(G) && Y && !a(Y))
            return t.update(
              t.change.delete([x[0] + f, x[0]], { dontFixNewline: !0 }),
              Z.input
            );
        }
        t.delete(f, { dontFixNewline: w.frozen });
      }
  }
  function o(u, f, h) {
    if (!f) return;
    const g = u.findByAttributes(f.attributes, !0);
    if (g) {
      if (g.indentable && f.attributes.indent)
        return t.outdent(), !0;
      if (h || g !== u.default && !g.defaultFollows)
        return t.formatLine(ve), !0;
    }
  }
  function c(u) {
    if (u.defaultPrevented) return;
    if (t.doc.selection) {
      const { lines: h } = t.typeset, g = t.doc.getLinesAt(t.doc.selection);
      if (g.length) {
        const d = h.findByAttributes(g[0].attributes);
        if (d != null && d.onTab && g.every((p) => d === h.findByAttributes(p.attributes))) {
          u.preventDefault(), d.onTab(t, u.shiftKey);
          return;
        }
      }
    }
    u.preventDefault();
    const f = u.modShortcut;
    f === "Tab" || f === "Mod+]" ? t.indent() : t.outdent();
  }
  function l(u) {
    var h;
    if (u.isComposing) return;
    _s(u);
    const f = (g) => {
      const d = g && t.shortcuts[g];
      if (d && t.commands[d])
        return u.preventDefault(), t.commands[d]() !== !1;
    };
    if (!t.root.dispatchEvent(st.fromKeyboardEvent(u)) || f(u.shortcut) || f(u.osShortcut) || f(u.modShortcut)) {
      u.preventDefault();
      return;
    }
    switch (u.modShortcut) {
      case "Enter":
        return e(u);
      case "Shift+Enter":
        return n(u);
      case "Tab":
      case "Shift+Tab":
        return c(u);
    }
    switch ((h = u.modShortcut) == null ? void 0 : h.split("+").pop()) {
      case "Backspace":
        return s(u);
      case "Delete":
        return r(u);
      default:
        return;
    }
  }
  function a(u) {
    var f;
    return u.length === 1 && !((f = t.typeset.lines.findByAttributes(u.attributes)) != null && f.frozen);
  }
  return {
    init() {
      t.root.addEventListener("keydown", l);
    },
    destroy() {
      t.root.removeEventListener("keydown", l);
    }
  };
}
const Ds = { dontFixNewline: !0 }, kt = { excludeProps: /* @__PURE__ */ new Set(["id"]) };
class Os extends Event {
  constructor(n, s) {
    super(n, s);
    L(this, "delta");
    L(this, "html");
    L(this, "text");
    this.delta = s.delta, this.html = s.html, this.text = s.text;
  }
}
function Cs(t, e) {
  const n = (e == null ? void 0 : e.allowHTMLPaste) ?? !0;
  function s({ selection: i, text: o, html: c }) {
    const { doc: l } = t;
    if (i = i || l.selection, i = i && O(i), !i) return;
    const [a, u] = i;
    let f;
    if (c)
      e != null && e.htmlParser ? f = e.htmlParser(t, c) : f = nn(t, c, { possiblePartial: !0 });
    else {
      if (!o) return;
      f = new S().insert(o.replace(/\xA0/g, " ").replace(/\r\n/g, `
`));
    }
    const h = f.filter((p) => typeof p.insert == "string" && p.insert.includes(`
`)).length > 0;
    let g = f.length();
    if (h) {
      let p = P.fromDelta(f, l.byId);
      f = P.toDelta(p), g = f.length();
      const m = l.getLineAt(a), b = l.getLineAt(u), v = Le(m), y = m === b ? v : Le(b);
      c || (p = p.map((Y) => ({ ...Y, attributes: m.attributes })), v !== y && (p[p.length - 1].attributes = b.attributes));
      const x = p[0], E = Le(x), w = p[p.length - 1], T = x === w ? E : Le(w);
      a !== l.getLineRange(m)[0] && !k(v, E, kt) && (f = new S().insert(`
`, v).concat(f), g++);
      const M = f.ops[f.ops.length - 1].insert, G = typeof M == "string" && M.endsWith(`
`);
      G && u !== l.getLineRange(b)[1] && k(y, T, kt) ? f = f.slice(0, --g) : G && u === l.getLineRange(b)[1] - 1 && (f.delete(1), g--);
    }
    const d = new Os("paste", { delta: f, html: c, text: o, cancelable: !0 });
    if (t.dispatchEvent(d), f = d.delta, !d.defaultPrevented)
      if (f && f.ops.length) {
        const p = t.change.delete(i, h ? Ds : void 0);
        p.insertContent(a, f).select(a + g), t.update(p, Z.paste);
      } else a !== u && t.delete([a, u]);
  }
  function r(i) {
    if (!t.enabled || !t.doc.selection || i.defaultPrevented) return;
    i.preventDefault();
    const o = i.clipboardData, { doc: c } = t;
    if (!o || !c.selection) return;
    const l = n ? o.getData("text/html") : void 0, a = o.getData("text/plain");
    s({ text: a, html: l });
  }
  return {
    commands: {
      paste: s
    },
    init() {
      t.root.addEventListener("paste", r);
    },
    destroy() {
      t.root.removeEventListener("paste", r);
    }
  };
}
function Le(t) {
  const { id: e, ...n } = t.attributes;
  return n;
}
function xr(t, e) {
  return (n) => {
    function s({ doc: r }) {
      var f, h, g;
      const i = n.modules.decorations.getDecorator("placeholder"), o = (typeof t == "function" ? t() : t) || "";
      let c;
      if (i.hasDecorations()) {
        const d = i.getDecoration().ops;
        c = (h = (f = d[d.length - 1].attributes) == null ? void 0 : f.decoration) == null ? void 0 : h.placeholder;
      }
      const { lines: l } = n.typeset, a = l.findByAttributes((g = r.lines[0]) == null ? void 0 : g.attributes, !0), u = l.default === a && r.length === 1;
      if (u || e != null && e.keepAttribute) {
        const d = { "data-placeholder": o || "" };
        u && (d.class = "placeholder"), k(d, c) || (i.remove(), i.decorateLine(0, d).apply());
      } else
        i.remove();
    }
    return n.addEventListener("decorate", s), {
      destroy() {
        n.removeEventListener("decorate", s);
      }
    };
  };
}
function Bs(t) {
  t.on("change", n);
  function e(s) {
    if (s) {
      const { doc: r, old: i } = s;
      i && r ? vt(t, i, r) : r && Ge(t, r);
    } else {
      const { doc: r } = t.modules.decorations || t;
      Ge(t, r);
    }
  }
  function n(s) {
    const { doc: r, old: i } = t.modules.decorations || s;
    i.lines !== r.lines && vt(t, i, r);
  }
  return {
    render: e,
    destroy() {
      t.off("change", n);
    }
  };
}
function Ps(t) {
  let e, n, s = !1;
  function r() {
    if (!t.enabled) return;
    const h = cn(t), g = (h == null ? void 0 : h.slice()) || null;
    if (!h && s) return;
    if (s && (s = !1), h) {
      h[0] === h[1] && h[0] === t.doc.length && h[0]--;
      let p = t.doc.getLineAt(h[0]), m = t.typeset.lines.findByAttributes(p.attributes, !0);
      h && h[0] === h[1] && t.doc.selection && t.doc.selection[0] === h[0] && t.doc.selection[1] === h[0] + 1 && (m.frozen && (h[0]--, h[1]--), p = t.doc.getLineAt(h[0]), m = t.typeset.lines.findByAttributes(p.attributes, !0)), m.frozen && h[0] === h[1] && h[1]++;
    }
    const { doc: d } = t;
    if (k(d.selection, h))
      k(g, h) || xe(t, h);
    else {
      if (h && h[0] === h[1] && h[0] >= d.length)
        return;
      t.select(h);
    }
  }
  function i() {
    s || !t.enabled || xe(t, t.doc.selection);
  }
  function o() {
    const {
      doc: h,
      typeset: { lines: g }
    } = t, d = t.modules.decorations.getDecorator("selection");
    d.clear();
    const p = h.selection;
    p && h.getLinesAt(p).forEach((m) => {
      if (g.findByAttributes(m.attributes, !0).frozen) {
        const b = k(p, h.getLineRange(m));
        d.decorateLine(h.getLineRange(m)[0], { class: "selected" + (b ? " focus" : "") });
      }
    }), d.apply();
  }
  function c(h) {
    let g = h.target;
    for (; g.parentNode && g.parentNode !== t.root; ) g = g.parentNode;
    const d = V(t.root, g), p = d != null && t.doc.getLineAt(d), m = p && t.typeset.lines.findByAttributes(p.attributes);
    d != null && p && m && m.frozen && (h.preventDefault(), t.select([d, d + p.length]));
  }
  function l(h) {
    var d;
    const g = ((d = h.doc) == null ? void 0 : d.selection) || t.doc.selection;
    xe(t, g);
  }
  function a() {
    t.root.classList.toggle("window-inactive", !e.hasFocus());
  }
  function u() {
    var d;
    s = !0;
    const { selection: h } = t.doc;
    (d = e.getSelection()) == null || d.empty();
    const { decorations: g } = t.modules;
    h && h[0] !== h[1] && g && g.getDecorator("pausedSelection").decorateText(h, { class: "selected" }).apply();
  }
  function f() {
    s = !1;
    const { decorations: h } = t.modules;
    h && h.removeDecorations("pausedSelection"), setTimeout(i);
  }
  return {
    pause: u,
    resume: f,
    renderSelection: i,
    init() {
      e = t.root.ownerDocument, n = e.defaultView, e.addEventListener("selectionchange", r), n.addEventListener("focus", a), n.addEventListener("blur", a), t.root.addEventListener("mousedown", c), t.on("change", l), t.on("decorate", o);
    },
    destroy() {
      e.removeEventListener("selectionchange", r), n.removeEventListener("focus", a), n.removeEventListener("blur", a), t.root.removeEventListener("mousedown", c), t.off("change", l), t.off("decorate", o), s = !1, e = null, n = null;
    }
  };
}
const js = /(https?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, zs = /(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, $s = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.(com|org|net|io)\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, Hs = [
  [/^(#{1,6}) $/, (t) => ({ header: t.length })],
  [/^\* $/, (t, { indent: e }) => ({ list: "bullet", indent: e })],
  [/^- $/, (t, { indent: e }) => ({ list: "bullet", type: "dash", indent: e })],
  // set the type to dash to allow for styling in-app (e.g. `list-style-type: "- ";`)
  [/^1\. $/, (t, { indent: e }) => ({ list: "ordered", indent: e })],
  [/^([AaIi])\. $/, (t, { indent: e }) => ({ list: "ordered", type: t, indent: e })],
  [/^(-?\d+)\. $/, (t, { indent: e }) => ({ list: "ordered", start: t, indent: e })],
  // Use /^(-?\d+)\. $/ to support lists starting at something other than 1.
  [
    /^([A-Z])\. $/,
    (t, { indent: e }) => ({
      list: "ordered",
      type: "A",
      indent: e,
      start: t === "A" ? void 0 : t.charCodeAt(0) - 65 + 1
    })
  ],
  [
    /^([a-z])\. $/,
    (t, { indent: e }) => ({
      list: "ordered",
      type: "a",
      indent: e,
      start: t === "a" ? void 0 : t.charCodeAt(0) - 97 + 1
    })
  ],
  [
    /^([IVXLCDM]+)\. $/i,
    (t, { indent: e }) => ({
      list: "ordered",
      type: t[0].toUpperCase() === t[0] ? "I" : "i",
      indent: e,
      start: t.toUpperCase() === "I" ? void 0 : Ks(t)
    })
  ],
  [/^> $/, () => ({ blockquote: !0 })]
], Ws = [
  [/(\*|_){3}(\b(?:(?!\1).)+\b)\1{3}((?:(?!\1).))$/s, () => ({ bold: !0, italic: !0 })],
  [/(\*|_){2}(\b(?:(?!\1).)+\b)\1{2}((?:(?!\1).))$/s, () => ({ bold: !0 })],
  [/(\*|_){1}(\b(?:(?!\1).)+\b)\1{1}((?:(?!\1).))$/s, () => ({ italic: !0 })]
], Us = [
  [js, (t) => ({ link: t })],
  [zs, (t) => ({ link: "https://" + t })],
  [$s, (t) => ({ link: "https://" + t })]
], Ys = [
  [/--$/, () => "—"],
  [/(\S - \S)$/, (t) => t.replace("-", "–")],
  [/\.\.\.$/, () => "…"]
];
function Qs(t, e, n) {
  return Hs.some(([s, r]) => {
    const i = n.match(s);
    if (i) {
      const o = r(i[1], t.doc.getLineFormat(e));
      if (!t.typeset.lines.findByAttributes(o))
        return !1;
      const c = e - n.length, l = t.change.delete([c, e]).formatLine(e, o).select([c, c]);
      return t.update(l), !0;
    } else
      return !1;
  });
}
function Xs(t, e, n) {
  return Us.some(([s, r]) => {
    const i = n.match(s);
    if (i) {
      let o = i[0].slice(0, -1);
      o[o.length - 1] === "." && (o = o.slice(0, -1));
      const c = e - (i[0].length - o.length), l = r(o, t.doc.getTextFormat(e));
      return t.typeset.formats.findByAttributes(l) ? (t.formatText(l, [c - o.length, c]), !0) : !1;
    } else
      return !1;
  });
}
function Tr(t, e, n, s) {
  return Ws.some(([r, i]) => {
    const o = n.match(r);
    if (o) {
      let [c, l, a, u] = o;
      const f = i(a, t.doc.getTextFormat(e));
      if (!t.typeset.formats.findByAttributes(f))
        return !1;
      e - (c.length - a.length) + u.length, u === " " && s[e] === " " && (u = "");
      const h = e - u.length;
      return t.insert(a, f, [h - c.length + u.length, h]), !0;
    } else
      return !1;
  });
}
function Zs(t, e, n) {
  return Ys.some(([s, r]) => {
    const i = n.match(s);
    return i ? (t.insert(r(i[1]), void 0, [e - i[0].length, e]), !0) : !1;
  });
}
const Js = [Qs, Zs, Xs];
function Fr(t = Js) {
  return (e) => {
    let n = !1;
    function s({ change: r, source: i }) {
      if (n || i === "api" || !e.doc.selection || !r || !Gs(r.delta)) return;
      const o = e.doc.selection[1], c = e.doc.getText(), l = c.lastIndexOf(`
`, o - 2) + 1, a = c.slice(l, o);
      n = !0, t.some((u) => u(e, o, a, c)), n = !1;
    }
    return e.on("changed", s), {
      destroy() {
        e.off("changed", s);
      }
    };
  };
}
function Gs(t) {
  return (t.ops.length === 1 || t.ops.length === 2 && t.ops[0].retain && !t.ops[0].attributes) && t.ops[t.ops.length - 1].insert;
}
const Mt = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1e3
};
function Ks(t) {
  t = t.toUpperCase();
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = Mt[t[n]], r = Mt[t[n + 1]];
    if (s === void 0) return;
    s < r ? (e += r - s, n++) : e += s;
  }
  return e;
}
const qs = /['"]/g, Vs = /[\s\{\[\(\<'"\u2018\u201C]/, It = {
  '"': { left: "“", right: "”" },
  "'": { left: "‘", right: "’" }
};
function kr(t) {
  function e(n) {
    const { change: s, source: r, doc: i, old: o } = n;
    if (r === "api" || !o.selection || !s) return;
    const c = er(s.delta.ops);
    if (!c.length) return;
    const l = i.getText(), a = new S();
    let u = 0;
    for (let f = 0; f < c.length; f++) {
      const [h, g] = c[f], d = l[h], p = !h || Vs.test(l[h - 1]) ? It[d].left : It[d].right;
      a.retain(h - u).delete(1).insert(p, g), u = h + 1;
    }
    n.modify(a);
  }
  return t.on("changing", e), {
    destroy() {
      t.off("changing", e);
    }
  };
}
function er(t) {
  const e = [];
  let n = 0;
  return t.forEach((s) => {
    if (s.retain) n += s.retain;
    else if (typeof s.insert == "string") {
      let r;
      for (; r = qs.exec(s.insert); )
        e.push([n + r.index, s.attributes]);
      n += s.insert.length;
    } else s.insert && (n += 1);
  }), e;
}
function Mr(t) {
  let e = 0, n = [], s = [], r = nr(t.root), i, o = 0, c = 40, l, a = null, u = null, f, h = !1, g = !0;
  r.addEventListener("scroll", G, { passive: !0 }), t.on("change", Y);
  const d = ir(r, (N, A, F) => {
    o = A, F & un && (n = []), m();
  });
  function p(N) {
    if (!N || !l) {
      const { doc: A } = t.modules.decorations || t;
      l = ie(t, A.lines).combined, h = !0, a = A.selection, m();
    } else {
      const { doc: A, old: F } = N, R = N.selection || null, B = R && or(R, l).sort((Q, I) => Q - I);
      if (k(B, u) || (h = h || !M(B), u = B), F && A) {
        const Q = ie(t, A.lines).combined, [I, j] = Vt(l, Q);
        if (I[0] + I[1] + j[0] + j[1] > 0) {
          h = !0;
          const te = I[1] - I[0], X = j[1] - j[0];
          if (te < X) {
            const Ce = new Array(X - te).fill(void 0);
            n.splice(I[1], 0, ...Ce);
          } else te > X && n.splice(I[0], te - X);
        }
        l = Q;
      } else A && (l = ie(t, A.lines).combined, h = !0);
      a = R, h && m();
    }
  }
  function m() {
    if (g = !1, !l) return;
    const { scrollTop: N } = r;
    i = x();
    const A = e, F = n.slice();
    let R = !1, B = 0;
    for (; b() && B++ < 20; )
      R = !0, h = !1, v(), y();
    if (B >= 20 && console.error("Updated virtual max times"), xe(t, a), !!R && e < A) {
      let Q = 0, I = 0, j = f.indexOf(e);
      for (let X = e; X < A; X++) {
        const Ce = X - e + j;
        s[Ce] && (Q += w(X, F), I += w(X));
      }
      const te = I - Q;
      r.scrollTo(0, N + te);
    }
  }
  function b() {
    const { scrollTop: N } = r, A = /* @__PURE__ */ new Set([0, l.length - 1, ...u || []]);
    let F = 0, R = i, B = 0;
    for (; F < l.length; ) {
      const I = w(F);
      if (R + I > N) {
        B = F;
        break;
      }
      R += I, F += 1;
    }
    for (; F < l.length && (A.add(F), R += w(F), F += 1, !(R > N + o)); )
      ;
    Math.min(F, l.length - 1);
    const Q = Array.from(A).sort((I, j) => I - j);
    return k(Q, f) ? h : (e = B, f = Q, !0);
  }
  function v() {
    const N = [], A = new Set(f);
    let F = "", R = 0, B = 0, Q = 0;
    for (let I = 0, j = 0; I < l.length; I++) {
      if (A.has(I)) {
        if (j) {
          B = T(I, -1), j -= R;
          const X = _("div", {
            class: "-spacer-",
            "data-key": F,
            style: `height:${j}px;margin-top:${R}px;margin-bottom:${B}px;`,
            key: F
          });
          F = "", N.push(X);
        }
        j = 0;
        const te = qt(t, l[I]);
        N.push(te);
      } else
        I === 1 ? F = "spacer-start" : I === l.length - 2 ? F = "spacer-end" : !F && u && I > u[1] ? F = "spacer-selection-end" : !F && u && I > u[0] && (F = "spacer-selection-start"), j || (R = T(I, -1)), j += w(I);
      Q += w(I);
    }
    t.dispatchEvent(new Event("rendering")), me(t.root, N), tt(t), t.dispatchEvent(new Event("render")), t.dispatchEvent(new Event("rendered"));
  }
  function y() {
    s = Array.from(t.root.children).filter((A) => A.className !== "-spacer-");
    for (let A = 0; A < s.length; A++) {
      const F = f[A];
      n[F] = E(s[A]);
    }
    if (!s.length) return;
    const N = n.filter(Boolean);
    c = Math.round(
      T(0, -1, N) + N.reduce((A, F, R, B) => A + w(R, B), 0) / N.length
    );
  }
  function x() {
    const { scrollTop: N } = r, { root: A } = t;
    return r === A ? parseInt(getComputedStyle(A).paddingTop) : A.getBoundingClientRect().top + parseInt(getComputedStyle(A).paddingTop) + N - r.getBoundingClientRect().top;
  }
  function E(N) {
    const A = getComputedStyle(N);
    return [parseInt(A.marginTop), N.offsetHeight, parseInt(A.marginBottom)];
  }
  function w(N, A = n) {
    return A[N] ? (N === 0 ? T(N, -1, A) : 0) + A[N][1] + T(N, 1, A) : c;
  }
  function T(N, A, F = n) {
    return Math.max(F[N] && F[N][2] || 0, F[N + A] && F[N + A][0] || 0);
  }
  function M(N, A) {
    if (!N) return !1;
    let [F, R] = N;
    return R++, f.some((B) => B >= F && B < R);
  }
  function G() {
    g || (requestAnimationFrame(m), g = !0);
  }
  function Y(N) {
    const { old: A, doc: F } = t.modules.decorations || N, R = N.doc.selection;
    p({ old: A, doc: F, selection: R });
  }
  return {
    render: p,
    init() {
      t.modules.decorations && t.modules.decorations.gatherDecorations(), p();
    },
    destroy() {
      d(), r.removeEventListener("scroll", G), t.off("change", Y);
    }
  };
}
const tr = /auto|scroll/;
function nr(t) {
  for (; t && t !== t.ownerDocument.scrollingElement; ) {
    if (tr.test(getComputedStyle(t).overflowY)) return t;
    t = t.parentNode;
  }
  return t;
}
const un = 1, sr = 2, rr = 3;
function ir(t, e) {
  let n = t.offsetWidth, s = t.offsetHeight;
  if (e(n, s, rr), typeof window.ResizeObserver < "u") {
    const i = new window.ResizeObserver(r);
    return i.observe(t), () => i.disconnect();
  } else {
    const i = t.ownerDocument.defaultView;
    return i.addEventListener("resize", r), () => i.removeEventListener("resize", r);
  }
  function r() {
    const { offsetWidth: i, offsetHeight: o } = t, c = (n !== i ? un : 0) | (s !== o ? sr : 0);
    c && (n = i, s = o, e(n, s, c));
  }
}
function or([t, e], n) {
  let s = 0, r = 0;
  for (let i = 0, o = 0; i < n.length; i++) {
    const c = n[i], l = Array.isArray(c) ? c.reduce((a, u) => a + u.length, 0) : c.length;
    if (t >= o && t < o + l && (s = i), e >= o && e < o + l) {
      r = i;
      break;
    }
    o += l;
  }
  return [s, r];
}
const cr = { keyboard: Rs, input: Ts, copy: gs, paste: Cs, history: ps, decorations: qn, rendering: Bs, selection: Ps };
function Te() {
}
const lr = Symbol(), ne = Symbol() in window ? window == null ? void 0 : window[Symbol()] : {
  context: null,
  subscriberQueue: /* @__PURE__ */ new Map()
};
function ar(t, e = Te) {
  const { get: n, subscribe: s } = hn(t, e);
  return { get: n, subscribe: s };
}
function hn(t, e = Te) {
  let n, s = !1;
  const r = /* @__PURE__ */ new Map();
  o[lr] = r;
  function i() {
    if (ne.context) {
      const { subscriber: a, unsubscribes: u, invalidate: f } = ne.context, h = l(a, f);
      u.add(h);
    }
    if (!r.size && !s) {
      s = !0;
      try {
        (e(o, c) || Te)();
      } finally {
        s = !1;
      }
    }
    return t;
  }
  function o(a) {
    t !== a && (t = a, n && ur(() => {
      r.forEach(([, u], f) => {
        ne.subscriberQueue.has(f) || (ne.subscriberQueue.set(f, t), u && u());
      });
    }));
  }
  function c(a) {
    o(a(t));
  }
  function l(a, u) {
    var h;
    let f = (h = r.get(a)) == null ? void 0 : h[0];
    return f || (f = () => {
      r.delete(a), r.size === 0 && (n(), n = null);
    }, r.set(a, [f, u]), r.size === 1 && (n = e(o, c) || Te), u || a(t), f);
  }
  return { get: i, set: o, update: c, subscribe: l };
}
function ur(t, e) {
  const n = !ne.subscriberQueue.size;
  if (t(), n) {
    const s = ne.subscriberQueue.entries();
    for (; ne.subscriberQueue.size > 0; ) {
      const [r, i] = s.next().value;
      ne.subscriberQueue.delete(r), r(i);
    }
  }
}
function Ir(t) {
  const e = hn(t), n = hr(e), s = fr(e), r = dr(e), i = pr(e), o = gr(e);
  function c(l) {
    l !== t && e.set(l);
  }
  return {
    active: n,
    doc: s,
    selection: r,
    root: i,
    focus: o,
    updateEditor: c
  };
}
function ye(t, e, n, s, r) {
  let i = e;
  return ar(i, (o) => {
    let c;
    const l = () => {
      i = c ? s(c) : e, !(r && k(i, o)) && o(i);
    }, a = () => c && n.forEach((h) => c.on(h, l)), u = () => c && n.forEach((h) => c.off(h, l)), f = t.subscribe((h) => {
      u(), c = h, c ? (l(), a()) : o(i = e);
    });
    return () => {
      u(), f(), c = void 0, l();
    };
  });
}
function hr(t) {
  return ye(t, {}, ["changed", "format"], (e) => e.getActive(), !0);
}
function fr(t) {
  return ye(t, new W(), ["changed"], (e) => e.doc);
}
function dr(t) {
  return ye(t, null, ["changed"], (e) => e.doc.selection);
}
function gr(t) {
  return ye(t, !1, ["changed"], (e) => !!e.doc.selection);
}
function pr(t) {
  return ye(t, void 0, ["root"], (e) => e._root);
}
const ze = [], fn = {}, dn = {}, gn = {}, mr = (t, e) => !0;
class Fe {
  constructor(e) {
    L(this, "lines");
    L(this, "formats");
    L(this, "embeds");
    var i, o, c;
    const n = (i = e.lines) == null ? void 0 : i.map((l) => typeof l == "string" ? fn[l] : l).filter(Boolean), s = (o = e.formats) == null ? void 0 : o.map((l) => typeof l == "string" ? dn[l] : l).filter(Boolean), r = (c = e.embeds) == null ? void 0 : c.map((l) => typeof l == "string" ? gn[l] : l).filter(Boolean);
    this.lines = new $e(n || ze), this.formats = new $e(s || ze), this.embeds = new $e(r || ze);
  }
}
L(Fe, "line", se), L(Fe, "format", oe), L(Fe, "embed", rt);
function se(t) {
  return t.renderMultiple && !t.shouldCombine && (t.shouldCombine = mr), fn[t.name] = t;
}
function oe(t) {
  return dn[t.name] = t;
}
function rt(t) {
  return gn[t.name] = t;
}
class $e {
  constructor(e) {
    // An array of the types
    L(this, "list");
    // A selector which will match all nodes of this type (e.g. all lines)
    L(this, "selector");
    // A map of all types by name
    L(this, "types");
    // A reverse lookup of priority by type name
    L(this, "priorities");
    this.list = e, this.init();
  }
  get default() {
    return this.list[0];
  }
  init() {
    this.selector = this.list.map((e) => e.selector || "").filter(Boolean).join(", "), this.types = this.list.reduce((e, n) => (e[n.name] = n, e), {}), this.priorities = this.list.reduce(
      (e, n, s) => (e[n.name] = s, e),
      {}
    );
  }
  add(e) {
    this.list.push(e), this.init();
  }
  remove(e) {
    const n = typeof e == "string" ? e : e.name;
    this.list = this.list.filter((s) => s.name !== n), this.init();
  }
  get(e) {
    return this.types[e];
  }
  priority(e) {
    const n = this.priorities[e];
    return n !== void 0 ? n : -1;
  }
  // Whether or not the provided element is one of our types
  matches(e) {
    if (!e) return !1;
    if (!e.nodeType) throw new Error("Cannot match against " + e);
    if (e.nodeType === Node.ELEMENT_NODE)
      return this.selector ? e.matches(this.selector) : !1;
  }
  findByNode(e, n = !1) {
    if (e.nodeType !== Node.ELEMENT_NODE) return;
    let s = this.list.length;
    for (; s--; ) {
      let r = this.list[s];
      if (e.matches(r.selector)) return r;
    }
    if (n) return this.default;
  }
  findByAttributes(e, n = !1) {
    const s = e && Object.keys(e);
    let r;
    return s && s.every((i) => !(r = this.get(i))), r || (n ? this.default : void 0);
  }
}
const _r = rt({
  name: "image",
  selector: "img",
  commands: (t) => (e, n) => t.insert({ image: e, ...n }),
  fromDom: (t) => {
    const e = {};
    return ["src", "alt", "width", "height"].forEach((n) => {
      if (!t.hasAttribute(n)) return;
      const s = t.getAttribute(n);
      n === "src" && (n = "image"), e[n] = s;
    }), e;
  },
  render: (t) => {
    const { image: e, ...n } = t;
    return n.src = e, _("img", n);
  }
}), Sr = rt({
  name: "br",
  selector: "br",
  commands: (t) => () => t.insert({ br: !0 }),
  render: () => _("br")
}), Rr = oe({
  name: "underline",
  selector: "u",
  styleSelector: '[style*="text-decoration: underline"]',
  commands: (t) => () => t.toggleTextFormat({ underline: !0 }),
  shortcuts: "Mod+Y",
  render: (t, e) => _("u", null, e)
}), Dr = oe({
  name: "bold",
  selector: "strong, b",
  styleSelector: '[style*="font-weight:bold"], [style*="font-weight: bold"]',
  commands: (t) => () => t.toggleTextFormat({ bold: !0 }),
  shortcuts: "Mod+B",
  render: (t, e) => _("strong", null, e)
}), Or = oe({
  name: "italic",
  selector: "em, i, u,mark",
  styleSelector: '[style*="font-style:italic"], [style*="font-style: italic"]',
  commands: (t) => () => t.toggleTextFormat({ italic: !0 }),
  shortcuts: "Mod+I",
  render: (t, e) => _("i", null, e)
}), Cr = oe({
  name: "mark",
  shortcuts: "Mod+M",
  selector: "mark",
  commands: (t) => () => t.toggleTextFormat({ mark: !0 }),
  render: (t, e) => _("mark", null, e)
}), Br = oe({
  name: "code",
  selector: "code, u",
  commands: (t) => () => t.toggleTextFormat({ code: !0 }),
  render: (t, e) => _("code", null, e)
}), Pr = oe({
  name: "link",
  selector: "a[href], u",
  greedy: !1,
  // If the link is a string, it is an actual address. Otherwise it is either undefined (empty) or being called from the
  // testing code (which passes a pointer to the dom object, hence the conversion to a boolean which works with the toggleTextFormat)
  commands: (t) => (e) => t.toggleTextFormat({ link: typeof e == "string" ? e : !!e }),
  fromDom: (t) => t.href,
  render: (t, e) => _("a", { href: t.link, target: "_blank" }, e)
}), jr = se({
  name: "paragraph",
  selector: "p",
  commands: (t) => () => t.formatLine({}),
  shortcuts: "Mod+0",
  render: (t, e) => _("p", null, e)
}), zr = se({
  name: "header",
  selector: "h1, h2, h3, h4, h5, h6",
  defaultFollows: !0,
  commands: (t) => ({
    header: (e) => t.toggleLineFormat({ header: e }),
    header1: () => t.toggleLineFormat({ header: 1 }),
    header2: () => t.toggleLineFormat({ header: 2 }),
    header3: () => t.toggleLineFormat({ header: 3 }),
    header4: () => t.toggleLineFormat({ header: 4 }),
    header5: () => t.toggleLineFormat({ header: 5 }),
    header6: () => t.toggleLineFormat({ header: 6 })
  }),
  shortcuts: {
    "Mod+1": "header1",
    "Mod+2": "header2",
    "Mod+3": "header3",
    "Mod+4": "header4",
    "Mod+5": "header5",
    "Mod+6": "header6"
  },
  fromDom: (t) => ({ header: parseInt(t.nodeName.replace("H", "")) }),
  render: (t, e) => _(`h${t.header}`, null, e)
}), $r = se({
  name: "list",
  selector: "ul > li, ol > li",
  indentable: !0,
  commands: (t) => ({
    bulletList: () => t.toggleLineFormat({ list: "bullet" }),
    orderedList: () => t.toggleLineFormat({ list: "ordered" }),
    checkList: () => t.toggleLineFormat({ list: "check" }),
    indent: () => t.indent(),
    outdent: () => t.outdent(),
    toggleCheck: (e) => {
      const n = typeof e == "string" ? t.doc.getLineBy(e) : t.doc.selection ? t.doc.getLineAt(t.doc.selection[0]) : null;
      if (!n) return !1;
      const [s] = t.doc.getLineRange(n), r = { list: "check" };
      n.attributes.checked || (r.checked = !0), t.formatLine(r, s);
    }
  }),
  shortcuts: {
    "Mod+Space": "toggleCheck"
  },
  fromDom(t) {
    let e = -1, n = t.parentNode, s = n && n.getAttribute("type");
    const r = t.hasAttribute("data-checked") ? "check" : n && n.nodeName === "OL" ? "ordered" : "bullet";
    for (; n; ) {
      if (/^UL|OL$/.test(n.nodeName)) e++;
      else if (n.nodeName !== "LI") break;
      n = n.parentNode;
    }
    !e && t.className.startsWith("ql-indent-") && (e = parseInt(t.className.replace("ql-indent-", "")));
    const i = { list: r };
    return e && (i.indent = e), s && (i.type = s), t.getAttribute("data-checked") === "true" && (i.checked = !0), i;
  },
  nextLineAttributes(t) {
    const { start: e, ...n } = t;
    return n;
  },
  shouldCombine: (t, e) => t.list === e.list && !e.start && t.type === e.type || e.indent,
  renderMultiple: (t, e, n) => {
    const s = [], r = [];
    t.forEach(([o, c, l]) => {
      const a = o.list === "ordered" ? "ol" : "ul", u = o.indent || 0;
      let f = { key: l };
      if (o.list === "check") {
        let g = function(p) {
          e.enabled && (p.preventDefault(), e.commands.toggleCheck(l));
        };
        const d = _("button", { class: "check-list-check", onmousedown: g, ontouchstart: g });
        c.length === 1 && c[0].type === "br" ? c.push(d) : c.unshift(d), f = {
          ...f,
          class: "check-list-item",
          "data-checked": "" + (o.checked || !1)
        };
      }
      const h = Ve(_("li", f, c), o);
      for (; u >= r.length; ) {
        const g = _(a, { start: o.start, type: o.type, key: `${l}-outer` }), d = r.length ? r[r.length - 1].children : s, p = d[d.length - 1];
        typeof p == "object" && p.type === "li" && n ? p.children.push(g) : d.push(g), r.push(g);
      }
      if (!i(r[u], a, o)) {
        const g = _(a, { start: o.start, type: o.type });
        (u ? r[u - 1].children : s).push(g), r[u] = g;
      }
      r[u].children.push(h), r.length = u + 1;
    });
    function i(o, c, l) {
      return o.type === c && (o.props.start === l.start || o.props.start && !l.start) && o.props.type === l.type;
    }
    return s[0];
  }
}), Hr = se({
  name: "blockquote",
  selector: "blockquote p",
  commands: (t) => (e = !0) => {
    typeof e != "string" && (e = !0), t.toggleLineFormat({ blockquote: e });
  },
  fromDom(t) {
    const { className: e } = t.parentNode, n = e.match(/quote-(\S+)/);
    return { blockquote: n && n[1] !== "true" && n[1] || !0 };
  },
  shouldCombine: (t, e) => t.blockquote === e.blockquote,
  renderMultiple: (t) => {
    const e = t[0][0].blockquote, n = typeof e == "string" ? { className: `quote-${e}` } : null, s = t.map(([r, i, o]) => _("p", { key: o }, i));
    return _("blockquote", n, s);
  }
}), Wr = se({
  name: "code-block",
  selector: "pre code",
  contained: !0,
  commands: (t) => () => t.toggleLineFormat({ "code-block": !0 }),
  renderMultiple: (t) => {
    const e = [];
    return t.forEach(([n, s, r]) => {
      s.length && s[s.length - 1].type === "br" && s.pop(), e.push(_("code", { key: r }, s)), e.push(`
`);
    }), _("pre", { spellcheck: !1 }, e);
  }
}), Ur = se({
  name: "hr",
  selector: "hr",
  frozen: !0,
  commands: (t) => () => {
    const { doc: e } = t, { selection: n } = e;
    if (!n) return;
    const s = O(n), r = t.change.delete(s);
    if (s[0] === s[1] && e.getLineAt(s[0]).length === 1)
      r.insert(s[0], `
`, { ...e.getLineFormat(s[0]) }).formatLine(s[0], { hr: !0 });
    else {
      const i = new S().insert(`
`, e.getLineAt(s[0]).attributes).insert(`
`, { hr: !0 });
      r.insertContent(s[0], i), r.select(s[0] + 2);
    }
    t.update(r);
  },
  render: () => _("hr")
}), Yr = se({
  name: "dl",
  selector: "dl dt, dl dd",
  fromDom(t) {
    return { dl: t.nodeName.toLowerCase() };
  },
  onTab: (t, e) => {
    const { doc: n } = t, { selection: s } = n;
    if (!s) return;
    const r = e ? s[0] === s[1] || s[0] > s[1] ? s[1] : s[1] - 1 : s[0] === s[1] || s[1] > s[0] ? s[0] : s[0] - 1, i = n.getLineAt(r), o = n.lines.indexOf(i), c = n.lines[o + (e ? -1 : 1)];
    if (((c == null ? void 0 : c.attributes.dl) === i.attributes.dl || !(c != null && c.attributes.dl)) && !e)
      if (i.length === 1 && i.attributes.dl === "dt")
        t.formatLine({}, n.getLineRange(i));
      else {
        const l = n.getLineRange(i)[1] - 1;
        t.insert(`
`, { dl: i.attributes.dl === "dt" ? "dd" : "dt" }, [l, l]);
      }
    else if (c) {
      let l = n.getLineRange(c);
      l = [l[0], l[1] - 1], e && !c.attributes.dl && (l = [l[1], l[1]]), t.select(l);
    }
  },
  commands: (t) => () => t.toggleLineFormat({ dl: "dt" }),
  shouldCombine: () => !0,
  nextLineAttributes: (t) => ({ dl: t.dl === "dt" ? "dd" : "dt" }),
  renderMultiple: (t) => {
    const e = [];
    let n = "";
    for (const [s, r, i] of t)
      (!n || s.dl === "dt") && e.push(_("div", {}, [])), e[e.length - 1].children.push(_(s.dl, { key: i }, r)), n = s.dl;
    return _("dl", {}, e);
  }
}), br = {
  lines: ["paragraph", "header", "list", "blockquote", "code-block", "hr"],
  formats: ["link", "bold", "italic", "mark", "underline"],
  embeds: ["image", "br"]
}, ae = {}, pn = [], _t = ["focus", "blur", "keydown", "mousedown", "mouseup", "click"], St = /* @__PURE__ */ new WeakMap();
class ue extends Event {
  constructor(n, s) {
    super(n, s);
    L(this, "old");
    L(this, "doc");
    L(this, "change");
    L(this, "changedLines");
    L(this, "source");
    this.old = s.old, this.doc = s.doc, this.change = s.change, this.changedLines = s.changedLines, this.source = s.source, Object.setPrototypeOf(this, ue.prototype);
  }
  // Modify the data during a "changing" event before doc is committed
  modify(n) {
    if (!this.cancelable) throw new Error('Cannot modify an applied change, listen to the "changing" event');
    this.doc = this.doc.apply(n), this.change && (this.change.delta = this.change.delta.compose(n)), this.changedLines && (this.changedLines = this.old.lines === this.doc.lines ? pn : mn(this.old, this.doc));
  }
}
class Rt extends Event {
  constructor(n, s) {
    super(n, s);
    L(this, "formats");
    this.formats = s.formats;
  }
}
class Qr extends Wn {
  constructor(n = {}) {
    super();
    L(this, "identifier");
    L(this, "typeset");
    L(this, "doc");
    L(this, "activeFormats", ae);
    L(this, "commands", {});
    L(this, "shortcuts", {});
    L(this, "modules", {});
    L(this, "catchErrors");
    L(this, "throwOnError");
    L(this, "_root");
    L(this, "_modules");
    L(this, "_enabled");
    this.catchErrors = !n.dev, this.identifier = n.identifier, this.typeset = new Fe(n.types || br), n.doc ? this.doc = n.doc : n.html ? this.doc = Et(this, n.html) : n.text ? this.doc = new W(new S().insert(n.text)) : this.doc = new W(), this.throwOnError = n.throwOnError || !1, this._enabled = n.enabled === void 0 ? !0 : n.enabled;
    const s = n.includeDefaultModules ?? !0;
    this._modules = s ? { ...cr, ...n.modules } : { ...n.modules }, n.root && this.setRoot(n.root);
  }
  get root() {
    return this._root || this.setRoot(document.createElement("div")), this._root;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(n) {
    n = !!n;
    const s = this._enabled !== n;
    !n && this.doc.selection && this.select(null, Z.api), this._enabled = n, this._root && (this._root.contentEditable = n ? "true" : "inherit"), s && this.dispatchEvent(new Event("enabledchange"));
  }
  get change() {
    const n = new J(this.doc);
    return n.apply = (s = Z.user) => this.update(n, s), n;
  }
  setRoot(n) {
    if (!n) throw new TypeError("Root must be set, cannot be " + n);
    return this.destroy(), this._root = n, this.init(), this.dispatchEvent(new Event("root")), this;
  }
  update(n, s = Z.user) {
    if (!this.enabled && s !== Z.api)
      return this;
    const r = n.ops ? new J(this.doc, n) : n, i = this.doc, o = i.apply(r, void 0, this.throwOnError), c = i.lines === o.lines ? pn : mn(i, o);
    return this.set(o, s, r, c), this;
  }
  set(n, s = Z.user, r, i) {
    const o = this.doc, c = n.ops ? new W(n) : n;
    if (!this.enabled && s !== Z.api || !c || o.equals(c))
      return this;
    const l = new ue("changing", {
      cancelable: !0,
      old: o,
      doc: c,
      change: r,
      changedLines: i,
      source: s
    });
    return this.dispatchEvent(l, this.catchErrors), l.defaultPrevented || o.equals(l.doc) ? this : (this.activeFormats = r != null && r.activeFormats ? r.activeFormats : Ee(this, l.doc), this.doc = l.doc, this.dispatchEvent(new ue("change", { ...l, cancelable: !1 }), this.catchErrors), this.dispatchEvent(new ue("changed", { ...l, cancelable: !1 }), this.catchErrors), this);
  }
  getHTML() {
    return tn(this, this.doc);
  }
  setHTML(n, s = this.doc.selection, r) {
    return this.set(Et(this, n, s), r);
  }
  getDelta() {
    return this.doc.toDelta();
  }
  setDelta(n, s = this.doc.selection, r) {
    return this.set(new W(n, s), r);
  }
  getText(n) {
    return this.doc.getText(n);
  }
  setText(n, s = this.doc.selection, r) {
    return this.set(new W(new S().insert(n), s), r);
  }
  trimSelection(n) {
    if (!n) return n;
    const s = this.getText(n), [r, i] = O([...n]);
    if (s.trim()) {
      const [o, c, l, a] = s.match(/(^ *)((?:.|\r|\n)*?)( *$)/);
      if (l && (c || a))
        return [r + c.length, i - a.length];
    }
    return n;
  }
  getActive() {
    const { selection: n } = this.doc;
    let s = n ? n[0] === n[1] ? { ...this.activeFormats, ...this.doc.getLineFormat(n) } : { ...this.doc.getFormats(n) } : {};
    return Object.values(this.modules).forEach((r) => {
      r.getActive && (s = { ...s, ...r.getActive() });
    }), s;
  }
  select(n, s) {
    return this.update(this.change.select(n), s);
  }
  insert(n, s, r = this.doc.selection, i) {
    if (!r) return this;
    const o = k(r, this.doc.selection);
    s == null && typeof n == "string" && n !== `
` && (s = o ? this.activeFormats : Ee(this, this.doc, r));
    const c = this.typeset.lines.findByAttributes(s, !0), l = this.change.delete(r), a = O(r)[0];
    if (o && l.setActiveFormats(n !== `
` && s || Ee(this, this.doc, r)), n === `
` && c.frozen) {
      const u = { ...this.doc.getLineFormat(a) }, f = { ...s };
      let h = { ...u };
      const g = new S().insert(`
`, u);
      this.doc.getLineRange(a)[1] - 1 !== a ? g.insert(`
`, f) : h = f, l.insertContent(a, g).formatLine(a, h).select(a + 2);
    } else
      l.insert(a, n, s, i);
    return this.update(l);
  }
  insertContent(n, s = this.doc.selection) {
    if (!s) return this;
    const r = this.change.delete(s).insertContent(s[0], n);
    return this.update(r);
  }
  delete(n, s) {
    let r, i = 0;
    const {
      typeset: { lines: o },
      doc: c
    } = this;
    if (Array.isArray(n))
      r = O(n);
    else {
      if (!this.doc.selection) return this;
      r = O(this.doc.selection), n && (r[0] === r[1] ? n < 0 ? r = [r[0] + n, r[1]] : r = [r[0], Math.min(r[1] + n, this.doc.length - 1)] : n < 0 && o.findByAttributes(c.getLineAt(r[0]).attributes, !0).frozen && (i = -1));
    }
    const l = Ee(this, this.doc, [r[0] + 1, r[0] + 1]), a = this.doc.length - (r[1] - r[0]);
    let u = Math.max(0, Math.min(a - 1, r[0] + i));
    const f = this.change.delete(r, s).select(u).setActiveFormats(l);
    return this.update(f);
  }
  formatText(n, s = this.doc.selection) {
    return s ? (typeof n == "string" && (n = { [n]: !0 }), s[0] === s[1] ? (this.activeFormats = H.compose(this.activeFormats, n) || ae, this.dispatchEvent(new Rt("format", { formats: this.activeFormats })), this) : (le(this, "formatText", n, s), this)) : this;
  }
  toggleTextFormat(n, s = this.doc.selection) {
    return s ? (typeof n == "string" && (n = { [n]: !0 }), s[0] === s[1] ? (Qe(n, this.activeFormats) && (n = H.invert(n)), this.activeFormats = H.compose(this.activeFormats, n) || ae, this.dispatchEvent(new Rt("format", { formats: this.activeFormats })), this) : (le(this, "toggleTextFormat", n, s), this)) : this;
  }
  formatLine(n, s = this.doc.selection) {
    return typeof n == "string" && (n = { [n]: !0 }), le(this, "formatLine", n, s), this;
  }
  toggleLineFormat(n, s = this.doc.selection) {
    return typeof n == "string" && (n = { [n]: !0 }), le(this, "toggleLineFormat", n, s), this;
  }
  indent() {
    return Ot(this, 1), this;
  }
  outdent() {
    return Ot(this, -1), this;
  }
  removeFormat(n = this.doc.selection) {
    return le(this, "removeFormat", null, n), this;
  }
  getBounds(n, s, r) {
    var o;
    if (typeof n == "number" && (n = [n, n]), !n) return;
    let i = (o = xt(this, n)) == null ? void 0 : o.getBoundingClientRect();
    if (i && s) {
      const c = s.getBoundingClientRect(), l = (r ? s.scrollLeft : 0) - c.x, a = (r ? s.scrollTop : 0) - c.y;
      i = new DOMRect(i.x + l, i.y + a, i.width, i.height);
    }
    return i;
  }
  getAllBounds(n, s, r) {
    var c;
    typeof n == "number" && (n = [n, n]);
    const i = (c = xt(this, n)) == null ? void 0 : c.getClientRects();
    let o = i && Array.from(i);
    if (o && s) {
      const l = s.getBoundingClientRect(), a = (r ? s.scrollLeft : 0) - l.x, u = (r ? s.scrollTop : 0) - l.y;
      o = o.map((f) => new DOMRect(f.x + a, f.y + u, f.width, f.height));
    }
    return o;
  }
  getIndexFromPoint(n, s) {
    return vs(this, n, s);
  }
  render() {
    var n, s, r;
    return (n = this.modules.decorations) == null || n.gatherDecorations(), (s = this.modules.rendering) == null || s.render(), (r = this.modules.selection) == null || r.renderSelection(), this;
  }
  init() {
    const n = this._root;
    n.editor && n.editor.destroy(), n.editor = this, this.enabled = this._enabled, this.commands = {}, _t.forEach((s) => this._root.addEventListener(s, Ct(this))), this.typeset.lines.list.forEach((s) => s.commands && we(this, s.name, s.commands(this))), this.typeset.formats.list.forEach((s) => s.commands && we(this, s.name, s.commands(this))), this.typeset.embeds.list.forEach((s) => s.commands && we(this, s.name, s.commands(this))), Object.keys(this._modules).forEach((s) => {
      if (!this._modules[s]) return;
      const r = this.modules[s] = this._modules[s](this);
      r.commands && we(this, s, r.commands);
    }), this.shortcuts = vr(this), Object.keys(this.modules).forEach((s) => {
      var r, i;
      return (i = (r = this.modules[s]).init) == null ? void 0 : i.call(r);
    }), this.render();
  }
  destroy() {
    const n = this._root;
    n && (_t.forEach((s) => n.removeEventListener(s, Ct(this))), Object.values(this.modules).forEach((s) => s.destroy && s.destroy()), this._root = void 0, delete n.editor);
  }
}
function le(t, e, n, s) {
  if (!s) return;
  if (s = typeof s == "number" ? [s, s] : t == null ? void 0 : t.trimSelection(s), !(e in t.change)) throw new Error("Invalid operation: " + e);
  const r = t.change[e](s, n);
  t.update(r);
}
function Ee(t, e, n = e.selection) {
  const { formats: s } = t.typeset;
  if (!n || n[0] === 0) return ae;
  const r = O(n)[0];
  let i = r, o = r + 1;
  const c = e.getTextFormat(i), l = e.getTextFormat(o), a = {};
  return Object.keys(c).forEach((u) => {
    const f = s.get(u);
    f && f.greedy !== !1 && (a[u] = c[u]);
  }), Object.keys(l).forEach((u) => {
    const f = s.get(u);
    f && f.greedy === !1 && (a[u] = c[u]);
  }), a;
}
function mn(t, e) {
  const n = new Set(t.lines);
  return e.lines.filter((s) => !n.has(s));
}
function we(t, e, n) {
  n && (typeof n == "function" ? t.commands[e] = Dt(t, n) : Object.keys(n).forEach((s) => t.commands[s] = Dt(t, n[s])));
}
function Dt(t, e) {
  return (...n) => {
    const s = e(...n);
    return t.doc.selection && t.root.focus(), s;
  };
}
function Ot(t, e = 1) {
  const {
    typeset: { lines: n },
    doc: s
  } = t, { selection: r } = s;
  if (!r) return s;
  const i = t.change;
  s.getLinesAt(r).forEach((o) => {
    if (!n.findByAttributes(o.attributes, !0).indentable) return;
    const l = s.getLineRange(o);
    let a = (o.attributes.indent || 0) + e;
    a === 0 && (a = null), i.formatLine(l[0], a < 0 ? ae : { ...o.attributes, indent: a });
  }), t.update(i);
}
function Ct(t) {
  let e = St.get(t);
  return e || (e = yr.bind(t), St.set(t, e)), e;
}
function yr(t) {
  this.dispatchEvent(t);
}
function vr(t) {
  const e = {}, {
    typeset: { lines: n, formats: s, embeds: r },
    modules: i
  } = t;
  return He(n, e), He(s, e), He(r, e), Lr(i, e), e;
}
function He(t, e) {
  t.list.forEach((n) => {
    const s = n.shortcuts;
    s && (typeof s == "string" ? e[s] = n.name : bn(s, e));
  });
}
function Lr(t, e) {
  Object.keys(t).forEach((n) => {
    var r;
    const s = (r = t[n]) == null ? void 0 : r.shortcuts;
    s && bn(s, e);
  });
}
function bn(t, e) {
  Object.keys(t).forEach((n) => e[n] = t[n]);
}
function Xr(t, e) {
  function n(r) {
    e !== r && (s(), r && r.setRoot(t), e = r);
  }
  t.children.length && e.set(fs(e, t)), e && e.setRoot(t);
  function s() {
    e && e.destroy();
  }
  return { update: n, destroy: s };
}
export {
  H as AttributeMap,
  en as BLOCK_ELEMENTS,
  Kn as DecorateEvent,
  Vn as Decorator,
  S as Delta,
  Qr as Editor,
  ue as EditorChangeEvent,
  Rt as EditorFormatEvent,
  Wn as EventDispatcher,
  P as Line,
  On as LineIterator,
  Pe as LineOp,
  Cn as LineOpIterator,
  D as Op,
  Ht as OpIterator,
  Os as PasteEvent,
  wr as React,
  st as ShortcutEvent,
  Z as Source,
  J as TextChange,
  W as TextDocument,
  $e as Types,
  Fe as Typeset,
  hr as activeStore,
  _s as addShortcutsToEvent,
  Ve as applyDecorations,
  Xr as asRoot,
  Hr as blockquote,
  Dr as bold,
  Sr as br,
  sn as cleanText,
  We as cloneDeep,
  Br as code,
  Wr as codeblock,
  ie as combineLines,
  gs as copy,
  qn as decorations,
  Js as defaultHandlers,
  cr as defaultModules,
  br as defaultTypes,
  pe as deltaFromDom,
  nn as deltaFromHTML,
  Wt as deltaToText,
  ye as derivedEditorStore,
  q as diff,
  Yr as dl,
  fs as docFromDom,
  Et as docFromHTML,
  fr as docStore,
  tn as docToHTML,
  Ir as editorStores,
  rt as embed,
  gr as focusStore,
  oe as format,
  Ar as fromNode,
  xt as getBoudingBrowserRange,
  Ls as getBrowserRange,
  Vt as getChangedRanges,
  rn as getIndexFromNode,
  Se as getIndexFromNodeAndOffset,
  vs as getIndexFromPoint,
  Es as getLineElementAt,
  Nr as getLineInfoFromPoint,
  Me as getLineNodeEnd,
  V as getLineNodeStart,
  Tt as getNodeAndOffset,
  ws as getNodeLength,
  on as getNodesForRange,
  cn as getSelection,
  _ as h,
  Qe as hasFormat,
  zr as header,
  ps as history,
  Ur as hr,
  _r as image,
  ms as initHistory,
  hs as inlineToHTML,
  Ts as input,
  Bn as intersect,
  ge as isBRPlaceholder,
  k as isEqual,
  Or as italic,
  Rs as keyboard,
  se as line,
  Qs as lineReplace,
  Hs as lineReplacements,
  Pr as link,
  Xs as linkReplace,
  Us as linkReplacements,
  $r as list,
  Cr as mark,
  Tr as markReplace,
  Ws as markReplacements,
  O as normalizeRange,
  Ze as options,
  jr as paragraph,
  Cs as paste,
  me as patch,
  xr as placeholder,
  Xn as recycleNode,
  Ge as render,
  vt as renderChanges,
  Kt as renderCombined,
  Gt as renderDoc,
  nt as renderInline,
  qt as renderLine,
  ns as renderMultiLine,
  ts as renderSingleLine,
  Bs as rendering,
  pr as rootStore,
  Ps as selection,
  dr as selectionStore,
  tt as setLineNodesRanges,
  xe as setSelection,
  an as shortcutFromEvent,
  Fr as smartEntry,
  kr as smartQuotes,
  Re as textNodeLength,
  Zs as textReplace,
  Ys as textReplacements,
  bs as transformHistoryStack,
  Rr as underline,
  Nt as undoStack,
  Mr as virtualRendering
};
