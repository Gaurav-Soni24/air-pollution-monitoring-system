"use client";
import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'; // Keep this for icons
import Link from 'next/link';
import './Navbar.css'; // Assuming your CSS file is named 'Navbar.css'

const Navbar = () => {
    const [isChecked, setIsChecked] = useState(true); // State for toggle switch
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

    const handleChange = () => {
        setIsChecked(!isChecked);
        console.log(isChecked ? 'Switch is OFF' : 'Switch is ON');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <nav className='nav'>
                <div className='logo'>
                    Air<span>Watch</span>
                </div>
                <div className='menu'>
                    <a href='#' className='links'>Home</a>
                    <a href='#' className='links'>Map</a>
                    <a href='#' className='links'>About</a>
                    <a href='#' className='links'>Login</a>
                    <i className="ri-menu-line" onClick={toggleMenu}></i> {/* Menu icon for mobile */}
                </div>
            </nav>
            <div className={`sideMenu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href='#' className='links'>Home</a></li>
                    <li><a href='#' className='links'>Map</a></li>
                    <li><a href='#' className='links'>About</a></li>
                    <li><a href='#' className='links'>Login</a></li>
                </ul>
            </div>
            {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </div>
    );
};

export default Navbar;
