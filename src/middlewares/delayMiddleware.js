const data = require("../config/backend.json")

module.exports = (req, res, next) => {
    if (data.delay) {
        setTimeout(next, data.delay)
        return
    }
    next()
}