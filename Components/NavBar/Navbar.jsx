"use client"
import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import * as Icon from 'react-bootstrap-icons';

const Navbar = ({ setLog, setLat }) => {
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [query, setQuery] = useState("");
  const [searchSelected, setSearchSelected] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // For key navigation
  const inputBarRef = useRef(null);

  const searchClicked = () => {
    setSearchSelected(prev => !prev);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      fetchLocations(e.target.value);
    } else {
      setResults([]);
    }
  };

  const fetchLocations = async (query) => {
    const apiKey = '2c746d271c1a4632b04eebccb46442dd';
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`);
    const data = await response.json();
    setResults(data.features || []);
    setActiveIndex(-1); // Reset active index on new search
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.properties.formatted);
    setSearchSelected(false);
    setQuery("");
    setResults([]);
    console.log("Longitude:", location.geometry.coordinates[0]);
    setLog(location.geometry.coordinates[0]);
    console.log("Latitude:", location.geometry.coordinates[1]);
    setLat(location.geometry.coordinates[1]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      handleLocationSelect(results[activeIndex]);
    }
  };

  useEffect(() => {
    if (searchSelected) {
      inputBarRef.current.focus();
    }
  }, [searchSelected]);

  return (
    <div className='nav'>
      <div className='logo'>
        Air<span>Watch</span>
      </div>
      <div className='location'>
        <span className='place' style={{ display: searchSelected ? 'none' : 'block' }}>
          {selectedLocation}
        </span>
        <div className='search-wrapper'>
          <div className='searchBar'>
            <input
              type='text'
              className='inputBar'
              ref={inputBarRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder='Search City'
              style={{ display: searchSelected ? 'block' : 'none' }}
            />
            <Icon.Search onClick={searchClicked} />
          </div>
          <div
            className="resultWrapper"
            style={{ display: searchSelected ? 'block' : 'none' }}
          >
            {results.map((result, index) => (
              <div
                key={index}
                className={`result ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleLocationSelect(result)}
                style={{
                  backgroundColor: index === activeIndex ? '#eee' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {result.properties.formatted}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='button'>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Map</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
