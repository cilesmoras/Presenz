import { Db } from "../../utils/ConnectMethod";

export async function insertAttendanceLog(data) {
  try {
    const response = await Db.post("/logs/insertlogs", data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}
