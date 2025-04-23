[Documentation](../../../modules.md) / extractor/html-to-cite/extract-date/date-extractors

## COPYRIGHT\_PATTERN

```ts
const COPYRIGHT_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:89

***

## DATE\_EXPRESSIONS

```ts
const DATE_EXPRESSIONS: string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:40

***

## DATESTRINGS\_CATCH

```ts
const DATESTRINGS_CATCH: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:98

***

## DATESTRINGS\_PATTERN

```ts
const DATESTRINGS_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:97

***

## FAST\_PREPEND

```ts
const FAST_PREPEND: "" = '';
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:30

***

## FREE\_TEXT\_EXPRESSIONS

```ts
const FREE_TEXT_EXPRESSIONS: ".//*[self::div or self::h2 or self::h3 or self::h4 or self::li or self::p or self::span or self::time or self::ul]/text()" = ".//*[self::div or self::h2 or self::h3 or self::h4 or self::li or self::p or self::span or self::time or self::ul]/text()";
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:80

***

## MAX\_SEGMENT\_LEN

```ts
const MAX_SEGMENT_LEN: 52 = 52;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:34

***

## MIN\_SEGMENT\_LEN

```ts
const MIN_SEGMENT_LEN: 6 = 6;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:33

***

## MMYYYY\_PATTERN

```ts
const MMYYYY_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:103

***

## MMYYYY\_YEAR

```ts
const MMYYYY_YEAR: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:104

***

## SELECT\_YMD\_PATTERN

```ts
const SELECT_YMD_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:94

***

## SELECT\_YMD\_YEAR

```ts
const SELECT_YMD_YEAR: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:95

***

## SIMPLE\_PATTERN

```ts
const SIMPLE_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:105

***

## SLASHES\_PATTERN

```ts
const SLASHES_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:99

***

## SLASHES\_YEAR

```ts
const SLASHES_YEAR: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:100

***

## SLOW\_PREPEND

```ts
const SLOW_PREPEND: "" = "";
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:74

***

## THREE\_CATCH

```ts
const THREE_CATCH: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:91

***

## THREE\_COMP\_REGEX\_A

```ts
const THREE_COMP_REGEX_A: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:83

***

## THREE\_COMP\_REGEX\_B

```ts
const THREE_COMP_REGEX_B: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:84

***

## THREE\_LOOSE\_CATCH

```ts
const THREE_LOOSE_CATCH: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:93

***

## THREE\_LOOSE\_PATTERN

```ts
const THREE_LOOSE_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:92

***

## THREE\_PATTERN

```ts
const THREE_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:90

***

## TIMESTAMP\_PATTERN

```ts
const TIMESTAMP_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:140

***

## TWO\_COMP\_REGEX

```ts
const TWO_COMP_REGEX: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:85

***

## YEAR\_PATTERN

```ts
const YEAR_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:88

***

## YMD\_PATTERN

```ts
const YMD_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:109

***

## YMD\_YEAR

```ts
const YMD_YEAR: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:96

***

## YYYYMM\_CATCH

```ts
const YYYYMM_CATCH: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:102

***

## YYYYMM\_PATTERN

```ts
const YYYYMM_PATTERN: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:101

***

## custom\_parse()

```ts
function custom_parse(
   string: any, 
   outputformat: any, 
   min_date: any, 
   max_date: any): string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:247

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`outputformat`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`min_date`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`max_date`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## discard\_unwanted()

```ts
function discard_unwanted(tree: any): any[];
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:186

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tree`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`[]

***

## external\_date\_parser()

```ts
function external_date_parser(string: any, outputformat: any): string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:342

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`outputformat`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## extract\_url\_date()

```ts
function extract_url_date(testurl: any, options: any): string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:196

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`testurl`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## idiosyncrasies\_search()

```ts
function idiosyncrasies_search(htmlstring: any, options: any): string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:416

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`htmlstring`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## img\_search()

```ts
function img_search(tree: any, options: any): string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:386

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tree`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## json\_search()

```ts
function json_search(tree: any, options: any): any;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:403

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tree`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## pattern\_search()

```ts
function pattern_search(
   text: any, 
   date_pattern: any, 
   options: any): any;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:394

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`text`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`date_pattern`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## regex\_parse()

```ts
function regex_parse(string: any): Date;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:225

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Date`

***

## try\_date\_expr()

```ts
function try_date_expr(
   string: any, 
   outputformat: any, 
   extensive_search: any, 
   min_date: any, 
   max_date: any): string;
```

Defined in: extractor/html-to-cite/extract-date/date-extractors.js:356

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`outputformat`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`extensive_search`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`min_date`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`max_date`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`
