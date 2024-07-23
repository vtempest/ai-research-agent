import fs from "fs";

var oewnXML = fs.readFileSync("./data/english-wordnet-2023.json", "utf8");

var wn = JSON.parse(oewnXML);

var { Synset, LexicalEntry } = wn.LexicalResource.Lexicon;

var dictionaryObj = {},
  synsetObj = {};

Synset = Synset.map((s) => {
  return {
    id: parseInt(s["@_id"]?.replace(/oewn-/g, "")),
    def: s.Definition?.Definition,
    example: s.Example?.Example,
    synonyms: s["@_members"].replace(/oewn-/g, "")?.split(" ")
      .map(syn => syn.replace(/-.$/g, "").replace(/_/g, " ")).join(", "),
    pos: s["@_partOfSpeech"],
    posType: s["@_lexfile"],
  };
});

Synset.forEach((s) => {
  var id = s.id;
  delete s.id;
  synsetObj[id] = s;
});


LexicalEntry = LexicalEntry.map((lex) => {
  return {
    writtenForm: lex.Lemma["@_writtenForm"],
    default_pos: lex.Lemma["@_partOfSpeech"],
    senses:
      lex.Sense instanceof Array
        ? lex.Sense.map((s) => {
          return parseInt(s["@_synset"].replace("oewn-", ""));
        })
        : [parseInt(lex.Sense["@_synset"].replace("oewn-", ""))],
  };
});

//concatenate all the senses of a word
LexicalEntry.forEach((lex) => {
  // var definitions = .map((s) => {
  //   // return synsetObj[s];
  // });

  dictionaryObj[lex.writtenForm.toLowerCase()] = lex.senses
});


fs.writeFileSync("./data/en-dict-defs.json", JSON.stringify(synsetObj, null, 1));
fs.writeFileSync(
  "./data/en-dict-index.json",
  JSON.stringify(dictionaryObj, null, 1)
);



/**
 * In WordNet, 's' and 'a' are both used to tag adjectives, 
's' stands for "satellite adjective"
These are relational adjectives that are synonymous to a root adjective
They are typically derived from or related to nouns
Often used to express a relation or pertaining to something
'a' adjective: "happy" (describes a state or quality)
's' adjective: "dental" (relates to teeth, derived from the noun "tooth/teeth")
 */