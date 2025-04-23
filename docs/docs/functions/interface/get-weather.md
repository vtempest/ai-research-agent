[Documentation](../modules.md) / interface/get-weather

## getWeatherForClientIP()

```ts
function getWeatherForClientIP(): Promise<WeatherForecast[]>;
```

Defined in: interface/get-weather.js:84

Fetches the weather forecast for the client's current IP address.

### Returns

`Promise`&lt;`WeatherForecast`[]&gt;

***

## getWeatherForecast()

```ts
function getWeatherForecast(latitude: number, longitude: number): Promise<WeatherForecast[]>;
```

Defined in: interface/get-weather.js:9

Fetches open-meteo API weather forecast for latitude 
and longitude and code symbol.

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

`latitude`

</td>
<td>

`number`

</td>
<td>

</td>
</tr>
<tr>
<td>

`longitude`

</td>
<td>

`number`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`WeatherForecast`[]&gt;
