
/*::
import ParseResult from '../ParseResult'
*/

import Transformation from './Transformation'
import LineItem from '../models/LineItem'
import { REMOVED_ANNOTATION } from '../models/Annotation'

// Abstract class for transformations producing LineItem(s) to be shown in the LineItemPageView
export default class ToLineItemTransformation extends Transformation {
  constructor (name) {
    super(name, LineItem.name)
    if (this.constructor === ToLineItemTransformation) {
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
