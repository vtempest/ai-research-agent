import { test, expect } from "vitest";
import {extract} from ".."

test("extract url", async () => {

    var urls = [
        // "https://vtempest.github.io/ai-research-agent/docs/",
        // "https://www.youtube.com/watch?v=a-wydhEuAm0",
        "https://nlp.stanford.edu/pubs/crosswikis.pdf"
    ]
    
    for (var url of urls){
        var result = await extract(url)
        console.log(result);
    }

  expect(result).toBeDefined();
}, 100000);
