import { z } from "zod";

export const AGENT_TOOLS = [
  {
    
    name: "get_weather",
    description:
    "Get current weather for a city. Input: city name. Returns temperature, conditions, and forecast.",
    schema: z.object({ location: z.string() }),
    func: async (location) => {
      try {
        // Simulate API call
        const weatherData = {
          "San Francisco": {
            temp: "92°F",
            condition: "Sunny",
            humidity: "65%",
          },
          "New York": {
            temp: "68°F",
            condition: "Cloudy",
            humidity: "70%",
          },
        };

        const data = weatherData[location] || {
          temp: "Unknown",
          condition: "Data not available",
          humidity: "Unknown",
        };

        // Return clear, final answer
        return `Weather for ${location}: ${data.temp}, ${data.condition}, Humidity: ${data.humidity}. This is the complete weather information.`;
      } catch (error) {
        return `Unable to get weather for ${location}. Please try another location.`;
      }
    },
  },
];
