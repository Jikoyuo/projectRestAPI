import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import Particles from 'react-tsparticles';

interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
}

const WeatherWidget: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen size is mobile

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const API_Key = "0652b738fc769b49794492b12432e77e";
                    try {
                        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}&units=metric`);
                        setWeatherData(response.data);
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>{weatherData.name}</Typography>
                        {/* Only show description if not on mobile */}
                        {!isMobile && (
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>{weatherData.weather[0].description}</Typography>
                        )}
                        <Typography variant="h5" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>{weatherData.main.temp}°C</Typography>

                        <img
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                            alt={weatherData.weather[0].description}
                            style={{ width: '50px', height: '50px', marginTop: '10px' }}
                        />
                    </Box>

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
                </Paper>
            ) : (
                <Typography variant="body2">Loading weather...</Typography>
            )}
        </Box>
    );
};

const weatherWidgetStyles = {
    position: 'fixed' as 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '5px',
    borderRadius: '8px',
    zIndex: 1000,
    boxShadow: '0px 4px 10 px rgba(0, 0, 0, 0.5)',
    animation: 'fadeIn 2s ease-out',
    width: '80px', // Ukuran tetap untuk widget di desktop
    height: '60px', // Ukuran tetap untuk widget di desktop
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 600px)': {
        top: '10px',
        right: '10px', // Posisikan lebih dekat ke kanan
        width: '120px', // Ukuran lebih besar di mobile untuk menampung semua konten
        height: 'auto', // Sesuaikan tinggi di mobile
        padding: '5px', // Sesuaikan padding di mobile
        flexDirection: 'row', // Set menjadi row agar ikon dan data saling sejajar
        justifyContent: 'space-between', // Beri jarak antar elemen di row
        alignItems: 'center', // Rata tengah vertikal
        backgroundColor: 'red'
    }
};

const weatherPaperStyles = {
    padding: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 600px)': {
        padding: 0, // Adjust padding for smaller screens
        flexDirection: 'row', // Change to row for mobile\
        backgroundColor: 'inherit',
        justifyContent: 'space-between', // Space out elements
        mr: 2
    }
};

export default WeatherWidget;