import { useState, useEffect } from "react";
import Country from "./components/Country";
import Countries from "./components/Countries";
import axios from 'axios'

const QueryFilter = ({query, onQueryChange}) => <p>find countries <input value={query} onChange={onQueryChange}/></p>;

function App() {
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountry] = useState(null);
  const [query, setQuery] = useState('');
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));

  const onQueryChange = (e) => {
    setQuery(e.target.value);
    setCountry(null);
  }
  useEffect(() => {
    axios.get("http://localhost:3001/countries")
    .then(response => {
      const data = response.data;
      setCountries(data);
    })
  }, [])
  return (
    <div className="App">
      <QueryFilter query={query} onQueryChange={onQueryChange} />
      {countryToShow
      ? (<Country country={countryToShow} />)
      : countriesToShow.length == 1
      ? (<Country country={countriesToShow[0]} />)
      : countriesToShow.length > 10
      ? <p>Too many matches, specify another filter</p>
      : (<Countries countries={countriesToShow} handleShowClick={setCountry}/>)}
    </div>
  );
}

export default App;
