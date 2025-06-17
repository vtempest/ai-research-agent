[Documentation](../README.md) / agents/agent-tools

## agentTools

```ts
const agentTools: (
  | {
  name: string;
  description: string;
  schema: ZodObject<{
     input: ZodNumber;
   }, "strip", ZodTypeAny, {
     input?: number;
   }, {
     input?: number;
  }>;
  func: (__namedParameters: object) => Promise<any>;
}
  | {
  name: string;
  description: string;
  schema: ZodObject<{
     location: ZodString;
   }, "strip", ZodTypeAny, {
     location?: string;
   }, {
     location?: string;
  }>;
  func: (location: any) => Promise<string>;
})[];
```

Defined in: [packages/ai-research-agent/src/agents/agent-tools.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L3)
