 /** @type {FlatConfig[]} */ 
/** @typedef {import('eslint').FlatConfig} FlatConfig */
export default [
    /* ... */
    {
     files: ["**/*.svelte"],
     languageOptions: {
      parserOptions: {
       parser: ts.parser,
      },
     },
    },
    {
     /* location of your components where you would like to apply these rules */
     files: ["**/components/ui/**/*.svelte"],
     rules: {
      "@typescript-eslint/no-unused-vars": [
       "warn",
       {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^\$\$(Props|Events|Slots|Generic)$",
       },
      ],
     },
    },
   ];