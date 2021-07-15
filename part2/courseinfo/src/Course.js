import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exercisesArray = course.parts.map(part => part.exercises) 
    const total = exercisesArray.reduce(
      (sum, currentValue) => {
        return (
          sum + currentValue
        )
      }
    )
    return(
      <h4>total of {total} exercises</h4>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <div key={part.id}>
            <Part 
              name = {part.name}
              exercises = {part.exercises}
            />
          </div>
        )}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header 
          course = {course}
        />
        <Content 
          course = {course}
        />
        <Total 
          course = {course}
        />
      </div>
    )
  }

export default Course