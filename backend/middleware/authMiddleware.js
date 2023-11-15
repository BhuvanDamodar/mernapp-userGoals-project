const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel')


const protect = asyncHandler(async(req,res,next)=>{
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await UserModel.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            res.status(401)
            throw new error('Unauthorized')
        }
    }

    if(!token){
        console.log(token)
        console.log('No token')
        res.status(401)
        throw new Error('Unauthorized, no token')
    }
})

module.exports = {protect}