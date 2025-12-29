import grab from "grab-url";

/**
 * Fetches open-meteo API weather forecast for latitude
 * and longitude and code symbol.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<WeatherForecast[]>}
 */
export async function getWeatherForecast(latitude, longitude) {
  
  const data = await grab("https://api.open-meteo.com/v1/forecast", {
    latitude,
    longitude,
    current: "temperature_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "auto",
    temperature_unit: "fahrenheit",
  });

  if (data.error) {
    throw new Error(`Request error: ${data.error}`);
  }
  if (data && data.current && data.daily && data.daily.time) {
    const forecast = [
      {
        date: data.current.time,
        temp: Math.round(data.current.temperature_2m),
        symbol: getWeatherSymbol(data.current.weather_code),
        rain: data.current.rain,
      },
      ...data.daily.time.slice(1).map((time, index) => ({
        date: time,
        max: Math.round(data.daily.temperature_2m_max[index + 1]),
        min: Math.round(data.daily.temperature_2m_min[index + 1]),
        symbol: getWeatherSymbol(data.daily.weather_code[index + 1]),
      })),
    ];

    return forecast;
  } else {
    throw new Error("Invalid data structure received from API");
  }
}

const getWeatherSymbol = (code) => {
  const weatherCodes = [
    { code: 0, symbol: "☀", symbolLabel: "Sunny" },
    { code: 1, symbol: "🌤", symbolLabel: "Mainly clear" },
    { code: 2, symbol: "⛅", symbolLabel: "Partly cloudy" },
    { code: 3, symbol: "☁", symbolLabel: "Overcast" },
    { code: [45, 48], symbol: "🌫", symbolLabel: "Fog" },
    { code: [51, 53, 55], symbol: "☂", symbolLabel: "Drizzle" },
    { code: [56, 57], symbol: "☂", symbolLabel: "Freezing Drizzle" },
    { code: [61, 63, 65], symbol: "☂", symbolLabel: "Rain" },
    { code: [66, 67], symbol: "☂", symbolLabel: "Freezing Rain" },
    { code: [71, 73, 75], symbol: "☃", symbolLabel: "Snow fall" },
    { code: 77, symbol: "☃", symbolLabel: "Snow grains" },
    { code: [80, 81, 82], symbol: "☔", symbolLabel: "Rain showers" },
    { code: [85, 86], symbol: "⛄", symbolLabel: "Snow showers" },
    { code: 95, symbol: "⛈", symbolLabel: "Thunderstorm" },
    { code: [96, 99], symbol: "⛈", symbolLabel: "Thunderstorm with hail" },
  ];

  for (let weather of weatherCodes) {
    if (Array.isArray(weather.code)) {
      if (weather.code.includes(code)) return weather.symbol;
    } else if (weather.code === code) return weather.symbol;
  }
  return "❓";
};

/**
 * Fetches the weather forecast for the client's current IP address.
 * @returns {Promise<WeatherForecast[]>}
 */
export async function getWeatherForClientIP() {
  try {
    // Fetch IP info
    const ipData = await grab("https://ipinfo.io/json");
    if (ipData.error) {
      throw new Error(`Request error: ${ipData.error}`);
    }
    // Extract latitude and longitude
    const [latitude, longitude] = ipData.loc.split(",");

    // Get weather forecast
    const forecast = await getWeatherForecast(latitude, longitude);

    if (forecast) {
      // console.log(`${ipData.city}, ${ipData.region}:`);
      forecast.forEach((day) => {
        if ("temp" in day) {
          // Current weather
          console.log(`${ipData.city}: ${day.symbol} ${day.temp}°F`);
        } else {
          // Daily forecast
          console.log(`${day.date}: ${day.symbol} ${day.min}-${day.max}°F`);
        }
      });
    } else {
      console.log("Unable to fetch weather forecast.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getWeatherForClientIP();
