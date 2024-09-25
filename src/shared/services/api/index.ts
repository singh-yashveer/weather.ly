import { WeatherInfo } from "../model";

export const fetchWeatherInfo = async (
  searchValue: string
): Promise<WeatherInfo> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a560b244567b8df79618c3fa33b6a022`;
  const res = await fetch(url);
  const data = await res.json();

  const { temp, humidity } = data.main;
  const { main: weathermood } = data.weather[0];
  const { name } = data;
  const { speed } = data.wind;
  const { country, sunset, sunrise } = data.sys;

  return {
    temp,
    humidity,
    weathermood,
    name,
    speed,
    country,
    sunset,
    sunrise,
  };
};
