import { test, expect } from "vitest";
import {extract} from "../index.js"

test("extract url", async () => {

    let urls = [
        "https://www.youtube.com/watch?v=T_IdLTofTUU",
        "https://www.technologyreview.com/2024/07/30/1095489/openai-has-released-a-new-chatgpt-bot-that-you-can-talk-to/",
        "https://www.youtube.com/watch?v=OsW_kdOV6c8",
        "https://arxiv.org/pdf/1706.03762",
        "https://vtempest.github.io/ai-research-agent/docs",
      ];
  

    
    
    for (var url of urls){
        var result = await extract(url)
        console.log(result);
    }

  expect(result).toBeDefined();
}, 100000);
