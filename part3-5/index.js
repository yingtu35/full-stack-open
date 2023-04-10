// Server network declaration
const logger = require("./utils/logger")
const config = require("./utils/config")
const app = require("./app")

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})