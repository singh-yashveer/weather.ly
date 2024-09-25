import "./styles.css";

import React, { useEffect } from "react";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

import DetailCard from "../../detailCard/ui";
import type { WeatherCardProps } from "../model/types";

export const WeatherCard = ({
  temp,
  humidity,
  weathermood,
  name,
  speed,
  country,
  sunset,
  sunrise,
}: WeatherCardProps) => {
  const [weatherState, setWeatherState] = React.useState("");

  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi-dust");
          break;

        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  const sunSet = sunset;
  const sunSetData = sunSet ? new Date(sunSet * 1000) : new Date();
  const sunSetTime = `${sunSetData.getHours()}:${sunSetData.getMinutes()}`;

  const sunRise = sunrise;
  const sunRiseData = sunRise ? new Date(sunRise * 1000) : new Date();
  const sunRiseTime = `${sunRiseData.getHours()}:${sunRiseData.getMinutes()}`;

  return (
    <>
      <article className="flex-col flex-wrap rounded-3xl shadow-2xl h-auto  max-h-[700px] w-[1/2] dark:border dark:border-accent">
        <div className="flex-1 h-1/3 flex items-center justify-center text-[84px]">
          <i className={`wi ${weatherState}`}></i>
        </div>

        <div className="flex-col md:flex-row">
          <div className="flex-[0 0 40%] h-2/5 bg-dark flex items-center text-white">
            <div className="w-full flex justify-around mr-5 text-[65px]">
              <span>{temp}&deg;</span>
            </div>
            <div className="flex-[0 0 60%] flex flex-col w-full h-full justify-center">
              <div className="uppercase text-4xl font-light">{weathermood}</div>
              <div className="text-base">
                {name}, {country}
              </div>
            </div>
          </div>
          <div className="bg-accent text-white h-2/5 md:h-auto text-3xl font-bold flex flex-[0 0 30%] justify-around items-center text-center">
            {new Date().toLocaleString()}
          </div>
        </div>

        <div className="flex flex-wrap gap-5 p-6 justify-around items-center w-full px-8">
          <DetailCard
            icon={<LuSunset />}
            detail={`${sunSetTime} PM`}
            label="Sunset"
          />
          <DetailCard
            icon={<LuSunrise />}
            detail={`${sunRiseTime} AM`}
            label="Sunrise"
          />
          <DetailCard
            icon={<WiHumidity />}
            detail={humidity ? `${humidity}%` : ""}
            label="Humidity"
          />
          <DetailCard icon={<WiStrongWind />} detail={speed} label="Speed" />
        </div>
      </article>
    </>
  );
};
