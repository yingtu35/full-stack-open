// Contain all the printing work
// Easy for writing logs to external logging services
const info = (...params) => {
    if (process.env.NODE_ENV !== "test") {
        console.log(...params)
    }
}

const error = (...errors) => {
    if (process.env.NODE_ENV !== "test") {
        console.error(...errors)
    }
}

module.exports =  {
    info, error
}