const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("notes", ["content", "important"])
    res.json(users)
})

userRouter.post("/", async (req, res) => {
    const body = req.body
    const saltRounds = 10
    const newUser = new User ({
        username: body.username,
        name: body.name,
        passwordHash: await bcrypt.hash(body.password, saltRounds)
    })
    const returnedUser = await newUser.save()
    res.status(201).json(returnedUser)
})

module.exports = userRouter