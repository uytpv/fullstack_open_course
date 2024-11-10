import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries, onShowCountry }) => {
  if (countries.length > 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common + " "}
            <button onClick={() => onShowCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const capital = country.capital[0];
  console.log(apiKey);

  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        capital +
        "&units=metric&appid=" +
        apiKey
    )
    .then((response) => {
      setWeather(response.data);
    });
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area} km2</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const onSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
    setSelectedCountry(null);
  };

  const onShowCountry = (country) => {
    setSelectedCountry(country);
    setFilteredCountries([country]);
  };

  return (
    <div>
      <div>
        find countries: <input value={search} onChange={onSearchChange} />
      </div>
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList
          countries={filteredCountries}
          onShowCountry={onShowCountry}
        />
      )}
    </div>
  );
};

export default App;
