"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["2885"],{30111:function(e,d,s){s.r(d),s.d(d,{default:()=>a,frontMatter:()=>c,metadata:()=>r,assets:()=>t,toc:()=>o,contentTitle:()=>l});var r=JSON.parse('{"id":"functions/editor/modules/history","title":"history","description":"ai-research-agent / editor/modules/history","source":"@site/docs/functions/editor/modules/history.md","sourceDirName":"functions/editor/modules","slug":"/functions/editor/modules/history","permalink":"/docs/functions/editor/modules/history","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"defaults","permalink":"/docs/functions/editor/modules/defaults"},"next":{"title":"input","permalink":"/docs/functions/editor/modules/input"}}'),n=s("85893"),i=s("50065");let c={},l=void 0,t={},o=[{value:"Functions",id:"functions",level:2},{value:"history()",id:"history",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"initHistory()",id:"inithistory",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Parameters",id:"parameters-2",level:5},{value:"Returns",id:"returns-2",level:5},{value:"transformHistoryStack()",id:"transformhistorystack",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"undoStack()",id:"undostack",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Interfaces",id:"interfaces",level:2},{value:"HistoryModule",id:"historymodule",level:3},{value:"Methods",id:"methods",level:4},{value:"destroy()",id:"destroy",level:5},{value:"Returns",id:"returns-5",level:6},{value:"Properties",id:"properties",level:4},{value:"clearHistory()",id:"clearhistory",level:5},{value:"Returns",id:"returns-6",level:6},{value:"cutoffHistory()",id:"cutoffhistory",level:5},{value:"Returns",id:"returns-7",level:6},{value:"getStack()",id:"getstack",level:5},{value:"Returns",id:"returns-8",level:6},{value:"hasRedo()",id:"hasredo",level:5},{value:"Returns",id:"returns-9",level:6},{value:"hasUndo()",id:"hasundo",level:5},{value:"Returns",id:"returns-10",level:6},{value:"options",id:"options",level:5},{value:"redo()",id:"redo",level:5},{value:"Returns",id:"returns-11",level:6},{value:"setStack()",id:"setstack",level:5},{value:"Parameters",id:"parameters-4",level:6},{value:"Returns",id:"returns-12",level:6},{value:"undo()",id:"undo",level:5},{value:"Returns",id:"returns-13",level:6},{value:"Options",id:"options-1",level:3},{value:"Properties",id:"properties-1",level:4},{value:"delay",id:"delay",level:5},{value:"maxStack",id:"maxstack",level:5},{value:"unrecordedSources",id:"unrecordedsources",level:5},{value:"StackEntry",id:"stackentry",level:3},{value:"Properties",id:"properties-2",level:4},{value:"redo",id:"redo-1",level:5},{value:"undo",id:"undo-1",level:5},{value:"UndoStack",id:"undostack-1",level:3},{value:"Properties",id:"properties-3",level:4},{value:"redo",id:"redo-2",level:5},{value:"undo",id:"undo-2",level:5}];function h(e){let d={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",hr:"hr",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.p,{children:[(0,n.jsx)(d.a,{href:"/docs/functions/",children:"ai-research-agent"})," / editor/modules/history"]}),"\n",(0,n.jsx)(d.h2,{id:"functions",children:"Functions"}),"\n",(0,n.jsx)(d.h3,{id:"history",children:"history()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"function history(editor): object\n"})}),"\n",(0,n.jsx)(d.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Parameter"}),(0,n.jsx)("th",{children:"Type"})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"editor"})})}),(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,n.jsx)(d.code,{children:"Editor"})})})})]})})]}),"\n",(0,n.jsx)(d.h4,{id:"returns",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"object"})}),"\n",(0,n.jsxs)(d.table,{children:[(0,n.jsx)(d.thead,{children:(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.th,{children:"Name"}),(0,n.jsx)(d.th,{children:"Type"})]})}),(0,n.jsxs)(d.tbody,{children:[(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"clearHistory"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"commands"})}),(0,n.jsxs)(d.td,{children:["{ ",(0,n.jsx)(d.code,{children:"redo"}),": () => ",(0,n.jsx)(d.code,{children:"void"}),"; ",(0,n.jsx)(d.code,{children:"undo"}),": () => ",(0,n.jsx)(d.code,{children:"void"}),"; }"]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"cutoffHistory"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"getStack"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#undostack-1",children:(0,n.jsx)(d.code,{children:"UndoStack"})})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"hasRedo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"boolean"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"hasUndo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"boolean"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"options"})}),(0,n.jsx)(d.td,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#options-1",children:(0,n.jsx)(d.code,{children:"Options"})})})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"redo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"setStack"})}),(0,n.jsxs)(d.td,{children:["(",(0,n.jsx)(d.code,{children:"value"}),") => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"shortcuts"})}),(0,n.jsxs)(d.td,{children:["{ ",(0,n.jsx)(d.code,{children:"mac:Cmd+Shift+Z"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; ",(0,n.jsx)(d.code,{children:"mac:Cmd+Z"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; ",(0,n.jsx)(d.code,{children:"win:Ctrl+Y"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; ",(0,n.jsx)(d.code,{children:"win:Ctrl+Z"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; }"]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"undo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"destroy()"})}),(0,n.jsx)(d.td,{})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"getActive()"})}),(0,n.jsx)(d.td,{})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"init()"})}),(0,n.jsx)(d.td,{})]})]})]}),"\n",(0,n.jsx)(d.hr,{}),"\n",(0,n.jsx)(d.h3,{id:"inithistory",children:"initHistory()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"function initHistory(initOptions): (editor) => object\n"})}),"\n",(0,n.jsx)(d.p,{children:"History is a view module for storing user changes and undoing/redoing those changes."}),"\n",(0,n.jsx)(d.p,{children:'Stores history for all user-generated changes. Like-changes will be combined until a selection or a delay timeout\r\ncuts off the combining. E.g. if a user types "Hello" the 5 changes will be combined into one history entry. If\r\nthe user moves the cursor somewhere and then back to the end and types " World" the next 6 changes are combined\r\nseparately from the first 5 because selection changes add a cutoff history entries.'}),"\n",(0,n.jsx)(d.p,{children:"The default options can be overridden by passing alternatives to history. To add a timeout to force a cutoff after\r\nso many milliseconds set a delay like this:"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-js",children:"const modules = {\r\n  history: history({ delay: 4000 })\r\n};\n"})}),"\n",(0,n.jsx)(d.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Parameter"}),(0,n.jsx)("th",{children:"Type"})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"initOptions"})})}),(0,n.jsx)("td",{children:(0,n.jsxs)(d.p,{children:[(0,n.jsx)(d.code,{children:"Partial"}),"<",(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#options-1",children:(0,n.jsx)(d.code,{children:"Options"})}),">"]})})]})})]}),"\n",(0,n.jsx)(d.h4,{id:"returns-1",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"Function"})}),"\n",(0,n.jsx)(d.h5,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Parameter"}),(0,n.jsx)("th",{children:"Type"})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"editor"})})}),(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/#editor",children:(0,n.jsx)(d.code,{children:"Editor"})})})})]})})]}),"\n",(0,n.jsx)(d.h5,{id:"returns-2",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"object"})}),"\n",(0,n.jsxs)(d.table,{children:[(0,n.jsx)(d.thead,{children:(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.th,{children:"Name"}),(0,n.jsx)(d.th,{children:"Type"})]})}),(0,n.jsxs)(d.tbody,{children:[(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"clearHistory"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"commands"})}),(0,n.jsxs)(d.td,{children:["{ ",(0,n.jsx)(d.code,{children:"redo"}),": () => ",(0,n.jsx)(d.code,{children:"void"}),"; ",(0,n.jsx)(d.code,{children:"undo"}),": () => ",(0,n.jsx)(d.code,{children:"void"}),"; }"]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"cutoffHistory"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"getStack"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#undostack-1",children:(0,n.jsx)(d.code,{children:"UndoStack"})})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"hasRedo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"boolean"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"hasUndo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"boolean"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"options"})}),(0,n.jsx)(d.td,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#options-1",children:(0,n.jsx)(d.code,{children:"Options"})})})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"redo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"setStack"})}),(0,n.jsxs)(d.td,{children:["(",(0,n.jsx)(d.code,{children:"value"}),") => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"shortcuts"})}),(0,n.jsxs)(d.td,{children:["{ ",(0,n.jsx)(d.code,{children:"mac:Cmd+Shift+Z"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; ",(0,n.jsx)(d.code,{children:"mac:Cmd+Z"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; ",(0,n.jsx)(d.code,{children:"win:Ctrl+Y"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; ",(0,n.jsx)(d.code,{children:"win:Ctrl+Z"}),": ",(0,n.jsx)(d.code,{children:"string"}),"; }"]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"undo"})}),(0,n.jsxs)(d.td,{children:["() => ",(0,n.jsx)(d.code,{children:"void"})]})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"destroy()"})}),(0,n.jsx)(d.td,{})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"getActive()"})}),(0,n.jsx)(d.td,{})]}),(0,n.jsxs)(d.tr,{children:[(0,n.jsx)(d.td,{children:(0,n.jsx)(d.code,{children:"init()"})}),(0,n.jsx)(d.td,{})]})]})]}),"\n",(0,n.jsx)(d.hr,{}),"\n",(0,n.jsx)(d.h3,{id:"transformhistorystack",children:"transformHistoryStack()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"function transformHistoryStack(stack, delta): void\n"})}),"\n",(0,n.jsx)(d.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Parameter"}),(0,n.jsx)("th",{children:"Type"})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"stack"})})}),(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#undostack-1",children:(0,n.jsx)(d.code,{children:"UndoStack"})})})})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"delta"})})}),(0,n.jsx)("td",{children:(0,n.jsxs)(d.p,{children:[(0,n.jsx)(d.a,{href:"/docs/functions/editor/delta/#default",children:(0,n.jsx)(d.code,{children:"default"})})," | ",(0,n.jsx)(d.a,{href:"/docs/functions/editor/document/TextChange#default",children:(0,n.jsx)(d.code,{children:"default"})})]})})]})]})]}),"\n",(0,n.jsx)(d.h4,{id:"returns-3",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.hr,{}),"\n",(0,n.jsx)(d.h3,{id:"undostack",children:"undoStack()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"function undoStack(): UndoStack\n"})}),"\n",(0,n.jsx)(d.h4,{id:"returns-4",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#undostack-1",children:(0,n.jsx)(d.code,{children:"UndoStack"})})}),"\n",(0,n.jsx)(d.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,n.jsx)(d.h3,{id:"historymodule",children:"HistoryModule"}),"\n",(0,n.jsx)(d.h4,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(d.h5,{id:"destroy",children:"destroy()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"destroy(): void\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-5",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.h4,{id:"properties",children:"Properties"}),"\n",(0,n.jsx)(d.h5,{id:"clearhistory",children:"clearHistory()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"clearHistory: () => void;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-6",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.h5,{id:"cutoffhistory",children:"cutoffHistory()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"cutoffHistory: () => void;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-7",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.h5,{id:"getstack",children:"getStack()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"getStack: () => UndoStack;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-8",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#undostack-1",children:(0,n.jsx)(d.code,{children:"UndoStack"})})}),"\n",(0,n.jsx)(d.h5,{id:"hasredo",children:"hasRedo()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"hasRedo: () => boolean;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-9",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"boolean"})}),"\n",(0,n.jsx)(d.h5,{id:"hasundo",children:"hasUndo()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"hasUndo: () => boolean;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-10",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"boolean"})}),"\n",(0,n.jsx)(d.h5,{id:"options",children:"options"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"options: Options;\n"})}),"\n",(0,n.jsx)(d.h5,{id:"redo",children:"redo()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"redo: () => void;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-11",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.h5,{id:"setstack",children:"setStack()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"setStack: (value) => void;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"parameters-4",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Parameter"}),(0,n.jsx)("th",{children:"Type"})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"value"})})}),(0,n.jsx)("td",{children:(0,n.jsx)(d.p,{children:(0,n.jsx)(d.a,{href:"/docs/functions/editor/modules/history#undostack-1",children:(0,n.jsx)(d.code,{children:"UndoStack"})})})})]})})]}),"\n",(0,n.jsx)(d.h6,{id:"returns-12",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.h5,{id:"undo",children:"undo()"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"undo: () => void;\n"})}),"\n",(0,n.jsx)(d.h6,{id:"returns-13",children:"Returns"}),"\n",(0,n.jsx)(d.p,{children:(0,n.jsx)(d.code,{children:"void"})}),"\n",(0,n.jsx)(d.hr,{}),"\n",(0,n.jsx)(d.h3,{id:"options-1",children:"Options"}),"\n",(0,n.jsx)(d.h4,{id:"properties-1",children:"Properties"}),"\n",(0,n.jsx)(d.h5,{id:"delay",children:"delay"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"delay: number;\n"})}),"\n",(0,n.jsx)(d.h5,{id:"maxstack",children:"maxStack"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"maxStack: number;\n"})}),"\n",(0,n.jsx)(d.h5,{id:"unrecordedsources",children:"unrecordedSources"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"unrecordedSources: Set<string>;\n"})}),"\n",(0,n.jsx)(d.hr,{}),"\n",(0,n.jsx)(d.h3,{id:"stackentry",children:"StackEntry"}),"\n",(0,n.jsx)(d.h4,{id:"properties-2",children:"Properties"}),"\n",(0,n.jsx)(d.h5,{id:"redo-1",children:"redo"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"redo: default;\n"})}),"\n",(0,n.jsx)(d.h5,{id:"undo-1",children:"undo"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"undo: default;\n"})}),"\n",(0,n.jsx)(d.hr,{}),"\n",(0,n.jsx)(d.h3,{id:"undostack-1",children:"UndoStack"}),"\n",(0,n.jsx)(d.h4,{id:"properties-3",children:"Properties"}),"\n",(0,n.jsx)(d.h5,{id:"redo-2",children:"redo"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"redo: StackEntry[];\n"})}),"\n",(0,n.jsx)(d.h5,{id:"undo-2",children:"undo"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-ts",children:"undo: StackEntry[];\n"})})]})}function a(e={}){let{wrapper:d}={...(0,i.a)(),...e.components};return d?(0,n.jsx)(d,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},50065:function(e,d,s){s.d(d,{Z:function(){return l},a:function(){return c}});var r=s(67294);let n={},i=r.createContext(n);function c(e){let d=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(d):{...d,...e}},[d,e])}function l(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),r.createElement(i.Provider,{value:d},e.children)}}}]);