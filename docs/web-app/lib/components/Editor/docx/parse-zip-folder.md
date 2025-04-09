[qwksearch-web-app](../../../../modules.md) / lib/components/Editor/docx/parse-zip-folder

## Functions

### getFilesInFolder()

```ts
function getFilesInFolder(dir, files): string[]
```

Get all files in folder and subfolders as file paths array

#### Parameters

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

`dir`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

the directory to browse for files

</td>
</tr>
<tr>
<td>

`files`

</td>
<td>

`string`[]

</td>
<td>

`[]`

</td>
<td>

(omit this param, used for recursion)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

files array of file paths

***

### handleZipOfDocx()

```ts
function handleZipOfDocx(zipPath, outputFolder): string[]
```

Get all docx in zip as file paths array and process data

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

`zipPath`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`outputFolder`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

files array of file paths
