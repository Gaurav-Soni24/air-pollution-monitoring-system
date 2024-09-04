// Importing necessary dependencies and styles
"use client";

import React, { useState, useRef, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import "./Location.css";

// Location component
const Location = ({ setLog, setLat }) => {
  // State variables
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [query, setQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);
  const apiKey = "2c746d271c1a4632b04eebccb46442dd";

  // Toggle search bar visibility
  const toggleSearch = () => setIsSearchActive((prev) => !prev);

  // Fetch locations from the API
  const fetchLocations = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setResults(data.features || []);
      setActiveIndex(-1);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Handle user input change
  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() !== "") {
      fetchLocations(searchQuery);
    } else {
      setResults([]);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location.properties.formatted);
    setIsSearchActive(false);
    setQuery("");
    setResults([]);
    setLog(location.geometry.coordinates[0]);
    setLat(location.geometry.coordinates[1]);
    toggleSearch();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleLocationSelect(results[activeIndex]);
    }
  };

  // Focus input when search is activated
  useEffect(() => {
    if (isSearchActive) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  // Clear input field
  const clearInput = () => {
    setQuery("");
    setResults([]);
    setIsSearchActive(false);
  };

  return (
    <div className="location" onClick={toggleSearch} >
      {/* Display selected location or search bar */}
      <span
        className="place"
        style={{ display: isSearchActive ? "none" : "block" }}
      >
        {selectedLocation}
      </span>
      <div className={`search-wrapper ${isSearchActive ? "active" : ""}`}>
        <div className="searchBar">
          <input
            type="text"
            className="inputBar"
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search City"
            style={{ display: isSearchActive ? "block" : "none" }}
            aria-label="Search City"
          />
          {query && isSearchActive && (
            <Icon.XCircle onClick={clearInput} className="clear-icon" aria-label="Clear Search" />
          )}
          <Icon.Search className="search-icon" aria-label="Toggle Search" />
        </div>

        {/* Render search results */}
        <div
          className="resultWrapper"
          style={{ display: isSearchActive && results.length ? "block" : "none" }}
        >
          {results.map((result, index) => (
            <div
              key={index}
              className={`result ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleLocationSelect(result)}
              role="button"
              tabIndex={0}
              aria-selected={index === activeIndex}
            >
              {result.properties.formatted}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
