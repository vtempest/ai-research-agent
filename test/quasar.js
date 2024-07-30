var document_text = `
Ask not what your country can do for you, ask what you can do for your country.
There is nothing to fear but fear itself.
`;
var search_query = ` "Ask not" "but fear itself" nothing`;

var isFound = new RegExp("(?=.*" +
    search_query
      .match(/"([^"]+)"|[\w]+/gi)
      .join(")(?=.*")
      .replace(/\"/g, "") +
    ").+","mig"
).test(document_text.replace(/\n/g, " "));

console.log(isFound);