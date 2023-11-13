const express = require('express')
const {registerUser, userLogin, getUser} = require('../controllers/UserController')


const router = express.Router()

router.post('/', registerUser)
router.post('/login', userLogin)
router.get('/data', getUser)


module.exports = router