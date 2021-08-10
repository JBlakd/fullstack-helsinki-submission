import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('newObject: ', newObject)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('Authorisation token for remove: ', config)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const like = async (id) => {
  const oldBlog = await axios.get(`${baseUrl}/${id}`)
  console.log('oldBlog: ', oldBlog)

  const newBlog = {
    user: oldBlog.data.user,
    likes: oldBlog.data.likes + 1,
    author: oldBlog.data.author,
    title: oldBlog.data.title,
    url: oldBlog.data.url
  }
  console.log('newBlog: ', newBlog)

  const updatedBlog = await update(id, newBlog)
  return updatedBlog
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getById, create, update, setToken, like, remove }