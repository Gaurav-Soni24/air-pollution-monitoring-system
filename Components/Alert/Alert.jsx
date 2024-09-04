import React, { useEffect, useState } from "react";
import "./Alert.css";
import * as Icon from "react-bootstrap-icons";

const Alert = ({ lat, log }) => {
    const [aqiLevel, setAqiLevel] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (lat && log) {
            const fetchAQI = async () => {
                try {
                    const response = await fetch(
                        `https://api.waqi.info/feed/geo:${lat};${log}/?token=57b74b070c5f096f0f45fc49954843db05043616`
                    );
                    const data = await response.json();
                    if (data && data.status === "ok" && data.data) {
                        setAqiLevel(data.data.aqi);
                        setIsVisible(true); // Reset visibility when new location is set
                    }
                } catch (error) {
                    console.error("Error fetching the AQI data:", error);
                }
            };

            fetchAQI();
        }
    }, [lat, log]);

    // Handler to close the alert
    const handleClose = () => setIsVisible(false);

    // Determine alert type based on AQI level
    const getAlertType = () => {
        if (aqiLevel === null || aqiLevel <= 100) return null; 
        if (aqiLevel <= 150) return "unhealthy-sensitive";
        if (aqiLevel <= 200) return "unhealthy";
        if (aqiLevel <= 300) return "very-unhealthy";
        return "hazardous";
    };

    const alertType = getAlertType();

    // Determine if the alert should be displayed
    const shouldDisplayAlert = alertType !== null && isVisible;

    if (!shouldDisplayAlert) return null;

    return (
        <div className={`alert-container ${alertType}`}>
            <div className="alert-content">
                <div className="alert-head">
                    <Icon.ExclamationCircleFill className="alert-icon" />
                    <button
                        className="alert-close-button"
                        onClick={handleClose}
                        aria-label="Close Alert"
                    >
                        <Icon.XCircleFill />
                    </button>
                </div>
                <div className="alert-text">
                    {alertType === "unhealthy-sensitive" && (
                        <>
                            <strong>Unhealthy for Sensitive Groups!</strong> People with respiratory or heart conditions should reduce outdoor activities (AQI: {aqiLevel}).
                        </>
                    )}
                    {alertType === "unhealthy" && (
                        <>
                            <strong>Unhealthy!</strong> The air quality is unhealthy (AQI: {aqiLevel}). Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.
                        </>
                    )}
                    {alertType === "very-unhealthy" && (
                        <>
                            <strong>Very Unhealthy!</strong> Health alert: everyone may experience more serious health effects (AQI: {aqiLevel}).
                        </>
                    )}
                    {alertType === "hazardous" && (
                        <>
                            <strong>Hazardous!</strong> Emergency conditions: The entire population is more likely to be affected (AQI: {aqiLevel}).
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Alert;
