import { useState, useEffect } from "react";
import getWeather from "./services/weather";

const Weather = ({ capital, latitude, longitude }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!capital || latitude == null || longitude == null) return;

    getWeather({ latitude, longitude }).then(setWeather).catch(() => setWeather(null));
  }, [capital, latitude, longitude]);

  if (!capital || !weather) return null;

  const icon = weather.weather?.[0]?.icon;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.main.temp}°C</p>
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={weather.weather?.[0]?.description || "weather icon"}
          width={100}
        />
      )}
      <p>conditions: {weather.weather?.[0]?.description}</p>
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
