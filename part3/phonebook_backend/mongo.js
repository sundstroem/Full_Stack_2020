const mongoose = require('mongoose')
const process = require('process')

if (process.argv.length <3) {
  console.log('give password as argument, please')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://new-user_31:${password}@cluster0.q9zmf.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if(!process.argv[4]) { //no further arguments, printing the db
  console.log('phonebook:')
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
} else { //adding a new person to the db
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log('saved!')
    mongoose.connection.close()
  })
  console.log(`added ${person.name} number ${person.number} to phonebook`)
}


