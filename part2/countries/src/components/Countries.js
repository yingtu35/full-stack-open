const Countries = ({countries, handleShowClick}) => {
    return (
      <>
        {countries.map((country, index) => <p key={index}>{country.name.common} <button onClick={() => handleShowClick(country.name.common)}>show</button></p>)}
      </>
    )
}

export default Countries;
