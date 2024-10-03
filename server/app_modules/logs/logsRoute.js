const express = require("express");
const router = express.Router();
const logs = require("./logsController");

router.get("/:employeeId/:date", logs.getLogs);
router.post("/insertlogs", logs.insertLogs);
router.post("/batchInserts", logs.batchInsertLogs);
router.patch("/:logId", logs.updateLog);
router.delete("/:logId", logs.deleteLog);

module.exports = router;
