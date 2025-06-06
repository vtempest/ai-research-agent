[Documentation](../modules.md) / lib/log

## log()

```ts
function log(
   message: any, 
   hideInProduction?: boolean, 
   style?: string): void;
```

Defined in: apps/web-app/src/lib/log.js:13

### Colorized Log With JSON Structure
![Debug log](https://i.imgur.com/R8Qp6Vg.png)  
Logs messages to the console with custom styling,
prints JSON with description of structure layout, 
and showing debug output in development only.

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
<td>

The message to log. If an object is provided, it will be stringified.

</td>
</tr>
<tr>
<td>

`hideInProduction?`

</td>
<td>

`boolean`

</td>
<td>

`undefined`

</td>
<td>

default = auto-detects based on hostname.
 If true, uses `console.debug` (hidden in production). If false, uses `console.log`.

</td>
</tr>
<tr>
<td>

`style?`

</td>
<td>

`string`

</td>
<td>

`"color: blue; font-size: 13pt;"`

</td>
<td>

default='color: blue; font-size: 15px' - CSS style string

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## printStructureJSON()

```ts
function printStructureJSON(obj: any, indent: number): string;
```

Defined in: apps/web-app/src/lib/log.js:73

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

`obj`

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

`indent`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## showAlert()

```ts
function showAlert(msg: string): void;
```

Defined in: apps/web-app/src/lib/log.js:129

Shows message in a modal overlay with concatenation 
of messages, scroll large messages, and easy dismissal.

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

The message to display

</td>
</tr>
</tbody>
</table>

### Returns

`void`
