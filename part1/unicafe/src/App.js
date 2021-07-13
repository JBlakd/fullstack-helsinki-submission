import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

// const Statistics = (props) => {
//   return (

//   )
// }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodIncrement = () => setGood(good + 1)
  const neutralIncrement = () => setNeutral(neutral + 1)
  const badIncrement = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        handleClick = {goodIncrement}
        text = 'good'
      />
      <Button 
        handleClick = {neutralIncrement}
        text = 'neutral'
      />
      <Button 
        handleClick = {badIncrement}
        text = 'bad'
      />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good*1+neutral*0+bad*(-1))/(good + neutral + bad)}</p>
      <p>positive {(good*100)/(good + neutral + bad)} %</p>
    </div>
  )
}

export default App