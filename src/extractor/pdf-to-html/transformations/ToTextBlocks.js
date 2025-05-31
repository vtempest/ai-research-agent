import Transformation from './Transformation'
import ParseResult from '../models/ParseResult'
import BlockType from '../models/BlockType'

export default class ToTextBlocks extends Transformation {
  constructor () {
    super('To Text Blocks', 'TextBlock')
  }

  transform (parseResult /*: ParseResult */) /*: ParseResult */ {
    parseResult.pages.forEach(page => {
      const textItems = []
      page.items.forEach(block => {
        // TODO category to type (before have no unknowns, have paragraph)
        const category = block.type ? block.type.name : 'Unknown'
        textItems.push({
          category: category,
          text: BlockType.blockToText(block),
        })
      })
      page.items = textItems
    })
    return new ParseResult({
      ...parseResult,
    })
  }
}
