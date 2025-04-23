[Documentation](../../../../modules.md) / lib/components/Editor/storage/local-storage-api

## documentIndex

```ts
const documentIndex: Readable<any[]>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:25

***

## savedDocuments

```ts
const savedDocuments: Readable<{
}>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:24

***

## addFolder()

```ts
function addFolder(name: any, parentId: any): Promise<string>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:201

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

### Returns

`Promise`&lt;`string`&gt;

***

## deleteDocument()

```ts
function deleteDocument(key: any): Promise<void>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:172

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

`key`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`void`&gt;

***

## deleteFolder()

```ts
function deleteFolder(id: any): Promise<void>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:230

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

`id`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`void`&gt;

***

## getDocument()

```ts
function getDocument(key: any): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:131

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

`key`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## getDocumentIndex()

```ts
function getDocumentIndex(): any[];
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:196

### Returns

`any`[]

***

## listDocuments()

```ts
function listDocuments(): object;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:191

### Returns

`object`

***

## saveDocument()

```ts
function saveDocument(document: any, parentId: any): Promise<string>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:83

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

### Returns

`Promise`&lt;`string`&gt;

***

## updateDocument()

```ts
function updateDocument(key: any, updates: any): Promise<void>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:137

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

### Returns

`Promise`&lt;`void`&gt;

***

## updateFolder()

```ts
function updateFolder(id: any, updates: any): Promise<void>;
```

Defined in: web-app/src/lib/components/Editor/storage/local-storage-api.js:219

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

### Returns

`Promise`&lt;`void`&gt;
