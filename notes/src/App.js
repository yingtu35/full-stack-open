import { useState, useEffect, useRef } from "react"
import LoginForm from "./components/LoginForm"
import Note from "./components/Note"
import NoteForm from "./components/NoteForm"
import Togglable from "./components/Togglable"
import LoginService from "./services/LoginService"
import NoteService from "./services/NoteService"

import Notification from "./components/Notification"
import Footer from "./components/Footer"

const App = () => {
  const noteFormRef = useRef()

  const [notes, setNotes] = useState([])
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)

  const userLogin = async (userInfo) => {
    try {
      const returnedUser = await LoginService.login(userInfo)
      window.localStorage.setItem("loggedNotesAppUser", JSON.stringify(returnedUser))
      NoteService.setToken(returnedUser.token)
      const msg = `Logged in as ${returnedUser.name}`
      displayMsg(msg, false)
      setUser(returnedUser)
      return true
    }
    catch(error) {
      const data = error.response.data
      const errorMsg = data.error
      displayMsg(errorMsg, true)
      console.log(error)
      return false
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNotesAppUser")
    NoteService.setToken(null)
    setUser(null)
    const msg = "Logout success"
    displayMsg(msg, false)
  }

  const displayMsg = (message, isError) => {
    setMsg(message)
    setIsError(isError)
    setTimeout(() => {
      setMsg(null)
      setIsError(false)
    }, 3000)
  }

  const toggleImportance = (note) => {
    const id = note.id
    const updateNote = {
      ...note,
      important: !note.important
    }
    NoteService
      .update(id, updateNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id? note: returnedNote))
      })
      .catch(() => {
        const error = `Note: "${note.content}" is already deleted from the server.`
        displayMsg(error, true)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await NoteService.create(noteObject)
      noteFormRef.current.toggleVisibility()
      const msg = `Note: '${noteObject.content}' is added to the server`
      displayMsg(msg, false)
      setNotes(notes => notes.concat(returnedNote))
      return true
    } catch (error) {
      const errorMsg = error.response.data.error
      displayMsg(errorMsg, true)
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    NoteService
      .getAll()
      .then(returnedNotes => {
        setNotes(returnedNotes)
      })
    return () => {}
  }, [])

  useEffect(() => {
    const loggedNotesAppUser = JSON.parse(window.localStorage.getItem("loggedNotesAppUser"))
    if (loggedNotesAppUser) {
      NoteService.setToken(loggedNotesAppUser.token)
      setUser(loggedNotesAppUser)
    }
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes App</h1>
      <Notification message={msg} isError={isError} />
      {user
        ? (
          <div>
            <div>
              {user.name}
              <button onClick={handleLogout}>Logout</button>
            </div>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote}/>
            </Togglable>
          </div>
        )
        : (
          <Togglable buttonLabel="login">
            <LoginForm userLogin={userLogin}  />
          </Togglable>
        )
      }
      <div className="notes">
        <h2>All notes</h2>
        <button
          onClick={() => setShowAll(showAll => !showAll)}>
          show {showAll? "important" : "all"}
        </button>
        <ul>
          {notesToShow.map(note =>
            <Note key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note)}
            />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App