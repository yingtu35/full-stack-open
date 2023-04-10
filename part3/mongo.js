const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Password is required")
    process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@myfirstcluster.r38o8ej.mongodb.net/testNotesApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

// Define schema
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
})

// Create collection
const Note = mongoose.model("Note", noteSchema)

// Create document
// const note1 = new Note({
//     content: "I love MongoDB",
//     important: false
// })

// note1.save().then(result => {
//     console.log("note saved")
//     mongoose.connection.close()
// })

// // Fetch documents
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

