import React from 'react'
import Blog from './Blog'

const BlogsView = ({user, blogs, setBlogs}) => {
  const sortedBlogs = blogs
  sortedBlogs.sort((a, b) => {
    return b.likes - a.likes
  })
  setBlogs(sortedBlogs)

  if (user) {
    return (
      <div>
        {blogs.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            setBlogs={setBlogs}
            user={user}
          />
        )}
      </div>
    )     
  } else {
    return (<div></div>)
  }
}

export default BlogsView