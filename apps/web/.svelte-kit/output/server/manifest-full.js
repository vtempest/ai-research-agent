export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["docs/404.html","docs/api/extract-content/index.html","docs/api/qwksearch-api/index.html","docs/api/search-web/index.html","docs/api/write-language/index.html","docs/assets/css/styles.58d370f1.css","docs/assets/js/015ad3b0.2def29ab.js","docs/assets/js/0226b8d6.325fc86a.js","docs/assets/js/041d34f6.55bb2e95.js","docs/assets/js/09e37e50.64e54a67.js","docs/assets/js/10303084.678d1e8f.js","docs/assets/js/11b43341.c54a1fe3.js","docs/assets/js/124632b3.90b59fcb.js","docs/assets/js/12745c50.7848301b.js","docs/assets/js/12ad540e.9760d4b1.js","docs/assets/js/135da086.ea1ee06e.js","docs/assets/js/1380b9cc.3002fb97.js","docs/assets/js/1531.05dc1a75.js","docs/assets/js/1531.05dc1a75.js.LICENSE.txt","docs/assets/js/15417bd9.beb513ee.js","docs/assets/js/167ab116.61befcfb.js","docs/assets/js/1b83188c.93a4a696.js","docs/assets/js/1becefcd.03d58526.js","docs/assets/js/1d25e9b4.e480c38a.js","docs/assets/js/1de5b9db.beb22577.js","docs/assets/js/1e43271f.e5f46ac7.js","docs/assets/js/1ec7016d.d99a253f.js","docs/assets/js/1fe2fcca.948ab74a.js","docs/assets/js/215f0004.db574cc5.js","docs/assets/js/219f853b.f48be431.js","docs/assets/js/22363add.41e5e96b.js","docs/assets/js/22404b95.d6c28435.js","docs/assets/js/22bb8eb6.c0a4d828.js","docs/assets/js/232c8d4c.a3cc00b2.js","docs/assets/js/23f3d67e.bfc5b593.js","docs/assets/js/272ad44e.0b5306f6.js","docs/assets/js/2775e0f4.d896bf01.js","docs/assets/js/2921a2ad.11430a91.js","docs/assets/js/2976beb9.e3ca1dac.js","docs/assets/js/30a93404.53467dac.js","docs/assets/js/33d165df.d84676dd.js","docs/assets/js/39c64ad4.a1093d66.js","docs/assets/js/3bac0174.f2a6baca.js","docs/assets/js/3d7866da.95097ea4.js","docs/assets/js/42977fec.17059563.js","docs/assets/js/42f701c4.437ae02b.js","docs/assets/js/43004b84.39095782.js","docs/assets/js/4556475d.80e257f3.js","docs/assets/js/455f2f6b.b45bdaa6.js","docs/assets/js/456d56ea.d8798d6d.js","docs/assets/js/48932a53.6cfc3135.js","docs/assets/js/4b3b4fae.56462d29.js","docs/assets/js/4c5e977b.51b6dc36.js","docs/assets/js/4eb14e1d.a9cb0e14.js","docs/assets/js/4ffe6457.039bffe4.js","docs/assets/js/526d8fa3.8276a901.js","docs/assets/js/537d3db8.a84474a0.js","docs/assets/js/56848a96.1cd34e48.js","docs/assets/js/5723.e3946dfd.js","docs/assets/js/58aaeab4.220d9f98.js","docs/assets/js/58b2ae61.0a74c7c7.js","docs/assets/js/5969f2e0.4cb6e0eb.js","docs/assets/js/59968a87.74bdc7a4.js","docs/assets/js/5a558013.abbdd0cc.js","docs/assets/js/5c5f6ea1.691eb162.js","docs/assets/js/5e95c892.d4ab3b0b.js","docs/assets/js/5ed95a81.6198a825.js","docs/assets/js/63773a93.ca12fe68.js","docs/assets/js/638.3af7573a.js","docs/assets/js/66ad4f5d.12500b46.js","docs/assets/js/68cef36b.a120c5d1.js","docs/assets/js/6a49fe0f.86a401b4.js","docs/assets/js/6a97b77a.70210016.js","docs/assets/js/6d5c6a02.c1699602.js","docs/assets/js/6df5b617.c006decd.js","docs/assets/js/6e779b8f.712e858e.js","docs/assets/js/6ea4ccb3.dd86118d.js","docs/assets/js/703f2c3a.e0d8831d.js","docs/assets/js/71c382ce.d4f1af8d.js","docs/assets/js/7326c854.390bafa7.js","docs/assets/js/756df125.8621f28c.js","docs/assets/js/75a8c361.0794fefe.js","docs/assets/js/75f34c85.fcde081c.js","docs/assets/js/76a1e971.99c10c6f.js","docs/assets/js/7760.5f3008b7.js","docs/assets/js/7760.5f3008b7.js.LICENSE.txt","docs/assets/js/7b642801.425826ff.js","docs/assets/js/7bec3e22.0cd84f06.js","docs/assets/js/7eb4392e.22ca45ce.js","docs/assets/js/7ede7ee3.fe5d4134.js","docs/assets/js/82317477.689eed0c.js","docs/assets/js/829f5ea6.072549ee.js","docs/assets/js/83d6c587.92342ac5.js","docs/assets/js/84aae010.983fef77.js","docs/assets/js/8564e826.0c04bf93.js","docs/assets/js/8892.2b28b2e2.js","docs/assets/js/89741174.ae45a21d.js","docs/assets/js/897c021d.b9f6382f.js","docs/assets/js/8e6edbab.f680434a.js","docs/assets/js/9053.0be6d17c.js","docs/assets/js/9053.0be6d17c.js.LICENSE.txt","docs/assets/js/9197.c9d19fff.js","docs/assets/js/9197.c9d19fff.js.LICENSE.txt","docs/assets/js/943a9677.0b54a4fa.js","docs/assets/js/97bb5267.92262091.js","docs/assets/js/9832.96b2281d.js","docs/assets/js/9a7bcdb5.4f6f9f3f.js","docs/assets/js/9aa78f53.ea569816.js","docs/assets/js/9b0681bb.783d7daf.js","docs/assets/js/9c3c28f7.3f46c50a.js","docs/assets/js/9ca78735.e4fad8c0.js","docs/assets/js/9cc1a6e6.5d0a1a8f.js","docs/assets/js/9e1c1874.5b301b9c.js","docs/assets/js/a10ab531.4e5bcdbc.js","docs/assets/js/a1f4d191.924fe284.js","docs/assets/js/a4627afd.3bb7cdd0.js","docs/assets/js/a684db05.eefac34f.js","docs/assets/js/a7bd4aaa.3e931d36.js","docs/assets/js/a94703ab.40a3f609.js","docs/assets/js/aa9bba97.fa879925.js","docs/assets/js/aba21aa0.57489700.js","docs/assets/js/ac35354c.45b9e63f.js","docs/assets/js/ae54b596.463ca1e5.js","docs/assets/js/b2d57078.ce20c353.js","docs/assets/js/b34205df.b05de390.js","docs/assets/js/b3f262d3.c71d55c6.js","docs/assets/js/b46dd0f3.43a08132.js","docs/assets/js/b64476c4.15e84757.js","docs/assets/js/b8cb6a5e.05711ead.js","docs/assets/js/b9a23546.d316eda0.js","docs/assets/js/bc7fac30.381968f4.js","docs/assets/js/bd023c0d.2e38e8c6.js","docs/assets/js/c0d8298e.8d8d5c4a.js","docs/assets/js/c2be4804.5af33755.js","docs/assets/js/c39a0fab.4296f419.js","docs/assets/js/c3a618e1.ed3763f4.js","docs/assets/js/c7e884c3.a9a1cbe5.js","docs/assets/js/c7f97a07.6b8abd27.js","docs/assets/js/c845d74e.1437fa91.js","docs/assets/js/ca7e190d.53d5cee0.js","docs/assets/js/caefd9e3.f97d9920.js","docs/assets/js/cdc1d4f2.d027395e.js","docs/assets/js/d102e477.e77e2af3.js","docs/assets/js/d12afbc2.c0e70afd.js","docs/assets/js/d140250a.b62d5ed9.js","docs/assets/js/d1ca103b.8d7fc524.js","docs/assets/js/d623b84b.5ad2ed61.js","docs/assets/js/dbb2678a.2efb1c48.js","docs/assets/js/dea5d568.73c52034.js","docs/assets/js/e0417430.c0266e9b.js","docs/assets/js/e501d24a.bac4f929.js","docs/assets/js/e6d64d9d.be944fd9.js","docs/assets/js/e7e7eaab.7133fdc0.js","docs/assets/js/ebf272eb.933d85ff.js","docs/assets/js/ee51a4e3.7ec3e3c6.js","docs/assets/js/ee652e20.305a501b.js","docs/assets/js/eef76247.fd67d52d.js","docs/assets/js/f0f961fe.3942c06c.js","docs/assets/js/f3da3036.88f757f7.js","docs/assets/js/fa36fcd0.7ba552f3.js","docs/assets/js/fc2fe93a.d5d971a7.js","docs/assets/js/fe4e322b.37633cb7.js","docs/assets/js/ffbc03b1.2287d769.js","docs/assets/js/main.914123c1.js","docs/assets/js/main.914123c1.js.LICENSE.txt","docs/assets/js/runtime~main.8fa13c3d.js","docs/functions/agents/agent-prompts/index.html","docs/functions/agents/agent-tools/index.html","docs/functions/agents/api2ai/index.html","docs/functions/agents/generate-language/index.html","docs/functions/agents/language-model-names/index.html","docs/functions/agents/memory/index.html","docs/functions/extractor/html-to-cite/extract-author/index.html","docs/functions/extractor/html-to-cite/extract-cite/index.html","docs/functions/extractor/html-to-cite/extract-date/date-extractors/index.html","docs/functions/extractor/html-to-cite/extract-date/date-validators/index.html","docs/functions/extractor/html-to-cite/extract-date/extract-date-quick/index.html","docs/functions/extractor/html-to-cite/extract-date/index.html","docs/functions/extractor/html-to-cite/extract-source/index.html","docs/functions/extractor/html-to-cite/extract-title/index.html","docs/functions/extractor/html-to-cite/human-names-recognize/index.html","docs/functions/extractor/html-to-cite/metadata-to-cite/index.html","docs/functions/extractor/html-to-cite/url-to-domain/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-mercury/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-readability/index.html","docs/functions/extractor/html-to-content/html-to-basic-html/index.html","docs/functions/extractor/html-to-content/html-utils/index.html","docs/functions/extractor/html-to-content/index.html","docs/functions/extractor/pdf-to-html/index.html","docs/functions/extractor/pdf-to-html/models/Annotation/index.html","docs/functions/extractor/pdf-to-html/models/BlockType/index.html","docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default/index.html","docs/functions/extractor/pdf-to-html/models/HeadlineFinder/index.html","docs/functions/extractor/pdf-to-html/models/LineConverter/index.html","docs/functions/extractor/pdf-to-html/models/LineItem/index.html","docs/functions/extractor/pdf-to-html/models/LineItemBlock/index.html","docs/functions/extractor/pdf-to-html/models/Page/index.html","docs/functions/extractor/pdf-to-html/models/PageItem/index.html","docs/functions/extractor/pdf-to-html/models/ParseResult/index.html","docs/functions/extractor/pdf-to-html/models/ParsedElements/index.html","docs/functions/extractor/pdf-to-html/models/StashingStream/index.html","docs/functions/extractor/pdf-to-html/models/TextItem/index.html","docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper/index.html","docs/functions/extractor/pdf-to-html/models/Word/index.html","docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats/index.html","docs/functions/extractor/pdf-to-html/transformations/ToHTML/index.html","docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks/index.html","docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/Transformation/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks/index.html","docs/functions/extractor/pdf-to-html/util/is-url-pdf/index.html","docs/functions/extractor/pdf-to-html/util/page-item-functions/index.html","docs/functions/extractor/pdf-to-html/util/page-number-functions/index.html","docs/functions/extractor/pdf-to-html/util/string-functions/index.html","docs/functions/extractor/url-to-content/docx-to-content/index.html","docs/functions/extractor/url-to-content/index.html","docs/functions/extractor/url-to-content/url-to-html/index.html","docs/functions/extractor/url-to-content/youtube-to-text/index.html","docs/functions/index-1/index.html","docs/functions/index.html","docs/functions/interface/highlight-code/index.html","docs/functions/interface/youtube-embed/index.html","docs/functions/match/compare-letters/index.html","docs/functions/match/match-quasar/index.html","docs/functions/match/weigh-relevance-frequency/index.html","docs/functions/modules/index.html","docs/functions/search/search-engines/index.html","docs/functions/search/search-stream/index.html","docs/functions/search/search-web/index.html","docs/functions/search/search-wikipedia/index.html","docs/functions/similarity/similarity-remote-api/index.html","docs/functions/tokenize/stopwords/index.html","docs/functions/tokenize/suggest-complete-word/index.html","docs/functions/tokenize/text-to-chunks/index.html","docs/functions/tokenize/text-to-sentences/index.html","docs/functions/tokenize/text-to-topic-tokens/index.html","docs/functions/tokenize/word-to-root-stem/index.html","docs/functions/topics/ngrams/index.html","docs/functions/topics/rank-sentences-keyphrases/index.html","docs/functions/topics/seektopic-keyphrases/index.html","docs/functions/topics/topic-distribution/index.html","docs/functions/types/index.html","docs/index.html","docs/lunr-index-1756257554189.json","docs/lunr-index.json","docs/neural-net/index-1/index.html","docs/neural-net/index.html","docs/neural-net/modules/index.html","docs/neural-net/neural-net-tensors/neural-net-gpu/index.html","docs/neural-net/neural-net-tensors/neural-net-tf/index.html","docs/neural-net/next-word-prediction/scripts/predict-next-word/index.html","docs/neural-net/statistics/predict-statistics/index.html","docs/neural-net/vectorize/similarity-remote-api/index.html","docs/neural-net/vectorize/similarity-vector/index.html","docs/neural-net/vectorize/usearch/index.html","docs/search-doc-1756257554189.json","docs/search-doc.json","docs/sitemap.xml","docs/web/components/AppLayout/auth-google-one-tap/index.html","docs/web/components/AppLayout/sound-effects/index.html","docs/web/components/Editor/docx/docx-to-html/index.html","docs/web/components/Editor/docx/docx-tokens/index.html","docs/web/components/Editor/docx/parse-cards/index.html","docs/web/components/Editor/docx/parse-debate-docx/index.html","docs/web/components/Editor/docx/parse-zip-folder/index.html","docs/web/components/Editor/storage/files-api-frontend/index.html","docs/web/components/Editor/storage/local-storage-api/index.html","docs/web/components/Editor/storage/seed-test-data/index.html","docs/web/components/ReadMode/auto-highlight/index.html","docs/web/components/ReadMode/read-mode-view/index.html","docs/web/components/SearchWeb/categories/index.html","docs/web/components/SearchWeb/extras/QuantumSphere/index.html","docs/web/components/SearchWeb/extras/get-weather/index.html","docs/web/components/SearchWeb/extras/home-extras/index.html","docs/web/components/ShortcutSearch/shortcut-search/index.html","docs/web/components/ShortcutSearch/shortcut-search-web/index.html","docs/web/components/TabManager/find-in-tab-content/index.html","docs/web/components/icons/index.html","docs/web/components/icons-1/index.html","docs/web/components/utils/auth-client/index.html","docs/web/components/utils/index.html","docs/web/components/utils-1/index.html","docs/web/customize-site/index.html","docs/web/index.html","docs/web/modules/index.html","docs/web/server/auth/index.html","docs/web/server/drizzle.config/index.html","docs/web/server/email/index.html","docs/web/server/index.html","docs/web/server/ratelimits/index.html","docs/web/server/schema/index.html","docs/web/server/types/index.html","docs/web/server/users/index.html","docs/web/server/validations/index.html","docs/web/server-1/index.html","favicon.ico","fonts/iowan.woff2","icons/android-chrome-192x192.png","icons/android-chrome-512x512.png","icons/app-icon.svg","icons/apple-touch-icon.png","icons/qwksearch-icon.svg","icons/qwksearch-logo.svg","robots.txt","site.webmanifest"]),
	mimeTypes: {".html":"text/html",".css":"text/css",".js":"text/javascript",".txt":"text/plain",".json":"application/json",".xml":"text/xml",".woff2":"font/woff2",".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.BqD0ExR0.js",app:"_app/immutable/entry/app.CNfL1CJ7.js",imports:["_app/immutable/entry/start.BqD0ExR0.js","_app/immutable/chunks/CNhy9plP.js","_app/immutable/chunks/DgBswFJt.js","_app/immutable/chunks/Dk_ZDBoQ.js","_app/immutable/chunks/DCI5hF00.js","_app/immutable/chunks/BqOFc2WC.js","_app/immutable/chunks/DXa3xy4r.js","_app/immutable/chunks/WuwLjjiI.js","_app/immutable/entry/app.CNfL1CJ7.js","_app/immutable/chunks/Dk_ZDBoQ.js","_app/immutable/chunks/DCI5hF00.js","_app/immutable/chunks/BqOFc2WC.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DgBswFJt.js","_app/immutable/chunks/DXa3xy4r.js","_app/immutable/chunks/CdIkY1E0.js","_app/immutable/chunks/WuwLjjiI.js","_app/immutable/chunks/D8cMToM2.js","_app/immutable/chunks/ruU2Jr75.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/agents",
				pattern: /^\/api\/agents\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/agents/_server.ts.js'))
			},
			{
				id: "/api/chats",
				pattern: /^\/api\/chats\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/chats/_server.ts.js'))
			},
			{
				id: "/api/extract",
				pattern: /^\/api\/extract\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/extract/_server.js'))
			},
			{
				id: "/api/files",
				pattern: /^\/api\/files\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/files/_server.ts.js'))
			},
			{
				id: "/api/files/[fileId]",
				pattern: /^\/api\/files\/([^/]+?)\/?$/,
				params: [{"name":"fileId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/files/_fileId_/_server.ts.js'))
			},
			{
				id: "/api/model",
				pattern: /^\/api\/model\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/model/_server.ts.js'))
			},
			{
				id: "/api/search",
				pattern: /^\/api\/search\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/search/_server.ts.js'))
			},
			{
				id: "/api/subscriptions",
				pattern: /^\/api\/subscriptions\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/subscriptions/_server.ts.js'))
			},
			{
				id: "/api/user",
				pattern: /^\/api\/user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/user/_server.ts.js'))
			},
			{
				id: "/api/vectorize",
				pattern: /^\/api\/vectorize\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/vectorize/_server.js'))
			},
			{
				id: "/legal/privacy",
				pattern: /^\/legal\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/legal/terms",
				pattern: /^\/legal\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
