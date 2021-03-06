import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import contactService from './services/contacts'
import './index.css'

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
        if(window.confirm(`${newName} is already in the phonebook, do you want to replace the current number?`)) {
          const id = persons.find(l => l.name === newName).id
          const updatedObject = { name: newName, number: newNumber}
          console.log("updated object:", updatedObject, "id: ", id)
          contactService
            .update(updatedObject, id)
            .then(response => {
              setPersons(persons.filter(p => p.name !== newName).concat(updatedObject))
              setNotification(`Updated the number of ${newName}`)
              eraseNotificationAfterDelay()
              setNewName('')
              setNewNumber('')
            })

        }
      }
      else {
        const nameObject = { name: newName, number: newNumber}
        contactService
          .create(nameObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNotification(`Added the number of ${newName} to the Phonebook`)
            eraseNotificationAfterDelay()
            setNewName('')
            setNewNumber('')
          })
      }
  }
  
  const eraseNotificationAfterDelay = () => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const deleteContact = (person) => {
    if(window.confirm(`Do you want to delete ${person.name} from the phonebook?`)) {
      setPersons(persons.filter(p => p.id !== person.id))
      setNotification(`Deleted ${person.name} from the Phonebook`)
      eraseNotificationAfterDelay()
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
      <Notification message={notification} />
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