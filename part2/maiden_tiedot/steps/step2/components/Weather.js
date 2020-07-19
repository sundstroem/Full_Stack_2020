import {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = (city, api) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const weatherstack_parameters = {
      access_key: api,
      query: city,
    };

    axios.get("http://api.weatherstack.com", 
    weatherstack_parameters)
      .then(response => {
        console.log(response)
        setWeather(response.temperature)
      }).catch((e) => console.log(e))
    
  }, [])
  return (weather)
}

export default Weather