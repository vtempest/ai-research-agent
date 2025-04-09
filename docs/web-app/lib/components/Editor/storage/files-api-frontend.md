[qwksearch-web-app](../../../../modules.md) / lib/components/Editor/storage/files-api-frontend

## Functions

### clearLocalStorage()

```ts
function clearLocalStorage(): void
```

#### Returns

`void`

***

### createFile()

```ts
function createFile(
   file, 
   userId, 
   useLocalStorage): Promise<any>
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

#### Returns

`Promise`&lt;`any`&gt;

***

### deleteFile()

```ts
function deleteFile(
   fileId, 
   userId, 
   useLocalStorage): Promise<{
  success: boolean;
 }>
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

#### Returns

`Promise`&lt;\{
  `success`: `boolean`;
 \}&gt;

***

### fetchData()

```ts
function fetchData(endpoint, useLocalStorage): Promise<any>
```

* BASE API FUNCTIONS

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

#### Returns

`Promise`&lt;`any`&gt;

***

### fetchFromAPI()

```ts
function fetchFromAPI(endpoint): Promise<any>
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

`endpoint`

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

### getUserFileIndex()

```ts
function getUserFileIndex(userId, useLocalStorage): Promise<any>
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

#### Returns

`Promise`&lt;`any`&gt;

***

### getUserSettings()

```ts
function getUserSettings(userId, useLocalStorage): Promise<any>
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

#### Returns

`Promise`&lt;`any`&gt;

***

### removeFromLocalStorage()

```ts
function removeFromLocalStorage(key): void
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

`void`

***

### saveToLocalStorage()

```ts
function saveToLocalStorage(key, data): void
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

`data`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### updateFile()

```ts
function updateFile(
   fileId, 
   updates, 
   useLocalStorage): Promise<any>
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

#### Returns

`Promise`&lt;`any`&gt;

***

### updateUserFileIndex()

```ts
function updateUserFileIndex(
   userId, 
   fileId, 
   action, 
   useLocalStorage): Promise<any>
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

#### Returns

`Promise`&lt;`any`&gt;

***

### updateUserSettings()

```ts
function updateUserSettings(
   userId, 
   newSettings, 
   useLocalStorage): Promise<any>
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

#### Returns

`Promise`&lt;`any`&gt;
