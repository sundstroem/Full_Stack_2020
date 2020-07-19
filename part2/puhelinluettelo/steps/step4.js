import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0400 123 456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ search, setSearch] = useState('')

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber
      }
      if(persons.some(l => l.name === newName)) {
        window.alert(`${newName} is already added to the phonebook`)
      }
      else {
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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
    
    console.log('>', search, '€', showAll)
    console.log(personsToShow)
  } 

  const personsToShow = showAll
    ? persons
    : persons.filter(l => l.name.toLowerCase().includes(search))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input
        value = {search} 
        onChange = {handleSearchChange}
      />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div> name: 
          <input 
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div> number:
          <input
            value = {newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person => 
            <li key={person.name}>
                {person.name}: {person.number}
            </li> 
        )}
    </div>
  )

}

export default App