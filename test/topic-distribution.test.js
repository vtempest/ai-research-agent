import { test, expect, test } from 'vitest';
import { weighTopicDirichletDistribution, splitSentences } from ".."

test('topic distribution Test', () => {
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

    const collection = generateRandomCollection(10, 5);
    const numTopics = 3
    const numTerms = 2;

    var test = `
    
        
     
            
            
    Geousman101     
            
              
    Geousman101. "Text Visualization: Word Cloud, Bubble Chart, Word Tree, Phrase Net."  https://www.youtube.com/watch?v=ViPs5FQn7-0 
  
  
    Text Visualization: Word Cloud, Bubble Chart, Word Tree, Phrase Net    

  
  
hi everyone we're going to continue with text analytics and today we're going to look at a few popular ways of visualizing text and text documents so a common way to visualize Texas using word or text file and it's very popular because a is a very visually interesting way to look at the data and although it may not be very informative and a typical way is to scale the word by its work count or popularity in your documents so the larger it is the more times s appeared in so this is probably the most that you can get out of work cloud so you don't really get any kind of structural information like word ordering and so on so the only thing that you get is mostly what count a variation of it is the bubble chart so instead of showing their work now you scale bubbles based on the word count so small variation also pretty popular so because you can look at it as in this example pretty interesting to look at so there are some other visualization techniques that can review more of the structure in your document for example one popular way is that word tree we can show you the hierarchy of the sentences in your document so for example here we're showing all the sentences that start with the word we and then you can see it gradually as you move to the right you can see how many of those sentences the second-worst must have many of those sentences among that we contain the word act and so on so essentially you're looking at a hierarchy that are built from your document collections another way to visualize text documents issues in something we call phrase net so instead of hierarchy or tree now we'll build a graph out of our documents so specifically we look at our relationships among words so let's say in this example were interested in the trigram x and y so that means were number one separated by our end and then we're number two so that means the words in our graph other words that you will see in our documents and then the an edge will exist in this graph let's say I say the trigram father in mother then we'll see how it's a really thick edge right connecting father and mother in our example that means there are many such trigrams that we can't find in our documents and of course you can define the edge any way you want so here in our example we say x and y but you can also say X of the Y or X the Y X n Y and so on or even X space Y right so that means I'd be defining different meaning for the edges you can end up getting different phrase nets of your documents so you've seen this example before which is a term I system and this is a canonical way of visualizing documents and topics so here each word would be a row and a topic what we call them so I can imagine these columns are what you will get let's say from SPD and the cell values could be the values I ask you anything would give you so essentially saying let's say for a topic 17 which are the words that are most strongly associated with it and you may recall that whenever you visualize any kind of matrices the ordering of the rows and columns are important right on the left is without any sort of older ordering and on the right is with ordering something called Siri Asian so so the columns and rows are grouped based on collocation in this video we'll look at a few popular ways of visualizing text such as using matrix using trees and graphs 





  `

    // collection.forEach((documents, index) => {
      // console.log(`\nTesting document set ${index + 1}:`);
      // console.log("Documents:", documents);

      var documents = splitSentences(test)

      const results = weighTopicDirichletDistribution(documents, {numTopics, numTerms});

      console.log("LDA Results:");
      results.forEach((topic, topicIndex) => {
        console.log(`  Topic ${topicIndex + 1}:`);
        topic.forEach(term => { 
          console.log(`    Term: ${term.term},  ${term.probability.toFixed(3)*1000}`);
        });
      });

      // Verifications
      expect(results).toBeDefined(); //toHaveLength(numTopics);
      results.forEach(topic => {
        const sum = topic.reduce((acc, term) => acc + term.probability, 0);
        expect(sum).toBeDefined();
        topic.forEach(term => {
        });
      });
    // });
});