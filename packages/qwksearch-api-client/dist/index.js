var _ = Object.defineProperty;
var T = (e, a, t) => a in e ? _(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t;
var j = (e, a, t) => T(e, typeof a != "symbol" ? a + "" : a, t);
var U = async (e, a) => {
  let t = typeof a == "function" ? await a(e) : a;
  if (t) return e.scheme === "bearer" ? `Bearer ${t}` : e.scheme === "basic" ? `Basic ${btoa(t)}` : t;
}, I = { bodySerializer: (e) => JSON.stringify(e, (a, t) => typeof t == "bigint" ? t.toString() : t) }, A = (e) => {
  switch (e) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, W = (e) => {
  switch (e) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, z = (e) => {
  switch (e) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, $ = ({ allowReserved: e, explode: a, name: t, style: s, value: l }) => {
  if (!a) {
    let r = (e ? l : l.map((i) => encodeURIComponent(i))).join(W(s));
    switch (s) {
      case "label":
        return `.${r}`;
      case "matrix":
        return `;${t}=${r}`;
      case "simple":
        return r;
      default:
        return `${t}=${r}`;
    }
  }
  let o = A(s), n = l.map((r) => s === "label" || s === "simple" ? e ? r : encodeURIComponent(r) : b({ allowReserved: e, name: t, value: r })).join(o);
  return s === "label" || s === "matrix" ? o + n : n;
}, b = ({ allowReserved: e, name: a, value: t }) => {
  if (t == null) return "";
  if (typeof t == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${a}=${e ? t : encodeURIComponent(t)}`;
}, S = ({ allowReserved: e, explode: a, name: t, style: s, value: l }) => {
  if (l instanceof Date) return `${t}=${l.toISOString()}`;
  if (s !== "deepObject" && !a) {
    let r = [];
    Object.entries(l).forEach(([f, d]) => {
      r = [...r, f, e ? d : encodeURIComponent(d)];
    });
    let i = r.join(",");
    switch (s) {
      case "form":
        return `${t}=${i}`;
      case "label":
        return `.${i}`;
      case "matrix":
        return `;${t}=${i}`;
      default:
        return i;
    }
  }
  let o = z(s), n = Object.entries(l).map(([r, i]) => b({ allowReserved: e, name: s === "deepObject" ? `${t}[${r}]` : r, value: i })).join(o);
  return s === "label" || s === "matrix" ? o + n : n;
}, E = /\{[^{}]+\}/g, D = ({ path: e, url: a }) => {
  let t = a, s = a.match(E);
  if (s) for (let l of s) {
    let o = !1, n = l.substring(1, l.length - 1), r = "simple";
    n.endsWith("*") && (o = !0, n = n.substring(0, n.length - 1)), n.startsWith(".") ? (n = n.substring(1), r = "label") : n.startsWith(";") && (n = n.substring(1), r = "matrix");
    let i = e[n];
    if (i == null) continue;
    if (Array.isArray(i)) {
      t = t.replace(l, $({ explode: o, name: n, style: r, value: i }));
      continue;
    }
    if (typeof i == "object") {
      t = t.replace(l, S({ explode: o, name: n, style: r, value: i }));
      continue;
    }
    if (r === "matrix") {
      t = t.replace(l, `;${b({ name: n, value: i })}`);
      continue;
    }
    let f = encodeURIComponent(r === "label" ? `.${i}` : i);
    t = t.replace(l, f);
  }
  return t;
}, q = ({ allowReserved: e, array: a, object: t } = {}) => (s) => {
  let l = [];
  if (s && typeof s == "object") for (let o in s) {
    let n = s[o];
    if (n != null) if (Array.isArray(n)) {
      let r = $({ allowReserved: e, explode: !0, name: o, style: "form", value: n, ...a });
      r && l.push(r);
    } else if (typeof n == "object") {
      let r = S({ allowReserved: e, explode: !0, name: o, style: "deepObject", value: n, ...t });
      r && l.push(r);
    } else {
      let r = b({ allowReserved: e, name: o, value: n });
      r && l.push(r);
    }
  }
  return l.join("&");
}, k = (e) => {
  var t;
  if (!e) return "stream";
  let a = (t = e.split(";")[0]) == null ? void 0 : t.trim();
  if (a) {
    if (a.startsWith("application/json") || a.endsWith("+json")) return "json";
    if (a === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((s) => a.startsWith(s))) return "blob";
    if (a.startsWith("text/")) return "text";
  }
}, N = async ({ security: e, ...a }) => {
  for (let t of e) {
    let s = await U(t, a.auth);
    if (!s) continue;
    let l = t.name ?? "Authorization";
    switch (t.in) {
      case "query":
        a.query || (a.query = {}), a.query[l] = s;
        break;
      case "cookie":
        a.headers.append("Cookie", `${l}=${s}`);
        break;
      case "header":
      default:
        a.headers.set(l, s);
        break;
    }
    return;
  }
}, v = (e) => P({ baseUrl: e.baseUrl, path: e.path, query: e.query, querySerializer: typeof e.querySerializer == "function" ? e.querySerializer : q(e.querySerializer), url: e.url }), P = ({ baseUrl: e, path: a, query: t, querySerializer: s, url: l }) => {
  let o = l.startsWith("/") ? l : `/${l}`, n = (e ?? "") + o;
  a && (n = D({ path: a, url: n }));
  let r = t ? s(t) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (n += `?${r}`), n;
}, x = (e, a) => {
  var s;
  let t = { ...e, ...a };
  return (s = t.baseUrl) != null && s.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = C(e.headers, a.headers), t;
}, C = (...e) => {
  let a = new Headers();
  for (let t of e) {
    if (!t || typeof t != "object") continue;
    let s = t instanceof Headers ? t.entries() : Object.entries(t);
    for (let [l, o] of s) if (o === null) a.delete(l);
    else if (Array.isArray(o)) for (let n of o) a.append(l, n);
    else o !== void 0 && a.set(l, typeof o == "object" ? JSON.stringify(o) : o);
  }
  return a;
}, w = class {
  constructor() {
    j(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(e) {
    return typeof e == "number" ? this._fns[e] ? e : -1 : this._fns.indexOf(e);
  }
  exists(e) {
    let a = this.getInterceptorIndex(e);
    return !!this._fns[a];
  }
  eject(e) {
    let a = this.getInterceptorIndex(e);
    this._fns[a] && (this._fns[a] = null);
  }
  update(e, a) {
    let t = this.getInterceptorIndex(e);
    return this._fns[t] ? (this._fns[t] = a, e) : !1;
  }
  use(e) {
    return this._fns = [...this._fns, e], this._fns.length - 1;
  }
}, H = () => ({ error: new w(), request: new w(), response: new w() }), J = q({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), B = { "Content-Type": "application/json" }, O = (e = {}) => ({ ...I, headers: B, parseAs: "auto", querySerializer: J, ...e }), L = (e = {}) => {
  let a = x(O(), e), t = () => ({ ...a }), s = (n) => (a = x(a, n), t()), l = H(), o = async (n) => {
    let r = { ...a, ...n, fetch: n.fetch ?? a.fetch ?? globalThis.fetch, headers: C(a.headers, n.headers) };
    r.security && await N({ ...r, security: r.security }), r.body && r.bodySerializer && (r.body = r.bodySerializer(r.body)), (r.body === void 0 || r.body === "") && r.headers.delete("Content-Type");
    let i = v(r), f = { redirect: "follow", ...r }, d = new Request(i, f);
    for (let c of l.request._fns) c && (d = await c(d, r));
    let R = r.fetch, u = await R(d);
    for (let c of l.response._fns) c && (u = await c(u, d, r));
    let y = { request: d, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return r.responseStyle === "data" ? {} : { data: {}, ...y };
      let c = (r.parseAs === "auto" ? k(u.headers.get("Content-Type")) : r.parseAs) ?? "json";
      if (c === "stream") return r.responseStyle === "data" ? u.body : { data: u.body, ...y };
      let h = await u[c]();
      return c === "json" && (r.responseValidator && await r.responseValidator(h), r.responseTransformer && (h = await r.responseTransformer(h))), r.responseStyle === "data" ? h : { data: h, ...y };
    }
    let m = await u.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let p = m;
    for (let c of l.error._fns) c && (p = await c(m, u, d, r));
    if (p = p || {}, r.throwOnError) throw p;
    return r.responseStyle === "data" ? void 0 : { error: p, ...y };
  };
  return { buildUrl: v, connect: (n) => o({ ...n, method: "CONNECT" }), delete: (n) => o({ ...n, method: "DELETE" }), get: (n) => o({ ...n, method: "GET" }), getConfig: t, head: (n) => o({ ...n, method: "HEAD" }), interceptors: l, options: (n) => o({ ...n, method: "OPTIONS" }), patch: (n) => o({ ...n, method: "PATCH" }), post: (n) => o({ ...n, method: "POST" }), put: (n) => o({ ...n, method: "PUT" }), request: o, setConfig: s, trace: (n) => o({ ...n, method: "TRACE" }) };
};
const g = L(O({
  baseUrl: "https://qwksearch.com/api/"
})), G = (e) => (e.client ?? g).get({
  url: "/extract",
  ...e
}), Q = (e) => (e.client ?? g).post({
  url: "/agents",
  ...e,
  headers: {
    "Content-Type": "application/json",
    ...e.headers
  }
}), F = (e) => (e.client ?? g).get({
  url: "/search",
  ...e
});
export {
  G as extractContent,
  F as searchWeb,
  Q as writeLanguage
};
