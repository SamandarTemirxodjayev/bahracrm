const express = require("express");
const router = express.Router();
const skladController = require("../controllers/skladController");
const UserMiddleware = require("../middleware/userMiddleware");


router.get("/fridge", UserMiddleware, skladController.getFridges);
router.get("/product", UserMiddleware, skladController.getProducts);
router.post("/global", UserMiddleware, skladController.addGlobal);
router.delete("/global", UserMiddleware, skladController.deleteGlobal);
router.get("/history", UserMiddleware, skladController.historyalast20);
router.get("/history/:id", UserMiddleware, skladController.historyByCompanyId);
router.get("/company/import", UserMiddleware, skladController.CompanyGetImport);
router.get("/company/export", UserMiddleware, skladController.CompanyGetExport);
router.get("/company", UserMiddleware, skladController.CompanyGet);

module.exports = router;