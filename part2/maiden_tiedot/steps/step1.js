import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

  const [ countries, setCountries ] = useState([])
  const [ search, setSearch] = useState('')


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  } 

  const countriesToShow = countries.filter(l => l.name.toLowerCase().includes(search))

  const amountOfCountries = () => countriesToShow.length

  const showCountry = (country) => {
    return (
      <>
      <h1>{country.name}</h1>
      <li>capital {country.capital}</li>
      <li>populaton {country.population}</li>
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

const caseHandler = () => {
  if (amountOfCountries() > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (amountOfCountries() > 1) {
    return (
      <>
      {countriesToShow.map(c => 
        <li key = {c.name}> {c.name} </li>)}
      </>
    )
  } else if (amountOfCountries() === 1) {
    return (
      showCountry(countriesToShow[0])
    )
  }} 
  return (
    <>
      find countries: 
      <input
            value = {search} 
            onChange = {handleSearchChange}
      />

      {caseHandler()}
    </>
  );
}

export default App;
