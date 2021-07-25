const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favouriteBlog = (blogs) => {
  let favouriteBlog = { likes: -1 }
  blogs.forEach(blog => {
    if (blog.likes > favouriteBlog.likes) {
      favouriteBlog = blog
    }
  })

  return favouriteBlog
}

const whoHasMostBlogs = (blogsInput) => {
  // Initialise authorBlogsKeyValuePairs array
  let authorBlogsKeyValuePairs = blogsInput.map(blog => ({author: blog.author, blogs: 0}))

  blogsInput.forEach(blog => {
    // Find the authorBlogsKeyValuePair corresponding to the current blog being iterated and increment its blogs property
    authorBlogsKeyValuePairs.find(authorBlogsKeyValuePair => authorBlogsKeyValuePair.author === blog.author).blogs += 1
  })

  let mostProlificAuthor = { author: "dummy", blogs: -1 }
  authorBlogsKeyValuePairs.forEach(authorBlogsKeyValuePair => {
    if (authorBlogsKeyValuePair.blogs > mostProlificAuthor.blogs) {
      mostProlificAuthor = authorBlogsKeyValuePair
    }
  })

  return mostProlificAuthor
}

const whoHasMostLikes = (blogsInput) => {
  // Initialise authorLikesKeyValuePairs array
  let authorLikesKeyValuePairs = blogsInput.map(blog => ({author: blog.author, likes: 0}))

  blogsInput.forEach(blog => {
    // Find the authorBlogsKeyValuePair corresponding to the current blog being iterated and increment its blogs property
    authorLikesKeyValuePairs.find(authorLikesKeyValuePair => authorLikesKeyValuePair.author === blog.author).likes += blog.likes
  })

  let mostPopularAuthor = { author: "dummy", likes: -1 }
  authorLikesKeyValuePairs.forEach(authorLikesKeyValuePair => {
    if (authorLikesKeyValuePair.likes > mostPopularAuthor.likes) {
      mostPopularAuthor = authorLikesKeyValuePair
    }
  })

  return mostPopularAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  whoHasMostBlogs,
  whoHasMostLikes
}