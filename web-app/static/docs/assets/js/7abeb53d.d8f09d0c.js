"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["8071"],{96695:function(e,d,r){r.r(d),r.d(d,{default:()=>a,frontMatter:()=>i,metadata:()=>n,assets:()=>c,toc:()=>o,contentTitle:()=>t});var n=JSON.parse('{"id":"functions/editor/rendering/html","title":"html","description":"ai-research-agent / editor/rendering/html","source":"@site/docs/functions/editor/rendering/html.md","sourceDirName":"functions/editor/rendering","slug":"/functions/editor/rendering/html","permalink":"/docs/functions/editor/rendering/html","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"rendering","permalink":"/docs/functions/editor/rendering/"},"next":{"title":"position","permalink":"/docs/functions/editor/rendering/position"}}'),s=r("85893"),l=r("50065");let i={},t=void 0,c={},o=[{value:"Functions",id:"functions",level:2},{value:"cleanText()",id:"cleantext",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"deltaFromDom()",id:"deltafromdom",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"deltaFromHTML()",id:"deltafromhtml",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"docFromDom()",id:"docfromdom",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"docFromHTML()",id:"docfromhtml",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"docToHTML()",id:"doctohtml",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"fromNode()",id:"fromnode",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-6",level:4},{value:"inlineToHTML()",id:"inlinetohtml",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-7",level:4},{value:"isBRPlaceholder()",id:"isbrplaceholder",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Interfaces",id:"interfaces",level:2},{value:"DeltaFromHTMLOptions",id:"deltafromhtmloptions",level:3},{value:"Properties",id:"properties",level:4},{value:"collapseWhitespace?",id:"collapsewhitespace",level:5},{value:"possiblePartial?",id:"possiblepartial",level:5},{value:"FromDomOptions",id:"fromdomoptions",level:3},{value:"Properties",id:"properties-1",level:4},{value:"collapseWhitespace?",id:"collapsewhitespace-1",level:5},{value:"endNode?",id:"endnode",level:5},{value:"includeIds?",id:"includeids",level:5},{value:"offset?",id:"offset",level:5},{value:"possiblePartial?",id:"possiblepartial-1",level:5},{value:"root?",id:"root",level:5},{value:"startNode?",id:"startnode",level:5},{value:"Variables",id:"variables",level:2},{value:"BLOCK_ELEMENTS",id:"block_elements",level:3}];function h(e){let d={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",p:"p",pre:"pre",...(0,l.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.a,{href:"/docs/functions/",children:"ai-research-agent"})," / editor/rendering/html"]}),"\n",(0,s.jsx)(d.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(d.h3,{id:"cleantext",children:"cleanText()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function cleanText(delta): void\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"delta"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/delta/#default",children:(0,s.jsx)(d.code,{children:"default"})})})})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"void"})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"deltafromdom",children:"deltaFromDom()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function deltaFromDom(editor, options): default\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Default value"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"undefined"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"options"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/rendering/html#fromdomoptions",children:(0,s.jsx)(d.code,{children:"FromDomOptions"})})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"defaultOptions"})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/delta/#default",children:(0,s.jsx)(d.code,{children:"default"})})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"deltafromhtml",children:"deltaFromHTML()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function deltaFromHTML(\n   editor, \n   html, \n   options?): default\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"html"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"string"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/rendering/html#deltafromhtmloptions",children:(0,s.jsx)(d.code,{children:"DeltaFromHTMLOptions"})})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/delta/#default",children:(0,s.jsx)(d.code,{children:"default"})})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"docfromdom",children:"docFromDom()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function docFromDom(editor, root): default\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"root"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"HTMLElement"})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/document/TextDocument#default",children:(0,s.jsx)(d.code,{children:"default"})})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"docfromhtml",children:"docFromHTML()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function docFromHTML(\n   editor, \n   html, \n   selection?): default\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"html"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"string"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"selection"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"null"})," | ",(0,s.jsx)(d.a,{href:"/docs/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(d.code,{children:"EditorRange"})})]})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/document/TextDocument#default",children:(0,s.jsx)(d.code,{children:"default"})})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"doctohtml",children:"docToHTML()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function docToHTML(editor, doc): string\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"doc"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/document/TextDocument#default",children:(0,s.jsx)(d.code,{children:"default"})})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"string"})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"fromnode",children:"fromNode()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function fromNode(editor, dom): undefined | default | default[]\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"dom"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"HTMLElement"})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-6",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"undefined"})," | ",(0,s.jsx)(d.a,{href:"/docs/functions/editor/document/Line/#default",children:(0,s.jsx)(d.code,{children:"default"})})," | ",(0,s.jsx)(d.a,{href:"/docs/functions/editor/document/Line/#default",children:(0,s.jsx)(d.code,{children:"default"})}),"[]"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"inlinetohtml",children:"inlineToHTML()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function inlineToHTML(editor, delta): string\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-7",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"delta"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/delta/#default",children:(0,s.jsx)(d.code,{children:"default"})})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-7",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"string"})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"isbrplaceholder",children:"isBRPlaceholder()"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"function isBRPlaceholder(editor, node): boolean\n"})}),"\n",(0,s.jsx)(d.h4,{id:"parameters-8",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"editor"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,s.jsx)(d.code,{children:"Editor"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"node"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"Node"})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-8",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"boolean"})}),"\n",(0,s.jsx)(d.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,s.jsx)(d.h3,{id:"deltafromhtmloptions",children:"DeltaFromHTMLOptions"}),"\n",(0,s.jsx)(d.h4,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(d.h5,{id:"collapsewhitespace",children:"collapseWhitespace?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional collapseWhitespace: boolean;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"possiblepartial",children:"possiblePartial?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional possiblePartial: boolean;\n"})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"fromdomoptions",children:"FromDomOptions"}),"\n",(0,s.jsx)(d.h4,{id:"properties-1",children:"Properties"}),"\n",(0,s.jsx)(d.h5,{id:"collapsewhitespace-1",children:"collapseWhitespace?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional collapseWhitespace: boolean;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"endnode",children:"endNode?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional endNode: Node;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"includeids",children:"includeIds?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional includeIds: boolean;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"offset",children:"offset?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional offset: number;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"possiblepartial-1",children:"possiblePartial?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional possiblePartial: boolean;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"root",children:"root?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional root: HTMLElement;\n"})}),"\n",(0,s.jsx)(d.h5,{id:"startnode",children:"startNode?"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"optional startNode: Node;\n"})}),"\n",(0,s.jsx)(d.h2,{id:"variables",children:"Variables"}),"\n",(0,s.jsx)(d.h3,{id:"block_elements",children:"BLOCK_ELEMENTS"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-ts",children:"const BLOCK_ELEMENTS: \"address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video\" = 'address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video';\n"})})]})}function a(e={}){let{wrapper:d}={...(0,l.a)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},50065:function(e,d,r){r.d(d,{Z:function(){return t},a:function(){return i}});var n=r(67294);let s={},l=n.createContext(s);function i(e){let d=n.useContext(l);return n.useMemo(function(){return"function"==typeof e?e(d):{...d,...e}},[d,e])}function t(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),n.createElement(l.Provider,{value:d},e.children)}}}]);