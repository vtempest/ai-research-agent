var R = async (e, n) => {
  let r = typeof n == "function" ? await n(e) : n;
  if (r) return e.scheme === "bearer" ? `Bearer ${r}` : e.scheme === "basic" ? `Basic ${btoa(r)}` : r;
}, _ = { bodySerializer: (e) => JSON.stringify(e, (n, r) => typeof r == "bigint" ? r.toString() : r) }, T = (e) => {
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
}, I = (e) => {
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
}, U = (e) => {
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
}, x = ({ allowReserved: e, explode: n, name: r, style: o, value: s }) => {
  if (!n) {
    let t = (e ? s : s.map((i) => encodeURIComponent(i))).join(I(o));
    switch (o) {
      case "label":
        return `.${t}`;
      case "matrix":
        return `;${r}=${t}`;
      case "simple":
        return t;
      default:
        return `${r}=${t}`;
    }
  }
  let l = T(o), a = s.map((t) => o === "label" || o === "simple" ? e ? t : encodeURIComponent(t) : b({ allowReserved: e, name: r, value: t })).join(l);
  return o === "label" || o === "matrix" ? l + a : a;
}, b = ({ allowReserved: e, name: n, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${n}=${e ? r : encodeURIComponent(r)}`;
}, $ = ({ allowReserved: e, explode: n, name: r, style: o, value: s }) => {
  if (s instanceof Date) return `${r}=${s.toISOString()}`;
  if (o !== "deepObject" && !n) {
    let t = [];
    Object.entries(s).forEach(([f, d]) => {
      t = [...t, f, e ? d : encodeURIComponent(d)];
    });
    let i = t.join(",");
    switch (o) {
      case "form":
        return `${r}=${i}`;
      case "label":
        return `.${i}`;
      case "matrix":
        return `;${r}=${i}`;
      default:
        return i;
    }
  }
  let l = U(o), a = Object.entries(s).map(([t, i]) => b({ allowReserved: e, name: o === "deepObject" ? `${r}[${t}]` : t, value: i })).join(l);
  return o === "label" || o === "matrix" ? l + a : a;
}, A = /\{[^{}]+\}/g, W = ({ path: e, url: n }) => {
  let r = n, o = n.match(A);
  if (o) for (let s of o) {
    let l = !1, a = s.substring(1, s.length - 1), t = "simple";
    a.endsWith("*") && (l = !0, a = a.substring(0, a.length - 1)), a.startsWith(".") ? (a = a.substring(1), t = "label") : a.startsWith(";") && (a = a.substring(1), t = "matrix");
    let i = e[a];
    if (i == null) continue;
    if (Array.isArray(i)) {
      r = r.replace(s, x({ explode: l, name: a, style: t, value: i }));
      continue;
    }
    if (typeof i == "object") {
      r = r.replace(s, $({ explode: l, name: a, style: t, value: i }));
      continue;
    }
    if (t === "matrix") {
      r = r.replace(s, `;${b({ name: a, value: i })}`);
      continue;
    }
    let f = encodeURIComponent(t === "label" ? `.${i}` : i);
    r = r.replace(s, f);
  }
  return r;
}, S = ({ allowReserved: e, array: n, object: r } = {}) => (o) => {
  let s = [];
  if (o && typeof o == "object") for (let l in o) {
    let a = o[l];
    if (a != null) if (Array.isArray(a)) {
      let t = x({ allowReserved: e, explode: !0, name: l, style: "form", value: a, ...n });
      t && s.push(t);
    } else if (typeof a == "object") {
      let t = $({ allowReserved: e, explode: !0, name: l, style: "deepObject", value: a, ...r });
      t && s.push(t);
    } else {
      let t = b({ allowReserved: e, name: l, value: a });
      t && s.push(t);
    }
  }
  return s.join("&");
}, z = (e) => {
  if (!e) return "stream";
  let n = e.split(";")[0]?.trim();
  if (n) {
    if (n.startsWith("application/json") || n.endsWith("+json")) return "json";
    if (n === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((r) => n.startsWith(r))) return "blob";
    if (n.startsWith("text/")) return "text";
  }
}, E = async ({ security: e, ...n }) => {
  for (let r of e) {
    let o = await R(r, n.auth);
    if (!o) continue;
    let s = r.name ?? "Authorization";
    switch (r.in) {
      case "query":
        n.query || (n.query = {}), n.query[s] = o;
        break;
      case "cookie":
        n.headers.append("Cookie", `${s}=${o}`);
        break;
      case "header":
      default:
        n.headers.set(s, o);
        break;
    }
    return;
  }
}, j = (e) => D({ baseUrl: e.baseUrl, path: e.path, query: e.query, querySerializer: typeof e.querySerializer == "function" ? e.querySerializer : S(e.querySerializer), url: e.url }), D = ({ baseUrl: e, path: n, query: r, querySerializer: o, url: s }) => {
  let l = s.startsWith("/") ? s : `/${s}`, a = (e ?? "") + l;
  n && (a = W({ path: n, url: a }));
  let t = r ? o(r) : "";
  return t.startsWith("?") && (t = t.substring(1)), t && (a += `?${t}`), a;
}, v = (e, n) => {
  let r = { ...e, ...n };
  return r.baseUrl?.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = q(e.headers, n.headers), r;
}, q = (...e) => {
  let n = new Headers();
  for (let r of e) {
    if (!r || typeof r != "object") continue;
    let o = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [s, l] of o) if (l === null) n.delete(s);
    else if (Array.isArray(l)) for (let a of l) n.append(s, a);
    else l !== void 0 && n.set(s, typeof l == "object" ? JSON.stringify(l) : l);
  }
  return n;
}, w = class {
  _fns;
  constructor() {
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(e) {
    return typeof e == "number" ? this._fns[e] ? e : -1 : this._fns.indexOf(e);
  }
  exists(e) {
    let n = this.getInterceptorIndex(e);
    return !!this._fns[n];
  }
  eject(e) {
    let n = this.getInterceptorIndex(e);
    this._fns[n] && (this._fns[n] = null);
  }
  update(e, n) {
    let r = this.getInterceptorIndex(e);
    return this._fns[r] ? (this._fns[r] = n, e) : !1;
  }
  use(e) {
    return this._fns = [...this._fns, e], this._fns.length - 1;
  }
}, N = () => ({ error: new w(), request: new w(), response: new w() }), k = S({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), P = { "Content-Type": "application/json" }, C = (e = {}) => ({ ..._, headers: P, parseAs: "auto", querySerializer: k, ...e }), H = (e = {}) => {
  let n = v(C(), e), r = () => ({ ...n }), o = (a) => (n = v(n, a), r()), s = N(), l = async (a) => {
    let t = { ...n, ...a, fetch: a.fetch ?? n.fetch ?? globalThis.fetch, headers: q(n.headers, a.headers) };
    t.security && await E({ ...t, security: t.security }), t.body && t.bodySerializer && (t.body = t.bodySerializer(t.body)), (t.body === void 0 || t.body === "") && t.headers.delete("Content-Type");
    let i = j(t), f = { redirect: "follow", ...t }, d = new Request(i, f);
    for (let c of s.request._fns) c && (d = await c(d, t));
    let O = t.fetch, u = await O(d);
    for (let c of s.response._fns) c && (u = await c(u, d, t));
    let y = { request: d, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return t.responseStyle === "data" ? {} : { data: {}, ...y };
      let c = (t.parseAs === "auto" ? z(u.headers.get("Content-Type")) : t.parseAs) ?? "json";
      if (c === "stream") return t.responseStyle === "data" ? u.body : { data: u.body, ...y };
      let h = await u[c]();
      return c === "json" && (t.responseValidator && await t.responseValidator(h), t.responseTransformer && (h = await t.responseTransformer(h))), t.responseStyle === "data" ? h : { data: h, ...y };
    }
    let m = await u.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let p = m;
    for (let c of s.error._fns) c && (p = await c(m, u, d, t));
    if (p = p || {}, t.throwOnError) throw p;
    return t.responseStyle === "data" ? void 0 : { error: p, ...y };
  };
  return { buildUrl: j, connect: (a) => l({ ...a, method: "CONNECT" }), delete: (a) => l({ ...a, method: "DELETE" }), get: (a) => l({ ...a, method: "GET" }), getConfig: r, head: (a) => l({ ...a, method: "HEAD" }), interceptors: s, options: (a) => l({ ...a, method: "OPTIONS" }), patch: (a) => l({ ...a, method: "PATCH" }), post: (a) => l({ ...a, method: "POST" }), put: (a) => l({ ...a, method: "PUT" }), request: l, setConfig: o, trace: (a) => l({ ...a, method: "TRACE" }) };
};
const g = H(C()), J = (e) => (e.client ?? g).get({
  url: "/extract",
  ...e
}), B = (e) => (e.client ?? g).post({
  url: "/agents",
  ...e,
  headers: {
    "Content-Type": "application/json",
    ...e.headers
  }
}), L = (e) => (e.client ?? g).get({
  url: "/search",
  ...e
});
export {
  J as extractContent,
  L as searchWeb,
  B as writeLanguage
};
