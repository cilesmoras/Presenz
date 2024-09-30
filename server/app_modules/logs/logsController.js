const { db } = require("../mysqlConnection");

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
  const query =
    "INSERT INTO attendance_logs (`employees_id`, `punch_type`, `attendance_type_id`, `log_time`, `created_by`,`updated_by`) VALUES ?";
  db.query(
    query,
    [
      request.body.map((body) => [
        body.id,
        body.punchType,
        body.attendanceType,
        body.logTime,
        body.userId,
        body.updateBy,
      ]),
    ],
    (err, data) => {
      if (err) {
        return response.json(err);
      }

      return response.json("logs uploaded successfully!");
    }
  );
};

module.exports = {
  getLogs,
  insertLogs,
};
