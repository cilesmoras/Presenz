const { json } = require("body-parser");
const { db } = require("../mysqlConnection");
const tableName = "employees";
const viewTable = "view_employees";

const userId = 1;

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
    userId,
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

const updateEmployee = (request, response) => {
  const { id } = request.params;
  const {
    employmentType,
    jobTitle,
    department,
    idNumber,
    firstName,
    midName,
    lastName,
  } = request.body;

  console.log(request.body);
  console.log(id);
  const checkID = "SELECT id_number FROM employees WHERE id = ?";
  db.query(checkID, id, (error, result) => {
    console.log("result", result);
    if (result.length == 0) {
      return response
        .status(404)
        .json({ success: false, message: "Employee not found." });
    }

    const query = `UPDATE ${tableName} SET employment_type_id = ?, job_title_id = ?, department_id = ?, id_number = ?, first_name = ?, middle_name = ?,last_name = ?,updated_by = ? WHERE id = ?`;
    db.query(
      query,
      [
        employmentType,
        jobTitle,
        department,
        idNumber,
        firstName,
        midName,
        lastName,
        userId,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log(err);
          return response
            .status(500)
            .json({ success: false, message: "Internal server error." });
        }

        response
          .status(200)
          .json({ success: true, message: "Employee has been updated." });
      }
    );
  });
};

module.exports = {
  fetchAll,
  fetchByIdNumber,
  createEmployee,
  updateEmployee,
};
