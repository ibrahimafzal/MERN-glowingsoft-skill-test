const jwt = require("jsonwebtoken")

const generateToken = (id) => { //we use id for generate the token
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

module.exports = { generateToken }