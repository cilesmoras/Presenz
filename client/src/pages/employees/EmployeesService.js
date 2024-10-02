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
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export const createEmployee = async (employeeData) => {
  try {
    const values = employeeData;
    const response = await Db.post("/employees/create/add", values);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateEmployee = async (employeeData, id) => {
  try {
    const values = employeeData;
    const response = await Db.patch(`/employees/${id}/edit`, values);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
