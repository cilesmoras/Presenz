import moment from "moment";
import React, { useEffect, useState } from "react";
import logo from "../../assets/HSAC-icon.png";
import { fetchEmployeeByIdNumber } from "../../pages/employees/EmployeesService";
import { getDayName } from "../../utils";
import { getLogsOfDay } from "../../utils/LogMgr";
import { monthsName } from "../../utils/months";
import "./Print.css";

const IN_CHARGE = import.meta.env.VITE_IN_CHARGE;

const thead1 = ["Day", "Morning", "Afternoon", "Undertime"];
const thead2 = ["IN", "OUT", "IN", "OUT", "Hrs:Min"];

export default function DtrTemplate({ data }) {
  const datesInMonth = data.datesInMonth;
  const employee_id = data.employee_id;
  const year = data.year;
  const month = data.month;
  const holidays = data.holidays;
  const [employeeDetails, setEmployeeDetails] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      let data = await fetchEmployeeByIdNumber(employee_id);
      setEmployeeDetails(data);
    };
    fetchEmployee();
  }, []);

  function findHolidayByDate(date) {
    const result = holidays?.find(
      (holiday) => date >= holiday.holiday_start && date <= holiday.holiday_end
    );
    return result ? result : null;
  }
  return (
    // <div className="dtr-container">
    <div className="px-4">
      <p className="text-[10px]">CSC FORM NO. 48</p>
      <div className="logo-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-text">
          <label>Republic of the Philippines</label>
          <br />
          <label className="">HUMAN SETTLEMENTS ADJUDICATION COMMISSION</label>
          <br />
          <label>Regional Adjudication Branch 9</label>
        </div>
      </div>
      <div className="flex flex-col justify-center w-[80%] mx-auto">
        <h1 className="text-sm leading-6 text-center my-1">
          DAILY TIME RECORD
        </h1>
        <h2 className="font-bold text-[12px] uppercase mx-4 border-gray-300 border-b-[1px] text-center">
          {employeeDetails
            ? `${employeeDetails.first_name} ${
                employeeDetails.middle_name ?? ""
              } ${employeeDetails.last_name}`
            : ""}
        </h2>
        <p className="text-center text-xs mb-1">Name</p>
      </div>
      <div className="flex flex-col gap-1 mb-1 text-[11px]">
        <div className="flex w-[90%]">
          <span>For the month of</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="flex-1 border-gray-300 border-b-[1px] pl-1">
            {monthsName[month].name} {year}
          </span>
        </div>
        <div className="flex w-[90%]">
          <span>Office of hours arrival</span>&nbsp;&nbsp;&nbsp;
          <span className="flex-1 border-gray-300 border-b-[1px] pl-1">
            Regular days
          </span>
        </div>
        <div className="flex w-[90%]">
          <span>and departure</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="flex-1 border-gray-300 border-b-[1px] pl-1"></span>
        </div>
      </div>
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
            <th>Hrs:Min</th>
          </tr>
        </thead>
        <tbody>
          {datesInMonth.map((date, index) => {
            const dayName = getDayName(date.getDay(), true);
            const isSaturday = dayName === "Sat";
            const isSunday = dayName === "Sun";
            const isWeekend = isSaturday || isSunday;
            const isWeekday = !isSaturday && !isSunday;
            const foundHoliday = findHolidayByDate(
              moment(date).format("YYYY-MM-DD")
            );

            return (
              <tr key={index}>
                <td>{`${date.getDate()}`}</td>
                {isWeekend && (
                  <td colSpan={6} className="text-gray-600">
                    {isSaturday ? "Saturday" : "Sunday"}
                  </td>
                )}
                {foundHoliday && isWeekday ? (
                  <td colSpan={6} className="text-red-600">
                    {foundHoliday?.name}
                  </td>
                ) : (
                  isWeekday &&
                  getLogsOfDay(data.empLogs, date)
                    .slice(0, 5)
                    .map((log, i) => <td key={i}>{log}</td>)
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
      <div className="bottom text-[11px]">
        <p>
          <strong>I CERTIFY</strong> on my honor that the above is true and
          correct report of the hours of work performed, record of which was
          made daily at the time of arrival and departure from office.
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
