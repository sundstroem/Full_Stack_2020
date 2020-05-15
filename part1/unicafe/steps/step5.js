import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ( {handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ( {text, value}) => (
  <p> {text} {value} </p>
)

const Statictics = (props) => {
  const {good, neutral, bad} = props

  const all = () => good + neutral + bad
  const average = () => (good - bad) / all()
  const positive = () => ((good / all()) * 100) + '%'

  if (all() === 0) return (
    <> <h1> statistics </h1>
    No feedback given 
    </>
  ) 
  else return (
    <>
    <h1> statistics </h1>
    <StatisticLine text="good" value = {good} />
    <StatisticLine text="neutral" value = {neutral} />
    <StatisticLine text="bad" value = {bad} />
    <StatisticLine text="all" value = {all()} />
    <StatisticLine text="average" value = {average()} />
    <StatisticLine text="positive" value = {positive()} />
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  

  return (
    <div>
      <h1> Give feedback, please </h1>
      <Button
        handleClick = {() => setGood(good + 1)}
        text ='good'
      />
      <Button
        handleClick = {() => setNeutral(neutral + 1)}
        text ='neutral'
      />
      <Button
        handleClick = {() => setBad(bad + 1)}
        text ='bad'
      />
      <Statictics good = {good} neutral = {neutral} bad = {bad}></Statictics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)