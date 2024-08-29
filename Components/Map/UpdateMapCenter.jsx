import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const UpdateMapCenter = ({ lat, log, aqi }) => {
  const map = useMap();

  useEffect(() => {
    if (lat !== null && log !== null) {
      map.setView([lat, log], 13);
    }
  }, [lat, log, map]);

  useEffect(() => {
    if (lat !== null && log !== null && aqi !== null) {
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

const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

export default UpdateMapCenter;
