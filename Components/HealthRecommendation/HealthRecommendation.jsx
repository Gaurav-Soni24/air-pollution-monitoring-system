'use client';

import React, { useEffect, useState } from 'react';
import recommendationsData from './aqi_health_recommendations.json'; // Import the JSON file
import './HealthRecommendation.css';

const getHealthRecommendation = (AQI) => {
  if (AQI >= 0 && AQI <= 50) {
    return recommendationsData.recommendations[0];
  } else if (AQI >= 51 && AQI <= 100) {
    return recommendationsData.recommendations[1];
  } else if (AQI >= 101 && AQI <= 150) {
    return recommendationsData.recommendations[2];
  } else if (AQI >= 151 && AQI <= 200) {
    return recommendationsData.recommendations[3];
  } else if (AQI >= 201 && AQI <= 300) {
    return recommendationsData.recommendations[4];
  } else if (AQI >= 301 && AQI <= 500) {
    return recommendationsData.recommendations[5];
  } else {
    return null; // In case AQI is outside the expected range
  }
};

const HealthRecommendation = ({ lat, log }) => {
  const [AQI, setAQI] = useState(null); // Initialize as null to indicate no data initially

  useEffect(() => {
    const fetchAQI = async () => {
      if (lat && log) {
        try {
          const response = await fetch(
            `https://api.waqi.info/feed/geo:${lat};${log}/?token=57b74b070c5f096f0f45fc49954843db05043616`
          );
          const data = await response.json();
          if (data && data.status === 'ok' && data.data) {
            setAQI(data.data.aqi);
            console.log("AQI:", data.data.aqi);
            console.log("from health");
          }
        } catch (error) {
          console.error('Error fetching the AQI data:', error);
        }
      }
    };

    fetchAQI();
  }, [lat, log]);

  const recommendation = AQI !== null ? getHealthRecommendation(AQI) : null;

  return (
    <div className="health-recommendation">
      {AQI !== null ? (
        <>
          <h1>Health Recommendations</h1>
          <p className="aqi-value">Air Quality Index (AQI): {AQI}</p>
          {recommendation ? (
            <>
              <h3>{recommendation.description}</h3>
              <div className="recommendation-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzzhw6o6GESStymKixp060pKrMkbqnSNGvQ&s" alt="General Population Icon" />
                <p><strong>General Population:</strong> {recommendation.general_population}</p>
              </div>
              <div className="recommendation-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4Koc7ZJL7L_DhkC9rUnmTZOppM9tRTlEkQ&s" alt="Children Icon" />
                <p><strong>Children:</strong> {recommendation.children}</p>
              </div>
              <div className="recommendation-item">
                <img src="data:image/png;base64,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" alt="Adults Icon" />
                <p><strong>Adults:</strong> {recommendation.adults}</p>
              </div>
              <div className="recommendation-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRfCwW5emgxAi2FqpBH_6V4J_IoPx-6tBpw&s" alt="Sensitive Groups Icon" />
                <p><strong>Sensitive Groups:</strong> {recommendation.sensitive_groups}</p>
              </div>
            </>
          ) : (
            <p>No recommendations available for this AQI value.</p>
          )}
        </>
      ) : (
        <p>Loading AQI data...</p>
      )}
    </div>
  );
};

export default HealthRecommendation;
