var test = [
  "<h2>  Provided proper attribution is provided, Google hereby grants permission to reproduce the tables and figures in this paper solely for use in journalistic or scholarly works.",
  "</h2>      <h1>  Attention Is All You Need  </h1>      <p>  Ashish Vaswani    <p>  Google Brain  </p>     <p>  avaswani@google.com  </p>     <p>  Noam Shazeer    <p>  Google Brain  </p>     <p>  noam@google.com  </p>     <p>  Niki Parmar    <p>  Google Research  </p>     <p>  nikip@google.com  </p>     <p>  Jakob Uszkoreit    <p>  Google Research  </p>     <p>  usz@google.com  </p>     <p>  Llion Jones    <p>  Google Research  </p>     <p>  llion@google.com  </p>     <p>  Aidan N. Gomez    <p>  University of Toronto  </p>     <p>  aidan@cs.toronto.edu  </p>     <p>  Łukasz Kaiser    <p>  Google Brain  </p>     <p>  lukaszkaiser@google.com  </p>     <p>  Illia Polosukhin    <p>  illia.polosukhin@gmail.com  </p>   <h2>  Abstract  </h2>      <p>  The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.",
  "The best performing models also connect the encoder and decoder through an attention mechanism.",
  "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
  "Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.",
  "Our model achieves 28.4 BLEU on the WMT 2014 Englishto-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.",
  "On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature.",
  "We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.",
  "</p>  Equal contribution.",
  "Listing order is random.",
  "Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea.",
  "Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work.",
  "Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail.",
  "Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor.",
  "Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations.",
  "Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research.",
  "</p>  Work performed while at Google Brain.",
  "</p>  Work performed while at Google Research.",
  "31st Conference on Neural Information Processing Systems (NIPS 2017), Long Beach, CA, USA.",
  "</p>     <h1>  arXiv:1706.03762v7 [cs.CL] 2 Aug 2023 [ 1 ] 1 Introduction  </h2>      <p>  Recurrent neural networks, long short-term memory [ 13 ] and gated recurrent [ 7 ] neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation [ 35 , 2 , 5 ].",
  "Numerous efforts have since continued to push the boundaries of recurrent language models and encoder-decoder architectures [38, 24, 15].",
  "Recurrent models typically factor computation along the symbol positions of the input and output sequences.",
  "Aligning the positions to steps in computation time, they generate a sequence of hidden states h , as a function of the previous hidden state h and the input for position t .",
  "This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples.",
  "Recent work has achieved significant improvements in computational efficiency through factorization tricks [ 21 ] and conditional computation [ 32 ], while also improving model performance in case of the latter.",
  "The fundamental constraint of sequential computation, however, remains.",
];
var test2 =[
"Terms used in them frequently overlap the terms in other sentences.",
`Tesla is reportedly facing a lawsuit from vehicle owners claiming the company monopolizes repairs and parts, resulting in high prices and long wait times.
There are rumors about Tesla's upcoming Full Self-Driving (FSD) suite rollout. An Xpeng executive has commented on what might be Tesla's biggest challenge in this area.
Tesla's Giga Berlin factory had a World War II bomb discovered near its property, which is scheduled to be detonated.
The next hearing on Elon Musk 's pay package is set for July 8, 2024. This hearing will not consider the Tesla shareholder vote.
Tesla, along with Rivian and Polestar, reportedly performed poorly in J.D. Power's Initial Quality Study for 2024.
There are ongoing developments regarding Tesla's Supercharger installations in Sweden, which continue despite union efforts to stop the company.
`
]


import WikiEntityRecognition from "../src/wiki-entity-recognition.js";

function wer() {
  var text = test.join(" ");
  var entities = WikiEntityRecognition(text);
  console.log(entities);
}

wer();
