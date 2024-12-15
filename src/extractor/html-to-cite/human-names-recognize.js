import dataHumanNames from "../../../data/human-names-92k.json" // with { type: "json" };

// const dataHumanNames = {}

/**
 * Validates and formats an author name string by comparing it against common lists of
 * first names, last names, name affixes, and organizations.
 * 
 * This function determines whether the name should be reversed (starting with the last name)
 * for citation purposes, as organizations are not reversed. It also checks against common
 * salutations, middle parts, and titles to properly format the citation in "Last, First Middle" format.
 * 
 * @param {string} author - The author name string to be processed.
 * @returns {Object} An object containing the following properties:
 *   - author_cite : The formatted author name for citation (e.g., "Last, First Middle").
 *   - author_short : A shortened version of the author name.
 *   - author_type : The type of author, which can be one of:
 *     - "single": A single author or a two-word name.
 *     - "two-author": Two authors.
 *     - "more-than-two": More than two authors.
 *     - "organization": A non-human name (organization) that should not be reversed.
 */
export function extractHumanName(author, options = {}) {

  var {
    formatCiteShortenAuthor = false
  } = options;


  var author_short, authorType = 4;

  if (!author || !author.split) return { author_cite: "", author_short: "", author_type: 4 };

  // recognize human names in author
  var names = author.split(" ").map((name) => {
    var enumTypes = ["", "first", "last", "org"];

    //standardize name as Title Case
    var nameTitle = name[0]?.toUpperCase() + name.slice(1)?.toLowerCase();

    //check if name is a common organization
    if (TERMS_ORG.includes(name?.toLowerCase().replace(/[^a-z]/g, "")))
      return { name, type: "org" };

    //recognize human names from list of common first and last names
    return dataHumanNames[nameTitle] != null
      ? { name, type: enumTypes[dataHumanNames[nameTitle]] }
      : { name, type: false };
  });

  var foundNameParts = names.filter(
    (name) => name.type != false && name.type != "org"
  ).length;

  var foundOrgParts = names.filter((name) => name.type == "org").length;

  var isTwoWord = author.split(" ").length == 2
  //determine author type - one or two or a two-word name
  // if (isTwoWord
  //   || foundNameParts <= 2) authorType = 0;

  if (foundNameParts > 2 && foundNameParts <= 4) authorType = 1;
  if (foundNameParts > 4) authorType = 2;

  //org or not found -- should not be reversed
  if (foundOrgParts > 0 || (foundNameParts == 0 && !isTwoWord)) authorType = 3;

  //cut off non-name intro parts like By: //TODO  && names.length > 4
  if (foundNameParts > 0 && names.length >=3) {
    var candidateName = names.filter((name) => name.type>1);
    if (candidateName.length >=2)
    names = candidateName
  }

  author = names.map((name) => name.name).join(" ")
    .replace(/(undefined|by:|by )/gi, "")
    ;

  const maxOrgNameLength = 60;

  //split author into parts and reverse Last, First if not Organization
  if (authorType == 3) {
    if (author.length > maxOrgNameLength)
      author = author.substring(0,
        author.slice(0, maxOrgNameLength).lastIndexOf(" "));
    author_short = author;
  } else {
    var authorObj = extractHumanNameParts(author);
    if (authorObj) {
      author =
        authorObj.lastname +
        ", " +
        (formatCiteShortenAuthor ? authorObj.firstname[0] + "." : authorObj.firstname)

      author_short = authorObj.lastname;
    }
  }

  author = author
    .replace(/(undefined|by\:|by )/gi, "")
    .trim()
    .replace(/,$/g, "");


  //multiple authors
  if (authorType == 2 || authorType == 1) author_short += " et al.";


  //single -- shorten actrolun
  // if (authorType == 0)
    // author = author.replace(/,\s*(\S+)/, (_, firstName) => `, ${firstName[0]}.`)

  // if (authorType != 3) 
  //   author = author.split(', ').map(name => {
  //     const [firstName, ...rest] = name.split(' ');
  //     return `${firstName[0]}. ${rest.join(' ')}`;
  //   }).join(', ');


  return { author_cite: author, author_type: authorType };
}

/**
 * Parses a full name into its component parts:
 * Title, Firstname, Prefix, Middle, Lastname, Honorific, Alias
 * https://en.wikipedia.org/wiki/List_of_family_name_affixes
 * @param {string} input - The full name to parse.
 * @returns {Object}
 */
const extractHumanNameParts = (input) => {
  // Initialize the result object
  const result = {
    prefix: "", //van der von de
    firstname: "",
    middle: "",
    lastname: "",
    honorific: "", //Jr Phd II
  };

  // Input validation
  if (!input || typeof input !== "string") {
    return result;
  }

  // Trim input and determine case fixing mode
  input = input.trim();
  const shouldFixCase =
    input === input.toUpperCase() || input === input.toLowerCase();

  // Define lists for parsing
  const lists = {
    honorific: ["esq", "esquire", "jr", "sr", "ii", "iii", "iv", "phd",
       "md", "ms", "mrs", "mr", "miss", "dr"],
    prefix: ["de", "van", "von", "der", "den", "vel", "le", "la", "da"],
    title: ["mr", "mrs", "ms", "miss", "dr", "rev", "prof"],
  };

  // Extract alias
  const aliasRegex =
    /\s(['']([^'']+)['']|[""]([^""]+)[""]|\[([^\]]+)\]|\(([^\)]+)\)),?\s/g;
  const aliasMatch = input.match(aliasRegex);
  if (aliasMatch) {
    input = input.replace(aliasRegex, " ");
  }

  // Split the name into parts
  let parts = input.split(/\s+/);

  // Extract honorific
  const honorificIndex = parts.findIndex((part) =>
    lists.honorific.includes(part.toLowerCase().replace(/\.$/, ""))
  );
  if (honorificIndex !== -1) {
    result.honorific = parts.splice(honorificIndex).join(", ");
  }

  // Extract title
  const titleIndex = parts.findIndex((part) =>
    lists.title.includes(part.toLowerCase().replace(/\.$/, ""))
  );
  if (titleIndex !== -1) {
    result.prefix = parts.splice(titleIndex, 1)[0];
  }

  // Join prefixes to following name parts
  for (let i = parts.length - 2; i >= 0; i--) {
    if (lists.prefix.includes(parts[i]?.toLowerCase())) {
      parts[i] += " " + parts[i + 1];
      parts.splice(i + 1, 1);
    }
  }

  // Extract lastname name (if comma present)
  const commaIndex = parts.findIndex((part) => part.endsWith(","));
  if (commaIndex !== -1) {
    result.lastname = parts
      .splice(0, commaIndex + 1)
      .join(" ")
      .replace(/,$/, "");
  } else {
    result.lastname = parts.pop();
  }

  // Assign remaining parts to firstname and middle names
  if (parts.length > 0) {
    result.firstname = parts.shift();
    if (parts.length > 0) {
      result.middle = parts.join(" ");
    }
  }

  // Fix case if needed
  if (shouldFixCase) {
    Object.keys(result).forEach((key) => {
      if (result[key]) {
        result[key] = result[key]
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase()
          )
          .join(" ");
      }
    });
  }

  return result;
};

const TERMS_ORG =
  "abc,ag,ap,academy,advisors,agency,airbnb,amazon,america,american,apple,associated,association,atlantic," +
  "attorneys,authority,axel,bank,baptiste,bbc,bertelsmann,blackrock,bloomberg,bmw,boston,broadcasting,bureau," +
  "business,buzzfeed,cambridge,capital,cbs,center,chase,chicago,china,church,citigroup,clinic,club,cnn,coca-cola," +
  "college,commission,communications,condé,consulting,corp,corps,costco,daily,department,der,deutsche,division,dow," +
  "economist,enterprises,eu,european,fabrication,facebook,fargo,ferrari,financial,ford,forbes,fox,france,fund," +
  "gannett,general,global,globe,gm,gmbh,goldman,google,group,guardian,harvard,hearst,herald,hill,holdings,home," +
  "honda,hospital,huffington,ibm,inc,industries,institute,intel,international,investments,jazeera,japan,jones," +
  "jpmorgan,lancet,laboratories,law,legal,linkedin,llc,los,ltd,manufacturing,macy's,mcdonald's,media,medical," +
  "mercedes-benz,meta,microsoft,ministry,mit,morgan,mosque,msnbc,nast,national,nato,nbc,netflix,news,newsweek," +
  "new,nike,nordstrom,npr,ny,organization,oxford,país,partners,pbs,pentagon,plc,politico,porsche,post,press," +
  "productions,r&d,regiment,retail,reuters,research,rt,sachs,school,science,scientific,securities,services,silicon," +
  "society,solutions,south,spacex,spiegel,springer,stanford,stanley,starbucks,straits,studios,sydney,synagogue," +
  "systems,target,team,tech,techcrunch,temple,tesla,the,thomson,times,toronto,toyota,trust,twitter,uber,union," +
  "united,university,usa,valley,vanguard,vice,volkswagen,volvo,vox,wall,walmart,welle,wells,who,white,wired," +
  "worldwide,works,world,wsj,york,yorker";

const TERMS_QUALIFICATIONS =
  "is,senior,associate,professor,fellow,assistant,lecturer,ceo,staff,strategist,specialist,worked,directed," +
  "correspondent,president,author,director,prof,asst,editor,analyst,degree,administrator,served,member," +
  "institute,economist,reporter,head,heads,newspaper,deputy,advocate,colonel,officer,founder,founded,visiting," +
  "journalist,former,retired,expert,executive,manager,doctoral,candidate,chief,contributor,student,blogger," +
  "chair,chairman,major,general,ambassador,phd,secretary,physicist,engineer,research,office,school,department," +
  "writer,teacher,advisor,award,center,commentator,rand,brookings,heritage,cato,un,aei,forbes,nyt,cbo";
