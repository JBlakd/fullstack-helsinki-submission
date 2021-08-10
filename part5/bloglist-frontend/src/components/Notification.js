import React from 'react'

const Notification = ({ notificationObj }) => {
  const message = notificationObj.message
  const notificationType = notificationObj.notificationType

  const okStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  if (notificationType === "ok") {
    return (
      <div style={okStyle}>
        {message}
      </div>
    )
  } else if (notificationType === "error") {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  } else {
    console.error('Invalid notification type: ', notificationType)
    return null
  }
} 

export default Notification