import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

const LoginForm = ({ username, setUsername, password, setPassword, user, setUser }) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('User: ', user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
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

  const loggedInMessage = () => {
    return (
      <div>{user.name} logged in</div>
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

const BlogsView = ({user, blogs}) => {
  if (user) {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )     
  } else {
    return (<div></div>)
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <TitleView 
        user = {user}
      />
      <LoginForm 
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword}
        user = {user}
        setUser = {setUser}
      />
      <br></br>
      <BlogsView 
        user = {user}
        blogs = {blogs}
      />
    </div>
  )
}

export default App