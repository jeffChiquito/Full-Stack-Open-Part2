import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './modules/Country'

function App() {
const [newFind, setNewFind] = useState('')
const [manyCountries, setManyCountries] = useState([])
const [filteredCountries, setfilteredCountries] = useState([])
const [countries, setNewCountries] = useState([])
const [isLoading, setIsloading] = useState(true)
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

useEffect(() => {
  axios
  .get(`${baseURL}`)
  .then(response => {
    const resultVal = response.data
    setManyCountries(resultVal) 
    setIsloading(false)
  })
}, [])

const filters = (event) => {  
  setNewFind(event.target.value)  

   const countriesFiltered = manyCountries.filter(val => val.name.common.includes(event.target.value)) 
   setfilteredCountries(countriesFiltered)

}

const showCountry = (countryName) => {
  setNewFind(countryName); // Establece el nombre del país en el campo de búsqueda
  filters({ target: { value: countryName } }); // Aplica el filtro utilizando el nombre del país
};

let filtered = filteredCountries.length > 0 ? filteredCountries : manyCountries

  return (
    <>
    {isLoading ? (
      <>
      <div>
        <h1>loading...</h1>
      </div>
      </>) : (
         <div>
         <a>find countries  </a>
         <input value={newFind} onChange={filters}></input>         
         
           { filtered.length > 10 ? 
           (<><br></br><a>Too many matches, specify another filter</a></>) :
            (<>
             {filtered.length == 1 ? (<>{filtered.map(val => <Country country={val}/>)}</>): 
             (<>{filtered.map(val => <li key={val.name.common}>{val.name.common}<button onClick={() => showCountry(val.name.common)}>show</button></li>)}</>)}
            </>)
           }
        </div>
      )
    }
    </>
  )

}

export default App
