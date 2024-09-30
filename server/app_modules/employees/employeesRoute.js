const express = require("express");
const router = express.Router();
const controller = require("./employeesController");

router.get("/", controller.fetchAll);

router.get("/:idNumber", controller.fetchByIdNumber);

router.post("/create/add", controller.createEmployee);
module.exports = router;
