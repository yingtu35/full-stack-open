import { useState, useEffect } from "react";
import axios from 'axios'

const CountryInfo = ({name, capitals, area}) => {
    return (
    <>
      <h1>{name}</h1>
      <div>
        capital {capitals.map(capitalName => `${capitalName} `)}<br/>
        area {area}
      </div>
    </>
    )
}

const CountryLang = ({languages}) => {
    return (
        <>
        <h2>languages</h2>
        <ul>
          {languages.map((language, index) => <li key={index}>{language}</li>)}
        </ul>
        </>
    )
}
const CountryFlag = ({img}) => <img src={img} width="150px" />
const CountryWeather = ({name, temp, icon, wind}) => {
    return (
        <>
        <h2>Weather in {name}</h2>
        temperature {temp} Celcius <br/>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} /><br />
        wind {wind} m/s
        </>
    )
}
const Country = ({country}) => {
    const [temp, setTemp] = useState(null);
    const [wind, setWind] = useState(null);
    const [icon, setIcon] = useState(null);
    const apiKey = process.env.REACT_APP_API_KEY;
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const languages = Object.values(country.languages);
  
    useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(response => {
        const data = response.data;
        setTemp(data.main.temp);
        setWind(data.wind.speed);
        setIcon(data.weather[0].icon);
      })
    }, [])
    
    return (
      <>
      <CountryInfo name={country.name.common} capitals={country.capital} area={country.area} />
      <CountryLang languages={languages} />
      <CountryFlag img={country.flags["png"]} />
      {temp && icon && wind && (
        <CountryWeather name={country.name.common} temp={temp} icon={icon} wind={wind} />
      )}
      </>
    )
  }

export default Country;