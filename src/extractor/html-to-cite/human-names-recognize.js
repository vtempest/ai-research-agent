import dataHumanNames from "./human-names-data.js";

/**
 * Validates human name from author string to check against common list of first 
 * names, last names, name affixes, and organizations to infer if it should be
 *  reversed starting by author last name in cite, since organizations are not reversed.

 * Checks against common salutations, middle parts, and titles to properly
 * format for citation in Last, First Middle format.
 * Author type is ["single", "two-author", "more-than-two", "organization"]
 * where organization is a non-human name that is not reversed.
 * @param {string} author
 * @returns {object} {author_cite, author_short, author_type}
 */
export function recognizeHumanName(author) {
  const enumAuthorTypes = [
    "single",
    "two-author",
    "more-than-two",
    "organization",
    "error",
  ];
  var authorType = 4;

  // recognize human names in author
  var names = author.split(" ").map((name) => {
    var enumTypes = ["last", "male", "female", "neutral", "multipos"];

    //standardize name as Title Case
    var nameTitle = name[0]?.toUpperCase() + name.slice(1).toLowerCase();

    //check if name is a common organization
    if (TERMS_ORG.includes(name?.toLowerCase().replace(/[^a-z]/g, "")))
       return { name, type: "org" };

    return dataHumanNames[nameTitle] != null
      ? { name, type: enumTypes[dataHumanNames[nameTitle]] }
      : { name, type: "none" };
  });
  
  var foundNameParts = names.filter(
    (name) => name.type != "none" && name.type != "org"
  ).length;

  var foundOrgParts = names.filter((name) => name.type == "org").length;

  var isTwoWord = author.split(" ").length == 2
  //determine author type - one or two or a two-word name
  if (isTwoWord
    ||foundNameParts <= 2) authorType = 0;

  if (foundNameParts > 2 && foundNameParts <= 4) authorType = 1;
  if (foundNameParts > 4) authorType = 2;

  //org or not found -- should not be reversed
  if (foundOrgParts > 0 || (foundNameParts == 0 && !isTwoWord)) authorType = 3;

  //cut off non-name intro parts like By: //TODO
  if (foundNameParts > 0 && names.length > 4) {
    var partFound;
    names = names
      .map((name) => {
        if (name.type != null) partFound = 1;
        if (partFound) return name;
        else return false;
      })
      .filter(Boolean);
  }

  author = names.map((name) => name.name).join(" ")        .replace(/(undefined|by\:|by )/gi, "")
  .replace(/(undefined|by:|by )/gi, "")
  ;

  //split author into parts and reverse Last, First if not Organization
  if (authorType == 3) {
    author_short = author;
  } else {
    var authorObj = parseName(author);
    if (authorObj) {
      author =
        authorObj.lastname +
        ", " +
        authorObj.firstname +
        " " +
        authorObj.middle;
      author = author
        .replace(/(undefined|by\:|by )/gi, "")
        .trim()
        .replace(/,$/g, "");
      var author_short = authorObj.lastname;
    }
  }

  if (!author_short) author_short = author;

  //multiple authors
  if (authorType == 2 || authorType == 1) author_short += " et al.";

  return { author_cite: author, author_short, author_type: authorType };
}

/**
 * Parses a full name into its component parts:
 * Title, Firstname, Prefix, Middle, Lastname, Honorific, Alias
 * https://en.wikipedia.org/wiki/List_of_family_name_affixes
 * @param {string} input - The full name to parse.
 * @returns {Object}
 */
const parseName = (input) => {
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
    honorific: [
      "esq",
      "esquire",
      "jr",
      "sr",
      "ii",
      "iii",
      "iv",
      "phd",
      "md",
      "ms",
      "mrs",
      "mr",
      "miss",
      "dr",
    ],
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
    if (lists.prefix.includes(parts[i].toLowerCase())) {
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
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      }
    });
  }

  return result;
};

const TERMS_ORG =
  "abc,ag,ap,academy,advisors,agency,airbnb,amazon,america,american,apple,associated,association,atlantic,attorneys,authority,axel,bank,baptiste,bbc,bertelsmann,blackrock,bloomberg,bmw,boston,broadcasting,bureau,business,buzzfeed,cambridge,capital,cbs,center,chase,chicago,china,church,citigroup,clinic,club,cnn,coca-cola,college,commission,communications,condé,consulting,corp,corps,costco,daily,department,der,deutsche,division,dow,economist,enterprises,eu,european,fabrication,facebook,fargo,ferrari,financial,ford,forbes,fox,france,fund,gannett,general,global,globe,gm,gmbh,goldman,google,group,guardian,harvard,hearst,herald,hill,holdings,home,honda,hospital,huffington,ibm,inc,industries,institute,intel,international,investments,jazeera,japan,jones,jpmorgan,lancet,laboratories,law,legal,linkedin,llc,los,ltd,manufacturing,macy's,mcdonald's,media,medical,mercedes-benz,meta,microsoft,ministry,mit,morgan,mosque,msnbc,nast,national,nato,nbc,netflix,news,newsweek,new,nike,nordstrom,npr,ny,organization,oxford,país,partners,pbs,pentagon,plc,politico,porsche,post,press,productions,r&d,regiment,retail,reuters,research,rt,sachs,school,science,scientific,securities,services,silicon,society,solutions,south,spacex,spiegel,springer,stanford,stanley,starbucks,straits,studios,sydney,synagogue,systems,target,team,tech,techcrunch,temple,tesla,the,thomson,times,toronto,toyota,trust,twitter,uber,union,united,university,usa,valley,vanguard,vice,volkswagen,volvo,vox,wall,walmart,welle,wells,who,white,wired,worldwide,works,world,wsj,york,yorker";

const TERMS_QUALIFICATIONS =
  "is,senior,associate,professor,fellow,assistant,lecturer,ceo,staff,strategist,specialist,worked,directed,correspondent,president,author,director,prof,asst,editor,analyst,degree,administrator,served,member,institute,economist,reporter,head,heads,newspaper,deputy,advocate,colonel,officer,founder,founded,visiting,journalist,former,retired,expert,executive,manager,doctoral,candidate,chief,contributor,student,blogger,chair,chairman,major,general,ambassador,phd,secretary,physicist,engineer,research,office,school,department,writer,teacher,advisor,award,center,commentator,rand,brookings,heritage,cato,un,aei,forbes,nyt,cbo";
