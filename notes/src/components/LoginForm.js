import { useState } from "react"
import PropTypes from "prop-types"

const LoginForm = ({ userLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    const userInfo = {
      username, password
    }
    const isLogged = await userLogin(userInfo)
    if (isLogged) {
      setUsername("")
      setPassword("")
    }
  }
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired
}

export default LoginForm