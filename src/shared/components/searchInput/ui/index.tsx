import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiLoader, FiMapPin, FiSearch, FiX } from "react-icons/fi";
import { useQuery } from "react-query";

import { fetchCities } from "../api/cityService";
import type {
  ApiResponse,
  City,
  SearchInputProps,
  SearchState,
} from "../model";

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onSelectCity,
  placeholder = "Search for a city...",
  className = "",
  disabled = false,
  autoFocus = false,
  clearOnSelect = false,
  isSearchPending = false,
}) => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    isLoading: false,
    error: null,
    showDropdown: false,
    selectedIndex: -1,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const cityRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    data: cities = { data: [] } as ApiResponse,
    isLoading: isFetchingCities,
    error: fetchError,
  } = useQuery(
    ["cities", searchState.query],
    () => fetchCities(searchState.query),
    {
      enabled: searchState.query.length >= 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      onError: error => {
        setSearchState(prev => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch cities",
        }));
      },
    }
  );

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 2) {
        onSearch(searchQuery);
      }
    }, 800),
    [onSearch]
  );

  const updateQuery = (newQuery: string) => {
    setSearchState(prev => ({
      ...prev,
      query: newQuery,
      selectedIndex: -1,
      error: null,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateQuery(value);

    if (value.length >= 2) {
      debouncedSearch(value);
    }
  };

  const handleSelectCity = (city: City) => {
    const cityName = `${city.name}${city.country ? `, ${city.country}` : ""}`;

    if (clearOnSelect) {
      updateQuery("");
    } else {
      updateQuery(cityName);
    }

    setSearchState(prev => ({
      ...prev,
      selectedIndex: -1,
    }));

    onSelectCity(city.name);
  };

  const handleClearSearch = () => {
    updateQuery("");
    setSearchState(prev => ({
      ...prev,
      selectedIndex: -1,
    }));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldShowDropdown || cities.data.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSearchState(prev => ({
          ...prev,
          selectedIndex: Math.min(
            prev.selectedIndex + 1,
            cities.data.length - 1
          ),
        }));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSearchState(prev => ({
          ...prev,
          selectedIndex: Math.max(prev.selectedIndex - 1, -1),
        }));
        break;
      case "Enter":
        e.preventDefault();
        if (searchState.selectedIndex >= 0) {
          handleSelectCity(cities.data[searchState.selectedIndex]);
        }
        break;
      case "Escape":
        setSearchState(prev => ({
          ...prev,
          selectedIndex: -1,
        }));
        break;
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setSearchState(prev => ({
        ...prev,
        selectedIndex: -1,
      }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      debouncedSearch.cancel();
    };
  }, [handleClickOutside, debouncedSearch]);

  // Calculate derived state directly instead of using effect
  const shouldShowDropdown =
    searchState.query.length >= 2 && cities.data.length > 0;
  const hasError = fetchError || searchState.error;

  // Scroll selected item into view
  useEffect(() => {
    if (
      searchState.selectedIndex >= 0 &&
      cityRefs.current[searchState.selectedIndex]
    ) {
      cityRefs.current[searchState.selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [searchState.selectedIndex]);
  const showNoResults =
    searchState.query.length >= 2 &&
    !isFetchingCities &&
    cities.data.length === 0;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchState.query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            // Don't modify state here, just rely on calculated shouldShowDropdown
          }}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`
            w-full pl-12 pr-12 py-4 text-lg
            bg-white dark:bg-gray-800
            border-2 border-gray-200 dark:border-gray-600
            rounded-2xl shadow-lg
            focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent
            dark:focus:ring-primary/20 dark:focus:border-primary
            transition-all duration-200 ease-in-out
            placeholder-gray-400 dark:placeholder-gray-500
            text-gray-900 dark:text-white
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
          `}
          aria-autocomplete="list"
          aria-controls="city-dropdown"
          aria-expanded={shouldShowDropdown}
          aria-activedescendant={
            searchState.selectedIndex >= 0
              ? `city-option-${searchState.selectedIndex}`
              : undefined
          }
        />

        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {isFetchingCities || isSearchPending ? (
            <FiLoader className="h-5 w-5 text-accent animate-spin" />
          ) : searchState.query ? (
            <button
              onClick={handleClearSearch}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              type="button"
              aria-label="Clear search"
            >
              <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Error message */}
      {hasError && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
          <span>⚠️</span>
          <span>
            {typeof hasError === "string"
              ? hasError
              : hasError instanceof Error
                ? hasError.message
                : "An error occurred"}
          </span>
        </div>
      )}

      {/* Dropdown */}
      {shouldShowDropdown && (
        <div
          id="city-dropdown"
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
          role="listbox"
        >
          {cities.data.map((city: City, index: number) => {
            const isSelected = index === searchState.selectedIndex;

            return (
              <div
                key={city.id || `${city.name}-${index}`}
                ref={el => (cityRefs.current[index] = el)}
                id={`city-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectCity(city)}
                className={`
                  px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0
                  transition-colors duration-150 ease-in-out
                  ${
                    isSelected
                      ? "bg-accent/10 dark:bg-primary/10 text-accent dark:text-primary"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <FiMapPin
                    className={`h-4 w-4 ${isSelected ? "text-accent dark:text-primary" : "text-gray-400"}`}
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {city.name}
                    </div>
                    {(city.country || city.countryCode) && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {city.country || city.countryCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {showNoResults && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              <FiMapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                No cities found for &ldquo;{searchState.query}&rdquo;
              </p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
