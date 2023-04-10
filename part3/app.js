// API declaration
const express = require("express")
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const noteRouter = require("./controllers/notes")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const app = express()

mongoose.set("strictQuery", false)

logger.info("Connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        logger.info("Error connecting to MongoDB", error.message)
    })

app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors())

app.use("/api/notes", noteRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    const testRouter = require("./controllers/test")
    app.use("/api/test", testRouter)
}

app.use(middleware.unknownendpoint)
// errorHandler has to be the last middleware
app.use(middleware.errorHandler)

module.exports = app

