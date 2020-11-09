import React, { useState } from "react";
import keys from "./keys";
import arrow from "./img/arrow.png";
const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query  + ", US"}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 32
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search City, State ..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.state}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="weather-icon">
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt='Icon depicting current weather.' />
              </div>
              <div className="temperature">
                {Math.round(weather.main.temp)}°F
                <p>Feels Like {Math.round(weather.main.feels_like)}°F</p>
              </div>
              <div className="weather">Conditions: {weather.weather[0].main}</div>
              <div className="weather">Wind Speed {Math.round(weather.wind.speed)} MPH</div>
              <div className="weather">
                Wind Direction 
                <div className="compass">
                  <img src={arrow} style= {{width:"40px", transform: `rotate(${weather.wind.deg - 180}deg)`}}
                    alt='compass arrow' />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;