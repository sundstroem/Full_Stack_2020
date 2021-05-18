import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('token: ', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = { headers: { Authorization: token}, }

  console.log('blogs.js / create: newBlog=', newBlog)
  console.log('config:', config)
  const res = await axios.post(baseUrl, newBlog, config)
  console.log('res: ', res)
  return res.data
}

export default { getAll, create, setToken }