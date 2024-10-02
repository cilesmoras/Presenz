import dayjs from "dayjs";
import React, { forwardRef, useEffect, useState } from "react";
import logo from "../../assets/HSAC-icon.png";
import { fetchEmployeeByIdNumber } from "../../pages/employees/EmployeesService";
import { getDayName } from "../../utils";
import { monthsName } from "../../utils/months";
import { comparativeDate } from "./DtrServices";
import "./Print.css";

const ComponentToPrint = forwardRef((props, ref) => {
  const datesInMonth = props.datesInMonth;
  const employee_id = props.employee_id;
  const year = props.year;
  const month = props.month;
  const [employeeDetails, setEmployeeDetails] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      let data = await fetchEmployeeByIdNumber(employee_id);
      setEmployeeDetails(data);
    };
    fetchEmployee();
  }, []);

  return (
    <div ref={ref} className="dtr-main-container">
      {/* copy 1 */}
      <div className="dtr-container">
        <p>CSC FORM NO. 48</p>
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="header-text">
            <label>Republic of the Philippines</label>
            <br />
            <label>HUMAN SETTLEMENTS ADJUDICATION COMMISSION</label>
            <br />
            <label>Regional Adjudication Branch 9</label>
          </div>
        </div>
        <div className="title-name">
          <h1>DAILY TIME RECORD</h1>
          <h2>
            {employeeDetails
              ? `${employeeDetails.first_name} ${employeeDetails.middle_name} ${employeeDetails.last_name}`
              : ""}
          </h2>
          <span>NAME</span>
        </div>
        <div className="sub-header">
          <div className="left">
            <span>For the month of</span>
            <span>Office of hours arrival</span>
            <span>and departure</span>
          </div>
          <div className="right">
            <span>{monthsName[month].name}</span>
            <span>Regular Days</span>
            <span>Saturdays</span>
          </div>
        </div>
        <table className="dtr-table">
          <thead>
            <tr>
              <th rowSpan={2}>Day</th>
              <th colSpan={2}>Morning</th>
              <th colSpan={2}>Afternoon</th>
              <th colSpan={2}>Total Working</th>
            </tr>
            <tr>
              <th>IN</th>
              <th>OUT</th>
              <th>IN</th>
              <th>OUT</th>
              <th>Hours</th>
              <th>Min.</th>
            </tr>
          </thead>
          <tbody>
            {datesInMonth.map((date, index) => {
              const dayName = getDayName(date.getDay(), true);
              return (
                <tr key={index}>
                  <td>{`${date.getDate()}`}</td>
                  {dayName === "Sat" || dayName === "Sun" ? (
                    <td colSpan={6} style={{ fontStyle: "italic" }}>
                      {dayName === "Sat" ? "Saturday" : "Sunday"}
                    </td>
                  ) : (
                    <>
                      <td>
                        {/* moring login */}
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 0 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 50000, 115900)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}{" "}
                      </td>
                      <td>
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 1 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 80000, 130000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}
                      </td>

                      {/* Afternoon login */}
                      <td>
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 0 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 120000, 230000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}
                      </td>

                      {/* Afternoon logout */}
                      <td>
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 1 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 130000, 230000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}{" "}
                      </td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              );
            })}
            <tr>
              <td colSpan={5} style={{ fontWeight: "bold" }}>
                Total
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="bottom">
          <p>
            <span>I CERTIFY </span>on my honor that the above is true and
            correct report of the hours of work performed, record of which was
            made daily at the time of arrival and departure from office.
          </p>
          <div className="bottom2">
            <p>Employee Signature</p>
            <p>Verified as the prescribed office hours.</p>
            <p>Atty. KERTH JOSSEF M. ABLANGUE</p>
            <p>In-Charge</p>
          </div>
        </div>
      </div>
      {/* copy 2 */}
      <div className="dtr-container">
        <p>CSC FORM NO. 48</p>
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="header-text">
            <label>Republic of the Philippines</label>
            <br />
            <label>HUMAN SETTLEMENTS ADJUDICATION COMMISSION</label>
            <br />
            <label>Regional Adjudication Branch 9</label>
          </div>
        </div>
        <div className="title-name">
          <h1>DAILY TIME RECORD</h1>
          <h2>
            {employeeDetails
              ? `${employeeDetails.first_name} ${employeeDetails.middle_name} ${employeeDetails.last_name}`
              : ""}
          </h2>
          <span>NAME</span>
        </div>
        <div className="sub-header">
          <div className="left">
            <span>For the month of</span>
            <span>Office of hours arrival</span>
            <span>and departure</span>
          </div>
          <div className="right">
            <span>{monthsName[month].name}</span>
            <span>Regular Days</span>
            <span>Saturdays</span>
          </div>
        </div>
        <table className="dtr-table">
          <thead>
            <tr>
              <th rowSpan={2}>Day</th>
              <th colSpan={2}>Morning</th>
              <th colSpan={2}>Afternoon</th>
              <th colSpan={2}>Total Working</th>
            </tr>
            <tr>
              <th>IN</th>
              <th>OUT</th>
              <th>IN</th>
              <th>OUT</th>
              <th>Hours</th>
              <th>Min.</th>
            </tr>
          </thead>
          <tbody>
            {datesInMonth.map((date, index) => {
              const dayName = getDayName(date.getDay(), true);
              return (
                <tr key={index}>
                  <td>{`${date.getDate()}`}</td>
                  {dayName === "Sat" || dayName === "Sun" ? (
                    <td colSpan={6} style={{ fontStyle: "italic" }}>
                      {dayName === "Sat" ? "Saturday" : "Sunday"}
                    </td>
                  ) : (
                    <>
                      <td>
                        {/* moring login */}
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 0 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 50000, 110000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}{" "}
                      </td>
                      <td>
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 1 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 80000, 130000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}{" "}
                      </td>

                      {/* Afternoon login */}
                      <td>
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 0 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 120000, 230000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}{" "}
                      </td>

                      {/* Afternoon logout */}
                      <td>
                        {props.empLogs
                          ?.filter(
                            (val) =>
                              Number(val.punch_type) === 1 &&
                              dayjs(val.log_time).format("YYYY-MM-DD") ===
                                dayjs(
                                  `${year}-${
                                    Number(month) + 1
                                  }-${date.getDate()}`
                                ).format("YYYY-MM-DD") &&
                              comparativeDate(val.log_time, 130000, 230000)
                          )
                          .slice(0, 1)
                          .map((log, i) => (
                            <p key={i}>{dayjs(log.log_time).format("HH:mm")}</p>
                          ))}{" "}
                      </td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              );
            })}
            <tr>
              <td colSpan={5} style={{ fontWeight: "bold" }}>
                Total
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="bottom">
          <p>
            <span>I CERTIFY </span>on my honor that the above is true and
            correct report of the hours of work performed, record of which was
            made daily at the time of arrival and departure from office.
          </p>
          <div className="bottom2">
            <p>Employee Signature</p>
            <p>Verified as the prescribed office hours.</p>
            <p>Atty. KERTH JOSSEF M. ABLANGUE</p>
            <p>In-Charge</p>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ComponentToPrint;
