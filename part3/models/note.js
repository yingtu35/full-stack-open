const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("Connecting to", url)
mongoose.set("strictQuery", false)
mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB", error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
})

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// export module as a value
module.exports = mongoose.model("Note", noteSchema)