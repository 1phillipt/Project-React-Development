import { useState, useEffect } from "react";
import { fetchCountries } from "./models/Countries";
import type { Country } from "./models/Countries";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const filtered = countries
    .filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    .filter(c => !region || c.region === region);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <header>
        <h1>Where in the world?</h1>
        <button onClick={() => setDarkMode(!darkMode)}>Dark Mode</button>
      </header>
      <div className="search-control">
        <input
          placeholder="Search for a country..."
          onChange={e => setSearch(e.target.value)}
        />
        <select onChange={e => setRegion(e.target.value)}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div id="countries-container">
        {filtered.map(country => (
          <div className="country-card" key={country.name.common}>
            <img src={country.flags.png} alt={country.flags.alt} />
            <div className="country-info">
              <h2>{country.name.common}</h2>
              <p>{country.population?.toLocaleString() ?? "N/A"}</p>
              <p>{country.region ?? "N/A"}</p>
              <p>{country.capital ?? "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
