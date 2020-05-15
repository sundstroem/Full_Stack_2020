import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  ) 
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.n}</p>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part name = {props.parts[0].name} n = {props.parts[0].exercises} />
      <Part name = {props.parts[1].name} n = {props.parts[1].exercises} />
      <Part name = {props.parts[2].name} n = {props.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.n}</p>
    </>
  )
}

const App = () => {
  const course = {
    name :'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total n = {course.parts[0].exercises +
         course.parts[1].exercises + 
         course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))