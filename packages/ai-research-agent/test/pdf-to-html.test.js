import fs from 'fs'
import {convertPDFToHTML} from '..'

test('convert pdf to  html', async () => {
  var testURLs = [
    "https://www.icrc.org/sites/default/files/document_new/file_list/armed_conflict_defined_in_ihl.pdf",
    'https://arxiv.org/pdf/2409.13740',
    'https://css4.pub/2015/textbook/somatosensory.pdf',
    'https://css4.pub/2017/newsletter/drylab.pdf',

  ]

  const response = await fetch(testURLs[2])
  const pdfBuffer = await response.arrayBuffer()
  const {html} = await convertPDFToHTML(pdfBuffer)
  fs.writeFileSync('./test/pdf-output.html', html)

  console.log(html.length)

  expect(html.length>1000).toBe(true)
}, 20000)