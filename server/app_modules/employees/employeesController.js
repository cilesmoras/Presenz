const { json } = require("body-parser");
const { db } = require("../mysqlConnection");
const tableName = "employees";
const viewTable = "view_employees";

const fetchAll = (request, response) => {
  const query = `SELECT * FROM ${viewTable}`;
  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    response.send(result);
  });
};

const fetchByIdNumber = (request, response) => {
  const { idNumber } = request.params;
  const query = `SELECT * FROM ${viewTable} WHERE id_number = ?`;
  db.query(query, idNumber, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    response.send(result);
  });
};

const createEmployee = (request, response) => {
  const values = [
    request.body.employmentType,
    request.body.jobTitle,
    request.body.department,
    request.body.idNumber,
    request.body.firstName,
    request.body.midName,
    request.body.lastName,
    request.body.createdBy,
  ];

  const checkID = "SELECT id_number FROM employees WHERE id_number=?";
  db.query(checkID, [request.body.idNumber], (error, result) => {
    if (result.length > 0) {
      return response
        .status(409)
        .json({ success: false, message: "Employee already exists." });
    }
    const query =
      "INSERT INTO employees (`employment_type_id`,`job_title_id`,`department_id`,`id_number`,`first_name`,`middle_name`,`last_name`,`created_by`) VALUES (?)";
    db.query(query, [values], (err, res) => {
      if (err) {
        console.log(err);
        return response
          .status(500)
          .json({ success: false, message: "Internal server error." });
      }

      response
        .status(201)
        .json({ success: true, message: "Employee has been created." });
    });
  });
};

module.exports = {
  fetchAll,
  fetchByIdNumber,
  createEmployee,
};
