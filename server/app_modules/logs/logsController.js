const { db } = require("../mysqlConnection");

const userId = 1;
//get logs by month
const getLogs = (request, response) => {
  const employeeId = request.body.employeeId;
  const date = request.body.date;
  const query =
    "SELECT id,employees_id,punch_type,log_time FROM attendance_logs where employees_id = ? and DATE_FORMAT(log_time,'%Y-%m') = ?";
  db.query(query, [employeeId, date], (err, data) => {
    if (err) return response.json(err);
    return response.json(data);
  });
};

const insertLogs = (request, response) => {
  const values = [
    request.body.employeeIdNumber,
    request.body.punchType,
    request.body.attendanceType,
    request.body.logTime,
    userId,
  ];

  const query =
    "INSERT INTO attendance_logs (`employees_id`, `punch_type`, `attendance_type_id`, `log_time`, `created_by`) VALUES (?)";
  db.query(query, [values], (err, data) => {
    if (err) {
      console.error(err);
      return response
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    return response
      .status(200)
      .json({ success: true, message: "Logs has been added." });
  });
};

module.exports = {
  getLogs,
  insertLogs,
};
