[qwksearch-web-app](../../../../modules.md) / lib/components/Editor/storage/local-storage-api

## Functions

### addFolder()

```ts
function addFolder(name, parentId): Promise<string>
```

#### Parameters

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

`name`

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

`parentId`

</td>
<td>

`any`

</td>
<td>

`null`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

***

### deleteDocument()

```ts
function deleteDocument(key): Promise<void>
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

`key`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

***

### deleteFolder()

```ts
function deleteFolder(id): Promise<void>
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

`id`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

***

### getDocument()

```ts
function getDocument(key): Promise<any>
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

`key`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### getDocumentIndex()

```ts
function getDocumentIndex(): any[]
```

#### Returns

`any`[]

***

### listDocuments()

```ts
function listDocuments(): object
```

#### Returns

`object`

***

### saveDocument()

```ts
function saveDocument(document, parentId): Promise<string>
```

#### Parameters

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

`document`

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

`parentId`

</td>
<td>

`any`

</td>
<td>

`null`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

***

### updateDocument()

```ts
function updateDocument(key, updates): Promise<void>
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

`key`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`updates`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

***

### updateFolder()

```ts
function updateFolder(id, updates): Promise<void>
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

`id`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`updates`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

## Variables

### documentIndex

```ts
const documentIndex: Readable<any[]>;
```

***

### savedDocuments

```ts
const savedDocuments: Readable<{}>;
```
