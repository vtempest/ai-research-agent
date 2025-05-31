import { test, expect } from "vitest";
import {matchQUASAR} from "../index.js";

test("quasar: match phrases in quotes ", async () => {

  var document_text = `
    Ask not what your country can do for you, ask what you can do for your country.
    There is nothing to fear but fear itself. `;

  var search_query = ` "Ask not" "but fear itself" nothing`;

  var res = matchQUASAR(document_text, search_query);

  expect(res).toBe(true);
});
