import { USER_LOGIN } from "../query"
import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userLogin, { data }] = useMutation(USER_LOGIN, {
    onError: (error) => {
      console.log(error)
      const message = error.graphQLErrors[0].message
      setError(message)
    },
  })

  const onLogin = (e) => {
    e.preventDefault()
    userLogin({ variables: { username, password } })

    setUsername("")
    setPassword("")
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      setToken(data.login.value)
      const expireTimestamp = new Date().getTime() + data.login.expiresIn * 1000
      window.localStorage.setItem(
        "phonenumbers-user-token",
        JSON.stringify({
          value: data.login.value,
          expireTimestamp,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
