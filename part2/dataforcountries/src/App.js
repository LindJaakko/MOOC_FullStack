import { useState, useEffect } from "react";
import axios from "axios";

const CountryLanguages = ({ country }) => {
  console.log(country.languages);
  return (
    <div>
      <p>
        <strong>{`languages:`}</strong>
      </p>
      <ul>
        {country.languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
    </div>
  );
};

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{`${country.name.common}`}</h1>
      <p>{`capital ${country.capital}`}</p>
      <p>{`area ${country.area}`}</p>
      <CountryLanguages country={country} />
      <img src={country.flags.png} />
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
    <p key={country.name.common}>{`${country.name.common}`}</p>
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
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <div>
        <Countries countries={filteredCountries} />
      </div>
    </div>
  );
};

export default App;
