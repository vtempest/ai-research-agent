import { test, expect } from "vitest";
import { searchSTREAM } from "../index.js";

test("test STREAM search answer angine", async () => {
  var query = " how to get structured output from chatgpt ";

  var result = await searchSTREAM(query);

  console.log(result);
  expect(result).toBeDefined();
}, 100000);
