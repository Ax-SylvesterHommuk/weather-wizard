// src/screens/DetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import WeatherService from '../services/WeatherService';

const DetailsScreen = ({ route }) => {
  const { city } = route.params; // Get the city parameter from the navigation route
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData(city); // Fetch weather data for the specified city
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const data = await WeatherService.fetchWeatherData(city);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  // Convert sunrise and sunset times from epoch unix seconds to readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  // Render weather details
  const renderWeatherDetails = () => {
    if (loading) {
      return <Text style={styles.loading}>Loading...</Text>;
    } else if (weatherData) {
      const { main, weather, wind, sys } = weatherData;
      const { temp, humidity } = main;
      const { description } = weather[0];
      const { speed, deg } = wind;
      const { sunrise, sunset } = sys;

      // Convert temperature from Kelvin to Celsius
      const tempCelsius = (temp - 273.15).toFixed(1);

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Current Weather</Text>
          <Text style={styles.detailText}>Temperature: {tempCelsius}°C</Text>
          <Text style={styles.detailText}>Humidity: {humidity}%</Text>
          <Text style={styles.detailText}>Description: {description}</Text>
          <Text style={styles.detailText}>Wind Speed: {speed} m/s</Text>
          <View style={styles.windContainer}>
            <Text style={styles.detailText}>Wind Direction: {deg}°</Text>
            <Image
              source={require('../assets/icon.png')}
              style={[styles.arrow, { transform: [{ rotate: `${deg}deg` }] }]}
            />
          </View>
          <Text style={styles.detailText}>Sunrise: {formatTime(sunrise)}</Text>
          <Text style={styles.detailText}>Sunset: {formatTime(sunset)}</Text>
        </View>
      );
    } else {
      return <Text style={styles.error}>No data available</Text>;
    }
  };

  return renderWeatherDetails();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  windContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  loading: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default DetailsScreen;
