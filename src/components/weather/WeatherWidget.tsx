import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';
import Particles from 'react-tsparticles';

interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;  // Add icon to handle weather condition image
    }>;
}

const WeatherWidget: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    // const latitude = -7.7158231841089915
                    // const longitude = 110.50213276367616
                    const API_Key = "0652b738fc769b49794492b12432e77e"
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    try {
                        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}&units=metric`);
                        setWeatherData(response.data);
                        console.log(response.data);
                    } catch (error) {
                        console.error("Error fetching weather data:", error);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    return (
        <Box sx={weatherWidgetStyles}>
            {weatherData ? (
                <Paper sx={weatherPaperStyles} elevation={3}>
                    <Typography variant="h6">{weatherData.name}</Typography>
                    <Typography variant="body2">{weatherData.weather[0].description}</Typography>
                    <Typography variant="h5">{weatherData.main.temp}°C</Typography>

                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt={weatherData.weather[0].description}
                        style={{ width: '50px', height: '50px', marginTop: '10px' }}
                    />

                    {/* Show particles effect for rain */}
                    {weatherData.weather[0].main.toLowerCase() === "rain" && (
                        <Particles
                            options={{
                                particles: {
                                    number: {
                                        value: 100,
                                    },
                                    shape: {
                                        type: "circle",
                                    },
                                    size: {
                                        value: 3,
                                    },
                                    move: {
                                        direction: "bottom",
                                        speed: 2,
                                    },
                                },
                                interactivity: {
                                    events: {
                                        onHover: {
                                            enable: true,
                                            mode: "repulse",
                                        },
                                    },
                                },
                                outModes: {
                                    default: "out",
                                    bottom: "none",
                                    left: "none",
                                    right: "none",
                                },
                            }}
                        />
                    )}

                    {/* Optional: Add more images for other weather conditions */}
                    {weatherData.weather[0].main.toLowerCase() === "clouds" && (
                        <img
                            src="https://openweathermap.org/img/wn/04d.png"  // Replace with image URL for clouds
                            alt="cloudy"
                            style={{ width: '50px', height: '50px', marginTop: '10px' }}
                        />
                    )}
                    {weatherData.weather[0].main.toLowerCase() === "clear" && (
                        <img
                            src="https://openweathermap.org/img/wn/01d.png"  // Replace with image URL for clear weather
                            alt="clear sky"
                            style={{ width: '50px', height: '50px', marginTop: '10px' }}
                        />
                    )}
                </Paper>
            ) : (
                <Typography variant="body2">Loading weather...</Typography>
            )}
        </Box>
    );
};

const weatherWidgetStyles = {
    position: 'fixed' as 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    zIndex: 1000,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    animation: 'fadeIn 2s ease-out',
};

const weatherPaperStyles = {
    padding: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center',
};

export default WeatherWidget;
