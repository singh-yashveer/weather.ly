import React, { useEffect, useState } from "react";

interface City {
  id: number;
  name: string;
}

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch cities from API
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.example.com/cities");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, cities]);

  const handleSelectCity = (city: City) => {
    setQuery(city.name);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a city..."
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredCities.map(city => (
            <div
              key={city.id}
              onClick={() => handleSelectCity(city)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {city.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
