"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["9596"],{99195:function(e,s,t){t.r(s),t.d(s,{default:()=>h,frontMatter:()=>i,metadata:()=>n,assets:()=>l,toc:()=>d,contentTitle:()=>c});var n=JSON.parse('{"id":"functions/tokenize/suggest-complete-word","title":"suggest-complete-word","description":"ai-research-agent / tokenize/suggest-complete-word","source":"@site/docs/functions/tokenize/suggest-complete-word.md","sourceDirName":"functions/tokenize","slug":"/functions/tokenize/suggest-complete-word","permalink":"/docs/functions/tokenize/suggest-complete-word","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"stopwords","permalink":"/docs/functions/tokenize/stopwords"},"next":{"title":"text-to-chunks","permalink":"/docs/functions/tokenize/text-to-chunks"}}'),r=t("85893"),o=t("50065");let i={},c=void 0,l={},d=[{value:"Topics",id:"topics",level:2},{value:"suggestNextWordCompletions()",id:"suggestnextwordcompletions",level:3},{value:"Autocomplete Topic Phrase Completions",id:"autocomplete-topic-phrase-completions",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Examples",id:"examples",level:4},{value:"Author",id:"author",level:4}];function a(e){let s={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/docs/functions/",children:"ai-research-agent"})," / tokenize/suggest-complete-word"]}),"\n",(0,r.jsx)(s.h2,{id:"topics",children:"Topics"}),"\n",(0,r.jsx)(s.h3,{id:"suggestnextwordcompletions",children:"suggestNextWordCompletions()"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"function suggestNextWordCompletions(query, options?): Promise<Object[]>\n"})}),"\n",(0,r.jsx)(s.h3,{id:"autocomplete-topic-phrase-completions",children:"Autocomplete Topic Phrase Completions"}),"\n",(0,r.jsx)("img",{width:"350px",src:"https://i.imgur.com/0k5mO76.png"}),"\n",(0,r.jsx)(s.p,{children:"Completes the query with the most likely next words for phrases.\nIf typing 2+ letters of a word, returns all possible words matching those few letters."}),"\n",(0,r.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Parameter"}),(0,r.jsx)("th",{children:"Type"}),(0,r.jsx)("th",{children:"Description"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"query"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"string"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"The input query which can be pertial words or phrases."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"options"}),"?"]})}),(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:["{ ",(0,r.jsx)(s.code,{children:"limitMaxResults"}),": ",(0,r.jsx)(s.code,{children:"number"}),"; ",(0,r.jsx)(s.code,{children:"numberOfLastWordsToCheck"}),": ",(0,r.jsx)(s.code,{children:"number"}),"; ",(0,r.jsx)(s.code,{children:"phrasesModel"}),": ",(0,r.jsx)(s.code,{children:"Object"}),"; }"]})}),(0,r.jsx)("td",{})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"options.limitMaxResults"}),"?"]})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"number"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"default=10 - The maximum number of autocomplete suggestions to return."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"options.numberOfLastWordsToCheck"}),"?"]})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"number"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"default=5 - The number of last words in the query to check for phrase completions."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"options.phrasesModel"}),"?"]})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"Object"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"A custom phrases model to use for autocomplete suggestions."})})]})]})]}),"\n",(0,r.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.code,{children:"Object"}),"[]>"]}),"\n",(0,r.jsx)(s.p,{children:"An array of autocomplete suggestions, each containing either a 'phrase' or 'word' property."}),"\n",(0,r.jsx)(s.h4,{id:"examples",children:"Examples"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:'// Basic usage\nconst suggestions = await suggestNextWordCompletions("self att");\n// Possible output: [{ phrase: "self attention" }, { phrase: "self attract" }, { phrase: "self attack" }]\n'})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:'// Using options\nconst customModel = await import("./custom-phrases-model.json");\nconst suggestions = await suggestNextWordCompletions("artificial int", {\n  phrasesModel: customModel,\n  limitMaxResults: 5,\n  numberOfLastWordsToCheck: 3\n});\n// Possible output: [{ phrase: "artificial intelligence" }, { phrase: "artificial interpretation" }]\n'})}),"\n",(0,r.jsx)(s.h4,{id:"author",children:"Author"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://airesearch.js.org",children:"ai-research-agent (2024)"})})]})}function h(e={}){let{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},50065:function(e,s,t){t.d(s,{Z:function(){return c},a:function(){return i}});var n=t(67294);let r={},o=n.createContext(r);function i(e){let s=n.useContext(o);return n.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);