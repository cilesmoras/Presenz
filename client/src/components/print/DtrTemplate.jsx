import moment from "moment";
import React, { useEffect, useState } from "react";
import logo from "../../assets/HSAC-icon.png";
import { fetchEmployeeByIdNumber } from "../../pages/employees/EmployeesService";
import { getDayName } from "../../utils";
import { getLogsOfDay } from "../../utils/LogMgr";
import { monthsName } from "../../utils/months";
import "./Print.css";

const IN_CHARGE = import.meta.env.VITE_IN_CHARGE;

export default function DtrTemplate({ data }) {
  const datesInMonth = data.datesInMonth;
  const employee_id = data.employee_id;
  const year = data.year;
  const month = data.month;
  const [employeeDetails, setEmployeeDetails] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      let data = await fetchEmployeeByIdNumber(employee_id);
      setEmployeeDetails(data);
    };
    fetchEmployee();
  }, []);

  return (
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
        <h2 className="italic">
          {employeeDetails
            ? `${employeeDetails.first_name} ${employeeDetails.middle_name} ${employeeDetails.last_name}`
            : ""}
        </h2>
        <span>NAME</span>
      </div>
      <div className="flex w-[90%]">
        <span>For the month of</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="flex-1 border-black border-b-[1px]">
          {monthsName[month].name}
        </span>
      </div>
      <div className="flex w-[90%]">
        <span>Office of hours arrival</span>&nbsp;&nbsp;&nbsp;
        <span className="flex-1 border-black border-b-[1px]">Regular days</span>
      </div>
      <div className="flex w-[90%]">
        <span>and departure</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="flex-1 border-black border-b-[1px]"></span>
      </div>
      {/* <div className="sub-header">
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
        </div> */}
      <table className="dtr-table">
        <thead>
          <tr>
            <th rowSpan={2}>Day</th>
            <th colSpan={2}>Morning</th>
            <th colSpan={2}>Afternoon</th>
            <th colSpan={2}>Undertime</th>
          </tr>
          <tr>
            <th>IN</th>
            <th>OUT</th>
            <th>IN</th>
            <th>OUT</th>
            <th>Hours:Min</th>
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
                    {data.empLogs &&
                      getLogsOfDay(
                        data.empLogs,
                        moment(
                          `${year}-${Number(month) + 1}-${date.getDate()}`
                        ).format("YYYY-MM-DD")
                      )
                        .slice(0, 5)
                        .map((log, i) => <td key={i}>{log}</td>)}
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
          <span>I CERTIFY </span>on my honor that the above is true and correct
          report of the hours of work performed, record of which was made daily
          at the time of arrival and departure from office.
        </p>
        <div className="bottom2">
          <p>Employee Signature</p>
          <p>Verified as the prescribed office hours.</p>
          <p>{IN_CHARGE}</p>
          <p>Chief Regional Adjudicator</p>
        </div>
      </div>
    </div>
  );
}
