import { createLazyFileRoute } from "@tanstack/react-router";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { SearchInput } from "../shared/components/searchInput";
import { WeatherCard } from "../shared/components/weatherCard/ui";
import { fetchWeatherInfo } from "../shared/services";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [searchValue, setSearchValue] = useState("New Delhi");
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [isSearchPending, setIsSearchPending] = useState(false);

  const {
    data: tempInfo,
    isLoading,
    error,
    refetch,
    isError,
  } = useQuery(["weather", searchValue], () => fetchWeatherInfo(searchValue), {
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    enabled: Boolean(searchValue.trim()),
    retry: (failureCount, error) => {
      // Don't retry if it's a user input error (like city not found)
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 2;
    },
    onError: () => {
      // Error will be handled in the UI
    },
  });

  // Debounced search handler with adaptive timing
  const debouncedSetSearchValue = useCallback(
    debounce((city: string) => {
      if (city.trim()) {
        setSearchValue(city);
        setHasUserSearched(true);
        setIsSearchPending(false);
      }
    }, 1200), // 1.2 second debounce for weather API calls
    []
  );

  const handleSearch = useCallback(
    (city: string) => {
      if (city.trim() && city !== searchValue) {
        setIsSearchPending(true);
        debouncedSetSearchValue(city);
      }
    },
    [searchValue, debouncedSetSearchValue]
  );

  const handleSelectCity = useCallback(
    (city: string) => {
      if (city.trim()) {
        // Cancel any pending debounced search when user selects a city
        debouncedSetSearchValue.cancel();
        setIsSearchPending(false);
        setSearchValue(city);
        setHasUserSearched(true);
        refetch();
      }
    },
    [debouncedSetSearchValue, refetch]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearchValue.cancel();
    };
  }, [debouncedSetSearchValue]);

  // Auto-search on component mount if there's a default value
  useEffect(() => {
    if (searchValue && !hasUserSearched) {
      const timer = setTimeout(() => {
        refetch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchValue, hasUserSearched, refetch]);

  const errorMessage = isError && error instanceof Error ? error.message : null;

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
            Weather<span className="text-accent">.</span>ly
          </h1>

          {/* Search Input */}
          <div className="flex justify-center mb-6 animate-slide-up">
            <div className="w-full max-w-lg">
              <SearchInput
                onSearch={handleSearch}
                onSelectCity={handleSelectCity}
                placeholder="Search for a city..."
                className="w-full"
                autoFocus
                isSearchPending={isSearchPending}
              />
              {isSearchPending && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  ⏳ Searching will begin in a moment...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Weather Content */}
        <div className="flex justify-center animate-slide-up">
          <div className="w-full max-w-5xl">
            {isSearchPending && (
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  Searching...
                </div>
              </div>
            )}
            <WeatherCard
              {...tempInfo}
              isLoading={isLoading}
              error={errorMessage}
            />
          </div>
        </div>

        {/* Additional Info */}
        {tempInfo && !isLoading && !errorMessage && (
          <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 space-y-2 animate-fade-in">
            <p className="flex items-center justify-center gap-2">
              <span>🕒</span>
              Last updated: {new Date().toLocaleString()}
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>🔄</span>
              Data refreshes automatically every 5 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
