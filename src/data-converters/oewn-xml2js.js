import fs from 'fs'
const { XMLParser } = require("fast-xml-parser");

var oewnXML = fs.readFileSync("./data/english-wordnet-2023.xml");


const parser = new XMLParser({
    ignoreAttributes : false,
    allowBooleanAttributes: true,
    attributeValueProcessor: (name, val, jPath) => {
        var o = {};

        o[name] = val;

        val = val.replace(/oewn[_-]/g, '').split("__")[0]

        return val;
    },
    tagValueProcessor: (tagName, tagValue, jPath, hasAttributes, isLeafNode) => {
        //ignore
        if ('Pronunciation'.includes(tagName)) return ;

        var o = {};
        
        o[tagName] = tagValue;

        return o;
        return o
    }

});
let jObj = parser.parse(oewnXML);

var jsstr = JSON.stringify(jObj, null, 2)
// console.log(jsstr)

fs.writeFileSync("./data/english-wordnet-2023.json", jsstr, "utf8")