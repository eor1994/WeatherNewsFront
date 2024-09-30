import React, { useState } from 'react';//manage component state
import './App.css';

function App() {
  //Defined state variables
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  
  //this changes the value to search 
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const fetchWeatherData = async () => {
    if (!city) {
      setError('Please enter a city name');  // Set an error message if no city is entered
      return;  // Stop further execution if no city is entered
    }
    try {
      // Make an HTTP GET request to the backend to get the weather data
      const response = await fetch(`http://localhost:8080/api/searchWeather?city=${city}&countryCode=${countryCode}`);
      const data = await response.json();  // Parse the JSON response
      setWeatherData(data);  // Store the weather data in the state
      setError('');  // Clear any previous error message
    } catch (err) {
      setError('Error fetching weather data.');  // Set an error message if the request fails
    }
  };

  //return the ui to your page
  return (
    <div className="App">
      <header className="App-header">
      <h1>Weather App</h1>

      <div className="search-bar">
        {/* City input field */}
        <input
         type="text"
         placeholder="Enter City"
         value={city}
         onChange={handleCityChange}
       />

        {/* Country code dropdown */}
        <select value={countryCode} onChange={handleCountryCodeChange}>
            <option value="IRE">Ireland</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>

        {/* Button to fetch weather data */}
        <button onClick={fetchWeatherData}>Get Weather</button>
        </div>
      {/* display the waeather  */}

      {weatherData && (
          <div className="weather-result">
            <h2>Weather in {city}, {countryCode}</h2>
            <p>Weather: {weatherData.description}</p>
            <p>Temperature: {weatherData.temperature} °C</p>
            <p>Latitude: {weatherData.latitude}</p>
            <p>Longitude: {weatherData.longitude}</p>
          </div>
        )}
      {/* Step 8: Display error messages if any */}
      {error && <p className="error-message">{error}</p>}


      </header>
    </div>
  );
}

export default App;
