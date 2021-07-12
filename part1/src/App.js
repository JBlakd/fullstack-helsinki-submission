import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.adjective}.</p>
    </div>
  )
}
 
const App = () => {
  return (  
    <div>
      <h1>Greetings</h1>
      <Hello name="Ivan" adjective="smart"/>
      <Hello name="Scarlett" adjective="beautiful"/>
    </div>
  )
}

export default App;
