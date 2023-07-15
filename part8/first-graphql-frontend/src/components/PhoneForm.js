import { UPDATE_NUMBER } from "../query"
import { useMutation } from "@apollo/client"
import { useState } from "react"

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [updateNumber] = useMutation(UPDATE_NUMBER, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    },
  })

  const onUpdate = (e) => {
    e.preventDefault()
    updateNumber({ variables: { name, phone } })

    setName("")
    setPhone("")
  }

  return (
    <div>
      <h2>Update phone number of a person</h2>
      <form onSubmit={onUpdate}>
        <div>
          <label htmlFor="phone-name">Name</label>
          <input
            id="phone-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone-phone">phone</label>
          <input
            id="phone-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default PhoneForm
