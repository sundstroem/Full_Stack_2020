import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  const total = course.parts.map(l => l.exercises).reduce((s, p) => p + s, 0)
  return (
    <>
      <h2> {course.name} </h2>

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
  const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1> Web development curriculum</h1>
      {courses.map(course => 
        <Course key = {course.id} course = {course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))