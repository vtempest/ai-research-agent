[Documentation](../modules.md) / agents/language-model-names

## Generate

### LANGUAGE\_MODELS

```ts
const LANGUAGE_MODELS: (
  | {
  api_key: string;
  default: string;
  docs: string;
  models: object[];
  provider: string;
}
  | {
  api_key: string;
  default?: undefined;
  docs: string;
  models: object[];
  provider: string;
})[];
```

Defined in: agents/language-model-names.js:12

List of default models for the chat providers and a list of models
