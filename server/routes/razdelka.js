const express = require("express");
const router = express.Router();
const razdelkaController = require("../controllers/razdelkaController");
const UserMiddleware = require("../middleware/userMiddleware");

router.get("/fridge", UserMiddleware, razdelkaController.getFridges);
router.get("/product", UserMiddleware, razdelkaController.getProducts);
router.post("/product/get/:id", UserMiddleware, razdelkaController.getProduct);
router.post("/global/add", UserMiddleware, razdelkaController.addGlobal);
router.put("/global", UserMiddleware, razdelkaController.getGlobal);
router.get("/history", UserMiddleware, razdelkaController.historyalast20);
router.post("/add/record", UserMiddleware, razdelkaController.addRecord);

module.exports = router;