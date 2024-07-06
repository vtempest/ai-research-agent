import fs from "fs";


var dictIndex = fs.readFileSync("./data/en-dict-index.json", "utf8");
dictIndex = JSON.parse(dictIndex);

export default function searchDict(word) {
    let defList = dictIndex[word];
    if (!defList) {
        return false;
    }


    var dictDefinitions = fs.readFileSync("./data/en-dict-defs.json", "utf8");
    dictDefinitions = JSON.parse(dictDefinitions);

    defList = defList.map((defIndex) => {
        return dictDefinitions[defIndex];
    });



    return defList
}

console.log(searchDict("user"))
