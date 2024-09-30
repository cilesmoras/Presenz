const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "presenz_db",
  dateStrings: ["DATETIME", "DATE"],
});

module.exports = { db };
