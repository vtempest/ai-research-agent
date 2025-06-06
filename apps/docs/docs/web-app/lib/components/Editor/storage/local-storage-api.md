[Documentation](../../../../modules.md) / lib/components/Editor/storage/local-storage-api

## savedDocuments

```ts
const savedDocuments: Readable<{
}>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:24

Export read-only versions of the stores

***

## documentIndex

```ts
const documentIndex: Readable<any[]>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:25

***

## saveDocument()

```ts
function saveDocument(document: any, parentId: any): Promise<string>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:83

Function to save a document and update the index

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

## getDocument()

```ts
function getDocument(key: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:131

Function to retrieve a document

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

## updateDocument()

```ts
function updateDocument(key: any, updates: any): Promise<void>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:137

Function to update a document and its index entry

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

## deleteDocument()

```ts
function deleteDocument(key: any): Promise<void>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:172

Function to delete a document and its index entry

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

## listDocuments()

```ts
function listDocuments(): object;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:191

Function to list all documents

### Returns

`object`

***

## getDocumentIndex()

```ts
function getDocumentIndex(): any[];
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:196

Function to get the document index

### Returns

`any`[]

***

## addFolder()

```ts
function addFolder(name: any, parentId: any): Promise<string>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:201

Function to add a folder to the index

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

## updateFolder()

```ts
function updateFolder(id: any, updates: any): Promise<void>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:219

Function to update a folder in the index

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

***

## deleteFolder()

```ts
function deleteFolder(id: any): Promise<void>;
```

Defined in: apps/web-app/src/lib/components/Editor/storage/local-storage-api.js:230

Function to delete a folder and its contents from the index

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
