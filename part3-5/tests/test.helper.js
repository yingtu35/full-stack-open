const Note = require("../models/note")
const User = require("../models/user")

// initialize the database before every test for test consistency
const initialNotes = [
    {
        content: "HTML is easy",
        important: false,
    },
    {
        content: "Browser can execute only JavaScript",
        important: true,
    },
]

const nonexistingId = async () => {
    const nonExistingNote = {
        content: "nonexisting note",
    }
    const note = new Note(nonExistingNote)
    const returnedNote = await note.save()
    const id = returnedNote.id
    await Note.findByIdAndDelete(id)
    return id
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialNotes, nonexistingId, usersInDb
}