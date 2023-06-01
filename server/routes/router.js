const express = require("express")
const router = express.Router()
const adminController = require('../controllers/adminController')
const UserMiddleware = require("../middleware/userMiddleware")

router.post('/login',  adminController.login)
router.post('/register', UserMiddleware, adminController.register)
router.post('/userInfo', UserMiddleware, adminController.userinfo)

module.exports = router