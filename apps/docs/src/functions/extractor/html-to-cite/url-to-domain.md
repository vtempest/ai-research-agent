[Documentation](../../modules.md) / extractor/html-to-cite/url-to-domain

## convertURLToDomain()

```ts
function convertURLToDomain(domain: string): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-cite/url-to-domain.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/url-to-domain.js#L10)

Extract TLD and hostname from domain in Regex. There's [two or more part 
TLDs](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)
so it is hard to tell if host.secondTLD.tld or host.tld is correct way
to get root domain (e.g. abc.go.jp, abc.co.uk)

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

`domain`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`string`

rootDomain
