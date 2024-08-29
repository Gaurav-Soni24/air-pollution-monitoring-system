 "use client"
import React from 'react'
import MapComponent from './MapComponent'
import './MapCard.css'

const MapCard = ({lat,log,setLog,setLat}) => {
  return (
    <div className='mapCard'>
      <div className="mapArea">
        <MapComponent lat={lat} log={log} setLog={setLog} setLat={setLat}/>
      </div>
    </div>
  )
}

export default MapCard
