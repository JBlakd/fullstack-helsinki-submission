import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const PhoneBookEntry = ({name, number}) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

const Filter = ({persons, filterString, setFilterString, setPhoneBookEntriesToShow}) => {
  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value)
    const filterResult = persons.filter(person => 
      person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setPhoneBookEntriesToShow(filterResult)
    console.log('filterResult: ', filterResult)
  }

  return (
    <div>
      filter shown with 
      <input 
        value = {filterString}
        onChange = {handleFilterStringChange} 
      />
    </div>
  )
}

const PersonForm = (props) => {
  const persons = props.persons
  const setPersons = props.setPersons
  const newName = props.newName
  const setNewName = props.setNewName
  const newNumber = props.newNumber
  const setNewNumber = props.setNewNumber
  const setFilterString = props.setFilterString

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const personObject = {
      name : newName,
      number : newNumber
    }
    console.log('personObject: ', personObject)

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setFilterString('Erase this to see change')
      })
  }

  const handleNameChange = (e) => {
    console.log('input value changed: ', e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log('input value changed: ', e.target.value)
    setNewNumber(e.target.value)
  }

  return (
    <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
              value = {newName}
              onChange = {handleNameChange} 
            />
            <br/>
          number:
            <input 
              value = {newNumber}
              onChange = {handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({phoneBookEntriesToShow}) => {
  return (
    <div>
        {phoneBookEntriesToShow.map(person =>
          <div key={person.name}>
            <PhoneBookEntry 
              name = {person.name}
              number = {person.number}
            />
          </div>
        )}
    </div>
  )
}

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ]) 
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('Erase this to see change')
  const [ phoneBookEntriesToShow, setPhoneBookEntriesToShow ] = useState(persons)

  useEffect(() => {
    console.log('effect start execution')
    personService
      .getAll("http://localhost:3001/persons")
      .then(response => {
        console.log('promise fulfilled: ', response.data)
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        persons = {persons}
        filterString = {filterString}
        setFilterString = {setFilterString}
        setPhoneBookEntriesToShow = {setPhoneBookEntriesToShow}
      />
      
      <h3>Add new</h3>
      <PersonForm 
          persons = {persons}
          setPersons = {setPersons}
          newName = {newName}
          setNewName = {setNewName}
          newNumber = {newNumber}
          setNewNumber = {setNewNumber}
          setFilterString = {setFilterString}
      />

      <h3>Numbers</h3>
      <p>
        Note: Newly added persons will not automatically reflect in the following list.
        Please erase the filter input field to see the newly added person.
      </p>
      <Persons 
        phoneBookEntriesToShow = {phoneBookEntriesToShow}
      />
    </div>
  )
}

export default App