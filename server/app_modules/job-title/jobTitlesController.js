const { json } = require("body-parser");
const { db } = require("../mysqlConnection");
const tableName = "job_titles";

const userId = 1;

const fetchAll = (request, response) => {
  const query = `SELECT * FROM ${tableName}`;
  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return response.status(500);
    }
    response.send(result);
  });
};

const fetchById = (request, response) => {
  const { id } = request.params;
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  db.query(query, id, (error, result) => {
    if (error) {
      console.log(error);
      return response.status(500);
    }
    response.send(result[0]);
  });
};

const createJobtitle = (request, response) => {
  const values = [request.body.title, userId];

  const query = `INSERT INTO ${tableName}  (title, created_by) VALUES (?)`;
  db.query(query, [values], (err, res) => {
    if (err) {
      console.log(err);
      return response
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    response
      .status(201)
      .json({ success: true, message: "Job title has been created." });
  });
};

const updateJobtitle = (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const query = `UPDATE ${tableName} SET title = ?, updated_by = ? WHERE id = ?`;
  db.query(query, [title, userId, id], (err, res) => {
    if (err) {
      console.log(err);
      return response
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    response
      .status(200)
      .json({ success: true, message: "Job title has been updated." });
  });
};

const deleteJobTitle = (request, response) => {
  const { id } = request.params;

  const query = `DELETE FROM ${tableName} WHERE id = ?`;
  db.query(query, id, (err, res) => {
    if (err) {
      console.log(err);
      return response
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    response
      .status(201)
      .json({ success: true, message: "Job title has been deleted." });
  });
};

module.exports = {
  fetchAll,
  fetchById,
  createJobtitle,
  updateJobtitle,
  deleteJobTitle,
};
