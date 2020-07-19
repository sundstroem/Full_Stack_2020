import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Weather from './components/Weather'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  //loading the country data
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(l => l.name.toLowerCase().includes(search))
  const nofCountries = () => countriesToShow.length
  const caseHandler = () => {
    if (search === '') return('')
    else if (nofCountries() > 10) {
      return(
        <div>
          This search applies for too many ({nofCountries()}) countries
        </div>
      )
    }
    else if (nofCountries() > 1) {
      return(
        <>
        {countriesToShow.map(c => 
          <div key = {c.name}> 
          <li> {c.name} </li>
          <button onClick={() => setSearch(c.name.toLowerCase())}> show 
          </button>
          </div>
        )}
        </>
      )
    }
    else if (nofCountries() === 1) {
      return(
        <>
        <Country country = {countriesToShow[0]}/>
        <Weather city = {countriesToShow[0].capital}/>
        </>
      )
    } 
  }



  return(
    <>
    <Search search = {search} handleSearchChange = {handleSearchChange}/>
    {caseHandler()}
    </>
  )
}



export default App;
