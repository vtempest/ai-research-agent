function Je(t) {
  if (!t) return t;
  if (typeof t.toJSON == "function" && (t = t.toJSON()), Array.isArray(t)) return t.map(Je);
  if (typeof t == "object") {
    const e = {};
    return Object.keys(t).forEach((n) => e[n] = Je(t[n])), e;
  }
  return t;
}
const pn = {};
function B(t, e, n = pn) {
  if (t === e) return !0;
  const s = typeof t, r = typeof t;
  if (s === "number" && r === "number" && isNaN(t) && isNaN(e))
    return !0;
  if (!t || !e || s !== "object" || r !== "object" || t.constructor !== e.constructor)
    return !1;
  if (t.valueOf() !== t)
    return B(t.valueOf(), e.valueOf(), n);
  const i = n.shallow ? gn : B;
  if (typeof t[Symbol.iterator] == "function") {
    const l = t[Symbol.iterator](), a = e[Symbol.iterator]();
    let h = l.next(), d = a.next();
    for (; !h.done && !d.done; ) {
      if (!i(h.value, d.value, n)) return !1;
      h = l.next(), d = a.next();
    }
    return h.done === d.done;
  }
  let o = Object.keys(t), c = Object.keys(e);
  if (n.excludeProps) {
    const l = mn(n.excludeProps);
    o = o.filter(l), c = c.filter(l);
  }
  return (n.partial || o.length === c.length) && c.every(
    (l) => t.hasOwnProperty(l) && i(e[l], t[l], n)
  );
}
function gn(t, e) {
  return t === e;
}
function mn(t) {
  return (e) => !t.has(e);
}
function ue(t) {
  return t === Object(t) && !Array.isArray(t);
}
function Bt(t) {
  if (t == null) return !0;
  if (!ue(t)) return !1;
  for (const e in t)
    if (!Bt(t[e])) return !1;
  return !0;
}
var Ge;
((t) => {
  function e(i = {}, o = {}, c) {
    typeof i != "object" && (i = {}), typeof o != "object" && (o = {});
    let l = Je(o);
    for (const a in i)
      ue(i[a]) && ue(l[a]) && (l[a] = e(i[a], l[a], c));
    c || (l = Object.keys(l).reduce((a, h) => (Bt(l[h]) || (a[h] = l[h]), a), {}));
    for (const a in i)
      i[a] !== void 0 && o[a] === void 0 && (l[a] = i[a]);
    return Object.keys(l).length > 0 ? l : void 0;
  }
  t.compose = e;
  function n(i = {}, o = {}) {
    typeof i != "object" && (i = {}), typeof o != "object" && (o = {});
    const c = Object.keys(i).concat(Object.keys(o)).reduce((l, a) => (B(i[a], o[a]) || (o[a] === void 0 ? l[a] = null : ue(i[a]) && ue(o[a]) ? l[a] = n(i[a], o[a]) : l[a] = o[a]), l), {});
    return Object.keys(c).length > 0 ? c : void 0;
  }
  t.diff = n;
  function s(i = {}, o = {}) {
    i = i || {};
    const c = Object.keys(o).reduce((l, a) => (!B(o[a], i[a]) && i[a] !== void 0 && (ue(i[a]) && ue(o[a]) ? l[a] = s(i[a], o[a]) : l[a] = o[a]), l), {});
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
    const l = Object.keys(o).reduce((a, h) => (i[h] === void 0 ? a[h] = o[h] : ue(i[h]) && ue(o[h]) && (a[h] = r(i[h], o[h], !0)), a), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  t.transform = r;
})(Ge || (Ge = {}));
const ne = Ge;
function bn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var We, at;
function yn() {
  if (at) return We;
  at = 1;
  var t = -1, e = 1, n = 0;
  function s(u, y, p, w, E) {
    if (u === y)
      return u ? [[n, u]] : [];
    if (p != null) {
      var v = se(u, y, p);
      if (v)
        return v;
    }
    var L = c(u, y), N = u.substring(0, L);
    u = u.substring(L), y = y.substring(L), L = a(u, y);
    var x = u.substring(u.length - L);
    u = u.substring(0, u.length - L), y = y.substring(0, y.length - L);
    var F = r(u, y);
    return N && F.unshift([n, N]), x && F.push([n, x]), M(F, E), w && d(F), F;
  }
  function r(u, y) {
    var p;
    if (!u)
      return [[e, y]];
    if (!y)
      return [[t, u]];
    var w = u.length > y.length ? u : y, E = u.length > y.length ? y : u, v = w.indexOf(E);
    if (v !== -1)
      return p = [
        [e, w.substring(0, v)],
        [n, E],
        [e, w.substring(v + E.length)]
      ], u.length > y.length && (p[0][0] = p[2][0] = t), p;
    if (E.length === 1)
      return [
        [t, u],
        [e, y]
      ];
    var L = h(u, y);
    if (L) {
      var N = L[0], x = L[1], F = L[2], _ = L[3], I = L[4], $ = s(N, F), C = s(x, _);
      return $.concat([[n, I]], C);
    }
    return i(u, y);
  }
  function i(u, y) {
    for (var p = u.length, w = y.length, E = Math.ceil((p + w) / 2), v = E, L = 2 * E, N = new Array(L), x = new Array(L), F = 0; F < L; F++)
      N[F] = -1, x[F] = -1;
    N[v + 1] = 0, x[v + 1] = 0;
    for (var _ = p - w, I = _ % 2 !== 0, $ = 0, C = 0, W = 0, G = 0, K = 0; K < E; K++) {
      for (var P = -K + $; P <= K - C; P += 2) {
        var H = v + P, z;
        P === -K || P !== K && N[H - 1] < N[H + 1] ? z = N[H + 1] : z = N[H - 1] + 1;
        for (var U = z - P; z < p && U < w && u.charAt(z) === y.charAt(U); )
          z++, U++;
        if (N[H] = z, z > p)
          C += 2;
        else if (U > w)
          $ += 2;
        else if (I) {
          var Y = v + _ - P;
          if (Y >= 0 && Y < L && x[Y] !== -1) {
            var Q = p - x[Y];
            if (z >= Q)
              return o(u, y, z, U);
          }
        }
      }
      for (var te = -K + W; te <= K - G; te += 2) {
        var Y = v + te, Q;
        te === -K || te !== K && x[Y - 1] < x[Y + 1] ? Q = x[Y + 1] : Q = x[Y - 1] + 1;
        for (var ce = Q - te; Q < p && ce < w && u.charAt(p - Q - 1) === y.charAt(w - ce - 1); )
          Q++, ce++;
        if (x[Y] = Q, Q > p)
          G += 2;
        else if (ce > w)
          W += 2;
        else if (!I) {
          var H = v + _ - te;
          if (H >= 0 && H < L && N[H] !== -1) {
            var z = N[H], U = v + z - H;
            if (Q = p - Q, z >= Q)
              return o(u, y, z, U);
          }
        }
      }
    }
    return [
      [t, u],
      [e, y]
    ];
  }
  function o(u, y, p, w) {
    var E = u.substring(0, p), v = y.substring(0, w), L = u.substring(p), N = y.substring(w), x = s(E, v), F = s(L, N);
    return x.concat(F);
  }
  function c(u, y) {
    if (!u || !y || u.charAt(0) !== y.charAt(0))
      return 0;
    for (var p = 0, w = Math.min(u.length, y.length), E = w, v = 0; p < E; )
      u.substring(v, E) == y.substring(v, E) ? (p = E, v = p) : w = E, E = Math.floor((w - p) / 2 + p);
    return k(u.charCodeAt(E - 1)) && E--, E;
  }
  function l(u, y) {
    var p = u.length, w = y.length;
    if (p == 0 || w == 0)
      return 0;
    p > w ? u = u.substring(p - w) : p < w && (y = y.substring(0, p));
    var E = Math.min(p, w);
    if (u == y)
      return E;
    for (var v = 0, L = 1; ; ) {
      var N = u.substring(E - L), x = y.indexOf(N);
      if (x == -1)
        return v;
      L += x, (x == 0 || u.substring(E - L) == y.substring(0, L)) && (v = L, L++);
    }
  }
  function a(u, y) {
    if (!u || !y || u.slice(-1) !== y.slice(-1))
      return 0;
    for (var p = 0, w = Math.min(u.length, y.length), E = w, v = 0; p < E; )
      u.substring(u.length - E, u.length - v) == y.substring(y.length - E, y.length - v) ? (p = E, v = p) : w = E, E = Math.floor((w - p) / 2 + p);
    return X(u.charCodeAt(u.length - E)) && E--, E;
  }
  function h(u, y) {
    var p = u.length > y.length ? u : y, w = u.length > y.length ? y : u;
    if (p.length < 4 || w.length * 2 < p.length)
      return null;
    function E(C, W, G) {
      for (var K = C.substring(G, G + Math.floor(C.length / 4)), P = -1, H = "", z, U, Y, Q; (P = W.indexOf(K, P + 1)) !== -1; ) {
        var te = c(
          C.substring(G),
          W.substring(P)
        ), ce = a(
          C.substring(0, G),
          W.substring(0, P)
        );
        H.length < ce + te && (H = W.substring(P - ce, P) + W.substring(P, P + te), z = C.substring(0, G - ce), U = C.substring(G + te), Y = W.substring(0, P - ce), Q = W.substring(P + te));
      }
      return H.length * 2 >= C.length ? [
        z,
        U,
        Y,
        Q,
        H
      ] : null;
    }
    var v = E(
      p,
      w,
      Math.ceil(p.length / 4)
    ), L = E(
      p,
      w,
      Math.ceil(p.length / 2)
    ), N;
    if (!v && !L)
      return null;
    L ? v ? N = v[4].length > L[4].length ? v : L : N = L : N = v;
    var x, F, _, I;
    u.length > y.length ? (x = N[0], F = N[1], _ = N[2], I = N[3]) : (_ = N[0], I = N[1], x = N[2], F = N[3]);
    var $ = N[4];
    return [x, F, _, I, $];
  }
  function d(u) {
    for (var y = !1, p = [], w = 0, E = null, v = 0, L = 0, N = 0, x = 0, F = 0; v < u.length; )
      u[v][0] == n ? (p[w++] = v, L = x, N = F, x = 0, F = 0, E = u[v][1]) : (u[v][0] == e ? x += u[v][1].length : F += u[v][1].length, E && E.length <= Math.max(L, N) && E.length <= Math.max(x, F) && (u.splice(p[w - 1], 0, [
        t,
        E
      ]), u[p[w - 1] + 1][0] = e, w--, w--, v = w > 0 ? p[w - 1] : -1, L = 0, N = 0, x = 0, F = 0, E = null, y = !0)), v++;
    for (y && M(u), T(u), v = 1; v < u.length; ) {
      if (u[v - 1][0] == t && u[v][0] == e) {
        var _ = u[v - 1][1], I = u[v][1], $ = l(_, I), C = l(I, _);
        $ >= C ? ($ >= _.length / 2 || $ >= I.length / 2) && (u.splice(v, 0, [
          n,
          I.substring(0, $)
        ]), u[v - 1][1] = _.substring(
          0,
          _.length - $
        ), u[v + 1][1] = I.substring($), v++) : (C >= _.length / 2 || C >= I.length / 2) && (u.splice(v, 0, [
          n,
          _.substring(0, C)
        ]), u[v - 1][0] = e, u[v - 1][1] = I.substring(
          0,
          I.length - C
        ), u[v + 1][0] = t, u[v + 1][1] = _.substring(C), v++), v++;
      }
      v++;
    }
  }
  var f = /[^a-zA-Z0-9]/, g = /\s/, m = /[\r\n]/, b = /\n\r?\n$/, A = /^\r?\n\r?\n/;
  function T(u) {
    function y(C, W) {
      if (!C || !W)
        return 6;
      var G = C.charAt(C.length - 1), K = W.charAt(0), P = G.match(f), H = K.match(f), z = P && G.match(g), U = H && K.match(g), Y = z && G.match(m), Q = U && K.match(m), te = Y && C.match(b), ce = Q && W.match(A);
      return te || ce ? 5 : Y || Q ? 4 : P && !z && U ? 3 : z || U ? 2 : P || H ? 1 : 0;
    }
    for (var p = 1; p < u.length - 1; ) {
      if (u[p - 1][0] == n && u[p + 1][0] == n) {
        var w = u[p - 1][1], E = u[p][1], v = u[p + 1][1], L = a(w, E);
        if (L) {
          var N = E.substring(E.length - L);
          w = w.substring(0, w.length - L), E = N + E.substring(0, E.length - L), v = N + v;
        }
        for (var x = w, F = E, _ = v, I = y(w, E) + y(E, v); E.charAt(0) === v.charAt(0); ) {
          w += E.charAt(0), E = E.substring(1) + v.charAt(0), v = v.substring(1);
          var $ = y(w, E) + y(E, v);
          $ >= I && (I = $, x = w, F = E, _ = v);
        }
        u[p - 1][1] != x && (x ? u[p - 1][1] = x : (u.splice(p - 1, 1), p--), u[p][1] = F, _ ? u[p + 1][1] = _ : (u.splice(p + 1, 1), p--));
      }
      p++;
    }
  }
  function M(u, y) {
    u.push([n, ""]);
    for (var p = 0, w = 0, E = 0, v = "", L = "", N; p < u.length; ) {
      if (p < u.length - 1 && !u[p][1]) {
        u.splice(p, 1);
        continue;
      }
      switch (u[p][0]) {
        case e:
          E++, L += u[p][1], p++;
          break;
        case t:
          w++, v += u[p][1], p++;
          break;
        case n:
          var x = p - E - w - 1;
          if (y) {
            if (x >= 0 && S(u[x][1])) {
              var F = u[x][1].slice(-1);
              if (u[x][1] = u[x][1].slice(
                0,
                -1
              ), v = F + v, L = F + L, !u[x][1]) {
                u.splice(x, 1), p--;
                var _ = x - 1;
                u[_] && u[_][0] === e && (E++, L = u[_][1] + L, _--), u[_] && u[_][0] === t && (w++, v = u[_][1] + v, _--), x = _;
              }
            }
            if (R(u[p][1])) {
              var F = u[p][1].charAt(0);
              u[p][1] = u[p][1].slice(1), v += F, L += F;
            }
          }
          if (p < u.length - 1 && !u[p][1]) {
            u.splice(p, 1);
            break;
          }
          if (v.length > 0 || L.length > 0) {
            v.length > 0 && L.length > 0 && (N = c(L, v), N !== 0 && (x >= 0 ? u[x][1] += L.substring(
              0,
              N
            ) : (u.splice(0, 0, [
              n,
              L.substring(0, N)
            ]), p++), L = L.substring(N), v = v.substring(N)), N = a(L, v), N !== 0 && (u[p][1] = L.substring(L.length - N) + u[p][1], L = L.substring(
              0,
              L.length - N
            ), v = v.substring(
              0,
              v.length - N
            )));
            var I = E + w;
            v.length === 0 && L.length === 0 ? (u.splice(p - I, I), p = p - I) : v.length === 0 ? (u.splice(p - I, I, [e, L]), p = p - I + 1) : L.length === 0 ? (u.splice(p - I, I, [t, v]), p = p - I + 1) : (u.splice(
              p - I,
              I,
              [t, v],
              [e, L]
            ), p = p - I + 2);
          }
          p !== 0 && u[p - 1][0] === n ? (u[p - 1][1] += u[p][1], u.splice(p, 1)) : p++, E = 0, w = 0, v = "", L = "";
          break;
      }
    }
    u[u.length - 1][1] === "" && u.pop();
    var $ = !1;
    for (p = 1; p < u.length - 1; )
      u[p - 1][0] === n && u[p + 1][0] === n && (u[p][1].substring(
        u[p][1].length - u[p - 1][1].length
      ) === u[p - 1][1] ? (u[p][1] = u[p - 1][1] + u[p][1].substring(
        0,
        u[p][1].length - u[p - 1][1].length
      ), u[p + 1][1] = u[p - 1][1] + u[p + 1][1], u.splice(p - 1, 1), $ = !0) : u[p][1].substring(0, u[p + 1][1].length) == u[p + 1][1] && (u[p - 1][1] += u[p + 1][1], u[p][1] = u[p][1].substring(u[p + 1][1].length) + u[p + 1][1], u.splice(p + 1, 1), $ = !0)), p++;
    $ && M(u, y);
  }
  function k(u) {
    return u >= 55296 && u <= 56319;
  }
  function X(u) {
    return u >= 56320 && u <= 57343;
  }
  function R(u) {
    return X(u.charCodeAt(0));
  }
  function S(u) {
    return k(u.charCodeAt(u.length - 1));
  }
  function O(u) {
    for (var y = [], p = 0; p < u.length; p++)
      u[p][1].length > 0 && y.push(u[p]);
    return y;
  }
  function J(u, y, p, w) {
    return S(u) || R(w) ? null : O([
      [n, u],
      [t, y],
      [e, p],
      [n, w]
    ]);
  }
  function se(u, y, p) {
    var w = typeof p == "number" ? { index: p, length: 0 } : p.oldRange, E = typeof p == "number" ? null : p.newRange, v = u.length, L = y.length;
    if (w.length === 0 && (E === null || E.length === 0)) {
      var N = w.index, x = u.slice(0, N), F = u.slice(N), _ = E ? E.index : null;
      e: {
        var I = N + L - v;
        if (_ !== null && _ !== I || I < 0 || I > L)
          break e;
        var $ = y.slice(0, I), C = y.slice(I);
        if (C !== F)
          break e;
        var W = Math.min(N, I), G = x.slice(0, W), K = $.slice(0, W);
        if (G !== K)
          break e;
        var P = x.slice(W), H = $.slice(W);
        return J(G, P, H, F);
      }
      e: {
        if (_ !== null && _ !== N)
          break e;
        var z = N, $ = y.slice(0, z), C = y.slice(z);
        if ($ !== x)
          break e;
        var U = Math.min(v - z, L - z), Y = F.slice(F.length - U), Q = C.slice(C.length - U);
        if (Y !== Q)
          break e;
        var P = F.slice(0, F.length - U), H = C.slice(0, C.length - U);
        return J(x, P, H, Y);
      }
    }
    if (w.length > 0 && E && E.length === 0)
      e: {
        var G = u.slice(0, w.index), Y = u.slice(w.index + w.length), W = G.length, U = Y.length;
        if (L < W + U)
          break e;
        var K = y.slice(0, W), Q = y.slice(L - U);
        if (G !== K || Y !== Q)
          break e;
        var P = u.slice(W, v - U), H = y.slice(W, L - U);
        return J(G, P, H, Y);
      }
    return null;
  }
  function V(u, y, p, w) {
    return s(u, y, p, w, !0);
  }
  return V.INSERT = e, V.DELETE = t, V.EQUAL = n, We = V, We;
}
var vn = yn();
const he = /* @__PURE__ */ bn(vn);
var Ee;
((t) => {
  function e(s) {
    return new Pt(s);
  }
  t.iterator = e;
  function n(s) {
    return typeof s.delete == "number" ? s.delete : typeof s.retain == "number" ? s.retain : typeof s.insert == "string" ? s.insert.length : 1;
  }
  t.length = n;
})(Ee || (Ee = {}));
const Z = Ee;
class Pt {
  ops;
  index;
  offset;
  constructor(e) {
    this.ops = e, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return !!this.peek();
  }
  next(e) {
    e || (e = 1 / 0);
    const n = this.ops[this.index];
    if (n) {
      const s = this.offset, r = Ee.length(n);
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
    return this.ops[this.index] ? Ee.length(this.ops[this.index]) - this.offset : 1 / 0;
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
const Ln = "\0";
class D {
  static Op = Z;
  static AttributeMap = ne;
  ops;
  constructor(e) {
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
      if (B(e.attributes, s.attributes)) {
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
    return this.reduce((e, n) => n.insert ? e + Z.length(n) : n.delete ? e - n.delete : e, 0);
  }
  length() {
    return this.reduce((e, n) => e + Z.length(n), 0);
  }
  slice(e = 0, n = 1 / 0) {
    const s = [], r = Z.iterator(this.ops);
    let i = 0;
    for (; i < n && r.hasNext(); ) {
      let o;
      i < e ? o = r.next(e - i) : (o = r.next(n - i), s.push(o)), i += Z.length(o);
    }
    return new D(s);
  }
  compose(e, n) {
    const s = Z.iterator(this.ops), r = Z.iterator(e.ops), i = [], o = r.peek();
    if (o != null && typeof o.retain == "number" && o.attributes == null) {
      let l = o.retain;
      for (; s.peekType() === "insert" && s.peekLength() <= l; )
        l -= s.peekLength(), i.push(s.next());
      o.retain - l > 0 && r.next(o.retain - l);
    }
    const c = new D(i);
    for (; s.hasNext() || r.hasNext(); )
      if (r.peekType() === "insert")
        c.push(r.next());
      else if (s.peekType() === "delete")
        c.push(s.next());
      else {
        const l = Math.min(s.peekLength(), r.peekLength()), a = s.next(l), h = r.next(l);
        if (typeof h.retain == "number") {
          let d;
          const f = h.attributes && ne.compose(
            a.attributes,
            h.attributes,
            !n && typeof a.retain == "number"
          );
          if (h.attributes && !B(f, a.attributes) ? (d = {}, typeof a.retain == "number" ? d.retain = l : d.insert = a.insert, f && (d.attributes = f)) : a.retain === 1 / 0 ? d = h : d = a, c.push(d), h.retain === 1 / 0 || !r.hasNext() && B(c.ops[c.ops.length - 1], d)) {
            const g = new D(s.rest());
            return c.concat(g).chop();
          }
        } else typeof h.delete == "number" && typeof a.retain == "number" && c.push(h);
      }
    return c.chop();
  }
  concat(e) {
    const n = new D(this.ops.slice());
    return e.ops.length > 0 && (n.push(e.ops[0]), n.ops = n.ops.concat(e.ops.slice(1))), n;
  }
  diff(e, n) {
    if (this.ops === e.ops)
      return new D();
    const s = [this, e].map((l) => l.map((a) => {
      if (a.insert != null)
        return typeof a.insert == "string" ? a.insert : Ln;
      const h = l === e ? "on" : "with";
      throw new Error("diff() called " + h + " non-document");
    }).join("")), r = new D(), i = he(s[0], s[1], n), o = Z.iterator(this.ops), c = Z.iterator(e.ops);
    return i.forEach((l) => {
      let a = l[1].length;
      for (; a > 0; ) {
        let h = 0;
        switch (l[0]) {
          case he.INSERT:
            h = Math.min(c.peekLength(), a), r.push(c.next(h));
            break;
          case he.DELETE:
            h = Math.min(a, o.peekLength()), o.next(h), r.delete(h);
            break;
          case he.EQUAL:
            h = Math.min(o.peekLength(), c.peekLength(), a);
            const d = o.next(h), f = c.next(h);
            B(d.insert, f.insert) ? r.retain(h, ne.diff(d.attributes, f.attributes)) : r.push(f).delete(h);
            break;
        }
        a -= h;
      }
    }), r.chop();
  }
  eachLine(e, n = `
`) {
    const s = Z.iterator(this.ops);
    let r = new D(), i = 0;
    for (; s.hasNext(); ) {
      if (s.peekType() !== "insert")
        return;
      const o = s.peek(), c = Z.length(o) - s.peekLength(), l = typeof o.insert == "string" ? o.insert.indexOf(n, c) - c : -1;
      if (l < 0)
        r.push(s.next());
      else if (l > 0)
        r.push(s.next(l));
      else {
        if (e(r, s.next(1).attributes || {}, i) === !1)
          return;
        i += 1, r = new D();
      }
    }
    r.length() > 0 && e(r, {}, i);
  }
  invert(e) {
    const n = new D();
    return this.reduce((s, r) => {
      if (r.insert)
        n.delete(Z.length(r));
      else {
        if (r.retain && r.attributes == null)
          return n.retain(r.retain), s + r.retain;
        if (r.delete || r.retain) {
          const i = r.delete || r.retain;
          return e.slice(s, s + i).forEach((c) => {
            r.delete ? n.push(c) : r.retain && r.attributes && n.retain(Z.length(c), ne.invert(r.attributes, c.attributes));
          }), s + i;
        }
      }
      return s;
    }, 0), n.chop();
  }
  transform(e, n = !1) {
    if (n = !!n, typeof e == "number")
      return this.transformPosition(e, n);
    const s = e, r = Z.iterator(this.ops), i = Z.iterator(s.ops), o = new D();
    for (; r.hasNext() || i.hasNext(); )
      if (r.peekType() === "insert" && (n || i.peekType() !== "insert"))
        o.retain(Z.length(r.next()));
      else if (i.peekType() === "insert")
        o.push(i.next());
      else {
        const c = Math.min(r.peekLength(), i.peekLength()), l = r.next(c), a = i.next(c);
        if (l.delete)
          continue;
        a.delete ? o.push(a) : o.retain(c, ne.transform(l.attributes, a.attributes, n));
      }
    return o.chop();
  }
  transformPosition(e, n = !1) {
    n = !!n;
    const s = Z.iterator(this.ops);
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
}
function q(t) {
  return t && (t[0] > t[1] && (t = [t[1], t[0]]), t);
}
function jt(t) {
  return t.map(
    (e) => typeof e.insert == "string" ? e.insert : e.insert ? " " : ""
  ).join("");
}
const En = /* @__PURE__ */ new Map(), wn = {
  id: "",
  attributes: {},
  content: new D([{ retain: 1 / 0 }]),
  length: 1 / 0
};
var we;
((t) => {
  function e(f, g) {
    return new An(f, g);
  }
  t.iterator = e;
  function n(f) {
    const g = /* @__PURE__ */ new Map();
    return f.forEach(
      (m) => g.set(m.id || t.createId(g), m)
    ), g;
  }
  t.linesToLineIds = n;
  function s(f) {
    return f.length;
  }
  t.length = s;
  function r(f) {
    return console.warn("getId() is deprecated"), f.id;
  }
  t.getId = r;
  function i(f, g) {
    return B(f.attributes, g.attributes) && B(f.content.ops, g.content.ops);
  }
  t.equal = i;
  function o(f, g) {
    const m = [], b = new Map(g || []);
    return f.eachLine((A, T) => {
      const M = t.create(
        A,
        Object.keys(T).length ? T : void 0,
        b
      );
      b.set(M.id, M), m.push(M);
    }), m;
  }
  t.fromDelta = o;
  function c(f) {
    let g = new D();
    return f.forEach((m) => {
      g = g.concat(m.content), g.insert(`
`, m.attributes);
    }), g;
  }
  t.toDelta = c;
  function l(f = new D(), g = {}, m) {
    const b = f.length() + 1;
    return typeof m != "string" && (m = d(m)), { id: m, attributes: g, content: f, length: b };
  }
  t.create = l;
  function a(f, g = new D(), m) {
    const b = f ? f.id : d(m), A = f ? f.attributes : {};
    return { id: b, attributes: A, content: g, length: 1 };
  }
  t.createFrom = a;
  function h(f) {
    const g = /* @__PURE__ */ new Map();
    let m = 0;
    return f.forEach((b) => {
      g.set(b, [m, m += b.length]);
    }), g;
  }
  t.getLineRanges = h;
  function d(f = En) {
    let g;
    for (; f[g = Math.random().toString(36).slice(2)]; ) ;
    return g;
  }
  t.createId = d;
})(we || (we = {}));
const ee = we;
class An {
  lines;
  index;
  offset;
  lineIds;
  constructor(e, n) {
    this.lines = e, this.index = 0, this.offset = 0, this.lineIds = n ? new Map(n) : we.linesToLineIds(e);
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
        const i = s === 0 ? n.id : we.createId(this.lineIds), o = {
          id: i,
          attributes: n.attributes,
          content: n.content.slice(s, e),
          length: e - s
        };
        return s !== 0 && this.lineIds.set(i, o), o;
      }
    } else
      return wn;
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
var Ke;
((t) => {
  function e(s, r) {
    return new Nn(s, r);
  }
  t.iterator = e;
  function n(s) {
    return Z.length(s);
  }
  t.length = n;
})(Ke || (Ke = {}));
const Ue = Ke;
class Nn {
  lineIterator;
  opIterator;
  constructor(e, n) {
    this.lineIterator = ee.iterator(e, n);
    const s = this.lineIterator.peek();
    this.opIterator = Z.iterator(s?.content.ops || []);
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
    return this.opIterator = new Pt(n?.content.ops || []), e;
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
const ht = [0, 0], xn = {}, Tn = /* @__PURE__ */ new WeakMap(), Fn = /* @__PURE__ */ new Set(["id"]);
class re {
  _ranges;
  byId;
  lines;
  length;
  selection;
  constructor(e, n = null) {
    if (e && e.lines) {
      const s = e;
      this.lines = s.lines, this.byId = s.byId, this._ranges = s._ranges, this.length = s.length;
    } else
      this.byId = /* @__PURE__ */ new Map(), e && Array.isArray(e) ? this.lines = e : e ? this.lines = ee.fromDelta(e) : this.lines = [ee.create()], this.lines.length || this.lines.push(ee.create()), this.byId = ee.linesToLineIds(this.lines), this.lines.forEach((s) => {
        if (this.byId.get(s.id) !== s)
          throw new Error("TextDocument has duplicate line ids: " + s.id);
      }), this._ranges = ee.getLineRanges(this.lines), this.length = this.lines.reduce(
        (s, r) => s + r.length,
        0
      );
    n && (n = n.map(
      (s) => Math.min(this.length, Math.max(0, s))
    ), n[0] === n[1] && n[0] === this.length && n[0]--), this.selection = n;
  }
  get change() {
    const e = new oe(this);
    return e.apply = () => this.apply(e), e;
  }
  getText(e) {
    return e && (e = q(e)), jt(
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
    return Array.isArray(e) ? [s, r] = q(e) : s = r = e, this.lines.filter((i) => {
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
    return Array.isArray(e) && ([e, s] = q(e)), e === s && s++, ft(ee, this.lines, e, s, void 0, n);
  }
  getTextFormat(e = this.selection, n) {
    let s = e;
    return Array.isArray(e) && ([e, s] = q(e)), e === s && e--, ft(
      Ue,
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
    const s = [], r = Ue.iterator(this.lines);
    let i = 0;
    for (; i < n && r.hasNext(); ) {
      let o;
      i < e ? o = r.next(e - i) : (o = r.next(n - i), s.push(o)), i += Z.length(o);
    }
    return new D(s);
  }
  apply(e, n, s) {
    let r;
    if (e.delta ? (r = e.delta, n = e.selection) : r = e, !r.ops.length && (n === void 0 || B(this.selection, n)))
      return this;
    if (!r.ops.length && n)
      return new re(this, n);
    n === void 0 && this.selection && (n = [
      r.transformPosition(this.selection[0]),
      r.transformPosition(this.selection[1])
    ], B(this.selection, n) && (n = this.selection));
    const i = Ue.iterator(this.lines, this.byId), o = Z.iterator(r.ops), c = [], l = o.peek();
    if (l && l.retain && !l.attributes) {
      let d = l.retain;
      for (; i.peekLineLength() <= d; )
        d -= i.peekLineLength(), c.push(i.nextLine());
      l.retain - d > 0 && o.next(l.retain - d);
    }
    if (!i.hasNext() && s)
      throw new Error(
        "apply() called with change that extends beyond document"
      );
    let a = ee.createFrom(i.peekLine());
    function h(d) {
      d.length = d.content.length() + 1, c.push(d);
    }
    for (; i.hasNext() || o.hasNext(); )
      if (o.peekType() === "insert") {
        const d = o.peek(), f = typeof d.insert == "string" ? d.insert.indexOf(`
`, o.offset) : -1;
        if (f < 0)
          a.content.push(o.next());
        else {
          const g = f - o.offset;
          g && a.content.push(o.next(g));
          const m = o.next(1);
          h(ee.create(a.content, m.attributes, a.id)), a = ee.create(void 0, a.attributes);
        }
      } else {
        const d = Math.min(i.peekLength(), o.peekLength()), f = i.next(d), g = o.next(d);
        if (typeof f.retain == "number") {
          if (s)
            throw new Error(
              "apply() called with change that extends beyond document"
            );
          continue;
        }
        if (typeof g.retain == "number") {
          const m = f.insert === `
`;
          let b = f;
          const A = g.attributes && ne.compose(f.attributes, g.attributes);
          if (g.attributes && !B(A, f.attributes) && (m ? a.attributes = A || {} : (b = { insert: f.insert }, A && (b.attributes = A))), m ? (h(a), a = ee.createFrom(i.peekLine())) : a.content.push(b), g.retain === 1 / 0 || !o.hasNext()) {
            if (i.opIterator.index !== 0 || i.opIterator.offset !== 0) {
              const T = i.restCurrentLine();
              for (let M = 0; M < T.length; M++)
                a.content.push(T[M]);
              h(a), i.nextLine();
            }
            c.push(...i.restLines());
            break;
          }
        } else typeof g.delete == "number" && f.insert === `
` && (a = ee.create(a.content, i.peekLine()?.attributes, a.id));
      }
    return c.length || c.push(a), new re(c, n);
  }
  replace(e, n) {
    return new re(e, n);
  }
  toDelta() {
    const e = Tn;
    let n = e.get(this);
    return n || (n = ee.toDelta(this.lines), e.set(this, n)), n;
  }
  equals(e, n) {
    return this === e || (n?.contentOnly || B(this.selection, e.selection)) && B(this.lines, e.lines, { excludeProps: Fn });
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
    l += t.length(a), l > n && (!r || r(a)) && (a.attributes ? c ? i?.allFormats ? c = ne.compose(c, a.attributes) : c = kn(
      c,
      a.attributes,
      i?.nameOnly
    ) : c = { ...a.attributes } : c = {});
  }
  return c || xn;
}
function kn(t, e, n) {
  return Object.keys(e).reduce(function(s, r) {
    return n ? r in t && r in e && (s[r] = !0) : B(t[r], e[r], { partial: !0 }) ? s[r] = e[r] : B(e[r], t[r], { partial: !0 }) && (s[r] = t[r]), s;
  }, {});
}
class oe {
  _pos;
  doc;
  delta;
  selection;
  activeFormats;
  constructor(e, n = new D(), s, r) {
    this._pos = 0, this.doc = e, this.delta = n, this.selection = s, this.activeFormats = r;
  }
  get contentChanged() {
    return this.delta.ops.length > 0;
  }
  get selectionChanged() {
    return this.selection !== void 0 && !B(this.selection, this.doc?.selection);
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
    let [s, r] = q(e);
    if (s === r) return this;
    if (s = Math.min(this.doc.length - 1, Math.max(0, s)), r = Math.min(this.doc.length, Math.max(0, r)), s === r) return this;
    const i = r - s;
    this.doc.selection && (this.selection = [s, s]), this.compose(s, (c) => c.delete(i), i);
    const o = this.doc.getLineRange(s);
    if (!n?.dontFixNewline && o[1] <= r) {
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
      r?.dontFixNewline ? this.compose(e, (c) => c.insert(`
`, { ...s })) : (this.compose(e, (c) => c.insert(`
`, o)), this.formatLine(e, { ...s }));
    else if (s || (s = this.getFormatAt(e)), n.includes(`
`)) {
      const c = n.split(`
`);
      this.compose(e, (l) => (c.forEach((a, h) => {
        h && l.insert(`
`, h === 1 ? o : {}), a.length && l.insert(a, s);
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
      const o = e + i.reduce((c, l) => c + Z.length(l), 0);
      this.selection = [o, o];
    }
    const r = jt(n).indexOf(`
`);
    return r !== -1 && (n = n.compose(
      new D().retain(r).retain(1, this.doc.getLineFormat(e))
    )), this.compose(e, (i) => i.concat(n)), this;
  }
  formatText(e, n) {
    return this.doc ? (e = q(e), e[1] - e[0] ? (n && Object.keys(n).forEach(
      (r) => n[r] === !1 && (n[r] = null)
    ), this.doc.getLineRanges(e).forEach(([r, i]) => {
      r = Math.max(e[0], r), i = Math.min(e[1], i - 1);
      const o = i - r;
      this.compose(r, (c) => c.retain(o, n), o);
    }), this) : this) : this;
  }
  toggleTextFormat(e, n) {
    if (!this.doc) return this;
    typeof e == "number" && (e = [e, e]), e = q(e);
    const s = this.doc.getTextFormat(e);
    return qe(n, s) && (n = ne.invert(n)), this.formatText(e, n);
  }
  formatLine(e, n, s) {
    if (!this.doc) return this;
    const r = this.doc;
    return typeof e == "number" && (e = [e, e]), e = q(e), this.doc.getLineRanges(e).forEach(([, i]) => {
      i--, s || (n = { ...ne.invert(r.getLineFormat(i)), ...n }), this.compose(i, (o) => o.retain(1, n), 1);
    }), this.delta.chop(), this;
  }
  toggleLineFormat(e, n) {
    if (!this.doc) return this;
    typeof e == "number" && (e = [e, e]), e = q(e);
    const s = this.doc.getLineFormat(e);
    return qe(n, s) && (n = ne.invert(n)), this.formatLine(e, n);
  }
  removeFormat(e) {
    if (!this.doc) return this;
    e = q(e);
    const n = ne.invert(this.doc.getFormats(e)), s = e[1] - e[0];
    return this.compose(
      e[0],
      (r) => r.retain(s, n),
      s
    );
  }
  transform(e, n) {
    const s = this.delta.transform(e.delta, n), r = e.selection && this.transformSelection(e.selection);
    return new oe(null, s, r);
  }
  transformSelection(e, n) {
    if (!e) return e;
    const s = this.delta.transformPosition(e[0], n), r = this.delta.transformPosition(e[1], n);
    return s === e[0] && r === e[1] ? e : [s, r];
  }
  transformAgainst(e, n) {
    return (e.ops ? new oe(null, e) : e).transform(this, !n);
  }
  isFor(e) {
    return this.doc === e;
  }
  clone() {
    return new oe(
      this.doc,
      new D(this.delta.ops.slice()),
      this.selection?.slice()
    );
  }
  compose(e, n, s) {
    return this._pos <= e ? this.delta = n(this.delta.retain(e - this._pos)) : this.delta = this.delta.compose(n(new D().retain(e))), this._pos = Math.max(e + (s || 0), this._pos), this;
  }
  normalizePoint(e, n = this.doc ? this.doc.length - 1 : 0) {
    return Math.max(0, Math.min(n, e));
  }
  getFormatAt(e) {
    let n;
    if (this.doc) {
      const s = this.doc.getTextFormat(e), r = this.doc.getTextFormat(e + 1);
      s && r && (n = s === r ? s : Mn(r, Object.keys(s)));
    }
    return n;
  }
}
function qe(t, e) {
  return Object.keys(t).every(
    (n) => B(e[n], t[n])
  );
}
function Mn(t, e) {
  const n = {};
  return Object.keys(t).forEach((s) => {
    t[s] === e[s] && (n[s] = t[s]);
  }), n;
}
const Ve = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap();
class In {
  on(e, n, s) {
    this.addEventListener(e, n, s);
  }
  off(e, n, s) {
    this.removeEventListener(e, n, s);
  }
  addEventListener(e, n, s) {
    s?.once && (n = dt(this, e, n, !0)), Re(this, e, !0).add(n);
  }
  removeEventListener(e, n, s) {
    if (s?.once && (n = dt(this, e, n)), !n) return;
    const r = Re(this, e);
    r && r.delete(n);
  }
  dispatchEvent(e, n) {
    let s = !1;
    e.bubbles && (e.stopImmediatePropagation = e.stopPropagation = () => s = !0);
    const r = Re(this, e.type);
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
function Re(t, e, n = !1) {
  let s = Ve.get(t);
  return !s && n && Ve.set(t, s = /* @__PURE__ */ Object.create(null)), s && s[e] || n && (s[e] = /* @__PURE__ */ new Set());
}
function dt(t, e, n, s = !1) {
  let r = _n.get(t);
  !r && s && Ve.set(t, r = /* @__PURE__ */ Object.create(null));
  const i = r && r[e] || s && (r[e] = /* @__PURE__ */ new Map());
  if (!i.has(n) && s) {
    const o = (c) => {
      const l = Re(t, e);
      l && l.delete(n), n.call(t, c);
    };
    i.set(n, o);
  }
  return i && i.get(n);
}
var ie = /* @__PURE__ */ ((t) => (t.api = "api", t.user = "user", t.history = "history", t.input = "input", t.paste = "paste", t))(ie || {});
const et = {
  renderKeys: !1
}, Rn = [], Sn = "http://www.w3.org/2000/svg", tt = "data-key", Dn = /* @__PURE__ */ new Set(["value", "selected", "checked", "contentEditable"]), le = (t) => t == null ? t : t.key, zt = (t, e) => {
  e && e !== t.key && (t.key = e, et.renderKeys && t.setAttribute(tt, e)), !e && t.key && (delete t.key, et.renderKeys && t.removeAttribute(tt));
}, pt = (t) => {
  t.currentTarget.events[t.type](t);
}, $t = (t, e, n, s, r) => {
  e === "key" || (e[0] === "o" && e[1] === "n" ? ((t.events || (t.events = {}))[e = e.slice(2)] = s) ? n || t.addEventListener(e, pt) : t.removeEventListener(e, pt) : s == null ? t.removeAttribute(e) : !r && e !== "list" && e !== "form" && e in t ? t[e] = s ?? "" : t.setAttribute(e, s));
}, Ce = (t, e) => {
  if (typeof t == "string")
    return document.createTextNode(t);
  var n = t.props, s = (e = e || t.type === "svg") ? document.createElementNS(Sn, t.type, { is: n.is }) : document.createElement(t.type, { is: n.is });
  for (var r in n) $t(s, r, null, n[r], e);
  return zt(s, le(t)), t.children.forEach((i) => s.appendChild(Ce(be(i), e))), s;
}, Ht = (t, e) => {
  const n = {};
  for (let s = 0; s < t.attributes.length; s++) {
    const { name: r, value: i } = t.attributes[s];
    r in t && r !== "list" && !e ? n[r] = t[r] : (!et.renderKeys || r !== tt) && (n[r] = i === "" ? !0 : i);
  }
  return n;
}, pe = (t, e, n, s, r) => {
  if (typeof s == "string")
    n != null && n.nodeType === Node.TEXT_NODE ? n.nodeValue !== s && (e.nodeValue = s) : (e = t.insertBefore(Ce(s, r), e), n != null && t.removeChild(n));
  else if (n == null || n.nodeName.toLowerCase() !== s.type)
    e = t.insertBefore(Ce(be(s), r), e), n != null && t.removeChild(n);
  else {
    var i = Ht(n, r), o = s.props;
    r = r || s.type === "svg";
    for (var c in { ...i, ...o })
      (Dn.has(c) ? e[c] : i[c]) !== o[c] && $t(e, c, i[c], o[c], r);
    zt(e, s.key), Wt(e, s.children, r);
  }
  return e;
}, Wt = (t, e, n, s = Array.from(t.childNodes)) => {
  for (var r, i, o, c, l = 0, a = 0, h = s.length - 1, d = e.length - 1; a <= d && l <= h && !((o = le(s[l])) == null || o !== le(e[a])); )
    pe(t, s[l], s[l++], e[a] = be(e[a++]), n);
  for (; a <= d && l <= h && !((o = le(s[h])) == null || o !== le(e[d])); )
    s[h] = pe(
      t,
      s[h],
      s[h--],
      e[d] = be(e[d--]),
      n
    );
  if (l > h) {
    const f = s[l] || s[l - 1] && s[l - 1].nextSibling || null;
    for (; a <= d; )
      t.insertBefore(Ce(e[a] = be(e[a++]), n), f);
  } else if (a > d)
    for (; l <= h; )
      t.removeChild(s[l++]);
  else {
    const f = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set();
    for (let m = l; m <= h; m++)
      (o = le(s[m])) != null && f.set(o, s[m]);
    for (; a <= d; ) {
      if (o = le(i = s[l]), c = le(e[a] = be(e[a])), g.has(o) || c != null && c === le(s[l + 1])) {
        o == null && t.removeChild(i), l++;
        continue;
      }
      c == null ? (o == null && (pe(t, i, i, e[a], n), a++), l++) : (o === c ? (pe(t, i, i, e[a], n), g.add(c), l++) : (r = f.get(c)) != null ? (pe(t, t.insertBefore(r, i), r, e[a], n), g.add(c)) : pe(t, i, null, e[a], n), a++);
    }
    for (; l <= h; )
      le(i = s[l++]) == null && t.removeChild(i);
    for (const [m, b] of f)
      g.has(m) || t.removeChild(b);
  }
  return t;
}, be = (t) => t !== !0 && t !== !1 && t ? t : "", Ut = (t, e, n, s) => ({
  type: t,
  props: e,
  children: n,
  key: s
}), On = (t) => t.nodeType === Node.TEXT_NODE ? t.nodeValue : Ut(
  t.nodeName.toLowerCase(),
  Ht(t),
  Rn.map.call(t.childNodes, On),
  le(t)
), j = (t, e, n) => typeof t == "function" ? t(e || {}, n) : Ut(t, e || {}, Array.isArray(n) ? n : n == null ? [] : [n], e?.key), ur = { createElement: j }, xe = (t, e, n) => (Array.isArray(e) ? t = Wt(t, e, t instanceof window.SVGElement, n) : t = pe(t.parentNode, t, t, e), t), Cn = /;\s*$/, Bn = {
  name: "decoration",
  selector: "span.format.decoration",
  fromDom: !1,
  render: (t, e) => st(j("span", {}, e), t, ["format", "decoration"])
}, Pn = {
  name: "decoration",
  selector: ".embed.decoration",
  fromDom: !1,
  noFill: !0,
  render: (t, e) => {
    const n = "embed decoration", { name: s, ...r } = t.decoration;
    return r.class = r.class ? n + " " + r.class : n, j(s || "span", r, e);
  }
};
class jn extends Event {
  old;
  doc;
  change;
  changedLines;
  constructor(e, n) {
    super(e, n), this.old = n.old, this.doc = n.doc, this.change = n.change, this.changedLines = n.changedLines;
  }
}
function zn(t) {
  t.typeset.formats.add(Bn), t.typeset.embeds.add(Pn);
  const e = /* @__PURE__ */ new Map();
  let n = t.doc, s = n, r = n, i = !1;
  t.on("change", h), t.on("render", f);
  function o(g) {
    if (!g) throw new TypeError("A decoration name is required");
    const m = e.get(g);
    return new $n(g, t.doc, m, a, c);
  }
  function c(g) {
    if (!g) throw new TypeError("A decoration name is required");
    const m = e.get(g);
    if (!m) return !1;
    const b = Yt(g, m, n);
    return e.delete(g), e.size ? r = r.apply(b) : r = n, i || (t.modules.rendering?.render({ old: s, doc: r }), t.modules.selection?.renderSelection()), !0;
  }
  function l() {
    e.size && e.clear(), r = n;
  }
  function a(g, m) {
    const b = e.get(g), A = b ? b.compose(m, !0) : m;
    B(A, b) || !b && !A.ops.length || (A.ops.length ? e.set(g, A) : e.delete(g), r = e.size ? r.apply(m, null) : n, i || (t.modules.rendering?.render({ old: s, doc: r }), t.modules.selection?.renderSelection()));
  }
  function h(g) {
    const { change: m, changedLines: b } = g;
    if (n = g.doc, m) {
      if (m.contentChanged) {
        for (let [A, T] of e)
          T = m.delta.transform(T, !0), T.ops.length ? e.set(A, T) : e.delete(A);
        r = e.size ? r.apply(m.delta, null) : n, e.size && r.lines.forEach((A, T) => {
          const M = n.lines[T];
          A !== M && A.id !== M.id && (A.id = M.id);
        });
      }
    } else
      l();
    d(m, b);
  }
  function d(g, m) {
    const b = { old: s, doc: n, change: g, changedLines: m };
    i = !0, t.dispatchEvent(new jn("decorate", b)), i = !1;
  }
  function f() {
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
    gatherDecorations: d,
    init() {
      d();
    },
    destroy() {
      t.off("change", h), t.off("render", f);
    }
  };
}
class $n {
  change;
  _name;
  _doc;
  _decoration;
  _apply;
  _remove;
  constructor(e, n, s, r, i) {
    this._name = e, this._doc = n, this.change = new oe(n), this._decoration = s, this._apply = r, this._remove = i;
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
    const i = this.invert(s), o = new D();
    let c = 0;
    return e.forEach((l) => {
      const [a, h] = n.getLineRange(l);
      o.retain(a - c).concat(i.slice(a, h)), c = h;
    }), this.change.setDelta(this.change.delta.compose(o)), this;
  }
  // Clear line of these decorations at position, by id, or by instance
  clearLine(e) {
    const n = this._doc, s = typeof e == "number" ? n.getLineAt(e) : typeof e == "string" ? n.getLineBy(e) : e;
    return this.clearLines([s]);
  }
  invert(e) {
    return this._decoration ? Yt(this._name, this._decoration, this._doc, e) : new D();
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
function st(t, e, n) {
  if (!e || !e.decoration) return t;
  const s = new Set(n);
  let r = "", i = t.props;
  Object.values(e.decoration).forEach((c) => {
    const { class: l, style: a, ...h } = c;
    l && s.add(l.trim()), a && (r += a.trim()), r && !Cn.test(r) && (r += ";"), i = { ...h, ...i };
  });
  const o = Array.from(s).join(" ").trim();
  return o && (i.class = i.class ? i.class + " " + o : o), r && (i.style = i.style ? i.style + ";" + r : r), t.props = i, t;
}
function Yt(t, e, n, s) {
  let r = n.toDelta();
  return s && (r = r.slice(s[0], s[1]), e = e.slice(s[0], s[1])), e = e.invert(r), e.ops.forEach((i) => {
    i.attributes?.decoration === null && (i.attributes.decoration = { [t]: null });
  }), s && (e = new D().retain(s[0]).concat(e)), e;
}
const Hn = [], gt = j("br", {}), Se = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap();
function ae(t, e) {
  return rt.get(t)?.get(e)?.[0];
}
function Be(t, e) {
  return rt.get(t)?.get(e)?.[1];
}
function it(t) {
  const { root: e, doc: n } = t, s = ge(t, n.lines), r = /* @__PURE__ */ new WeakMap();
  for (let o = 0; o < e.children.length; o++) {
    const c = e.children[o];
    if (!c.key) continue;
    const l = s.byKey[c.key];
    if (l)
      if (Array.isArray(l)) {
        r.set(c, [n.getLineRange(l[0])[0], n.getLineRange(l[l.length - 1])[1]]);
        const a = c.querySelectorAll(t.typeset.lines.selector);
        for (let h = 0; h < a.length; h++) {
          const d = a[h], f = n.getLineBy(d.key);
          f && r.set(d, n.getLineRange(f));
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
  rt.set(e, r);
}
function nt(t, e) {
  const { root: n } = t;
  t.dispatchEvent(new Event("rendering")), xe(n, Qt(t, e)), it(t), t.dispatchEvent(new Event("render")), t.dispatchEvent(new Event("rendered"));
}
function vt(t, e, n) {
  const { root: s } = t, r = ge(t, e.lines).combined, i = ge(t, n.lines).combined, [o, c] = Jt(r, i);
  B(o, c) || (o[0] = Math.max(0, o[0] - 1), c[0] = Math.max(0, c[0] - 1), o[1] = Math.min(r.length, o[1] + 1), c[1] = Math.min(i.length, c[1] + 1), s.childNodes.length !== r.length && (o[1] += s.childNodes.length - r.length));
  const l = Array.from(s.childNodes).slice(o[0], o[1]), a = i.slice(c[0], c[1]);
  if (!l.length && !a.length) return nt(t, n);
  t.dispatchEvent(new Event("rendering")), xe(s, Xt(t, a), l), it(t), t.dispatchEvent(new Event("render")), t.dispatchEvent(new Event("rendered"));
}
function Qt(t, e, n) {
  return Xt(t, ge(t, e.lines).combined, n);
}
function Xt(t, e, n) {
  return e.map((s) => Zt(t, s, n)).filter(Boolean);
}
function Zt(t, e, n) {
  return Array.isArray(e) ? Un(t, e, n) : Wn(t, e, n);
}
function Wn(t, e, n) {
  const s = Pe(t, e);
  if (!s.render) throw new Error("No render method defined for line");
  const r = s.render(e.attributes, ot(t, e), e, t, n);
  return st(r, e.attributes), r.key = e.id, r;
}
function Un(t, e, n) {
  const s = Pe(t, e[0]);
  if (!s.renderMultiple) throw new Error("No render method defined for line");
  const r = s.renderMultiple(
    e.map((i) => [i.attributes, ot(t, i), i.id]),
    t,
    n
  );
  return r.key = e[0].id, r;
}
function ge(t, e) {
  const n = yt.get(e);
  if (n) return n;
  const s = [], r = {};
  let i = [];
  e.forEach((c, l) => {
    const a = Pe(t, c);
    if (a.shouldCombine) {
      i.push(c);
      const h = e[l + 1];
      if (!h || Pe(t, h) !== a || !a.shouldCombine(i[0].attributes, h.attributes)) {
        const d = bt.get(i[0]);
        d && d.length === i.length && i.every((f, g) => d[g] === f) ? i = d : bt.set(i[0], i), s.push(i), r[i[0].id] = i, i = [];
      }
    } else a.render && (s.push(c), r[c.id] = c);
  });
  const o = { combined: s, byKey: r };
  return yt.set(e, o), o;
}
function Jt(t, e) {
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
function ot(t, e, n) {
  const { lines: s, formats: r, embeds: i } = t.typeset;
  let o = [], c = [], l = !0, a;
  return e.content.ops.forEach((h, d, f) => {
    let g = [];
    if (h.insert === "	" && h.attributes && (a = s.findByAttributes(h.attributes)) && a.child) {
      a.render && (o = je(o), l && o.push(gt), c.push(a.render(h.attributes, o, e, t, n)), o = []);
      return;
    }
    if (typeof h.insert == "string") {
      const m = f[d - 1], b = f[d + 1];
      let A = h.insert.replace(/  /g, "  ").replace(/  /g, "  ");
      (!m || typeof m.insert == "object") && (A = A.replace(/^ /, " ")), (!b || typeof b.insert == "object" || Qn(b)) && (A = A.replace(/ $/, " ")), l = !1, g.push(A);
    } else if (h.insert) {
      const m = i.findByAttributes(h.insert);
      m?.render && (g.push(m.render(h.insert, Hn, e, t, n)), m.name === "br" ? l = !0 : m.noFill || (l = !1));
    }
    h.attributes && Object.keys(h.attributes).sort((m, b) => r.priority(b) - r.priority(m)).forEach((m) => {
      const b = r.get(m);
      if (b?.render) {
        const A = b.render(h.attributes, g, e, t, n);
        A && (Se.set(A, b), g = [A]);
      }
    }), o.push.apply(o, g);
  }), o = je(o), l && o.push(gt), c.length ? c : o;
}
function Lt(t, e) {
  return t === e ? !0 : Array.isArray(t) && Array.isArray(e) && t.length === e.length && t.every((n, s) => n === e[s]);
}
function Pe(t, e) {
  let n = mt.get(e.attributes);
  return n || (n = t.typeset.lines.findByAttributes(e.attributes, !0), mt.set(e.attributes, n)), n;
}
function je(t) {
  const e = [];
  if (t.forEach((n, s) => {
    const r = e.length - 1, i = e[r];
    i && typeof i != "string" && typeof n != "string" && Se.has(i) && Se.get(i) === Se.get(n) && Yn(i.props, n.props) ? i.children = i.children.concat(n.children) : i && typeof i == "string" && typeof n == "string" ? e[r] += n : (e.push(n), i && typeof i != "string" && i.children && (i.children = je(i.children)));
  }), e.length) {
    const n = e[e.length - 1];
    n && typeof n != "string" && n.children && (n.children = je(n.children));
  }
  return e;
}
function Yn(t, e) {
  return Object.keys({ ...t, ...e }).every((n) => n.slice(0, 2) === "on" || t[n] === e[n]);
}
function Qn(t) {
  return typeof t.insert == "string" && t.insert[0] === " ";
}
function Xn(t) {
  t.on("change", n);
  function e(s) {
    if (s) {
      const { doc: r, old: i } = s;
      i && r ? vt(t, i, r) : r && nt(t, r);
    } else {
      const { doc: r } = t.modules.decorations || t;
      nt(t, r);
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
const Ye = [], Gt = {}, Kt = {}, qt = {}, Zn = (t, e) => !0;
class Jn {
  lines;
  formats;
  embeds;
  static line = de;
  static format = me;
  static embed = ct;
  constructor(e) {
    const n = e.lines?.map((i) => typeof i == "string" ? Gt[i] : i).filter(Boolean), s = e.formats?.map((i) => typeof i == "string" ? Kt[i] : i).filter(Boolean), r = e.embeds?.map((i) => typeof i == "string" ? qt[i] : i).filter(Boolean);
    this.lines = new Qe(n || Ye), this.formats = new Qe(s || Ye), this.embeds = new Qe(r || Ye);
  }
}
function de(t) {
  return t.renderMultiple && !t.shouldCombine && (t.shouldCombine = Zn), Gt[t.name] = t;
}
function me(t) {
  return Kt[t.name] = t;
}
function ct(t) {
  return qt[t.name] = t;
}
class Qe {
  // An array of the types
  list;
  // A selector which will match all nodes of this type (e.g. all lines)
  selector;
  // A map of all types by name
  types;
  // A reverse lookup of priority by type name
  priorities;
  constructor(e) {
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
const hr = ct({
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
    return n.src = e, j("img", n);
  }
}), fr = ct({
  name: "br",
  selector: "br",
  commands: (t) => () => t.insert({ br: !0 }),
  render: () => j("br")
}), dr = me({
  name: "underline",
  selector: "u",
  styleSelector: '[style*="text-decoration: underline"]',
  commands: (t) => () => t.toggleTextFormat({ underline: !0 }),
  shortcuts: "Mod+Y",
  render: (t, e) => j("u", null, e)
}), pr = me({
  name: "bold",
  selector: "strong, b",
  styleSelector: '[style*="font-weight:bold"], [style*="font-weight: bold"]',
  commands: (t) => () => t.toggleTextFormat({ bold: !0 }),
  shortcuts: "Mod+B",
  render: (t, e) => j("strong", null, e)
}), gr = me({
  name: "italic",
  selector: "em, i, u,mark",
  styleSelector: '[style*="font-style:italic"], [style*="font-style: italic"]',
  commands: (t) => () => t.toggleTextFormat({ italic: !0 }),
  shortcuts: "Mod+I",
  render: (t, e) => j("i", null, e)
}), mr = me({
  name: "mark",
  shortcuts: "Mod+M",
  selector: "mark",
  commands: (t) => () => t.toggleTextFormat({ mark: !0 }),
  render: (t, e) => j("mark", null, e)
}), br = me({
  name: "code",
  selector: "code, u",
  commands: (t) => () => t.toggleTextFormat({ code: !0 }),
  render: (t, e) => j("code", null, e)
}), yr = me({
  name: "link",
  selector: "a[href], u",
  greedy: !1,
  // If the link is a string, it is an actual address. Otherwise it is either undefined (empty) or being called from the
  // testing code (which passes a pointer to the dom object, hence the conversion to a boolean which works with the toggleTextFormat)
  commands: (t) => (e) => t.toggleTextFormat({ link: typeof e == "string" ? e : !!e }),
  fromDom: (t) => t.href,
  render: (t, e) => j("a", { href: t.link, target: "_blank" }, e)
}), vr = de({
  name: "paragraph",
  selector: "p",
  commands: (t) => () => t.formatLine({}),
  shortcuts: "Mod+0",
  render: (t, e) => j("p", null, e)
}), Lr = de({
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
  render: (t, e) => j(`h${t.header}`, null, e)
}), Er = de({
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
      const a = o.list === "ordered" ? "ol" : "ul", h = o.indent || 0;
      let d = { key: l };
      if (o.list === "check") {
        let g = function(b) {
          e.enabled && (b.preventDefault(), e.commands.toggleCheck(l));
        };
        const m = j("button", { class: "check-list-check", onmousedown: g, ontouchstart: g });
        c.length === 1 && c[0].type === "br" ? c.push(m) : c.unshift(m), d = {
          ...d,
          class: "check-list-item",
          "data-checked": "" + (o.checked || !1)
        };
      }
      const f = st(j("li", d, c), o);
      for (; h >= r.length; ) {
        const g = j(a, { start: o.start, type: o.type, key: `${l}-outer` }), m = r.length ? r[r.length - 1].children : s, b = m[m.length - 1];
        typeof b == "object" && b.type === "li" && n ? b.children.push(g) : m.push(g), r.push(g);
      }
      if (!i(r[h], a, o)) {
        const g = j(a, { start: o.start, type: o.type });
        (h ? r[h - 1].children : s).push(g), r[h] = g;
      }
      r[h].children.push(f), r.length = h + 1;
    });
    function i(o, c, l) {
      return o.type === c && (o.props.start === l.start || o.props.start && !l.start) && o.props.type === l.type;
    }
    return s[0];
  }
}), wr = de({
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
    const e = t[0][0].blockquote, n = typeof e == "string" ? { className: `quote-${e}` } : null, s = t.map(([r, i, o]) => j("p", { key: o }, i));
    return j("blockquote", n, s);
  }
}), Ar = de({
  name: "code-block",
  selector: "pre code",
  contained: !0,
  commands: (t) => () => t.toggleLineFormat({ "code-block": !0 }),
  renderMultiple: (t) => {
    const e = [];
    return t.forEach(([n, s, r]) => {
      s.length && s[s.length - 1].type === "br" && s.pop(), e.push(j("code", { key: r }, s)), e.push(`
`);
    }), j("pre", { spellcheck: !1 }, e);
  }
}), Nr = de({
  name: "hr",
  selector: "hr",
  frozen: !0,
  commands: (t) => () => {
    const { doc: e } = t, { selection: n } = e;
    if (!n) return;
    const s = q(n), r = t.change.delete(s);
    if (s[0] === s[1] && e.getLineAt(s[0]).length === 1)
      r.insert(s[0], `
`, { ...e.getLineFormat(s[0]) }).formatLine(s[0], { hr: !0 });
    else {
      const i = new D().insert(`
`, e.getLineAt(s[0]).attributes).insert(`
`, { hr: !0 });
      r.insertContent(s[0], i), r.select(s[0] + 2);
    }
    t.update(r);
  },
  render: () => j("hr")
}), xr = de({
  name: "dl",
  selector: "dl dt, dl dd",
  fromDom(t) {
    return { dl: t.nodeName.toLowerCase() };
  },
  onTab: (t, e) => {
    const { doc: n } = t, { selection: s } = n;
    if (!s) return;
    const r = e ? s[0] === s[1] || s[0] > s[1] ? s[1] : s[1] - 1 : s[0] === s[1] || s[1] > s[0] ? s[0] : s[0] - 1, i = n.getLineAt(r), o = n.lines.indexOf(i), c = n.lines[o + (e ? -1 : 1)];
    if ((c?.attributes.dl === i.attributes.dl || !c?.attributes.dl) && !e)
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
      (!n || s.dl === "dt") && e.push(j("div", {}, [])), e[e.length - 1].children.push(j(s.dl, { key: i }, r)), n = s.dl;
    return j("dl", {}, e);
  }
}), Gn = {
  lines: ["paragraph", "header", "list", "blockquote", "code-block", "hr"],
  formats: ["link", "bold", "italic", "mark", "underline"],
  embeds: ["image", "br"]
}, Kn = {
  Control: !0,
  Meta: !0,
  Shift: !0,
  Alt: !0
}, He = navigator.userAgent.indexOf("Macintosh") !== -1, Vt = He ? /Cmd/ : /Ctrl/;
class lt extends KeyboardEvent {
  shortcut;
  osShortcut;
  modShortcut;
  constructor(e, n) {
    super(e, n), this.shortcut = n?.shortcut || "", this.osShortcut = `${He ? "mac" : "win"}:${this.shortcut}`, this.modShortcut = this.shortcut.replace(Vt, "Mod");
  }
  static fromKeyboardEvent(e) {
    return e.shortcut = en(e), new lt("shortcut", e);
  }
}
function qn(t) {
  return t.shortcut = en(t), t.osShortcut = `${He ? "mac" : "win"}:${t.shortcut}`, t.modShortcut = t.shortcut.replace(Vt, "Mod"), t;
}
function en(t) {
  const e = [];
  let n = t.key;
  return n ? (n === " " && (n = "Space"), t.metaKey && e.push("Cmd"), t.ctrlKey && e.push("Ctrl"), t.altKey && e.push("Alt"), t.shiftKey && e.push("Shift"), Kn[n] || (He && t.altKey && t.code && t.code.startsWith("Key") && (n = t.code.replace("Key", "")), n.length === 1 && (n = n.toUpperCase()), e.push(n)), e.join("+")) : "";
}
const ke = {}, Vn = window.chrome && typeof window.chrome == "object";
function es(t) {
  function e(h) {
    if (h.defaultPrevented) return;
    if (t.doc.selection) {
      const { lines: V } = t.typeset, u = t.doc.getLinesAt(t.doc.selection);
      if (u.length) {
        const y = V.findByAttributes(u[0].attributes);
        if (y?.onEnter && u.every((p) => y === V.findByAttributes(p.attributes))) {
          h.preventDefault(), y.onEnter(t);
          return;
        }
      }
    }
    const {
      typeset: { lines: d },
      doc: f
    } = t;
    let { selection: g } = f;
    if (!g) return;
    h.preventDefault();
    const [m, b] = g, A = m === b, T = f.getLineAt(g[0]), [M, k] = f.getLineRange(g[0]);
    let { id: X, ...R } = T.attributes, S;
    const O = d.findByAttributes(R, !0), J = b === M, se = b === k - 1;
    if (A && a(T)) {
      const V = O.onEmptyEnter && O.onEmptyEnter(t, T), u = !O.onEmptyEnter && O !== d.default && !O.contained && !O.defaultFollows && !O.frozen;
      if ((V || u) && o(d, f.getLineAt(m)))
        return;
    }
    m === M && b === k && O.frozen ? (m === 0 ? (S = { dontFixNewline: !0 }, g = [m, m]) : b === f.length ? g = [b - 1, b - 1] : (S = { dontFixNewline: !0 }, g = [b, b]), R = O.nextLineAttributes ? O.nextLineAttributes(R) : ke) : se && (O.nextLineAttributes || O.defaultFollows || O.frozen) ? R = O.nextLineAttributes ? O.nextLineAttributes(R) : ke : J && !se && (O.defaultFollows && (R = ke), S = { dontFixNewline: !0 }), t.insert(`
`, R, g, S), m === M && b === k && O.frozen && t.select(m === 0 ? 0 : b);
  }
  function n(h) {
    if (h.defaultPrevented) return;
    const { typeset: d, doc: f } = t;
    if (!d.embeds.get("br")) return e(h);
    f.selection && (h.preventDefault(), t.insert({ br: !0 }));
  }
  function s(h) {
    i(h, -1);
  }
  function r(h) {
    i(h, 1);
  }
  function i(h, d) {
    if (h.defaultPrevented) return;
    const {
      typeset: { lines: f },
      doc: g
    } = t, { selection: m } = g;
    if (!m) return;
    const [b, A] = m, T = b === A, [M, k] = g.getLineRange(b);
    if (!(T && (!Vn || h.ctrlKey || h.altKey || h.metaKey) && (d === -1 && b !== M || d === 1 && b !== k - 1)))
      if (h.preventDefault(), d === -1 && m[0] + m[1] === 0)
        o(f, g.getLineAt(b), !0);
      else {
        const X = q(m), R = g.getLineAt(X[0]), S = f.findByAttributes(R.attributes, !0);
        if (T && (d === -1 && b === M || d === 1 && b === k - 1) && !S.contained) {
          const J = g.lines[g.lines.indexOf(R) + d], [se, V] = d === 1 ? [R, J] : [J, R];
          if (se && a(se) && V && !a(V))
            return t.update(
              t.change.delete([X[0] + d, X[0]], { dontFixNewline: !0 }),
              ie.input
            );
        }
        t.delete(d, { dontFixNewline: S.frozen });
      }
  }
  function o(h, d, f) {
    if (!d) return;
    const g = h.findByAttributes(d.attributes, !0);
    if (g) {
      if (g.indentable && d.attributes.indent)
        return t.outdent(), !0;
      if (f || g !== h.default && !g.defaultFollows)
        return t.formatLine(ke), !0;
    }
  }
  function c(h) {
    if (h.defaultPrevented) return;
    if (t.doc.selection) {
      const { lines: f } = t.typeset, g = t.doc.getLinesAt(t.doc.selection);
      if (g.length) {
        const m = f.findByAttributes(g[0].attributes);
        if (m?.onTab && g.every((b) => m === f.findByAttributes(b.attributes))) {
          h.preventDefault(), m.onTab(t, h.shiftKey);
          return;
        }
      }
    }
    h.preventDefault();
    const d = h.modShortcut;
    d === "Tab" || d === "Mod+]" ? t.indent() : t.outdent();
  }
  function l(h) {
    if (h.isComposing) return;
    qn(h);
    const d = (f) => {
      const g = f && t.shortcuts[f];
      if (g && t.commands[g])
        return h.preventDefault(), t.commands[g]() !== !1;
    };
    if (!t.root.dispatchEvent(lt.fromKeyboardEvent(h)) || d(h.shortcut) || d(h.osShortcut) || d(h.modShortcut)) {
      h.preventDefault();
      return;
    }
    switch (h.modShortcut) {
      case "Enter":
        return e(h);
      case "Shift+Enter":
        return n(h);
      case "Tab":
      case "Shift+Tab":
        return c(h);
    }
    switch (h.modShortcut?.split("+").pop()) {
      case "Backspace":
        return s(h);
      case "Delete":
        return r(h);
      default:
        return;
    }
  }
  function a(h) {
    return h.length === 1 && !t.typeset.lines.findByAttributes(h.attributes)?.frozen;
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
const ts = NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT;
function Te(t, e) {
  return (t.ownerDocument || document).createTreeWalker(t, ts, {
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
const tn = "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video", ns = /[\0-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200C\u200E-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB\uE000-\uF8FF]|\uD800[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, ss = { STYLE: !0, SCRIPT: !0, LINK: !0, META: !0, TITLE: !0 }, rs = /[ \t\n\r]+/g, is = {};
function Ae(t, e) {
  return e.nodeName !== "BR" ? !1 : os(t, e);
}
function os(t, e) {
  const n = e.closest && e.closest(t.typeset.lines.selector);
  if (!n) return !1;
  const s = Te(n);
  s.currentNode = e;
  const r = s.nextNode();
  return !r || r instanceof HTMLElement && r.matches(tn);
}
function nn(t, e) {
  return xe(document.createElement("div"), Qt(t, e, !0)).innerHTML;
}
function cs(t, e) {
  return xe(document.createElement("div"), ot(t, ee.create(e), !0)).innerHTML;
}
function Et(t, e, n) {
  return new re(sn(t, e), n);
}
function sn(t, e, n) {
  const r = new window.DOMParser().parseFromString(e, "text/html"), i = Ne(t, {
    root: r.body,
    possiblePartial: n?.possiblePartial,
    collapseWhitespace: n?.collapseWhitespace
  });
  return rn(i), i;
}
function ls(t, e) {
  return new re(Ne(t, { root: e }));
}
function Tr(t, e) {
  const n = ee.fromDelta(Ne(t, { root: e }), t.doc.byId);
  return n.length ? t.typeset.lines.findByAttributes(n[0].attributes, !0).renderMultiple ? n : n[0] : void 0;
}
function rn(t) {
  t.ops = t.filter((e) => (typeof e.insert == "string" && (e.insert = e.insert.replace(ns, "").replace(/\r\n?/g, `
`)), !!e.insert || !!e.retain || !!e.delete));
}
function Ne(t, e = is) {
  const { lines: n, embeds: s } = t.typeset, r = e.root || t.root, i = e.collapseWhitespace != null ? e.collapseWhitespace : !0;
  var o = Te(r, (m) => !ss[m.nodeName]);
  const c = new D();
  let l, a = !1, h = !1, d = !0, f, g;
  for (e.startNode ? (o.currentNode = e.startNode, o.previousNode(), e.offset && c.retain(e.offset, void 0)) : o.currentNode = r; (f = o.nextNode()) && f !== e.endNode; )
    if (Ae(t, f))
      d = !1;
    else if (f.nodeName === "BR" && f.className === "Apple-interchange-newline")
      c.insert(`
`, !l || l.unknownLine ? {} : l);
    else if (f.nodeType === Node.TEXT_NODE) {
      let m = f.parentNode;
      if (f.nodeValue == null || !f.nodeValue.replace(/\s+/g, "") && (f.parentNode === r || f.previousSibling && n.matches(f.previousSibling) || f.nextSibling && n.matches(f.nextSibling)))
        continue;
      const b = f.nodeValue, T = (i ? b.replace(rs, " ") : b).replace(/\xA0/g, " ");
      if (!T || T === " " && m.classList.contains("EOP")) continue;
      const M = wt(m, r, t);
      d = !1, c.insert(T, M);
    } else if (s.matches(f)) {
      const m = s.findByNode(f);
      if (m) {
        const b = wt(f.parentNode, r, t);
        m.fromDom !== !1 && c.insert(m.fromDom ? m.fromDom(f) : { [m.name]: !0 }, b);
      }
    } else if (n.matches(f) || f.nodeType === Node.ELEMENT_NODE && f.matches(tn)) {
      if (h = !n.matches(f), h) {
        let b = f.parentNode;
        for (; b && !n.matches(b) && b !== r; )
          b = b.parentNode;
        if (b && b !== r)
          continue;
      }
      const m = n.findByNode(f, !0);
      if (m === n.default && (!f.parentNode || n.matches(f.parentNode)))
        continue;
      if (m.frozen)
        for (; o.lastChild(); ) ;
      if (g && (c.insert("	", g), g = null), m.child || (a ? (!l || !l.unknownLine || !d) && (c.insert(`
`, !l || l.unknownLine ? {} : l), d = !0) : a = !0), h)
        l = { unknownLine: h };
      else if (m && m !== n.default) {
        const b = m.fromDom ? m.fromDom(f) : { [m.name]: !0 };
        m.child ? g = b : l = b;
      } else
        l = {};
      !m.child && e.includeIds && f.key && (l.id = f.key);
    }
  return (!h || !d) && (a || !e.possiblePartial) && c.insert(`
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
const Xe = [null, 0];
function as(t, e, n) {
  const s = t.root.ownerDocument;
  if ("caretPositionFromPoint" in s)
    try {
      const r = s.caretPositionFromPoint(e, n);
      if (r)
        return ze(t, r.offsetNode, r.offset);
    } catch {
    }
  if (s.caretRangeFromPoint) {
    const r = s.caretRangeFromPoint(e, n);
    if (r)
      return ze(t, r.startContainer, r.startOffset);
  }
  return null;
}
function Fr(t, e) {
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
function us(t, e) {
  e[0] > e[1] && (e = [e[1], e[0]]);
  const [n, s, r, i] = cn(t, e), o = t.root.ownerDocument.createRange();
  return n && r && (o.setStart(n, s), o.setEnd(r, i)), o;
}
function At(t, e) {
  const n = us(t, e);
  if (n?.endContainer.nodeType === Node.ELEMENT_NODE)
    try {
      n.setEnd(n.endContainer, n.endOffset + 1);
    } catch {
    }
  return n;
}
function ze(t, e, n, s) {
  const { root: r } = t, { lines: i } = t.typeset;
  if (!r.contains(e))
    return -1;
  if (e.nodeType === Node.ELEMENT_NODE) {
    if (e.childNodes.length === n) {
      if (Be(r, e) != null) return Be(r, e) - 1;
      e.childNodes.length && (e = e.childNodes[n - 1], n = fs(t, e));
    } else
      e = e.childNodes[n], n = 0;
    const o = ae(r, e);
    if (o != null)
      return i.findByNode(e)?.frozen ? o + n : (s == null || s < o ? o : o - 1) + n;
  }
  return on(t, e) + n;
}
function on(t, e) {
  const { root: n } = t;
  if (!n.ownerDocument) return -1;
  const { lines: s, embeds: r } = t.typeset, i = Te(n);
  i.currentNode = e;
  let o, c = 0, l;
  for (; (o = i.previousNode()) && o !== n; )
    if ((l = ae(n, o)) != null) {
      c += l;
      break;
    } else o.nodeType === Node.TEXT_NODE ? c += $e(s, o) : o.classList?.contains("decoration") || (r.matches(o) && !Ae(t, o) || s.matches(o) && !o.contains(e)) && c++;
  return c;
}
function hs(t, e) {
  const { root: n } = t;
  return n.ownerDocument ? Array.from(n.querySelectorAll(t.typeset.lines.selector)).find(
    (r) => ae(n, r) <= e && Be(n, r) > e
  ) : void 0;
}
function fs(t, e) {
  const { lines: n, embeds: s } = t.typeset;
  if (s.matches(e) && !Ae(t, e))
    return 1;
  if (e.nodeType === Node.TEXT_NODE) return $e(n, e);
  const r = Te(e);
  let i = n.findByNode(e) ? 1 : 0, o;
  for (; o = r.nextNode(); )
    o.nodeType === Node.TEXT_NODE ? i += $e(n, o) : o.classList?.contains("decoration") || (s.matches(o) && !Ae(t, o) || n.matches(o)) && i++;
  return i;
}
function cn(t, e) {
  if (e == null)
    return [null, 0, null, 0];
  {
    const n = e[0] <= e[1], s = n ? 1 : -1, r = e[0] === e[1], [i, o, c] = Nt(t, e[0], n ? 0 : 1), [l, a] = r && !c ? [i, o] : c && (r || e[1] - e[0] === s * t.doc.getLineAt(e[0]).length) ? [i, o + (n ? 1 : -1)] : Nt(t, e[1], n ? 1 : 0);
    return [i, o, l, a];
  }
}
function Nt(t, e, n) {
  const { root: s } = t;
  if (!s.ownerDocument) return Xe;
  const { lines: r, embeds: i } = t.typeset, o = Array.from(s.childNodes), c = hs(t, e);
  if (!c) return Xe;
  if (r.findByNode(c, !0).frozen)
    return [c.parentNode, o.indexOf(c) + n, !0];
  e -= ae(s, c);
  const a = !e, h = Te(c);
  let d, f = !1;
  for (; d = h.nextNode(); )
    if (d.nodeType === Node.TEXT_NODE) {
      const g = $e(r, d);
      if (e <= g) return [d, e];
      e -= g;
    } else if (!d.classList?.contains("decoration")) {
      if (i.matches(d) && !Ae(t, d)) {
        const g = i.findByNode(d);
        if (!g || g.fromDom === !1)
          continue;
        if (e -= 1, e <= 0) {
          const m = Array.from(d.parentNode.childNodes);
          return [d.parentNode, m.indexOf(d) + 1 + e];
        }
      } else if (r.matches(d) && (f ? e -= 1 : f = !0, e === 0)) {
        const g = h.firstChild();
        if (g && g.nodeType === Node.TEXT_NODE)
          return [g, 0];
        if (g) {
          const m = Array.from(d.childNodes);
          return [d, m.indexOf(g)];
        } else
          return [d, 0];
      }
    }
  return a ? [c, 0] : Xe;
}
function $e(t, e) {
  const n = e.nodeValue || "";
  return n.trim() || !(t.matches(e.previousSibling) || t.matches(e.nextSibling)) ? n.length : 0;
}
function ln(t) {
  const { root: e } = t, n = t.doc.selection;
  if (!e.ownerDocument) return null;
  const s = e.ownerDocument.getSelection(), { lines: r } = t.typeset;
  if (s == null || s.anchorNode == null || s.focusNode == null || !e.contains(s.anchorNode))
    return null;
  {
    const i = ze(
      t,
      s.anchorNode,
      s.anchorOffset,
      n && n[0]
    ), o = s.anchorNode === s.focusNode && s.anchorOffset === s.focusOffset, c = r.findByAttributes(t.doc.getLineAt(i)?.attributes, !0).frozen;
    let l = o ? i : ze(
      t,
      s.focusNode,
      s.focusOffset,
      !c && n ? n[1] : null
    );
    return [i, l];
  }
}
function De(t, e) {
  const { root: n } = t;
  if (!n.ownerDocument) return;
  const s = n.ownerDocument.getSelection();
  if (!s) return;
  const r = s.anchorNode && n.contains(s.anchorNode) && document.activeElement !== document.body;
  if (e == null)
    r && (s.removeAllRanges(), n.classList.contains("focus") && n.classList.remove("focus"));
  else {
    const [i, o, c, l] = cn(t, e), a = e[0] === e[1] ? "Caret" : "Range";
    i && c && (s.anchorNode !== i || s.anchorOffset !== o || s.focusNode !== c || s.focusOffset !== l || s.type !== a) && s.setBaseAndExtent(i, o, c, l), r || n.focus(), n.classList.contains("focus") || n.classList.add("focus");
  }
  n.dispatchEvent(new Event("select", { bubbles: !0 }));
}
const ds = navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform), ps = ds || /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, xt = !ps && /Mobi|Android/.test(navigator.userAgent) && !window.MSStream, gs = {
  characterData: !0,
  characterDataOldValue: !0,
  subtree: !0,
  childList: !0
};
function ms(t) {
  let e = !1, n = !1, s = [];
  function r(b) {
    n = !0;
  }
  function i(b) {
    n = !1, s.length && (l(s), s = []);
  }
  function o() {
    if (n) return;
    const b = d.takeRecords();
    b.length && l(b);
  }
  function c(b) {
    let A = !1;
    const T = b.ops[b.ops.length - 1];
    return T?.insert && T.insert.br && (A = !0), A;
  }
  function l(b) {
    if (n) {
      s.push(...b);
      return;
    }
    if (!t.enabled)
      return t.render();
    let A = a(b), T = ln(t);
    if (!A) {
      const M = ys(t.root, b);
      A = h(M);
    }
    if (e && (c(A) && (A.ops.pop(), A.insert(`
`)), T !== null && (T[0]++, T[1]++), e = !1), A && A.ops.length) {
      rn(A);
      const M = t.doc;
      t.update(new oe(t.doc, A, T, t.activeFormats), ie.input), t.doc.lines === M.lines && t.render();
    }
  }
  function a(b) {
    const A = bs(b);
    if (!A || A.oldValue == null || A.target.nodeValue == null) return null;
    const T = new D(), M = on(t, A.target);
    T.retain(M);
    let k;
    return t.doc.selection && (k = q(t.doc.selection)[0] - M, k < 0 && (k = 0)), he(
      A.oldValue.replace(/\xA0/g, " "),
      A.target.nodeValue.replace(/\xA0/g, " "),
      k
    ).forEach(([R, S]) => {
      R === he.EQUAL ? T.retain(S.length) : R === he.DELETE ? T.delete(S.length) : R === he.INSERT && T.insert(S, t.activeFormats);
    }), T.chop(), T;
  }
  function h(b) {
    const { doc: A } = t;
    if (b) {
      const [T, M] = b, k = ae(t.root, T), X = Be(t.root, M), R = Ne(t, {
        startNode: T,
        endNode: M.nextElementSibling || void 0,
        collapseWhitespace: !1
      });
      let S = A.toDelta().slice(k, X).diff(R);
      return S.ops.length && k && (S = new D().retain(k).concat(S)), S;
    } else {
      const T = Ne(t, { collapseWhitespace: !1 });
      return A.toDelta().diff(T);
    }
  }
  const d = new window.MutationObserver(l);
  function f() {
    d.disconnect();
  }
  function g() {
    d.observe(t.root, gs);
  }
  function m(b) {
    b.data && b.data?.includes(`
`) && (e = !0);
  }
  return {
    allowComposition(b = !0) {
      b ? (t.root.addEventListener("compositionstart", r), t.root.addEventListener("compositionend", i)) : (t.root.removeEventListener("compositionstart", r), t.root.removeEventListener("compositionend", i));
    },
    init() {
      t.root.addEventListener("input", o), t.on("rendering", f), t.on("render", g), xt && t.root.addEventListener("beforeinput", m);
    },
    destroy() {
      d.disconnect(), t.root.removeEventListener("input", o), t.root.removeEventListener("compositionstart", r), t.root.removeEventListener("compositionend", i), t.off("rendering", f), t.off("render", g), xt && t.root.removeEventListener("beforeinput", m);
    }
  };
}
function bs(t) {
  const e = /* @__PURE__ */ new Set();
  if (t = t.filter((o) => o.type !== "characterData" ? !0 : e.has(o.target) ? !1 : (e.add(o.target), !0)), t.length > 3) return null;
  const n = t.find((o) => o.type === "characterData");
  if (!n) return null;
  const s = t.find((o) => o.addedNodes.length === 1 && o.addedNodes[0].nodeName === "#text"), r = t.find((o) => o.addedNodes.length === 1 && o.addedNodes[0].nodeName === "BR" || o.removedNodes.length === 1 && o.removedNodes[0].nodeName === "BR");
  return 1 + (s ? 1 : 0) + (r ? 1 : 0) < t.length || s && s.addedNodes[0] !== n.target ? null : n;
}
function ys(t, e) {
  let n, s;
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (i.target === t) return;
    const o = vs(t, i.target);
    if (o && o.key)
      (!n || ae(t, o) < ae(t, n)) && (n = o), (!s || ae(t, o) > ae(t, s)) && (s = o);
    else
      return;
  }
  if (n && s) return [n, s];
}
function vs(t, e) {
  for (; e && e.parentNode !== t; ) e = e.parentNode;
  return e;
}
function Ls(t) {
  let e, n, s = !1;
  function r() {
    if (!t.enabled) return;
    const f = ln(t), g = f?.slice() || null;
    if (!f && s) return;
    if (s && (s = !1), f) {
      f[0] === f[1] && f[0] === t.doc.length && f[0]--;
      let b = t.doc.getLineAt(f[0]), A = t.typeset.lines.findByAttributes(b.attributes, !0);
      f && f[0] === f[1] && t.doc.selection && t.doc.selection[0] === f[0] && t.doc.selection[1] === f[0] + 1 && (A.frozen && (f[0]--, f[1]--), b = t.doc.getLineAt(f[0]), A = t.typeset.lines.findByAttributes(b.attributes, !0)), A.frozen && f[0] === f[1] && f[1]++;
    }
    const { doc: m } = t;
    if (B(m.selection, f))
      B(g, f) || De(t, f);
    else {
      if (f && f[0] === f[1] && f[0] >= m.length)
        return;
      t.select(f);
    }
  }
  function i() {
    s || !t.enabled || De(t, t.doc.selection);
  }
  function o() {
    const {
      doc: f,
      typeset: { lines: g }
    } = t, m = t.modules.decorations.getDecorator("selection");
    m.clear();
    const b = f.selection;
    b && f.getLinesAt(b).forEach((A) => {
      if (g.findByAttributes(A.attributes, !0).frozen) {
        const T = B(b, f.getLineRange(A));
        m.decorateLine(f.getLineRange(A)[0], { class: "selected" + (T ? " focus" : "") });
      }
    }), m.apply();
  }
  function c(f) {
    let g = f.target;
    for (; g.parentNode && g.parentNode !== t.root; ) g = g.parentNode;
    const m = ae(t.root, g), b = m != null && t.doc.getLineAt(m), A = b && t.typeset.lines.findByAttributes(b.attributes);
    m != null && b && A && A.frozen && (f.preventDefault(), t.select([m, m + b.length]));
  }
  function l(f) {
    const g = f.doc?.selection || t.doc.selection;
    De(t, g);
  }
  function a() {
    t.root.classList.toggle("window-inactive", !e.hasFocus());
  }
  function h() {
    s = !0;
    const { selection: f } = t.doc;
    e.getSelection()?.empty();
    const { decorations: g } = t.modules;
    f && f[0] !== f[1] && g && g.getDecorator("pausedSelection").decorateText(f, { class: "selected" }).apply();
  }
  function d() {
    s = !1;
    const { decorations: f } = t.modules;
    f && f.removeDecorations("pausedSelection"), setTimeout(i);
  }
  return {
    pause: h,
    resume: d,
    renderSelection: i,
    init() {
      e = t.root.ownerDocument, n = e.defaultView, e.addEventListener("selectionchange", r), n.addEventListener("focus", a), n.addEventListener("blur", a), t.root.addEventListener("mousedown", c), t.on("change", l), t.on("decorate", o);
    },
    destroy() {
      e.removeEventListener("selectionchange", r), n.removeEventListener("focus", a), n.removeEventListener("blur", a), t.root.removeEventListener("mousedown", c), t.off("change", l), t.off("decorate", o), s = !1, e = null, n = null;
    }
  };
}
const Es = { dontFixNewline: !0 }, Tt = { excludeProps: /* @__PURE__ */ new Set(["id"]) };
class ws extends Event {
  delta;
  html;
  text;
  constructor(e, n) {
    super(e, n), this.delta = n.delta, this.html = n.html, this.text = n.text;
  }
}
function As(t, e) {
  const n = e?.allowHTMLPaste ?? !0;
  function s({ selection: i, text: o, html: c }) {
    const { doc: l } = t;
    if (i = i || l.selection, i = i && q(i), !i) return;
    const [a, h] = i;
    let d;
    if (c)
      e?.htmlParser ? d = e.htmlParser(t, c) : d = sn(t, c, { possiblePartial: !0 });
    else {
      if (!o) return;
      d = new D().insert(o.replace(/\xA0/g, " ").replace(/\r\n/g, `
`));
    }
    const f = d.filter((b) => typeof b.insert == "string" && b.insert.includes(`
`)).length > 0;
    let g = d.length();
    if (f) {
      let b = ee.fromDelta(d, l.byId);
      d = ee.toDelta(b), g = d.length();
      const A = l.getLineAt(a), T = l.getLineAt(h), M = Me(A), k = A === T ? M : Me(T);
      c || (b = b.map((V) => ({ ...V, attributes: A.attributes })), M !== k && (b[b.length - 1].attributes = T.attributes));
      const X = b[0], R = Me(X), S = b[b.length - 1], O = X === S ? R : Me(S);
      a !== l.getLineRange(A)[0] && !B(M, R, Tt) && (d = new D().insert(`
`, M).concat(d), g++);
      const J = d.ops[d.ops.length - 1].insert, se = typeof J == "string" && J.endsWith(`
`);
      se && h !== l.getLineRange(T)[1] && B(k, O, Tt) ? d = d.slice(0, --g) : se && h === l.getLineRange(T)[1] - 1 && (d.delete(1), g--);
    }
    const m = new ws("paste", { delta: d, html: c, text: o, cancelable: !0 });
    if (t.dispatchEvent(m), d = m.delta, !m.defaultPrevented)
      if (d && d.ops.length) {
        const b = t.change.delete(i, f ? Es : void 0);
        b.insertContent(a, d).select(a + g), t.update(b, ie.paste);
      } else a !== h && t.delete([a, h]);
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
function Me(t) {
  const { id: e, ...n } = t.attributes;
  return n;
}
const Ns = xs();
function xs(t = {}) {
  return function(e) {
    let n = 0, s = "", r = !1, i = Ft();
    const o = { maxStack: 500, delay: 0, unrecordedSources: /* @__PURE__ */ new Set(), ...t };
    function c(k) {
      k.inputType === "historyUndo" ? (k.preventDefault(), l()) : k.inputType === "historyRedo" && (k.preventDefault(), a());
    }
    function l() {
      m("undo", "redo");
    }
    function a() {
      m("redo", "undo");
    }
    function h() {
      return i.undo.length > 0;
    }
    function d() {
      return i.redo.length > 0;
    }
    function f() {
      n = 0;
    }
    function g() {
      i = Ft();
    }
    function m(k, X) {
      if (i[k].length === 0) return;
      const R = i[k].pop();
      i[X].push(R), f(), r = !0, e.update(R[k], ie.history), r = !1;
    }
    function b(k, X) {
      const R = Date.now(), S = Fs(k);
      i.redo.length = 0;
      const O = new oe(null, k.delta.invert(X.toDelta()), X.selection);
      if ((!S || s !== S) && f(), s = S, n && (!o.delay || n + o.delay > R) && i.undo.length) {
        const J = i.undo[i.undo.length - 1];
        J.redo.delta = J.redo.delta.compose(k.delta), J.redo.selection = k.selection, J.undo.delta = O.delta.compose(J.undo.delta);
      } else {
        const J = new oe(null, k.delta, k.selection);
        n = R, i.undo.push({ redo: J, undo: O });
      }
      i.undo.length > o.maxStack && i.undo.shift();
    }
    function A({ change: k, old: X, source: R }) {
      if (!k) return g();
      if (!r) {
        if (!k.contentChanged) return f();
        R !== ie.api && !o.unrecordedSources.has(R) ? b(k, X) : Ts(i, k);
      }
    }
    function T(k) {
      i = k;
    }
    function M() {
      return i;
    }
    return {
      options: o,
      hasUndo: h,
      hasRedo: d,
      undo: l,
      redo: a,
      cutoffHistory: f,
      clearHistory: g,
      setStack: T,
      getStack: M,
      getActive() {
        return { undo: h(), redo: d() };
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
        e.on("change", A), e.root.addEventListener("beforeinput", c);
      },
      destroy() {
        e.off("change", A), e.root.removeEventListener("beforeinput", c);
      }
    };
  };
}
function Ft() {
  return {
    undo: [],
    redo: []
  };
}
function Ts(t, e) {
  const n = e.ops ? new oe(null, e) : e;
  t.undo.forEach((s) => {
    s.undo = n.transform(s.undo, !0), s.redo = n.transform(s.redo, !0);
  }), t.redo.forEach((s) => {
    s.undo = n.transform(s.undo, !0), s.redo = n.transform(s.redo, !0);
  });
}
function Fs(t) {
  const { ops: e } = t.delta;
  let n = 0, s = e.length - 1;
  if (e[n].retain && !e[n].attributes && n++, e[s].retain === 1 && e[s].attributes?.id && s--, n === s) {
    const r = e[n];
    if (r.delete) return "delete";
    if (r.insert === `
`) return "newline";
    if (typeof r.insert == "string") return "insert";
  }
  return "";
}
const ks = { keyboard: es, input: ms, copy: Ss, paste: As, history: Ns, decorations: zn, rendering: Xn, selection: Ls }, ve = {}, an = [], kt = ["focus", "blur", "keydown", "mousedown", "mouseup", "click"], Mt = /* @__PURE__ */ new WeakMap();
class Le extends Event {
  old;
  doc;
  change;
  changedLines;
  source;
  constructor(e, n) {
    super(e, n), this.old = n.old, this.doc = n.doc, this.change = n.change, this.changedLines = n.changedLines, this.source = n.source, Object.setPrototypeOf(this, Le.prototype);
  }
  // Modify the data during a "changing" event before doc is committed
  modify(e) {
    if (!this.cancelable) throw new Error('Cannot modify an applied change, listen to the "changing" event');
    this.doc = this.doc.apply(e), this.change && (this.change.delta = this.change.delta.compose(e)), this.changedLines && (this.changedLines = this.old.lines === this.doc.lines ? an : un(this.old, this.doc));
  }
}
class _t extends Event {
  formats;
  constructor(e, n) {
    super(e, n), this.formats = n.formats;
  }
}
class kr extends In {
  identifier;
  typeset;
  doc;
  activeFormats = ve;
  commands = {};
  shortcuts = {};
  modules = {};
  catchErrors;
  throwOnError;
  _root;
  _modules;
  _enabled;
  constructor(e = {}) {
    super(), this.catchErrors = !e.dev, this.identifier = e.identifier, this.typeset = new Jn(e.types || Gn), e.doc ? this.doc = e.doc : e.html ? this.doc = Et(this, e.html) : e.text ? this.doc = new re(new D().insert(e.text)) : this.doc = new re(), this.throwOnError = e.throwOnError || !1, this._enabled = e.enabled === void 0 ? !0 : e.enabled;
    const n = e.includeDefaultModules ?? !0;
    this._modules = n ? { ...ks, ...e.modules } : { ...e.modules }, e.root && this.setRoot(e.root);
  }
  get root() {
    return this._root || this.setRoot(document.createElement("div")), this._root;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    e = !!e;
    const n = this._enabled !== e;
    !e && this.doc.selection && this.select(null, ie.api), this._enabled = e, this._root && (this._root.contentEditable = e ? "true" : "inherit"), n && this.dispatchEvent(new Event("enabledchange"));
  }
  get change() {
    const e = new oe(this.doc);
    return e.apply = (n = ie.user) => this.update(e, n), e;
  }
  setRoot(e) {
    if (!e) throw new TypeError("Root must be set, cannot be " + e);
    return this.destroy(), this._root = e, this.init(), this.dispatchEvent(new Event("root")), this;
  }
  update(e, n = ie.user) {
    if (!this.enabled && n !== ie.api)
      return this;
    const s = e.ops ? new oe(this.doc, e) : e, r = this.doc, i = r.apply(s, void 0, this.throwOnError), o = r.lines === i.lines ? an : un(r, i);
    return this.set(i, n, s, o), this;
  }
  set(e, n = ie.user, s, r) {
    const i = this.doc, o = e.ops ? new re(e) : e;
    if (!this.enabled && n !== ie.api || !o || i.equals(o))
      return this;
    const c = new Le("changing", {
      cancelable: !0,
      old: i,
      doc: o,
      change: s,
      changedLines: r,
      source: n
    });
    return this.dispatchEvent(c, this.catchErrors), c.defaultPrevented || i.equals(c.doc) ? this : (this.activeFormats = s?.activeFormats ? s.activeFormats : _e(this, c.doc), this.doc = c.doc, this.dispatchEvent(new Le("change", { ...c, cancelable: !1 }), this.catchErrors), this.dispatchEvent(new Le("changed", { ...c, cancelable: !1 }), this.catchErrors), this);
  }
  getHTML() {
    return nn(this, this.doc);
  }
  setHTML(e, n = this.doc.selection, s) {
    return this.set(Et(this, e, n), s);
  }
  getDelta() {
    return this.doc.toDelta();
  }
  setDelta(e, n = this.doc.selection, s) {
    return this.set(new re(e, n), s);
  }
  getText(e) {
    return this.doc.getText(e);
  }
  setText(e, n = this.doc.selection, s) {
    return this.set(new re(new D().insert(e), n), s);
  }
  trimSelection(e) {
    if (!e) return e;
    const n = this.getText(e), [s, r] = q([...e]);
    if (n.trim()) {
      const [i, o, c, l] = n.match(/(^ *)((?:.|\r|\n)*?)( *$)/);
      if (c && (o || l))
        return [s + o.length, r - l.length];
    }
    return e;
  }
  getActive() {
    const { selection: e } = this.doc;
    let n = e ? e[0] === e[1] ? { ...this.activeFormats, ...this.doc.getLineFormat(e) } : { ...this.doc.getFormats(e) } : {};
    return Object.values(this.modules).forEach((s) => {
      s.getActive && (n = { ...n, ...s.getActive() });
    }), n;
  }
  select(e, n) {
    return this.update(this.change.select(e), n);
  }
  insert(e, n, s = this.doc.selection, r) {
    if (!s) return this;
    const i = B(s, this.doc.selection);
    n == null && typeof e == "string" && e !== `
` && (n = i ? this.activeFormats : _e(this, this.doc, s));
    const o = this.typeset.lines.findByAttributes(n, !0), c = this.change.delete(s), l = q(s)[0];
    if (i && c.setActiveFormats(e !== `
` && n || _e(this, this.doc, s)), e === `
` && o.frozen) {
      const a = { ...this.doc.getLineFormat(l) }, h = { ...n };
      let d = { ...a };
      const f = new D().insert(`
`, a);
      this.doc.getLineRange(l)[1] - 1 !== l ? f.insert(`
`, h) : d = h, c.insertContent(l, f).formatLine(l, d).select(l + 2);
    } else
      c.insert(l, e, n, r);
    return this.update(c);
  }
  insertContent(e, n = this.doc.selection) {
    if (!n) return this;
    const s = this.change.delete(n).insertContent(n[0], e);
    return this.update(s);
  }
  delete(e, n) {
    let s, r = 0;
    const {
      typeset: { lines: i },
      doc: o
    } = this;
    if (Array.isArray(e))
      s = q(e);
    else {
      if (!this.doc.selection) return this;
      s = q(this.doc.selection), e && (s[0] === s[1] ? e < 0 ? s = [s[0] + e, s[1]] : s = [s[0], Math.min(s[1] + e, this.doc.length - 1)] : e < 0 && i.findByAttributes(o.getLineAt(s[0]).attributes, !0).frozen && (r = -1));
    }
    const c = _e(this, this.doc, [s[0] + 1, s[0] + 1]), l = this.doc.length - (s[1] - s[0]);
    let a = Math.max(0, Math.min(l - 1, s[0] + r));
    const h = this.change.delete(s, n).select(a).setActiveFormats(c);
    return this.update(h);
  }
  formatText(e, n = this.doc.selection) {
    return n ? (typeof e == "string" && (e = { [e]: !0 }), n[0] === n[1] ? (this.activeFormats = ne.compose(this.activeFormats, e) || ve, this.dispatchEvent(new _t("format", { formats: this.activeFormats })), this) : (ye(this, "formatText", e, n), this)) : this;
  }
  toggleTextFormat(e, n = this.doc.selection) {
    return n ? (typeof e == "string" && (e = { [e]: !0 }), n[0] === n[1] ? (qe(e, this.activeFormats) && (e = ne.invert(e)), this.activeFormats = ne.compose(this.activeFormats, e) || ve, this.dispatchEvent(new _t("format", { formats: this.activeFormats })), this) : (ye(this, "toggleTextFormat", e, n), this)) : this;
  }
  formatLine(e, n = this.doc.selection) {
    return typeof e == "string" && (e = { [e]: !0 }), ye(this, "formatLine", e, n), this;
  }
  toggleLineFormat(e, n = this.doc.selection) {
    return typeof e == "string" && (e = { [e]: !0 }), ye(this, "toggleLineFormat", e, n), this;
  }
  indent() {
    return Rt(this, 1), this;
  }
  outdent() {
    return Rt(this, -1), this;
  }
  removeFormat(e = this.doc.selection) {
    return ye(this, "removeFormat", null, e), this;
  }
  getBounds(e, n, s) {
    if (typeof e == "number" && (e = [e, e]), !e) return;
    let r = At(this, e)?.getBoundingClientRect();
    if (r && n) {
      const i = n.getBoundingClientRect(), o = (s ? n.scrollLeft : 0) - i.x, c = (s ? n.scrollTop : 0) - i.y;
      r = new DOMRect(r.x + o, r.y + c, r.width, r.height);
    }
    return r;
  }
  getAllBounds(e, n, s) {
    typeof e == "number" && (e = [e, e]);
    const r = At(this, e)?.getClientRects();
    let i = r && Array.from(r);
    if (i && n) {
      const o = n.getBoundingClientRect(), c = (s ? n.scrollLeft : 0) - o.x, l = (s ? n.scrollTop : 0) - o.y;
      i = i.map((a) => new DOMRect(a.x + c, a.y + l, a.width, a.height));
    }
    return i;
  }
  getIndexFromPoint(e, n) {
    return as(this, e, n);
  }
  render() {
    return this.modules.decorations?.gatherDecorations(), this.modules.rendering?.render(), this.modules.selection?.renderSelection(), this;
  }
  init() {
    const e = this._root;
    e.editor && e.editor.destroy(), e.editor = this, this.enabled = this._enabled, this.commands = {}, kt.forEach((n) => this._root.addEventListener(n, St(this))), this.typeset.lines.list.forEach((n) => n.commands && Ie(this, n.name, n.commands(this))), this.typeset.formats.list.forEach((n) => n.commands && Ie(this, n.name, n.commands(this))), this.typeset.embeds.list.forEach((n) => n.commands && Ie(this, n.name, n.commands(this))), Object.keys(this._modules).forEach((n) => {
      if (!this._modules[n]) return;
      const s = this.modules[n] = this._modules[n](this);
      s.commands && Ie(this, n, s.commands);
    }), this.shortcuts = _s(this), Object.keys(this.modules).forEach((n) => this.modules[n].init?.()), this.render();
  }
  destroy() {
    const e = this._root;
    e && (kt.forEach((n) => e.removeEventListener(n, St(this))), Object.values(this.modules).forEach((n) => n.destroy && n.destroy()), this._root = void 0, delete e.editor);
  }
}
function ye(t, e, n, s) {
  if (!s) return;
  if (s = typeof s == "number" ? [s, s] : t?.trimSelection(s), !(e in t.change)) throw new Error("Invalid operation: " + e);
  const r = t.change[e](s, n);
  t.update(r);
}
function _e(t, e, n = e.selection) {
  const { formats: s } = t.typeset;
  if (!n || n[0] === 0) return ve;
  const r = q(n)[0];
  let i = r, o = r + 1;
  const c = e.getTextFormat(i), l = e.getTextFormat(o), a = {};
  return Object.keys(c).forEach((h) => {
    const d = s.get(h);
    d && d.greedy !== !1 && (a[h] = c[h]);
  }), Object.keys(l).forEach((h) => {
    const d = s.get(h);
    d && d.greedy === !1 && (a[h] = c[h]);
  }), a;
}
function un(t, e) {
  const n = new Set(t.lines);
  return e.lines.filter((s) => !n.has(s));
}
function Ie(t, e, n) {
  n && (typeof n == "function" ? t.commands[e] = It(t, n) : Object.keys(n).forEach((s) => t.commands[s] = It(t, n[s])));
}
function It(t, e) {
  return (...n) => {
    const s = e(...n);
    return t.doc.selection && t.root.focus(), s;
  };
}
function Rt(t, e = 1) {
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
    a === 0 && (a = null), i.formatLine(l[0], a < 0 ? ve : { ...o.attributes, indent: a });
  }), t.update(i);
}
function St(t) {
  let e = Mt.get(t);
  return e || (e = Ms.bind(t), Mt.set(t, e)), e;
}
function Ms(t) {
  this.dispatchEvent(t);
}
function _s(t) {
  const e = {}, {
    typeset: { lines: n, formats: s, embeds: r },
    modules: i
  } = t;
  return Ze(n, e), Ze(s, e), Ze(r, e), Is(i, e), e;
}
function Ze(t, e) {
  t.list.forEach((n) => {
    const s = n.shortcuts;
    s && (typeof s == "string" ? e[s] = n.name : hn(s, e));
  });
}
function Is(t, e) {
  Object.keys(t).forEach((n) => {
    const s = t[n]?.shortcuts;
    s && hn(s, e);
  });
}
function hn(t, e) {
  Object.keys(t).forEach((n) => e[n] = t[n]);
}
const Rs = {
  copyPlainText: !0,
  copyHTML: !0
}, Dt = { text: "", html: "" };
function Ss(t, e = Rs) {
  function n(i) {
    const { doc: o } = t, c = q(i || o.selection);
    if (!c) return Dt;
    const l = o.slice(c[0], c[1]);
    if (!l.ops.length) return Dt;
    const a = l.map((d) => typeof d.insert == "string" ? d.insert : " ").join("");
    let h;
    return a.includes(`
`) ? (l.push({ insert: `
`, attributes: o.getLineFormat(c[1]) }), h = nn(t, new re(l))) : h = cs(t, l), { text: a, html: h };
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
function Mr(t, e) {
  return (n) => {
    function s({ doc: r }) {
      const i = n.modules.decorations.getDecorator("placeholder"), o = (typeof t == "function" ? t() : t) || "";
      let c;
      if (i.hasDecorations()) {
        const d = i.getDecoration().ops;
        c = d[d.length - 1].attributes?.decoration?.placeholder;
      }
      const { lines: l } = n.typeset, a = l.findByAttributes(r.lines[0]?.attributes, !0), h = l.default === a && r.length === 1;
      if (h || e?.keepAttribute) {
        const d = { "data-placeholder": o || "" };
        h && (d.class = "placeholder"), B(d, c) || (i.remove(), i.decorateLine(0, d).apply());
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
const Ds = /(https?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, Os = /(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, Cs = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.(com|org|net|io)\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, Bs = [
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
      start: t.toUpperCase() === "I" ? void 0 : Qs(t)
    })
  ],
  [/^> $/, () => ({ blockquote: !0 })]
], Ps = [
  [/(\*|_){3}(\b(?:(?!\1).)+\b)\1{3}((?:(?!\1).))$/s, () => ({ bold: !0, italic: !0 })],
  [/(\*|_){2}(\b(?:(?!\1).)+\b)\1{2}((?:(?!\1).))$/s, () => ({ bold: !0 })],
  [/(\*|_){1}(\b(?:(?!\1).)+\b)\1{1}((?:(?!\1).))$/s, () => ({ italic: !0 })]
], js = [
  [Ds, (t) => ({ link: t })],
  [Os, (t) => ({ link: "https://" + t })],
  [Cs, (t) => ({ link: "https://" + t })]
], zs = [
  [/--$/, () => "—"],
  [/(\S - \S)$/, (t) => t.replace("-", "–")],
  [/\.\.\.$/, () => "…"]
];
function $s(t, e, n) {
  return Bs.some(([s, r]) => {
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
function Hs(t, e, n) {
  return js.some(([s, r]) => {
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
function _r(t, e, n, s) {
  return Ps.some(([r, i]) => {
    const o = n.match(r);
    if (o) {
      let [c, l, a, h] = o;
      const d = i(a, t.doc.getTextFormat(e));
      if (!t.typeset.formats.findByAttributes(d))
        return !1;
      e - (c.length - a.length) + h.length, h === " " && s[e] === " " && (h = "");
      const f = e - h.length;
      return t.insert(a, d, [f - c.length + h.length, f]), !0;
    } else
      return !1;
  });
}
function Ws(t, e, n) {
  return zs.some(([s, r]) => {
    const i = n.match(s);
    return i ? (t.insert(r(i[1]), void 0, [e - i[0].length, e]), !0) : !1;
  });
}
const Us = [$s, Ws, Hs];
function Ir(t = Us) {
  return (e) => {
    let n = !1;
    function s({ change: r, source: i }) {
      if (n || i === "api" || !e.doc.selection || !r || !Ys(r.delta)) return;
      const o = e.doc.selection[1], c = e.doc.getText(), l = c.lastIndexOf(`
`, o - 2) + 1, a = c.slice(l, o);
      n = !0, t.some((h) => h(e, o, a, c)), n = !1;
    }
    return e.on("changed", s), {
      destroy() {
        e.off("changed", s);
      }
    };
  };
}
function Ys(t) {
  return (t.ops.length === 1 || t.ops.length === 2 && t.ops[0].retain && !t.ops[0].attributes) && t.ops[t.ops.length - 1].insert;
}
const Ot = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1e3
};
function Qs(t) {
  t = t.toUpperCase();
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = Ot[t[n]], r = Ot[t[n + 1]];
    if (s === void 0) return;
    s < r ? (e += r - s, n++) : e += s;
  }
  return e;
}
const Xs = /['"]/g, Zs = /[\s\{\[\(\<'"\u2018\u201C]/, Ct = {
  '"': { left: "“", right: "”" },
  "'": { left: "‘", right: "’" }
};
function Rr(t) {
  function e(n) {
    const { change: s, source: r, doc: i, old: o } = n;
    if (r === "api" || !o.selection || !s) return;
    const c = Js(s.delta.ops);
    if (!c.length) return;
    const l = i.getText(), a = new D();
    let h = 0;
    for (let d = 0; d < c.length; d++) {
      const [f, g] = c[d], m = l[f], b = !f || Zs.test(l[f - 1]) ? Ct[m].left : Ct[m].right;
      a.retain(f - h).delete(1).insert(b, g), h = f + 1;
    }
    n.modify(a);
  }
  return t.on("changing", e), {
    destroy() {
      t.off("changing", e);
    }
  };
}
function Js(t) {
  const e = [];
  let n = 0;
  return t.forEach((s) => {
    if (s.retain) n += s.retain;
    else if (typeof s.insert == "string") {
      let r;
      for (; r = Xs.exec(s.insert); )
        e.push([n + r.index, s.attributes]);
      n += s.insert.length;
    } else s.insert && (n += 1);
  }), e;
}
function Sr(t) {
  let e = 0, n = [], s = [], r = Ks(t.root), i, o = 0, c = 40, l, a = null, h = null, d, f = !1, g = !0;
  r.addEventListener("scroll", se, { passive: !0 }), t.on("change", V);
  const m = er(r, (u, y, p) => {
    o = y, p & fn && (n = []), A();
  });
  function b(u) {
    if (!u || !l) {
      const { doc: y } = t.modules.decorations || t;
      l = ge(t, y.lines).combined, f = !0, a = y.selection, A();
    } else {
      const { doc: y, old: p } = u, w = u.selection || null, E = w && tr(w, l).sort((v, L) => v - L);
      if (B(E, h) || (f = f || !J(E), h = E), p && y) {
        const v = ge(t, y.lines).combined, [L, N] = Jt(l, v);
        if (L[0] + L[1] + N[0] + N[1] > 0) {
          f = !0;
          const x = L[1] - L[0], F = N[1] - N[0];
          if (x < F) {
            const _ = new Array(F - x).fill(void 0);
            n.splice(L[1], 0, ..._);
          } else x > F && n.splice(L[0], x - F);
        }
        l = v;
      } else y && (l = ge(t, y.lines).combined, f = !0);
      a = w, f && A();
    }
  }
  function A() {
    if (g = !1, !l) return;
    const { scrollTop: u } = r;
    i = X();
    const y = e, p = n.slice();
    let w = !1, E = 0;
    for (; T() && E++ < 20; )
      w = !0, f = !1, M(), k();
    if (E >= 20 && console.error("Updated virtual max times"), De(t, a), !!w && e < y) {
      let v = 0, L = 0, N = d.indexOf(e);
      for (let F = e; F < y; F++) {
        const _ = F - e + N;
        s[_] && (v += S(F, p), L += S(F));
      }
      const x = L - v;
      r.scrollTo(0, u + x);
    }
  }
  function T() {
    const { scrollTop: u } = r, y = /* @__PURE__ */ new Set([0, l.length - 1, ...h || []]);
    let p = 0, w = i, E = 0;
    for (; p < l.length; ) {
      const L = S(p);
      if (w + L > u) {
        E = p;
        break;
      }
      w += L, p += 1;
    }
    for (; p < l.length && (y.add(p), w += S(p), p += 1, !(w > u + o)); )
      ;
    Math.min(p, l.length - 1);
    const v = Array.from(y).sort((L, N) => L - N);
    return B(v, d) ? f : (e = E, d = v, !0);
  }
  function M() {
    const u = [], y = new Set(d);
    let p = "", w = 0, E = 0, v = 0;
    for (let L = 0, N = 0; L < l.length; L++) {
      if (y.has(L)) {
        if (N) {
          E = O(L, -1), N -= w;
          const F = j("div", {
            class: "-spacer-",
            "data-key": p,
            style: `height:${N}px;margin-top:${w}px;margin-bottom:${E}px;`,
            key: p
          });
          p = "", u.push(F);
        }
        N = 0;
        const x = Zt(t, l[L]);
        u.push(x);
      } else
        L === 1 ? p = "spacer-start" : L === l.length - 2 ? p = "spacer-end" : !p && h && L > h[1] ? p = "spacer-selection-end" : !p && h && L > h[0] && (p = "spacer-selection-start"), N || (w = O(L, -1)), N += S(L);
      v += S(L);
    }
    t.dispatchEvent(new Event("rendering")), xe(t.root, u), it(t), t.dispatchEvent(new Event("render")), t.dispatchEvent(new Event("rendered"));
  }
  function k() {
    s = Array.from(t.root.children).filter((y) => y.className !== "-spacer-");
    for (let y = 0; y < s.length; y++) {
      const p = d[y];
      n[p] = R(s[y]);
    }
    if (!s.length) return;
    const u = n.filter(Boolean);
    c = Math.round(
      O(0, -1, u) + u.reduce((y, p, w, E) => y + S(w, E), 0) / u.length
    );
  }
  function X() {
    const { scrollTop: u } = r, { root: y } = t;
    return r === y ? parseInt(getComputedStyle(y).paddingTop) : y.getBoundingClientRect().top + parseInt(getComputedStyle(y).paddingTop) + u - r.getBoundingClientRect().top;
  }
  function R(u) {
    const y = getComputedStyle(u);
    return [parseInt(y.marginTop), u.offsetHeight, parseInt(y.marginBottom)];
  }
  function S(u, y = n) {
    return y[u] ? (u === 0 ? O(u, -1, y) : 0) + y[u][1] + O(u, 1, y) : c;
  }
  function O(u, y, p = n) {
    return Math.max(p[u] && p[u][2] || 0, p[u + y] && p[u + y][0] || 0);
  }
  function J(u, y) {
    if (!u) return !1;
    let [p, w] = u;
    return w++, d.some((E) => E >= p && E < w);
  }
  function se() {
    g || (requestAnimationFrame(A), g = !0);
  }
  function V(u) {
    const { old: y, doc: p } = t.modules.decorations || u, w = u.doc.selection;
    b({ old: y, doc: p, selection: w });
  }
  return {
    render: b,
    init() {
      t.modules.decorations && t.modules.decorations.gatherDecorations(), b();
    },
    destroy() {
      m(), r.removeEventListener("scroll", se), t.off("change", V);
    }
  };
}
const Gs = /auto|scroll/;
function Ks(t) {
  for (; t && t !== t.ownerDocument.scrollingElement; ) {
    if (Gs.test(getComputedStyle(t).overflowY)) return t;
    t = t.parentNode;
  }
  return t;
}
const fn = 1, qs = 2, Vs = 3;
function er(t, e) {
  let n = t.offsetWidth, s = t.offsetHeight;
  if (e(n, s, Vs), typeof window.ResizeObserver < "u") {
    const i = new window.ResizeObserver(r);
    return i.observe(t), () => i.disconnect();
  } else {
    const i = t.ownerDocument.defaultView;
    return i.addEventListener("resize", r), () => i.removeEventListener("resize", r);
  }
  function r() {
    const { offsetWidth: i, offsetHeight: o } = t, c = (n !== i ? fn : 0) | (s !== o ? qs : 0);
    c && (n = i, s = o, e(n, s, c));
  }
}
function tr([t, e], n) {
  let s = 0, r = 0;
  for (let i = 0, o = 0; i < n.length; i++) {
    const c = n[i], l = Array.isArray(c) ? c.reduce((a, h) => a + h.length, 0) : c.length;
    if (t >= o && t < o + l && (s = i), e >= o && e < o + l) {
      r = i;
      break;
    }
    o += l;
  }
  return [s, r];
}
function Oe() {
}
const nr = Symbol(), fe = Symbol() in window ? window?.[Symbol()] : {
  context: null,
  subscriberQueue: /* @__PURE__ */ new Map()
};
function sr(t, e = Oe) {
  const { get: n, subscribe: s } = dn(t, e);
  return { get: n, subscribe: s };
}
function dn(t, e = Oe) {
  let n, s = !1;
  const r = /* @__PURE__ */ new Map();
  o[nr] = r;
  function i() {
    if (fe.context) {
      const { subscriber: a, unsubscribes: h, invalidate: d } = fe.context, f = l(a, d);
      h.add(f);
    }
    if (!r.size && !s) {
      s = !0;
      try {
        (e(o, c) || Oe)();
      } finally {
        s = !1;
      }
    }
    return t;
  }
  function o(a) {
    t !== a && (t = a, n && rr(() => {
      r.forEach(([, h], d) => {
        fe.subscriberQueue.has(d) || (fe.subscriberQueue.set(d, t), h && h());
      });
    }));
  }
  function c(a) {
    o(a(t));
  }
  function l(a, h) {
    let d = r.get(a)?.[0];
    return d || (d = () => {
      r.delete(a), r.size === 0 && (n(), n = null);
    }, r.set(a, [d, h]), r.size === 1 && (n = e(o, c) || Oe), h || a(t), d);
  }
  return { get: i, set: o, update: c, subscribe: l };
}
function rr(t, e) {
  const n = !fe.subscriberQueue.size;
  if (t(), n) {
    const s = fe.subscriberQueue.entries();
    for (; fe.subscriberQueue.size > 0; ) {
      const [r, i] = s.next().value;
      fe.subscriberQueue.delete(r), r(i);
    }
  }
}
function Dr(t) {
  const e = dn(t), n = ir(e), s = or(e), r = cr(e), i = ar(e), o = lr(e);
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
function Fe(t, e, n, s, r) {
  let i = e;
  return sr(i, (o) => {
    let c;
    const l = () => {
      i = c ? s(c) : e, !(r && B(i, o)) && o(i);
    }, a = () => c && n.forEach((f) => c.on(f, l)), h = () => c && n.forEach((f) => c.off(f, l)), d = t.subscribe((f) => {
      h(), c = f, c ? (l(), a()) : o(i = e);
    });
    return () => {
      h(), d(), c = void 0, l();
    };
  });
}
function ir(t) {
  return Fe(t, {}, ["changed", "format"], (e) => e.getActive(), !0);
}
function or(t) {
  return Fe(t, new re(), ["changed"], (e) => e.doc);
}
function cr(t) {
  return Fe(t, null, ["changed"], (e) => e.doc.selection);
}
function lr(t) {
  return Fe(t, !1, ["changed"], (e) => !!e.doc.selection);
}
function ar(t) {
  return Fe(t, void 0, ["root"], (e) => e._root);
}
function Or(t, e) {
  function n(r) {
    e !== r && (s(), r && r.setRoot(t), e = r);
  }
  t.children.length && e.set(ls(e, t)), e && e.setRoot(t);
  function s() {
    e && e.destroy();
  }
  return { update: n, destroy: s };
}
export {
  ne as AttributeMap,
  tn as BLOCK_ELEMENTS,
  jn as DecorateEvent,
  $n as Decorator,
  D as Delta,
  kr as Editor,
  Le as EditorChangeEvent,
  _t as EditorFormatEvent,
  In as EventDispatcher,
  ee as Line,
  An as LineIterator,
  Ue as LineOp,
  Nn as LineOpIterator,
  Z as Op,
  Pt as OpIterator,
  ws as PasteEvent,
  ur as React,
  lt as ShortcutEvent,
  ie as Source,
  oe as TextChange,
  re as TextDocument,
  Qe as Types,
  Jn as Typeset,
  ir as activeStore,
  qn as addShortcutsToEvent,
  st as applyDecorations,
  Or as asRoot,
  wr as blockquote,
  pr as bold,
  fr as br,
  rn as cleanText,
  Je as cloneDeep,
  br as code,
  Ar as codeblock,
  ge as combineLines,
  Ss as copy,
  zn as decorations,
  Us as defaultHandlers,
  ks as defaultModules,
  Gn as defaultTypes,
  Ne as deltaFromDom,
  sn as deltaFromHTML,
  jt as deltaToText,
  Fe as derivedEditorStore,
  he as diff,
  xr as dl,
  ls as docFromDom,
  Et as docFromHTML,
  or as docStore,
  nn as docToHTML,
  Dr as editorStores,
  ct as embed,
  lr as focusStore,
  me as format,
  Tr as fromNode,
  At as getBoudingBrowserRange,
  us as getBrowserRange,
  Jt as getChangedRanges,
  on as getIndexFromNode,
  ze as getIndexFromNodeAndOffset,
  as as getIndexFromPoint,
  hs as getLineElementAt,
  Fr as getLineInfoFromPoint,
  Be as getLineNodeEnd,
  ae as getLineNodeStart,
  Nt as getNodeAndOffset,
  fs as getNodeLength,
  cn as getNodesForRange,
  ln as getSelection,
  j as h,
  qe as hasFormat,
  Lr as header,
  Ns as history,
  Nr as hr,
  hr as image,
  xs as initHistory,
  cs as inlineToHTML,
  ms as input,
  Mn as intersect,
  Ae as isBRPlaceholder,
  B as isEqual,
  gr as italic,
  es as keyboard,
  de as line,
  $s as lineReplace,
  Bs as lineReplacements,
  yr as link,
  Hs as linkReplace,
  js as linkReplacements,
  Er as list,
  mr as mark,
  _r as markReplace,
  Ps as markReplacements,
  q as normalizeRange,
  et as options,
  vr as paragraph,
  As as paste,
  xe as patch,
  Mr as placeholder,
  On as recycleNode,
  nt as render,
  vt as renderChanges,
  Xt as renderCombined,
  Qt as renderDoc,
  ot as renderInline,
  Zt as renderLine,
  Un as renderMultiLine,
  Wn as renderSingleLine,
  Xn as rendering,
  ar as rootStore,
  Ls as selection,
  cr as selectionStore,
  it as setLineNodesRanges,
  De as setSelection,
  en as shortcutFromEvent,
  Ir as smartEntry,
  Rr as smartQuotes,
  $e as textNodeLength,
  Ws as textReplace,
  zs as textReplacements,
  Ts as transformHistoryStack,
  dr as underline,
  Ft as undoStack,
  Sr as virtualRendering
};
