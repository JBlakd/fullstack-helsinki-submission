import React, { useState } from 'react'
import blogService from '../services/blogs'
import userService from '../services/users'

const AddBlogView = ({ user, setBlogs, setNotificationObj, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      setNotificationObj({ message: `a new blog ${response.title} by ${response.author} added`, notificationType: 'ok' })
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotificationObj({ message: null, notificationType: 'ok' })
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
            id="new-title-input"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="new-author-input"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="new-url-input"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="new-blog-create-button" type="submit">create</button>
      </form>
    )
  } else {
    return <div></div>
  }
}

export default AddBlogView