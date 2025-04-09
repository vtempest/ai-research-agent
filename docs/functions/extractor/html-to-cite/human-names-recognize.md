[ai-research-agent](../../modules.md) / extractor/html-to-cite/human-names-recognize

## Functions

### extractHumanName()

```ts
function extractHumanName(author, options): any
```

Validates and formats an author name string by comparing it against common lists of
first names, last names, name affixes, and organizations.

This function determines whether the name should be reversed (starting with the last name)
for citation purposes, as organizations are not reversed. It also checks against common
salutations, middle parts, and titles to properly format the citation in "Last, First Middle" format.

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

`author`

</td>
<td>

`string`

</td>
<td>

The author name string to be processed.

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{\}

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

An object containing the following properties:
  - author_cite : The formatted author name for citation (e.g., "Last, First Middle").
  - author_short : A shortened version of the author name.
  - author_type : The type of author, which can be one of:
    - "single": A single author or a two-word name.
    - "two-author": Two authors.
    - "more-than-two": More than two authors.
    - "organization": A non-human name (organization) that should not be reversed.
