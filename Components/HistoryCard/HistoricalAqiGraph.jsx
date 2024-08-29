 "use client"

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './HistoricalAqiGraph.css';


const HistoricalAqiGraph = ({ lat, log }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        console.log("lat:", lat, "log:", log);
        if (lat && log) {
            console.log(`Fetching AQI data for lat: ${lat}, log: ${log}`);

            const fetchHistoricalAQI = async () => {
                try {
                    const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${log}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone`);
                    const data = await response.json();

                    console.log("API Response:", data);

                    if (data && data.hourly) {
                        const { time, pm10, pm2_5, carbon_monoxide, nitrogen_dioxide, sulphur_dioxide, ozone } = data.hourly;

                        const dates = time ? time.slice(0, 5) : [];
                        const pm25Values = pm2_5 ? pm2_5.slice(0, 5) : [];
                        const pm10Values = pm10 ? pm10.slice(0, 5) : [];
                        const coValues = carbon_monoxide ? carbon_monoxide.slice(0, 5) : [];
                        const no2Values = nitrogen_dioxide ? nitrogen_dioxide.slice(0, 5) : [];
                        const so2Values = sulphur_dioxide ? sulphur_dioxide.slice(0, 5) : [];
                        const o3Values = ozone ? ozone.slice(0, 5) : [];

                        setChartData({
                            labels: dates,
                            datasets: [
                                {
                                    label: 'PM2.5 (μg/m³)',
                                    data: pm25Values,
                                    fill: false,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    tension: 0.1,
                                },
                                {
                                    label: 'PM10 (μg/m³)',
                                    data: pm10Values,
                                    fill: false,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    tension: 0.1,
                                },
                                {
                                    label: 'CO (μg/m³)',
                                    data: coValues,
                                    fill: false,
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    tension: 0.1,
                                },
                                {
                                    label: 'NO2 (μg/m³)',
                                    data: no2Values,
                                    fill: false,
                                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    tension: 0.1,
                                },
                                {
                                    label: 'SO2 (μg/m³)',
                                    data: so2Values,
                                    fill: false,
                                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                                    borderColor: 'rgba(255, 206, 86, 1)',
                                    tension: 0.1,
                                },
                                {
                                    label: 'O3 (μg/m³)',
                                    data: o3Values,
                                    fill: false,
                                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                    borderColor: 'rgba(255, 159, 64, 1)',
                                    tension: 0.1,
                                },
                            ],
                        });
                    } else {
                        setChartData(null);
                    }
                } catch (error) {
                    console.error("Error fetching the historical AQI data:", error);
                    setChartData(null); // Reset chart data on error
                }
            };

            fetchHistoricalAQI();
        } else {
            setChartData(null); // No location, reset chart data
        }
    }, [lat, log]); // Dependency array


    return (
        <div className="historical-aqi-graph">
            {lat && log ? (
                chartData ? (
                    <>
                        <h2>Past 5 Days Air Quality</h2>
                        <Line data={chartData} />
                    </>
                ) : (
                    <>
                        <h2>Past 5 Days Air Quality</h2>
                        <p>Loading data...</p>
                    </>
                )
            ) : (
                <>
                    <h2>Past 5 Days Air Quality</h2>
                    <p>No location selected.</p>
                </>
            )}
        </div>
    );
};

export default HistoricalAqiGraph;
