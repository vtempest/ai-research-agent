import { test, expect } from 'vitest'
import fs from 'fs'
import { convertPDFToHTML } from '../src/extractor/pdf-to-html/pdf-to-html.js'

test('convert pdf to html', async () => {
  var testURLs = [
    "https://www.ipcrc.org/sites/default/files/document_new/file_list/armed_conflict_defined_in_ihl.pdf",
    // 'https://arxiv.org/pdf/2409.13740',
    // 'https://css4.pub/2015/textbook/somatosensory.pdf',
    // 'https://css4.pub/2017/newsletter/drylab.pdf',
  ]

  // Use the first (and only active) URL
  const response = await fetch(testURLs[0])
  const pdfBuffer = await response.arrayBuffer()
  const {html} = await convertPDFToHTML(pdfBuffer)
  
  // Create test directory if it doesn't exist
  const testDir = './test'
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }
  
  fs.writeFileSync('./test/pdf-output.html', html)

  console.log('HTML length:', html)

  expect(html.length > 1000).toBe(true)
}, 20000)