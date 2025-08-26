import d from "xgboost_node";
async function h(a, n = {}) {
  var { precision: r = 4, pipeline: t } = n;
  t || (t = await $());
  const o = await t(a, { pooling: "mean", normalize: !0 });
  return Array.from(o.data).map(
    (s) => parseFloat(s.toFixed(r))
  );
}
async function $(a = {}) {
  const { pipeline: n } = await import("@huggingface/transformers"), {
    pipelineName: r = "feature-extraction",
    modelName: t = "Xenova/all-MiniLM-L6-v2",
    quantized: o = !0,
    gpu: e = !1
  } = a;
  return await n(r, t, {
    quantized: o,
    dtype: "fp32",
    device: e ? "cuda" : "cpu"
  });
}
async function x(a, n, r = {}) {
  const { numNeighbors: t = 5 } = r, o = await h(n);
  return a.searchKnn(o, t, null);
}
function S(a, n = 8) {
  const r = a.getCurrentCount(), t = [];
  for (let o = 0; o < r; o++) {
    const e = a.getPoint(o);
    t.push(e.map((s) => Number(s.toFixed(n))));
  }
  return t;
}
function F(a, n) {
  return a.reduce((r, t, o) => r + t * n[o], 0) / (Math.sqrt(a.reduce((r, t) => r + t * t, 0)) * Math.sqrt(n.reduce((r, t) => r + t * t, 0)));
}
async function j(a, n, r = {}) {
  const t = await h(a, r), o = await h(n, r);
  return t.map((s, i) => ({
    index: i,
    similarity: F(o[0], s)
  })).sort((s, i) => i.similarity - s.similarity).map(({ index: s, similarity: i }) => ({
    content: a[s],
    similarity: i
  }));
}
async function A(a, n, r = {}) {
  const {
    xgbParams: t = {
      verbosity: 0,
      max_depth: 7,
      // Slightly increased with stronger regularization
      eta: 0.07,
      // Reduced learning rate for better convergence
      objective: "reg:squarederror",
      nthread: 4,
      subsample: 0.85,
      // Added stochasticity while maintaining data leverage
      colsample_bytree: 0.8,
      // More conservative feature sampling
      colsample_bylevel: 0.8,
      // Additional per-level sampling
      min_child_weight: 5,
      // Stronger protection against small leaves
      gamma: 0.2,
      //   Increased split cost regularization
      alpha: 0.1,
      // Mild L1 regularization
      lambda: 1.5,
      // Stronger L2 regularization
      early_stopping_rounds: 50,
      // More patience for validation improvements
      seed: 42,
      nrounds: 2e3,
      // Increased with safer early stopping
      tree_method: "hist",
      // Optimized for speed/accuracy balance
      grow_policy: "depthwise",
      // Conservative growth strategy
      ...r.xgbParams
    },
    testSize: o = 0.1,
    featuresToUse: e
  } = r;
  let i = a.map((u) => ({
    ...e.reduce((f, _) => (f[_] = u[_], f), {})
  })).filter((u) => Object.values(u).length > 0).map((u) => Object.values(u));
  i = i.map((u) => u.map(Number));
  const m = a.map((u) => u[n]), { trainFeatures: c, testFeatures: l, trainTarget: p, testTarget: b } = T(i, m, o), y = Object.values(c).map((u) => Object.values(u)).map((u) => u.map(Number)), M = Object.values(l).map((u) => Object.values(u)).map((u) => u.map(Number)), g = [];
  for (let u = 0; u < p.length; u++)
    isNaN(p[u]) || g.push(u);
  const v = g.map((u) => y[u]), N = g.map((u) => p[u]);
  return await d.train(v, N, t), C(
    await d.predict(M),
    b
  );
}
function T(a, n, r = 0.2) {
  const t = a.length, o = Math.floor(t * r), e = t - o, s = Array.from({ length: t }, (c, l) => l);
  for (let c = s.length - 1; c > 0; c--) {
    const l = Math.floor(Math.random() * (c + 1));
    [s[c], s[l]] = [s[l], s[c]];
  }
  const i = s.slice(0, e), m = s.slice(e);
  return {
    trainFeatures: i.map((c) => a[c]),
    testFeatures: m.map((c) => a[c]),
    trainTarget: i.map((c) => n[c]),
    testTarget: m.map((c) => n[c])
  };
}
function C(a, n) {
  const r = n.reduce((e, s) => e + s, 0) / n.length, t = n.map((e) => Math.pow(e - r, 2)).reduce((e, s) => e + s, 0), o = n.map((e, s) => Math.pow(e - a[s], 2)).reduce((e, s) => e + s, 0);
  return Math.round((1 - o / t) * 100) / 100;
}
function O(a, n = {}) {
  const {
    featuresToUse: r
  } = n, o = a.map((e) => ({
    ...r.reduce((s, i) => (s[i] = e[i], s), {})
  })).map((e) => Object.values(e)).map((e) => e.map(Number)).filter((e) => e.length > 1 && !!e[0]);
  return console.log(o), d.predict(o).then((e) => (a.forEach((s, i) => {
    s.predicted = e[i];
  }), a));
}
async function w(a) {
  await d.saveModel(a);
}
async function z(a) {
  await d.loadModel(a);
}
function I(a, n, r = 7) {
  return a.map((t, o) => {
    if (o < r - 1)
      return {
        ...t,
        [`${n}_rolling_mean_${r}d`]: t[n],
        [`${n}_rolling_std_${r}d`]: t[n]
      };
    const e = a.slice(o - r + 1, o + 1).map((c) => c[n]).filter((c) => c != null && !isNaN(c));
    if (e.length === 0)
      return {
        ...t,
        [`${n}_rolling_mean_${r}d`]: null,
        [`${n}_rolling_std_${r}d`]: null
      };
    const s = e.reduce((c, l) => c + l, 0) / e.length, i = e.reduce((c, l) => c + Math.pow(l - s, 2), 0) / e.length, m = Math.sqrt(i);
    return {
      ...t,
      [`${n}_rolling_mean_${r}d`]: Math.floor(s),
      // Round to 2 decimal places
      [`${n}_rolling_std_${r}d`]: Math.floor(m)
    };
  });
}
export {
  F as calculateCosineSimilarity,
  I as calculateRollingStats,
  h as convertTextToEmbedding,
  S as getAllEmbeddings,
  $ as getEmbeddingModel,
  z as loadModel,
  O as predictFuture,
  w as saveModel,
  x as searchVectorIndex,
  A as trainModels,
  j as weighRelevanceConceptVector
};
