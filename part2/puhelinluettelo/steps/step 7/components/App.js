import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
      event.preventDefault()
      
      if(persons.some(l => l.name === newName)) {
        window.alert(`${newName} is already added to the phonebook`)
      }
      else {
        const nameObject = {
          name: newName,
          number: newNumber
        }
        axios
          .post('http://localhost:3001/persons', nameObject)
          .then(response => {
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())

    if (search.isEmpty) setShowAll(true)
    else setShowAll(false)
    
  } 

  const personsToShow = showAll
    ? persons
    : persons.filter(l => l.name.toLowerCase().includes(search))
 
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <Filter search = {search} handleSearchChange = {handleSearchChange} /> 
      <h2>Add a new</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} 
                  newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} />
    </div>
  )

}

export default App