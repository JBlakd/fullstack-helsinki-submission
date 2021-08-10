import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeHandler = async (id) => {
    const updatedBlog = await blogService.like(id)
    console.log('Updated blog: ', updatedBlog)
    let newBlogList = await blogService.getAll()
    const foundIndex = newBlogList.findIndex(element => element.id === id)
    newBlogList[foundIndex].likes = updatedBlog.likes
    setBlogs(newBlogList)
  }

  const deleteHandler = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      const deleteResponse = await blogService.remove(blog.id)
      console.log('deleteResponse: ', deleteResponse)
      if (deleteResponse.status === 204) {
        const newBlogList = await blogService.getAll()
        setBlogs(newBlogList)
      }
    }
  }

  let isBlogBelongsToLoggedInUser = (blog.user.username === user.username) ? true : false

  return (
    <div style={blogStyle}>
      <div>{blog.title} | {blog.author}</div>
      <Togglable buttonLabel="view">
        {blog.url} <br></br>
        likes {blog.likes} <button onClick={() => likeHandler(blog.id)}>like</button> <br></br> 
        {blog.user.name} 
      </Togglable>
      { isBlogBelongsToLoggedInUser && <button onClick={() => deleteHandler(blog)}>remove</button> }
    </div>  
  ) 
}

export default Blog