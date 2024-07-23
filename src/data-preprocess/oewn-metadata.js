import fs from "fs";

var dictindex = fs.readFileSync("./data/en-dict-index.json", "utf8");

var categories = ["adj.all","adj.pert","adj.ppl","adv.all","n.Tops","n.act",
    "n.animal","n.artifact","n.attribute","n.body","n.cognition","n.communication",
    "n.event","n.feeling","n.food","n.group","n.location","n.motive","n.object",
    "n.person","n.phenomenon","n.plant","n.possession","n.process","n.quantity",
    "n.relation","n.shape","n.state","n.substance","n.time","v.body","v.change",
    "v.cognition","v.communication","v.competition","v.consumption","v.contact",
    "v.creation","v.emotion","v.motion","v.perception","v.possession","v.social",
    "v.stative","v.weather"]


var dictindex = JSON.parse(dictindex);

var multiMeanings = []

for(var key of Object.keys(dictindex)){
    
    var def_count = dictindex[key].length;
    if(def_count > 40){
        multiMeanings.push({key, def_count});
    }

    // var word = dictindex[key];
    // if(word.length > 0){
    //     var category = word[0].split(".")[0];
    //     if(categories.includes(category)){
    //         categories.splice(categories.indexOf(category), 1);
    //     }
    // }
}
    

console.log(multiMeanings);