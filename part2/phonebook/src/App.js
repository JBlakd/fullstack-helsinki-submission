import React, { useEffect, useState } from 'react'
import personService from './services/personsService'

const Notification = ({ notificationObj }) => {
  const message = notificationObj.message
  const notificationType = notificationObj.notificationType

  const okStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  console.log('notificationObj: ', notificationObj)

  if (message === null) {
    return null
  }

  if (notificationType === "ok") {
    return (
      <div style={okStyle}>
        {message}
      </div>
    )
  } else if (notificationType === "error") {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  } else {
    console.error('Invalid notification type: ', notificationType)
    return null
  }
} 

const PhoneBookEntry = ({person, persons, setPersons, setFilterString}) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService 
        .remove(person.id)
        .then(response => {
          console.log('delete promise fulfilled: ', response)
          setFilterString('Erase this to see change')
          if (response.status === 200) {
            let personsCopy = JSON.parse(JSON.stringify(persons));
            const itemToDelete = personsCopy.find(item => item.id === person.id)
            const index = personsCopy.indexOf(itemToDelete)
            if (index > -1) {
              personsCopy.splice(index, 1)
            }
            setPersons(personsCopy)
          }     
        })
    }
  }

  return (
    <div>
      {person.id} | {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  )
}

const Filter = ({persons, filterString, setFilterString, setPhoneBookEntriesToShow}) => {
  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value)
    console.log('persons in handleFilterStringChange(): ', persons)
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
  const setNotificationObj = props.setNotificationObj

  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name : newName,
      number : newNumber
    }
    console.log('before duplicate check persons: ', persons, 'personObject: ', personObject)

    if (persons.map(person => person.name).includes(newName)) {
      console.log('before update confirmation persons: ', persons)
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        console.log('persons: ', persons, 'existingPerson: ', existingPerson)
        personService
          .update(existingPerson.id, personObject)
          .then(response => {
            console.log('update promise fulfilled: ', response)
            setFilterString('Erase this to see change')
            if (response.status === 200) {
              let personsCopy = JSON.parse(JSON.stringify(persons));
              const itemToUpdate = personsCopy.find(item => item.id === response.data.id)
              console.log('itemToUpdate: ', itemToUpdate)
              const index = personsCopy.indexOf(itemToUpdate)
              if (index > -1) {
                personsCopy[index] = response.data
              }
              setPersons(personsCopy)
              setNotificationObj({message: `Phone number of ${response.data.name} changed to ${response.data.number}`, notificationType: 'ok'})
              setNewName('')
              setNewNumber('')
            } 
          })
          .catch(error => {
            console.log('update promise error: ', error)
            setNotificationObj({message: `Information of ${personObject.name} has already been removed from the server`, notificationType: 'error'})
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotificationObj({message: `Added ${response.data.name}`, notificationType: 'ok'})
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

const Persons = ({phoneBookEntriesToShow, persons, setPersons, setFilterString}) => {
  return (
    <div>
        {phoneBookEntriesToShow.map(person =>
          <div key={person.name}>
            <PhoneBookEntry 
              person = {person}
              persons = {persons}
              setPersons = {setPersons}
              setFilterString = {setFilterString}
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
  const [ notificationObj, setNotificationObj ] = useState({message: null, notificationType: 'ok'})

  useEffect(() => {
    console.log('getAll effect start execution')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled: ', response.data)
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationObj={notificationObj} />
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
          setNotificationObj = {setNotificationObj}
      />

      <h3>Numbers</h3>
      <p>
        Note: Newly added persons will not automatically reflect in the following list.
        Please erase the filter input field to see the newly added person.
      </p>
      <Persons 
        phoneBookEntriesToShow = {phoneBookEntriesToShow}
        persons = {persons}
        setPersons = {setPersons}
        setFilterString = {setFilterString}
      />
    </div>
  )
}

export default App