// src/components/LocationCard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import WeatherService from '../services/WeatherService';

const LocationCard = ({ location }) => {
  const navigation = useNavigation(); // Get navigation object
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

  const handlePress = () => {
    // Navigate to DetailsScreen with the selected city as a parameter
    navigation.navigate('Details', { city: location });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
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
