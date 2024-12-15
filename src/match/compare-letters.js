/**
 * ### Jaro-Winkler String Similarity Comparison
 * <img width="350px"  src="https://i.imgur.com/1qpRzNh.png" /> 
 * 
 * Measures similarity between two strings, taking into account the common characters and
 * their positions. Jaro-Winkler is often used in record linkage and data cleansing to improve
 * the accuracy of string matching, particularly for names and addresses, by giving
 * more weight to the common prefix and penalizing longer string differences.  It is [more 
 * optimal](https://medium.com/@appaloosastore/string-similarity-algorithms-compared-3f7b4d12f0ff) 
 * for words than [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance):
 * 1. Edit operations: Levenshtein considers insertions, deletions, and substitutions, 
 * while Jaro focuses on transpositions.
 * 2. Sensitivity to string length: Levenshtein is more sensitive to overall 
 * string length, while Jaro normalizes for length in its formula.
 * 3. Prefix matching: The Jaro-Winkler variant explicitly rewards matching 
 * prefixes, which Levenshtein does not.
 * 4. Scale of results: Levenshtein produces an edit distance (usually converted to a similarity score), 
 * while Jaro directly produces a similarity score.
 * 
 * [A Comprehensive List of Similarity Search 
 * Algorithms](https://crucialbits.com/blog/a-comprehensive-list-of-similarity-search-algorithms/)
 * @author [Jaro, M., Winkler, W. (1990)](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)
 * @param {string} s1 First string
 * @param {string} s2 Second string
 * @returns {number} 0-1 string similarity score 
 * @category Match
 */
export function weighSimilarityByCharacter(s1, s2) {

  if (s1 === s2) return 1;

  if (s1.length > s2.length) [s1, s2] = [s2, s1];

  const matchDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;

  const s1Matches = new Array(s1.length).fill(false);
  const s2Matches = new Array(s2.length).fill(false);
  let matchCount = 0;

  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, s2.length);

    for (let j = start; j < end; j++) {
      if (!s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = s2Matches[j] = true;
        matchCount++;
        break;
      }
    }
  }

  if (matchCount === 0) return 0;

  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[k]) k++;
      if (s1[i] !== s2[k]) transpositions++;
      k++;
    }
  }
  transpositions = Math.floor(transpositions / 2);

  const jaro =
    (matchCount / s1.length +
      matchCount / s2.length +
      (matchCount - transpositions) / matchCount) /
    3;

  let commonPrefix = 0;
  for (let i = 0; i < Math.min(s1.length, s2.length, 4); i++) {
    if (s1[i] === s2[i]) commonPrefix++;
    else break;
  }

  return jaro + commonPrefix * 0.1 * (1 - jaro);
}
