import React from 'react'

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

  export default Course