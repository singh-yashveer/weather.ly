import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import { fetchCities } from "../api/cityService";
import type { ApiResponse, City, SearchInputProps } from "../model";

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onSelectCity,
}) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    data: cities = { data: [] } as ApiResponse,
    isLoading,
    isError,
  } = useQuery(["cities", query], () => fetchCities(query), {
    enabled: query.length >= 3,
    staleTime: 5000,
  });

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 1000),
    [onSearch]
  );

  useEffect(() => {
    if (query.length >= 3) {
      debouncedSearch(query);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  useEffect(() => {
    setShowDropdown(query.length > 0 && cities.data.length > 0);
  }, [query, cities.data]);

  const handleSelectCity = (city: City) => {
    setQuery(city.name);
    setShowDropdown(false);
    onSelectCity(city.name);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full p-2 border caret-slate-500 bg-white dark:bg-dark border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-primary"
        aria-autocomplete="list"
        aria-controls="city-dropdown"
        aria-expanded={showDropdown}
        ref={inputRef}
        onFocus={() => query.length > 0 && setShowDropdown(true)}
      />
      {isLoading && <p className="text-sm text-gray-600">Loading cities...</p>}
      {isError && (
        <p className="text-sm text-red-500">Error fetching cities.</p>
      )}
      {showDropdown && cities.data.length > 0 && (
        <div
          id="city-dropdown"
          role="listbox"
          ref={dropdownRef}
          className="absolute top-12 left-0 right-0 bg-white dark:bg-dark border border-gray-300 z-10 max-h-52 overflow-y-auto rounded-xl"
        >
          {cities.data.map((city: City, index: number) => (
            <div
              key={city.id || `${city.name}-${index}`}
              role="option"
              onClick={() => handleSelectCity(city)}
              className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-100"
            >
              {city.name}
            </div>
          ))}
        </div>
      )}
      {showDropdown && cities.data.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10 p-2">
          <p className="text-sm text-gray-600">No cities found.</p>
        </div>
      )}
    </div>
  );
};
