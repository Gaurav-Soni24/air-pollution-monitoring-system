"use client"; // Ensures this file is treated as a client component

import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const UpdateMapCenter = ({ lat, log, aqi }) => {
  const map = useMap();

  // Move code that depends on browser-specific objects to useEffect
  useEffect(() => {
    if (typeof window !== 'undefined' && lat !== null && log !== null) {
      map.setView([lat, log], 13);
    }
  }, [lat, log, map]);

  useEffect(() => {
    if (typeof window !== 'undefined' && lat !== null && log !== null && aqi !== null) {
      const circle = L.circle([lat, log], {
        color: getAqiColor(aqi),
        fillColor: getAqiColor(aqi),
        fillOpacity: 0.5,
        radius: 1000,
      }).addTo(map);

      return () => {
        map.removeLayer(circle);
      };
    }
  }, [lat, log, aqi, map]);

  return null;
};

// Helper function to get the color based on AQI level
const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

export default UpdateMapCenter;
