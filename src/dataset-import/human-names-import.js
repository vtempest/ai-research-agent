import fs from "fs";

/**
 * Get common first and last human names from popular baby name
 * statistics. About 2600 names in 5 categories:
 * "last", "male", "female", "neutral", "multipos"
 * multi-positional name like James Kelly Jordan Lee Kim Francis
 *
 * @returns {object} - object with name as key and type as value
 */
async function getHumanNames() {
  var enumTypes = ["last", "male", "female", "neutral", "multipos"];

  //statistic mid-ground of gender-neutral and multi-positional names
  var tolerance = 250;

  var githubRoot =
    "https://raw.githubusercontent.com/righteousgambit/quiet-riot/main/wordlists/";
  var commonNamesUrls = [
    githubRoot + "familynames-usa-top1000.txt",
    githubRoot + "malenames-usa-top1000.txt",
    githubRoot + "femalenames-usa-top1000.txt",
  ];

  var commonNames = {};
  for (var urlIndex in commonNamesUrls) {
    var url = commonNamesUrls[urlIndex];
    var response = await (await fetch(url)).text();

    response
      .split(/[\r\n]/)
      .map((name) => name[0].toUpperCase() + name.slice(1).toLowerCase())
      .forEach((name, popularity) => {
        if (!commonNames[name]) commonNames[name] = [];
        commonNames[name].push([Number(urlIndex), popularity]);
      });
  }

  var commonNamesSort = {};

  Object.entries(commonNames)
    .map(([name, popularity]) => ({ name, popularity }))
    .map(({ name, popularity }) => {
      var type;
      //if only on one list, about 2500
      if (popularity.length == 1) {
        type = popularity[0][0];
        return { name, type };
      }

      var mpop = popularity.filter(([type]) => type == 1);
      mpop = mpop.length ? mpop[0][1] : null;

      var fpop = popularity.filter(([type]) => type == 2);

      fpop = fpop.length ? fpop[0][1] : null;

      var lpop = popularity.filter(([type]) => type == 0);
      lpop = lpop.length ? lpop[0][1] : null;

      var topFirstnamePop = Math.min(mpop, fpop);
      if (topFirstnamePop && lpop) var firstLastWeight = topFirstnamePop - lpop;

      if (mpop && fpop) var genderWeight = fpop - mpop;

      if (firstLastWeight > -tolerance && firstLastWeight < tolerance)
        type = 4; //multipos
      else if (firstLastWeight > 0)
        type = 0; //last
      else if (genderWeight > -tolerance && genderWeight < tolerance)
        type = 3; //gender neutral
      else if (genderWeight > 0)
        type = 1; //male
      else type = 2; //female

      return { name, type };
    })
    .filter(Boolean)
    // .filter(({type})=>type>2)
    // .sort((a, b)=>a.name-b.name) // sort alphabetically or preserve popularity
    .forEach(({ name, type }) => {
      if (!commonNamesSort[name]) commonNamesSort[name] = [];
      commonNamesSort[name] = type;
    });

  return commonNamesSort;
}

var res = await getHumanNames();
fs.writeFileSync(
  "./human-names-data.js",
  "export default " + JSON.stringify(res)
);
