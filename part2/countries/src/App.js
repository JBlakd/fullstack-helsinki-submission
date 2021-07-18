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
  const [ displayCountry, setDisplayCountry ] = useState(country)
    // API call to weather service. Upon fulfilment of the promise, change the weather state of 
    // countriesToShow so that the application gets re-rendered
    const apiKey = '2c50a43410d83cfcccea81e3ae3bad2c'
    const displayCountryCopy = JSON.parse(JSON.stringify(displayCountry))
    useEffect(() => {
      console.log('weather api start execution')
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}
          &appid=${apiKey}&units=metric`)
        .then(response => {
          console.log('promise fulfilled: ', response.data)
          displayCountryCopy.weatherObj = response.data
          setDisplayCountry(displayCountryCopy)          
        })
    }, [])
  if (showFlag) {
    if (displayCountry.weatherObj === undefined) {
      return (
        <div>
          <h1>{displayCountry.name}</h1>
          <div>capital {displayCountry.capital}</div>
          <div>population {displayCountry.population}</div>
          <h2>languages</h2>
          <ul>
            {displayCountry.languages.map(language =>
              <li key={language.name}>
                {language.name}
              </li>
            )}
          </ul>
          <img className="flag" src={displayCountry.flag} alt='national flag of the country'/>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{displayCountry.name}</h1>
          <div>capital {displayCountry.capital}</div>
          <div>population {displayCountry.population}</div>
          <h2>languages</h2>
          <ul>
            {displayCountry.languages.map(language =>
              <li key={language.name}>
                {language.name}
              </li>
            )}
          </ul>
          <img className="flag" src={displayCountry.flag} alt='national flag of the country'/>
          <h2>Weather in {displayCountry.capital}</h2>
          <img src={`https://openweathermap.org/img/wn/${displayCountry.weatherObj.weather[0].icon}.png`}/>
          <h3>temperature: </h3> <div>{displayCountry.weatherObj.main.temp} Celsius</div>
          <h3>Wind: </h3> <div> {displayCountry.weatherObj.wind.speed} km/h at bearing {displayCountry.weatherObj.wind.deg} </div>
        </div>
      )
    } 
  } else {
    return <div></div>
  }
}

const CountriesDisplay = ({ countriesToShow, setCountriesToShow }) => {
  const handleShow = (country) => {
    // Change the showFlag state of countriesToShow
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
