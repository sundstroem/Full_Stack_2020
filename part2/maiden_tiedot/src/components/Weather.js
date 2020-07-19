import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = (props) => {
  console.log("city: ", props.city)
  const [weather, setWeather] = useState(0)
  const api_key = process.env.REACT_APP_API_KEY
  //loading the weather data for the city
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.city}`)
      .then(response => {
        setWeather(response)
      })
  }, [api_key, props.city])
  console.log(weather)

  if (weather !== 0) {
  return (
    <>
    <h2>weather in {props.city}</h2><br/>
    <b>temperature: </b> {weather.data.current.temperature} <br/>
    <i>{weather.data.current.weather_descriptions}</i><br/>
    <img src={weather.data.current.weather_icons} alt=""/><br/>
    <b>wind speed:</b> {weather.data.current.wind_speed} , direction: {weather.data.current.wind_dir}
    </>
  )
  }
  else return (<> </>)

}

export default Weather