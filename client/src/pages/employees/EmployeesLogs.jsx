import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { fetchLogs } from "../../components/print/DtrServices";
import Print from "../../components/print/Print";
import { getDayName, getDaysInMonth } from "../../utils/";
import { getLogsOfDay } from "../../utils/LogMgr";
import { Input, Select } from "./../../components/inputs/";

const printOption = [
  { id: 1, name: "Whole Month" },
  { id: 2, name: "First Half" },
  { id: 3, name: "Second Half" },
];

export default function EmployeesLogs({ idNumber }) {
  const defaultMonth = new Date().getMonth();
  const defaultYear = new Date().getFullYear();
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [datesInMonth, setDatesInMonth] = useState([]);
  const [dateToPrint, setDateToPrint] = useState(1);

  const selectedDate = new Date(year, month, 1);
  const [empLogs, setEmplogs] = useState([]);

  function handleChangeMonth(e) {
    setMonth(e.target.value);
  }

  function handleChangeYear(e) {
    setYear(e.target.value);
  }

  function handleDayToPrint(e) {
    setDateToPrint(e.target.value);
  }

  const renderLog = (date) => {
    return getLogsOfDay(empLogs, date);
  };
  useEffect(() => {
    const performFetch = async () => {
      setDatesInMonth(
        getDaysInMonth(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          Number(dateToPrint)
        )
      );
      const logs = await fetchLogs(
        parseInt(idNumber),
        dayjs(selectedDate).format("YYYY-MM")
      );

      setEmplogs(logs);
    };
    performFetch();
  }, [month, year, dateToPrint]);

  return (
    <>
      <div
        className="flex flex-col gap-2 md:flex-row md:gap-4 mb-5"
        style={{ position: "relative" }}
      >
        <Input
          type="number"
          onChange={handleChangeYear}
          defaultValue={defaultYear}
        />
        <Select
          options={months}
          onChange={handleChangeMonth}
          defaultValue={defaultMonth}
        />
        <Select options={printOption} onChange={handleDayToPrint} />
        <Print
          empLogs={empLogs}
          datesInMonth={datesInMonth}
          employee_id={idNumber}
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
                    return (
                      <tr
                        key={index}
                        className={`${
                          dayName === "Sat" || dayName === "Sun"
                            ? "bg-gray-100"
                            : ""
                        } `}
                      >
                        <td
                          colSpan={`${
                            dayName === "Sat" || dayName === "Sun" ? "7" : "1"
                          }`}
                          className="whitespace-nowrap py-2 pl-2  text-left  text-sm text-gray-500 "
                        >
                          {`${date.getDate()} - ${dayName}`}
                        </td>

                        {dayName === "Sat" || dayName === "Sun"
                          ? ""
                          : empLogs &&
                            getLogsOfDay(
                              empLogs,
                              moment(
                                `${year}-${Number(month) + 1}-${date.getDate()}`
                              ).format("YYYY-MM-DD")
                            ).map((item, i) => (
                              <td
                                key={i}
                                className="hidden lg:table-cell whitespace-nowrap text-center text-sm text-gray-900"
                              >
                                {item ? item : ""}
                              </td>
                            ))}

                        <td className="hidden lg:table-cell whitespace-nowrap text-center text-sm text-gray-900"></td>
                        <td className="hidden lg:table-cell whitespace-nowrap text-center text-sm text-gray-900"></td>
                        <td className="whitespace-nowrap py-2 pl-3  text-right text-sm font-medium ">
                          {dayName === "Sat" || dayName === "Sun" ? (
                            ""
                          ) : (
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900 pr-6"
                            >
                              View logs
                            </a>
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

const transactions = [
  {
    id: crypto.randomUUID(),
    day: "1",
    morningIn: "08:00",
    morningOut: "12:01",
    afternoonIn: "12:47",
    afternoonOut: "17:06",
    undertime: "17:06",
    totalWorkingHours: "08:06",
  },
  {
    id: crypto.randomUUID(),
    day: "2",
    morningIn: "07:57",
    morningOut: "12:02",
    afternoonIn: "12:59",
    afternoonOut: "17:03",
    undertime: "17:06",
    totalWorkingHours: "08:06",
  },
  {
    id: crypto.randomUUID(),
    day: "3",
    morningIn: "07:58",
    morningOut: "12:05",
    afternoonIn: "12:36",
    afternoonOut: "17:14",
    undertime: "17:06",
    totalWorkingHours: "08:16",
  },
];
