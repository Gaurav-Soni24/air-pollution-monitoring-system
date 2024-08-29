"use client"
import React from 'react'
import Logo from './Logo'
import Location from './Location'
import Button from './Button'
import './Navbar.css'

const Navbar = ({setLog,setLat}) => {
  return (
    <div className='nav'>
      <Logo/>
      <Location setLat={setLat} setLog={setLog}/>
      <Button/>
    </div>
  )
}

export default Navbar
