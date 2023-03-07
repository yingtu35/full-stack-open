const Note = ({ note, toggleImportance }) => {
  const label = note.important? 'make not important' : 'make important'

  return (
    <li>
      <button onClick={toggleImportance}>{label}</button>
      {note.content}
    </li>
  )
  }
  
  export default Note