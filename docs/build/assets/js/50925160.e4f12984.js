"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["2548"],{28045:function(e,t,r){r.r(t),r.d(t,{default:()=>h,frontMatter:()=>s,metadata:()=>n,assets:()=>a,toc:()=>o,contentTitle:()=>d});var n=JSON.parse('{"id":"functions/extractor/html-to-cite/extract-cite","title":"extract-cite","description":"ai-research-agent / extractor/html-to-cite/extract-cite","source":"@site/docs/functions/extractor/html-to-cite/extract-cite.md","sourceDirName":"functions/extractor/html-to-cite","slug":"/functions/extractor/html-to-cite/extract-cite","permalink":"/functions/extractor/html-to-cite/extract-cite","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"extract-author","permalink":"/functions/extractor/html-to-cite/extract-author"},"next":{"title":"extract-date","permalink":"/functions/extractor/html-to-cite/extract-date/"}}'),c=r("85893"),i=r("50065");let s={},d=void 0,a={},o=[{value:"Extract",id:"extract",level:2},{value:"extractCite()",id:"extractcite",level:3},{value:"\uD83D\uDCDA\uD83D\uDC8E Extract Expert Excerpt",id:"-extract-expert-excerpt",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Author",id:"author",level:4}];function l(e){let t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.a,{href:"/functions/",children:"ai-research-agent"})," / extractor/html-to-cite/extract-cite"]}),"\n",(0,c.jsx)(t.h2,{id:"extract",children:"Extract"}),"\n",(0,c.jsx)(t.h3,{id:"extractcite",children:"extractCite()"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-ts",children:"function extractCite(document, options): object\n"})}),"\n",(0,c.jsx)(t.h3,{id:"-extract-expert-excerpt",children:"\uD83D\uDCDA\uD83D\uDC8E Extract Expert Excerpt"}),"\n",(0,c.jsx)("img",{width:"350px",src:"https://i.imgur.com/4GOOM9s.jpeg"}),"\n",(0,c.jsxs)(t.p,{children:["Extract author, date, source, and title from HTML using meta tags\r\nand common class names. Validates human name from author string to check\r\nagainst common list of 90k first names, last names,and organizations to infer\r\nif it should be reversed starting by author last name (accounting for affixes/titles),\r\nsince organizations are not reversed.\r\n",(0,c.jsx)(t.a,{href:"https://github.com/scrapinghub/article-extraction-benchmark?tab=readme-ov-file#results",children:"Article Extraction Benchmark"})]}),"\n",(0,c.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,c.jsxs)("table",{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Parameter"}),(0,c.jsx)("th",{children:"Type"}),(0,c.jsx)("th",{children:"Description"})]})}),(0,c.jsxs)("tbody",{children:[(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:(0,c.jsx)(t.code,{children:"document"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:(0,c.jsx)(t.code,{children:"Document"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:"dom object or html string with article content"})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:(0,c.jsx)(t.code,{children:"options"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:"{}"})}),(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:"\u2010"})})]})]})]}),"\n",(0,c.jsx)(t.h4,{id:"returns",children:"Returns"}),"\n",(0,c.jsx)(t.p,{children:(0,c.jsx)(t.code,{children:"object"})}),"\n",(0,c.jsx)(t.p,{children:"An object containing extracted citation information."}),"\n",(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:"Name"}),(0,c.jsx)(t.th,{children:"Type"})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"author"})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"string"})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"author_cite"})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"string"})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"author_short"})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"string"})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"date"})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"string"})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"source"})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"string"})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"title"})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:"string"})})]})]})]}),"\n",(0,c.jsx)(t.h4,{id:"author",children:"Author"}),"\n",(0,c.jsx)(t.p,{children:(0,c.jsx)(t.a,{href:"https://airesearch.js.org",children:"ai-research-agent (2024)"})})]})}function h(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},50065:function(e,t,r){r.d(t,{Z:function(){return d},a:function(){return s}});var n=r(67294);let c={},i=n.createContext(c);function s(e){let t=n.useContext(i);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:s(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);