import {  getLanguageFromIPRemoteAPI } from "../src/search/ip-to-lang.js";

for (let i = 0; i < 3; i++) {
  const ip =
    Math.floor(1 + Math.random() * 254) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    ".0";
  //join the values of the object
  console.log( await getLanguageFromIPRemoteAPI(ip));
}
