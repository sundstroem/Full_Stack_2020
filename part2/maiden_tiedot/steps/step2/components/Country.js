import React from 'react'

const Country = ({country}) => {
    return ( 
      <>   
      <h1>{country.name}</h1>
      <li>capital {country.capital}</li>
      <li>population {country.population}</li>
      <h2>languages</h2>
      {country.languages.map(language => 
        <li key = {language.name}>{
          language.name}
        </li>)}
      <h2>flag</h2>
      <img src={country.flag} alt="the flag of the country"/>
      </>
    )
}

export default Country