import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

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
      setNotificationObj({message: 'wrong username or password', notificationType: 'error'})
      setTimeout(() => {
        setNotificationObj({message: null, notificationType: 'ok'})
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
    localStorage.removeItem('loggedBlogAppUser');
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

const AddBlogView = ({ user, title, setTitle, author, setAuthor, url, setUrl, blogs, setBlogs, setNotificationObj }) => {
  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const id = await userService.getIdFromUsername(user.username)

      const response = await blogService.create({
        author: author,
        title: title,
        url: url,
        userId: id
      })
      console.log('blogService.create() response: ', response)

      const updatedBlogList = await blogService.getAll()
      setBlogs(updatedBlogList)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationObj({message: `a new blog ${response.title} by ${response.author} added`, notificationType: 'ok'})
      setTimeout(() => {
        setNotificationObj({message: null, notificationType: 'ok'})
      }, 4000)
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user) {
    return (
      <form onSubmit={handleAddBlog}>
        <h2>create new</h2>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form> 
    )
  } else {
    return <div></div>
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [ notificationObj, setNotificationObj ] = useState({message: null, notificationType: 'ok'})


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <TitleView 
        user = {user}
      />
      <Notification notificationObj={notificationObj} />
      <LoginForm 
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword}
        user = {user}
        setUser = {setUser}
        setNotificationObj = {setNotificationObj}
      />
      <AddBlogView 
        user = {user}
        title = {title} 
        setTitle = {setTitle} 
        author = {author} 
        setAuthor = {setAuthor} 
        url = {url} 
        setUrl = {setUrl} 
        blogs = {blogs} 
        setBlogs = {setBlogs}
        setNotificationObj = {setNotificationObj}
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