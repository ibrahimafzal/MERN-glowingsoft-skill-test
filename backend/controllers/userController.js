const User = require("../models/userModel");
const { generateToken } = require("../config/jwToken");
const asyncHandler = require("express-async-handler")


// Register a user/ Create user
const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, mobile, password, pic } = req.body

        if (!name || !email || !mobile || !password) {
            res.sendStatus(400)
            throw new Error("All necessary inputs fields have not been filled")
        }

        // check user is already exist or not
        const existUser = await User.findOne({ email })
        if (existUser) {
            throw new Error("Email already Exists")
        }

        // check mobile number is already used or not
        const existMobileNumber = await User.findOne({ mobile })
        if (existMobileNumber) {
            res.sendStatus(406)
            throw new Error("This Mobile number already used.");
        }

        // create user
        const createdUser = await User.create({ name, email, mobile, password, pic })
        if (createdUser) {
            res.status(201).json({
                _id: createdUser?._id,
                name: createdUser?.name,
                email: createdUser?.email,
                mobile: createdUser?.mobile,
                pic: createdUser?.pic,
                token: generateToken(createdUser?._id)
            })
        } else {
            res.status(400)
            throw new Error("Registration Error")
        }

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})


// Login a user
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        //check if user is exist or not
        const findUser = await User.findOne({ email })
        if (findUser && (await findUser.isPasswordMatched(password))) {  
            res.status(200).json({
                _id: findUser?._id,
                name: findUser?.name,
                email: findUser?.email,
                mobile: findUser?.mobile,
                role: findUser?.role,
                pic: findUser?.pic,
                token: generateToken(findUser?._id)
            })
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createUser, login }