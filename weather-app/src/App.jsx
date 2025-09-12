import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city) {
      alert("Please enter a city!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data");
      setWeather(null); // clear old weather data
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='header'>Weather App</h1>

      <input
        type="text"
        placeholder='Enter City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button className='button' onClick={() => fetchWeather(city)}>
        Get Weather
      </button>

      <div className='weather-container'>
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && !loading && !error && (
          <>
            <h2>Weather in {weather.nearest_area[0].areaName[0].value}</h2>
            <p>Temperature: {weather.current_condition[0].temp_C}°C</p>
            <p>Condition: {weather.current_condition[0].weatherDesc[0].value}</p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
