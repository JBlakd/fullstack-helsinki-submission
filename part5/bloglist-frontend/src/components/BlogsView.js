import React from 'react'
import Blog from './Blog'

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

export default BlogsView