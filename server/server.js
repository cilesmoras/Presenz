const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(5000, () => {
  console.log(`Running in port 5000`);
});

const employeesRoutes = require("./app_modules/employees/employeesRoute");
app.use("/employees", employeesRoutes);

const logsRoutes = require("./app_modules/logs/logsRoute");
app.use("/logs", logsRoutes);

const userRoutes = require("./app_modules/auth/authRoute");
app.use("/auth", userRoutes);
