import { test, expect } from "vitest";
import { searchSTREAM } from "..";

test("test ai answer angine", async () => {
  var query = "what will claude ai look like ";

  var result = await searchSTREAM(query);

  console.log(result);
  expect(result).toBeDefined();
}, 100000);
