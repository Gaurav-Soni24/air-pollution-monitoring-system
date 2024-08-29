 "use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fixing the default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// AQI colors based on levels
const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

// Component to update map center and display AQI circle
const UpdateMapCenter = ({ lat, log, aqi }) => {
  const map = useMapEvents({
    click(e) {
      // Update the latitude and longitude based on where the user clicks
      map.setView([e.latlng.lat, e.latlng.lng], map.getZoom());
    },
  });

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

// Main MapComponent
const MapComponent = ({ lat, log, setLat, setLog }) => {
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    const fetchAqiData = async () => {
      if (lat !== null && log !== null) {
        try {
          const response = await axios.get(`https://api.waqi.info/feed/geo:${lat};${log}/?token=57b74b070c5f096f0f45fc49954843db05043616`);
          const aqiData = response.data.data.aqi;
          setAqi(aqiData);
        } catch (error) {
          console.error('Error fetching AQI data:', error);
        }
      }
    };

    fetchAqiData();
  }, [lat, log]);

  const handleMapClick = (e) => {
    setLat(e.latlng.lat);
    setLog(e.latlng.lng);
  };

  // Check if lat and log are null
  if (lat === null || log === null) {
    return <div>No location selected</div>;
  }

  const position = [lat, log];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TileLayer
        url="https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=57b74b070c5f096f0f45fc49954843db05043616"
        attribution='&copy; <a href="https://waqi.info">AQICN</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          AQI: {aqi !== null ? aqi : 'Loading...'}
        </Popup>
      </Marker>
      <UpdateMapCenter lat={lat} log={log} aqi={aqi} />
    </MapContainer>
  );
};

export default MapComponent;
