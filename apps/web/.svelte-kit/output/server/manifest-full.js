export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["docs/404.html","docs/api/extract-content/index.html","docs/api/qwksearch-api/index.html","docs/api/search-web/index.html","docs/api/write-language/index.html","docs/assets/css/styles.f156b7a2.css","docs/assets/js/015ad3b0.2007bc82.js","docs/assets/js/0226b8d6.a41c57fd.js","docs/assets/js/041d34f6.3ca6d2a8.js","docs/assets/js/09e37e50.a8fe1c2a.js","docs/assets/js/0e1e0e1f.e12baf9a.js","docs/assets/js/1024.5621ff60.js","docs/assets/js/1024.5621ff60.js.LICENSE.txt","docs/assets/js/10303084.fa47aa99.js","docs/assets/js/11b43341.ca56b8da.js","docs/assets/js/124632b3.ca8291a9.js","docs/assets/js/12745c50.19e5976a.js","docs/assets/js/12ad540e.55b59668.js","docs/assets/js/135da086.7669c01c.js","docs/assets/js/1380b9cc.b45ef92e.js","docs/assets/js/15417bd9.da169e1d.js","docs/assets/js/167ab116.57f29e7b.js","docs/assets/js/1b83188c.8609a20c.js","docs/assets/js/1becefcd.3f4a2a00.js","docs/assets/js/1d25e9b4.2be06a61.js","docs/assets/js/1de5b9db.fba84dc3.js","docs/assets/js/1e43271f.cafc63b3.js","docs/assets/js/1ec7016d.3c7a4d72.js","docs/assets/js/1fe2fcca.a6e2254c.js","docs/assets/js/202.5ed2d363.js","docs/assets/js/215f0004.606d1892.js","docs/assets/js/219f853b.19fa58d0.js","docs/assets/js/22363add.b26191bd.js","docs/assets/js/22404b95.835299e8.js","docs/assets/js/22bb8eb6.ba7729d6.js","docs/assets/js/232c8d4c.1644fe1d.js","docs/assets/js/23f3d67e.8a749159.js","docs/assets/js/272ad44e.c14b5828.js","docs/assets/js/2921a2ad.04d8512f.js","docs/assets/js/2976beb9.5eba61de.js","docs/assets/js/30a93404.8c8e0581.js","docs/assets/js/33d165df.1a48b4b8.js","docs/assets/js/39c64ad4.d097f17c.js","docs/assets/js/3bac0174.e20e5a1b.js","docs/assets/js/3d7866da.b8778d6d.js","docs/assets/js/42977fec.8abd156d.js","docs/assets/js/42c12a85.b0e38f5c.js","docs/assets/js/42f701c4.0b08f012.js","docs/assets/js/43004b84.c9ce2c70.js","docs/assets/js/4556475d.2f8a9ab1.js","docs/assets/js/455f2f6b.816fee99.js","docs/assets/js/456d56ea.de4841df.js","docs/assets/js/4675.ed56db3a.js","docs/assets/js/4675.ed56db3a.js.LICENSE.txt","docs/assets/js/48932a53.c84a8c13.js","docs/assets/js/4934.f1bf47b0.js","docs/assets/js/4b3b4fae.b10008e8.js","docs/assets/js/4c5e977b.356253a0.js","docs/assets/js/4ffe6457.70eb6312.js","docs/assets/js/526d8fa3.20ff060f.js","docs/assets/js/537d3db8.d4fac544.js","docs/assets/js/56848a96.a1a2487d.js","docs/assets/js/58aaeab4.571ffaa7.js","docs/assets/js/58b2ae61.75452f95.js","docs/assets/js/5969f2e0.b4f0c457.js","docs/assets/js/59968a87.a10f5251.js","docs/assets/js/5a558013.f8d36719.js","docs/assets/js/5c5f6ea1.358189b4.js","docs/assets/js/5e95c892.29542803.js","docs/assets/js/5ed95a81.1652cd1c.js","docs/assets/js/6303.bab37bf4.js","docs/assets/js/63773a93.90ed27ec.js","docs/assets/js/66ad4f5d.547559cb.js","docs/assets/js/68cef36b.b10f354a.js","docs/assets/js/6a49fe0f.706ba04e.js","docs/assets/js/6a97b77a.b73de1fc.js","docs/assets/js/6d5c6a02.36a56439.js","docs/assets/js/6df5b617.912b0668.js","docs/assets/js/6e779b8f.909fbd81.js","docs/assets/js/6ea4ccb3.82b02757.js","docs/assets/js/703f2c3a.e6ea763e.js","docs/assets/js/71c382ce.42125de8.js","docs/assets/js/7326c854.5f6a5810.js","docs/assets/js/7472.737ccb2f.js","docs/assets/js/7472.737ccb2f.js.LICENSE.txt","docs/assets/js/756df125.640413c2.js","docs/assets/js/75a8c361.22b55aba.js","docs/assets/js/75f34c85.3dc9c16e.js","docs/assets/js/76a1e971.86edbde1.js","docs/assets/js/7717.5039a409.js","docs/assets/js/7717.5039a409.js.LICENSE.txt","docs/assets/js/7902.d8ee2582.js","docs/assets/js/7b642801.4ef1eef3.js","docs/assets/js/7bec3e22.7a154b91.js","docs/assets/js/7eb4392e.09555b34.js","docs/assets/js/7ede7ee3.d850064b.js","docs/assets/js/82317477.87c9ec75.js","docs/assets/js/829f5ea6.01d2bd97.js","docs/assets/js/83d6c587.ad6404b2.js","docs/assets/js/84aae010.106b83a6.js","docs/assets/js/8564e826.d33fea5b.js","docs/assets/js/89741174.374ad05a.js","docs/assets/js/897c021d.4b58ef5f.js","docs/assets/js/8e6edbab.8af48616.js","docs/assets/js/97bb5267.c519765c.js","docs/assets/js/9a7bcdb5.3a3a9eb0.js","docs/assets/js/9aa78f53.3ccbdae3.js","docs/assets/js/9b0681bb.099e0ab8.js","docs/assets/js/9c3c28f7.402480b0.js","docs/assets/js/9ca78735.147c1ddb.js","docs/assets/js/9cc1a6e6.e9643e71.js","docs/assets/js/9e1c1874.ccae5d48.js","docs/assets/js/a10ab531.61cadf52.js","docs/assets/js/a1f4d191.c0b210a2.js","docs/assets/js/a4627afd.931c2ca1.js","docs/assets/js/a684db05.40a94c7e.js","docs/assets/js/a7bd4aaa.a502291e.js","docs/assets/js/a94703ab.99423b09.js","docs/assets/js/aa9bba97.539f81dc.js","docs/assets/js/aba21aa0.57489700.js","docs/assets/js/ac35354c.ae42e2ac.js","docs/assets/js/ae54b596.16f5addb.js","docs/assets/js/b2d57078.e1aff53d.js","docs/assets/js/b34205df.73e17421.js","docs/assets/js/b3f262d3.dfe5adbc.js","docs/assets/js/b46dd0f3.73eab0af.js","docs/assets/js/b64476c4.a2115473.js","docs/assets/js/b8cb6a5e.7be2c1aa.js","docs/assets/js/b9a23546.2a2eb5d2.js","docs/assets/js/bc7fac30.beb5aaeb.js","docs/assets/js/bd023c0d.3a1a5fbc.js","docs/assets/js/c0d8298e.6a8751b4.js","docs/assets/js/c2be4804.a31b142d.js","docs/assets/js/c39a0fab.8fc195ed.js","docs/assets/js/c3a618e1.db0c8013.js","docs/assets/js/c7e884c3.f60498a7.js","docs/assets/js/c7f97a07.3b0495b9.js","docs/assets/js/c845d74e.d049a740.js","docs/assets/js/ca7e190d.143e2375.js","docs/assets/js/caefd9e3.8f2c302a.js","docs/assets/js/cdc1d4f2.33f1cdb1.js","docs/assets/js/d102e477.dc17fb2a.js","docs/assets/js/d12afbc2.0c241969.js","docs/assets/js/d140250a.38f8ff59.js","docs/assets/js/d1ca103b.7f69a240.js","docs/assets/js/d623b84b.7f288d91.js","docs/assets/js/d909221d.7ab3a82e.js","docs/assets/js/dbb2678a.8c0da267.js","docs/assets/js/dea5d568.cc9b8a5a.js","docs/assets/js/e0417430.922925fa.js","docs/assets/js/e501d24a.324d704f.js","docs/assets/js/e6d64d9d.10022d9e.js","docs/assets/js/e7e7eaab.4122c197.js","docs/assets/js/ebf272eb.62ad7c59.js","docs/assets/js/ee51a4e3.790b62bf.js","docs/assets/js/ee652e20.aee19afa.js","docs/assets/js/eef76247.ce4dcfa1.js","docs/assets/js/f0f961fe.62b33ebb.js","docs/assets/js/f3da3036.239d8984.js","docs/assets/js/fa36fcd0.012536a0.js","docs/assets/js/fc2fe93a.9aa488da.js","docs/assets/js/fe4e322b.127e60f9.js","docs/assets/js/ffbc03b1.f8a67601.js","docs/assets/js/main.8970ef48.js","docs/assets/js/main.8970ef48.js.LICENSE.txt","docs/assets/js/runtime~main.28c884c7.js","docs/functions/agents/agent-prompts/index.html","docs/functions/agents/agent-tools/index.html","docs/functions/agents/api2ai/index.html","docs/functions/agents/generate-language/index.html","docs/functions/agents/language-model-names/index.html","docs/functions/agents/memory/index.html","docs/functions/extractor/html-to-cite/extract-author/index.html","docs/functions/extractor/html-to-cite/extract-cite/index.html","docs/functions/extractor/html-to-cite/extract-date/date-extractors/index.html","docs/functions/extractor/html-to-cite/extract-date/date-validators/index.html","docs/functions/extractor/html-to-cite/extract-date/extract-date-quick/index.html","docs/functions/extractor/html-to-cite/extract-date/index.html","docs/functions/extractor/html-to-cite/extract-source/index.html","docs/functions/extractor/html-to-cite/extract-title/index.html","docs/functions/extractor/html-to-cite/human-names-recognize/index.html","docs/functions/extractor/html-to-cite/metadata-to-cite/index.html","docs/functions/extractor/html-to-cite/url-to-domain/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-mercury/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-readability/index.html","docs/functions/extractor/html-to-content/html-to-basic-html/index.html","docs/functions/extractor/html-to-content/html-utils/index.html","docs/functions/extractor/html-to-content/index.html","docs/functions/extractor/pdf-to-html/index.html","docs/functions/extractor/pdf-to-html/models/Annotation/index.html","docs/functions/extractor/pdf-to-html/models/BlockType/index.html","docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default/index.html","docs/functions/extractor/pdf-to-html/models/HeadlineFinder/index.html","docs/functions/extractor/pdf-to-html/models/LineConverter/index.html","docs/functions/extractor/pdf-to-html/models/LineItem/index.html","docs/functions/extractor/pdf-to-html/models/LineItemBlock/index.html","docs/functions/extractor/pdf-to-html/models/Page/index.html","docs/functions/extractor/pdf-to-html/models/PageItem/index.html","docs/functions/extractor/pdf-to-html/models/ParseResult/index.html","docs/functions/extractor/pdf-to-html/models/ParsedElements/index.html","docs/functions/extractor/pdf-to-html/models/StashingStream/index.html","docs/functions/extractor/pdf-to-html/models/TextItem/index.html","docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper/index.html","docs/functions/extractor/pdf-to-html/models/Word/index.html","docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats/index.html","docs/functions/extractor/pdf-to-html/transformations/ToHTML/index.html","docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks/index.html","docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/Transformation/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks/index.html","docs/functions/extractor/pdf-to-html/util/is-url-pdf/index.html","docs/functions/extractor/pdf-to-html/util/page-item-functions/index.html","docs/functions/extractor/pdf-to-html/util/page-number-functions/index.html","docs/functions/extractor/pdf-to-html/util/string-functions/index.html","docs/functions/extractor/url-to-content/docx-to-content/index.html","docs/functions/extractor/url-to-content/index.html","docs/functions/extractor/url-to-content/url-to-html/index.html","docs/functions/extractor/url-to-content/youtube-to-text/index.html","docs/functions/index-1/index.html","docs/functions/index.html","docs/functions/interface/highlight-code/index.html","docs/functions/interface/youtube-embed/index.html","docs/functions/match/compare-letters/index.html","docs/functions/match/match-quasar/index.html","docs/functions/match/weigh-relevance-frequency/index.html","docs/functions/modules/index.html","docs/functions/search/search-engines/index.html","docs/functions/search/search-stream/index.html","docs/functions/search/search-web/index.html","docs/functions/search/search-wikipedia/index.html","docs/functions/similarity/similarity-remote-api/index.html","docs/functions/tokenize/stopwords/index.html","docs/functions/tokenize/suggest-complete-word/index.html","docs/functions/tokenize/text-to-chunks/index.html","docs/functions/tokenize/text-to-sentences/index.html","docs/functions/tokenize/text-to-topic-tokens/index.html","docs/functions/tokenize/word-to-root-stem/index.html","docs/functions/topics/ngrams/index.html","docs/functions/topics/rank-sentences-keyphrases/index.html","docs/functions/topics/seektopic-keyphrases/index.html","docs/functions/topics/topic-distribution/index.html","docs/functions/types/index.html","docs/index.html","docs/lunr-index-1751483004804.json","docs/lunr-index.json","docs/neural-net/index-1/index.html","docs/neural-net/index.html","docs/neural-net/modules/index.html","docs/neural-net/statistics/predict-statistics/index.html","docs/neural-net/train/neural-net-gpu/index.html","docs/neural-net/train/neural-net-tf/index.html","docs/neural-net/train/predict-next-word/index.html","docs/neural-net/vectorize/similarity-remote-api/index.html","docs/neural-net/vectorize/similarity-vector/index.html","docs/neural-net/vectorize/usearch/index.html","docs/search-doc-1751483004804.json","docs/search-doc.json","docs/sitemap.xml","docs/web/components/AppLayout/auth-google-one-tap/index.html","docs/web/components/AppLayout/sound-effects/index.html","docs/web/components/Editor/docx/docx-to-html/index.html","docs/web/components/Editor/docx/docx-tokens/index.html","docs/web/components/Editor/docx/parse-cards/index.html","docs/web/components/Editor/docx/parse-debate-docx/index.html","docs/web/components/Editor/docx/parse-zip-folder/index.html","docs/web/components/Editor/storage/files-api-frontend/index.html","docs/web/components/Editor/storage/local-storage-api/index.html","docs/web/components/Editor/storage/seed-test-data/index.html","docs/web/components/ReadMode/auto-highlight/index.html","docs/web/components/ReadMode/read-mode-view/index.html","docs/web/components/SearchWeb/categories/index.html","docs/web/components/SearchWeb/extras/QuantumSphere/index.html","docs/web/components/SearchWeb/extras/get-weather/index.html","docs/web/components/SearchWeb/extras/home-extras/index.html","docs/web/components/ShortcutSearch/shortcut-search/index.html","docs/web/components/ShortcutSearch/shortcut-search-web/index.html","docs/web/components/TabManager/find-in-tab-content/index.html","docs/web/components/icons/index.html","docs/web/components/icons-1/index.html","docs/web/components/utils/auth-client/index.html","docs/web/components/utils/index.html","docs/web/components/utils-1/index.html","docs/web/customize-site/index.html","docs/web/index.html","docs/web/modules/index.html","docs/web/server/auth/index.html","docs/web/server/drizzle.config/index.html","docs/web/server/email/index.html","docs/web/server/index.html","docs/web/server/ratelimits/index.html","docs/web/server/schema/index.html","docs/web/server/types/index.html","docs/web/server/users/index.html","docs/web/server/validations/index.html","docs/web/server-1/index.html","favicon.ico","icons/android-chrome-192x192.png","icons/android-chrome-512x512.png","icons/app-icon.svg","icons/apple-touch-icon.png","icons/qwksearch-icon.svg","icons/qwksearch-logo.svg","robots.txt","site.webmanifest"]),
	mimeTypes: {".html":"text/html",".css":"text/css",".js":"text/javascript",".txt":"text/plain",".json":"application/json",".xml":"text/xml",".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.CBk_lXSG.js",app:"_app/immutable/entry/app.DcJ7q1mt.js",imports:["_app/immutable/entry/start.CBk_lXSG.js","_app/immutable/chunks/CMEZjDYo.js","_app/immutable/chunks/BmZ6IxWc.js","_app/immutable/chunks/Ddr_2JoP.js","_app/immutable/chunks/Dr58ymYW.js","_app/immutable/chunks/DrUFOHDr.js","_app/immutable/chunks/BehutCOJ.js","_app/immutable/chunks/CDsTjZlI.js","_app/immutable/entry/app.DcJ7q1mt.js","_app/immutable/chunks/Ddr_2JoP.js","_app/immutable/chunks/Dr58ymYW.js","_app/immutable/chunks/DrUFOHDr.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BmZ6IxWc.js","_app/immutable/chunks/BehutCOJ.js","_app/immutable/chunks/Br3YUONq.js","_app/immutable/chunks/CDsTjZlI.js","_app/immutable/chunks/BBvRGfPY.js","_app/immutable/chunks/BffV4JBp.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
