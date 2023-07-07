const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const chatController = require("../controllers/chatController");
const UserMiddleware = require("../middleware/userMiddleware");

router.post("/login",  adminController.login); //user
router.post("/register", UserMiddleware, adminController.register);
router.post("/userInfo", UserMiddleware, adminController.userinfo); //user
router.post("/users", UserMiddleware, adminController.users);
router.post("/user/:id", UserMiddleware, adminController.user);
router.put("/user/:id", UserMiddleware, adminController.editUser);
router.delete("/user/:id", UserMiddleware, adminController.deleteUser);

router.get("/chat", chatController.getChats); //user
router.put("/chat", UserMiddleware, chatController.putChats); //user

router.post("/changePassword", UserMiddleware, adminController.changePassword); //user

module.exports = router;