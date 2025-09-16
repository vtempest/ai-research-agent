[ai-research-agent](../../../modules.md) / extractor/html-to-cite/extract-date/date-validators

## check\_date\_input()

```ts
function check_date_input(date_object: any, default_date: any): any;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:153](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L153)

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

`date_object`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`default_date`

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

## check\_extracted\_reference()

```ts
function check_extracted_reference(reference: any, options: any): string;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:142](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L142)

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

`reference`

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

## compare\_values()

```ts
function compare_values(
   reference: any, 
   attempt: any, 
   options: any): any;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:105](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L105)

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

`reference`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`attempt`

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

## convert\_date()

```ts
function convert_date(
   datestring: any, 
   inputformat: any, 
   outputformat: any): any;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:131](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L131)

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

`datestring`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`inputformat`

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

`any`

***

## filter\_ymd\_candidate()

```ts
function filter_ymd_candidate(
   bestmatch: any, 
   pattern: any, 
   original_date: any, 
   copyear: any, 
   outputformat: any, 
   min_date: any, 
   max_date: any): any;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:119](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L119)

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

`bestmatch`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`pattern`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`original_date`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`copyear`

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

`any`

***

## get\_max\_date()

```ts
function get_max_date(max_date: any): any;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:171](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L171)

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

`max_date`

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

## get\_min\_date()

```ts
function get_min_date(min_date: any): any;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:167](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L167)

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

`min_date`

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

## is\_valid\_date()

```ts
function is_valid_date(
   date_input: any, 
   outputformat: any, 
   earliest: any, 
   latest: any): boolean;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L11)

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

`date_input`

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

`earliest`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`latest`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`

***

## is\_valid\_format()

```ts
function is_valid_format(outputformat: any): boolean;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:48](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L48)

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

`outputformat`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`

***

## plausible\_year\_filter()

```ts
function plausible_year_filter(
   htmlstring: any, 
   pattern: any, 
   yearpat: any, 
   earliest: any, 
   latest: any, 
   incomplete: boolean): Map<any, any>;
```

Defined in: [src/extractor/html-to-cite/extract-date/date-validators.js:65](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/date-validators.js#L65)

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`pattern`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`yearpat`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`earliest`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`latest`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`incomplete`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

### Returns

`Map`&lt;`any`, `any`&gt;
