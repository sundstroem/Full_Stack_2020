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
      <Part name = {props.part1.name} n = {props.part1.exercises} />
      <Part name = {props.part2.name} n = {props.part2.exercises} />
      <Part name = {props.part3.name} n = {props.part3.exercises} />
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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1} 
               part2 = {part2} 
               part3 = {part3} />
      <Total n = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))