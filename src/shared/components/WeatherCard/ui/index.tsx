import "./styles.css";

import React, { useMemo } from "react";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

import DetailCard from "../../detailCard/ui";
import type { WeatherCardProps, WeatherIconMap } from "../model/types";

const WEATHER_ICONS: WeatherIconMap = {
  Clear: "wi-day-sunny",
  Clouds: "wi-day-cloudy",
  "Few clouds": "wi-day-cloudy",
  "Scattered clouds": "wi-day-cloudy-gusts",
  "Broken clouds": "wi-cloudy",
  "Overcast clouds": "wi-cloudy",
  Rain: "wi-day-rain",
  "Light rain": "wi-day-sprinkle",
  "Moderate rain": "wi-rain",
  "Heavy rain": "wi-rain",
  Drizzle: "wi-sprinkle",
  Thunderstorm: "wi-day-thunderstorm",
  Snow: "wi-day-snow",
  Mist: "wi-dust",
  Haze: "wi-fog",
  Fog: "wi-fog",
  Smoke: "wi-smoke",
  Dust: "wi-dust",
};

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temp,
  humidity,
  weathermood,
  description,
  name,
  speed,
  country,
  sunset,
  sunrise,
  feels_like,
  isLoading = false,
  error = null,
}) => {
  const weatherIcon = useMemo(() => {
    if (!weathermood) return "wi-day-sunny";
    return (
      WEATHER_ICONS[weathermood] ||
      WEATHER_ICONS[description || ""] ||
      "wi-day-sunny"
    );
  }, [weathermood, description]);

  const sunsetTime = useMemo(() => {
    return sunset ? formatTime(sunset) : "--:--";
  }, [sunset]);

  const sunriseTime = useMemo(() => {
    return sunrise ? formatTime(sunrise) : "--:--";
  }, [sunrise]);

  const currentDateTime = useMemo(() => {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 w-full max-w-4xl mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Unable to load weather data
          </h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!temp && !name) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 max-w-4xl mx-auto">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">🌍</div>
          <p>Search for a city to see weather information</p>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl dark:shadow-gray-900/50 overflow-hidden max-w-4xl w-full border border-gray-200 dark:border-gray-700">
      {/* Weather Icon Section */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 p-8 text-center">
        <div className="text-8xl md:text-9xl text-accent dark:text-primary mb-4">
          <i className={`wi ${weatherIcon}`}></i>
        </div>
        <div className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 capitalize">
          {description || weathermood || "Clear"}
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="flex flex-col md:flex-row">
        {/* Temperature Section */}
        <div className="flex-1 bg-gradient-to-r from-accent to-accent/90 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="text-6xl md:text-7xl font-light">
              {temp ? Math.round(temp) : "--"}°
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-semibold">
                {name || "Unknown"}
              </div>
              <div className="text-lg opacity-90">{country || ""}</div>
              {feels_like && (
                <div className="text-sm opacity-75 mt-2">
                  Feels like {Math.round(feels_like)}°
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date/Time Section */}
        <div className="bg-primary text-white p-6 md:p-8 flex items-center justify-center md:w-80">
          <div className="text-center">
            <div className="text-lg md:text-xl font-semibold mb-2">
              {currentDateTime.split(",")[0]}
            </div>
            <div className="text-sm md:text-base opacity-90">
              {currentDateTime.split(",").slice(1).join(",").trim()}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <DetailCard
            icon={<LuSunrise className="h-6 w-6" />}
            detail={sunriseTime}
            label="Sunrise"
          />
          <DetailCard
            icon={<LuSunset className="h-6 w-6" />}
            detail={sunsetTime}
            label="Sunset"
          />
          <DetailCard
            icon={<WiHumidity className="h-8 w-8" />}
            detail={humidity ? `${humidity}%` : "--"}
            label="Humidity"
          />
          <DetailCard
            icon={<WiStrongWind className="h-8 w-8" />}
            detail={speed ? `${Math.round(speed)} m/s` : "--"}
            label="Wind Speed"
          />
        </div>
      </div>
    </article>
  );
};
