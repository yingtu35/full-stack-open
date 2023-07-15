import { useQuery, useSubscription } from "@apollo/client"
import { ALL_PERSONS, PERSON_ADDED } from "./query"
import { useState } from "react"
import { useApolloClient } from "@apollo/client"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"
import PersonForm from "./components/PersonForm"

export const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = (arr) => {
    const seen = new Set()
    return arr.filter((item) =>
      seen.has(item.name) ? false : seen.add(item.name)
    )
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqueByName(allPersons.concat(addedPerson)),
    }
  })
}

function App() {
  const [token, setToken] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")
  const { loading, error, data } = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`Person ${addedPerson.name} added`)

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    },
    onComplete: () => {
      console.log("Subscription completed")
    },
  })

  const notify = (message) => {
    setErrorMsg(message)
    setTimeout(() => {
      setErrorMsg("")
    }, 5000)
  }

  const onLogout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <Notification message={errorMsg} />
      {token ? (
        <div>
          <button onClick={onLogout}>Logout</button>
          <Persons persons={data.allPersons} />
          <PersonForm setError={notify} />
          <PhoneForm setError={notify} />
        </div>
      ) : (
        <div>
          <LoginForm setToken={setToken} setError={notify} />
        </div>
      )}
    </div>
  )
}

export default App
