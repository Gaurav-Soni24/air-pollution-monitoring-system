"use client" 

import React, { useState } from 'react'
import Navbar from './NavBar/Navbar'

const Body = () => {

  const [log, setLog] = useState(null);
  const [lat, setLat] = useState(null);

  return (
    <div className='body'>
      <Navbar setLat={setLat} setLog={setLog} />
    </div>
  )
}

export default Body
