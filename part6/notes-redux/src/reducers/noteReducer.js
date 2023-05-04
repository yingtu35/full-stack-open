import { createSlice } from "@reduxjs/toolkit"
import NoteService from "../services/NoteService"

export const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialState = []
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    appendNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const updatedNote = action.payload
      return state.map(note => note.id === updatedNote.id? updatedNote : note)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

// automatically generate action creators through createSlice
export const { appendNote, toggleImportanceOf, setNotes } = noteSlice.actions
export const initializeNotes = () => {
  // receive dispatch and getState as parameters
  return async dispatch => {
    // can do asynchronous dispatch
    const notes = await NoteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = content => {
  return async dispatch => {
    const newNote = await NoteService.create(content)
    dispatch(appendNote(newNote))
  }
}
export const toggleImportance = note => {
  return async dispatch => {
    const updateNote = {
      ...note,
      important: !note.important
    }
    const updatedNote = await NoteService.update(note.id, updateNote)
    dispatch(toggleImportanceOf(updatedNote))
  }
}
export default noteSlice.reducer