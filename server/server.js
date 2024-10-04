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
const logsRoutes = require("./app_modules/logs/logsRoute");
const userRoutes = require("./app_modules/auth/authRoute");
const jobTitlesRoutes = require("./app_modules/job-title/jobTitlesRoute");
const departmentsRoutes = require("./app_modules/departments/departmentsRoute");
const employmentTypeRoutes = require("./app_modules/employment-type/employmentTypeRoute");
const holidayRoutes = require("./app_modules/holidays/holidaysRoute");

app.use("/employees", employeesRoutes);
app.use("/logs", logsRoutes);
app.use("/auth", userRoutes);
app.use("/job-title", jobTitlesRoutes);
app.use("/departments", departmentsRoutes);
app.use("/employment-types", employmentTypeRoutes);
app.use("/holidays", holidayRoutes);
