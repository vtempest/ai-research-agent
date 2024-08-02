import { test, expect } from "vitest";
import splitSentences from "../src/tokenize/sentences";

test("split sentences", async () => {
  
  var text = `
  
  
  One style guide may advise you to abbreviate Thursday as Thurs. while another may argue for Thu. Likewise, some style guides allow you to omit the periods with these abbreviations, but it’s never wrong to include periods. So if you aren’t sure whether to use the periods, err on the side of leaving them in.

Times and dates
a.m. (ante meridiem) = before noon

p.m. (post meridiem) = after noon


The mall opens at 10 a.m. and closes at 8 p.m.
Jan., Feb., Mar., Apr., May, Jun., Jul., Aug., Sep., Oct., Nov., Dec.


I was born on Nov. 6, 1980.
Mon., Tues., Wed., Thurs., Fri., Sat,. Sun.


The class will run Mon.-Fri. next week.
Places
U.S. (United States)

U.K. (United Kingdom)

E.U. (European Union)

U.A.E. (United Arab Emirates)


The U.S. highway system seems enormous to visitors from the U.K.
Units of Measurement

`;
  var result = splitSentences(text);



  console.log(result);
  expect(result).toBeDefined();
});
