import { ALL_PERSONS, CREATE_PERSON } from "../query"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { updateCache } from "../App"

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson)
    },
  })

  const onCreate = (e) => {
    e.preventDefault()
    createPerson({
      variables: { name, street, city, phone: phone.length > 0 ? phone : null },
    })

    setName("")
    setPhone("")
    setStreet("")
    setCity("")
  }

  return (
    <div>
      <h2>Create a new person</h2>
      <form onSubmit={onCreate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">phone</label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="street">street</label>
          <input
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">city</label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PersonForm
