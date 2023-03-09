import { useState, useEffect } from "react";
import Country from "./components/Country";
import Countries from "./components/Countries";
import axios from 'axios'

const QueryFilter = ({query, setQuery}) => <p>find countries <input value={query} onChange={(e) => setQuery(e.target.value)}/></p>;

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    axios.get("http://localhost:3001/countries")
    .then(response => {
      const data = response.data;
      setCountries(data);
    })
  }, [])
  return (
    <div className="App">
      <QueryFilter query={query} setQuery={setQuery} />
      {countriesToShow.length == 1
      ? (<Country country={countriesToShow[0]} />)
      : countriesToShow.length > 10
      ? <p>Too many matches, specify another filter</p>
      : (<Countries countries={countriesToShow} handleShowClick={setQuery}/>)}
    </div>
  );
}

export default App;
