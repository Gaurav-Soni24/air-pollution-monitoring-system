 "use client"
import React, { useState, useEffect } from 'react';
import AqiMeter from './AqiMeter';
import './AqiCard.css';
import Meter from './Meter';

const AqiCard = ({ lat, log }) => {
    const [AQI, setAQI] = useState(0);
    const [pm25, setPm25] = useState(0);
    const [pm10, setPm10] = useState(0);
    const [co, setCo] = useState(0);
    const [no2, setNo2] = useState(0);
    const [o3, setO3] = useState(0);
    const [so2, setSo2] = useState(0);

    useEffect(() => {
        const fetchAQI = async () => {
            try {
                const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${log}/?token=57b74b070c5f096f0f45fc49954843db05043616`);
                const data = await response.json();
                if (data && data.status === "ok" && data.data) {
                    setAQI(data.data.aqi);
                    setPm25(data.data.iaqi.pm25?.v || 0);
                    setPm10(data.data.iaqi.pm10?.v || 0);
                    setCo(data.data.iaqi.co?.v || 0);
                    setNo2(data.data.iaqi.no2?.v || 0);
                    setO3(data.data.iaqi.o3?.v || 0);
                    setSo2(data.data.iaqi.so2?.v || 0);
                }
            } catch (error) {
                console.error("Error fetching the AQI data:", error);
            }
        };

        fetchAQI();
    }, [lat, log]);

    return (
        <div className='card'>
            <div className="label">
                <h1>Air Quality</h1>
                <div>!</div>
            </div>
            <div className="cardBody">
                <div className='aqi-meter'>
                    <AqiMeter AQI={AQI} />
                </div>
                <div className='meters-grid'>
                    <Meter uplimit={1000} value={pm25} label={'PM2.5'} />
                    <Meter uplimit={1500} value={pm10} label={'PM10'} />
                    <Meter uplimit={1000} value={co} label={'CO'} />
                    <Meter uplimit={2000} value={no2} label={'NO2'} />
                    <Meter uplimit={500} value={o3} label={'O3'} />
                    <Meter uplimit={5000} value={so2} label={'SO2'} />
                </div>
            </div>
        </div>
    );
};

export default AqiCard;
