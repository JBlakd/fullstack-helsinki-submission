import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import AddBlogView from './components/AddBlogView'
import TitleView from './components/TitleView'
import Notification from './components/Notification'
import BlogsView from './components/BlogsView'

import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notificationObj, setNotificationObj ] = useState({ message: null, notificationType: 'ok' })


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

  const blogFormRef = useRef()

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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AddBlogView
          user = {user}
          setBlogs = {setBlogs}
          setNotificationObj = {setNotificationObj}
          blogFormRef = {blogFormRef}
        />
      </Togglable>
      <br></br>
      <BlogsView
        user = {user}
        blogs = {blogs}
        setBlogs = {setBlogs}
      />
    </div>
  )
}

export default App