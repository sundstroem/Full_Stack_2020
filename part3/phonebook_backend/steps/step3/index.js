const express = require('express')
const app = express()

let persons = [
  {
    name: 'A',
    number: '123456',
    id: 1,
  },
  {
    name: 'B',
    number: '234567',
    id: 2,
  },
  {
    name: 'C',
    number: '345678',
    id: 3,
  }
]

app.get('/info', (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people. <br>
    ${new Date()}`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})