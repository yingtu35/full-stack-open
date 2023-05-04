import axios from "axios"
const baseUrl = "http://localhost:3001/notes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const payload = {
    content: content,
    important: false
  }
  const response = await axios.post(baseUrl, payload)
  return response.data
}

const update = async (id, updateNote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateNote)
  return response.data
}

export default {
  getAll, create, update
}