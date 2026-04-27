/**
 * @fileoverview Main orchestrator for the SEEKTOPIC keyphrase extraction pipeline.
 * Coordinates cleaning, segmentation, LLM extraction, and fallback n-gram ranking.
 */
import type {
  NgramMap,
  KeyphraseEntry,
  SentenceEntry,
  SEEKTOPICOptions,
  SEEKTOPICResult,
} from "./types";
import { splitTextToSentences } from "../tokenize/text-to-sentences";
import { convertTextToTokens } from "../tokenize/text-to-topic-tokens";
import { extractNounEdgeGrams } from "./ngrams";
import { foldSubphrases } from "./fold-keyphrases";
import { weightKeyphrasesBySpecificity } from "./weight-keyphrases";
import { rankSentencesCentralToKeyphrase } from "./rank-sentences-keyphrases";
import { generateLanguageResponse } from "../agents/generate-language";
import { weighRelevanceConceptVectorMultiple } from "./vector-search";

/**
 * ### SEEKTOPIC — Keyphrase & Sentence Extraction
 *
 * Pulls the most important phrases and sentences out of any document.
 * Given raw text, it returns a ranked list of key concepts (e.g. "neural
 * network", "climate change") and, optionally, the sentences that best
 * summarise the document around those concepts.
 *
 * <img src="https://i.imgur.com/gZ4kI1V.png" width="360px" />
 *
 * **How it works — 8-step pipeline:**
 *
 * 1. **Clean** — strip HTML tags and entities.
 * 2. **Split** — break text into sentences, respecting abbreviations and URLs.
 * 3. **Topic Extraction** *(LLM Path)* — sends the first 5000 words to an LLM
 *    to extract the most descriptive key topic phrases labeling the document.
 * 4. **Vector Search** *(LLM Path)* — calculates cosine similarity embeddings
 *    for all sentences vs topic phrases, finding the top relevant sentences per topic.
 * 5. **Tokenise & Extract** *(Fallback)* — if LLM fails, identify noun-anchored
 *    n-grams (1-N words).
 * 6. **Score & Fold** *(Fallback)* — weight phrases and merge subsumed phrases.
 * 7. **Re-weight** *(Fallback)* — boost Wikipedia entities and rare domain terms.
 * 8. **TextRank** *(Fallback)* — build sentence similarity graph and run random walk.
 *
 * <video src="https://github.com/user-attachments/assets/73348d63-7671-4e20-8df9-29a13d5b0768"
 *  width="550px" controls />
 *
 * @param docText - Plain text or HTML document to analyse.
 * @param options - Optional tuning parameters (word limits, thresholds, query bias).
 * @returns
 *   - `optionSkipRanking: true` (default) → `KeyphraseEntry[]` sorted by weight.
 *   - `optionSkipRanking: false` → `SEEKTOPICResult` with `topSentences`,
 *     `keyphrases`, and the full `sentences` array.
 *
 * @example
 * // Fast: just extract keyphrases
 * const keyphrases = extractSEEKTOPIC(articleText, { phrasesModel });
 * // → [{ keyphrase: "machine learning", weight: 84 }, ...]
 *
 * @example
 * // Full: keyphrases + summary sentences, biased toward a search query
 * const { topSentences, keyphrases } = extractSEEKTOPIC(articleText, {
 *   phrasesModel,
 *   optionSkipRanking: false,
 *   heavyWeightQuery: "transformer attention",
 *   limitTopSentences: 5,
 * }) as SEEKTOPICResult;
 *
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @category Topics
 */
export async function extractSEEKTOPIC(
  docText: string,
  options: SEEKTOPICOptions = {},
): Promise<KeyphraseEntry[] | SEEKTOPICResult> {
  if (typeof docText !== "string") throw new Error("docText must be a string");

  const {
    phrasesModel,
    maxWords = 2,
    minWords = 1,
    minWordLength = 3,
    topKeyphrasesPercent = 0.5,
    limitTopSentences = 5,
    limitTopKeyphrases = 10,
    minKeyPhraseLength = 5,
    heavyWeightQuery = "",
    removeHTML = true,
    optionSkipRanking = true,
    getEnv = () => "",
  } = options;

  // ── 1. Normalize HTML ────────────────────────────────────────────────────
  let text = docText
    .replace(/</g, " <")
    .replace(/>/g, "> ")
    .replace(/&.{2,5};/g, ""); // strip &quot; &amp; &lt; &gt; &nbsp;
  if (removeHTML) text = text.replace(/<[^>]*>/g, "");

  // ── 2. Sentence segmentation ─────────────────────────────────────────────
  const sentencesArray = splitTextToSentences(text);

  // ── 3. LLM Topic Extraction (Starting Step) ──────────────────────────────
  const first5kWords = text.split(/\s+/).slice(0, 5000).join(" ");
  const llmPrompt = `Extract the 5-10 most important key topic phrases that best 
  label this document. Return exclusively a comma-separated list of the key topic 
  phrases. Document text: ${first5kWords}`;

  let llmTopics: string[] = [];
  try {
    const aiResponse = await generateLanguageResponse({
      query: llmPrompt,
      provider: getEnv("LLM_PROVIDER") || "openai",
      apiKey: getEnv("LLM_API_KEY") || getEnv("OPENAI_API_KEY") || "dummy",
    });
    if (aiResponse.content && !aiResponse.error) {
      llmTopics = aiResponse.content
        .split(",")
        .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    }
  } catch (e) {
    console.error("LLM topic extraction failed", e);
  }

  // ── 4. Use vector-search.ts for top topic sentences ──────────────────────
  if (llmTopics.length > 0) {
    if (optionSkipRanking) {
      return llmTopics.map((topic: string) => ({
        keyphrase: topic,
        sentences: [],
        words: topic.split(/\s+/).length,
        weight: 100,
      }));
    }

    const { limitTopSentences = 3 } = options;
    const allRelevant = await weighRelevanceConceptVectorMultiple(
      sentencesArray,
      llmTopics,
      options,
    );

    const keyphraseObjects: any[] = [];
    const topSentences: any[] = [];

    for (const topic of llmTopics) {
      // @ts-ignore
      const topicRelevant = allRelevant[topic] || [];
      const topX = topicRelevant.slice(0, limitTopSentences);

      const topicSentences = topX.map((r: any) => ({
        text: r.content,
        similarity: r.similarity,
      }));

      keyphraseObjects.push({
        keyphrase: topic,
        topSentences: topicSentences,
        words: topic.split(/\s+/).length,
        weight: 100,
      });

      for (const r of topX) {
        const sIdx = sentencesArray.indexOf(r.content);
        topSentences.push({
          text: r.content,
          index: sIdx !== -1 ? sIdx : 0,
          keyphrases: [{ keyphrase: topic, weight: r.similarity }],
          weight: r.similarity,
        });
      }
    }

    // Deduplicate topSentences
    const uniqueSentences = Array.from(
      new Map(topSentences.map((s: any) => [s.text, s])).values(),
    );

    return {
      topSentences: uniqueSentences.sort(
        (a: any, b: any) => b.weight - a.weight,
      ),
      keyphrases: keyphraseObjects,
      sentences: sentencesArray,
    } as unknown as SEEKTOPICResult;
  }

  // ── FALLBACK: Tokenise + extract n-grams ─────────────────────────────────
  const nGrams: NgramMap = {};
  const sentenceKeysMap: SentenceEntry[] = [];

  for (let idx = 0; idx < sentencesArray.length; idx++) {
    const sentence = sentencesArray[idx];
    const tokens = convertTextToTokens(sentence, { phrasesModel });

    sentenceKeysMap.push({
      text: sentence,
      index: idx,
      keyphrases: [],
      weight: 0,
    });

    for (let i = 0; i < tokens.length; i++) {
      for (let n = minWords; n <= maxWords; n++) {
        extractNounEdgeGrams(n, tokens, i, nGrams, minWordLength, idx);
      }
    }
  }

  // ── 5. Score raw keyphrases ───────────────────────────────────────────────
  let keyphraseObjects: KeyphraseEntry[] = [];
  for (let n = minWords; n <= maxWords; n++) {
    if (!nGrams[n]) continue;
    for (const [keyphrase, sentencesArr] of Object.entries(nGrams[n])) {
      keyphraseObjects.push({
        keyphrase,
        sentences: sentencesArr,
        words: n,
        weight: sentencesArr.length * n,
      });
    }
  }

  // ── 6. Fold subphrases + deduplicate ──────────────────────────────────────
  const folded = foldSubphrases(keyphraseObjects);
  const seen = new Set<string>();
  keyphraseObjects = folded
    .sort((a, b) => b.weight - a.weight)
    .filter((k) => !seen.has(k.keyphrase) && seen.add(k.keyphrase))
    .map((k) => ({
      ...k,
      sentences: Array.isArray(k.sentences)
        ? [...new Set(k.sentences as number[])]
        : k.sentences,
    }));

  // ── 7. IDF + wiki-entity + heavy-query weighting ─────────────────────────
  keyphraseObjects = weightKeyphrasesBySpecificity(
    keyphraseObjects,
    phrasesModel,
    heavyWeightQuery,
  )
    .filter((k) => k.keyphrase.length > minKeyPhraseLength)
    .sort((a, b) => b.weight - a.weight);

  // Fast path: return keyphrases without TextRank
  if (optionSkipRanking) return keyphraseObjects;

  // ── 8. Attach keyphrases to sentences ────────────────────────────────────
  for (const { keyphrase, sentences, weight } of keyphraseObjects) {
    if (Array.isArray(sentences)) {
      for (const si of sentences) {
        sentenceKeysMap[si as number]?.keyphrases.push({ keyphrase, weight });
      }
    }
  }

  // ── 9. TextRank ───────────────────────────────────────────────────────────
  const ranked = rankSentencesCentralToKeyphrase(sentenceKeysMap);

  const topSentences = (ranked ?? [])
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limitTopSentences)
    .map((s) => ({
      ...s,
      keyphrases: [...new Set(s.keyphrases.map((k) => k.keyphrase))],
    }));

  const keyphrases = keyphraseObjects.slice(0, limitTopKeyphrases).map((k) => ({
    ...k,
    sentences: Array.isArray(k.sentences) ? k.sentences.join(",") : k.sentences,
  }));

  return { topSentences, keyphrases, sentences: sentencesArray };
}
