import Transformation from './Transformation'
import TextItem from '../models/TextItem'
import { REMOVED_ANNOTATION } from '../models/Annotation'

export default class ToTextItemTransformation extends Transformation {
  constructor (name) {
    super(name, TextItem.name)
    if (this.constructor === ToTextItemTransformation) {
      throw new TypeError('Can not construct abstract class.')
    }
  }

  completeTransform (parseResult /*: ParseResult */) /*: ParseResult */ {
    // The usual cleanup
    parseResult.messages = []
    parseResult.pages.forEach(page => {
      page.items = page.items.filter(item => !item.annotation || item.annotation !== REMOVED_ANNOTATION)
      page.items.forEach(item => (item.annotation = null))
    })
    return parseResult
  }
}
