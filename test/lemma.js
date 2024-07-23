// Load wink-lemmatizer
var lemmatize = require( 'wink-lemmatizer' );

// Lemmatize adjectives
console.log(lemmatize.verb( 'gaming' ),
// -> 'far'
lemmatize.adjective( 'coolest' ),
// -> 'cool'
lemmatize.adjective( 'easier' ) )