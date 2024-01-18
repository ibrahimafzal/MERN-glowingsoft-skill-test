const express = require("express");
const { login, createUser } = require("../controllers/userController");

const router = express.Router()

router.post("/register", createUser)
router.post("/login", login)

module.exports = router;