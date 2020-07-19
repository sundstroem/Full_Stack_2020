import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const update = (updatedObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  console.log("deleting: ", id, "at ", `http://localhost:3001/persons/${id}`)
  return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default {
  getAll,
  create,
  update,
  deletePerson
}