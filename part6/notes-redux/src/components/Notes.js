import { toggleImportance } from "../reducers/noteReducer"
import { useDispatch, useSelector } from "react-redux"

// presentational
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important? "important" : ""}</strong>
    </li>
  )
}

// container
const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ notes, filter }) => {
    switch (filter) {
    case "ALL":
      return notes
    case "IMPORTANT":
      return notes.filter(note => note.important)
    case "NONIMPORTANT":
      return notes.filter(note => !note.important)
    default:
      return notes
    }
  })

  const handleToggleImportance = async (note) => {
    dispatch(toggleImportance(note))
  }

  return (
    <ul>
      {notes.map(note => <Note key={note.id} note={note} handleClick={() => handleToggleImportance(note)} />)}
    </ul>
  )
}

export default Notes