/**
 * Jaro-Winkler Similarity: An extension of the Jaro Similarity algorithm, which measures
 * the similarity between two strings, taking into account the common characters and
 * their positions. It is often used in record linkage and data cleansing to improve
 * the accuracy of string matching, particularly for names and addresses, by giving
 * more weight to the common prefix of the strings and penalizing longer string differences.
 * @param {string} s1 First string
 * @param {string} s2 Second string
 * @returns {number} Jaro-Winkler similarity score 
 * @category Math
 */
export function calculateSimilarityByCharacter(s1, s2) {
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
