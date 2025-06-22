import { WeatherApiError, WeatherApiResponse, WeatherInfo } from "../model";

export const fetchWeatherInfo = async (
  searchValue: string
): Promise<WeatherInfo> => {
  if (!searchValue.trim()) {
    throw new Error("City name cannot be empty");
  }

  const API_KEY = "a560b244567b8df79618c3fa33b6a022";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchValue)}&units=metric&appid=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data: WeatherApiResponse | WeatherApiError = await res.json();

    if (!res.ok) {
      const errorData = data as WeatherApiError;
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const weatherData = data as WeatherApiResponse;

    // Validate required fields
    if (
      !weatherData.main ||
      !weatherData.weather ||
      weatherData.weather.length === 0
    ) {
      throw new Error("Invalid weather data received from API");
    }

    const { temp, humidity, pressure, feels_like } = weatherData.main;
    const { main: weathermood, description } = weatherData.weather[0];
    const { name } = weatherData;
    const { speed } = weatherData.wind || { speed: 0 };
    const { country, sunset, sunrise } = weatherData.sys || {};
    const { visibility } = weatherData;
    const { all: clouds } = weatherData.clouds || { all: 0 };

    return {
      temp: Math.round(temp),
      humidity,
      pressure,
      weathermood,
      description,
      name,
      speed,
      country: country || "",
      sunset: sunset || 0,
      sunrise: sunrise || 0,
      feels_like: feels_like ? Math.round(feels_like) : undefined,
      visibility,
      clouds,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch weather information");
  }
};
