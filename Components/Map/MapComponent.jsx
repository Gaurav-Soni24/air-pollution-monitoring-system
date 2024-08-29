"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Dynamic import of Map components to prevent SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const UpdateMapCenter = dynamic(() => import('./UpdateMapCenter'), { ssr: false }); // Correctly importing the UpdateMapCenter component

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correctly load leaflet icons from the public folder
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet/images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
  });
}

// AQI colors based on levels
const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

// Main MapComponent
const MapComponent = ({ lat = null, log = null, setLat, setLog }) => {
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

  if (lat == null || log == null) {
    return <div>No location selected</div>;
  }

  const position = [lat, log];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
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
