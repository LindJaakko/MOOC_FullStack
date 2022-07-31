import { useState, useEffect } from "react";
import axios from "axios";

const CountryLanguages = ({ languages }) => {
  const keys = Object.keys(languages);
  return (
    <div>
      <p>
        <strong>{`languages:`}</strong>
      </p>
      <ul>
        {keys.map((key) => (
          <li key={key}>{languages[key]}</li>
        ))}
      </ul>
    </div>
  );
};

const WeatherData = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const address = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    axios.get(address).then((response) => {
      setWeather(response.data);
    });
  }, []);

  if (!weather) {
    return null;
  }
  return (
    <div>
      <h1>{`Weather in ${city}`}</h1>
      <p>{`temperature ${weather.main.temp} Celcius`}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>{`wind ${weather.wind.speed} m/s`}</p>
    </div>
  );
};

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{`${country.name.common}`}</h1>
      <p>{`capital ${country.capital}`}</p>
      <p>{`area ${country.area}`}</p>
      <CountryLanguages languages={country.languages} />
      <img src={country.flags.png} />
      <WeatherData city={country.capital} />
    </div>
  );
};

const ShowCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <p key={country.name.common}>
        {`${country.name.common}`}{" "}
        <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      </p>
      {show && <CountryData country={country} />}
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>{"Too many matches, specify another filter"}</p>;
  }
  if (countries.length === 1) {
    return <CountryData country={countries[0]} />;
  }
  return countries.map((country) => (
    <ShowCountry country={country} key={country.name.common} />
  ));
};

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      find countries
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <div>
        <Countries countries={newFilter ? filteredCountries : []} />
      </div>
    </div>
  );
};

export default App;
