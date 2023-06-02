const express = require("express")
const router = express.Router()
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const UserMiddleware = require("../middleware/userMiddleware")

router.post('/login',  adminController.login)
router.post('/register', UserMiddleware, adminController.register)
router.post('/userInfo', UserMiddleware, adminController.userinfo)

router.post('/user/userInfo', UserMiddleware, userController.userinfo)
router.post('/user/index', UserMiddleware, userController.index)

module.exports = router