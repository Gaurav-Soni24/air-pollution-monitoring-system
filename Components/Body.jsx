"use client" 

import React, { useState } from 'react'
import Navbar from './NavBar/Navbar'
import AqiCard from './AQI/AqiCard';
import MapCard from './Map/MapCard';
import './Body.css'

const Body = () => {

  const [log, setLog] = useState(null);
  const [lat, setLat] = useState(null);

  return (
    <div className='body'>
      <Navbar setLat={setLat} setLog={setLog} />
      <div className="dashboard">
        <AqiCard lat={lat} log={log} />
        <MapCard lat={lat} log={log} setLog={setLog} setLat={setLat}/>
      </div>
    </div>
  )
}

export default Body
