import { Db } from "../../utils/ConnectMethod";

export async function fetchHolidays() {
  try {
    const response = await Db.get("/holidays");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchHolidaysById(id) {
  try {
    const response = await Db.get(`/holidays/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchHolidaysByDate(date) {
  try {
    const response = await Db.get(`/holidays/${date}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchHolidaysByYear(year) {
  try {
    const response = await Db.get(`/holidays/fetch-by-year/${year}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchDHolidaysDistinctYears(year) {
  try {
    const response = await Db.get(`/holidays/distinct-years/a`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function insertHoliday(data) {
  try {
    const response = await Db.post("/holidays", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateHoliday(data, id) {
  try {
    const response = await Db.put(`/holidays/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteHoliday(id) {
  try {
    const response = await Db.delete(`/holidays/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
