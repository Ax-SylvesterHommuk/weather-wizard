// src/services/WeatherService.js
const key = "b9b27e0c6774d5bc94269cbec554bdbe";
const city = "Tartu";

const WeatherService = {
  fetchWeatherData: async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default WeatherService;