[Documentation](../modules.md) / datasets/term-frequency-import

## importTermFrequency()

```ts
function importTermFrequency(): any;
```

Defined in: datasets/term-frequency-import.js:142

Script to download, decompress, parse and process 
Wikipedia term frequency dataset, compiled by SmartDataAnalytics 
in 2020 and containing term frequencies on Wikipedia articles.
All words in English Wikipedia are sorted by number of pages they are in for 
325K words with frequencies of at least 32 wikipages, between 3 to 23 characters 
of Latin alphanumerics like az09, punctuation like .-, and diacritics like éï, 
but filtering out numbers and foreign language. <br />
<b>Total Terms (frequency>=32)</b>: 324896 <br />
<b>Filesize (JSON, frequency>=32)</b>: 4MB  <br />
<b>Total Articles (Wiki-en-2020)</b>: 5,989,879 <br /> <br />

### Returns

`any`

### Author

Galkin, M., Malykh, V. (2020). Wikipedia TF-IDF Dataset Release (v1.0). 
Zenodo. https://doi.org/10.5281/zenodo.3631674 https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset
