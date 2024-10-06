const express = require("express");
const router = express.Router();
const controller = require("./holidaysController");

router.get("/", controller.fetchAll);
router.get("/:id", controller.fetchById);
router.get("/fetch-by-date/:date", controller.fetchByDate);
router.get("/fetch-by-year/:year", controller.fetchByYear);
router.get("/distinct-years/a", controller.fetchDistinctYears);
router.post("/", controller.createHoliday);
router.put("/:id", controller.updateHoliday);
router.delete("/:id", controller.deleteHoliday);
module.exports = router;
