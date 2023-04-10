// Handler of routes related to notes
// Create a Router object, use it as a mini-application
const noteRouter = require("express").Router()
const Note = require("../models/note")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "")
    }
    return null
}

noteRouter.get("/", async (req,res) => {
    const notes = await Note.find({}).populate("user", ["username", "name"])
    res.json(notes)
})

noteRouter.post("/", async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).send({
            error: "token invalid"
        })
    }

    const user = await User.findById(decodedToken.id)

    const newNote = new Note({
        content: body.content,
        important: body.important || false,
        user: user._id
    })
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    logger.info("new note saved")
    res.status(201).json(savedNote)
})

noteRouter.get("/:id", async (req, res) => {
    const note = await Note.findById(req.params.id)
    if(note) {
        res.json(note)
    }
    else {
        res.status(404).end()
    }
})

noteRouter.put("/:id", async (req, res) => {
    const body = req.body
    const update = {
        content: body.content,
        important: body.important
    }

    const opts = {
        new: true,
        runValidators: true
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, update, opts)
    if (updatedNote) {
        logger.info("note updated")
        res.json(updatedNote)
    }
    else {
        logger.error(`note ${req.params.id} not found`)
        res.status(404).end()
    }
})

noteRouter.delete("/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    logger.info("note deleted")
    res.status(204).end()
})

module.exports = noteRouter