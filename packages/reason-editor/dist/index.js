var bn = Object.defineProperty;
var yn = (n, e, t) => e in n ? bn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var x = (n, e, t) => yn(n, typeof e != "symbol" ? e + "" : e, t);
function qe(n) {
  if (!n) return n;
  if (typeof n.toJSON == "function" && (n = n.toJSON()), Array.isArray(n)) return n.map(qe);
  if (typeof n == "object") {
    const e = {};
    return Object.keys(n).forEach((t) => e[t] = qe(n[t])), e;
  }
  return n;
}
const vn = {};
function B(n, e, t = vn) {
  if (n === e) return !0;
  const s = typeof n, r = typeof n;
  if (s === "number" && r === "number" && isNaN(n) && isNaN(e))
    return !0;
  if (!n || !e || s !== "object" || r !== "object" || n.constructor !== e.constructor)
    return !1;
  if (n.valueOf() !== n)
    return B(n.valueOf(), e.valueOf(), t);
  const i = t.shallow ? Ln : B;
  if (typeof n[Symbol.iterator] == "function") {
    const l = n[Symbol.iterator](), a = e[Symbol.iterator]();
    let h = l.next(), g = a.next();
    for (; !h.done && !g.done; ) {
      if (!i(h.value, g.value, t)) return !1;
      h = l.next(), g = a.next();
    }
    return h.done === g.done;
  }
  let o = Object.keys(n), c = Object.keys(e);
  if (t.excludeProps) {
    const l = En(t.excludeProps);
    o = o.filter(l), c = c.filter(l);
  }
  return (t.partial || o.length === c.length) && c.every(
    (l) => n.hasOwnProperty(l) && i(e[l], n[l], t)
  );
}
function Ln(n, e) {
  return n === e;
}
function En(n) {
  return (e) => !n.has(e);
}
function fe(n) {
  return n === Object(n) && !Array.isArray(n);
}
function zt(n) {
  if (n == null) return !0;
  if (!fe(n)) return !1;
  for (const e in n)
    if (!zt(n[e])) return !1;
  return !0;
}
var Ve;
((n) => {
  function e(i = {}, o = {}, c) {
    typeof i != "object" && (i = {}), typeof o != "object" && (o = {});
    let l = qe(o);
    for (const a in i)
      fe(i[a]) && fe(l[a]) && (l[a] = e(i[a], l[a], c));
    c || (l = Object.keys(l).reduce((a, h) => (zt(l[h]) || (a[h] = l[h]), a), {}));
    for (const a in i)
      i[a] !== void 0 && o[a] === void 0 && (l[a] = i[a]);
    return Object.keys(l).length > 0 ? l : void 0;
  }
  n.compose = e;
  function t(i = {}, o = {}) {
    typeof i != "object" && (i = {}), typeof o != "object" && (o = {});
    const c = Object.keys(i).concat(Object.keys(o)).reduce((l, a) => (B(i[a], o[a]) || (o[a] === void 0 ? l[a] = null : fe(i[a]) && fe(o[a]) ? l[a] = t(i[a], o[a]) : l[a] = o[a]), l), {});
    return Object.keys(c).length > 0 ? c : void 0;
  }
  n.diff = t;
  function s(i = {}, o = {}) {
    i = i || {};
    const c = Object.keys(o).reduce((l, a) => (!B(o[a], i[a]) && i[a] !== void 0 && (fe(i[a]) && fe(o[a]) ? l[a] = s(i[a], o[a]) : l[a] = o[a]), l), {});
    return Object.keys(i).reduce((l, a) => (i[a] !== o[a] && o[a] === void 0 && (l[a] = null), l), c);
  }
  n.invert = s;
  function r(i, o, c = !1) {
    if (typeof i != "object")
      return o;
    if (typeof o != "object")
      return;
    if (!c)
      return o;
    const l = Object.keys(o).reduce((a, h) => (i[h] === void 0 ? a[h] = o[h] : fe(i[h]) && fe(o[h]) && (a[h] = r(i[h], o[h], !0)), a), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  n.transform = r;
})(Ve || (Ve = {}));
const re = Ve;
function wn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Qe, ft;
function An() {
  if (ft) return Qe;
  ft = 1;
  var n = -1, e = 1, t = 0;
  function s(u, y, d, w, E) {
    if (u === y)
      return u ? [[t, u]] : [];
    if (d != null) {
      var v = ie(u, y, d);
      if (v)
        return v;
    }
    var L = c(u, y), N = u.substring(0, L);
    u = u.substring(L), y = y.substring(L), L = a(u, y);
    var F = u.substring(u.length - L);
    u = u.substring(0, u.length - L), y = y.substring(0, y.length - L);
    var k = r(u, y);
    return N && k.unshift([t, N]), F && k.push([t, F]), _(k, E), w && g(k), k;
  }
  function r(u, y) {
    var d;
    if (!u)
      return [[e, y]];
    if (!y)
      return [[n, u]];
    var w = u.length > y.length ? u : y, E = u.length > y.length ? y : u, v = w.indexOf(E);
    if (v !== -1)
      return d = [
        [e, w.substring(0, v)],
        [t, E],
        [e, w.substring(v + E.length)]
      ], u.length > y.length && (d[0][0] = d[2][0] = n), d;
    if (E.length === 1)
      return [
        [n, u],
        [e, y]
      ];
    var L = h(u, y);
    if (L) {
      var N = L[0], F = L[1], k = L[2], I = L[3], S = L[4], $ = s(N, k), C = s(F, I);
      return $.concat([[t, S]], C);
    }
    return i(u, y);
  }
  function i(u, y) {
    for (var d = u.length, w = y.length, E = Math.ceil((d + w) / 2), v = E, L = 2 * E, N = new Array(L), F = new Array(L), k = 0; k < L; k++)
      N[k] = -1, F[k] = -1;
    N[v + 1] = 0, F[v + 1] = 0;
    for (var I = d - w, S = I % 2 !== 0, $ = 0, C = 0, W = 0, K = 0, q = 0; q < E; q++) {
      for (var P = -q + $; P <= q - C; P += 2) {
        var H = v + P, z;
        P === -q || P !== q && N[H - 1] < N[H + 1] ? z = N[H + 1] : z = N[H - 1] + 1;
        for (var U = z - P; z < d && U < w && u.charAt(z) === y.charAt(U); )
          z++, U++;
        if (N[H] = z, z > d)
          C += 2;
        else if (U > w)
          $ += 2;
        else if (S) {
          var Q = v + I - P;
          if (Q >= 0 && Q < L && F[Q] !== -1) {
            var X = d - F[Q];
            if (z >= X)
              return o(u, y, z, U);
          }
        }
      }
      for (var ne = -q + W; ne <= q - K; ne += 2) {
        var Q = v + ne, X;
        ne === -q || ne !== q && F[Q - 1] < F[Q + 1] ? X = F[Q + 1] : X = F[Q - 1] + 1;
        for (var ae = X - ne; X < d && ae < w && u.charAt(d - X - 1) === y.charAt(w - ae - 1); )
          X++, ae++;
        if (F[Q] = X, X > d)
          K += 2;
        else if (ae > w)
          W += 2;
        else if (!S) {
          var H = v + I - ne;
          if (H >= 0 && H < L && N[H] !== -1) {
            var z = N[H], U = v + z - H;
            if (X = d - X, z >= X)
              return o(u, y, z, U);
          }
        }
      }
    }
    return [
      [n, u],
      [e, y]
    ];
  }
  function o(u, y, d, w) {
    var E = u.substring(0, d), v = y.substring(0, w), L = u.substring(d), N = y.substring(w), F = s(E, v), k = s(L, N);
    return F.concat(k);
  }
  function c(u, y) {
    if (!u || !y || u.charAt(0) !== y.charAt(0))
      return 0;
    for (var d = 0, w = Math.min(u.length, y.length), E = w, v = 0; d < E; )
      u.substring(v, E) == y.substring(v, E) ? (d = E, v = d) : w = E, E = Math.floor((w - d) / 2 + d);
    return M(u.charCodeAt(E - 1)) && E--, E;
  }
  function l(u, y) {
    var d = u.length, w = y.length;
    if (d == 0 || w == 0)
      return 0;
    d > w ? u = u.substring(d - w) : d < w && (y = y.substring(0, d));
    var E = Math.min(d, w);
    if (u == y)
      return E;
    for (var v = 0, L = 1; ; ) {
      var N = u.substring(E - L), F = y.indexOf(N);
      if (F == -1)
        return v;
      L += F, (F == 0 || u.substring(E - L) == y.substring(0, L)) && (v = L, L++);
    }
  }
  function a(u, y) {
    if (!u || !y || u.slice(-1) !== y.slice(-1))
      return 0;
    for (var d = 0, w = Math.min(u.length, y.length), E = w, v = 0; d < E; )
      u.substring(u.length - E, u.length - v) == y.substring(y.length - E, y.length - v) ? (d = E, v = d) : w = E, E = Math.floor((w - d) / 2 + d);
    return Z(u.charCodeAt(u.length - E)) && E--, E;
  }
  function h(u, y) {
    var d = u.length > y.length ? u : y, w = u.length > y.length ? y : u;
    if (d.length < 4 || w.length * 2 < d.length)
      return null;
    function E(C, W, K) {
      for (var q = C.substring(K, K + Math.floor(C.length / 4)), P = -1, H = "", z, U, Q, X; (P = W.indexOf(q, P + 1)) !== -1; ) {
        var ne = c(
          C.substring(K),
          W.substring(P)
        ), ae = a(
          C.substring(0, K),
          W.substring(0, P)
        );
        H.length < ae + ne && (H = W.substring(P - ae, P) + W.substring(P, P + ne), z = C.substring(0, K - ae), U = C.substring(K + ne), Q = W.substring(0, P - ae), X = W.substring(P + ne));
      }
      return H.length * 2 >= C.length ? [
        z,
        U,
        Q,
        X,
        H
      ] : null;
    }
    var v = E(
      d,
      w,
      Math.ceil(d.length / 4)
    ), L = E(
      d,
      w,
      Math.ceil(d.length / 2)
    ), N;
    if (!v && !L)
      return null;
    L ? v ? N = v[4].length > L[4].length ? v : L : N = L : N = v;
    var F, k, I, S;
    u.length > y.length ? (F = N[0], k = N[1], I = N[2], S = N[3]) : (I = N[0], S = N[1], F = N[2], k = N[3]);
    var $ = N[4];
    return [F, k, I, S, $];
  }
  function g(u) {
    for (var y = !1, d = [], w = 0, E = null, v = 0, L = 0, N = 0, F = 0, k = 0; v < u.length; )
      u[v][0] == t ? (d[w++] = v, L = F, N = k, F = 0, k = 0, E = u[v][1]) : (u[v][0] == e ? F += u[v][1].length : k += u[v][1].length, E && E.length <= Math.max(L, N) && E.length <= Math.max(F, k) && (u.splice(d[w - 1], 0, [
        n,
        E
      ]), u[d[w - 1] + 1][0] = e, w--, w--, v = w > 0 ? d[w - 1] : -1, L = 0, N = 0, F = 0, k = 0, E = null, y = !0)), v++;
    for (y && _(u), T(u), v = 1; v < u.length; ) {
      if (u[v - 1][0] == n && u[v][0] == e) {
        var I = u[v - 1][1], S = u[v][1], $ = l(I, S), C = l(S, I);
        $ >= C ? ($ >= I.length / 2 || $ >= S.length / 2) && (u.splice(v, 0, [
          t,
          S.substring(0, $)
        ]), u[v - 1][1] = I.substring(
          0,
          I.length - $
        ), u[v + 1][1] = S.substring($), v++) : (C >= I.length / 2 || C >= S.length / 2) && (u.splice(v, 0, [
          t,
          I.substring(0, C)
        ]), u[v - 1][0] = e, u[v - 1][1] = S.substring(
          0,
          S.length - C
        ), u[v + 1][0] = n, u[v + 1][1] = I.substring(C), v++), v++;
      }
      v++;
    }
  }
  var f = /[^a-zA-Z0-9]/, m = /\s/, p = /[\r\n]/, b = /\n\r?\n$/, A = /^\r?\n\r?\n/;
  function T(u) {
    function y(C, W) {
      if (!C || !W)
        return 6;
      var K = C.charAt(C.length - 1), q = W.charAt(0), P = K.match(f), H = q.match(f), z = P && K.match(m), U = H && q.match(m), Q = z && K.match(p), X = U && q.match(p), ne = Q && C.match(b), ae = X && W.match(A);
      return ne || ae ? 5 : Q || X ? 4 : P && !z && U ? 3 : z || U ? 2 : P || H ? 1 : 0;
    }
    for (var d = 1; d < u.length - 1; ) {
      if (u[d - 1][0] == t && u[d + 1][0] == t) {
        var w = u[d - 1][1], E = u[d][1], v = u[d + 1][1], L = a(w, E);
        if (L) {
          var N = E.substring(E.length - L);
          w = w.substring(0, w.length - L), E = N + E.substring(0, E.length - L), v = N + v;
        }
        for (var F = w, k = E, I = v, S = y(w, E) + y(E, v); E.charAt(0) === v.charAt(0); ) {
          w += E.charAt(0), E = E.substring(1) + v.charAt(0), v = v.substring(1);
          var $ = y(w, E) + y(E, v);
          $ >= S && (S = $, F = w, k = E, I = v);
        }
        u[d - 1][1] != F && (F ? u[d - 1][1] = F : (u.splice(d - 1, 1), d--), u[d][1] = k, I ? u[d + 1][1] = I : (u.splice(d + 1, 1), d--));
      }
      d++;
    }
  }
  function _(u, y) {
    u.push([t, ""]);
    for (var d = 0, w = 0, E = 0, v = "", L = "", N; d < u.length; ) {
      if (d < u.length - 1 && !u[d][1]) {
        u.splice(d, 1);
        continue;
      }
      switch (u[d][0]) {
        case e:
          E++, L += u[d][1], d++;
          break;
        case n:
          w++, v += u[d][1], d++;
          break;
        case t:
          var F = d - E - w - 1;
          if (y) {
            if (F >= 0 && D(u[F][1])) {
              var k = u[F][1].slice(-1);
              if (u[F][1] = u[F][1].slice(
                0,
                -1
              ), v = k + v, L = k + L, !u[F][1]) {
                u.splice(F, 1), d--;
                var I = F - 1;
                u[I] && u[I][0] === e && (E++, L = u[I][1] + L, I--), u[I] && u[I][0] === n && (w++, v = u[I][1] + v, I--), F = I;
              }
            }
            if (R(u[d][1])) {
              var k = u[d][1].charAt(0);
              u[d][1] = u[d][1].slice(1), v += k, L += k;
            }
          }
          if (d < u.length - 1 && !u[d][1]) {
            u.splice(d, 1);
            break;
          }
          if (v.length > 0 || L.length > 0) {
            v.length > 0 && L.length > 0 && (N = c(L, v), N !== 0 && (F >= 0 ? u[F][1] += L.substring(
              0,
              N
            ) : (u.splice(0, 0, [
              t,
              L.substring(0, N)
            ]), d++), L = L.substring(N), v = v.substring(N)), N = a(L, v), N !== 0 && (u[d][1] = L.substring(L.length - N) + u[d][1], L = L.substring(
              0,
              L.length - N
            ), v = v.substring(
              0,
              v.length - N
            )));
            var S = E + w;
            v.length === 0 && L.length === 0 ? (u.splice(d - S, S), d = d - S) : v.length === 0 ? (u.splice(d - S, S, [e, L]), d = d - S + 1) : L.length === 0 ? (u.splice(d - S, S, [n, v]), d = d - S + 1) : (u.splice(
              d - S,
              S,
              [n, v],
              [e, L]
            ), d = d - S + 2);
          }
          d !== 0 && u[d - 1][0] === t ? (u[d - 1][1] += u[d][1], u.splice(d, 1)) : d++, E = 0, w = 0, v = "", L = "";
          break;
      }
    }
    u[u.length - 1][1] === "" && u.pop();
    var $ = !1;
    for (d = 1; d < u.length - 1; )
      u[d - 1][0] === t && u[d + 1][0] === t && (u[d][1].substring(
        u[d][1].length - u[d - 1][1].length
      ) === u[d - 1][1] ? (u[d][1] = u[d - 1][1] + u[d][1].substring(
        0,
        u[d][1].length - u[d - 1][1].length
      ), u[d + 1][1] = u[d - 1][1] + u[d + 1][1], u.splice(d - 1, 1), $ = !0) : u[d][1].substring(0, u[d + 1][1].length) == u[d + 1][1] && (u[d - 1][1] += u[d + 1][1], u[d][1] = u[d][1].substring(u[d + 1][1].length) + u[d + 1][1], u.splice(d + 1, 1), $ = !0)), d++;
    $ && _(u, y);
  }
  function M(u) {
    return u >= 55296 && u <= 56319;
  }
  function Z(u) {
    return u >= 56320 && u <= 57343;
  }
  function R(u) {
    return Z(u.charCodeAt(0));
  }
  function D(u) {
    return M(u.charCodeAt(u.length - 1));
  }
  function O(u) {
    for (var y = [], d = 0; d < u.length; d++)
      u[d][1].length > 0 && y.push(u[d]);
    return y;
  }
  function G(u, y, d, w) {
    return D(u) || R(w) ? null : O([
      [t, u],
      [n, y],
      [e, d],
      [t, w]
    ]);
  }
  function ie(u, y, d) {
    var w = typeof d == "number" ? { index: d, length: 0 } : d.oldRange, E = typeof d == "number" ? null : d.newRange, v = u.length, L = y.length;
    if (w.length === 0 && (E === null || E.length === 0)) {
      var N = w.index, F = u.slice(0, N), k = u.slice(N), I = E ? E.index : null;
      e: {
        var S = N + L - v;
        if (I !== null && I !== S || S < 0 || S > L)
          break e;
        var $ = y.slice(0, S), C = y.slice(S);
        if (C !== k)
          break e;
        var W = Math.min(N, S), K = F.slice(0, W), q = $.slice(0, W);
        if (K !== q)
          break e;
        var P = F.slice(W), H = $.slice(W);
        return G(K, P, H, k);
      }
      e: {
        if (I !== null && I !== N)
          break e;
        var z = N, $ = y.slice(0, z), C = y.slice(z);
        if ($ !== F)
          break e;
        var U = Math.min(v - z, L - z), Q = k.slice(k.length - U), X = C.slice(C.length - U);
        if (Q !== X)
          break e;
        var P = k.slice(0, k.length - U), H = C.slice(0, C.length - U);
        return G(F, P, H, Q);
      }
    }
    if (w.length > 0 && E && E.length === 0)
      e: {
        var K = u.slice(0, w.index), Q = u.slice(w.index + w.length), W = K.length, U = Q.length;
        if (L < W + U)
          break e;
        var q = y.slice(0, W), X = y.slice(L - U);
        if (K !== q || Q !== X)
          break e;
        var P = u.slice(W, v - U), H = y.slice(W, L - U);
        return G(K, P, H, Q);
      }
    return null;
  }
  function ee(u, y, d, w) {
    return s(u, y, d, w, !0);
  }
  return ee.INSERT = e, ee.DELETE = n, ee.EQUAL = t, Qe = ee, Qe;
}
var Nn = An();
const de = /* @__PURE__ */ wn(Nn);
var Ae;
((n) => {
  function e(s) {
    return new $t(s);
  }
  n.iterator = e;
  function t(s) {
    return typeof s.delete == "number" ? s.delete : typeof s.retain == "number" ? s.retain : typeof s.insert == "string" ? s.insert.length : 1;
  }
  n.length = t;
})(Ae || (Ae = {}));
const J = Ae;
class $t {
  constructor(e) {
    x(this, "ops");
    x(this, "index");
    x(this, "offset");
    this.ops = e, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return !!this.peek();
  }
  next(e) {
    e || (e = 1 / 0);
    const t = this.ops[this.index];
    if (t) {
      const s = this.offset, r = Ae.length(t);
      if (e >= r - s ? (e = r - s, this.index += 1, this.offset = 0) : this.offset += e, typeof t.delete == "number")
        return { delete: e };
      {
        if (r === e) return t;
        const i = {};
        return t.attributes && (i.attributes = t.attributes), typeof t.retain == "number" ? i.retain = e : typeof t.insert == "string" ? i.insert = t.insert.substr(s, e) : i.insert = t.insert, i;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? Ae.length(this.ops[this.index]) - this.offset : 1 / 0;
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
        const e = this.offset, t = this.index, s = this.next(), r = this.ops.slice(this.index);
        return this.offset = e, this.index = t, [s].concat(r);
      }
    } else return [];
  }
}
const Tn = "\0", se = class se {
  constructor(e) {
    x(this, "ops");
    Array.isArray(e) ? this.ops = e : e != null && Array.isArray(e.ops) ? this.ops = e.ops : this.ops = [];
  }
  insert(e, t) {
    const s = {};
    return typeof e == "string" && e.length === 0 ? this : (s.insert = e, t != null && typeof t == "object" && Object.keys(t).length > 0 && (s.attributes = t), this.push(s));
  }
  delete(e) {
    return e <= 0 ? this : this.push({ delete: e });
  }
  retain(e, t) {
    if (e <= 0)
      return this;
    const s = { retain: e };
    return t != null && typeof t == "object" && Object.keys(t).length > 0 && (s.attributes = t), this.push(s);
  }
  push(e) {
    let t = this.ops.length, s = this.ops[t - 1];
    if (typeof s == "object") {
      if (typeof e.delete == "number" && typeof s.delete == "number")
        return this.ops[t - 1] = { delete: s.delete + e.delete }, this;
      if (typeof s.delete == "number" && e.insert != null && (t -= 1, s = this.ops[t - 1], typeof s != "object"))
        return this.ops.unshift(e), this;
      if (B(e.attributes, s.attributes)) {
        if (typeof e.insert == "string" && typeof s.insert == "string")
          return this.ops[t - 1] = { insert: s.insert + e.insert }, typeof e.attributes == "object" && (this.ops[t - 1].attributes = e.attributes), this;
        if (typeof e.retain == "number" && typeof s.retain == "number")
          return this.ops[t - 1] = { retain: s.retain + e.retain }, typeof e.attributes == "object" && (this.ops[t - 1].attributes = e.attributes), this;
      }
    }
    return t === this.ops.length ? this.ops.push(e) : this.ops.splice(t, 0, e), this;
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
    const t = [], s = [];
    return this.forEach((r) => {
      (e(r) ? t : s).push(r);
    }), [t, s];
  }
  reduce(e, t) {
    return this.ops.reduce(e, t);
  }
  changeLength() {
    return this.reduce((e, t) => t.insert ? e + J.length(t) : t.delete ? e - t.delete : e, 0);
  }
  length() {
    return this.reduce((e, t) => e + J.length(t), 0);
  }
  slice(e = 0, t = 1 / 0) {
    const s = [], r = J.iterator(this.ops);
    let i = 0;
    for (; i < t && r.hasNext(); ) {
      let o;
      i < e ? o = r.next(e - i) : (o = r.next(t - i), s.push(o)), i += J.length(o);
    }
    return new se(s);
  }
  compose(e, t) {
    const s = J.iterator(this.ops), r = J.iterator(e.ops), i = [], o = r.peek();
    if (o != null && typeof o.retain == "number" && o.attributes == null) {
      let l = o.retain;
      for (; s.peekType() === "insert" && s.peekLength() <= l; )
        l -= s.peekLength(), i.push(s.next());
      o.retain - l > 0 && r.next(o.retain - l);
    }
    const c = new se(i);
    for (; s.hasNext() || r.hasNext(); )
      if (r.peekType() === "insert")
        c.push(r.next());
      else if (s.peekType() === "delete")
        c.push(s.next());
      else {
        const l = Math.min(s.peekLength(), r.peekLength()), a = s.next(l), h = r.next(l);
        if (typeof h.retain == "number") {
          let g;
          const f = h.attributes && re.compose(
            a.attributes,
            h.attributes,
            !t && typeof a.retain == "number"
          );
          if (h.attributes && !B(f, a.attributes) ? (g = {}, typeof a.retain == "number" ? g.retain = l : g.insert = a.insert, f && (g.attributes = f)) : a.retain === 1 / 0 ? g = h : g = a, c.push(g), h.retain === 1 / 0 || !r.hasNext() && B(c.ops[c.ops.length - 1], g)) {
            const m = new se(s.rest());
            return c.concat(m).chop();
          }
        } else typeof h.delete == "number" && typeof a.retain == "number" && c.push(h);
      }
    return c.chop();
  }
  concat(e) {
    const t = new se(this.ops.slice());
    return e.ops.length > 0 && (t.push(e.ops[0]), t.ops = t.ops.concat(e.ops.slice(1))), t;
  }
  diff(e, t) {
    if (this.ops === e.ops)
      return new se();
    const s = [this, e].map((l) => l.map((a) => {
      if (a.insert != null)
        return typeof a.insert == "string" ? a.insert : Tn;
      const h = l === e ? "on" : "with";
      throw new Error("diff() called " + h + " non-document");
    }).join("")), r = new se(), i = de(s[0], s[1], t), o = J.iterator(this.ops), c = J.iterator(e.ops);
    return i.forEach((l) => {
      let a = l[1].length;
      for (; a > 0; ) {
        let h = 0;
        switch (l[0]) {
          case de.INSERT:
            h = Math.min(c.peekLength(), a), r.push(c.next(h));
            break;
          case de.DELETE:
            h = Math.min(a, o.peekLength()), o.next(h), r.delete(h);
            break;
          case de.EQUAL:
            h = Math.min(o.peekLength(), c.peekLength(), a);
            const g = o.next(h), f = c.next(h);
            B(g.insert, f.insert) ? r.retain(h, re.diff(g.attributes, f.attributes)) : r.push(f).delete(h);
            break;
        }
        a -= h;
      }
    }), r.chop();
  }
  eachLine(e, t = `
`) {
    const s = J.iterator(this.ops);
    let r = new se(), i = 0;
    for (; s.hasNext(); ) {
      if (s.peekType() !== "insert")
        return;
      const o = s.peek(), c = J.length(o) - s.peekLength(), l = typeof o.insert == "string" ? o.insert.indexOf(t, c) - c : -1;
      if (l < 0)
        r.push(s.next());
      else if (l > 0)
        r.push(s.next(l));
      else {
        if (e(r, s.next(1).attributes || {}, i) === !1)
          return;
        i += 1, r = new se();
      }
    }
    r.length() > 0 && e(r, {}, i);
  }
  invert(e) {
    const t = new se();
    return this.reduce((s, r) => {
      if (r.insert)
        t.delete(J.length(r));
      else {
        if (r.retain && r.attributes == null)
          return t.retain(r.retain), s + r.retain;
        if (r.delete || r.retain) {
          const i = r.delete || r.retain;
          return e.slice(s, s + i).forEach((c) => {
            r.delete ? t.push(c) : r.retain && r.attributes && t.retain(J.length(c), re.invert(r.attributes, c.attributes));
          }), s + i;
        }
      }
      return s;
    }, 0), t.chop();
  }
  transform(e, t = !1) {
    if (t = !!t, typeof e == "number")
      return this.transformPosition(e, t);
    const s = e, r = J.iterator(this.ops), i = J.iterator(s.ops), o = new se();
    for (; r.hasNext() || i.hasNext(); )
      if (r.peekType() === "insert" && (t || i.peekType() !== "insert"))
        o.retain(J.length(r.next()));
      else if (i.peekType() === "insert")
        o.push(i.next());
      else {
        const c = Math.min(r.peekLength(), i.peekLength()), l = r.next(c), a = i.next(c);
        if (l.delete)
          continue;
        a.delete ? o.push(a) : o.retain(c, re.transform(l.attributes, a.attributes, t));
      }
    return o.chop();
  }
  transformPosition(e, t = !1) {
    t = !!t;
    const s = J.iterator(this.ops);
    let r = 0;
    for (; s.hasNext() && r <= e; ) {
      const i = s.peekLength(), o = s.peekType();
      if (s.next(), o === "delete") {
        e -= Math.min(i, e - r);
        continue;
      } else o === "insert" && (r < e || !t) && (e += i);
      r += i;
    }
    return e;
  }
};
x(se, "Op", J), x(se, "AttributeMap", re);
let Y = se;
function V(n) {
  return n && (n[0] > n[1] && (n = [n[1], n[0]]), n);
}
function Ht(n) {
  return n.map(
    (e) => typeof e.insert == "string" ? e.insert : e.insert ? " " : ""
  ).join("");
}
const xn = /* @__PURE__ */ new Map(), Fn = {
  id: "",
  attributes: {},
  content: new Y([{ retain: 1 / 0 }]),
  length: 1 / 0
};
var Ne;
((n) => {
  function e(f, m) {
    return new kn(f, m);
  }
  n.iterator = e;
  function t(f) {
    const m = /* @__PURE__ */ new Map();
    return f.forEach(
      (p) => m.set(p.id || n.createId(m), p)
    ), m;
  }
  n.linesToLineIds = t;
  function s(f) {
    return f.length;
  }
  n.length = s;
  function r(f) {
    return console.warn("getId() is deprecated"), f.id;
  }
  n.getId = r;
  function i(f, m) {
    return B(f.attributes, m.attributes) && B(f.content.ops, m.content.ops);
  }
  n.equal = i;
  function o(f, m) {
    const p = [], b = new Map(m || []);
    return f.eachLine((A, T) => {
      const _ = n.create(
        A,
        Object.keys(T).length ? T : void 0,
        b
      );
      b.set(_.id, _), p.push(_);
    }), p;
  }
  n.fromDelta = o;
  function c(f) {
    let m = new Y();
    return f.forEach((p) => {
      m = m.concat(p.content), m.insert(`
`, p.attributes);
    }), m;
  }
  n.toDelta = c;
  function l(f = new Y(), m = {}, p) {
    const b = f.length() + 1;
    return typeof p != "string" && (p = g(p)), { id: p, attributes: m, content: f, length: b };
  }
  n.create = l;
  function a(f, m = new Y(), p) {
    const b = f ? f.id : g(p), A = f ? f.attributes : {};
    return { id: b, attributes: A, content: m, length: 1 };
  }
  n.createFrom = a;
  function h(f) {
    const m = /* @__PURE__ */ new Map();
    let p = 0;
    return f.forEach((b) => {
      m.set(b, [p, p += b.length]);
    }), m;
  }
  n.getLineRanges = h;
  function g(f = xn) {
    let m;
    for (; f[m = Math.random().toString(36).slice(2)]; ) ;
    return m;
  }
  n.createId = g;
})(Ne || (Ne = {}));
const te = Ne;
class kn {
  constructor(e, t) {
    x(this, "lines");
    x(this, "index");
    x(this, "offset");
    x(this, "lineIds");
    this.lines = e, this.index = 0, this.offset = 0, this.lineIds = t ? new Map(t) : Ne.linesToLineIds(e);
  }
  hasNext() {
    return !!this.peek();
  }
  next(e) {
    e || (e = 1 / 0);
    const t = this.lines[this.index];
    if (t) {
      const s = this.offset, r = t.length;
      if (e >= r - s ? (e = r - s, this.index += 1, this.offset = 0) : this.offset += e, s === 0 && e >= t.length)
        return t;
      {
        const i = s === 0 ? t.id : Ne.createId(this.lineIds), o = {
          id: i,
          attributes: t.attributes,
          content: t.content.slice(s, e),
          length: e - s
        };
        return s !== 0 && this.lineIds.set(i, o), o;
      }
    } else
      return Fn;
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
        const e = this.offset, t = this.index, s = this.next(), r = this.lines.slice(this.index);
        return this.offset = e, this.index = t, [s].concat(r);
      }
    } else return [];
  }
}
var et;
((n) => {
  function e(s, r) {
    return new Mn(s, r);
  }
  n.iterator = e;
  function t(s) {
    return J.length(s);
  }
  n.length = t;
})(et || (et = {}));
const Xe = et;
class Mn {
  constructor(e, t) {
    x(this, "lineIterator");
    x(this, "opIterator");
    this.lineIterator = te.iterator(e, t);
    const s = this.lineIterator.peek();
    this.opIterator = J.iterator((s == null ? void 0 : s.content.ops) || []);
  }
  hasNext() {
    return this.opIterator.hasNext() || this.lineIterator.hasNext();
  }
  next(e) {
    let t = this.opIterator.next(e);
    return t.retain === 1 / 0 && this.lineIterator.hasNext() && (t = dt(this.nextLine())), t;
  }
  nextLine() {
    const e = this.lineIterator.next(), t = this.lineIterator.peek();
    return this.opIterator = new $t((t == null ? void 0 : t.content.ops) || []), e;
  }
  peek() {
    return this.opIterator.hasNext() || !this.lineIterator.hasNext() ? this.opIterator.peek() : dt(this.peekLine());
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
function dt(n) {
  const e = { insert: `
` };
  return n.attributes && (e.attributes = n.attributes), e;
}
const gt = [0, 0], _n = {}, In = /* @__PURE__ */ new WeakMap(), Sn = /* @__PURE__ */ new Set(["id"]);
class oe {
  constructor(e, t = null) {
    x(this, "_ranges");
    x(this, "byId");
    x(this, "lines");
    x(this, "length");
    x(this, "selection");
    if (e && e.lines) {
      const s = e;
      this.lines = s.lines, this.byId = s.byId, this._ranges = s._ranges, this.length = s.length;
    } else
      this.byId = /* @__PURE__ */ new Map(), e && Array.isArray(e) ? this.lines = e : e ? this.lines = te.fromDelta(e) : this.lines = [te.create()], this.lines.length || this.lines.push(te.create()), this.byId = te.linesToLineIds(this.lines), this.lines.forEach((s) => {
        if (this.byId.get(s.id) !== s)
          throw new Error("TextDocument has duplicate line ids: " + s.id);
      }), this._ranges = te.getLineRanges(this.lines), this.length = this.lines.reduce(
        (s, r) => s + r.length,
        0
      );
    t && (t = t.map(
      (s) => Math.min(this.length, Math.max(0, s))
    ), t[0] === t[1] && t[0] === this.length && t[0]--), this.selection = t;
  }
  get change() {
    const e = new le(this);
    return e.apply = () => this.apply(e), e;
  }
  getText(e) {
    return e && (e = V(e)), Ht(
      e ? this.slice(e[0], e[1]) : this.slice(0, this.length - 1)
    );
  }
  getLineBy(e) {
    return this.byId.get(e);
  }
  getLineAt(e) {
    return this.lines.find((t) => {
      const [s, r] = this.getLineRange(t);
      return s <= e && r > e;
    });
  }
  getLinesAt(e, t) {
    let s, r;
    return Array.isArray(e) ? [s, r] = V(e) : s = r = e, this.lines.filter((i) => {
      const [o, c] = this.getLineRange(i);
      return t ? o >= s && c <= r : (o < r || o === s) && c > s;
    });
  }
  getLineRange(e) {
    const { lines: t, _ranges: s } = this;
    if (typeof e == "number") {
      for (let r = 0; r < t.length; r++) {
        const i = s.get(t[r]) || gt;
        if (i[0] <= e && i[1] > e) return i;
      }
      return gt;
    } else
      return typeof e == "string" && (e = this.getLineBy(e)), s.get(e);
  }
  getLineRanges(e) {
    return e == null ? Array.from(this._ranges.values()) : this.getLinesAt(e).map((t) => this.getLineRange(t));
  }
  getLineFormat(e = this.selection, t) {
    let s = e;
    return Array.isArray(e) && ([e, s] = V(e)), e === s && s++, pt(te, this.lines, e, s, void 0, t);
  }
  getTextFormat(e = this.selection, t) {
    let s = e;
    return Array.isArray(e) && ([e, s] = V(e)), e === s && e--, pt(
      Xe,
      this.lines,
      e,
      s,
      (r) => r.insert !== `
`,
      t
    );
  }
  getFormats(e = this.selection, t) {
    return {
      ...this.getTextFormat(e, t),
      ...this.getLineFormat(e, t)
    };
  }
  slice(e = 0, t = 1 / 0) {
    const s = [], r = Xe.iterator(this.lines);
    let i = 0;
    for (; i < t && r.hasNext(); ) {
      let o;
      i < e ? o = r.next(e - i) : (o = r.next(t - i), s.push(o)), i += J.length(o);
    }
    return new Y(s);
  }
  apply(e, t, s) {
    var g;
    let r;
    if (e.delta ? (r = e.delta, t = e.selection) : r = e, !r.ops.length && (t === void 0 || B(this.selection, t)))
      return this;
    if (!r.ops.length && t)
      return new oe(this, t);
    t === void 0 && this.selection && (t = [
      r.transformPosition(this.selection[0]),
      r.transformPosition(this.selection[1])
    ], B(this.selection, t) && (t = this.selection));
    const i = Xe.iterator(this.lines, this.byId), o = J.iterator(r.ops), c = [], l = o.peek();
    if (l && l.retain && !l.attributes) {
      let f = l.retain;
      for (; i.peekLineLength() <= f; )
        f -= i.peekLineLength(), c.push(i.nextLine());
      l.retain - f > 0 && o.next(l.retain - f);
    }
    if (!i.hasNext() && s)
      throw new Error(
        "apply() called with change that extends beyond document"
      );
    let a = te.createFrom(i.peekLine());
    function h(f) {
      f.length = f.content.length() + 1, c.push(f);
    }
    for (; i.hasNext() || o.hasNext(); )
      if (o.peekType() === "insert") {
        const f = o.peek(), m = typeof f.insert == "string" ? f.insert.indexOf(`
`, o.offset) : -1;
        if (m < 0)
          a.content.push(o.next());
        else {
          const p = m - o.offset;
          p && a.content.push(o.next(p));
          const b = o.next(1);
          h(te.create(a.content, b.attributes, a.id)), a = te.create(void 0, a.attributes);
        }
      } else {
        const f = Math.min(i.peekLength(), o.peekLength()), m = i.next(f), p = o.next(f);
        if (typeof m.retain == "number") {
          if (s)
            throw new Error(
              "apply() called with change that extends beyond document"
            );
          continue;
        }
        if (typeof p.retain == "number") {
          const b = m.insert === `
`;
          let A = m;
          const T = p.attributes && re.compose(m.attributes, p.attributes);
          if (p.attributes && !B(T, m.attributes) && (b ? a.attributes = T || {} : (A = { insert: m.insert }, T && (A.attributes = T))), b ? (h(a), a = te.createFrom(i.peekLine())) : a.content.push(A), p.retain === 1 / 0 || !o.hasNext()) {
            if (i.opIterator.index !== 0 || i.opIterator.offset !== 0) {
              const _ = i.restCurrentLine();
              for (let M = 0; M < _.length; M++)
                a.content.push(_[M]);
              h(a), i.nextLine();
            }
            c.push(...i.restLines());
            break;
          }
        } else typeof p.delete == "number" && m.insert === `
` && (a = te.create(a.content, (g = i.peekLine()) == null ? void 0 : g.attributes, a.id));
      }
    return c.length || c.push(a), new oe(c, t);
  }
  replace(e, t) {
    return new oe(e, t);
  }
  toDelta() {
    const e = In;
    let t = e.get(this);
    return t || (t = te.toDelta(this.lines), e.set(this, t)), t;
  }
  equals(e, t) {
    return this === e || ((t == null ? void 0 : t.contentOnly) || B(this.selection, e.selection)) && B(this.lines, e.lines, { excludeProps: Sn });
  }
  toJSON() {
    return this.toDelta();
  }
  toString() {
    return this.lines.map(
      (e) => e.content.map((t) => typeof t.insert == "string" ? t.insert : " ").join("")
    ).join(`
`) + `
`;
  }
}
function pt(n, e, t, s, r, i) {
  const o = n.iterator(e);
  let c, l = 0;
  for (o.skip && (l += o.skip(t)); l < s && o.hasNext(); ) {
    const a = o.next();
    l += n.length(a), l > t && (!r || r(a)) && (a.attributes ? c ? i != null && i.allFormats ? c = re.compose(c, a.attributes) : c = Rn(
      c,
      a.attributes,
      i == null ? void 0 : i.nameOnly
    ) : c = { ...a.attributes } : c = {});
  }
  return c || _n;
}
function Rn(n, e, t) {
  return Object.keys(e).reduce(function(s, r) {
    return t ? r in n && r in e && (s[r] = !0) : B(n[r], e[r], { partial: !0 }) ? s[r] = e[r] : B(e[r], n[r], { partial: !0 }) && (s[r] = n[r]), s;
  }, {});
}
class le {
  constructor(e, t = new Y(), s, r) {
    x(this, "_pos");
    x(this, "doc");
    x(this, "delta");
    x(this, "selection");
    x(this, "activeFormats");
    this._pos = 0, this.doc = e, this.delta = t, this.selection = s, this.activeFormats = r;
  }
  get contentChanged() {
    return this.delta.ops.length > 0;
  }
  get selectionChanged() {
    var e;
    return this.selection !== void 0 && !B(this.selection, (e = this.doc) == null ? void 0 : e.selection);
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
  delete(e, t) {
    if (!e || !this.doc) return this;
    let [s, r] = V(e);
    if (s === r) return this;
    if (s = Math.min(this.doc.length - 1, Math.max(0, s)), r = Math.min(this.doc.length, Math.max(0, r)), s === r) return this;
    const i = r - s;
    this.doc.selection && (this.selection = [s, s]), this.compose(s, (c) => c.delete(i), i);
    const o = this.doc.getLineRange(s);
    if (!(t != null && t.dontFixNewline) && o[1] <= r) {
      const c = this.doc.getLineAt(s).attributes;
      this.formatLine(r, c);
    }
    return this;
  }
  insert(e, t, s, r) {
    if (!this.doc) return this;
    if (e = this.normalizePoint(e), this.doc.selection) {
      const c = e + (typeof t == "string" ? t.length : 1);
      this.selection = [c, c];
    }
    const { id: i, ...o } = this.doc.getLineAt(e).attributes;
    if (typeof t != "string")
      this.compose(e, (c) => c.insert(t, s));
    else if (t === `
`)
      r != null && r.dontFixNewline ? this.compose(e, (c) => c.insert(`
`, { ...s })) : (this.compose(e, (c) => c.insert(`
`, o)), this.formatLine(e, { ...s }));
    else if (s || (s = this.getFormatAt(e)), t.includes(`
`)) {
      const c = t.split(`
`);
      this.compose(e, (l) => (c.forEach((a, h) => {
        h && l.insert(`
`, h === 1 ? o : {}), a.length && l.insert(a, s);
      }), l));
    } else
      this.compose(e, (c) => c.insert(t, s));
    return this;
  }
  insertContent(e, t) {
    if (!this.doc) return this;
    if (e = this.normalizePoint(e), this.doc.selection) {
      const i = t.ops.filter((c) => c.delete);
      for (; i.length && i[i.length - 1].retain; ) i.pop();
      const o = e + i.reduce((c, l) => c + J.length(l), 0);
      this.selection = [o, o];
    }
    const r = Ht(t).indexOf(`
`);
    return r !== -1 && (t = t.compose(
      new Y().retain(r).retain(1, this.doc.getLineFormat(e))
    )), this.compose(e, (i) => i.concat(t)), this;
  }
  formatText(e, t) {
    return this.doc ? (e = V(e), e[1] - e[0] ? (t && Object.keys(t).forEach(
      (r) => t[r] === !1 && (t[r] = null)
    ), this.doc.getLineRanges(e).forEach(([r, i]) => {
      r = Math.max(e[0], r), i = Math.min(e[1], i - 1);
      const o = i - r;
      this.compose(r, (c) => c.retain(o, t), o);
    }), this) : this) : this;
  }
  toggleTextFormat(e, t) {
    if (!this.doc) return this;
    typeof e == "number" && (e = [e, e]), e = V(e);
    const s = this.doc.getTextFormat(e);
    return tt(t, s) && (t = re.invert(t)), this.formatText(e, t);
  }
  formatLine(e, t, s) {
    if (!this.doc) return this;
    const r = this.doc;
    return typeof e == "number" && (e = [e, e]), e = V(e), this.doc.getLineRanges(e).forEach(([, i]) => {
      i--, s || (t = { ...re.invert(r.getLineFormat(i)), ...t }), this.compose(i, (o) => o.retain(1, t), 1);
    }), this.delta.chop(), this;
  }
  toggleLineFormat(e, t) {
    if (!this.doc) return this;
    typeof e == "number" && (e = [e, e]), e = V(e);
    const s = this.doc.getLineFormat(e);
    return tt(t, s) && (t = re.invert(t)), this.formatLine(e, t);
  }
  removeFormat(e) {
    if (!this.doc) return this;
    e = V(e);
    const t = re.invert(this.doc.getFormats(e)), s = e[1] - e[0];
    return this.compose(
      e[0],
      (r) => r.retain(s, t),
      s
    );
  }
  transform(e, t) {
    const s = this.delta.transform(e.delta, t), r = e.selection && this.transformSelection(e.selection);
    return new le(null, s, r);
  }
  transformSelection(e, t) {
    if (!e) return e;
    const s = this.delta.transformPosition(e[0], t), r = this.delta.transformPosition(e[1], t);
    return s === e[0] && r === e[1] ? e : [s, r];
  }
  transformAgainst(e, t) {
    return (e.ops ? new le(null, e) : e).transform(this, !t);
  }
  isFor(e) {
    return this.doc === e;
  }
  clone() {
    var e;
    return new le(
      this.doc,
      new Y(this.delta.ops.slice()),
      (e = this.selection) == null ? void 0 : e.slice()
    );
  }
  compose(e, t, s) {
    return this._pos <= e ? this.delta = t(this.delta.retain(e - this._pos)) : this.delta = this.delta.compose(t(new Y().retain(e))), this._pos = Math.max(e + (s || 0), this._pos), this;
  }
  normalizePoint(e, t = this.doc ? this.doc.length - 1 : 0) {
    return Math.max(0, Math.min(t, e));
  }
  getFormatAt(e) {
    let t;
    if (this.doc) {
      const s = this.doc.getTextFormat(e), r = this.doc.getTextFormat(e + 1);
      s && r && (t = s === r ? s : Dn(r, Object.keys(s)));
    }
    return t;
  }
}
function tt(n, e) {
  return Object.keys(n).every(
    (t) => B(e[t], n[t])
  );
}
function Dn(n, e) {
  const t = {};
  return Object.keys(n).forEach((s) => {
    n[s] === e[s] && (t[s] = n[s]);
  }), t;
}
const nt = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap();
class Cn {
  on(e, t, s) {
    this.addEventListener(e, t, s);
  }
  off(e, t, s) {
    this.removeEventListener(e, t, s);
  }
  addEventListener(e, t, s) {
    s != null && s.once && (t = mt(this, e, t, !0)), De(this, e, !0).add(t);
  }
  removeEventListener(e, t, s) {
    if (s != null && s.once && (t = mt(this, e, t)), !t) return;
    const r = De(this, e);
    r && r.delete(t);
  }
  dispatchEvent(e, t) {
    let s = !1;
    e.bubbles && (e.stopImmediatePropagation = e.stopPropagation = () => s = !0);
    const r = De(this, e.type);
    if (r)
      for (let i of r) {
        if (t)
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
function De(n, e, t = !1) {
  let s = nt.get(n);
  return !s && t && nt.set(n, s = /* @__PURE__ */ Object.create(null)), s && s[e] || t && (s[e] = /* @__PURE__ */ new Set());
}
function mt(n, e, t, s = !1) {
  let r = On.get(n);
  !r && s && nt.set(n, r = /* @__PURE__ */ Object.create(null));
  const i = r && r[e] || s && (r[e] = /* @__PURE__ */ new Map());
  if (!i.has(t) && s) {
    const o = (c) => {
      const l = De(n, e);
      l && l.delete(t), t.call(n, c);
    };
    i.set(t, o);
  }
  return i && i.get(t);
}
var ce = /* @__PURE__ */ ((n) => (n.api = "api", n.user = "user", n.history = "history", n.input = "input", n.paste = "paste", n))(ce || {});
const st = {
  renderKeys: !1
}, Bn = [], Pn = "http://www.w3.org/2000/svg", rt = "data-key", jn = /* @__PURE__ */ new Set(["value", "selected", "checked", "contentEditable"]), ue = (n) => n == null ? n : n.key, Wt = (n, e) => {
  e && e !== n.key && (n.key = e, st.renderKeys && n.setAttribute(rt, e)), !e && n.key && (delete n.key, st.renderKeys && n.removeAttribute(rt));
}, bt = (n) => {
  n.currentTarget.events[n.type](n);
}, Ut = (n, e, t, s, r) => {
  e === "key" || (e[0] === "o" && e[1] === "n" ? ((n.events || (n.events = {}))[e = e.slice(2)] = s) ? t || n.addEventListener(e, bt) : n.removeEventListener(e, bt) : s == null ? n.removeAttribute(e) : !r && e !== "list" && e !== "form" && e in n ? n[e] = s ?? "" : n.setAttribute(e, s));
}, je = (n, e) => {
  if (typeof n == "string")
    return document.createTextNode(n);
  var t = n.props, s = (e = e || n.type === "svg") ? document.createElementNS(Pn, n.type, { is: t.is }) : document.createElement(n.type, { is: t.is });
  for (var r in t) Ut(s, r, null, t[r], e);
  return Wt(s, ue(n)), n.children.forEach((i) => s.appendChild(je(ve(i), e))), s;
}, Yt = (n, e) => {
  const t = {};
  for (let s = 0; s < n.attributes.length; s++) {
    const { name: r, value: i } = n.attributes[s];
    r in n && r !== "list" && !e ? t[r] = n[r] : (!st.renderKeys || r !== rt) && (t[r] = i === "" ? !0 : i);
  }
  return t;
}, me = (n, e, t, s, r) => {
  if (typeof s == "string")
    t != null && t.nodeType === Node.TEXT_NODE ? t.nodeValue !== s && (e.nodeValue = s) : (e = n.insertBefore(je(s, r), e), t != null && n.removeChild(t));
  else if (t == null || t.nodeName.toLowerCase() !== s.type)
    e = n.insertBefore(je(ve(s), r), e), t != null && n.removeChild(t);
  else {
    var i = Yt(t, r), o = s.props;
    r = r || s.type === "svg";
    for (var c in { ...i, ...o })
      (jn.has(c) ? e[c] : i[c]) !== o[c] && Ut(e, c, i[c], o[c], r);
    Wt(e, s.key), Qt(e, s.children, r);
  }
  return e;
}, Qt = (n, e, t, s = Array.from(n.childNodes)) => {
  for (var r, i, o, c, l = 0, a = 0, h = s.length - 1, g = e.length - 1; a <= g && l <= h && !((o = ue(s[l])) == null || o !== ue(e[a])); )
    me(n, s[l], s[l++], e[a] = ve(e[a++]), t);
  for (; a <= g && l <= h && !((o = ue(s[h])) == null || o !== ue(e[g])); )
    s[h] = me(
      n,
      s[h],
      s[h--],
      e[g] = ve(e[g--]),
      t
    );
  if (l > h) {
    const f = s[l] || s[l - 1] && s[l - 1].nextSibling || null;
    for (; a <= g; )
      n.insertBefore(je(e[a] = ve(e[a++]), t), f);
  } else if (a > g)
    for (; l <= h; )
      n.removeChild(s[l++]);
  else {
    const f = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
    for (let p = l; p <= h; p++)
      (o = ue(s[p])) != null && f.set(o, s[p]);
    for (; a <= g; ) {
      if (o = ue(i = s[l]), c = ue(e[a] = ve(e[a])), m.has(o) || c != null && c === ue(s[l + 1])) {
        o == null && n.removeChild(i), l++;
        continue;
      }
      c == null ? (o == null && (me(n, i, i, e[a], t), a++), l++) : (o === c ? (me(n, i, i, e[a], t), m.add(c), l++) : (r = f.get(c)) != null ? (me(n, n.insertBefore(r, i), r, e[a], t), m.add(c)) : me(n, i, null, e[a], t), a++);
    }
    for (; l <= h; )
      ue(i = s[l++]) == null && n.removeChild(i);
    for (const [p, b] of f)
      m.has(p) || n.removeChild(b);
  }
  return n;
}, ve = (n) => n !== !0 && n !== !1 && n ? n : "", Xt = (n, e, t, s) => ({
  type: n,
  props: e,
  children: t,
  key: s
}), zn = (n) => n.nodeType === Node.TEXT_NODE ? n.nodeValue : Xt(
  n.nodeName.toLowerCase(),
  Yt(n),
  Bn.map.call(n.childNodes, zn),
  ue(n)
), j = (n, e, t) => typeof n == "function" ? n(e || {}, t) : Xt(n, e || {}, Array.isArray(t) ? t : t == null ? [] : [t], e == null ? void 0 : e.key), pr = { createElement: j }, Fe = (n, e, t) => (Array.isArray(e) ? n = Qt(n, e, n instanceof window.SVGElement, t) : n = me(n.parentNode, n, n, e), n), $n = /;\s*$/, Hn = {
  name: "decoration",
  selector: "span.format.decoration",
  fromDom: !1,
  render: (n, e) => ot(j("span", {}, e), n, ["format", "decoration"])
}, Wn = {
  name: "decoration",
  selector: ".embed.decoration",
  fromDom: !1,
  noFill: !0,
  render: (n, e) => {
    const t = "embed decoration", { name: s, ...r } = n.decoration;
    return r.class = r.class ? t + " " + r.class : t, j(s || "span", r, e);
  }
};
class Un extends Event {
  constructor(t, s) {
    super(t, s);
    x(this, "old");
    x(this, "doc");
    x(this, "change");
    x(this, "changedLines");
    this.old = s.old, this.doc = s.doc, this.change = s.change, this.changedLines = s.changedLines;
  }
}
function Yn(n) {
  n.typeset.formats.add(Hn), n.typeset.embeds.add(Wn);
  const e = /* @__PURE__ */ new Map();
  let t = n.doc, s = t, r = t, i = !1;
  n.on("change", h), n.on("render", f);
  function o(m) {
    if (!m) throw new TypeError("A decoration name is required");
    const p = e.get(m);
    return new Qn(m, n.doc, p, a, c);
  }
  function c(m) {
    var A, T;
    if (!m) throw new TypeError("A decoration name is required");
    const p = e.get(m);
    if (!p) return !1;
    const b = Zt(m, p, t);
    return e.delete(m), e.size ? r = r.apply(b) : r = t, i || ((A = n.modules.rendering) == null || A.render({ old: s, doc: r }), (T = n.modules.selection) == null || T.renderSelection()), !0;
  }
  function l() {
    e.size && e.clear(), r = t;
  }
  function a(m, p) {
    var T, _;
    const b = e.get(m), A = b ? b.compose(p, !0) : p;
    B(A, b) || !b && !A.ops.length || (A.ops.length ? e.set(m, A) : e.delete(m), r = e.size ? r.apply(p, null) : t, i || ((T = n.modules.rendering) == null || T.render({ old: s, doc: r }), (_ = n.modules.selection) == null || _.renderSelection()));
  }
  function h(m) {
    const { change: p, changedLines: b } = m;
    if (t = m.doc, p) {
      if (p.contentChanged) {
        for (let [A, T] of e)
          T = p.delta.transform(T, !0), T.ops.length ? e.set(A, T) : e.delete(A);
        r = e.size ? r.apply(p.delta, null) : t, e.size && r.lines.forEach((A, T) => {
          const _ = t.lines[T];
          A !== _ && A.id !== _.id && (A.id = _.id);
        });
      }
    } else
      l();
    g(p, b);
  }
  function g(m, p) {
    const b = { old: s, doc: t, change: m, changedLines: p };
    i = !0, n.dispatchEvent(new Un("decorate", b)), i = !1;
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
    gatherDecorations: g,
    init() {
      g();
    },
    destroy() {
      n.off("change", h), n.off("render", f);
    }
  };
}
class Qn {
  constructor(e, t, s, r, i) {
    x(this, "change");
    x(this, "_name");
    x(this, "_doc");
    x(this, "_decoration");
    x(this, "_apply");
    x(this, "_remove");
    this._name = e, this._doc = t, this.change = new le(t), this._decoration = s, this._apply = r, this._remove = i;
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
    const t = this._doc, s = [t.getLineRange(e[0])[0], t.getLineRange(e[e.length - 1])[1]];
    if (e.length === 1 || e.every((l, a) => !a || t.getLineRange(e[a - 1])[1] === t.getLineRange(l)[0]))
      return this.clear(s);
    const i = this.invert(s), o = new Y();
    let c = 0;
    return e.forEach((l) => {
      const [a, h] = t.getLineRange(l);
      o.retain(a - c).concat(i.slice(a, h)), c = h;
    }), this.change.setDelta(this.change.delta.compose(o)), this;
  }
  // Clear line of these decorations at position, by id, or by instance
  clearLine(e) {
    const t = this._doc, s = typeof e == "number" ? t.getLineAt(e) : typeof e == "string" ? t.getLineBy(e) : e;
    return this.clearLines([s]);
  }
  invert(e) {
    return this._decoration ? Zt(this._name, this._decoration, this._doc, e) : new Y();
  }
  decorateText(e, t = { class: this._name }) {
    return this.change.formatText(e, { decoration: { [this._name]: t } }), this;
  }
  decorateLine(e, t = { class: this._name }) {
    return this.change.formatLine(e, { decoration: { [this._name]: t } }, !0), this;
  }
  insertDecoration(e, t = { class: this._name }) {
    if (typeof t == "string")
      throw new Error("You may only insert embed decorations");
    return this.change.insert(e, { decoration: t }), this;
  }
}
function ot(n, e, t) {
  if (!e || !e.decoration) return n;
  const s = new Set(t);
  let r = "", i = n.props;
  Object.values(e.decoration).forEach((c) => {
    const { class: l, style: a, ...h } = c;
    l && s.add(l.trim()), a && (r += a.trim()), r && !$n.test(r) && (r += ";"), i = { ...h, ...i };
  });
  const o = Array.from(s).join(" ").trim();
  return o && (i.class = i.class ? i.class + " " + o : o), r && (i.style = i.style ? i.style + ";" + r : r), n.props = i, n;
}
function Zt(n, e, t, s) {
  let r = t.toDelta();
  return s && (r = r.slice(s[0], s[1]), e = e.slice(s[0], s[1])), e = e.invert(r), e.ops.forEach((i) => {
    var o;
    ((o = i.attributes) == null ? void 0 : o.decoration) === null && (i.attributes.decoration = { [n]: null });
  }), s && (e = new Y().retain(s[0]).concat(e)), e;
}
const Xn = [], yt = j("br", {}), Oe = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap();
function he(n, e) {
  var t, s;
  return (s = (t = ct.get(n)) == null ? void 0 : t.get(e)) == null ? void 0 : s[0];
}
function ze(n, e) {
  var t, s;
  return (s = (t = ct.get(n)) == null ? void 0 : t.get(e)) == null ? void 0 : s[1];
}
function lt(n) {
  const { root: e, doc: t } = n, s = be(n, t.lines), r = /* @__PURE__ */ new WeakMap();
  for (let o = 0; o < e.children.length; o++) {
    const c = e.children[o];
    if (!c.key) continue;
    const l = s.byKey[c.key];
    if (l)
      if (Array.isArray(l)) {
        r.set(c, [t.getLineRange(l[0])[0], t.getLineRange(l[l.length - 1])[1]]);
        const a = c.querySelectorAll(n.typeset.lines.selector);
        for (let h = 0; h < a.length; h++) {
          const g = a[h], f = t.getLineBy(g.key);
          f && r.set(g, t.getLineRange(f));
        }
      } else
        r.set(c, t.getLineRange(l));
  }
  const i = e.querySelectorAll(n.typeset.lines.selector);
  for (let o = 0; o < i.length; o++) {
    const c = i[o];
    if (r.has(c) || !c.key) continue;
    const l = t.getLineBy(c.key);
    r.set(c, t.getLineRange(l));
  }
  ct.set(e, r);
}
function it(n, e) {
  const { root: t } = n;
  n.dispatchEvent(new Event("rendering")), Fe(t, Jt(n, e)), lt(n), n.dispatchEvent(new Event("render")), n.dispatchEvent(new Event("rendered"));
}
function wt(n, e, t) {
  const { root: s } = n, r = be(n, e.lines).combined, i = be(n, t.lines).combined, [o, c] = qt(r, i);
  B(o, c) || (o[0] = Math.max(0, o[0] - 1), c[0] = Math.max(0, c[0] - 1), o[1] = Math.min(r.length, o[1] + 1), c[1] = Math.min(i.length, c[1] + 1), s.childNodes.length !== r.length && (o[1] += s.childNodes.length - r.length));
  const l = Array.from(s.childNodes).slice(o[0], o[1]), a = i.slice(c[0], c[1]);
  if (!l.length && !a.length) return it(n, t);
  n.dispatchEvent(new Event("rendering")), Fe(s, Gt(n, a), l), lt(n), n.dispatchEvent(new Event("render")), n.dispatchEvent(new Event("rendered"));
}
function Jt(n, e, t) {
  return Gt(n, be(n, e.lines).combined, t);
}
function Gt(n, e, t) {
  return e.map((s) => Kt(n, s, t)).filter(Boolean);
}
function Kt(n, e, t) {
  return Array.isArray(e) ? Jn(n, e, t) : Zn(n, e, t);
}
function Zn(n, e, t) {
  const s = $e(n, e);
  if (!s.render) throw new Error("No render method defined for line");
  const r = s.render(e.attributes, at(n, e), e, n, t);
  return ot(r, e.attributes), r.key = e.id, r;
}
function Jn(n, e, t) {
  const s = $e(n, e[0]);
  if (!s.renderMultiple) throw new Error("No render method defined for line");
  const r = s.renderMultiple(
    e.map((i) => [i.attributes, at(n, i), i.id]),
    n,
    t
  );
  return r.key = e[0].id, r;
}
function be(n, e) {
  const t = Et.get(e);
  if (t) return t;
  const s = [], r = {};
  let i = [];
  e.forEach((c, l) => {
    const a = $e(n, c);
    if (a.shouldCombine) {
      i.push(c);
      const h = e[l + 1];
      if (!h || $e(n, h) !== a || !a.shouldCombine(i[0].attributes, h.attributes)) {
        const g = Lt.get(i[0]);
        g && g.length === i.length && i.every((f, m) => g[m] === f) ? i = g : Lt.set(i[0], i), s.push(i), r[i[0].id] = i, i = [];
      }
    } else a.render && (s.push(c), r[c.id] = c);
  });
  const o = { combined: s, byKey: r };
  return Et.set(e, o), o;
}
function qt(n, e) {
  const t = n.length, s = e.length, r = Math.min(t, s);
  let i = 0, o = 0, c = 0, l = 0;
  for (let a = 0; a < r; a++)
    if (!At(n[a], e[a])) {
      i = c = a;
      break;
    }
  for (let a = 0; a < r; a++)
    if (!At(n[t - a - 1], e[s - a - 1])) {
      o = t - a, l = s - a;
      break;
    }
  return [
    [i, o],
    [c, l]
  ];
}
function at(n, e, t) {
  const { lines: s, formats: r, embeds: i } = n.typeset;
  let o = [], c = [], l = !0, a;
  return e.content.ops.forEach((h, g, f) => {
    let m = [];
    if (h.insert === "	" && h.attributes && (a = s.findByAttributes(h.attributes)) && a.child) {
      a.render && (o = He(o), l && o.push(yt), c.push(a.render(h.attributes, o, e, n, t)), o = []);
      return;
    }
    if (typeof h.insert == "string") {
      const p = f[g - 1], b = f[g + 1];
      let A = h.insert.replace(/  /g, "  ").replace(/  /g, "  ");
      (!p || typeof p.insert == "object") && (A = A.replace(/^ /, " ")), (!b || typeof b.insert == "object" || Kn(b)) && (A = A.replace(/ $/, " ")), l = !1, m.push(A);
    } else if (h.insert) {
      const p = i.findByAttributes(h.insert);
      p != null && p.render && (m.push(p.render(h.insert, Xn, e, n, t)), p.name === "br" ? l = !0 : p.noFill || (l = !1));
    }
    h.attributes && Object.keys(h.attributes).sort((p, b) => r.priority(b) - r.priority(p)).forEach((p) => {
      const b = r.get(p);
      if (b != null && b.render) {
        const A = b.render(h.attributes, m, e, n, t);
        A && (Oe.set(A, b), m = [A]);
      }
    }), o.push.apply(o, m);
  }), o = He(o), l && o.push(yt), c.length ? c : o;
}
function At(n, e) {
  return n === e ? !0 : Array.isArray(n) && Array.isArray(e) && n.length === e.length && n.every((t, s) => t === e[s]);
}
function $e(n, e) {
  let t = vt.get(e.attributes);
  return t || (t = n.typeset.lines.findByAttributes(e.attributes, !0), vt.set(e.attributes, t)), t;
}
function He(n) {
  const e = [];
  if (n.forEach((t, s) => {
    const r = e.length - 1, i = e[r];
    i && typeof i != "string" && typeof t != "string" && Oe.has(i) && Oe.get(i) === Oe.get(t) && Gn(i.props, t.props) ? i.children = i.children.concat(t.children) : i && typeof i == "string" && typeof t == "string" ? e[r] += t : (e.push(t), i && typeof i != "string" && i.children && (i.children = He(i.children)));
  }), e.length) {
    const t = e[e.length - 1];
    t && typeof t != "string" && t.children && (t.children = He(t.children));
  }
  return e;
}
function Gn(n, e) {
  return Object.keys({ ...n, ...e }).every((t) => t.slice(0, 2) === "on" || n[t] === e[t]);
}
function Kn(n) {
  return typeof n.insert == "string" && n.insert[0] === " ";
}
function qn(n) {
  n.on("change", t);
  function e(s) {
    if (s) {
      const { doc: r, old: i } = s;
      i && r ? wt(n, i, r) : r && it(n, r);
    } else {
      const { doc: r } = n.modules.decorations || n;
      it(n, r);
    }
  }
  function t(s) {
    const { doc: r, old: i } = n.modules.decorations || s;
    i.lines !== r.lines && wt(n, i, r);
  }
  return {
    render: e,
    destroy() {
      n.off("change", t);
    }
  };
}
const Ze = [], Vt = {}, en = {}, tn = {}, Vn = (n, e) => !0;
class Ce {
  constructor(e) {
    x(this, "lines");
    x(this, "formats");
    x(this, "embeds");
    var i, o, c;
    const t = (i = e.lines) == null ? void 0 : i.map((l) => typeof l == "string" ? Vt[l] : l).filter(Boolean), s = (o = e.formats) == null ? void 0 : o.map((l) => typeof l == "string" ? en[l] : l).filter(Boolean), r = (c = e.embeds) == null ? void 0 : c.map((l) => typeof l == "string" ? tn[l] : l).filter(Boolean);
    this.lines = new Je(t || Ze), this.formats = new Je(s || Ze), this.embeds = new Je(r || Ze);
  }
}
x(Ce, "line", pe), x(Ce, "format", ye), x(Ce, "embed", ut);
function pe(n) {
  return n.renderMultiple && !n.shouldCombine && (n.shouldCombine = Vn), Vt[n.name] = n;
}
function ye(n) {
  return en[n.name] = n;
}
function ut(n) {
  return tn[n.name] = n;
}
class Je {
  constructor(e) {
    // An array of the types
    x(this, "list");
    // A selector which will match all nodes of this type (e.g. all lines)
    x(this, "selector");
    // A map of all types by name
    x(this, "types");
    // A reverse lookup of priority by type name
    x(this, "priorities");
    this.list = e, this.init();
  }
  get default() {
    return this.list[0];
  }
  init() {
    this.selector = this.list.map((e) => e.selector || "").filter(Boolean).join(", "), this.types = this.list.reduce((e, t) => (e[t.name] = t, e), {}), this.priorities = this.list.reduce(
      (e, t, s) => (e[t.name] = s, e),
      {}
    );
  }
  add(e) {
    this.list.push(e), this.init();
  }
  remove(e) {
    const t = typeof e == "string" ? e : e.name;
    this.list = this.list.filter((s) => s.name !== t), this.init();
  }
  get(e) {
    return this.types[e];
  }
  priority(e) {
    const t = this.priorities[e];
    return t !== void 0 ? t : -1;
  }
  // Whether or not the provided element is one of our types
  matches(e) {
    if (!e) return !1;
    if (!e.nodeType) throw new Error("Cannot match against " + e);
    if (e.nodeType === Node.ELEMENT_NODE)
      return this.selector ? e.matches(this.selector) : !1;
  }
  findByNode(e, t = !1) {
    if (e.nodeType !== Node.ELEMENT_NODE) return;
    let s = this.list.length;
    for (; s--; ) {
      let r = this.list[s];
      if (e.matches(r.selector)) return r;
    }
    if (t) return this.default;
  }
  findByAttributes(e, t = !1) {
    const s = e && Object.keys(e);
    let r;
    return s && s.every((i) => !(r = this.get(i))), r || (t ? this.default : void 0);
  }
}
const mr = ut({
  name: "image",
  selector: "img",
  commands: (n) => (e, t) => n.insert({ image: e, ...t }),
  fromDom: (n) => {
    const e = {};
    return ["src", "alt", "width", "height"].forEach((t) => {
      if (!n.hasAttribute(t)) return;
      const s = n.getAttribute(t);
      t === "src" && (t = "image"), e[t] = s;
    }), e;
  },
  render: (n) => {
    const { image: e, ...t } = n;
    return t.src = e, j("img", t);
  }
}), br = ut({
  name: "br",
  selector: "br",
  commands: (n) => () => n.insert({ br: !0 }),
  render: () => j("br")
}), yr = ye({
  name: "underline",
  selector: "u",
  styleSelector: '[style*="text-decoration: underline"]',
  commands: (n) => () => n.toggleTextFormat({ underline: !0 }),
  shortcuts: "Mod+Y",
  render: (n, e) => j("u", null, e)
}), vr = ye({
  name: "bold",
  selector: "strong, b",
  styleSelector: '[style*="font-weight:bold"], [style*="font-weight: bold"]',
  commands: (n) => () => n.toggleTextFormat({ bold: !0 }),
  shortcuts: "Mod+B",
  render: (n, e) => j("strong", null, e)
}), Lr = ye({
  name: "italic",
  selector: "em, i, u,mark",
  styleSelector: '[style*="font-style:italic"], [style*="font-style: italic"]',
  commands: (n) => () => n.toggleTextFormat({ italic: !0 }),
  shortcuts: "Mod+I",
  render: (n, e) => j("i", null, e)
}), Er = ye({
  name: "mark",
  shortcuts: "Mod+M",
  selector: "mark",
  commands: (n) => () => n.toggleTextFormat({ mark: !0 }),
  render: (n, e) => j("mark", null, e)
}), wr = ye({
  name: "code",
  selector: "code, u",
  commands: (n) => () => n.toggleTextFormat({ code: !0 }),
  render: (n, e) => j("code", null, e)
}), Ar = ye({
  name: "link",
  selector: "a[href], u",
  greedy: !1,
  // If the link is a string, it is an actual address. Otherwise it is either undefined (empty) or being called from the
  // testing code (which passes a pointer to the dom object, hence the conversion to a boolean which works with the toggleTextFormat)
  commands: (n) => (e) => n.toggleTextFormat({ link: typeof e == "string" ? e : !!e }),
  fromDom: (n) => n.href,
  render: (n, e) => j("a", { href: n.link, target: "_blank" }, e)
}), Nr = pe({
  name: "paragraph",
  selector: "p",
  commands: (n) => () => n.formatLine({}),
  shortcuts: "Mod+0",
  render: (n, e) => j("p", null, e)
}), Tr = pe({
  name: "header",
  selector: "h1, h2, h3, h4, h5, h6",
  defaultFollows: !0,
  commands: (n) => ({
    header: (e) => n.toggleLineFormat({ header: e }),
    header1: () => n.toggleLineFormat({ header: 1 }),
    header2: () => n.toggleLineFormat({ header: 2 }),
    header3: () => n.toggleLineFormat({ header: 3 }),
    header4: () => n.toggleLineFormat({ header: 4 }),
    header5: () => n.toggleLineFormat({ header: 5 }),
    header6: () => n.toggleLineFormat({ header: 6 })
  }),
  shortcuts: {
    "Mod+1": "header1",
    "Mod+2": "header2",
    "Mod+3": "header3",
    "Mod+4": "header4",
    "Mod+5": "header5",
    "Mod+6": "header6"
  },
  fromDom: (n) => ({ header: parseInt(n.nodeName.replace("H", "")) }),
  render: (n, e) => j(`h${n.header}`, null, e)
}), xr = pe({
  name: "list",
  selector: "ul > li, ol > li",
  indentable: !0,
  commands: (n) => ({
    bulletList: () => n.toggleLineFormat({ list: "bullet" }),
    orderedList: () => n.toggleLineFormat({ list: "ordered" }),
    checkList: () => n.toggleLineFormat({ list: "check" }),
    indent: () => n.indent(),
    outdent: () => n.outdent(),
    toggleCheck: (e) => {
      const t = typeof e == "string" ? n.doc.getLineBy(e) : n.doc.selection ? n.doc.getLineAt(n.doc.selection[0]) : null;
      if (!t) return !1;
      const [s] = n.doc.getLineRange(t), r = { list: "check" };
      t.attributes.checked || (r.checked = !0), n.formatLine(r, s);
    }
  }),
  shortcuts: {
    "Mod+Space": "toggleCheck"
  },
  fromDom(n) {
    let e = -1, t = n.parentNode, s = t && t.getAttribute("type");
    const r = n.hasAttribute("data-checked") ? "check" : t && t.nodeName === "OL" ? "ordered" : "bullet";
    for (; t; ) {
      if (/^UL|OL$/.test(t.nodeName)) e++;
      else if (t.nodeName !== "LI") break;
      t = t.parentNode;
    }
    !e && n.className.startsWith("ql-indent-") && (e = parseInt(n.className.replace("ql-indent-", "")));
    const i = { list: r };
    return e && (i.indent = e), s && (i.type = s), n.getAttribute("data-checked") === "true" && (i.checked = !0), i;
  },
  nextLineAttributes(n) {
    const { start: e, ...t } = n;
    return t;
  },
  shouldCombine: (n, e) => n.list === e.list && !e.start && n.type === e.type || e.indent,
  renderMultiple: (n, e, t) => {
    const s = [], r = [];
    n.forEach(([o, c, l]) => {
      const a = o.list === "ordered" ? "ol" : "ul", h = o.indent || 0;
      let g = { key: l };
      if (o.list === "check") {
        let m = function(b) {
          e.enabled && (b.preventDefault(), e.commands.toggleCheck(l));
        };
        const p = j("button", { class: "check-list-check", onmousedown: m, ontouchstart: m });
        c.length === 1 && c[0].type === "br" ? c.push(p) : c.unshift(p), g = {
          ...g,
          class: "check-list-item",
          "data-checked": "" + (o.checked || !1)
        };
      }
      const f = ot(j("li", g, c), o);
      for (; h >= r.length; ) {
        const m = j(a, { start: o.start, type: o.type, key: `${l}-outer` }), p = r.length ? r[r.length - 1].children : s, b = p[p.length - 1];
        typeof b == "object" && b.type === "li" && t ? b.children.push(m) : p.push(m), r.push(m);
      }
      if (!i(r[h], a, o)) {
        const m = j(a, { start: o.start, type: o.type });
        (h ? r[h - 1].children : s).push(m), r[h] = m;
      }
      r[h].children.push(f), r.length = h + 1;
    });
    function i(o, c, l) {
      return o.type === c && (o.props.start === l.start || o.props.start && !l.start) && o.props.type === l.type;
    }
    return s[0];
  }
}), Fr = pe({
  name: "blockquote",
  selector: "blockquote p",
  commands: (n) => (e = !0) => {
    typeof e != "string" && (e = !0), n.toggleLineFormat({ blockquote: e });
  },
  fromDom(n) {
    const { className: e } = n.parentNode, t = e.match(/quote-(\S+)/);
    return { blockquote: t && t[1] !== "true" && t[1] || !0 };
  },
  shouldCombine: (n, e) => n.blockquote === e.blockquote,
  renderMultiple: (n) => {
    const e = n[0][0].blockquote, t = typeof e == "string" ? { className: `quote-${e}` } : null, s = n.map(([r, i, o]) => j("p", { key: o }, i));
    return j("blockquote", t, s);
  }
}), kr = pe({
  name: "code-block",
  selector: "pre code",
  contained: !0,
  commands: (n) => () => n.toggleLineFormat({ "code-block": !0 }),
  renderMultiple: (n) => {
    const e = [];
    return n.forEach(([t, s, r]) => {
      s.length && s[s.length - 1].type === "br" && s.pop(), e.push(j("code", { key: r }, s)), e.push(`
`);
    }), j("pre", { spellcheck: !1 }, e);
  }
}), Mr = pe({
  name: "hr",
  selector: "hr",
  frozen: !0,
  commands: (n) => () => {
    const { doc: e } = n, { selection: t } = e;
    if (!t) return;
    const s = V(t), r = n.change.delete(s);
    if (s[0] === s[1] && e.getLineAt(s[0]).length === 1)
      r.insert(s[0], `
`, { ...e.getLineFormat(s[0]) }).formatLine(s[0], { hr: !0 });
    else {
      const i = new Y().insert(`
`, e.getLineAt(s[0]).attributes).insert(`
`, { hr: !0 });
      r.insertContent(s[0], i), r.select(s[0] + 2);
    }
    n.update(r);
  },
  render: () => j("hr")
}), _r = pe({
  name: "dl",
  selector: "dl dt, dl dd",
  fromDom(n) {
    return { dl: n.nodeName.toLowerCase() };
  },
  onTab: (n, e) => {
    const { doc: t } = n, { selection: s } = t;
    if (!s) return;
    const r = e ? s[0] === s[1] || s[0] > s[1] ? s[1] : s[1] - 1 : s[0] === s[1] || s[1] > s[0] ? s[0] : s[0] - 1, i = t.getLineAt(r), o = t.lines.indexOf(i), c = t.lines[o + (e ? -1 : 1)];
    if (((c == null ? void 0 : c.attributes.dl) === i.attributes.dl || !(c != null && c.attributes.dl)) && !e)
      if (i.length === 1 && i.attributes.dl === "dt")
        n.formatLine({}, t.getLineRange(i));
      else {
        const l = t.getLineRange(i)[1] - 1;
        n.insert(`
`, { dl: i.attributes.dl === "dt" ? "dd" : "dt" }, [l, l]);
      }
    else if (c) {
      let l = t.getLineRange(c);
      l = [l[0], l[1] - 1], e && !c.attributes.dl && (l = [l[1], l[1]]), n.select(l);
    }
  },
  commands: (n) => () => n.toggleLineFormat({ dl: "dt" }),
  shouldCombine: () => !0,
  nextLineAttributes: (n) => ({ dl: n.dl === "dt" ? "dd" : "dt" }),
  renderMultiple: (n) => {
    const e = [];
    let t = "";
    for (const [s, r, i] of n)
      (!t || s.dl === "dt") && e.push(j("div", {}, [])), e[e.length - 1].children.push(j(s.dl, { key: i }, r)), t = s.dl;
    return j("dl", {}, e);
  }
}), es = {
  lines: ["paragraph", "header", "list", "blockquote", "code-block", "hr"],
  formats: ["link", "bold", "italic", "mark", "underline"],
  embeds: ["image", "br"]
}, ts = {
  Control: !0,
  Meta: !0,
  Shift: !0,
  Alt: !0
}, Ye = navigator.userAgent.indexOf("Macintosh") !== -1, nn = Ye ? /Cmd/ : /Ctrl/;
class ht extends KeyboardEvent {
  constructor(t, s) {
    super(t, s);
    x(this, "shortcut");
    x(this, "osShortcut");
    x(this, "modShortcut");
    this.shortcut = (s == null ? void 0 : s.shortcut) || "", this.osShortcut = `${Ye ? "mac" : "win"}:${this.shortcut}`, this.modShortcut = this.shortcut.replace(nn, "Mod");
  }
  static fromKeyboardEvent(t) {
    return t.shortcut = sn(t), new ht("shortcut", t);
  }
}
function ns(n) {
  return n.shortcut = sn(n), n.osShortcut = `${Ye ? "mac" : "win"}:${n.shortcut}`, n.modShortcut = n.shortcut.replace(nn, "Mod"), n;
}
function sn(n) {
  const e = [];
  let t = n.key;
  return t ? (t === " " && (t = "Space"), n.metaKey && e.push("Cmd"), n.ctrlKey && e.push("Ctrl"), n.altKey && e.push("Alt"), n.shiftKey && e.push("Shift"), ts[t] || (Ye && n.altKey && n.code && n.code.startsWith("Key") && (t = n.code.replace("Key", "")), t.length === 1 && (t = t.toUpperCase()), e.push(t)), e.join("+")) : "";
}
const _e = {}, ss = window.chrome && typeof window.chrome == "object";
function rs(n) {
  function e(h) {
    if (h.defaultPrevented) return;
    if (n.doc.selection) {
      const { lines: ee } = n.typeset, u = n.doc.getLinesAt(n.doc.selection);
      if (u.length) {
        const y = ee.findByAttributes(u[0].attributes);
        if (y != null && y.onEnter && u.every((d) => y === ee.findByAttributes(d.attributes))) {
          h.preventDefault(), y.onEnter(n);
          return;
        }
      }
    }
    const {
      typeset: { lines: g },
      doc: f
    } = n;
    let { selection: m } = f;
    if (!m) return;
    h.preventDefault();
    const [p, b] = m, A = p === b, T = f.getLineAt(m[0]), [_, M] = f.getLineRange(m[0]);
    let { id: Z, ...R } = T.attributes, D;
    const O = g.findByAttributes(R, !0), G = b === _, ie = b === M - 1;
    if (A && a(T)) {
      const ee = O.onEmptyEnter && O.onEmptyEnter(n, T), u = !O.onEmptyEnter && O !== g.default && !O.contained && !O.defaultFollows && !O.frozen;
      if ((ee || u) && o(g, f.getLineAt(p)))
        return;
    }
    p === _ && b === M && O.frozen ? (p === 0 ? (D = { dontFixNewline: !0 }, m = [p, p]) : b === f.length ? m = [b - 1, b - 1] : (D = { dontFixNewline: !0 }, m = [b, b]), R = O.nextLineAttributes ? O.nextLineAttributes(R) : _e) : ie && (O.nextLineAttributes || O.defaultFollows || O.frozen) ? R = O.nextLineAttributes ? O.nextLineAttributes(R) : _e : G && !ie && (O.defaultFollows && (R = _e), D = { dontFixNewline: !0 }), n.insert(`
`, R, m, D), p === _ && b === M && O.frozen && n.select(p === 0 ? 0 : b);
  }
  function t(h) {
    if (h.defaultPrevented) return;
    const { typeset: g, doc: f } = n;
    if (!g.embeds.get("br")) return e(h);
    f.selection && (h.preventDefault(), n.insert({ br: !0 }));
  }
  function s(h) {
    i(h, -1);
  }
  function r(h) {
    i(h, 1);
  }
  function i(h, g) {
    if (h.defaultPrevented) return;
    const {
      typeset: { lines: f },
      doc: m
    } = n, { selection: p } = m;
    if (!p) return;
    const [b, A] = p, T = b === A, [_, M] = m.getLineRange(b);
    if (!(T && (!ss || h.ctrlKey || h.altKey || h.metaKey) && (g === -1 && b !== _ || g === 1 && b !== M - 1)))
      if (h.preventDefault(), g === -1 && p[0] + p[1] === 0)
        o(f, m.getLineAt(b), !0);
      else {
        const Z = V(p), R = m.getLineAt(Z[0]), D = f.findByAttributes(R.attributes, !0);
        if (T && (g === -1 && b === _ || g === 1 && b === M - 1) && !D.contained) {
          const G = m.lines[m.lines.indexOf(R) + g], [ie, ee] = g === 1 ? [R, G] : [G, R];
          if (ie && a(ie) && ee && !a(ee))
            return n.update(
              n.change.delete([Z[0] + g, Z[0]], { dontFixNewline: !0 }),
              ce.input
            );
        }
        n.delete(g, { dontFixNewline: D.frozen });
      }
  }
  function o(h, g, f) {
    if (!g) return;
    const m = h.findByAttributes(g.attributes, !0);
    if (m) {
      if (m.indentable && g.attributes.indent)
        return n.outdent(), !0;
      if (f || m !== h.default && !m.defaultFollows)
        return n.formatLine(_e), !0;
    }
  }
  function c(h) {
    if (h.defaultPrevented) return;
    if (n.doc.selection) {
      const { lines: f } = n.typeset, m = n.doc.getLinesAt(n.doc.selection);
      if (m.length) {
        const p = f.findByAttributes(m[0].attributes);
        if (p != null && p.onTab && m.every((b) => p === f.findByAttributes(b.attributes))) {
          h.preventDefault(), p.onTab(n, h.shiftKey);
          return;
        }
      }
    }
    h.preventDefault();
    const g = h.modShortcut;
    g === "Tab" || g === "Mod+]" ? n.indent() : n.outdent();
  }
  function l(h) {
    var f;
    if (h.isComposing) return;
    ns(h);
    const g = (m) => {
      const p = m && n.shortcuts[m];
      if (p && n.commands[p])
        return h.preventDefault(), n.commands[p]() !== !1;
    };
    if (!n.root.dispatchEvent(ht.fromKeyboardEvent(h)) || g(h.shortcut) || g(h.osShortcut) || g(h.modShortcut)) {
      h.preventDefault();
      return;
    }
    switch (h.modShortcut) {
      case "Enter":
        return e(h);
      case "Shift+Enter":
        return t(h);
      case "Tab":
      case "Shift+Tab":
        return c(h);
    }
    switch ((f = h.modShortcut) == null ? void 0 : f.split("+").pop()) {
      case "Backspace":
        return s(h);
      case "Delete":
        return r(h);
      default:
        return;
    }
  }
  function a(h) {
    var g;
    return h.length === 1 && !((g = n.typeset.lines.findByAttributes(h.attributes)) != null && g.frozen);
  }
  return {
    init() {
      n.root.addEventListener("keydown", l);
    },
    destroy() {
      n.root.removeEventListener("keydown", l);
    }
  };
}
const is = NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT;
function ke(n, e) {
  return (n.ownerDocument || document).createTreeWalker(n, is, {
    acceptNode(t) {
      if (t.nodeType === Node.TEXT_NODE && t.nodeValue === "")
        return NodeFilter.FILTER_REJECT;
      if (e) {
        const s = e(t);
        return s ? s === !0 ? NodeFilter.FILTER_ACCEPT : s : NodeFilter.FILTER_REJECT;
      } else
        return NodeFilter.FILTER_ACCEPT;
    }
  });
}
const rn = "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video", os = /[\0-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200C\u200E-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB\uE000-\uF8FF]|\uD800[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, cs = { STYLE: !0, SCRIPT: !0, LINK: !0, META: !0, TITLE: !0 }, ls = /[ \t\n\r]+/g, as = {};
function Te(n, e) {
  return e.nodeName !== "BR" ? !1 : us(n, e);
}
function us(n, e) {
  const t = e.closest && e.closest(n.typeset.lines.selector);
  if (!t) return !1;
  const s = ke(t);
  s.currentNode = e;
  const r = s.nextNode();
  return !r || r instanceof HTMLElement && r.matches(rn);
}
function on(n, e) {
  return Fe(document.createElement("div"), Jt(n, e, !0)).innerHTML;
}
function hs(n, e) {
  return Fe(document.createElement("div"), at(n, te.create(e), !0)).innerHTML;
}
function Nt(n, e, t) {
  return new oe(cn(n, e), t);
}
function cn(n, e, t) {
  const r = new window.DOMParser().parseFromString(e, "text/html"), i = xe(n, {
    root: r.body,
    possiblePartial: t == null ? void 0 : t.possiblePartial,
    collapseWhitespace: t == null ? void 0 : t.collapseWhitespace
  });
  return ln(i), i;
}
function fs(n, e) {
  return new oe(xe(n, { root: e }));
}
function Ir(n, e) {
  const t = te.fromDelta(xe(n, { root: e }), n.doc.byId);
  return t.length ? n.typeset.lines.findByAttributes(t[0].attributes, !0).renderMultiple ? t : t[0] : void 0;
}
function ln(n) {
  n.ops = n.filter((e) => (typeof e.insert == "string" && (e.insert = e.insert.replace(os, "").replace(/\r\n?/g, `
`)), !!e.insert || !!e.retain || !!e.delete));
}
function xe(n, e = as) {
  const { lines: t, embeds: s } = n.typeset, r = e.root || n.root, i = e.collapseWhitespace != null ? e.collapseWhitespace : !0;
  var o = ke(r, (p) => !cs[p.nodeName]);
  const c = new Y();
  let l, a = !1, h = !1, g = !0, f, m;
  for (e.startNode ? (o.currentNode = e.startNode, o.previousNode(), e.offset && c.retain(e.offset, void 0)) : o.currentNode = r; (f = o.nextNode()) && f !== e.endNode; )
    if (Te(n, f))
      g = !1;
    else if (f.nodeName === "BR" && f.className === "Apple-interchange-newline")
      c.insert(`
`, !l || l.unknownLine ? {} : l);
    else if (f.nodeType === Node.TEXT_NODE) {
      let p = f.parentNode;
      if (f.nodeValue == null || !f.nodeValue.replace(/\s+/g, "") && (f.parentNode === r || f.previousSibling && t.matches(f.previousSibling) || f.nextSibling && t.matches(f.nextSibling)))
        continue;
      const b = f.nodeValue, T = (i ? b.replace(ls, " ") : b).replace(/\xA0/g, " ");
      if (!T || T === " " && p.classList.contains("EOP")) continue;
      const _ = Tt(p, r, n);
      g = !1, c.insert(T, _);
    } else if (s.matches(f)) {
      const p = s.findByNode(f);
      if (p) {
        const b = Tt(f.parentNode, r, n);
        p.fromDom !== !1 && c.insert(p.fromDom ? p.fromDom(f) : { [p.name]: !0 }, b);
      }
    } else if (t.matches(f) || f.nodeType === Node.ELEMENT_NODE && f.matches(rn)) {
      if (h = !t.matches(f), h) {
        let b = f.parentNode;
        for (; b && !t.matches(b) && b !== r; )
          b = b.parentNode;
        if (b && b !== r)
          continue;
      }
      const p = t.findByNode(f, !0);
      if (p === t.default && (!f.parentNode || t.matches(f.parentNode)))
        continue;
      if (p.frozen)
        for (; o.lastChild(); ) ;
      if (m && (c.insert("	", m), m = null), p.child || (a ? (!l || !l.unknownLine || !g) && (c.insert(`
`, !l || l.unknownLine ? {} : l), g = !0) : a = !0), h)
        l = { unknownLine: h };
      else if (p && p !== t.default) {
        const b = p.fromDom ? p.fromDom(f) : { [p.name]: !0 };
        p.child ? m = b : l = b;
      } else
        l = {};
      !p.child && e.includeIds && f.key && (l.id = f.key);
    }
  return (!h || !g) && (a || !e.possiblePartial) && c.insert(`
`, !l || l.unknownLine ? {} : l), c;
}
function Tt(n, e, t) {
  const { lines: s, formats: r } = t.typeset, i = {};
  for (; n && !s.matches(n) && n !== e; ) {
    if (r.matches(n)) {
      const o = r.findByNode(n);
      o && o.fromDom !== !1 && (i[o.name] = o.fromDom ? o.fromDom(n) : !0);
    } else n.hasAttribute("style") && r.list.forEach((o) => {
      o.styleSelector && n.matches(o.styleSelector) && (i[o.name] = o.fromDom ? o.fromDom(n) : !0);
    });
    n = n.parentNode;
  }
  return i;
}
const Ge = [null, 0];
function ds(n, e, t) {
  const s = n.root.ownerDocument;
  if ("caretPositionFromPoint" in s)
    try {
      const r = s.caretPositionFromPoint(e, t);
      if (r)
        return We(n, r.offsetNode, r.offset);
    } catch {
    }
  if (s.caretRangeFromPoint) {
    const r = s.caretRangeFromPoint(e, t);
    if (r)
      return We(n, r.startContainer, r.startOffset);
  }
  return null;
}
function Sr(n, e) {
  const { root: t } = n;
  if (!t.ownerDocument) return;
  const s = Array.from(t.querySelectorAll(n.typeset.lines.selector)).filter(
    (i) => i.key
  ), r = s[s.length - 1];
  for (const i of s) {
    const o = i.getBoundingClientRect();
    if (o.bottom >= e || i === r)
      return { line: n.doc.getLineBy(i.key), element: i, rect: o, belowMid: e > o.top + o.height / 2 };
  }
}
function gs(n, e) {
  e[0] > e[1] && (e = [e[1], e[0]]);
  const [t, s, r, i] = un(n, e), o = n.root.ownerDocument.createRange();
  return t && r && (o.setStart(t, s), o.setEnd(r, i)), o;
}
function xt(n, e) {
  const t = gs(n, e);
  if ((t == null ? void 0 : t.endContainer.nodeType) === Node.ELEMENT_NODE)
    try {
      t.setEnd(t.endContainer, t.endOffset + 1);
    } catch {
    }
  return t;
}
function We(n, e, t, s) {
  var o;
  const { root: r } = n, { lines: i } = n.typeset;
  if (!r.contains(e))
    return -1;
  if (e.nodeType === Node.ELEMENT_NODE) {
    if (e.childNodes.length === t) {
      if (ze(r, e) != null) return ze(r, e) - 1;
      e.childNodes.length && (e = e.childNodes[t - 1], t = ms(n, e));
    } else
      e = e.childNodes[t], t = 0;
    const c = he(r, e);
    if (c != null)
      return (o = i.findByNode(e)) != null && o.frozen ? c + t : (s == null || s < c ? c : c - 1) + t;
  }
  return an(n, e) + t;
}
function an(n, e) {
  var a;
  const { root: t } = n;
  if (!t.ownerDocument) return -1;
  const { lines: s, embeds: r } = n.typeset, i = ke(t);
  i.currentNode = e;
  let o, c = 0, l;
  for (; (o = i.previousNode()) && o !== t; )
    if ((l = he(t, o)) != null) {
      c += l;
      break;
    } else o.nodeType === Node.TEXT_NODE ? c += Ue(s, o) : (a = o.classList) != null && a.contains("decoration") || (r.matches(o) && !Te(n, o) || s.matches(o) && !o.contains(e)) && c++;
  return c;
}
function ps(n, e) {
  const { root: t } = n;
  return t.ownerDocument ? Array.from(t.querySelectorAll(n.typeset.lines.selector)).find(
    (r) => he(t, r) <= e && ze(t, r) > e
  ) : void 0;
}
function ms(n, e) {
  var c;
  const { lines: t, embeds: s } = n.typeset;
  if (s.matches(e) && !Te(n, e))
    return 1;
  if (e.nodeType === Node.TEXT_NODE) return Ue(t, e);
  const r = ke(e);
  let i = t.findByNode(e) ? 1 : 0, o;
  for (; o = r.nextNode(); )
    o.nodeType === Node.TEXT_NODE ? i += Ue(t, o) : (c = o.classList) != null && c.contains("decoration") || (s.matches(o) && !Te(n, o) || t.matches(o)) && i++;
  return i;
}
function un(n, e) {
  if (e == null)
    return [null, 0, null, 0];
  {
    const t = e[0] <= e[1], s = t ? 1 : -1, r = e[0] === e[1], [i, o, c] = Ft(n, e[0], t ? 0 : 1), [l, a] = r && !c ? [i, o] : c && (r || e[1] - e[0] === s * n.doc.getLineAt(e[0]).length) ? [i, o + (t ? 1 : -1)] : Ft(n, e[1], t ? 1 : 0);
    return [i, o, l, a];
  }
}
function Ft(n, e, t) {
  var m;
  const { root: s } = n;
  if (!s.ownerDocument) return Ge;
  const { lines: r, embeds: i } = n.typeset, o = Array.from(s.childNodes), c = ps(n, e);
  if (!c) return Ge;
  if (r.findByNode(c, !0).frozen)
    return [c.parentNode, o.indexOf(c) + t, !0];
  e -= he(s, c);
  const a = !e, h = ke(c);
  let g, f = !1;
  for (; g = h.nextNode(); )
    if (g.nodeType === Node.TEXT_NODE) {
      const p = Ue(r, g);
      if (e <= p) return [g, e];
      e -= p;
    } else if (!((m = g.classList) != null && m.contains("decoration"))) {
      if (i.matches(g) && !Te(n, g)) {
        const p = i.findByNode(g);
        if (!p || p.fromDom === !1)
          continue;
        if (e -= 1, e <= 0) {
          const b = Array.from(g.parentNode.childNodes);
          return [g.parentNode, b.indexOf(g) + 1 + e];
        }
      } else if (r.matches(g) && (f ? e -= 1 : f = !0, e === 0)) {
        const p = h.firstChild();
        if (p && p.nodeType === Node.TEXT_NODE)
          return [p, 0];
        if (p) {
          const b = Array.from(g.childNodes);
          return [g, b.indexOf(p)];
        } else
          return [g, 0];
      }
    }
  return a ? [c, 0] : Ge;
}
function Ue(n, e) {
  const t = e.nodeValue || "";
  return t.trim() || !(n.matches(e.previousSibling) || n.matches(e.nextSibling)) ? t.length : 0;
}
function hn(n) {
  var i;
  const { root: e } = n, t = n.doc.selection;
  if (!e.ownerDocument) return null;
  const s = e.ownerDocument.getSelection(), { lines: r } = n.typeset;
  if (s == null || s.anchorNode == null || s.focusNode == null || !e.contains(s.anchorNode))
    return null;
  {
    const o = We(
      n,
      s.anchorNode,
      s.anchorOffset,
      t && t[0]
    ), c = s.anchorNode === s.focusNode && s.anchorOffset === s.focusOffset, l = r.findByAttributes((i = n.doc.getLineAt(o)) == null ? void 0 : i.attributes, !0).frozen;
    let a = c ? o : We(
      n,
      s.focusNode,
      s.focusOffset,
      !l && t ? t[1] : null
    );
    return [o, a];
  }
}
function Be(n, e) {
  const { root: t } = n;
  if (!t.ownerDocument) return;
  const s = t.ownerDocument.getSelection();
  if (!s) return;
  const r = s.anchorNode && t.contains(s.anchorNode) && document.activeElement !== document.body;
  if (e == null)
    r && (s.removeAllRanges(), t.classList.contains("focus") && t.classList.remove("focus"));
  else {
    const [i, o, c, l] = un(n, e), a = e[0] === e[1] ? "Caret" : "Range";
    i && c && (s.anchorNode !== i || s.anchorOffset !== o || s.focusNode !== c || s.focusOffset !== l || s.type !== a) && s.setBaseAndExtent(i, o, c, l), r || t.focus(), t.classList.contains("focus") || t.classList.add("focus");
  }
  t.dispatchEvent(new Event("select", { bubbles: !0 }));
}
const bs = navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform), ys = bs || /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, kt = !ys && /Mobi|Android/.test(navigator.userAgent) && !window.MSStream, vs = {
  characterData: !0,
  characterDataOldValue: !0,
  subtree: !0,
  childList: !0
};
function Ls(n) {
  let e = !1, t = !1, s = [];
  function r(b) {
    t = !0;
  }
  function i(b) {
    t = !1, s.length && (l(s), s = []);
  }
  function o() {
    if (t) return;
    const b = g.takeRecords();
    b.length && l(b);
  }
  function c(b) {
    let A = !1;
    const T = b.ops[b.ops.length - 1];
    return T != null && T.insert && T.insert.br && (A = !0), A;
  }
  function l(b) {
    if (t) {
      s.push(...b);
      return;
    }
    if (!n.enabled)
      return n.render();
    let A = a(b), T = hn(n);
    if (!A) {
      const _ = ws(n.root, b);
      A = h(_);
    }
    if (e && (c(A) && (A.ops.pop(), A.insert(`
`)), T !== null && (T[0]++, T[1]++), e = !1), A && A.ops.length) {
      ln(A);
      const _ = n.doc;
      n.update(new le(n.doc, A, T, n.activeFormats), ce.input), n.doc.lines === _.lines && n.render();
    }
  }
  function a(b) {
    const A = Es(b);
    if (!A || A.oldValue == null || A.target.nodeValue == null) return null;
    const T = new Y(), _ = an(n, A.target);
    T.retain(_);
    let M;
    return n.doc.selection && (M = V(n.doc.selection)[0] - _, M < 0 && (M = 0)), de(
      A.oldValue.replace(/\xA0/g, " "),
      A.target.nodeValue.replace(/\xA0/g, " "),
      M
    ).forEach(([R, D]) => {
      R === de.EQUAL ? T.retain(D.length) : R === de.DELETE ? T.delete(D.length) : R === de.INSERT && T.insert(D, n.activeFormats);
    }), T.chop(), T;
  }
  function h(b) {
    const { doc: A } = n;
    if (b) {
      const [T, _] = b, M = he(n.root, T), Z = ze(n.root, _), R = xe(n, {
        startNode: T,
        endNode: _.nextElementSibling || void 0,
        collapseWhitespace: !1
      });
      let D = A.toDelta().slice(M, Z).diff(R);
      return D.ops.length && M && (D = new Y().retain(M).concat(D)), D;
    } else {
      const T = xe(n, { collapseWhitespace: !1 });
      return A.toDelta().diff(T);
    }
  }
  const g = new window.MutationObserver(l);
  function f() {
    g.disconnect();
  }
  function m() {
    g.observe(n.root, vs);
  }
  function p(b) {
    var A;
    b.data && ((A = b.data) != null && A.includes(`
`)) && (e = !0);
  }
  return {
    allowComposition(b = !0) {
      b ? (n.root.addEventListener("compositionstart", r), n.root.addEventListener("compositionend", i)) : (n.root.removeEventListener("compositionstart", r), n.root.removeEventListener("compositionend", i));
    },
    init() {
      n.root.addEventListener("input", o), n.on("rendering", f), n.on("render", m), kt && n.root.addEventListener("beforeinput", p);
    },
    destroy() {
      g.disconnect(), n.root.removeEventListener("input", o), n.root.removeEventListener("compositionstart", r), n.root.removeEventListener("compositionend", i), n.off("rendering", f), n.off("render", m), kt && n.root.removeEventListener("beforeinput", p);
    }
  };
}
function Es(n) {
  const e = /* @__PURE__ */ new Set();
  if (n = n.filter((o) => o.type !== "characterData" ? !0 : e.has(o.target) ? !1 : (e.add(o.target), !0)), n.length > 3) return null;
  const t = n.find((o) => o.type === "characterData");
  if (!t) return null;
  const s = n.find((o) => o.addedNodes.length === 1 && o.addedNodes[0].nodeName === "#text"), r = n.find((o) => o.addedNodes.length === 1 && o.addedNodes[0].nodeName === "BR" || o.removedNodes.length === 1 && o.removedNodes[0].nodeName === "BR");
  return 1 + (s ? 1 : 0) + (r ? 1 : 0) < n.length || s && s.addedNodes[0] !== t.target ? null : t;
}
function ws(n, e) {
  let t, s;
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (i.target === n) return;
    const o = As(n, i.target);
    if (o && o.key)
      (!t || he(n, o) < he(n, t)) && (t = o), (!s || he(n, o) > he(n, s)) && (s = o);
    else
      return;
  }
  if (t && s) return [t, s];
}
function As(n, e) {
  for (; e && e.parentNode !== n; ) e = e.parentNode;
  return e;
}
function Ns(n) {
  let e, t, s = !1;
  function r() {
    if (!n.enabled) return;
    const f = hn(n), m = (f == null ? void 0 : f.slice()) || null;
    if (!f && s) return;
    if (s && (s = !1), f) {
      f[0] === f[1] && f[0] === n.doc.length && f[0]--;
      let b = n.doc.getLineAt(f[0]), A = n.typeset.lines.findByAttributes(b.attributes, !0);
      f && f[0] === f[1] && n.doc.selection && n.doc.selection[0] === f[0] && n.doc.selection[1] === f[0] + 1 && (A.frozen && (f[0]--, f[1]--), b = n.doc.getLineAt(f[0]), A = n.typeset.lines.findByAttributes(b.attributes, !0)), A.frozen && f[0] === f[1] && f[1]++;
    }
    const { doc: p } = n;
    if (B(p.selection, f))
      B(m, f) || Be(n, f);
    else {
      if (f && f[0] === f[1] && f[0] >= p.length)
        return;
      n.select(f);
    }
  }
  function i() {
    s || !n.enabled || Be(n, n.doc.selection);
  }
  function o() {
    const {
      doc: f,
      typeset: { lines: m }
    } = n, p = n.modules.decorations.getDecorator("selection");
    p.clear();
    const b = f.selection;
    b && f.getLinesAt(b).forEach((A) => {
      if (m.findByAttributes(A.attributes, !0).frozen) {
        const T = B(b, f.getLineRange(A));
        p.decorateLine(f.getLineRange(A)[0], { class: "selected" + (T ? " focus" : "") });
      }
    }), p.apply();
  }
  function c(f) {
    let m = f.target;
    for (; m.parentNode && m.parentNode !== n.root; ) m = m.parentNode;
    const p = he(n.root, m), b = p != null && n.doc.getLineAt(p), A = b && n.typeset.lines.findByAttributes(b.attributes);
    p != null && b && A && A.frozen && (f.preventDefault(), n.select([p, p + b.length]));
  }
  function l(f) {
    var p;
    const m = ((p = f.doc) == null ? void 0 : p.selection) || n.doc.selection;
    Be(n, m);
  }
  function a() {
    n.root.classList.toggle("window-inactive", !e.hasFocus());
  }
  function h() {
    var p;
    s = !0;
    const { selection: f } = n.doc;
    (p = e.getSelection()) == null || p.empty();
    const { decorations: m } = n.modules;
    f && f[0] !== f[1] && m && m.getDecorator("pausedSelection").decorateText(f, { class: "selected" }).apply();
  }
  function g() {
    s = !1;
    const { decorations: f } = n.modules;
    f && f.removeDecorations("pausedSelection"), setTimeout(i);
  }
  return {
    pause: h,
    resume: g,
    renderSelection: i,
    init() {
      e = n.root.ownerDocument, t = e.defaultView, e.addEventListener("selectionchange", r), t.addEventListener("focus", a), t.addEventListener("blur", a), n.root.addEventListener("mousedown", c), n.on("change", l), n.on("decorate", o);
    },
    destroy() {
      e.removeEventListener("selectionchange", r), t.removeEventListener("focus", a), t.removeEventListener("blur", a), n.root.removeEventListener("mousedown", c), n.off("change", l), n.off("decorate", o), s = !1, e = null, t = null;
    }
  };
}
const Ts = { dontFixNewline: !0 }, Mt = { excludeProps: /* @__PURE__ */ new Set(["id"]) };
class xs extends Event {
  constructor(t, s) {
    super(t, s);
    x(this, "delta");
    x(this, "html");
    x(this, "text");
    this.delta = s.delta, this.html = s.html, this.text = s.text;
  }
}
function Fs(n, e) {
  const t = (e == null ? void 0 : e.allowHTMLPaste) ?? !0;
  function s({ selection: i, text: o, html: c }) {
    const { doc: l } = n;
    if (i = i || l.selection, i = i && V(i), !i) return;
    const [a, h] = i;
    let g;
    if (c)
      e != null && e.htmlParser ? g = e.htmlParser(n, c) : g = cn(n, c, { possiblePartial: !0 });
    else {
      if (!o) return;
      g = new Y().insert(o.replace(/\xA0/g, " ").replace(/\r\n/g, `
`));
    }
    const f = g.filter((b) => typeof b.insert == "string" && b.insert.includes(`
`)).length > 0;
    let m = g.length();
    if (f) {
      let b = te.fromDelta(g, l.byId);
      g = te.toDelta(b), m = g.length();
      const A = l.getLineAt(a), T = l.getLineAt(h), _ = Ie(A), M = A === T ? _ : Ie(T);
      c || (b = b.map((ee) => ({ ...ee, attributes: A.attributes })), _ !== M && (b[b.length - 1].attributes = T.attributes));
      const Z = b[0], R = Ie(Z), D = b[b.length - 1], O = Z === D ? R : Ie(D);
      a !== l.getLineRange(A)[0] && !B(_, R, Mt) && (g = new Y().insert(`
`, _).concat(g), m++);
      const G = g.ops[g.ops.length - 1].insert, ie = typeof G == "string" && G.endsWith(`
`);
      ie && h !== l.getLineRange(T)[1] && B(M, O, Mt) ? g = g.slice(0, --m) : ie && h === l.getLineRange(T)[1] - 1 && (g.delete(1), m--);
    }
    const p = new xs("paste", { delta: g, html: c, text: o, cancelable: !0 });
    if (n.dispatchEvent(p), g = p.delta, !p.defaultPrevented)
      if (g && g.ops.length) {
        const b = n.change.delete(i, f ? Ts : void 0);
        b.insertContent(a, g).select(a + m), n.update(b, ce.paste);
      } else a !== h && n.delete([a, h]);
  }
  function r(i) {
    if (!n.enabled || !n.doc.selection || i.defaultPrevented) return;
    i.preventDefault();
    const o = i.clipboardData, { doc: c } = n;
    if (!o || !c.selection) return;
    const l = t ? o.getData("text/html") : void 0, a = o.getData("text/plain");
    s({ text: a, html: l });
  }
  return {
    commands: {
      paste: s
    },
    init() {
      n.root.addEventListener("paste", r);
    },
    destroy() {
      n.root.removeEventListener("paste", r);
    }
  };
}
function Ie(n) {
  const { id: e, ...t } = n.attributes;
  return t;
}
const ks = Ms();
function Ms(n = {}) {
  return function(e) {
    let t = 0, s = "", r = !1, i = _t();
    const o = { maxStack: 500, delay: 0, unrecordedSources: /* @__PURE__ */ new Set(), ...n };
    function c(M) {
      M.inputType === "historyUndo" ? (M.preventDefault(), l()) : M.inputType === "historyRedo" && (M.preventDefault(), a());
    }
    function l() {
      p("undo", "redo");
    }
    function a() {
      p("redo", "undo");
    }
    function h() {
      return i.undo.length > 0;
    }
    function g() {
      return i.redo.length > 0;
    }
    function f() {
      t = 0;
    }
    function m() {
      i = _t();
    }
    function p(M, Z) {
      if (i[M].length === 0) return;
      const R = i[M].pop();
      i[Z].push(R), f(), r = !0, e.update(R[M], ce.history), r = !1;
    }
    function b(M, Z) {
      const R = Date.now(), D = Is(M);
      i.redo.length = 0;
      const O = new le(null, M.delta.invert(Z.toDelta()), Z.selection);
      if ((!D || s !== D) && f(), s = D, t && (!o.delay || t + o.delay > R) && i.undo.length) {
        const G = i.undo[i.undo.length - 1];
        G.redo.delta = G.redo.delta.compose(M.delta), G.redo.selection = M.selection, G.undo.delta = O.delta.compose(G.undo.delta);
      } else {
        const G = new le(null, M.delta, M.selection);
        t = R, i.undo.push({ redo: G, undo: O });
      }
      i.undo.length > o.maxStack && i.undo.shift();
    }
    function A({ change: M, old: Z, source: R }) {
      if (!M) return m();
      if (!r) {
        if (!M.contentChanged) return f();
        R !== ce.api && !o.unrecordedSources.has(R) ? b(M, Z) : _s(i, M);
      }
    }
    function T(M) {
      i = M;
    }
    function _() {
      return i;
    }
    return {
      options: o,
      hasUndo: h,
      hasRedo: g,
      undo: l,
      redo: a,
      cutoffHistory: f,
      clearHistory: m,
      setStack: T,
      getStack: _,
      getActive() {
        return { undo: h(), redo: g() };
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
function _t() {
  return {
    undo: [],
    redo: []
  };
}
function _s(n, e) {
  const t = e.ops ? new le(null, e) : e;
  n.undo.forEach((s) => {
    s.undo = t.transform(s.undo, !0), s.redo = t.transform(s.redo, !0);
  }), n.redo.forEach((s) => {
    s.undo = t.transform(s.undo, !0), s.redo = t.transform(s.redo, !0);
  });
}
function Is(n) {
  var r;
  const { ops: e } = n.delta;
  let t = 0, s = e.length - 1;
  if (e[t].retain && !e[t].attributes && t++, e[s].retain === 1 && ((r = e[s].attributes) != null && r.id) && s--, t === s) {
    const i = e[t];
    if (i.delete) return "delete";
    if (i.insert === `
`) return "newline";
    if (typeof i.insert == "string") return "insert";
  }
  return "";
}
const Ss = { keyboard: rs, input: Ls, copy: Bs, paste: Fs, history: ks, decorations: Yn, rendering: qn, selection: Ns }, Ee = {}, fn = [], It = ["focus", "blur", "keydown", "mousedown", "mouseup", "click"], St = /* @__PURE__ */ new WeakMap();
class we extends Event {
  constructor(t, s) {
    super(t, s);
    x(this, "old");
    x(this, "doc");
    x(this, "change");
    x(this, "changedLines");
    x(this, "source");
    this.old = s.old, this.doc = s.doc, this.change = s.change, this.changedLines = s.changedLines, this.source = s.source, Object.setPrototypeOf(this, we.prototype);
  }
  // Modify the data during a "changing" event before doc is committed
  modify(t) {
    if (!this.cancelable) throw new Error('Cannot modify an applied change, listen to the "changing" event');
    this.doc = this.doc.apply(t), this.change && (this.change.delta = this.change.delta.compose(t)), this.changedLines && (this.changedLines = this.old.lines === this.doc.lines ? fn : dn(this.old, this.doc));
  }
}
class Rt extends Event {
  constructor(t, s) {
    super(t, s);
    x(this, "formats");
    this.formats = s.formats;
  }
}
class Rr extends Cn {
  constructor(t = {}) {
    super();
    x(this, "identifier");
    x(this, "typeset");
    x(this, "doc");
    x(this, "activeFormats", Ee);
    x(this, "commands", {});
    x(this, "shortcuts", {});
    x(this, "modules", {});
    x(this, "catchErrors");
    x(this, "throwOnError");
    x(this, "_root");
    x(this, "_modules");
    x(this, "_enabled");
    this.catchErrors = !t.dev, this.identifier = t.identifier, this.typeset = new Ce(t.types || es), t.doc ? this.doc = t.doc : t.html ? this.doc = Nt(this, t.html) : t.text ? this.doc = new oe(new Y().insert(t.text)) : this.doc = new oe(), this.throwOnError = t.throwOnError || !1, this._enabled = t.enabled === void 0 ? !0 : t.enabled;
    const s = t.includeDefaultModules ?? !0;
    this._modules = s ? { ...Ss, ...t.modules } : { ...t.modules }, t.root && this.setRoot(t.root);
  }
  get root() {
    return this._root || this.setRoot(document.createElement("div")), this._root;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    t = !!t;
    const s = this._enabled !== t;
    !t && this.doc.selection && this.select(null, ce.api), this._enabled = t, this._root && (this._root.contentEditable = t ? "true" : "inherit"), s && this.dispatchEvent(new Event("enabledchange"));
  }
  get change() {
    const t = new le(this.doc);
    return t.apply = (s = ce.user) => this.update(t, s), t;
  }
  setRoot(t) {
    if (!t) throw new TypeError("Root must be set, cannot be " + t);
    return this.destroy(), this._root = t, this.init(), this.dispatchEvent(new Event("root")), this;
  }
  update(t, s = ce.user) {
    if (!this.enabled && s !== ce.api)
      return this;
    const r = t.ops ? new le(this.doc, t) : t, i = this.doc, o = i.apply(r, void 0, this.throwOnError), c = i.lines === o.lines ? fn : dn(i, o);
    return this.set(o, s, r, c), this;
  }
  set(t, s = ce.user, r, i) {
    const o = this.doc, c = t.ops ? new oe(t) : t;
    if (!this.enabled && s !== ce.api || !c || o.equals(c))
      return this;
    const l = new we("changing", {
      cancelable: !0,
      old: o,
      doc: c,
      change: r,
      changedLines: i,
      source: s
    });
    return this.dispatchEvent(l, this.catchErrors), l.defaultPrevented || o.equals(l.doc) ? this : (this.activeFormats = r != null && r.activeFormats ? r.activeFormats : Se(this, l.doc), this.doc = l.doc, this.dispatchEvent(new we("change", { ...l, cancelable: !1 }), this.catchErrors), this.dispatchEvent(new we("changed", { ...l, cancelable: !1 }), this.catchErrors), this);
  }
  getHTML() {
    return on(this, this.doc);
  }
  setHTML(t, s = this.doc.selection, r) {
    return this.set(Nt(this, t, s), r);
  }
  getDelta() {
    return this.doc.toDelta();
  }
  setDelta(t, s = this.doc.selection, r) {
    return this.set(new oe(t, s), r);
  }
  getText(t) {
    return this.doc.getText(t);
  }
  setText(t, s = this.doc.selection, r) {
    return this.set(new oe(new Y().insert(t), s), r);
  }
  trimSelection(t) {
    if (!t) return t;
    const s = this.getText(t), [r, i] = V([...t]);
    if (s.trim()) {
      const [o, c, l, a] = s.match(/(^ *)((?:.|\r|\n)*?)( *$)/);
      if (l && (c || a))
        return [r + c.length, i - a.length];
    }
    return t;
  }
  getActive() {
    const { selection: t } = this.doc;
    let s = t ? t[0] === t[1] ? { ...this.activeFormats, ...this.doc.getLineFormat(t) } : { ...this.doc.getFormats(t) } : {};
    return Object.values(this.modules).forEach((r) => {
      r.getActive && (s = { ...s, ...r.getActive() });
    }), s;
  }
  select(t, s) {
    return this.update(this.change.select(t), s);
  }
  insert(t, s, r = this.doc.selection, i) {
    if (!r) return this;
    const o = B(r, this.doc.selection);
    s == null && typeof t == "string" && t !== `
` && (s = o ? this.activeFormats : Se(this, this.doc, r));
    const c = this.typeset.lines.findByAttributes(s, !0), l = this.change.delete(r), a = V(r)[0];
    if (o && l.setActiveFormats(t !== `
` && s || Se(this, this.doc, r)), t === `
` && c.frozen) {
      const h = { ...this.doc.getLineFormat(a) }, g = { ...s };
      let f = { ...h };
      const m = new Y().insert(`
`, h);
      this.doc.getLineRange(a)[1] - 1 !== a ? m.insert(`
`, g) : f = g, l.insertContent(a, m).formatLine(a, f).select(a + 2);
    } else
      l.insert(a, t, s, i);
    return this.update(l);
  }
  insertContent(t, s = this.doc.selection) {
    if (!s) return this;
    const r = this.change.delete(s).insertContent(s[0], t);
    return this.update(r);
  }
  delete(t, s) {
    let r, i = 0;
    const {
      typeset: { lines: o },
      doc: c
    } = this;
    if (Array.isArray(t))
      r = V(t);
    else {
      if (!this.doc.selection) return this;
      r = V(this.doc.selection), t && (r[0] === r[1] ? t < 0 ? r = [r[0] + t, r[1]] : r = [r[0], Math.min(r[1] + t, this.doc.length - 1)] : t < 0 && o.findByAttributes(c.getLineAt(r[0]).attributes, !0).frozen && (i = -1));
    }
    const l = Se(this, this.doc, [r[0] + 1, r[0] + 1]), a = this.doc.length - (r[1] - r[0]);
    let h = Math.max(0, Math.min(a - 1, r[0] + i));
    const g = this.change.delete(r, s).select(h).setActiveFormats(l);
    return this.update(g);
  }
  formatText(t, s = this.doc.selection) {
    return s ? (typeof t == "string" && (t = { [t]: !0 }), s[0] === s[1] ? (this.activeFormats = re.compose(this.activeFormats, t) || Ee, this.dispatchEvent(new Rt("format", { formats: this.activeFormats })), this) : (Le(this, "formatText", t, s), this)) : this;
  }
  toggleTextFormat(t, s = this.doc.selection) {
    return s ? (typeof t == "string" && (t = { [t]: !0 }), s[0] === s[1] ? (tt(t, this.activeFormats) && (t = re.invert(t)), this.activeFormats = re.compose(this.activeFormats, t) || Ee, this.dispatchEvent(new Rt("format", { formats: this.activeFormats })), this) : (Le(this, "toggleTextFormat", t, s), this)) : this;
  }
  formatLine(t, s = this.doc.selection) {
    return typeof t == "string" && (t = { [t]: !0 }), Le(this, "formatLine", t, s), this;
  }
  toggleLineFormat(t, s = this.doc.selection) {
    return typeof t == "string" && (t = { [t]: !0 }), Le(this, "toggleLineFormat", t, s), this;
  }
  indent() {
    return Ot(this, 1), this;
  }
  outdent() {
    return Ot(this, -1), this;
  }
  removeFormat(t = this.doc.selection) {
    return Le(this, "removeFormat", null, t), this;
  }
  getBounds(t, s, r) {
    var o;
    if (typeof t == "number" && (t = [t, t]), !t) return;
    let i = (o = xt(this, t)) == null ? void 0 : o.getBoundingClientRect();
    if (i && s) {
      const c = s.getBoundingClientRect(), l = (r ? s.scrollLeft : 0) - c.x, a = (r ? s.scrollTop : 0) - c.y;
      i = new DOMRect(i.x + l, i.y + a, i.width, i.height);
    }
    return i;
  }
  getAllBounds(t, s, r) {
    var c;
    typeof t == "number" && (t = [t, t]);
    const i = (c = xt(this, t)) == null ? void 0 : c.getClientRects();
    let o = i && Array.from(i);
    if (o && s) {
      const l = s.getBoundingClientRect(), a = (r ? s.scrollLeft : 0) - l.x, h = (r ? s.scrollTop : 0) - l.y;
      o = o.map((g) => new DOMRect(g.x + a, g.y + h, g.width, g.height));
    }
    return o;
  }
  getIndexFromPoint(t, s) {
    return ds(this, t, s);
  }
  render() {
    var t, s, r;
    return (t = this.modules.decorations) == null || t.gatherDecorations(), (s = this.modules.rendering) == null || s.render(), (r = this.modules.selection) == null || r.renderSelection(), this;
  }
  init() {
    const t = this._root;
    t.editor && t.editor.destroy(), t.editor = this, this.enabled = this._enabled, this.commands = {}, It.forEach((s) => this._root.addEventListener(s, Ct(this))), this.typeset.lines.list.forEach((s) => s.commands && Re(this, s.name, s.commands(this))), this.typeset.formats.list.forEach((s) => s.commands && Re(this, s.name, s.commands(this))), this.typeset.embeds.list.forEach((s) => s.commands && Re(this, s.name, s.commands(this))), Object.keys(this._modules).forEach((s) => {
      if (!this._modules[s]) return;
      const r = this.modules[s] = this._modules[s](this);
      r.commands && Re(this, s, r.commands);
    }), this.shortcuts = Ds(this), Object.keys(this.modules).forEach((s) => {
      var r, i;
      return (i = (r = this.modules[s]).init) == null ? void 0 : i.call(r);
    }), this.render();
  }
  destroy() {
    const t = this._root;
    t && (It.forEach((s) => t.removeEventListener(s, Ct(this))), Object.values(this.modules).forEach((s) => s.destroy && s.destroy()), this._root = void 0, delete t.editor);
  }
}
function Le(n, e, t, s) {
  if (!s) return;
  if (s = typeof s == "number" ? [s, s] : n == null ? void 0 : n.trimSelection(s), !(e in n.change)) throw new Error("Invalid operation: " + e);
  const r = n.change[e](s, t);
  n.update(r);
}
function Se(n, e, t = e.selection) {
  const { formats: s } = n.typeset;
  if (!t || t[0] === 0) return Ee;
  const r = V(t)[0];
  let i = r, o = r + 1;
  const c = e.getTextFormat(i), l = e.getTextFormat(o), a = {};
  return Object.keys(c).forEach((h) => {
    const g = s.get(h);
    g && g.greedy !== !1 && (a[h] = c[h]);
  }), Object.keys(l).forEach((h) => {
    const g = s.get(h);
    g && g.greedy === !1 && (a[h] = c[h]);
  }), a;
}
function dn(n, e) {
  const t = new Set(n.lines);
  return e.lines.filter((s) => !t.has(s));
}
function Re(n, e, t) {
  t && (typeof t == "function" ? n.commands[e] = Dt(n, t) : Object.keys(t).forEach((s) => n.commands[s] = Dt(n, t[s])));
}
function Dt(n, e) {
  return (...t) => {
    const s = e(...t);
    return n.doc.selection && n.root.focus(), s;
  };
}
function Ot(n, e = 1) {
  const {
    typeset: { lines: t },
    doc: s
  } = n, { selection: r } = s;
  if (!r) return s;
  const i = n.change;
  s.getLinesAt(r).forEach((o) => {
    if (!t.findByAttributes(o.attributes, !0).indentable) return;
    const l = s.getLineRange(o);
    let a = (o.attributes.indent || 0) + e;
    a === 0 && (a = null), i.formatLine(l[0], a < 0 ? Ee : { ...o.attributes, indent: a });
  }), n.update(i);
}
function Ct(n) {
  let e = St.get(n);
  return e || (e = Rs.bind(n), St.set(n, e)), e;
}
function Rs(n) {
  this.dispatchEvent(n);
}
function Ds(n) {
  const e = {}, {
    typeset: { lines: t, formats: s, embeds: r },
    modules: i
  } = n;
  return Ke(t, e), Ke(s, e), Ke(r, e), Os(i, e), e;
}
function Ke(n, e) {
  n.list.forEach((t) => {
    const s = t.shortcuts;
    s && (typeof s == "string" ? e[s] = t.name : gn(s, e));
  });
}
function Os(n, e) {
  Object.keys(n).forEach((t) => {
    var r;
    const s = (r = n[t]) == null ? void 0 : r.shortcuts;
    s && gn(s, e);
  });
}
function gn(n, e) {
  Object.keys(n).forEach((t) => e[t] = n[t]);
}
const Cs = {
  copyPlainText: !0,
  copyHTML: !0
}, Bt = { text: "", html: "" };
function Bs(n, e = Cs) {
  function t(i) {
    const { doc: o } = n, c = V(i || o.selection);
    if (!c) return Bt;
    const l = o.slice(c[0], c[1]);
    if (!l.ops.length) return Bt;
    const a = l.map((g) => typeof g.insert == "string" ? g.insert : " ").join("");
    let h;
    return a.includes(`
`) ? (l.push({ insert: `
`, attributes: o.getLineFormat(c[1]) }), h = on(n, new oe(l))) : h = hs(n, l), { text: a, html: h };
  }
  function s(i) {
    if (!n.enabled || !n.doc.selection || i.defaultPrevented) return;
    i.preventDefault();
    const o = i.clipboardData;
    if (!o) return;
    const { text: c, html: l } = t();
    e.copyHTML && l && o.setData("text/html", l), e.copyPlainText && c && o.setData("text/plain", c);
  }
  function r(i) {
    s(i), n.delete();
  }
  return {
    commands: {
      getCopy: t
    },
    init() {
      n.root.addEventListener("copy", s), n.root.addEventListener("cut", r);
    },
    destroy() {
      n.root.removeEventListener("copy", s), n.root.removeEventListener("cut", r);
    }
  };
}
function Dr(n, e) {
  return (t) => {
    function s({ doc: r }) {
      var g, f, m;
      const i = t.modules.decorations.getDecorator("placeholder"), o = (typeof n == "function" ? n() : n) || "";
      let c;
      if (i.hasDecorations()) {
        const p = i.getDecoration().ops;
        c = (f = (g = p[p.length - 1].attributes) == null ? void 0 : g.decoration) == null ? void 0 : f.placeholder;
      }
      const { lines: l } = t.typeset, a = l.findByAttributes((m = r.lines[0]) == null ? void 0 : m.attributes, !0), h = l.default === a && r.length === 1;
      if (h || e != null && e.keepAttribute) {
        const p = { "data-placeholder": o || "" };
        h && (p.class = "placeholder"), B(p, c) || (i.remove(), i.decorateLine(0, p).apply());
      } else
        i.remove();
    }
    return t.addEventListener("decorate", s), {
      destroy() {
        t.removeEventListener("decorate", s);
      }
    };
  };
}
const Ps = /(https?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, js = /(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, zs = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.(com|org|net|io)\b[-a-zA-Z0-9@:%_+.~#?&/=]*\s$/s, $s = [
  [/^(#{1,6}) $/, (n) => ({ header: n.length })],
  [/^\* $/, (n, { indent: e }) => ({ list: "bullet", indent: e })],
  [/^- $/, (n, { indent: e }) => ({ list: "bullet", type: "dash", indent: e })],
  // set the type to dash to allow for styling in-app (e.g. `list-style-type: "- ";`)
  [/^1\. $/, (n, { indent: e }) => ({ list: "ordered", indent: e })],
  [/^([AaIi])\. $/, (n, { indent: e }) => ({ list: "ordered", type: n, indent: e })],
  [/^(-?\d+)\. $/, (n, { indent: e }) => ({ list: "ordered", start: n, indent: e })],
  // Use /^(-?\d+)\. $/ to support lists starting at something other than 1.
  [
    /^([A-Z])\. $/,
    (n, { indent: e }) => ({
      list: "ordered",
      type: "A",
      indent: e,
      start: n === "A" ? void 0 : n.charCodeAt(0) - 65 + 1
    })
  ],
  [
    /^([a-z])\. $/,
    (n, { indent: e }) => ({
      list: "ordered",
      type: "a",
      indent: e,
      start: n === "a" ? void 0 : n.charCodeAt(0) - 97 + 1
    })
  ],
  [
    /^([IVXLCDM]+)\. $/i,
    (n, { indent: e }) => ({
      list: "ordered",
      type: n[0].toUpperCase() === n[0] ? "I" : "i",
      indent: e,
      start: n.toUpperCase() === "I" ? void 0 : Gs(n)
    })
  ],
  [/^> $/, () => ({ blockquote: !0 })]
], Hs = [
  [/(\*|_){3}(\b(?:(?!\1).)+\b)\1{3}((?:(?!\1).))$/s, () => ({ bold: !0, italic: !0 })],
  [/(\*|_){2}(\b(?:(?!\1).)+\b)\1{2}((?:(?!\1).))$/s, () => ({ bold: !0 })],
  [/(\*|_){1}(\b(?:(?!\1).)+\b)\1{1}((?:(?!\1).))$/s, () => ({ italic: !0 })]
], Ws = [
  [Ps, (n) => ({ link: n })],
  [js, (n) => ({ link: "https://" + n })],
  [zs, (n) => ({ link: "https://" + n })]
], Us = [
  [/--$/, () => "—"],
  [/(\S - \S)$/, (n) => n.replace("-", "–")],
  [/\.\.\.$/, () => "…"]
];
function Ys(n, e, t) {
  return $s.some(([s, r]) => {
    const i = t.match(s);
    if (i) {
      const o = r(i[1], n.doc.getLineFormat(e));
      if (!n.typeset.lines.findByAttributes(o))
        return !1;
      const c = e - t.length, l = n.change.delete([c, e]).formatLine(e, o).select([c, c]);
      return n.update(l), !0;
    } else
      return !1;
  });
}
function Qs(n, e, t) {
  return Ws.some(([s, r]) => {
    const i = t.match(s);
    if (i) {
      let o = i[0].slice(0, -1);
      o[o.length - 1] === "." && (o = o.slice(0, -1));
      const c = e - (i[0].length - o.length), l = r(o, n.doc.getTextFormat(e));
      return n.typeset.formats.findByAttributes(l) ? (n.formatText(l, [c - o.length, c]), !0) : !1;
    } else
      return !1;
  });
}
function Or(n, e, t, s) {
  return Hs.some(([r, i]) => {
    const o = t.match(r);
    if (o) {
      let [c, l, a, h] = o;
      const g = i(a, n.doc.getTextFormat(e));
      if (!n.typeset.formats.findByAttributes(g))
        return !1;
      e - (c.length - a.length) + h.length, h === " " && s[e] === " " && (h = "");
      const f = e - h.length;
      return n.insert(a, g, [f - c.length + h.length, f]), !0;
    } else
      return !1;
  });
}
function Xs(n, e, t) {
  return Us.some(([s, r]) => {
    const i = t.match(s);
    return i ? (n.insert(r(i[1]), void 0, [e - i[0].length, e]), !0) : !1;
  });
}
const Zs = [Ys, Xs, Qs];
function Cr(n = Zs) {
  return (e) => {
    let t = !1;
    function s({ change: r, source: i }) {
      if (t || i === "api" || !e.doc.selection || !r || !Js(r.delta)) return;
      const o = e.doc.selection[1], c = e.doc.getText(), l = c.lastIndexOf(`
`, o - 2) + 1, a = c.slice(l, o);
      t = !0, n.some((h) => h(e, o, a, c)), t = !1;
    }
    return e.on("changed", s), {
      destroy() {
        e.off("changed", s);
      }
    };
  };
}
function Js(n) {
  return (n.ops.length === 1 || n.ops.length === 2 && n.ops[0].retain && !n.ops[0].attributes) && n.ops[n.ops.length - 1].insert;
}
const Pt = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1e3
};
function Gs(n) {
  n = n.toUpperCase();
  let e = 0;
  for (let t = 0; t < n.length; t++) {
    const s = Pt[n[t]], r = Pt[n[t + 1]];
    if (s === void 0) return;
    s < r ? (e += r - s, t++) : e += s;
  }
  return e;
}
const Ks = /['"]/g, qs = /[\s\{\[\(\<'"\u2018\u201C]/, jt = {
  '"': { left: "“", right: "”" },
  "'": { left: "‘", right: "’" }
};
function Br(n) {
  function e(t) {
    const { change: s, source: r, doc: i, old: o } = t;
    if (r === "api" || !o.selection || !s) return;
    const c = Vs(s.delta.ops);
    if (!c.length) return;
    const l = i.getText(), a = new Y();
    let h = 0;
    for (let g = 0; g < c.length; g++) {
      const [f, m] = c[g], p = l[f], b = !f || qs.test(l[f - 1]) ? jt[p].left : jt[p].right;
      a.retain(f - h).delete(1).insert(b, m), h = f + 1;
    }
    t.modify(a);
  }
  return n.on("changing", e), {
    destroy() {
      n.off("changing", e);
    }
  };
}
function Vs(n) {
  const e = [];
  let t = 0;
  return n.forEach((s) => {
    if (s.retain) t += s.retain;
    else if (typeof s.insert == "string") {
      let r;
      for (; r = Ks.exec(s.insert); )
        e.push([t + r.index, s.attributes]);
      t += s.insert.length;
    } else s.insert && (t += 1);
  }), e;
}
function Pr(n) {
  let e = 0, t = [], s = [], r = tr(n.root), i, o = 0, c = 40, l, a = null, h = null, g, f = !1, m = !0;
  r.addEventListener("scroll", ie, { passive: !0 }), n.on("change", ee);
  const p = rr(r, (u, y, d) => {
    o = y, d & pn && (t = []), A();
  });
  function b(u) {
    if (!u || !l) {
      const { doc: y } = n.modules.decorations || n;
      l = be(n, y.lines).combined, f = !0, a = y.selection, A();
    } else {
      const { doc: y, old: d } = u, w = u.selection || null, E = w && ir(w, l).sort((v, L) => v - L);
      if (B(E, h) || (f = f || !G(E), h = E), d && y) {
        const v = be(n, y.lines).combined, [L, N] = qt(l, v);
        if (L[0] + L[1] + N[0] + N[1] > 0) {
          f = !0;
          const F = L[1] - L[0], k = N[1] - N[0];
          if (F < k) {
            const I = new Array(k - F).fill(void 0);
            t.splice(L[1], 0, ...I);
          } else F > k && t.splice(L[0], F - k);
        }
        l = v;
      } else y && (l = be(n, y.lines).combined, f = !0);
      a = w, f && A();
    }
  }
  function A() {
    if (m = !1, !l) return;
    const { scrollTop: u } = r;
    i = Z();
    const y = e, d = t.slice();
    let w = !1, E = 0;
    for (; T() && E++ < 20; )
      w = !0, f = !1, _(), M();
    if (E >= 20 && console.error("Updated virtual max times"), Be(n, a), !!w && e < y) {
      let v = 0, L = 0, N = g.indexOf(e);
      for (let k = e; k < y; k++) {
        const I = k - e + N;
        s[I] && (v += D(k, d), L += D(k));
      }
      const F = L - v;
      r.scrollTo(0, u + F);
    }
  }
  function T() {
    const { scrollTop: u } = r, y = /* @__PURE__ */ new Set([0, l.length - 1, ...h || []]);
    let d = 0, w = i, E = 0;
    for (; d < l.length; ) {
      const L = D(d);
      if (w + L > u) {
        E = d;
        break;
      }
      w += L, d += 1;
    }
    for (; d < l.length && (y.add(d), w += D(d), d += 1, !(w > u + o)); )
      ;
    Math.min(d, l.length - 1);
    const v = Array.from(y).sort((L, N) => L - N);
    return B(v, g) ? f : (e = E, g = v, !0);
  }
  function _() {
    const u = [], y = new Set(g);
    let d = "", w = 0, E = 0, v = 0;
    for (let L = 0, N = 0; L < l.length; L++) {
      if (y.has(L)) {
        if (N) {
          E = O(L, -1), N -= w;
          const k = j("div", {
            class: "-spacer-",
            "data-key": d,
            style: `height:${N}px;margin-top:${w}px;margin-bottom:${E}px;`,
            key: d
          });
          d = "", u.push(k);
        }
        N = 0;
        const F = Kt(n, l[L]);
        u.push(F);
      } else
        L === 1 ? d = "spacer-start" : L === l.length - 2 ? d = "spacer-end" : !d && h && L > h[1] ? d = "spacer-selection-end" : !d && h && L > h[0] && (d = "spacer-selection-start"), N || (w = O(L, -1)), N += D(L);
      v += D(L);
    }
    n.dispatchEvent(new Event("rendering")), Fe(n.root, u), lt(n), n.dispatchEvent(new Event("render")), n.dispatchEvent(new Event("rendered"));
  }
  function M() {
    s = Array.from(n.root.children).filter((y) => y.className !== "-spacer-");
    for (let y = 0; y < s.length; y++) {
      const d = g[y];
      t[d] = R(s[y]);
    }
    if (!s.length) return;
    const u = t.filter(Boolean);
    c = Math.round(
      O(0, -1, u) + u.reduce((y, d, w, E) => y + D(w, E), 0) / u.length
    );
  }
  function Z() {
    const { scrollTop: u } = r, { root: y } = n;
    return r === y ? parseInt(getComputedStyle(y).paddingTop) : y.getBoundingClientRect().top + parseInt(getComputedStyle(y).paddingTop) + u - r.getBoundingClientRect().top;
  }
  function R(u) {
    const y = getComputedStyle(u);
    return [parseInt(y.marginTop), u.offsetHeight, parseInt(y.marginBottom)];
  }
  function D(u, y = t) {
    return y[u] ? (u === 0 ? O(u, -1, y) : 0) + y[u][1] + O(u, 1, y) : c;
  }
  function O(u, y, d = t) {
    return Math.max(d[u] && d[u][2] || 0, d[u + y] && d[u + y][0] || 0);
  }
  function G(u, y) {
    if (!u) return !1;
    let [d, w] = u;
    return w++, g.some((E) => E >= d && E < w);
  }
  function ie() {
    m || (requestAnimationFrame(A), m = !0);
  }
  function ee(u) {
    const { old: y, doc: d } = n.modules.decorations || u, w = u.doc.selection;
    b({ old: y, doc: d, selection: w });
  }
  return {
    render: b,
    init() {
      n.modules.decorations && n.modules.decorations.gatherDecorations(), b();
    },
    destroy() {
      p(), r.removeEventListener("scroll", ie), n.off("change", ee);
    }
  };
}
const er = /auto|scroll/;
function tr(n) {
  for (; n && n !== n.ownerDocument.scrollingElement; ) {
    if (er.test(getComputedStyle(n).overflowY)) return n;
    n = n.parentNode;
  }
  return n;
}
const pn = 1, nr = 2, sr = 3;
function rr(n, e) {
  let t = n.offsetWidth, s = n.offsetHeight;
  if (e(t, s, sr), typeof window.ResizeObserver < "u") {
    const i = new window.ResizeObserver(r);
    return i.observe(n), () => i.disconnect();
  } else {
    const i = n.ownerDocument.defaultView;
    return i.addEventListener("resize", r), () => i.removeEventListener("resize", r);
  }
  function r() {
    const { offsetWidth: i, offsetHeight: o } = n, c = (t !== i ? pn : 0) | (s !== o ? nr : 0);
    c && (t = i, s = o, e(t, s, c));
  }
}
function ir([n, e], t) {
  let s = 0, r = 0;
  for (let i = 0, o = 0; i < t.length; i++) {
    const c = t[i], l = Array.isArray(c) ? c.reduce((a, h) => a + h.length, 0) : c.length;
    if (n >= o && n < o + l && (s = i), e >= o && e < o + l) {
      r = i;
      break;
    }
    o += l;
  }
  return [s, r];
}
function Pe() {
}
const or = Symbol(), ge = Symbol() in window ? window == null ? void 0 : window[Symbol()] : {
  context: null,
  subscriberQueue: /* @__PURE__ */ new Map()
};
function cr(n, e = Pe) {
  const { get: t, subscribe: s } = mn(n, e);
  return { get: t, subscribe: s };
}
function mn(n, e = Pe) {
  let t, s = !1;
  const r = /* @__PURE__ */ new Map();
  o[or] = r;
  function i() {
    if (ge.context) {
      const { subscriber: a, unsubscribes: h, invalidate: g } = ge.context, f = l(a, g);
      h.add(f);
    }
    if (!r.size && !s) {
      s = !0;
      try {
        (e(o, c) || Pe)();
      } finally {
        s = !1;
      }
    }
    return n;
  }
  function o(a) {
    n !== a && (n = a, t && lr(() => {
      r.forEach(([, h], g) => {
        ge.subscriberQueue.has(g) || (ge.subscriberQueue.set(g, n), h && h());
      });
    }));
  }
  function c(a) {
    o(a(n));
  }
  function l(a, h) {
    var f;
    let g = (f = r.get(a)) == null ? void 0 : f[0];
    return g || (g = () => {
      r.delete(a), r.size === 0 && (t(), t = null);
    }, r.set(a, [g, h]), r.size === 1 && (t = e(o, c) || Pe), h || a(n), g);
  }
  return { get: i, set: o, update: c, subscribe: l };
}
function lr(n, e) {
  const t = !ge.subscriberQueue.size;
  if (n(), t) {
    const s = ge.subscriberQueue.entries();
    for (; ge.subscriberQueue.size > 0; ) {
      const [r, i] = s.next().value;
      ge.subscriberQueue.delete(r), r(i);
    }
  }
}
function jr(n) {
  const e = mn(n), t = ar(e), s = ur(e), r = hr(e), i = dr(e), o = fr(e);
  function c(l) {
    l !== n && e.set(l);
  }
  return {
    active: t,
    doc: s,
    selection: r,
    root: i,
    focus: o,
    updateEditor: c
  };
}
function Me(n, e, t, s, r) {
  let i = e;
  return cr(i, (o) => {
    let c;
    const l = () => {
      i = c ? s(c) : e, !(r && B(i, o)) && o(i);
    }, a = () => c && t.forEach((f) => c.on(f, l)), h = () => c && t.forEach((f) => c.off(f, l)), g = n.subscribe((f) => {
      h(), c = f, c ? (l(), a()) : o(i = e);
    });
    return () => {
      h(), g(), c = void 0, l();
    };
  });
}
function ar(n) {
  return Me(n, {}, ["changed", "format"], (e) => e.getActive(), !0);
}
function ur(n) {
  return Me(n, new oe(), ["changed"], (e) => e.doc);
}
function hr(n) {
  return Me(n, null, ["changed"], (e) => e.doc.selection);
}
function fr(n) {
  return Me(n, !1, ["changed"], (e) => !!e.doc.selection);
}
function dr(n) {
  return Me(n, void 0, ["root"], (e) => e._root);
}
function zr(n, e) {
  function t(r) {
    e !== r && (s(), r && r.setRoot(n), e = r);
  }
  n.children.length && e.set(fs(e, n)), e && e.setRoot(n);
  function s() {
    e && e.destroy();
  }
  return { update: t, destroy: s };
}
export {
  re as AttributeMap,
  rn as BLOCK_ELEMENTS,
  Un as DecorateEvent,
  Qn as Decorator,
  Y as Delta,
  Rr as Editor,
  we as EditorChangeEvent,
  Rt as EditorFormatEvent,
  Cn as EventDispatcher,
  te as Line,
  kn as LineIterator,
  Xe as LineOp,
  Mn as LineOpIterator,
  J as Op,
  $t as OpIterator,
  xs as PasteEvent,
  pr as React,
  ht as ShortcutEvent,
  ce as Source,
  le as TextChange,
  oe as TextDocument,
  Je as Types,
  Ce as Typeset,
  ar as activeStore,
  ns as addShortcutsToEvent,
  ot as applyDecorations,
  zr as asRoot,
  Fr as blockquote,
  vr as bold,
  br,
  ln as cleanText,
  qe as cloneDeep,
  wr as code,
  kr as codeblock,
  be as combineLines,
  Bs as copy,
  Yn as decorations,
  Zs as defaultHandlers,
  Ss as defaultModules,
  es as defaultTypes,
  xe as deltaFromDom,
  cn as deltaFromHTML,
  Ht as deltaToText,
  Me as derivedEditorStore,
  de as diff,
  _r as dl,
  fs as docFromDom,
  Nt as docFromHTML,
  ur as docStore,
  on as docToHTML,
  jr as editorStores,
  ut as embed,
  fr as focusStore,
  ye as format,
  Ir as fromNode,
  xt as getBoudingBrowserRange,
  gs as getBrowserRange,
  qt as getChangedRanges,
  an as getIndexFromNode,
  We as getIndexFromNodeAndOffset,
  ds as getIndexFromPoint,
  ps as getLineElementAt,
  Sr as getLineInfoFromPoint,
  ze as getLineNodeEnd,
  he as getLineNodeStart,
  Ft as getNodeAndOffset,
  ms as getNodeLength,
  un as getNodesForRange,
  hn as getSelection,
  j as h,
  tt as hasFormat,
  Tr as header,
  ks as history,
  Mr as hr,
  mr as image,
  Ms as initHistory,
  hs as inlineToHTML,
  Ls as input,
  Dn as intersect,
  Te as isBRPlaceholder,
  B as isEqual,
  Lr as italic,
  rs as keyboard,
  pe as line,
  Ys as lineReplace,
  $s as lineReplacements,
  Ar as link,
  Qs as linkReplace,
  Ws as linkReplacements,
  xr as list,
  Er as mark,
  Or as markReplace,
  Hs as markReplacements,
  V as normalizeRange,
  st as options,
  Nr as paragraph,
  Fs as paste,
  Fe as patch,
  Dr as placeholder,
  zn as recycleNode,
  it as render,
  wt as renderChanges,
  Gt as renderCombined,
  Jt as renderDoc,
  at as renderInline,
  Kt as renderLine,
  Jn as renderMultiLine,
  Zn as renderSingleLine,
  qn as rendering,
  dr as rootStore,
  Ns as selection,
  hr as selectionStore,
  lt as setLineNodesRanges,
  Be as setSelection,
  sn as shortcutFromEvent,
  Cr as smartEntry,
  Br as smartQuotes,
  Ue as textNodeLength,
  Xs as textReplace,
  Us as textReplacements,
  _s as transformHistoryStack,
  yr as underline,
  _t as undoStack,
  Pr as virtualRendering
};
