import { Routes, Route, Link, useNavigate, Navigate, useMatch } from "react-router-dom"
import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import styled from "styled-components"

const Page = styled.div`
  padding: 1em;
  background: papayawhip
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;  
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

function Home() {
  return (
  <div>
    <h2>Notes App</h2>
    <p>Welcome to my notes app</p>
  </div>)
}

function Note({note}) {
  return (
    <div>
      <h2>{note.content}</h2>
      <h3>{note.user}</h3>
      <div><strong>{note.important? "important" : ""}</strong></div>
    </div>
  )
}

function Notes({notes}) {
  return (
    <div>
      <h2>Notes</h2>
      <Table striped hover bordered>
        <thead>
          <th>Id</th>
          <th>Content</th>
          <th>Author</th>
          <th>Important?</th>
        </thead>
        <tbody>
          {notes.map(note => {
            return (
              <tr>
                <td>{note.id}</td>
                <td><Link key={note.id} to={`/notes/${note.id}`}>{note.content}</Link></td>
                <td>{note.user}</td>
                <td>{note.important ? "important" : ""}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

function User({user}) {
  return (
    <div>
      {user && (
        <div>
          <h2>{user.username}</h2>
        </div>
      )}
    </div>
  )
}

function Login({onLogin}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)
  const handleLogin = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity === false) {
      e.preventDefault()
      e.stopPropogation()
    }
    e.preventDefault()
    setValidated(true);
    onLogin(username, password)
    navigate("/")
  }

  return (
    <div>
    <h2>Login</h2>
    <Form noValidate validated={validated} onSubmit={handleLogin}>
      <Form.Group controlId="username">
        <Form.Label>username</Form.Label>
        <Form.Control required type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <Form.Control.Feedback type="invalid">Please provide a valid username</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>password</Form.Label>
        <Form.Control required type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="primary">Login</Button>
    </Form>
    </div>
  )
}

function App() {
  const padding = {
    padding: 5
  }

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")

  const login = (username, password) => {
    const loginUser = {
      username: username
    }
    setUser(loginUser)
    setMessage(`welcome ${loginUser.username}`)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const match = useMatch("/notes/:id")
  const note = match ? (
    notes.find(note => note.id === Number(match.params.id))
  ) : (null)

  return (
    <Page className="container">
      {message && 
        <Alert variant="success">
          {message}
        </Alert>}
      <Navigation>
        <NavBar bg="none" expand="lg">
          <NavBar.Brand href="#home">Notes App</NavBar.Brand>
          <NavBar.Toggle aria-controls="responsive-navbar-nav" />
          <NavBar.Collapse id="responsive-navbar-nav">
            <Nav className="nav">
              <Nav.Link href="#">
                <Link style={padding} to={"/home"}>Home</Link>
              </Nav.Link>
              <Nav.Link  href="#">
                <Link style={padding} to={"/user"}>User</Link>
              </Nav.Link>
              <Nav.Link  href="#">
                <Link style={padding} to={"/notes"}>Notes</Link>
              </Nav.Link>
              
              <Nav.Link  href="#">
              {user ? <em style={padding}>{user.username} logged in</em>
                    : <Link style={padding} to={"/login"}>Login</Link>
              }
              </Nav.Link>
            </Nav>
          </NavBar.Collapse>
        </NavBar>
      </Navigation>

      <Routes>
        <Route path="/notes/:id" element={note ? <Note note={note}/> : <Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/user" element={user ? <User user={user} /> : <Navigate replace to="/login" />}/>
        <Route path="/notes" element={<Notes notes={notes}/>}/>
        <Route path="login" element={<Login onLogin={login} />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
      <Footer>
        <em><strong>Ying Tu 2023</strong></em>
      </Footer>
    </Page>

  );
}

export default App;
