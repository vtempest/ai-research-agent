import { describe, it, expect } from 'vitest';
import { getAgentPrompts } from "../index.js"

describe('getAgentPrompts', () => {
  it('should fill in agent prompts with data', async () => {
    

    var article = `
      <p>The 2024 United States presidential election is scheduled to take place on November 3, 2024. It will be the 59th quadrennial presidential election. Voters will select presidential electors who in turn will elect a new president and vice president through the Electoral College. The election will take place concurrently with elections to the Senate, House of Representatives, and various state and local races.</p>
      <p>As of September 2023, former President Donald Trump, incumbent President Joe Biden, and several other candidates have announced their candidacies. The election is expected to be highly competitive and hotly contested, with a wide range of issues at stake, including the economy, healthcare, climate change, and national security.</p>
    `
    
    var promptObject = getAgentPrompts("answer", {article})
    // var promptObject = getAgentPrompts("summarize-bullets", {article})
    var { prompt} = promptObject;
    
    console.log(promptObject);
    // Verify document content
    expect(prompt).toMatch(/Trump/i); // Sample file contains Lorem ipsum text
  }, 40000);
});