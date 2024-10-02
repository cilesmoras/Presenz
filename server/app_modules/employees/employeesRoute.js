const express = require("express");
const router = express.Router();
const controller = require("./employeesController");

router.get("/", controller.fetchAll);

router.get("/:idNumber", controller.fetchByIdNumber);
router.post("/create/add", controller.createEmployee);
router.patch("/:id/edit", controller.updateEmployee);
router.delete("/:id", controller.softDeleteEmployee);
module.exports = router;
