 "use client"

import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';
import './AqiCard.css';


const AqiMeter = ({AQI}) => {
  const [color, setColor] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    const calculateColor = (AQI) => {
      if (AQI <= 80) {
        return '#00ad00'; 
      } else if (AQI <= 150) {
        return '#90b302'; // Yellow
      } else if (AQI <= 200) {
        return '#d76c00'; // Orange
      } else if (AQI <= 250) {
        return '#de0101'; // Red
      } else if (AQI <= 300) {
        return '#90009e'; // Purple
      } else {
        return '#7e0023'; // Maroon
      }
    };

    const calculateLevel = (AQI) => {
      if (AQI <= 50) {
        return 'Very Good';
      } else if (AQI <= 100) {
        return 'Good';
      } else if (AQI <= 150) {
        return 'Moderate';
      } else if (AQI <= 200) {
        return 'Poor';
      } else if (AQI <= 300) {
        return 'Very Poor';
      } else {
        return 'Hazardous';
      }
    };

    const newColor = calculateColor(AQI);
    const newLevel = calculateLevel(AQI);
    setColor(newColor);
    setLevel(newLevel);
  }, [AQI]);

  return (
    <div className='AQI'>
      <Circle 
        percent={(AQI / 500) * 100} 
        strokeWidth={5} 
        trailWidth={1} 
        strokeColor={color} 
      />
      <div className='AQI-details'>
        <div className='AQI-value' style={{ color: color }}>
          {AQI}<span>AQI</span>
        </div>
        <div className='AQI-level'  style={{ color: color }} >
          {level}
        </div>
      </div>
    </div>
  );
}

export default AqiMeter;
