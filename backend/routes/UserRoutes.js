const express = require('express')
const {registerUser, userLogin, getUser} = require('../controllers/UserController')


const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', userLogin)
router.get('/data', protect, getUser)


module.exports = router