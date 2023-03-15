require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

// middleware functions
const requestLogger = (req, res, next) => {
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log("---------")
    next()
}

app.use(express.static("build"))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

const Note = require("./models/note")

app.get("/api/notes", (req,res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.post("/api/notes", (req, res, next) => {
    const body = req.body
    // if (!body.content) {
    //     return res.status(400).json({error: "content missing"})
    // }

    const newNote = new Note({
        content: body.content,
        important: body.important || false
    })
    newNote.save()
        .then(savedNote => {
            console.log("new note saved")
            res.status(201).json(savedNote)
        })
        .catch(error => next(error))
    // .catch(error => {
    //     console.log("error saving note", error.message)
    //     res.status()
    // })
})

app.get("/api/notes/:id", (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if(note) {
                res.json(note)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => {
            next(error)
            // console.log(error)
            // res.status(400).send({error: "malformatted id"})
        })
    // const note = notes.find(note => note.id === id)
    // if (note){
    //     res.json(note)
    // }
    // else{
    //     res.statusMessage = "Could not find the resource"
    //     res.status(404).end()
    // }
})

app.put("/api/notes/:id", (req, res, next) => {
    const body = req.body
    // if (body.content === undefined) {
    //     console.log("content missing")
    //     return res.status(400).json({error: "content missing"})
    // }
    // if (body.important === undefined) {
    //     console.log("important missing")
    //     return res.status(400).json({error: "important missing"})
    // }
    const update = {
        content: body.content,
        important: body.important
    }

    const opts = {
        new: true,
        runValidators: true
    }
    Note.findByIdAndUpdate(req.params.id, update, opts)
        .then(updatedNote => {
            if (updatedNote) {
                console.log("note updated")
                res.json(updatedNote)
            }
            else {
                console.log(`note ${req.params.id} not found`)
                res.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

app.delete("/api/notes/:id", (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log("note deleted")
            res.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

const unknownendpoint = (req, res) => {
    res.status(404).send({ error: "Unknown endpoint" })
}

app.use(unknownendpoint)
// errorHandler has to be the last middleware
const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === "CastError") {
        res.status(400).send({ error: "malformatted id" })
    }
    else if (error.name === "ValidationError") {
        res.status(400).send({ error: error.message })
    }
    // pass the error to the default Express error handler
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})