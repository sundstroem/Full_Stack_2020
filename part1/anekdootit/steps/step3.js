import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  const randomize = () => Math.floor(Math.random() * 6)
  const indexOfMostVoted = () => points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => {
        const copy = [...points]
        copy[selected] += 1
        console.log(copy)
        setPoints(copy)
      }}>
        vote
      </button>
      <button onClick={() => setSelected(randomize())}>
        next anecdote
      </button>

      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[indexOfMostVoted()]}</p>
      <p>has {points[indexOfMostVoted()]} votes</p>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)