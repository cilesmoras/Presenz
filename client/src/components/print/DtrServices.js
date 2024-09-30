import { Db } from "../../utils/ConnectMethod";
import moment from "moment";

export const comparativeDate = (mydate, startNum, endNum) => {
  let timeAsNumber = Number(moment(mydate).format("HHmmss"));
  return timeAsNumber >= startNum && timeAsNumber <= endNum;
};

export const fetchLogs = async (employeeId, date) => {
  const values = { employeeId: employeeId, date: date };
  try {
    const employeeLogs = await Db.post("/logs/employeelogs", values);
    return employeeLogs.data;
  } catch (error) {
    console.log(error);
  }
};
