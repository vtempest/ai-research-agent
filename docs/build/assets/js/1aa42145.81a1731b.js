"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["4314"],{28293:function(e,r,d){d.r(r),d.d(r,{default:()=>j,frontMatter:()=>l,metadata:()=>n,assets:()=>h,toc:()=>t,contentTitle:()=>c});var n=JSON.parse('{"id":"functions/editor/rendering/vdom","title":"vdom","description":"ai-research-agent / editor/rendering/vdom","source":"@site/docs/functions/editor/rendering/vdom.md","sourceDirName":"functions/editor/rendering","slug":"/functions/editor/rendering/vdom","permalink":"/functions/editor/rendering/vdom","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"selection","permalink":"/functions/editor/rendering/selection"},"next":{"title":"walker","permalink":"/functions/editor/rendering/walker"}}'),s=d("85893"),i=d("50065");let l={},c=void 0,h={},t=[{value:"Functions",id:"functions",level:2},{value:"h()",id:"h",level:3},{value:"Call Signature",id:"call-signature",level:4},{value:"Type Parameters",id:"type-parameters",level:5},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"Call Signature",id:"call-signature-1",level:4},{value:"Parameters",id:"parameters-1",level:5},{value:"Returns",id:"returns-1",level:5},{value:"patch()",id:"patch",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"recycleNode()",id:"recyclenode",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Interfaces",id:"interfaces",level:2},{value:"H()",id:"h-1",level:3},{value:"Type Parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Props",id:"props",level:3},{value:"Indexable",id:"indexable",level:4},{value:"VNode",id:"vnode",level:3},{value:"Properties",id:"properties",level:4},{value:"children",id:"children",level:5},{value:"key",id:"key",level:5},{value:"props",id:"props-1",level:5},{value:"type",id:"type",level:5},{value:"Type Aliases",id:"type-aliases",level:2},{value:"VChild",id:"vchild",level:3},{value:"Variables",id:"variables",level:2},{value:"options",id:"options",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"React",id:"react",level:3},{value:"Type declaration",id:"type-declaration-1",level:4}];function x(e){let r={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/functions/",children:"ai-research-agent"})," / editor/rendering/vdom"]}),"\n",(0,s.jsx)(r.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(r.h3,{id:"h",children:"h()"}),"\n",(0,s.jsx)(r.h4,{id:"call-signature",children:"Call Signature"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"function h<T, P, C>(\n   type, \n   props?, \n   ch?): T\n"})}),"\n",(0,s.jsx)(r.h5,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:(0,s.jsx)("th",{children:"Type Parameter"})})}),(0,s.jsxs)("tbody",{children:[(0,s.jsx)("tr",{children:(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"T"})})})}),(0,s.jsx)("tr",{children:(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"P"})," ",(0,s.jsx)(r.em,{children:"extends"})," ",(0,s.jsx)(r.code,{children:"undefined"})," | ",(0,s.jsx)(r.code,{children:"null"})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#props",children:(0,s.jsx)(r.code,{children:"Props"})})]})})}),(0,s.jsx)("tr",{children:(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"C"})," ",(0,s.jsx)(r.em,{children:"extends"})," ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})}),"[]"]})})})]})]}),"\n",(0,s.jsx)(r.h5,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"type"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:["(",(0,s.jsx)(r.code,{children:"props"}),", ",(0,s.jsx)(r.code,{children:"children"}),") => ",(0,s.jsx)(r.code,{children:"T"})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"props"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"P"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"ch"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"C"})})})]})]})]}),"\n",(0,s.jsx)(r.h5,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"T"})}),"\n",(0,s.jsx)(r.h4,{id:"call-signature-1",children:"Call Signature"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"function h(\n   type, \n   props?, \n   ch?): VNode\n"})}),"\n",(0,s.jsx)(r.h5,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"type"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"props"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"null"})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#props",children:(0,s.jsx)(r.code,{children:"Props"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"ch"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})}),"[]"]})})]})]})]}),"\n",(0,s.jsx)(r.h5,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vnode",children:(0,s.jsx)(r.code,{children:"VNode"})})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"patch",children:"patch()"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"function patch(\n   dom, \n   vdom, \n   oldKids?): Node\n"})}),"\n",(0,s.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"dom"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"Node"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"vdom"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vnode",children:(0,s.jsx)(r.code,{children:"VNode"})})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vnode",children:(0,s.jsx)(r.code,{children:"VNode"})}),"[]"]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"oldKids"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"ChildNode"}),"[]"]})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"Node"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"recyclenode",children:"recycleNode()"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"function recycleNode(dom): any\n"})}),"\n",(0,s.jsx)(r.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"dom"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"Node"})})})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"any"})}),"\n",(0,s.jsx)(r.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,s.jsx)(r.h3,{id:"h-1",children:"H()"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"interface H<T, P, C>(\n   type, \n   props?, \n   ch?): T\n"})}),"\n",(0,s.jsx)(r.h4,{id:"type-parameters-1",children:"Type Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:(0,s.jsx)("th",{children:"Type Parameter"})})}),(0,s.jsxs)("tbody",{children:[(0,s.jsx)("tr",{children:(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"T"})})})}),(0,s.jsx)("tr",{children:(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"P"})," ",(0,s.jsx)(r.em,{children:"extends"})," ",(0,s.jsx)(r.code,{children:"undefined"})," | ",(0,s.jsx)(r.code,{children:"null"})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#props",children:(0,s.jsx)(r.code,{children:"Props"})})]})})}),(0,s.jsx)("tr",{children:(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"C"})," ",(0,s.jsx)(r.em,{children:"extends"})," ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})}),"[]"]})})})]})]}),"\n",(0,s.jsx)(r.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"type"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:["(",(0,s.jsx)(r.code,{children:"props"}),", ",(0,s.jsx)(r.code,{children:"children"}),") => ",(0,s.jsx)(r.code,{children:"T"})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"props"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"P"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"ch"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"C"})})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"T"})}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"interface H(\n   type, \n   props?, \n   ch?): VNode\n"})}),"\n",(0,s.jsx)(r.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"type"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"props"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"null"})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#props",children:(0,s.jsx)(r.code,{children:"Props"})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"ch"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})})," | ",(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vchild",children:(0,s.jsx)(r.code,{children:"VChild"})}),"[]"]})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#vnode",children:(0,s.jsx)(r.code,{children:"VNode"})})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"props",children:"Props"}),"\n",(0,s.jsx)(r.h4,{id:"indexable",children:"Indexable"}),"\n",(0,s.jsxs)(r.p,{children:["[",(0,s.jsx)(r.code,{children:"key"}),": ",(0,s.jsx)(r.code,{children:"string"}),"]: ",(0,s.jsx)(r.code,{children:"any"})]}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"vnode",children:"VNode"}),"\n",(0,s.jsx)(r.h4,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(r.h5,{id:"children",children:"children"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"children: VChild[];\n"})}),"\n",(0,s.jsx)(r.h5,{id:"key",children:"key"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"key: any;\n"})}),"\n",(0,s.jsx)(r.h5,{id:"props-1",children:"props"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"props: Props;\n"})}),"\n",(0,s.jsx)(r.h5,{id:"type",children:"type"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"type: string;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"type-aliases",children:"Type Aliases"}),"\n",(0,s.jsx)(r.h3,{id:"vchild",children:"VChild"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"type VChild: VNode | string;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"variables",children:"Variables"}),"\n",(0,s.jsx)(r.h3,{id:"options",children:"options"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"const options: object;\n"})}),"\n",(0,s.jsx)(r.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Name"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Default value"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"renderKeys"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"boolean"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"false"})})]})})]}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"react",children:"React"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"const React: object;\n"})}),"\n",(0,s.jsx)(r.h4,{id:"type-declaration-1",children:"Type declaration"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Name"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Default value"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"createElement"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"/functions/editor/rendering/vdom#h-1",children:(0,s.jsx)(r.code,{children:"H"})})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"h"})})]})})]})]})}function j(e={}){let{wrapper:r}={...(0,i.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},50065:function(e,r,d){d.d(r,{Z:function(){return c},a:function(){return l}});var n=d(67294);let s={},i=n.createContext(s);function l(e){let r=n.useContext(i);return n.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),n.createElement(i.Provider,{value:r},e.children)}}}]);