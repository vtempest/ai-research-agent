[Documentation](../README.md) / agents/language-model-names

## Generate

### LANGUAGE\_MODELS

```ts
const LANGUAGE_MODELS: (
  | {
  provider: string;
  docs: string;
  api_key: string;
  models: object[];
  default?: undefined;
}
  | {
  provider: string;
  docs: string;
  api_key: string;
  default: string;
  models: (
     | {
     name: string;
     id: string;
     contextLength: number;
     provider: string;
     type?: undefined;
   }
     | {
     name: string;
     id: string;
     contextLength: number;
     provider: string;
     type: string;
  })[];
}
  | {
  provider: string;
  docs: string;
  api_key: string;
  default: string;
  models: (
     | {
     name: string;
     id: string;
     contextLength: number;
     type: string;
   }
     | {
     name: string;
     id: string;
     contextLength: number;
     type?: undefined;
  })[];
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
