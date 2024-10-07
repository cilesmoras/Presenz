import { Db } from "../../utils/ConnectMethod";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchJobTitles() {
  try {
    const response = await fetch(`${API_BASE_URL}/job-title`);
    if (!response.ok) throw new Error("Failed to fetch job titles.");
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function fetchJobTitleById(id) {
  try {
    const response = await Db.get(`/job-title/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}

export async function insertJobTitle(data) {
  try {
    const response = await Db.post("/job-title", data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}

export async function updateJobTitle(data, id) {
  try {
    const response = await Db.patch(`/job-title/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteJobTitle(id) {
  try {
    const response = await Db.delete(`/job-title/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
