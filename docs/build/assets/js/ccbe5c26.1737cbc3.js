"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["1221"],{70378:function(e,n,r){r.r(n),r.d(n,{default:()=>x,frontMatter:()=>t,metadata:()=>d,assets:()=>c,toc:()=>a,contentTitle:()=>i});var d=JSON.parse('{"id":"functions/editor/document/TextDocument","title":"TextDocument","description":"ai-research-agent / editor/document/TextDocument","source":"@site/docs/functions/editor/document/TextDocument.md","sourceDirName":"functions/editor/document","slug":"/functions/editor/document/TextDocument","permalink":"/functions/editor/document/TextDocument","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"TextChange","permalink":"/functions/editor/document/TextChange"},"next":{"title":"deltaToText","permalink":"/functions/editor/document/deltaToText"}}'),s=r("85893"),l=r("50065");let t={},i=void 0,c={},a=[{value:"Classes",id:"classes",level:2},{value:"default",id:"default",level:3},{value:"Accessors",id:"accessors",level:4},{value:"change",id:"change",level:5},{value:"Get Signature",id:"get-signature",level:6},{value:"Returns",id:"returns",level:6},{value:"Constructors",id:"constructors",level:4},{value:"new default()",id:"new-default",level:5},{value:"Parameters",id:"parameters",level:6},{value:"Returns",id:"returns-1",level:6},{value:"Methods",id:"methods",level:4},{value:"apply()",id:"apply",level:5},{value:"Parameters",id:"parameters-1",level:6},{value:"Returns",id:"returns-2",level:6},{value:"equals()",id:"equals",level:5},{value:"Parameters",id:"parameters-2",level:6},{value:"Returns",id:"returns-3",level:6},{value:"getFormats()",id:"getformats",level:5},{value:"Parameters",id:"parameters-3",level:6},{value:"Returns",id:"returns-4",level:6},{value:"getLineAt()",id:"getlineat",level:5},{value:"Parameters",id:"parameters-4",level:6},{value:"Returns",id:"returns-5",level:6},{value:"getLineBy()",id:"getlineby",level:5},{value:"Parameters",id:"parameters-5",level:6},{value:"Returns",id:"returns-6",level:6},{value:"getLineFormat()",id:"getlineformat",level:5},{value:"Parameters",id:"parameters-6",level:6},{value:"Returns",id:"returns-7",level:6},{value:"getLineRange()",id:"getlinerange",level:5},{value:"Parameters",id:"parameters-7",level:6},{value:"Returns",id:"returns-8",level:6},{value:"getLineRanges()",id:"getlineranges",level:5},{value:"Parameters",id:"parameters-8",level:6},{value:"Returns",id:"returns-9",level:6},{value:"getLinesAt()",id:"getlinesat",level:5},{value:"Parameters",id:"parameters-9",level:6},{value:"Returns",id:"returns-10",level:6},{value:"getText()",id:"gettext",level:5},{value:"Parameters",id:"parameters-10",level:6},{value:"Returns",id:"returns-11",level:6},{value:"getTextFormat()",id:"gettextformat",level:5},{value:"Parameters",id:"parameters-11",level:6},{value:"Returns",id:"returns-12",level:6},{value:"replace()",id:"replace",level:5},{value:"Parameters",id:"parameters-12",level:6},{value:"Returns",id:"returns-13",level:6},{value:"slice()",id:"slice",level:5},{value:"Parameters",id:"parameters-13",level:6},{value:"Returns",id:"returns-14",level:6},{value:"toDelta()",id:"todelta",level:5},{value:"Returns",id:"returns-15",level:6},{value:"toJSON()",id:"tojson",level:5},{value:"Returns",id:"returns-16",level:6},{value:"toString()",id:"tostring",level:5},{value:"Returns",id:"returns-17",level:6},{value:"Properties",id:"properties",level:4},{value:"byId",id:"byid",level:5},{value:"length",id:"length",level:5},{value:"lines",id:"lines",level:5},{value:"selection",id:"selection",level:5},{value:"Interfaces",id:"interfaces",level:2},{value:"FormattingOptions",id:"formattingoptions",level:3},{value:"Properties",id:"properties-1",level:4},{value:"allFormats?",id:"allformats",level:5},{value:"nameOnly?",id:"nameonly",level:5}];function h(e){let n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",p:"p",pre:"pre",...(0,l.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/functions/",children:"ai-research-agent"})," / editor/document/TextDocument"]}),"\n",(0,s.jsx)(n.h2,{id:"classes",children:"Classes"}),"\n",(0,s.jsx)(n.h3,{id:"default",children:"default"}),"\n",(0,s.jsx)(n.h4,{id:"accessors",children:"Accessors"}),"\n",(0,s.jsx)(n.h5,{id:"change",children:"change"}),"\n",(0,s.jsx)(n.h6,{id:"get-signature",children:"Get Signature"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"get change(): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextChange#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h4,{id:"constructors",children:"Constructors"}),"\n",(0,s.jsx)(n.h5,{id:"new-default",children:"new default()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"new default(linesOrDocOrDelta?, selection?): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Default value"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"linesOrDocOrDelta"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/functions/editor/delta/#default",children:(0,s.jsx)(n.code,{children:"default"})})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/Line/#default",children:(0,s.jsx)(n.code,{children:"default"})}),"[] | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#default",children:(0,s.jsx)(n.code,{children:"default"})})]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"undefined"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"selection"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"null"})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h4,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(n.h5,{id:"apply",children:"apply()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"apply(\n   change, \n   selection?, \n   throwOnError?): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"change"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/functions/editor/delta/#default",children:(0,s.jsx)(n.code,{children:"default"})})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/TextChange#default",children:(0,s.jsx)(n.code,{children:"default"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"selection"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"throwOnError"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"boolean"})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"equals",children:"equals()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"equals(other, options?): boolean\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"other"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#default",children:(0,s.jsx)(n.code,{children:"default"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:["{ ",(0,s.jsx)(n.code,{children:"contentOnly"}),": ",(0,s.jsx)(n.code,{children:"boolean"}),"; }"]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.contentOnly"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"boolean"})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"boolean"})}),"\n",(0,s.jsx)(n.h5,{id:"getformats",children:"getFormats()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getFormats(at, options?): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"at"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#formattingoptions",children:(0,s.jsx)(n.code,{children:"FormattingOptions"})})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/AttributeMap/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"getlineat",children:"getLineAt()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getLineAt(at): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"at"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})})]})})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/Line/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"getlineby",children:"getLineBy()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getLineBy(id): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"id"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})})]})})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-6",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/Line/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"getlineformat",children:"getLineFormat()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getLineFormat(at, options?): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-6",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"at"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#formattingoptions",children:(0,s.jsx)(n.code,{children:"FormattingOptions"})})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-7",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/AttributeMap/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"getlinerange",children:"getLineRange()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getLineRange(at): EditorRange\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-7",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"at"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"string"})," | ",(0,s.jsx)(n.code,{children:"number"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/Line/#default",children:(0,s.jsx)(n.code,{children:"default"})})]})})]})})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-8",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})}),"\n",(0,s.jsx)(n.h5,{id:"getlineranges",children:"getLineRanges()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getLineRanges(at?): any[]\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-8",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"at"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]})})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-9",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"any"}),"[]"]}),"\n",(0,s.jsx)(n.h5,{id:"getlinesat",children:"getLinesAt()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getLinesAt(atOrRange, encompassed?): default[]\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-9",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"atOrRange"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"encompassed"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"boolean"})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-10",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/functions/editor/document/Line/#default",children:(0,s.jsx)(n.code,{children:"default"})}),"[]"]}),"\n",(0,s.jsx)(n.h5,{id:"gettext",children:"getText()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getText(range?): string\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-10",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"range"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})})})]})})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-11",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})}),"\n",(0,s.jsx)(n.h5,{id:"gettextformat",children:"getTextFormat()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"getTextFormat(at, options?): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-11",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"at"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#formattingoptions",children:(0,s.jsx)(n.code,{children:"FormattingOptions"})})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-12",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/AttributeMap/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"replace",children:"replace()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"replace(delta?, selection?): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-12",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"delta"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/#default",children:(0,s.jsx)(n.code,{children:"default"})})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"selection"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.a,{href:"/functions/editor/document/EditorRange#editorrange",children:(0,s.jsx)(n.code,{children:"EditorRange"})})]})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-13",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/document/TextDocument#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"slice",children:"slice()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"slice(start, end): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"parameters-13",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Default value"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"start"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"0"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"end"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"Infinity"})})})]})]})]}),"\n",(0,s.jsx)(n.h6,{id:"returns-14",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"todelta",children:"toDelta()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"toDelta(): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"returns-15",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"tojson",children:"toJSON()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"toJSON(): default\n"})}),"\n",(0,s.jsx)(n.h6,{id:"returns-16",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/functions/editor/delta/#default",children:(0,s.jsx)(n.code,{children:"default"})})}),"\n",(0,s.jsx)(n.h5,{id:"tostring",children:"toString()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"toString(): string\n"})}),"\n",(0,s.jsx)(n.h6,{id:"returns-17",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})}),"\n",(0,s.jsx)(n.h4,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h5,{id:"byid",children:"byId"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"byId: LineIds;\n"})}),"\n",(0,s.jsx)(n.h5,{id:"length",children:"length"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"length: number;\n"})}),"\n",(0,s.jsx)(n.h5,{id:"lines",children:"lines"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"lines: default[];\n"})}),"\n",(0,s.jsx)(n.h5,{id:"selection",children:"selection"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"selection: null | EditorRange;\n"})}),"\n",(0,s.jsx)(n.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,s.jsx)(n.h3,{id:"formattingoptions",children:"FormattingOptions"}),"\n",(0,s.jsx)(n.h4,{id:"properties-1",children:"Properties"}),"\n",(0,s.jsx)(n.h5,{id:"allformats",children:"allFormats?"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"optional allFormats: boolean;\n"})}),"\n",(0,s.jsx)(n.h5,{id:"nameonly",children:"nameOnly?"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"optional nameOnly: boolean;\n"})})]})}function x(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},50065:function(e,n,r){r.d(n,{Z:function(){return i},a:function(){return t}});var d=r(67294);let s={},l=d.createContext(s);function t(e){let n=d.useContext(l);return d.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),d.createElement(l.Provider,{value:n},e.children)}}}]);