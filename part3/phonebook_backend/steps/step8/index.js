const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('input_data', function(req) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :input_data'))

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

const generateId = () => {
  const randomID = Math.floor(Math.random() * 1000000)
  return randomID
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if(persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'the name is already in the phonebook'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})