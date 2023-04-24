import { createNote } from "../reducers/noteReducer"
import { useDispatch } from "react-redux"

const NewNote = () => {
    const dispatch = useDispatch()
    const addNote = (e) => {
        e.preventDefault()
        const content = e.target.note.value
        e.target.note.value = ""
        dispatch(createNote(content))
    }
    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">save</button>
        </form>
    )
}

export default NewNote