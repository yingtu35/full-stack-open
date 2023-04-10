// Contain all cutome middleware functions
const logger = require("./logger")

const requestLogger = (req, res, next) => {
    logger.info(req.method)
    logger.info(req.path)
    logger.info(req.body)
    logger.info("---------")
    next()
}

const unknownendpoint = (req, res) => {
    res.status(404).send({ error: "Unknown endpoint" })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        res.status(400).send({ error: "malformatted id" })
    }
    else if (error.name === "ValidationError") {
        res.status(400).send({ error: error.message })
    }
    else if (error.name === "JsonWebTokenError") {
        res.status(400).send({ error: error.message })
    }
    else if (error.name === "TokenExpiredError") {
        res.status(400).send({ error: error.message })
    }
    // pass the error to the default Express error handler
    next(error)
}

module.exports = {
    requestLogger,
    unknownendpoint,
    errorHandler
}