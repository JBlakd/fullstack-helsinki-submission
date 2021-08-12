import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(function TogglableForwardRef(props, ref) {
  const [visible, setVisible] = useState(false)

  const showWhenHidden = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={showWhenHidden}>
        <button onClick={toggleVisibility} className="viewButton">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <button onClick={toggleVisibility} className="cancelViewButton">cancel</button> <br></br>
        {props.children}
      </div>
    </div>
  )
})


Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable