import React from 'react'

const TitleView = ({user}) => {
  if (user) {
    return (
      <h2>blogs</h2>
    )
  } else {
    return (
      <h2>log in to application</h2>
    )
  }
}

export default TitleView