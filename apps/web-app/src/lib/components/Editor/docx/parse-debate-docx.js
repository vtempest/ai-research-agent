import { documentToTokens, documentToMarkup } from "./docx-to-html";
import { extractCards } from "./parse-cards";
import { tokensToMarkup } from "./docx-tokens";

/**
 * Convert Debate docx to .args format: Annotated Research Graph Summaries
 * @param {string} docxPath 
 */
export async function parseDebateDocx(docxPath, options= {}) {
  var {
    outputSingleHTMLDoc = true
  } = options;

  var tokens = await documentToTokens(docxPath);

  if (!tokens) return;

  var cards = await extractCards(tokens);
  var outline = [];
  cards = cards
    .map((card, index) => {
      var { section, block, author, year, analytic, content, summary, ranges } =
        card;

      var lastSection = outline.length ? outline[outline.length - 1] : 0;

      //push section into outline if needed
      if (!lastSection || lastSection.section != section)
        outline.push({ section, blocks: [] });

      var lastSectionsBlocks = outline[outline.length - 1].blocks;
      var lastBlock = lastSectionsBlocks.length
        ? lastSectionsBlocks[lastSectionsBlocks.length - 1]
        : 0;

      //add new block if it has different block name than prior
      if (!lastBlock || lastBlock.block != block)
        outline[outline.length - 1].blocks.push({ block, cards: [] });


      content = content && content.length ? content : "";
      
      //compute hash
      var domain = card.url?.match(
        /http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2}))(?:$|\/)/i
      );
      domain = domain ? domain[1] : "";
      var cardhash =
        (domain ? domain + "_" : "") 
        //(title ? title.substring(0, 32) : content?.substring(0, 32));

      cardhash = cardhash?.replace(/[^0-9A-Za-z_]/gi, "");

      cardhash =
        (author ? author.replace(/[^0-9A-Za-z]/gi, "") : domain) +
        (year ? year.toString().slice(-2) : "") +
        "_" +
        cardhash;

      //card text length without <u> tags

      var plaintext = content ? content.replace(/<\/[^>]+(>|$)/g, "") : "";
      var textLength = plaintext.length.toString();
      cardhash = cardhash.substring(0, 32 - textLength?.length) + content.length;



      var lastBlocksCards =
        outline[outline.length - 1].blocks[
          outline[outline.length - 1].blocks.length - 1
        ].cards;

      //combine analytic with prior analytics or add it to outline
      if (analytic) {
        if (
          lastBlocksCards.length &&
          lastBlocksCards[lastBlocksCards.length - 1].analytic
        )
          lastBlocksCards[lastBlocksCards.length - 1].analytic =
            lastBlocksCards[lastBlocksCards.length - 1].analytic +
            "<p>" +
            analytic +
            "</p>";
        else lastBlocksCards.push({ analytic });
      }
      //insert card id into block
      else lastBlocksCards.push({ summary, hash: cardhash, quote: ranges?.mt || ""  });

      var cardOutput = {};
      Object.assign(cardOutput, {
        hash: cardhash,
      });

      delete card.section;
      Object.assign(cardOutput, card);

      //return cards except for analytics
      return analytic ? false : cardOutput;
    })
    .filter(Boolean);

  var fileTitle = docxPath instanceof String ? docxPath.split("/").pop().replace(".docx", "") : "";


  var evCollection = {
    fileTitle,
    outline,
    cards,
  };

  console.log ( JSON.stringify( outline ))
  return outputSingleHTMLDoc ?
    outlineToHTML(evCollection) : evCollection;
}

function outlineToHTML(evCollection) {

  var { fileTitle, fileDate, outline, cards } = evCollection;

  var outlineHTML = outline
    .map((section) => {
      var blocksHTML = section.blocks
        .map((block) => {
          var cardsHTML = block.cards
            .map((card) => {
              var { hash, summary, quote, analytic } = card;
              if (analytic)
                return `<div class="shortcite">${analytic}</div>`
              
              var cardData = cards.filter((c) => c.hash == hash)[0];
              if (!cardData) return ''

              var { section, block, author, year, analytic, content, summary, ranges } =
              cardData;
              return `<div class="card" id="${hash}">`+
                `<h4>${summary}</h4> `+
                ` <div class="shortcite">${cardData?.author} ${cardData?.year} </div>`+

                `<p>${cardData?.cite}</p>`+
                `<p>${cardData?.html}</p></div>`;
                ;
            })
            .join("");

          return `<h3>${block.block || ""}</h3>${cardsHTML}`;
        })
        .join("");
      return `<h1>${section.section|| ""}</h1>${blocksHTML}`;
    })
    .join("");

  return outlineHTML;

}