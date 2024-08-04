import { describe, it, expect } from 'vitest';
import {weighTopicDistributionLDA} from ".."

describe('topic distribution Test', () => {
  // Function to generate a random collection of documents
  function generateRandomCollection(numSets, numDocsPerSet) {
    const quotes = [
      "The only way to do great work is to love what you do.",
      "In three words I can sum up everything I've learned about life: it goes on.",
      "To be or not to be, that is the question.",
      "I have a dream that one day this nation will rise up.",
      "Ask not what your country can do for you, ask what you can do for your country.",
      "That's one small step for man, one giant leap for mankind.",
      "Be the change you wish to see in the world.",
      "I think, therefore I am.",
      "The unexamined life is not worth living.",
      "Two roads diverged in a wood, and I took the one less traveled by.",
      "To err is human; to forgive, divine.",
      "All that glitters is not gold.",
      "It is during our darkest moments that we must focus to see the light.",
      "Life is what happens to you while you're busy making other plans.",
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      "The only impossible journey is the one you never begin.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "Believe you can and you're halfway there.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "It does not matter how slowly you go as long as you do not stop.",
      "You miss 100% of the shots you don't take.",
      "Strive not to be a success, but rather to be of value.",
      "The best way to predict the future is to invent it.",
      "If you want to lift yourself up, lift up someone else.",
      "You must be the change you wish to see in the world."
    ];

    return Array.from({ length: numSets }, () => 
      Array.from({ length: numDocsPerSet }, () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return Math.random() < 0.9 ? quotes[randomIndex] : (Math.random() < 0.5 ? "" : null);
      })
    );
  }

  it('should process various document collections consistently', () => {
    const collection = generateRandomCollection(10, 5);
    const numTopics = 3
    const numTerms = 2;

    collection.forEach((documents, index) => {
      console.log(`\nTesting document set ${index + 1}:`);
      console.log("Documents:", documents);

      const results = weighTopicDistributionLDA(documents, numTopics, numTerms, null, null, null, 123);

      console.log("LDA Results:");
      results.forEach((topic, topicIndex) => {
        console.log(`  Topic ${topicIndex + 1}:`);
        topic.forEach(term => {
          console.log(`    Term: ${term.term}, Probability: ${term.probability}`);
        });
      });

      // Verifications
      expect(results).toHaveLength(numTopics);
      results.forEach(topic => {
        const sum = topic.reduce((acc, term) => acc + term.probability, 0);
        expect(sum).toBeDefined();
        topic.forEach(term => {
        });
      });
    });
  });
});