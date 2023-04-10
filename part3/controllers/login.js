const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
    const body = req.body
    const user = await User.findOne({ username: body.username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!user || !passwordCorrect) {
        return res.status(401).send({
            error: "Invalid username or password"
        })
    }

    const payload = {
        username: user.username,
        name: user.name,
        id: user._id
    }

    const userToken = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 })
    res.status(200).json({
        token: userToken,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter