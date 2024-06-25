import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '73be36ab547b9cada899815e2d84a8dd';

  const funnyMessages = [
    "Uh-oh, looks like the weather is on vacation!",
    "Hmmm... I can't find that city. Try another?",
    "Are you sure that's a city on Earth?",
  ];

  const getRandomFunnyMessage = () => {
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    return funnyMessages[randomIndex];
  };

  const fetchWeather = async () => {
    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError(getRandomFunnyMessage());
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          className={`input-field ${error ? 'error' : ''}`}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="submit-button">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{Math.round(weatherData.main.temp)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <div className="description">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
            <span>{weatherData.weather[0].description}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
