// src/components/WeatherCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ weatherData }) => {
  // Destructure weatherData object to extract necessary information
  const { main, weather } = weatherData;
  const { temp, humidity } = main;
  const { description } = weather[0];

  // Convert temperature from Kelvin to Celsius
  const tempCelsius = (temp - 273.15).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text style={styles.text}>Temperature: {tempCelsius}°C</Text>
      <Text style={styles.text}>Humidity: {humidity}%</Text>
      <Text style={styles.text}>Description: {description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default WeatherCard;