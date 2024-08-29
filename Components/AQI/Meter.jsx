 "use client"

import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';
import './AqiCard.css';


const Meter = ({value,label,uplimit}) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    const calculateColor = (value) => {
      if (value <= 80) {
        return '#00ad00'; 
      } else if (value <= 150) {
        return '#90b302'; // Yellow
      } else if (value <= 200) {
        return '#d76c00'; // Orange
      } else if (value <= 250) {
        return '#de0101'; // Red
      } else if (value <= 300) {
        return '#90009e'; // Purple
      } else {
        return '#7e0023'; // Maroon
      }
    };

    const newColor = calculateColor(value);
    setColor(newColor);
  }, [value]);

  return (
    <div className='meter'>
      <Circle 
        percent={(value/uplimit)*100} 
        strokeWidth={6} 
        trailWidth={2} 
        strokeColor={color} 
      />
      <div className='details'>
        <div className='value' style={{ color: color }}>
          {value}<span>{label}</span>
        </div>
      </div>
    </div>
  );
}

export default Meter;