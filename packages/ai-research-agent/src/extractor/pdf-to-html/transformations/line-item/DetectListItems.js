
import ToLineItemTransformation from '../ToLineItemTransformation'
import ParseResult from '../../models/ParseResult'
import LineItem from '../../models/LineItem'
import Word from '../../models/Word'
import { REMOVED_ANNOTATION, ADDED_ANNOTATION, DETECTED_ANNOTATION } from '../../models/Annotation'
import BlockType from '../../models/BlockType'
import { isListItemCharacter, isNumberedListItem } from '../../util/string-functions'

// Detect items starting with -, •, etc...
export default class DetectListItems extends ToLineItemTransformation {
  constructor () {
    super('Detect List Items')
  }

  transform (parseResult /*: ParseResult */) /*: ParseResult */ {
    var foundListItems = 0
    var foundNumberedItems = 0
    parseResult.pages.forEach(page => {
      const newItems = []
      page.items.forEach(item => {
        newItems.push(item)
        if (!item.type) {
          var text = item.text()
          if (isListItemCharacter(item.words[0].string)) {
            foundListItems++
            if (item.words[0].string === '-') {
              item.annotation = DETECTED_ANNOTATION
              item.type = BlockType.LIST
            } else {
              item.annotation = REMOVED_ANNOTATION
              const newWords = item.words.map(word => new Word({
                ...word,
              }))
              newWords[0].string = '-'
              newItems.push(new LineItem({
                ...item,
                words: newWords,
                annotation: ADDED_ANNOTATION,
                type: BlockType.LIST,
              }))
            }
          } else if (isNumberedListItem(text)) { // TODO check that starts with 1 (kala chakra)
            foundNumberedItems++
            item.annotation = DETECTED_ANNOTATION
            item.type = BlockType.LIST
          }
        }
      })
      page.items = newItems
    })

    return new ParseResult({
      ...parseResult,
      messages: [
        'Detected ' + foundListItems + ' plain list items.',
        'Detected ' + foundNumberedItems + ' numbered list items.',
      ],
    })
  }
}
