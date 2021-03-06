import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  ) 
}

const Content = (props) => {
  return (
    <>
      <p>{props.part1} {props.n1} </p>
      <p>{props.part2} {props.n2} </p>
      <p>{props.part3} {props.n3} </p>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1} n1 = {exercises1}
               part2 = {part2} n2 = {exercises2}
               part3 = {part3} n3 = {exercises3}/>
      <Total n = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))