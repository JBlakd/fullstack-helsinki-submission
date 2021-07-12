import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part='Fundamentals of React' exercise='10' />
      <Part part='Using props to pass data' exercise='7' />
      <Part part='State of a component' exercise='14' />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.arg1 + props.arg2 + props.arg3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total arg1={exercises1} arg2={exercises2} arg3={exercises3} />
    </div>
  )
}

export default App