import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "react-query";

import { SearchInput } from "../shared/components/searchInput";
import { WeatherCard } from "../shared/components/weatherCard/ui";
import { fetchWeatherInfo } from "../shared/services";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [searchValue, setSearchValue] = useState("New Delhi");

  const {
    data: tempInfo,
    isLoading,
    error,
    refetch,
  } = useQuery(["weather", searchValue], () => fetchWeatherInfo(searchValue), {
    refetchInterval: 60000,
  });

  const handleSelectCity = (city: string) => {
    setSearchValue(city);
    refetch();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-8">
        <SearchInput
          onSearch={setSearchValue}
          onSelectCity={handleSelectCity}
        />
      </div>

      {isLoading && <p>Loading weather data...</p>}

      {error instanceof Error && (
        <p>Error fetching weather data: {error.message}</p>
      )}
      <WeatherCard {...tempInfo} />
    </div>
  );
}

export default Index;
