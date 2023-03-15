import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notes from './services/Notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)

  const toggleImportance = (note) => {
    const id = note.id
    const updateNote = {
      ...note,
      important: !note.important
    }
    Notes
      .update(id, updateNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id? note: returnedNote))
      })
      .catch(error => {
        setErrorMsg(`Note: '${note.content}' is already deleted from the server.`);
        setTimeout(() => {
          setErrorMsg(null)
        }, 3000)
        setNotes(notes.filter(note => note.id !== id));
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    Notes
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  useEffect(()=> {
    Notes
      .getAll()
      .then(returnedNotes => {
        setNotes(returnedNotes);
      })
    return () => {}
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <ul>
        {notes.map(note => 
          <Note key={note.id} 
                note={note}
                toggleImportance={() => toggleImportance(note)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App