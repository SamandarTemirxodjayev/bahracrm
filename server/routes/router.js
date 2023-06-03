const express = require("express")
const router = express.Router()
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const realizatorController = require('../controllers/realizatorController')
const UserMiddleware = require("../middleware/userMiddleware")

router.post('/login',  adminController.login)
router.post('/register', UserMiddleware, adminController.register)
router.post('/userInfo', UserMiddleware, adminController.userinfo)
router.post('/users', UserMiddleware, adminController.users)

router.post('/realizator/info', UserMiddleware, realizatorController.realizatorInfo)

module.exports = router