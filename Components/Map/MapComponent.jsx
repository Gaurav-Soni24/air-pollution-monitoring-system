"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

// AQI colors based on levels
const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

const MapComponent = ({ lat = null, log = null, setLat, setLog }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Store the map instance
  const [aqi, setAqi] = useState(null);
  const markerLayerRef = useRef(null); // Reference for the marker layer

  useEffect(() => {
    if (lat === null || log === null) return;

    // Initialize the OpenLayers map only once
    if (!mapRef.current) {
      const initialMap = new Map({
        target: mapContainerRef.current,
        layers: [
          new TileLayer({
            source: new OSM(), // OpenStreetMap layer
          }),
        ],
        view: new View({
          center: fromLonLat([log, lat]),
          zoom: 13,
        }),
      });

      mapRef.current = initialMap;
    } else {
      // Update the map view whenever lat or log change
      mapRef.current.getView().setCenter(fromLonLat([log, lat]));
      mapRef.current.getView().setZoom(13);
    }

    // Clear existing markers and add a new marker with AQI color
    if (markerLayerRef.current) {
      mapRef.current.removeLayer(markerLayerRef.current);
    }

    const vectorSource = new VectorSource();
    const marker = new Feature({
      geometry: new Point(fromLonLat([log, lat])),
    });

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: getAqiColor(aqi) }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
      })
    );

    vectorSource.addFeature(marker);

    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    mapRef.current.addLayer(markerLayer);
    markerLayerRef.current = markerLayer; // Save reference to the marker layer

    // Clean up map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(null);
        mapRef.current = null;
      }
    };
  }, [lat, log, aqi]);

  // Fetch AQI data based on latitude and longitude
  useEffect(() => {
    const fetchAqiData = async () => {
      if (lat !== null && log !== null) {
        try {
          const response = await axios.get(
            `https://api.waqi.info/feed/geo:${lat};${log}/?token=57b74b070c5f096f0f45fc49954843db05043616`
          );
          const aqiData = response.data.data.aqi;
          setAqi(aqiData);
        } catch (error) {
          console.error('Error fetching AQI data:', error);
        }
      }
    };

    fetchAqiData();
  }, [lat, log]);

  if (lat === null || log === null) {
    return <div>No location selected</div>;
  }

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default MapComponent;
