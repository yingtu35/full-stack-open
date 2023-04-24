export const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// Action creators
export const createNote = (content) => {
  return ({
    type: "NEW NOTE",
    payload: {
      content: content,
      important: false,
      id: generateId()
    }
  })
}

export const toggleImportanceOf = (id) => {
  return ({
    type: "TOGGLE IMPORTANCE",
    payload: { id }
  })
}

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (state=initialState, action) => {
    switch (action.type) {
      case "NEW NOTE":
        return [...state, action.payload]
      case "TOGGLE IMPORTANCE":
        const id = action.payload.id
        const noteToChange = state.find(note => note.id === id)
        const changedNote = {
          ...noteToChange,
          important: !noteToChange.important
        }
        const newState = state.map(note => note.id === id? changedNote : note)
        return newState
      default:
        return state
    }
}

export default noteReducer