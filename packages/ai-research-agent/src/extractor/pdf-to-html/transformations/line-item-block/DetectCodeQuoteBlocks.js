
import ToLineItemBlockTransformation from '../ToLineItemBlockTransformation'
import ParseResult from '../../models/ParseResult'
import { DETECTED_ANNOTATION } from '../../models/Annotation'
import BlockType from '../../models/BlockType'
import { minXFromBlocks } from '../../util/page-item-functions'

// Detect items which are code/quote blocks
export default class DetectCodeQuoteBlocks extends ToLineItemBlockTransformation {
  constructor () {
    super('$1')
  }

  transform (parseResult /*: ParseResult */) /*: ParseResult */ {
    const { mostUsedHeight } = parseResult.globals
    var foundCodeItems = 0
    parseResult.pages.forEach(page => {
      var minX = minXFromBlocks(page.items)
      page.items.forEach(block => {
        if (!block.type && looksLikeCodeBlock(minX, block.items, mostUsedHeight)) {
          block.annotation = DETECTED_ANNOTATION
          block.type = BlockType.CODE
          foundCodeItems++
        }
      })
    })

    return new ParseResult({
      ...parseResult,
      messages: [
        'Detected ' + foundCodeItems + ' code/quote items.',
      ],
    })
  }
}

function looksLikeCodeBlock (minX, items, mostUsedHeight) {
  if (items.length === 0) {
    return false
  }
  if (items.length === 1) {
    return items[0].x > minX && items[0].height <= mostUsedHeight + 1
  }
  for (var item of items) {
    if (item.x === minX) {
      return false
    }
  }
  return true
}
