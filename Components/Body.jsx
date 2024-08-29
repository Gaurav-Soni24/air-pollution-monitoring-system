"use client" 

import React, { useState } from 'react'
import Navbar from './NavBar/Navbar'
import AqiCard from './AQI/AqiCard';
import './Body.css'
import HistoricalAqiGraph from './HistoryCard/HistoricalAqiGraph'
import MapCard from './Map/MapCard';

const Body = () => {

  const [log, setLog] = useState(null);
  const [lat, setLat] = useState(null);

  return (
    <div className='body'>
      <Navbar setLat={setLat} setLog={setLog} />
      <div className="dashboard">
        <AqiCard lat={lat} log={log} />
        <MapCard lat={lat} log={log} setLog={setLog} setLat={setLat}/>
        <HistoricalAqiGraph lat={lat} log={log} />
      </div>
    </div>
  )
}

export default Body
