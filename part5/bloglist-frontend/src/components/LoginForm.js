import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, user, setUser, setNotificationObj }) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('Logged in user: ', user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setNotificationObj({ message: 'wrong username or password', notificationType: 'error' })
      setTimeout(() => {
        setNotificationObj({ message: null, notificationType: 'ok' })
      }, 4000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loggedInMessage = () => {
    return (
      <div>{user.name} logged in <button onClick={handleLogOut}>Log Out</button></div>
    )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        loggedInMessage()
      }
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm