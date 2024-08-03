
/**
 * Extract TLD and hostname from domain in Regex 
 * There's one or two part TLDs so it is hard to tell 
 * if host.secondTLD.tld or host.tld is correct way to extract hostname 
 * https://wiki.mozilla.org/TLD_List
 * https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
 * @param {string} domain 
 * @returns {object} {tld: string, domainWithoutSuffix: string, subdomains: string}
 */
export function extractRootDomainRegex(domain) {
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

