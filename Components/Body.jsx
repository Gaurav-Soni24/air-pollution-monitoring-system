"use client" 

import React, { useState } from 'react'
import Navbar from './NavBar/Navbar'
import AqiCard from './AQI/AqiCard';
import './Body.css'
import HistoricalAqiGraph from './HistoryCard/HistoricalAqiGraph'
import MapCard from './Map/MapCard';
import HealthRecommendation from './HealthRecommendation/HealthRecommendation';
import Location from './Location/Location';
import Alert from './Alert/Alert';
const Body = () => {

  const [log, setLog] = useState(null);
  const [lat, setLat] = useState(null);

  return (
    <div className='body'>
      <Navbar/>
      <Location setLog={setLog} setLat={setLat}/>
      <Alert lat={lat} log={log} />
      <div className="dashboard">
        <AqiCard lat={lat} log={log} />
        <MapCard lat={lat} log={log} setLog={setLog} setLat={setLat}/>
        <HistoricalAqiGraph lat={lat} log={log} />
        <HealthRecommendation lat={lat} log={log}/>
      </div>
    </div>
  )
}

export default Body
