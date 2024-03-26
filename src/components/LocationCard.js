// src/components/LocationCard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WeatherService from '../services/WeatherService';

const LocationCard = ({ location, onPress }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const fetchWeatherData = async (city) => {
    try {
      const data = await WeatherService.fetchWeatherData(city); // Pass city to fetchWeatherData
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text>{location}</Text>
        {weatherData && (
          <>
            <Text>Temperature: {convertKelvinToCelsius(weatherData.main.temp)}°C</Text>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default LocationCard;