const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const skladController = require("../controllers/skladController");
const razdelkaController = require("../controllers/razdelkaController");
const UserMiddleware = require("../middleware/userMiddleware");

router.post("/login",  adminController.login);
router.post("/register", UserMiddleware, adminController.register);
router.post("/userInfo", UserMiddleware, adminController.userinfo);
router.post("/users", UserMiddleware, adminController.users);
router.post("/user/:id", UserMiddleware, adminController.user);
router.post("/user/edit/:id", UserMiddleware, adminController.editUser);
router.delete("/user/:id", UserMiddleware, adminController.deleteUser);
router.post("/fridge/create", UserMiddleware, adminController.createFridge);
router.post("/fridge/get", UserMiddleware, adminController.getFridges);
router.post("/fridge/get/:id", UserMiddleware, adminController.getFridgeId);
router.post("/fridge/update/:id", UserMiddleware, adminController.updateFridge);
router.delete("/fridge/:id", UserMiddleware, adminController.deleteFridge);
router.post("/product/create", UserMiddleware, adminController.createProduct);
router.post("/product/get", UserMiddleware, adminController.getProducts);
router.post("/product/get/:id", UserMiddleware, adminController.getProductId);
router.post("/product/update/:id", UserMiddleware, adminController.updateProductId);
router.delete("/product/:id", UserMiddleware, adminController.deleteProduct);

router.post("/sklad/fridge/get", UserMiddleware, skladController.getFridges);
router.post("/sklad/product/get", UserMiddleware, skladController.getProducts);
router.post("/sklad/global/add", UserMiddleware, skladController.addGlobal);
router.post("/sklad/history", UserMiddleware, skladController.historyalast20);

router.post("/razdelka/fridge/get", UserMiddleware, razdelkaController.getFridges);
router.post("/razdelka/product/get", UserMiddleware, razdelkaController.getProducts);
router.post("/razdelka/global/add", UserMiddleware, razdelkaController.addGlobal);
router.post("/razdelka/global/get", UserMiddleware, razdelkaController.getGlobal);
router.post("/razdelka/history", UserMiddleware, razdelkaController.historyalast20);

module.exports = router;