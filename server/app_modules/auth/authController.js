const bcrypt = require("bcryptjs");
const { db } = require("../mysqlConnection");
const jwt = require("jsonwebtoken");

//register user
const register = (request, response) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [request.body.username], (err, data) => {
    if (err) return response.send(err.data);
    if (data.length)
      return response.status(409).send("Username is already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(request.body.password, salt);
    const q =
      "INSERT INTO users (`roles_id`,`first_name`,`last_name`,`username`,`password`,`created_by`) VALUES (?)";
    const values = [
      "1",
      request.body.firstName,
      request.body.lastName,
      request.body.username,
      hashpass,
      "1",
    ];
    db.query(q, [values], (err, data) => {
      if (err) return response.send(err);
      response.status(200).send("User has been created");
    });
  });
};

//login
const login = (request, response) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [request.body.username], (err, data) => {
    if (err) return response.send(err);
    if (data.length === 0)
      return response.status(404).send("Invalid Username!");

    const checkPassword = bcrypt.compareSync(
      request.body.password,
      data[0].password
    );
    if (!checkPassword) return response.status(400).send("Incorrect Password");

    const token = jwt.sign({ id: data[0].id }, "jwtsecretkey");
    const { password, ...other } = data[0];
    response
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};

//logout
const logout = (request, response) => {
  response.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
