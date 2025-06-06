/**
 * Splits text into sentences, handling 220+ common abbreviations,
 * and infering acronyms, numbers, URLs, times, names, etc.
 *
 * @param {string} inputText - The text to be split into sentences.
 * @param {Object} [options]
 * @param {boolean} options.splitOnHtmlTags default=true - Split on HTML tags like P, DIV, UL, OL.
 * @param {number} options.minSize default=20 - Minimum size for a sentence.
 * @param {number} options.maxSize default=600 - Maximum size for a sentence.
 * @returns {Array<string>} An array of sentences.
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @category Topics
 */
export function splitSentences(inputText, options = {}) {
  const { splitOnHtmlTags = true, minSize = 20, maxSize = 500 } = options;

  const LINEBREAK_MARKER = " @~@ ";
  const LINEBREAK_MARKER_TRIMMED = LINEBREAK_MARKER.trim();

  const NON_EMPTY_REGEX = /\S/;
  const LINEBREAK_BOUNDARY_REGEX = /\n+|[-#=_+*]{4,}/g;
  const WORD_TOKENIZE_REGEX = /\S+|\n/g;

  // Validate input
  if (
    !inputText ||
    typeof inputText !== "string" ||
    !inputText.length ||
    !NON_EMPTY_REGEX.test(inputText)
  ) {
    return [];
  }

  // Preprocess text
  let processedText = inputText;
  processedText = processedText.replace(
    LINEBREAK_BOUNDARY_REGEX,
    LINEBREAK_MARKER
  );
  if (splitOnHtmlTags) {
    const htmlTagsToSplit = ["p", "div", "ul", "ol"];
    const htmlSplitRegex = new RegExp(
      `(<br\\s*\\/?>|<\\/(${htmlTagsToSplit.join("|")})>)`,
      "g"
    );
    processedText = processedText.replace(
      htmlSplitRegex,
      `$1${LINEBREAK_MARKER}`
    );
  }

  // Tokenize text
  const tokens = processedText.trim().match(WORD_TOKENIZE_REGEX);

  if (!tokens || !tokens.length) {
    return [];
  }

  // Detect sentence boundaries
  const sentenceGroups = [];
  let currentGroup = [];
  let wordCounter = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    wordCounter++;
    currentGroup.push(token);

    if (token.includes(",")) {
      wordCounter = 0;
    }

    if (
      [".", "!", "?"].includes(token) ||
      hasEndPunctuation(token, "?!") ||
      token === LINEBREAK_MARKER_TRIMMED
    ) {
      if (token === LINEBREAK_MARKER_TRIMMED) {
        currentGroup.pop();
      }

      sentenceGroups.push(currentGroup);
      currentGroup = [];
      wordCounter = 0;
      continue;
    }

    if (hasEndPunctuation(token, '"') || hasEndPunctuation(token, "'")) {
      tokens[i] = token.slice(0, -1);
    }

    if (hasEndPunctuation(token, ".")) {
      if (i + 1 < tokens.length) {
        // Handle special cases for periods
        if (token.length === 2 && isNaN(token.charAt(0))) {
          continue;
        }

        if (isInCommonAbbreviationList(token)) {
          continue;
        }

        if (isBeginsNewSentence(tokens[i + 1])) {
          if (isAbbreviatedTime(token, tokens[i + 1])) {
            continue;
          }

          if (isAbbreviatedName(wordCounter, tokens.slice(i, i + 6))) {
            continue;
          }

          if (isNumeric(tokens[i + 1])) {
            if (isCustomAbbreviation(token)) {
              continue;
            }
          }
        } else {
          if (token.endsWith("..")) {
            continue;
          }

          if (isComplexAbbreviation(token)) {
            continue;
          }

          if (isAbbreviatedName(wordCounter, tokens.slice(i, i + 5))) {
            continue;
          }
        }
      }

      sentenceGroups.push(currentGroup);
      currentGroup = [];
      wordCounter = 0;
      continue;
    }

    const periodIndex = token.indexOf(".");
    if (periodIndex > -1) {
      if (isNumeric(token, periodIndex)) {
        continue;
      }

      if (isComplexAbbreviation(token)) {
        continue;
      }

      if (isValidUrl(token) || isPhoneNumber(token)) {
        continue;
      }
    }

    const boundaryIndex = token.search(/[.!?]/);
    if (boundaryIndex > -1 && boundaryIndex < token.length - 1) {
      const nextChar = token.charAt(boundaryIndex + 1);
      if (nextChar.match(/[a-zA-Z]/)) {
        const splitResult = [
          token.slice(0, boundaryIndex + 1),
          token.slice(boundaryIndex + 1),
        ];

        currentGroup.pop();
        currentGroup.push(splitResult[0]);
        sentenceGroups.push(currentGroup);
        currentGroup = [splitResult[1]];
        wordCounter = 0;
      }
    }
  }

  if (currentGroup.length) {
    sentenceGroups.push(currentGroup);
  }

  // Post-process sentence groups
  const finalResult = sentenceGroups
    .filter((group) => group.length > 0)
    .reduce((output, group, index) => {
      if (index === 0) {
        output.push(group);
        return output;
      }

      const previousGroup = output[output.length - 1];

      // Check for short abbreviations that might have been split incorrectly
      if (
        previousGroup.length === 1 &&
        /^.{1,2}[.]$/.test(previousGroup[0]) &&
        !/[.]/.test(group[0])
      ) {
        output[output.length - 1] = previousGroup.concat(group);
      } else {
        output.push(group);
      }

      return output;
    }, []);

  // Join tokens back into sentences and apply size constraints
  return finalResult
    .map((group, index) => {
      let sentence = group.join(" ");

      // Apply minSize and maxSize constraints
      if (sentence.length < minSize) {
        // If the sentence is too short, combine it with the next one if possible
        if (index < finalResult.length - 1) {
          finalResult[index + 1] = group.concat(finalResult[index + 1]);
          return null;
        }
      } else if (sentence.length > maxSize) {
        // If the sentence is too long, split it at the last punctuation mark before maxSize
        const lastPunctuation = sentence.lastIndexOf(".", maxSize);
        if (lastPunctuation === -1) return sliceIntoChunks(sentence, maxSize);
        if (lastPunctuation > minSize) {
          finalResult.splice(
            index + 1,
            0,
            sentence
              .slice(lastPunctuation + 1)
              .trim()
              .split(" ")
          );
          return sentence.slice(0, lastPunctuation + 1);
        }
      }

      return sentence;
    })
    .flat()
    .filter(Boolean); // Remove null entries from combining short sentences
}

function sliceIntoChunks(str, maxSize) {
  const chunks = [];
  let startIndex = 0;

  while (startIndex < str.length) {
    let endIndex = startIndex + maxSize;

    if (endIndex < str.length) {
      // Look for the last space within the last 20 characters
      let lastSpaceIndex = str.lastIndexOf(" ", endIndex);
      let searchStartIndex = Math.max(startIndex, endIndex - 20);

      if (lastSpaceIndex >= searchStartIndex) {
        endIndex = lastSpaceIndex;
      }
    } else {
      endIndex = str.length;
    }

    chunks.push(str.slice(startIndex, endIndex).trim());
    startIndex = endIndex + 1; // Skip the space
  }

  return chunks;
}

/**
 * Checks if a word ends with a specific character or characters.
 * @param {string} word - The word to check.
 * @param {string} char - The character(s) to check for at the end of the word.
 * @private
 * @returns {boolean} True if the word ends with the specified character(s), false otherwise.
 */
function hasEndPunctuation(word, char) {
  return char.length > 1
    ? char.includes(word.slice(-1))
    : word.slice(-1) === char;
}

/**
 * Checks if a string is capitalized or a number.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is capitalized or a number, false otherwise.
 * @private
 */
function isCapitalizedOrNumeric(str) {
  return /^[A-Z][a-z].*/.test(str) || isNumeric(str);
}

/**
 * Checks if a string is likely to begin a new sentence.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is likely to begin a new sentence, false otherwise.
 * @private
 */
function isBeginsNewSentence(str) {
  return isCapitalizedOrNumeric(str) || /``|"|'/.test(str.substring(0, 2));
}

/**
 * Checks if a word is in the list of 222 common abbreviations for various categories
 * @param {string} str - the word to check, which gets cleaned and lowercased
 * @returns {boolean} if the string is a common abbreviation
 * @private
 */
function isInCommonAbbreviationList(str) {
  const COMMON_ABBR_LIST = (
    "adj,adm,adv,al,ala,alta,apr,arc,ariz,ark,art,assn,asst,attys,aug,ave,ba," +
    "bart,bld,bldg,blvd,brig,bros,bsc,btw,cal,calif,capt,cc,cell,ch,cl,cmdr,co,col,colo,comdr,con," +
    "conn,corp,cpl,cres,ct,dak,dec,del,dem,dept,det,dist,dphil,dr,drs,ed,eg,ens,eq,eqs,esp,esq,est," +
    "etc,ex,exp,expy,ext,feb,fed,fig,figs,fla,fri,ft,fwy,fy,ga,gen,gov,hon,hosp,hr,hrs,hway,hwy,ia,id," +
    "ida,ie,ill,inc,ind,ing,insp,is,jan,jr,jul,jun,kan,kans,ken,kg,km,kmph,ky,la,lt,ltd,ma,maj,man," +
    "mar,mass,may,md,me,med,messrs,mex,mfg,mi,mich,min,minn,miss,mlle,mm,mme,mo,mol,mont,mr,mrs,ms," +
    "msc,msgr,mssrs,mt,mtn,neb,nebr,nev,no,nos,nov,nr,oct,ok,okla,ont,op,ord,ore,p,pa,pd,pde,penn," +
    "penna,pfc,ph,phd,pl,plz,pop,pp,prof,pvt,que,rd,ref,refs,rep,repr,reps,res,rev,rs,rt,sask,sat," +
    "sec,secs,sen,sens,sep,sept,sfc,sgt,sr,st,sun,supt,surg,tce,tenn,tex,th,thu,thur,thurs,trans,tu," +
    "tue,tues,univ,us,usafa,ut,v,va,ver,viz,vol,vs,vt,wash,wed,wis,wisc,wy,wyo"
  ).split(",");

  const cleaned = str
    .toLowerCase()
    .replace(/[-'`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, "");
  return COMMON_ABBR_LIST.includes(cleaned);
}

/**
 * Checks if a word is an abbreviated time (a.m. or p.m.) followed by 'day'.
 * @param {string} word - The current word.
 * @param {string} nextWord - The next word in the sequence.
 * @returns {boolean} True if it's an abbreviated time followed by 'day', false otherwise.
 * @private
 */
function isAbbreviatedTime(word, nextWord) {
  if (word === "a.m." || word === "p.m.") {
    const nextWordEnd = nextWord.replace(/\W+/g, "").slice(-3).toLowerCase();
    return nextWordEnd === "day";
  }
  return false;
}

/**
 * Checks if a word or phrase is a complex abbreviation.
 * @param {string} word - The word or phrase to check.
 * @returns {boolean} True if it's a complex abbreviation, false otherwise.
 * @private
 */
function isComplexAbbreviation(word) {
  // Check for common multi-part abbreviations like U.S. or U.K.
  if (/^([A-Za-z]\.){2,}[A-Za-z]?\.?(\s*\([^)]+\))?$/.test(word)) {
    return true;
  }

  const cleaned = word.replace(/[\(\)\[\]\{\}]/g, "");
  const matches = cleaned.match(/(.\.)*/);
  return matches && matches[0].length > 0;
}

/**
 * Checks if a string is a custom abbreviation (short or capitalized).
 * @param {string} str - The string to check.
 * @returns {boolean} True if it's a custom abbreviation, false otherwise.
 * @private
 */
function isCustomAbbreviation(str) {
  return str.length <= 3 || isCapitalizedOrNumeric(str);
}

/**
 * Checks if a sequence of words represents an abbreviated name.
 * @param {number} wordCount - The current word count in the sentence.
 * @param {string[]} words - A sequence of words to check.
 * @returns {boolean} True if the sequence represents an abbreviated name, false otherwise.
 * @private
 */
function isAbbreviatedName(wordCount, words) {
  if (words.length > 0) {
    if (
      wordCount < 5 &&
      words[0].length < 6 &&
      isCapitalizedOrNumeric(words[0])
    ) {
      return true;
    }
    const capitalizedCount = words.filter((str) =>
      /[A-Z]/.test(str.charAt(0))
    ).length;
    return capitalizedCount >= 3;
  }
  return false;
}

/**
 * Checks if a string is numeric, optionally starting from a specific position.
 * @param {string} str - The string to check.
 * @param {number} [startPos] - The position to start checking from.
 * @returns {boolean} True if the string is numeric, false otherwise.
 * @private
 */
function isNumeric(str, startPos) {
  if (startPos != null) {
    str = str.slice(startPos - 1, startPos + 2);
  }
  return !isNaN(str);
}

/**
 * Checks if a string matches a phone number pattern.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string matches a phone number pattern, false otherwise.
 * @private
 */
function isPhoneNumber(str) {
  return new RegExp(
    "^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8]" +
      "[02-9])\\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)?([2-9]1" +
      "[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?" +
      "|extension)\\s*(\\d+))?$"
  ).test(str);
}

/**
 * Checks if a string is a valid URL.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is a valid URL, false otherwise.
 * @private
 */
function isValidUrl(str) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
    str
  );
}
