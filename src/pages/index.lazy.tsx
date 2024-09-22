import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import SearchInput from "../shared/components/searchInput/ui";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [searchValue, setSearchValue] = useState("New Delhi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a560b244567b8df79618c3fa33b6a022`;
      //your api

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure, //storing the data in the form of object
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tempInfo, "tempInfo");

  //useEffect hook is used for displaying the weather info of the city which is written in the search box by default
  useEffect(() => {
    // getWeatherInfo();
  }, []);

  return (
    <div>
      <div>
        <SearchInput />
        <h1>React App with Tailwind CSS</h1>
      </div>
      <h3>Welcome Home!</h3>
    </div>
  );
}
