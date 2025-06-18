export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["docs/404.html","docs/api/extract-structured-content-and-cite-from-any-url/index.html","docs/api/generate-language-model-reply-using-agent-prompts/index.html","docs/api/qwksearch-api/index.html","docs/api/search-the-web/index.html","docs/assets/css/styles.8928bdc3.css","docs/assets/js/01d0be22.c26a70fe.js","docs/assets/js/07322d09.5589764f.js","docs/assets/js/08e28c86.f8247b37.js","docs/assets/js/098d45be.49baefb8.js","docs/assets/js/0a3b63b9.a6e2c84e.js","docs/assets/js/0af59906.970c12ab.js","docs/assets/js/0b350f0e.401ac7ac.js","docs/assets/js/0cc67d54.3498e862.js","docs/assets/js/0d96fccf.93f0cd13.js","docs/assets/js/0e95afa9.d20f3d51.js","docs/assets/js/0f6bfc5a.3164d3c1.js","docs/assets/js/10e04e3c.fdfaa501.js","docs/assets/js/11b43341.05dad28b.js","docs/assets/js/12cfe49f.9e539a10.js","docs/assets/js/14eb3368.35792888.js","docs/assets/js/1848dae9.75f3cfed.js","docs/assets/js/18ad0631.515850f9.js","docs/assets/js/1962f312.00cb5a94.js","docs/assets/js/1a228189.d931a552.js","docs/assets/js/1a347b40.579d2908.js","docs/assets/js/1aa42145.2846b96c.js","docs/assets/js/1be725c2.9e3761cd.js","docs/assets/js/1ce0ccbf.ae18da5b.js","docs/assets/js/1fe0b7ec.75586d50.js","docs/assets/js/214ce2de.92843a77.js","docs/assets/js/2187a730.f5dc8b9d.js","docs/assets/js/23102b89.e247c01a.js","docs/assets/js/2316d016.35433061.js","docs/assets/js/232609e1.70cecde7.js","docs/assets/js/2497bb1a.e82ddd63.js","docs/assets/js/25a0aacf.152ef132.js","docs/assets/js/2668b968.6f0a1888.js","docs/assets/js/26dcf5a2.d641d2f0.js","docs/assets/js/279020ee.6414bf7c.js","docs/assets/js/28f1fd30.37614d84.js","docs/assets/js/2a406c7c.37cfe88d.js","docs/assets/js/2d5633f2.141ba833.js","docs/assets/js/2d90a388.122056a1.js","docs/assets/js/2dc04199.7aa766da.js","docs/assets/js/2eddcf6e.20884011.js","docs/assets/js/318e962f.3b90a7a2.js","docs/assets/js/31d13c8d.d86119c4.js","docs/assets/js/3559235c.2a3e66f7.js","docs/assets/js/38858058.6bbe942f.js","docs/assets/js/38c1fac1.bbdf2d4b.js","docs/assets/js/3bc530fd.65a3b5c9.js","docs/assets/js/3c7d3776.9ff0ac8e.js","docs/assets/js/3cca5465.db900371.js","docs/assets/js/3e474ac3.9ee9b8b1.js","docs/assets/js/3ffbf337.d506b3e3.js","docs/assets/js/406b1258.013f1754.js","docs/assets/js/4164.b4822068.js","docs/assets/js/420399b4.b3d4c2c9.js","docs/assets/js/42057e05.28941f7a.js","docs/assets/js/4214.2547c554.js","docs/assets/js/431b94e0.d77fbfc6.js","docs/assets/js/43e127a0.6176530a.js","docs/assets/js/441fae0e.30e372ac.js","docs/assets/js/44dfb9fe.bb5dd04c.js","docs/assets/js/4887.62f08d3c.js","docs/assets/js/491c15e7.40ee6a3e.js","docs/assets/js/4a212c46.9252d00d.js","docs/assets/js/4bdb2e21.deae2ccc.js","docs/assets/js/4bea70a9.8763dc76.js","docs/assets/js/4c5e977b.b468a247.js","docs/assets/js/4cc3d7be.90a48ccd.js","docs/assets/js/4e00f9c6.e1035ff9.js","docs/assets/js/4ef5cdb2.6b246259.js","docs/assets/js/5005ecd6.6e122376.js","docs/assets/js/50925160.aee0fe9c.js","docs/assets/js/51724a4e.d4950ef2.js","docs/assets/js/523f2e23.d745e7a6.js","docs/assets/js/538.b251d86e.js","docs/assets/js/53b2771c.e00a586f.js","docs/assets/js/541003df.42326bbd.js","docs/assets/js/5533.6ac3bda4.js","docs/assets/js/5549340a.b54c540d.js","docs/assets/js/56b8e638.c277dc75.js","docs/assets/js/57821675.9af64406.js","docs/assets/js/57ad8db7.f8308c40.js","docs/assets/js/57e1bce9.ffb25e17.js","docs/assets/js/59003f00.88e87b08.js","docs/assets/js/597463cf.013ca213.js","docs/assets/js/59762e3a.25bb9cb9.js","docs/assets/js/59cba71e.52945d61.js","docs/assets/js/5b5a21e8.1f3ca813.js","docs/assets/js/5bb51a2e.9f1cdfaa.js","docs/assets/js/5c8b034f.4cd2858c.js","docs/assets/js/5d047ec1.95ba4774.js","docs/assets/js/5d931713.4ee9723f.js","docs/assets/js/5e95c892.86c457fe.js","docs/assets/js/610604e5.c468f843.js","docs/assets/js/611e64c2.d213929a.js","docs/assets/js/626d98ea.8d0784d6.js","docs/assets/js/62f6042c.7aa7e6a4.js","docs/assets/js/630825eb.7cdc4f07.js","docs/assets/js/64ce1686.ca87e293.js","docs/assets/js/688a9bca.148bc93c.js","docs/assets/js/6b4db537.f08576be.js","docs/assets/js/6d218425.10b62704.js","docs/assets/js/6e447b4f.67116ea7.js","docs/assets/js/6f01f5b4.7df36142.js","docs/assets/js/6f83b525.4c9f5b2f.js","docs/assets/js/711cb517.7280a8c7.js","docs/assets/js/7331dbcc.8b497120.js","docs/assets/js/7376fdb9.f2c9751f.js","docs/assets/js/753a09ff.f49bc97e.js","docs/assets/js/757d2bb7.8c4178ea.js","docs/assets/js/75d51d36.a0346d54.js","docs/assets/js/78990076.90fd4c14.js","docs/assets/js/7a701758.79f88915.js","docs/assets/js/7abeb53d.c5b08dc4.js","docs/assets/js/7b9816c5.8a8fdb9d.js","docs/assets/js/7e128f78.38db6f68.js","docs/assets/js/7ecbbecf.9449e68e.js","docs/assets/js/8079.921a37aa.js","docs/assets/js/81829e2c.c5a5d757.js","docs/assets/js/82510bc3.86c26a95.js","docs/assets/js/842b4ef4.14296416.js","docs/assets/js/84e7198d.5c455c4c.js","docs/assets/js/85b21678.bb9c71cb.js","docs/assets/js/85bdbc49.ae283ff9.js","docs/assets/js/86627951.dcadaf58.js","docs/assets/js/87f1aef9.7623b465.js","docs/assets/js/8931d603.92b2c1a1.js","docs/assets/js/8c991af3.6ac700b0.js","docs/assets/js/8d9fd2d1.91933af6.js","docs/assets/js/8f152809.4e99847e.js","docs/assets/js/8f1ce257.1d278d37.js","docs/assets/js/91370678.ee6a63e7.js","docs/assets/js/916.9f9611e7.js","docs/assets/js/9250.af3344f6.js","docs/assets/js/927e233d.5dbc0619.js","docs/assets/js/92f98195.6a33f376.js","docs/assets/js/938b7d08.d11728b9.js","docs/assets/js/941b5216.ac86d777.js","docs/assets/js/9571dace.e2c62c87.js","docs/assets/js/95aac624.7a755c11.js","docs/assets/js/994a1057.e22a737f.js","docs/assets/js/9956fd1b.56894f8c.js","docs/assets/js/9961f80c.4630e664.js","docs/assets/js/99c2c13a.b1e19e8f.js","docs/assets/js/99fd9caf.f525f1cc.js","docs/assets/js/9b690dfd.b57bb9e0.js","docs/assets/js/9dc027fd.892610dc.js","docs/assets/js/9df57d69.11bf1b6e.js","docs/assets/js/9e0652bf.62f8886b.js","docs/assets/js/9efbe58c.d080a1d9.js","docs/assets/js/9f72d160.c477b4e8.js","docs/assets/js/9f8f4960.d6d6de4f.js","docs/assets/js/a04b1d2f.e491bc54.js","docs/assets/js/a071638e.0264699a.js","docs/assets/js/a1113d6c.4ae0d733.js","docs/assets/js/a2770710.6a8d734d.js","docs/assets/js/a33c9fe2.246fcf5c.js","docs/assets/js/a34dfdc5.02f8d73c.js","docs/assets/js/a568ff5e.2a95af16.js","docs/assets/js/a61bf345.c21a59fc.js","docs/assets/js/a6ce99c2.f9ea911e.js","docs/assets/js/a7a0f79b.ca85985f.js","docs/assets/js/a7a2a71b.34cdb106.js","docs/assets/js/a7bd4aaa.48e87692.js","docs/assets/js/a94703ab.00c499d0.js","docs/assets/js/a96c9e36.a393e712.js","docs/assets/js/aba21aa0.491cbc28.js","docs/assets/js/abe75dcf.d504a875.js","docs/assets/js/ae91514c.3ae82ee3.js","docs/assets/js/afb8c1b5.5bd37413.js","docs/assets/js/afd263b8.c0e162f2.js","docs/assets/js/b00981d7.8f2f8896.js","docs/assets/js/b0a51db4.2ce59f0a.js","docs/assets/js/b13a5ad2.77724d73.js","docs/assets/js/b199be7a.474c266b.js","docs/assets/js/b21d9602.357acca9.js","docs/assets/js/b44f755e.b4bc7a6e.js","docs/assets/js/b75bb75c.20bee5c4.js","docs/assets/js/b7e8845d.c6aaa066.js","docs/assets/js/b8445fb9.69a12a07.js","docs/assets/js/b89c74df.311fdc2f.js","docs/assets/js/b9bcc8b0.680d03b3.js","docs/assets/js/bc3a1c2c.6d55abc8.js","docs/assets/js/bdb1ab93.adfca23e.js","docs/assets/js/becc4ba4.23011d71.js","docs/assets/js/bfc14cb6.89b56235.js","docs/assets/js/c377a04b.d80fa376.js","docs/assets/js/c45c3e98.ee044fb9.js","docs/assets/js/c46bba01.46be2755.js","docs/assets/js/c4fa391a.6d0604e2.js","docs/assets/js/c6469aab.8cf36db5.js","docs/assets/js/c7f3c6ae.a7aa12dd.js","docs/assets/js/c80d469f.84ee5ccc.js","docs/assets/js/c8ca2c96.b189b2e6.js","docs/assets/js/c9fe5ec1.e249892a.js","docs/assets/js/cb11fb17.3d055406.js","docs/assets/js/cbdea3f7.e0e393ce.js","docs/assets/js/ccbe5c26.b353e27a.js","docs/assets/js/cd50fb95.00d0eedf.js","docs/assets/js/ce74d961.da965cad.js","docs/assets/js/ceaeed53.970240f0.js","docs/assets/js/cefb9952.6bf8b045.js","docs/assets/js/d067f224.8121beaa.js","docs/assets/js/d185d7c1.053012b2.js","docs/assets/js/d3a72793.2796e264.js","docs/assets/js/d52d7866.a9587d57.js","docs/assets/js/d5b73015.f24c8b0b.js","docs/assets/js/d66ea5dd.c4888fef.js","docs/assets/js/d80b86ee.95f16e12.js","docs/assets/js/d9a7ddfb.b74bd6e7.js","docs/assets/js/db4afdb3.c5a5af43.js","docs/assets/js/dcdda8a6.eaa087fe.js","docs/assets/js/ddb75841.85d0433b.js","docs/assets/js/e028f253.0beff90f.js","docs/assets/js/e044d482.1db90bbe.js","docs/assets/js/e24330e2.92b44606.js","docs/assets/js/e2c04128.c9ffa4c5.js","docs/assets/js/ea32b026.b41c46fa.js","docs/assets/js/ea32d2db.78170986.js","docs/assets/js/eaac601f.a247b4c8.js","docs/assets/js/ed5d1259.bc192014.js","docs/assets/js/ee51409d.17c52898.js","docs/assets/js/efc41123.5ce2ae72.js","docs/assets/js/f0b30f41.1d51c708.js","docs/assets/js/f2e21876.4f248cd5.js","docs/assets/js/f30e4630.da7a3ef4.js","docs/assets/js/f317f904.de8306e9.js","docs/assets/js/f4053bed.15ce7a63.js","docs/assets/js/f410822e.790dc19c.js","docs/assets/js/f44205b7.9e025f89.js","docs/assets/js/f567d32e.8b803e2c.js","docs/assets/js/f6977e43.e0ee8b52.js","docs/assets/js/f6b1f387.873d7d0d.js","docs/assets/js/f8f4b226.ad6899f8.js","docs/assets/js/f960bfac.5282b009.js","docs/assets/js/fb3ed33b.ae6e5b96.js","docs/assets/js/fb790c40.46938902.js","docs/assets/js/fc50e0c5.f682c90a.js","docs/assets/js/ff7d8336.5b6af725.js","docs/assets/js/main.6ba2a19a.js","docs/assets/js/runtime~main.a9cd53b1.js","docs/category/qwksearch-api/index.html","docs/functions/agents/agent-prompts/index.html","docs/functions/agents/api2ai/index.html","docs/functions/agents/language-model-names/index.html","docs/functions/agents/generate-language/index.html","docs/functions/agents/tool/index.html","docs/functions/crawler/index.html","docs/functions/datasets/compile-topic-model/index.html","docs/functions/datasets/compress-json-jz64/index.html","docs/functions/datasets/dictionary-import/index.html","docs/functions/datasets/human-names-import/index.html","docs/functions/datasets/metadata-stats/index.html","docs/functions/datasets/misspelled-typos-import/index.html","docs/functions/datasets/quora-import/index.html","docs/functions/datasets/term-frequency-import/index.html","docs/functions/datasets/wikipage-titles-import/index.html","docs/functions/editor/Source/index.html","docs/functions/editor/asRoot/index.html","docs/functions/editor/delta/AttributeMap/index.html","docs/functions/editor/delta/Op/index.html","docs/functions/editor/delta/fast-diff/index.html","docs/functions/editor/delta/index.html","docs/functions/editor/delta/util/cloneDeep/index.html","docs/functions/editor/delta/util/isEqual/index.html","docs/functions/editor/delta-1/index.html","docs/functions/editor/document/EditorRange/index.html","docs/functions/editor/document/Line/index.html","docs/functions/editor/document/LineOp/index.html","docs/functions/editor/document/TextChange/index.html","docs/functions/editor/document/TextDocument/index.html","docs/functions/editor/document/deltaToText/index.html","docs/functions/editor/document/index.html","docs/functions/editor/document-1/index.html","docs/functions/editor/index.html","docs/functions/editor/modules/copy/index.html","docs/functions/editor/modules/decorations/index.html","docs/functions/editor/modules/defaults/index.html","docs/functions/editor/modules/history/index.html","docs/functions/editor/modules/index.html","docs/functions/editor/modules/input-2/index.html","docs/functions/editor/modules/keyboard-2/index.html","docs/functions/editor/modules/paste-2/index.html","docs/functions/editor/modules/placeholder/index.html","docs/functions/editor/modules/rendering-2/index.html","docs/functions/editor/modules/scheduled-signal/index.html","docs/functions/editor/modules/selection-2/index.html","docs/functions/editor/modules/shortcutFromEvent/index.html","docs/functions/editor/modules/smartEntry/index.html","docs/functions/editor/modules/smartQuotes/index.html","docs/functions/editor/modules/tables/index.html","docs/functions/editor/modules/virtualRendering/index.html","docs/functions/editor/modules-1/index.html","docs/functions/editor/namespaces/AttributeMap/index.html","docs/functions/editor/namespaces/Line/index.html","docs/functions/editor/namespaces/LineOp/index.html","docs/functions/editor/namespaces/Op/index.html","docs/functions/editor/popper/index.html","docs/functions/editor/rendering/html/index.html","docs/functions/editor/rendering/index.html","docs/functions/editor/rendering/position/index.html","docs/functions/editor/rendering/selection/index.html","docs/functions/editor/rendering/vdom/index.html","docs/functions/editor/rendering/walker/index.html","docs/functions/editor/stores/index.html","docs/functions/editor/typesetting/defaults/index.html","docs/functions/editor/typesetting/embeds/index.html","docs/functions/editor/typesetting/formats/index.html","docs/functions/editor/typesetting/index.html","docs/functions/editor/typesetting/lines/index.html","docs/functions/editor/typesetting/typeset/index.html","docs/functions/editor/typesetting-1/index.html","docs/functions/editor/util/EventDispatcher/index.html","docs/functions/extractor/html-to-cite/extract-author/index.html","docs/functions/extractor/html-to-cite/extract-cite/index.html","docs/functions/extractor/html-to-cite/extract-date/date-extractors/index.html","docs/functions/extractor/html-to-cite/extract-date/date-validators/index.html","docs/functions/extractor/html-to-cite/extract-date/extract-date-quick/index.html","docs/functions/extractor/html-to-cite/extract-date/index.html","docs/functions/extractor/html-to-cite/extract-source/index.html","docs/functions/extractor/html-to-cite/extract-title/index.html","docs/functions/extractor/html-to-cite/human-names-recognize/index.html","docs/functions/extractor/html-to-cite/metadata-to-cite/index.html","docs/functions/extractor/html-to-cite/url-to-domain/index.html","docs/functions/extractor/html-to-cite/url-to-favicon/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-mercury/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils/index.html","docs/functions/extractor/html-to-content/extract-content/extract-content-readability/index.html","docs/functions/extractor/html-to-content/html-to-basic-html/index.html","docs/functions/extractor/html-to-content/html-utils/index.html","docs/functions/extractor/html-to-content/index.html","docs/functions/extractor/pdf-to-html/index.html","docs/functions/extractor/pdf-to-html/models/Annotation/index.html","docs/functions/extractor/pdf-to-html/models/BlockType/index.html","docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default/index.html","docs/functions/extractor/pdf-to-html/models/HeadlineFinder/index.html","docs/functions/extractor/pdf-to-html/models/LineConverter/index.html","docs/functions/extractor/pdf-to-html/models/LineItem/index.html","docs/functions/extractor/pdf-to-html/models/LineItemBlock/index.html","docs/functions/extractor/pdf-to-html/models/Metadata/index.html","docs/functions/extractor/pdf-to-html/models/Page/index.html","docs/functions/extractor/pdf-to-html/models/PageItem/index.html","docs/functions/extractor/pdf-to-html/models/ParseResult/index.html","docs/functions/extractor/pdf-to-html/models/ParsedElements/index.html","docs/functions/extractor/pdf-to-html/models/StashingStream/index.html","docs/functions/extractor/pdf-to-html/models/TextItem/index.html","docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper/index.html","docs/functions/extractor/pdf-to-html/models/Word/index.html","docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats/index.html","docs/functions/extractor/pdf-to-html/transformations/ToHTML/index.html","docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks/index.html","docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation/index.html","docs/functions/extractor/pdf-to-html/transformations/Transformation/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels/index.html","docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks/index.html","docs/functions/extractor/pdf-to-html/util/is-url-pdf/index.html","docs/functions/extractor/pdf-to-html/util/page-item-functions/index.html","docs/functions/extractor/pdf-to-html/util/page-number-functions/index.html","docs/functions/extractor/pdf-to-html/util/string-functions/index.html","docs/functions/extractor/url-to-content/docx-to-content/index.html","docs/functions/extractor/url-to-content/index.html","docs/functions/extractor/url-to-content/url-to-html/index.html","docs/functions/extractor/url-to-content/youtube-to-text/index.html","docs/functions/index.html","docs/functions/interface/highlight-code/index.html","docs/functions/interface/ip-to-lang/index.html","docs/functions/interface/youtube-embed/index.html","docs/functions/match/compare-letters/index.html","docs/functions/match/match-quasar/index.html","docs/functions/match/weigh-relevance-frequency/index.html","docs/functions/modules/index.html","docs/functions/search/search-engines/index.html","docs/functions/search/search-stream/index.html","docs/functions/search/search-web/index.html","docs/functions/search/search-wikipedia/index.html","docs/functions/similarity/embeddings-to-graph/index.html","docs/functions/similarity/similarity-remote-api/index.html","docs/functions/similarity/similarity-vector/index.html","docs/functions/similarity/usearch/index.html","docs/functions/tokenize/stopwords/index.html","docs/functions/tokenize/suggest-complete-word/index.html","docs/functions/tokenize/text-to-chunks/index.html","docs/functions/tokenize/text-to-sentences/index.html","docs/functions/tokenize/text-to-topic-tokens/index.html","docs/functions/tokenize/word-to-root-stem/index.html","docs/functions/topics/ngrams/index.html","docs/functions/topics/rank-sentences-keyphrases/index.html","docs/functions/topics/seektopic-keyphrases/index.html","docs/functions/topics/topic-distribution/index.html","docs/functions/train/neural-net/index.html","docs/functions/types/index.html","docs/index.html","docs/lunr-index-1748221813012.json","docs/lunr-index.json","docs/search-doc-1748221813012.json","docs/search-doc.json","docs/sitemap.xml","docs/web-app/global/index.html","docs/web-app/hooks.server/index.html","docs/web-app/index.html","docs/web-app/lib/components/AppLayout/auth-google-one-tap/index.html","docs/web-app/lib/components/AppLayout/fix/index.html","docs/web-app/lib/components/AppLayout/sound-effects/index.html","docs/web-app/lib/components/AppLayout/theme-presets/index.html","docs/web-app/lib/components/Editor/docx/docx-to-html/index.html","docs/web-app/lib/components/Editor/docx/docx-tokens/index.html","docs/web-app/lib/components/Editor/docx/parse-cards/index.html","docs/web-app/lib/components/Editor/docx/parse-debate-docx/index.html","docs/web-app/lib/components/Editor/docx/parse-zip-folder/index.html","docs/web-app/lib/components/Editor/storage/files-api-frontend/index.html","docs/web-app/lib/components/Editor/storage/local-storage-api/index.html","docs/web-app/lib/components/Editor/storage/seed-test-data/index.html","docs/web-app/lib/components/ReadMode/auto-highlight/index.html","docs/web-app/lib/components/ReadMode/read-mode-view/index.html","docs/web-app/lib/components/SearchWeb/categories/index.html","docs/web-app/lib/components/SearchWeb/extras/get-weather/index.html","docs/web-app/lib/components/SearchWeb/extras/home-extras/index.html","docs/web-app/lib/components/ShortcutSearch/shortcut-search/index.html","docs/web-app/lib/components/ShortcutSearch/shortcut-search-web/index.html","docs/web-app/lib/components/TabManager/find-in-tab-content/index.html","docs/web-app/lib/custom-domain/index.html","docs/web-app/lib/server/auth/index.html","docs/web-app/lib/server/drizzle.config/index.html","docs/web-app/lib/server/email/index.html","docs/web-app/lib/server/index.html","docs/web-app/lib/server/ratelimits/index.html","docs/web-app/lib/server/schema/index.html","docs/web-app/lib/server/types/index.html","docs/web-app/lib/server/users/index.html","docs/web-app/lib/server/validations/index.html","docs/web-app/lib/server-1/index.html","docs/web-app/lib/utils/call-server-api/index.html","docs/web-app/lib/utils/index.html","docs/web-app/lib/utils-1/index.html","docs/web-app/modules/index.html","docs/web-app/routes/+layout/index.html","docs/web-app/routes/+layout.server/index.html","docs/web-app/routes/api/agents/+server/index.html","docs/web-app/routes/api/chats/+server/index.html","docs/web-app/routes/api/extract/+server/index.html","docs/web-app/routes/api/files/+server/index.html","docs/web-app/routes/api/files/[fileId]/+server/index.html","docs/web-app/routes/api/model/+server/index.html","docs/web-app/routes/api/search/+server/index.html","docs/web-app/routes/api/subscriptions/+server/index.html","docs/web-app/routes/api/user/+server/index.html","docs/web-app/routes/api/vectorize/+server/index.html","docs/web-app/routes/settings/+layout/index.html","docs/web-app/routes/settings/+layout.server/index.html","docs/web-app/routes/settings/+page.server/index.html","docs/web-app/routes/signin/+page.server/index.html","docs/web-app/routes/signout/+page.server/index.html","favicon.ico","icons/android-chrome-192x192.png","icons/android-chrome-512x512.png","icons/app-icon.svg","icons/apple-touch-icon.png","icons/qwksearch-icon.svg","icons/qwksearch-logo.svg","robots.txt","site.webmanifest"]),
	mimeTypes: {".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".xml":"text/xml",".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.Dza8g7_G.js",app:"_app/immutable/entry/app.eLn0lk_a.js",imports:["_app/immutable/entry/start.Dza8g7_G.js","_app/immutable/chunks/D-hZ-b9H.js","_app/immutable/chunks/4UFnoZal.js","_app/immutable/chunks/CUBdm4DZ.js","_app/immutable/chunks/CgHSlQlh.js","_app/immutable/entry/app.eLn0lk_a.js","_app/immutable/chunks/4UFnoZal.js","_app/immutable/chunks/7rocv5X9.js","_app/immutable/chunks/C-XL5VqH.js","_app/immutable/chunks/dBrmgCQ0.js","_app/immutable/chunks/CgHSlQlh.js","_app/immutable/chunks/r20twR4i.js","_app/immutable/chunks/CUBdm4DZ.js","_app/immutable/chunks/DKC6cRGC.js","_app/immutable/chunks/DyzoJx7e.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js'))
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
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/agents/_server.ts.js'))
			},
			{
				id: "/api/chats",
				pattern: /^\/api\/chats\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/chats/_server.ts.js'))
			},
			{
				id: "/api/extract",
				pattern: /^\/api\/extract\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/extract/_server.js'))
			},
			{
				id: "/api/files",
				pattern: /^\/api\/files\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/files/_server.ts.js'))
			},
			{
				id: "/api/files/[fileId]",
				pattern: /^\/api\/files\/([^/]+?)\/?$/,
				params: [{"name":"fileId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/files/_fileId_/_server.ts.js'))
			},
			{
				id: "/api/model",
				pattern: /^\/api\/model\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/model/_server.ts.js'))
			},
			{
				id: "/api/search",
				pattern: /^\/api\/search\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/search/_server.ts.js'))
			},
			{
				id: "/api/subscriptions",
				pattern: /^\/api\/subscriptions\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/subscriptions/_server.ts.js'))
			},
			{
				id: "/api/user",
				pattern: /^\/api\/user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/user/_server.ts.js'))
			},
			{
				id: "/api/vectorize",
				pattern: /^\/api\/vectorize\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/vectorize/_server.js'))
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

export const prerendered = new Map([]);

export const base_path = "";
