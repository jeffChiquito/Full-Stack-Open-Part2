import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?' 
const iconURL = 'https://openweathermap.org/img/wn/'


function Country ({country}) { 

    const [countryW, setNewCountryW] = useState(null)

    useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            const response = await axios.get(`${baseURL}q=${country.capital[0].toLowerCase()}&appid=${apiKey}`);
            setNewCountryW(response.data);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
    
        fetchWeatherData();
      }, [country.capital, apiKey]);
    
    
    if (!country.name) {        
        return null
    }  
    
    return(
        <>
            <h1>
                {country.name.common}
            </h1>
            <a>capital {country.capital[0]}</a><br></br>
            <a>area {country.area}</a><br></br><br></br>
            <h2>languages:</h2>
            {Object.entries(country.languages).map(([key, value]) => (
                <li key={key}>{value}</li>
            ))}
            <br></br><br></br>
            <img src={country.flags.png}></img>
            {countryW && (
            <div>
                <h1>Weather in {country.capital[0]}</h1>
                <p>Temperature: {countryW.main.temp} Celcius</p>
                <br></br>
                
                <img src={`${iconURL}${countryW.weather[0].icon}@2x.png`}></img> 
                <p>wind {countryW.wind.speed} m/s</p>
                {/* Agrega más datos meteorológicos aquí según sea necesario */}
            </div>
            )}         
        </>
    )
}


export default Country