"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["7966"],{82444:function(e,n,t){t.r(n),t.d(n,{default:()=>o,frontMatter:()=>l,metadata:()=>r,assets:()=>d,toc:()=>a,contentTitle:()=>c});var r=JSON.parse('{"id":"functions/agents/agent-prompts","title":"agent-prompts","description":"ai-research-agent / agents/agent-prompts","source":"@site/docs/functions/agents/agent-prompts.md","sourceDirName":"functions/agents","slug":"/functions/agents/agent-prompts","permalink":"/functions/agents/agent-prompts","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"Algorithms Overview","permalink":"/"},"next":{"title":"agent-tools","permalink":"/functions/agents/agent-tools"}}'),s=t("85893"),i=t("50065");let l={},c=void 0,d={},a=[{value:"Generate",id:"generate",level:2},{value:"getAgentPrompts()",id:"getagentprompts",level:3},{value:"Agent Prompts",id:"agent-prompts",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Returns",id:"returns-1",level:5},{value:"Author",id:"author",level:4},{value:"Example",id:"example",level:4}];function h(e){let n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/functions/",children:"ai-research-agent"})," / agents/agent-prompts"]}),"\n",(0,s.jsx)(n.h2,{id:"generate",children:"Generate"}),"\n",(0,s.jsx)(n.h3,{id:"getagentprompts",children:"getAgentPrompts()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function getAgentPrompts(agentName, options?): () => object\n"})}),"\n",(0,s.jsx)(n.h3,{id:"agent-prompts",children:"Agent Prompts"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["summarize-bullets:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"article"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["summarize:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"article"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["suggest-followups:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"chat_history"}),"\n",(0,s.jsx)(n.li,{children:"article"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["answer:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"chat_history"}),"\n",(0,s.jsx)(n.li,{children:"query"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["query-resolution:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"chat_history"}),"\n",(0,s.jsx)(n.li,{children:"query"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["knowledge-graph-nodes:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"query"}),"\n",(0,s.jsx)(n.li,{children:"article"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["summary-longtext:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"article"}),"\n",(0,s.jsx)(n.li,{children:"sections"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Returns an object with agent prompts based on the provided agent name and options\r\nUses regex to detect any variables in %7Bbrackets%7D in the prompts\r\nand replace them with values from the options object\r\nValues inside brackets must be the matching variable name"}),"\n",(0,s.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"agentName"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The name of the agent to generate prompts for."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"Object"})})}),(0,s.jsxs)("td",{children:[(0,s.jsx)(n.p,{children:"An options object that can contain the following\r\nproperties:"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"context"}),": An object containing context variables to be used when\r\ngenerating the prompts."]}),"\n"]})]})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"Function"})}),"\n",(0,s.jsx)(n.p,{children:"An object with agent prompts."}),"\n",(0,s.jsx)(n.h5,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"object"})}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Name"}),(0,s.jsx)(n.th,{children:"Type"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"prompt"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"variablesNotProvided"})}),(0,s.jsx)(n.td,{children:"[]"})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"author",children:"Author"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://airesearch.js.org",children:"ai-research-agent (2024)"})}),"\n",(0,s.jsx)(n.h4,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'var prompt = getAgentPrompts("summarize-bullets", {article})\n'})})]})}function o(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},50065:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return l}});var r=t(67294);let s={},i=r.createContext(s);function l(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);