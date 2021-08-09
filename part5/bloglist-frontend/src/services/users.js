import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getIdFromUsername = async username => {
  console.log('Query username: ', username)
  const allUsers = await axios.get(baseUrl)
  console.log('allUsers: ', allUsers)
  const foundUser = await allUsers.data.find(user => user.username === username)
  console.log('foundUser: ', foundUser)
  return foundUser.id
}

export default { getAll, getIdFromUsername }