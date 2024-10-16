const { json } = require("body-parser");
const { db } = require("../mysqlConnection");
const tableName = "holidays";

const userId = 1;

function fetchAll(req, res) {
  const query = `SELECT * FROM ${tableName}`;
  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500);
    }
    res.send(result);
  });
}

function fetchById(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.send(result[0]);
  });
}

function fetchByDate(req, res) {
  const { date } = req.params;
  const query = `SELECT * FROM ${tableName} WHERE ? BETWEEN holiday_start and holiday_end`;
  db.query(query, date, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.send(result[0]);
  });
}

function fetchByYear(req, res) {
  const { year } = req.params;
  const query = `SELECT * FROM ${tableName} WHERE YEAR(holiday_start) = ?`;
  db.query(query, year, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.send(result);
  });
}

function fetchGroupByYear(req, res) {
  const query = `SELECT YEAR(holiday_start) year FROM ${tableName} GROUP BY year`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.send(result);
  });
}

function createHoliday(req, res) {
  const values = [
    req.body.name,
    req.body.holidayStart,
    req.body.holidayEnd,
    userId,
  ];

  const query = `INSERT INTO ${tableName} (name, holiday_start, holiday_end, created_by) VALUES (?)`;
  db.query(query, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    res
      .status(201)
      .json({ success: true, message: "Holiday has been created." });
  });
}

function updateHoliday(req, res) {
  const { id } = req.params;
  const { name, holidayStart, holidayEnd } = req.body;

  const query = `UPDATE ${tableName} SET name = ?, holiday_start = ?, holiday_end = ?, updated_by = ? WHERE id = ?`;
  db.query(
    query,
    [name, holidayStart, holidayEnd, userId, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error." });
      }

      res
        .status(200)
        .json({ success: true, message: "Holiday has been updated." });
    }
  );
}

function deleteHoliday(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM ${tableName} WHERE id = ?`;
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    res
      .status(200)
      .json({ success: true, message: "Holiday has been deleted." });
  });
}

module.exports = {
  fetchAll,
  fetchById,
  fetchByDate,
  fetchByYear,
  fetchGroupByYear,
  createHoliday,
  updateHoliday,
  deleteHoliday,
};
