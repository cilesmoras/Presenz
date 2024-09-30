import { Db } from "../../utils/ConnectMethod";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchEmployees() {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchEmployeeByIdNumber(idNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${idNumber}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export const createEmployee = async (employeeData) => {
  const values = employeeData;
  const response = await Db.post("/employees/create/add", values);
  return response;
};
