// src/components/CitySelector.js
import React, { useEffect, useState } from "react";
import { City } from "country-state-city";
import { removeVietnameseTones } from "./removeVietnamese";

const CitySelector = ({ selectedCity, onSelect }) => {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState(selectedCity || "");

  useEffect(() => {
    const vietnamCities = City.getCitiesOfCountry("VN");
    const cityNames = vietnamCities.map((c) => removeVietnameseTones(c.name));
    const uniqueCities = [...new Set(cityNames)].sort();
    setCities(uniqueCities);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (cities.includes(value)) {
      onSelect(`${value}, Vietnam`);
    }
  };

  return (
    <div>
      <input
        list="city-options"
        placeholder="Nhập tỉnh/thành phố..."
        value={inputValue}
        onChange={handleChange}
      />
      <datalist id="city-options">
        {cities.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </div>
  );
};

export default CitySelector;
