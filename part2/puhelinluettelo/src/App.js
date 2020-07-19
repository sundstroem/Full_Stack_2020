import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import contactService from './services/contacts'

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ search, setSearch] = useState('')
  const [ notification, setNotification] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(r => {
        setPersons(r.data)
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
        contactService
          .create(nameObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
      }
  }
  
  const deleteContact = (person) => {
    if(window.confirm(`Do you want to delete ${person.name} from the phonebook?`)) {
      setPersons(persons.filter(p => p.id !== person.id))
      contactService.deletePerson(person.id)
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
      <Notification message={notification}/>
      filter shown with
      <Filter search = {search} handleSearchChange = {handleSearchChange} /> 
      <h2>Add a new</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} 
                  newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} deleteContact = {deleteContact}/>
    </div>
  )

}

export default App