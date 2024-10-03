const express = require("express");
const router = express.Router();
const logs = require("./logsController");

router.post("/employeelogs", logs.getLogs);
router.post("/insertlogs", logs.insertLogs);
router.delete("/:logId", logs.deleteLog);

module.exports = router;
