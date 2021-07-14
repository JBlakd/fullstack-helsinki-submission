import React, { useState } from 'react'
import './index.css'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = ({text, value, optionalSuffix}) => {
  return (
    <tbody>
      <tr>
        <td className="table-data">{text}</td>
        <td className="table-data">{value} {optionalSuffix}</td>
      </tr>
    </tbody> 
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <Statistic 
          text = "good"
          value = {good}
        />
        <Statistic 
          text = "neutral"
          value = {neutral}
        />
        <Statistic 
          text = "bad"
          value = {bad}
        />
        <Statistic 
          text = "all"
          value = {all}
        />
        <Statistic 
          text = "average"
          value = {(good*1+neutral*0+bad*(-1))/all}
        />
        <Statistic 
          text = "positive"
          value = {(good*100)/all}
          optionalSuffix = "%"
        />
      </table>
    </div>
  )
}

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
      <Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
      />
    </div>
  )
}

export default App