import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { fetchLogs } from "../../components/print/DtrServices";
import Print from "../../components/print/Print";
import Drawer from "../../components/ui/Drawer";
import { useNotificationContext } from "../../context/NotificationContext";
import { deleteAttendanceLog } from "../../lib/dal/attendanceLogsDAL";
import { fetchHolidaysByYear } from "../../lib/dal/holidaysDAL";
import { getDayName, getDaysInMonth } from "../../utils/";
import { getLogsOfDay } from "../../utils/LogMgr";
import { Input, Select } from "./../../components/inputs/";
import DtrLogsForm from "./DtrLogsForm";
import ViewLogsOfDayList from "./ViewLogsOfDay";

const printOption = [
  { id: 1, name: "Whole Month" },
  { id: 2, name: "First Half" },
  { id: 3, name: "Second Half" },
];

export default function EmployeesLogs({ employee }) {
  const queryClient = useQueryClient();
  const { handleNotification } = useNotificationContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultMonth = new Date().getMonth();
  const defaultYear = new Date().getFullYear();
  const year = searchParams.get("year") ?? defaultYear;
  const month = searchParams.get("month") ?? defaultMonth;
  const dateToPrint = searchParams.get("dateToPrintear") ?? printOption[0].id;
  const [datesInMonth, setDatesInMonth] = useState([]);
  const selectedDate = new Date(year, month, 1);
  const [empLogs, setEmplogs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedViewLogsDate, setSelectedViewLogsDate] = useState("");
  const [selectedEditLog, setSelectedEditLog] = useState(null);
  const [logsOfSelectedDate, setLogsOfSelectedDate] = useState([]);
  const employeeLogs = useQuery(
    [
      "employee-logs",
      employee.id_number,
      dayjs(selectedDate).format("YYYY-MM"),
    ],
    () =>
      fetchLogs(
        parseInt(employee.id_number),
        dayjs(selectedDate).format("YYYY-MM")
      )
  );
  const { data: holidaysData, isLoading: isLoadingHolidays } = useQuery(
    ["holidays", year],
    () => fetchHolidaysByYear(year)
  );

  function setFilters(filters) {
    setSearchParams((params) => {
      filters.year && params.set("year", filters.year);
      filters.month && params.set("month", filters.month);
      return params;
    });
  }

  function findHolidayByDate(holidays, date) {
    const result = holidays?.find(
      (holiday) => date >= holiday.holiday_start && date <= holiday.holiday_end
    );
    return result ? result : null;
  }

  function handleChangeMonth(e) {
    setMonth(e.target.value);
  }

  function handleChangeYear(e) {
    setYear(e.target.value);
  }

  function handleDayToPrint(e) {
    setDateToPrint(e.target.value);
  }

  useEffect(() => {
    if (employeeLogs.isLoading) return;
    setEmplogs(employeeLogs.data);
  }, [employeeLogs.data, employeeLogs.isLoading]);

  useEffect(() => {
    setDatesInMonth(
      getDaysInMonth(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        Number(dateToPrint)
      )
    );
  }, [month, year, dateToPrint]);

  // get niya tanang logs anang adlawa
  // apil natong wala ning appear sa dtr
  useEffect(() => {
    if (!selectedViewLogsDate) return;
    const logs = empLogs.filter(
      (item) =>
        moment(item.log_time).format("YYYY-MM-DD") ===
        moment(selectedViewLogsDate).format("YYYY-MM-DD")
    );
    const sortedLogs = logs.sort(
      (a, b) => new Date(a.log_time) - new Date(b.log_time)
    );
    setLogsOfSelectedDate(sortedLogs);
  }, [selectedViewLogsDate, empLogs]);

  function handleClickViewLogs(date) {
    setSelectedEditLog(null);
    setSelectedViewLogsDate(date);
    setDrawerOpen(true);
  }

  function handleEditLog(data) {
    setSelectedEditLog(data);
  }

  async function handleDeleteLog(data) {
    try {
      const logId = data.id;
      const result = await deleteAttendanceLog(logId);
      if (!result.success) {
        handleNotification("error", "Something went wrong.", result.message);
        return;
      }

      queryClient.invalidateQueries([
        "employee-logs",
        employee.id_number,
        dayjs(selectedViewLogsDate).format("YYYY-MM"),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  const drawerContent = (
    <>
      <div className="pb-4">
        <DtrLogsForm
          logData={selectedEditLog}
          setLogData={setSelectedEditLog}
          employee={employee}
          selectedDate={selectedViewLogsDate}
          setDrawerOpen={setDrawerOpen}
        />
      </div>
      <ViewLogsOfDayList
        logs={logsOfSelectedDate}
        handleEdit={handleEditLog}
        handleDelete={handleDeleteLog}
      />
    </>
  );

  if (employeeLogs.isLoading || isLoadingHolidays) return <p>Loading...</p>;

  return (
    <>
      <div
        className="flex flex-col gap-2 md:flex-row md:gap-4 mb-5"
        style={{ position: "relative" }}
      >
        <Input
          type="number"
          onChange={(e) => setFilters({ year: e.target.value })}
          defaultValue={year}
        />
        <Select
          options={months}
          onChange={(e) => setFilters({ month: e.target.value })}
          defaultValue={month}
        />
        <Select
          options={printOption}
          defaultValue={dateToPrint}
          onChange={(e) => setFilters({ dateToPrint: e.target.value })}
        />
        <Print
          empLogs={empLogs}
          holidays={holidaysData}
          datesInMonth={datesInMonth}
          employee_id={employee.id_number}
          year={year}
          month={month}
        />
      </div>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table border="1" className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4  text-left pr-3 text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Date
                    </th>
                    <th
                      colSpan={2}
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Morning
                    </th>
                    <th
                      colSpan={2}
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Afternoon
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Undertime
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Worked hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {datesInMonth.map((date, index) => {
                    const dayName = getDayName(date.getDay(), true);
                    const isSaturday = dayName === "Sat";
                    const isSunday = dayName === "Sun";
                    const isWeekend = isSaturday || isSunday;
                    const isWeekday = !isSaturday && !isSunday;
                    const foundHoliday = findHolidayByDate(
                      holidaysData,
                      moment(date).format("YYYY-MM-DD")
                    );

                    return (
                      <tr
                        key={index}
                        className={`${isWeekend ? "bg-gray-100" : ""} `}
                      >
                        <td className="whitespace-nowrap py-2 pl-2 text-left text-sm text-gray-500 ">
                          {`${date.getDate()} - ${dayName}`}
                        </td>
                        {foundHoliday && isWeekday && (
                          <td
                            colSpan="6"
                            className="whitespace-nowrap py-2 pl-2 text-center text-sm text-red-500 font-semibold"
                          >
                            {foundHoliday?.name}
                          </td>
                        )}

                        {isWeekend ? (
                          <td colSpan="6"></td>
                        ) : (
                          !foundHoliday &&
                          getLogsOfDay(empLogs, date).map((item, i) => (
                            <td
                              key={i}
                              className="table-cell whitespace-nowrap text-center text-sm text-gray-900"
                            >
                              {item ? item : ""}
                            </td>
                          ))
                        )}
                        <td className="whitespace-nowrap py-2 pl-3  text-right text-sm font-medium ">
                          {isWeekday && !foundHoliday && (
                            <span
                              className="text-indigo-600 hover:text-indigo-900 pr-6 cursor-pointer"
                              onClick={() => handleClickViewLogs(date)}
                            >
                              View logs
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={`Logs - ${dayjs(selectedViewLogsDate).format("MMMM DD, YYYY")}`}
        content={drawerContent}
      />
    </>
  );
}

const months = [
  { id: 0, name: "January" },
  { id: 1, name: "February" },
  { id: 2, name: "March" },
  { id: 3, name: "April" },
  { id: 4, name: "May" },
  { id: 5, name: "June" },
  { id: 6, name: "July" },
  { id: 7, name: "August" },
  { id: 8, name: "September" },
  { id: 9, name: "October" },
  { id: 10, name: "November" },
  { id: 11, name: "December" },
];
