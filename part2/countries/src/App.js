import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

const Filter = ({countries, filterString, setFilterString, setCountriesToShow}) => {
  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value)
    const filterResult = countries.filter(country => 
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    // Conditional rendering logic to be defined in the rendering component
    const filterResultWithShowFlag = filterResult.map(element => ({...element, showFlag: false}))
    setCountriesToShow(filterResultWithShowFlag)

    console.log('filterResultWithShowFlag: ', filterResultWithShowFlag)
  }

  return (
    <div>
      find countries
      <input 
        value = {filterString}
        onChange = {handleFilterStringChange} 
      />
    </div>
  )
}

const SingleCountryDisplay = ({country, showFlag}) => {
  if (showFlag) {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>
              {language.name}
            </li>
          )}
        </ul>
        <img className="flag" src={country.flag} alt='national flag of the country'/>
      </div>
    )
  } else {
    return <div></div>
  }
}

const CountriesDisplay = ({ countriesToShow, setCountriesToShow }) => {
  const handleShow = (country) => {
    const currentShowFlag = country.showFlag
    let countriesToShowUpdatedCopy = JSON.parse(JSON.stringify(countriesToShow))
    console.log('country input to handleShow(): ', country)
    console.log('countriesToShow: ', countriesToShow)
    console.log('countriesToShowUpdatedCopy: ', countriesToShowUpdatedCopy)
    console.log('country.name: ', country.name, 'result of find(): ', countriesToShowUpdatedCopy.find(element => element.name === country.name))
    countriesToShowUpdatedCopy.find(element => element.name === country.name).showFlag = !currentShowFlag
    setCountriesToShow(countriesToShowUpdatedCopy)
  }

  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length > 1 || countriesToShow.length === 0) {
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.name}>
            {country.name}
            <button onClick={() => handleShow(country)}>show/hide</button>
            <SingleCountryDisplay 
              country = {country}
              showFlag = {country.showFlag}
            />
          </div>  
        )}
      </div>
    )
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    country.showFlag = true
    return (
      <SingleCountryDisplay 
        country = {country}
        showFlag = {country.showFlag}
      />
    )
  }
}

function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ filterString, setFilterString ] = useState('Erase this to see change')
  const [ countriesToShow, setCountriesToShow ] = useState(countries)

  useEffect(() => {
    console.log('effect start execution')
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log('promise fulfilled: ', response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter 
        countries = {countries}
        filterString = {filterString}
        setFilterString = {setFilterString}
        setCountriesToShow = {setCountriesToShow}
      />
      <CountriesDisplay 
        countriesToShow = {countriesToShow}
        setCountriesToShow = {setCountriesToShow}
      />
    </div>
  );
}

export default App;
