import { useState } from "react"
import PropTypes from "prop-types"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("")

  const addNote = async (e) => {
    e.preventDefault()

    const newNoteObject = {
      content: newNote,
      important: true
    }
    const isAdded = await createNote(newNoteObject)
    if (isAdded) {
      setNewNote("")
    }
  }
  return (
    <div>
      <h2>Add new note</h2>
      <form onSubmit={addNote}>
        <input id="note-input" value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button id="note-input-button" type="submit">save</button>
      </form>
    </div>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired
}

export default NoteForm