[Documentation](../modules.md) / agents/language-model-names

## Generate

### LANGUAGE\_MODELS

```ts
const LANGUAGE_MODELS: (
  | {
  api_key: string;
  default?: undefined;
  docs: string;
  models: object[];
  provider: string;
}
  | {
  api_key: string;
  default: string;
  docs: string;
  models: (
     | {
     contextLength: number;
     id: string;
     name: string;
     provider: string;
     type?: undefined;
   }
     | {
     contextLength: number;
     id: string;
     name: string;
     provider: string;
     type: string;
  })[];
  provider: string;
}
  | {
  api_key: string;
  default: string;
  docs: string;
  models: (
     | {
     contextLength: number;
     id: string;
     name: string;
     type: string;
   }
     | {
     contextLength: number;
     id: string;
     name: string;
     type?: undefined;
  })[];
  provider: string;
})[];
```

Defined in: [packages/ai-research-agent/src/agents/language-model-names.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/language-model-names.js#L10)

List of default models for the chat providers and a list of models

## Other

### LANGUAGE\_PROVIDERS

```ts
const LANGUAGE_PROVIDERS: string[];
```

Defined in: [packages/ai-research-agent/src/agents/language-model-names.js:1512](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/language-model-names.js#L1512)

List of available LLM provider services
