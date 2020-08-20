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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})