/*::
import PageItem from '../models/PageItem'
import LineItemBlock from '../models/LineItemBlock'
*/

export function minXFromBlocks (blocks /*: LineItemBlock[] */) /*: number */ {
  var minX = 999
  blocks.forEach(block => {
    block.items.forEach(item => {
      minX = Math.min(minX, item.x)
    })
  })
  if (minX === 999) {
    return null
  }
  return minX
}

export function minXFromPageItems (items /*: PageItem */) /*: number */ {
  var minX = 999
  items.forEach(item => {
    minX = Math.min(minX, item.x)
  })
  if (minX === 999) {
    return null
  }
  return minX
}

export function sortByX (items /*: PageItem */) {
  items.sort((a, b) => a.x - b.x)
}
