const express = require("express");
const router = express.Router();
const controller = require("./employmentTypeController");

router.get("/", controller.fetchAll);
// router.get("/:id", controller.fetchById);
// router.post("/", controller.createJobtitle);
// router.patch("/:id", controller.updateJobtitle);
module.exports = router;
