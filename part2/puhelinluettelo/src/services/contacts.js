import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = newPerson => {
  const req = axios.post(baseUrl, newPerson)
  return req.then(res => res.data)
}

const update = (updatedObject, id) => {
  const req = axios.put(`${baseUrl}/${id}`, updatedObject)
  return req.then(res => res.data)
}

const deletePerson = (id) => { 
  console.log("deleting: ", id, ", at: ", baseUrl , "/", id)
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

export default {
  getAll,
  create,
  update,
  deletePerson
}
