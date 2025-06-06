[Documentation](../modules.md) / agents/language-model-names

## Generate

### LANGUAGE\_MODELS

```ts
const LANGUAGE_MODELS: (
  | {
  provider: string;
  docs: string;
  api_key: string;
  default: string;
  models: object[];
}
  | {
  provider: string;
  docs: string;
  api_key: string;
  models: object[];
  default?: undefined;
})[];
```

Defined in: agents/language-model-names.js:12

List of default models for the chat providers and a list of models
