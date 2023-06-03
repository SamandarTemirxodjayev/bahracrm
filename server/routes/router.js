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
router.post('/user/:id', UserMiddleware, adminController.user)
router.post('/user/edit/:id', UserMiddleware, adminController.editUser)
router.delete('/user/:id', UserMiddleware, adminController.deleteUser)
router.post('/fridge/create', UserMiddleware, adminController.createFridge)
router.post('/fridge/get', UserMiddleware, adminController.getFridges)
router.post('/fridge/get/:id', UserMiddleware, adminController.getFridgeId)
router.post('/fridge/update/:id', UserMiddleware, adminController.updateFridge)
router.delete('/fridge/:id', UserMiddleware, adminController.deleteFridge)

router.post('/realizator/info', UserMiddleware, realizatorController.realizatorInfo)

module.exports = router