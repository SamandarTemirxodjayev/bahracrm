const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const UserMiddleware = require("../middleware/userMiddleware");

router.post("/company", UserMiddleware, adminController.addCompany);
router.get("/company", UserMiddleware, adminController.getCompany);
router.get("/company/:id", UserMiddleware, adminController.getCompanyById);
router.delete("/company/:id", UserMiddleware, adminController.deleteCompany);
router.patch("/company/:id", UserMiddleware, adminController.updateCompany);

router.post("/product", UserMiddleware, adminController.createProduct);
router.get("/product", UserMiddleware, adminController.getProducts);
router.get("/product/:id", UserMiddleware, adminController.getProductId);
router.patch("/product/:id", UserMiddleware, adminController.updateProductId);
router.delete("/product/:id", UserMiddleware, adminController.deleteProduct);

router.post("/fridge", UserMiddleware, adminController.createFridge);
router.get("/fridge", UserMiddleware, adminController.getFridges);
router.get("/fridge/:id", UserMiddleware, adminController.getFridgeId);
router.put("/fridge/:id", UserMiddleware, adminController.updateFridge);
router.delete("/fridge/:id", UserMiddleware, adminController.deleteFridge);

router.get("/history", UserMiddleware, adminController.historya);
router.post("/lasthistory", UserMiddleware, adminController.lasthistory20);
router.get("/history/:id", UserMiddleware, adminController.historywithid);
router.get("/history/company/:id", UserMiddleware, adminController.historywithcompanyid);
router.get("/records", UserMiddleware, adminController.getRecords);
router.get("/record/:id", UserMiddleware, adminController.getRecord);


module.exports = router;
