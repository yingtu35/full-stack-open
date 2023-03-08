const Countries = ({countries, handleShowClick}) => {
    return (
      <>
        {countries.map((country, index) => <p key={index}>{country.name.common} <button onClick={() => handleShowClick(country)}>show</button></p>)}
      </>
    )
}

export default Countries;
