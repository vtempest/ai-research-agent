
/**
 * Extract TLD and hostname from domain in Regex. There's [two or more part 
 * TLDs](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)
 * so it is hard to tell if host.secondTLD.tld or host.tld is correct way
 * to get root domain (e.g. abc.go.jp, abc.co.uk) 
 * @param {string} domain 
 * @returns {string} rootDomain 
 */
export function convertURLToDomain(domain) {
  var tldRegExp = new RegExp(
    "(?=[^^]).(fr|de|cz|at|com|wiki|co|edu|g ov|info|mil|id|"+
    "gv|tv|int|name|net|org|pro|ac|me|ltd|parliament)(.|$).*$"
  );
  var match =
    domain.match(tldRegExp) ||
    domain.match(/(?=[^^])\.[^a-z]{1,2}\.[^\.]{2,4}$/) ||
    domain.match(/\.[^\.]{2,}$/);
  var tld = match && match.index;
  var domainWithoutSuffix = domain.substring(0, tld);
  if (domainWithoutSuffix.includes("."))
    domainWithoutSuffix = domainWithoutSuffix.split(".").pop();
  return domainWithoutSuffix;
}


/**
 * Checks if a string is a valid URL.
 * @param {string} string 
 * @returns {boolean} true if the string is a valid URL
 * @private
 */
export function isURLValid(string) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  .test(string);
}
