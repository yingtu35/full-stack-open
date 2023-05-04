import { useQuery, useMutation, useQueryClient } from "react-query"
import { getNotes, createNote, toggleImportant } from "./requests"

const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery( "notes", getNotes, {refetchOnWindowFocus: false} )
  const newNoteMutation = useMutation(
    createNote, 
    {
      onSuccess: (newNote) => {
        const notes = queryClient.getQueryData("notes")
        queryClient.setQueryData("notes", notes.concat(newNote))
      }
    }
    )
  const toggleImportanceMutation = useMutation(
    toggleImportant,
    {
      onSuccess: (updatedNote) => {
        const notes = queryClient.getQueryData("notes")
        queryClient.setQueryData("notes", notes.map(note => note.id === updatedNote.id ? updatedNote : note))
      }
    }
  )

  if (result.isLoading) {
    return <div>Data loading</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({content, important: false})
  }

  const toggleImportance = (note) => {
    const updateNote = {
      ...note,
      important: !note.important
    }
    toggleImportanceMutation.mutate(updateNote)
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App