import React, { useEffect, useState } from "react";
import Search from "../search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const API_key = "fe918525bbb96647bd42d97cd6751414";
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}`
      );
      const data = await res.json();
      setWeatherData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  // https://fb.watch/uhZbhfDZyi/
  const handleGetDate = (timezone) => {
    const offset = timezone;
    const currTime = new Date();
    const localTime = new Date(currTime.getTime() + offset * 1000);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = localTime.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <h1> Weather</h1>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading.......</div>
      ) : weatherData ? (
        <div className="weather-info-container">
          <h1>
            {weatherData?.name}, {weatherData?.sys.country}
          </h1>
          <p>{handleGetDate(weatherData?.timezone)}</p>
          <div className="weather-temparature-container">
            <p className="temp-text">
              {Math.floor(weatherData?.main?.temp - 273.15)}°
            </p>
            <div className="">
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
                alt={weatherData?.weather[0]?.description}
                width={50}
              />
              <p>{weatherData?.weather[0]?.description}</p>
            </div>
          </div>
          <div>
            <p>
              Wind: <b>{weatherData?.wind?.speed} km/h</b>
            </p>

            <p>
              Humidity: <b>{weatherData?.main?.humidity}%</b>
            </p>
          </div>
        </div>
      ) : (
        <h1>Pleaase Enter City name</h1>
      )}
    </div>
  );
};

export default Weather;
