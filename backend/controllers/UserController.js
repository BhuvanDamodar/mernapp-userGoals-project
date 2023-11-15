const UserModel = require("../models/UserModel")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { protect } = require("../middleware/authMiddleware")

// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //Check for all fields has data
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check for user exist
    const userExists = await UserModel.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('User not created')
    }

})

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter email or password')
    }

    const userExists = await UserModel.findOne({ email })
    if(!userExists){
        res.status(400)
        throw new Error('User does\'nt exist')
    }
    const passCheck = await bcrypt.compare(password, userExists.password)
    
    if (userExists && passCheck) {
        res.status(200).json({
            _id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists.id)
        })
    } else {
        res.status(400)
        throw new Error('Password incorrect')
    }
})

//access private
const getUser = asyncHandler(async (req, res,) => {
    const { _id, name, email} = await UserModel.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

//Generate JWT token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    userLogin,
    getUser
}