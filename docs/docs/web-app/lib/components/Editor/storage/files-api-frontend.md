[Documentation](../../../../modules.md) / lib/components/Editor/storage/files-api-frontend

## clearLocalStorage()

```ts
function clearLocalStorage(): void;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:234

### Returns

`void`

***

## createFile()

```ts
function createFile(
   file: any, 
   userId: any, 
   useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:109

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

`file`

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

`userId`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## deleteFile()

```ts
function deleteFile(
   fileId: any, 
   userId: any, 
   useLocalStorage: boolean): Promise<{
  success: boolean;
}>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:132

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

`fileId`

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

`userId`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;\{
  `success`: `boolean`;
\}&gt;

***

## fetchData()

```ts
function fetchData(endpoint: any, useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:153

* BASE API FUNCTIONS

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

`endpoint`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## fetchFromAPI()

```ts
function fetchFromAPI(endpoint: any): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:162

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

`endpoint`

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

## getUserFileIndex()

```ts
function getUserFileIndex(userId: any, useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:74

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

`userId`

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

`useLocalStorage`

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

`Promise`&lt;`any`&gt;

***

## getUserSettings()

```ts
function getUserSettings(userId: any, useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:48

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

`userId`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## removeFromLocalStorage()

```ts
function removeFromLocalStorage(key: any): void;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:230

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

`void`

***

## saveToLocalStorage()

```ts
function saveToLocalStorage(key: any, data: any): void;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:222

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

`data`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## updateFile()

```ts
function updateFile(
   fileId: any, 
   updates: any, 
   useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:26

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

`fileId`

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

`updates`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## updateUserFileIndex()

```ts
function updateUserFileIndex(
   userId: any, 
   fileId: any, 
   action: any, 
   useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:83

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

`userId`

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

`fileId`

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

`action`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## updateUserSettings()

```ts
function updateUserSettings(
   userId: any, 
   newSettings: any, 
   useLocalStorage: boolean): Promise<any>;
```

Defined in: web-app/src/lib/components/Editor/storage/files-api-frontend.js:57

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

`userId`

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

`newSettings`

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

`useLocalStorage`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;
