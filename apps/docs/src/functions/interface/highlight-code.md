[Documentation](../modules.md) / interface/highlight-code

## HTML Utilities

### highlightCodeSyntax()

```ts
function highlightCodeSyntax(node: Node): any;
```

Defined in: [packages/ai-research-agent/src/interface/highlight-code.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/highlight-code.js#L11)

Take a node and make it so that any code blocks are syntax highlighted.

#### Parameters

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

`node`

</td>
<td>

`Node`

</td>
<td>

The node to be highlighted.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

An object with a destroy method to clean up the mutation observer.

#### Example

```ts

```
