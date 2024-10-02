const { json } = require("body-parser");
const { db } = require("../mysqlConnection");
const tableName = "employment_type";

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

module.exports = {
  fetchAll,
};
