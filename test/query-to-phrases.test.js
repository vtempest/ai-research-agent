import { test, expect } from "vitest";
import     queryPhrase from "../src/search/query-phrase"

test("query to keyphrases", async () => {

    //example usage
    var result = queryPhrase("i like to make black music, gold medal red wine lucid dreaming wine tasting opinion on openai");
    console.log(result);

    expect(result).toBeDefined()

})