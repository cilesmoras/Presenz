import { Db } from "../../utils/ConnectMethod";

export async function insertAttendanceLog(data) {
  try {
    const response = await Db.post("/logs/insertlogs", data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function deleteAttendanceLog(logId) {
  try {
    const response = await Db.delete(`/logs/${logId}`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}
