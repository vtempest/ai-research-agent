"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["9849"],{66937:function(t,e,n){n.r(e),n.d(e,{default:()=>b,frontMatter:()=>h,metadata:()=>a,assets:()=>x,toc:()=>g,contentTitle:()=>L});var a=JSON.parse('{"id":"routes/extract-from-any-url-the-main-content-and-cite","title":"Extract from any URL the main content and cite","description":"Extracts main content and citation from URL","source":"@site/docs/routes/extract-from-any-url-the-main-content-and-cite.api.mdx","sourceDirName":"routes","slug":"/routes/extract-from-any-url-the-main-content-and-cite","permalink":"/routes/extract-from-any-url-the-main-content-and-cite","draft":false,"unlisted":false,"editUrl":null,"tags":[],"version":"current","frontMatter":{"id":"extract-from-any-url-the-main-content-and-cite","title":"Extract from any URL the main content and cite","description":"Extracts main content and citation from URL","sidebar_label":"Extract from any URL the main content and cite","hide_title":true,"hide_table_of_contents":true,"api":"eJytVMtu2zAQ/BViTy3AWm6BXnTLoY8AKZo6zinxgZZWEhOKVMiVY9fQvxdLKXJiu04K1BdDi33MDmdnC6TKAOkNXKFf6QwDLCTkGDKvG9LOQgpf1uRVRkHUSluROUtoSSibi0yT4iRReFeL69kFSGiUVzUSeu66BatqhBRab0CC5nYPLfoN7A+5nl0IcgL7WeMUbgwSPD602mMOKfkWJYSswlpBugXaNNw/kNe2hK6T48iiNa/MnCG13gpOFN/nPy7GqboQAYnx8LgX8wtlwjEAS+cMKhtnFKo1NKR23YLLQ+NswMAFn6ZT/jvKMeYjBucjJpAwRLhINY3RWeQ8uQtcuT2E4pZ3mBE/hXcNetL93Ipqc8jYPidfRzJcIahC0agSoZNAmgy+Xj/ntP3aZxucrj6kIbR1rfzmZcf4k/D5GJOsY/QCvXeeSax1CNqWrE4xavP/sRrnvGGxCKfGEHYLdBJqpMrlkEKJsbWiClJIhisACSFu058S31AKFVET0iR5eLwPqHxWTTJXJ6rRBzMvvcvbLH6wCLUt3DG6uId8OjwpVpiR8/o3xgt3LRltUShBrtGZWKqA4lFTJW7t2bmYYY9BnJVoaXLL+me8fe+Pk+lkCqN04Nfj/dWQfnnOcfR1+FkMzjPsdrCawVKZJOYmIGH9wbgyLnKKD505G3axWDMJK34YZWiOa4IUYiN+hsYFqlV898E8BiH2xqbsJsqHBXjMA3Gf+u1OXf/onoOKCNeUNEZpy+cTF90O6riBJ3UsJFQuEIe2W36Ya2+6jsO93bFmch3U0jwzrr/ifDcbPO69OO3FRyHe42Z0+ZUyLWcAm/HbAbzdjU8gGEx/B2HBH14zBkhvFp2EClWOPrLT15xlGTb0rOrAD7jLeKrfvsyh6/4ABFt/eA==","sidebar_class_name":"get api-method","info_path":"routes/qwksearch-api","custom_edit_url":null},"sidebar":"functions","previous":{"title":"Services","permalink":"/routes/services"},"next":{"title":"Generate language model reply using agent prompts","permalink":"/routes/generate-language-model-reply-using-agent-prompts"}}'),i=n("85893"),r=n("50065"),o=n("87470"),c=n.n(o),s=n("44039"),l=n.n(s),d=n("40218"),p=n.n(d),u=n("69141"),m=n.n(u);n("61142"),n("5525");var f=n("34403");let h={id:"extract-from-any-url-the-main-content-and-cite",title:"Extract from any URL the main content and cite",description:"Extracts main content and citation from URL",sidebar_label:"Extract from any URL the main content and cite",hide_title:!0,hide_table_of_contents:!0,api:"eJytVMtu2zAQ/BViTy3AWm6BXnTLoY8AKZo6zinxgZZWEhOKVMiVY9fQvxdLKXJiu04K1BdDi33MDmdnC6TKAOkNXKFf6QwDLCTkGDKvG9LOQgpf1uRVRkHUSluROUtoSSibi0yT4iRReFeL69kFSGiUVzUSeu66BatqhBRab0CC5nYPLfoN7A+5nl0IcgL7WeMUbgwSPD602mMOKfkWJYSswlpBugXaNNw/kNe2hK6T48iiNa/MnCG13gpOFN/nPy7GqboQAYnx8LgX8wtlwjEAS+cMKhtnFKo1NKR23YLLQ+NswMAFn6ZT/jvKMeYjBucjJpAwRLhINY3RWeQ8uQtcuT2E4pZ3mBE/hXcNetL93Ipqc8jYPidfRzJcIahC0agSoZNAmgy+Xj/ntP3aZxucrj6kIbR1rfzmZcf4k/D5GJOsY/QCvXeeSax1CNqWrE4xavP/sRrnvGGxCKfGEHYLdBJqpMrlkEKJsbWiClJIhisACSFu058S31AKFVET0iR5eLwPqHxWTTJXJ6rRBzMvvcvbLH6wCLUt3DG6uId8OjwpVpiR8/o3xgt3LRltUShBrtGZWKqA4lFTJW7t2bmYYY9BnJVoaXLL+me8fe+Pk+lkCqN04Nfj/dWQfnnOcfR1+FkMzjPsdrCawVKZJOYmIGH9wbgyLnKKD505G3axWDMJK34YZWiOa4IUYiN+hsYFqlV898E8BiH2xqbsJsqHBXjMA3Gf+u1OXf/onoOKCNeUNEZpy+cTF90O6riBJ3UsJFQuEIe2W36Ya2+6jsO93bFmch3U0jwzrr/ifDcbPO69OO3FRyHe42Z0+ZUyLWcAm/HbAbzdjU8gGEx/B2HBH14zBkhvFp2EClWOPrLT15xlGTb0rOrAD7jLeKrfvsyh6/4ABFt/eA==",sidebar_class_name:"get api-method",info_path:"routes/qwksearch-api",custom_edit_url:null},L=void 0,x={},g=[];function R(t){let e={p:"p",...(0,r.a)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(f.default,{as:"h1",className:"openapi__heading",children:"Extract from any URL the main content and cite"}),"\n",(0,i.jsx)(c(),{method:"get",path:"/extract",context:"endpoint"}),"\n",(0,i.jsx)(e.p,{children:"Extracts main content and citation from URL"}),"\n",(0,i.jsx)(f.default,{id:"request",as:"h2",className:"openapi-tabs__heading",children:"Request"}),"\n",(0,i.jsx)(l(),{parameters:[{name:"url",in:"query",description:"URL to extract content from",required:!0,schema:{type:"string"}},{name:"full",in:"query",description:"Return full HTML content if set to true",required:!1,schema:{type:"boolean",default:!1}}]}),"\n",(0,i.jsx)(p(),{title:"Body",body:void 0}),"\n",(0,i.jsx)(m(),{id:void 0,label:void 0,responses:{200:{description:"Extracted content or HTML",content:{"application/json":{schema:{type:"object",properties:{html:{type:"string",description:"Full HTML of the page"},title:{type:"string",description:"Title of the page"},content:{type:"string",description:"Extracted content summary of the page"}}}}}},500:{description:"Server error or missing URL parameter",content:{"application/json":{schema:{type:"object",properties:{error:{type:"string",description:"Error message"}}}}}}}})]})}function b(t={}){let{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(R,{...t})}):R(t)}}}]);