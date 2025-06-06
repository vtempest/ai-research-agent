import { test, expect } from "vitest";
import {convertLanguageReplyToJSON} from "../index.js"

test("convertLanguageReplyToJSON", async () => {

// Example usage:
const sampleText = `
Some header text
<questions>
1. First question
2. Second question
- Bullet point
* Star point
• Special bullet
</questions>
Some footer text
`;

const result = convertLanguageReplyToJSON(sampleText);
console.log(result);

// Example with custom key
const customText = `
<items>
1) Item one
2) Item two
- Item three
</items>
`;

const customResult = convertLanguageReplyToJSON(customText, 'items');
console.log(customResult);

  expect(customResult.length==3).toBeTruthy();
});


