const express = require("express");
const router = express.Router();
const controller = require("./holidaysController");

router.get("/", controller.fetchAll);
router.get("/:id", controller.fetchById);
router.post("/", controller.createHoliday);
router.put("/:id", controller.updateHoliday);
router.delete("/:id", controller.deleteHoliday);
module.exports = router;
