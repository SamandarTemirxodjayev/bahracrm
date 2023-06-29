const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const skladController = require("../controllers/skladController");
const razdelkaController = require("../controllers/razdelkaController");
const chatController = require("../controllers/chatController");
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
router.post("/admin/history", UserMiddleware, adminController.historya);
router.post("/admin/lasthistory", UserMiddleware, adminController.lasthistory20);
router.post("/admin/history/:id", UserMiddleware, adminController.historywithid);
router.post("/admin/get/records", UserMiddleware, adminController.getRecords);
router.post("/admin/get/record/:id", UserMiddleware, adminController.getRecord);
router.post("/admin/add/company", UserMiddleware, adminController.addCompany);
router.post("/admin/get/company", UserMiddleware, adminController.getCompany);
router.post("/admin/get/company/:id", UserMiddleware, adminController.getCompanyById);
router.delete("/admin/company/:id", UserMiddleware, adminController.deleteCompany);
router.post("/admin/update/company/:id", UserMiddleware, adminController.updateCompany);

router.post("/sklad/fridge/get", UserMiddleware, skladController.getFridges);
router.post("/sklad/product/get", UserMiddleware, skladController.getProducts);
router.post("/sklad/global/add", UserMiddleware, skladController.addGlobal);
router.delete("/sklad/global", UserMiddleware, skladController.deleteGlobal);
router.post("/sklad/history", UserMiddleware, skladController.historyalast20);
router.post("/sklad/history/:id", UserMiddleware, skladController.historyByCompanyId);
router.post("/sklad/company/import/get", UserMiddleware, skladController.CompanyGetImport);
router.post("/sklad/company/export/get", UserMiddleware, skladController.CompanyGetExport);
router.post("/sklad/company/get", UserMiddleware, skladController.CompanyGet);

router.post("/razdelka/fridge/get", UserMiddleware, razdelkaController.getFridges);
router.post("/razdelka/product/get", UserMiddleware, razdelkaController.getProducts);
router.post("/razdelka/product/get/:id", UserMiddleware, razdelkaController.getProduct);
router.post("/razdelka/global/add", UserMiddleware, razdelkaController.addGlobal);
router.post("/razdelka/global/get", UserMiddleware, razdelkaController.getGlobal);
router.post("/razdelka/history", UserMiddleware, razdelkaController.historyalast20);
router.post("/razdelka/add/record", UserMiddleware, razdelkaController.addRecord);

router.get("/chat", chatController.getChats);
router.put("/chat", UserMiddleware, chatController.putChats);

router.post("/changePassword", UserMiddleware, adminController.changePassword);

module.exports = router;