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
    posType: s["@_lexfile"].split(".")[1],
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
