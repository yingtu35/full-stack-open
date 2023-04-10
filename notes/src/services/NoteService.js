import axios from "axios"
const baseUrl = "/api/notes"

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = async (newNote) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newNote, config)
  return response.data
}

const update = (id, updateNote) => {
  const request = axios.put(`${baseUrl}/${id}`, updateNote)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken
}