import ToLineItemBlockTransformation from '../ToLineItemBlockTransformation'
import ParseResult from '../../models/ParseResult'
import Word from '../../models/Word'
import { MODIFIED_ANNOTATION, UNCHANGED_ANNOTATION } from '../../models/Annotation'
import BlockType from '../../models/BlockType'

// Cares for proper sub-item spacing/leveling
export default class DetectListLevels extends ToLineItemBlockTransformation {
  constructor () {
    super('Level Lists')
  }

  transform (parseResult /*: ParseResult */) /*: ParseResult */ {
    var listBlocks = 0
    var modifiedBlocks = 0
    parseResult.pages.forEach(page => {
      page.items.filter(block => block.type === BlockType.LIST).forEach(listBlock => {
        var lastItemX
        var currentLevel = 0
        const xByLevel = {}
        var modifiedBlock = false
        listBlock.items.forEach(item => {
          const isListItem = true
          if (lastItemX && isListItem) {
            if (item.x > lastItemX) {
              currentLevel++
              xByLevel[item.x] = currentLevel
            } else if (item.x < lastItemX) {
              currentLevel = xByLevel[item.x]
            }
          } else {
            xByLevel[item.x] = 0
          }
          if (currentLevel > 0) {
            item.words = [
              new Word({ string: ' '.repeat(currentLevel * 3) }),
            ].concat(item.words)
            modifiedBlock = true
          }
          lastItemX = item.x
        })
        listBlocks++
        if (modifiedBlock) {
          modifiedBlocks++
          listBlock.annotation = MODIFIED_ANNOTATION
        } else {
          listBlock.annotation = UNCHANGED_ANNOTATION
        }
      })
    })

    return new ParseResult({
      ...parseResult,
      messages: ['Modified ' + modifiedBlocks + ' / ' + listBlocks + ' list blocks.'],
    })
  }
}
