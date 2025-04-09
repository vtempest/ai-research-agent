[ai-research-agent](../../../modules.md) / extractor/html-to-cite/extract-date/date-extractors

## Functions

### custom\_parse()

```ts
function custom_parse(
   string, 
   outputformat, 
   min_date, 
   max_date): string
```

#### Parameters

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

#### Returns

`string`

***

### discard\_unwanted()

```ts
function discard_unwanted(tree): any[]
```

#### Parameters

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

#### Returns

`any`[]

***

### external\_date\_parser()

```ts
function external_date_parser(string, outputformat): string
```

#### Parameters

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

#### Returns

`string`

***

### extract\_url\_date()

```ts
function extract_url_date(testurl, options): string
```

#### Parameters

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

#### Returns

`string`

***

### idiosyncrasies\_search()

```ts
function idiosyncrasies_search(htmlstring, options): string
```

#### Parameters

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

#### Returns

`string`

***

### img\_search()

```ts
function img_search(tree, options): string
```

#### Parameters

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

#### Returns

`string`

***

### json\_search()

```ts
function json_search(tree, options): any
```

#### Parameters

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

#### Returns

`any`

***

### pattern\_search()

```ts
function pattern_search(
   text, 
   date_pattern, 
   options): any
```

#### Parameters

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

#### Returns

`any`

***

### regex\_parse()

```ts
function regex_parse(string): Date
```

#### Parameters

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

#### Returns

`Date`

***

### try\_date\_expr()

```ts
function try_date_expr(
   string, 
   outputformat, 
   extensive_search, 
   min_date, 
   max_date): string
```

#### Parameters

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

#### Returns

`string`

## Variables

### COPYRIGHT\_PATTERN

```ts
const COPYRIGHT_PATTERN: RegExp;
```

***

### DATE\_EXPRESSIONS

```ts
const DATE_EXPRESSIONS: string;
```

***

### DATESTRINGS\_CATCH

```ts
const DATESTRINGS_CATCH: RegExp;
```

***

### DATESTRINGS\_PATTERN

```ts
const DATESTRINGS_PATTERN: RegExp;
```

***

### FAST\_PREPEND

```ts
const FAST_PREPEND: "" = '';
```

***

### FREE\_TEXT\_EXPRESSIONS

```ts
const FREE_TEXT_EXPRESSIONS: ".//*[self::div or self::h2 or self::h3 or self::h4 or self::li or self::p or self::span or self::time or self::ul]/text()" = ".//*[self::div or self::h2 or self::h3 or self::h4 or self::li or self::p or self::span or self::time or self::ul]/text()";
```

***

### MAX\_SEGMENT\_LEN

```ts
const MAX_SEGMENT_LEN: 52 = 52;
```

***

### MIN\_SEGMENT\_LEN

```ts
const MIN_SEGMENT_LEN: 6 = 6;
```

***

### MMYYYY\_PATTERN

```ts
const MMYYYY_PATTERN: RegExp;
```

***

### MMYYYY\_YEAR

```ts
const MMYYYY_YEAR: RegExp;
```

***

### SELECT\_YMD\_PATTERN

```ts
const SELECT_YMD_PATTERN: RegExp;
```

***

### SELECT\_YMD\_YEAR

```ts
const SELECT_YMD_YEAR: RegExp;
```

***

### SIMPLE\_PATTERN

```ts
const SIMPLE_PATTERN: RegExp;
```

***

### SLASHES\_PATTERN

```ts
const SLASHES_PATTERN: RegExp;
```

***

### SLASHES\_YEAR

```ts
const SLASHES_YEAR: RegExp;
```

***

### SLOW\_PREPEND

```ts
const SLOW_PREPEND: "" = "";
```

***

### THREE\_CATCH

```ts
const THREE_CATCH: RegExp;
```

***

### THREE\_COMP\_REGEX\_A

```ts
const THREE_COMP_REGEX_A: RegExp;
```

***

### THREE\_COMP\_REGEX\_B

```ts
const THREE_COMP_REGEX_B: RegExp;
```

***

### THREE\_LOOSE\_CATCH

```ts
const THREE_LOOSE_CATCH: RegExp;
```

***

### THREE\_LOOSE\_PATTERN

```ts
const THREE_LOOSE_PATTERN: RegExp;
```

***

### THREE\_PATTERN

```ts
const THREE_PATTERN: RegExp;
```

***

### TIMESTAMP\_PATTERN

```ts
const TIMESTAMP_PATTERN: RegExp;
```

***

### TWO\_COMP\_REGEX

```ts
const TWO_COMP_REGEX: RegExp;
```

***

### YEAR\_PATTERN

```ts
const YEAR_PATTERN: RegExp;
```

***

### YMD\_PATTERN

```ts
const YMD_PATTERN: RegExp;
```

***

### YMD\_YEAR

```ts
const YMD_YEAR: RegExp;
```

***

### YYYYMM\_CATCH

```ts
const YYYYMM_CATCH: RegExp;
```

***

### YYYYMM\_PATTERN

```ts
const YYYYMM_PATTERN: RegExp;
```
