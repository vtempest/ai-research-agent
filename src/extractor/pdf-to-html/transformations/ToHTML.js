
import Transformation from './Transformation'
import ParseResult from '../models/ParseResult'

export default class ToHTML extends Transformation {
  constructor () {
    super('To HTML', 'String')
  }
  transform (parseResult /*: ParseResult */) /*: ParseResult */ {
    parseResult.pages.forEach(page => {
      var text = ''
      page.items.forEach(block => {
        // Concatenate all words in the same block, unless it's a Table of Contents block
        let concatText
        if (block.category === 'TOC') {
          concatText = block.text
        } else {
          concatText = block.text.replace(/(\r\n|\n|\r)/gm, '\n')
        }

        // Concatenate words that were previously broken up by newline
        if (block.category !== 'LIST') {
          concatText = concatText.split('- ').join('')  
        }

        // Assume there are no code blocks in our documents
        if (block.category === 'CODE') {
          concatText = concatText.split('<code>').join('').split('</code>').join('')
        }

        text += `<p>${concatText}</p>\n\n`
      })

      page.items = [text]
    })
    return new ParseResult({
      ...parseResult,
    })
  }
}
