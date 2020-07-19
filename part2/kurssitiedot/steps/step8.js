import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  const total = course.parts.map(l => l.exercises).reduce((s, p) => console.log(">", s, p) || p + s, 0)
  return (
    <>
      <h1> {course.name} </h1>

      {course.parts.map(part => 
        <li key={part.id}>
          {[part.name, ' ', part.exercises]}
        </li>
      )}

      <b> total: {total} exercises </b>

      {}
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'testing',
        exercises: -1,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))