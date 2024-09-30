const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchLogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/logs`);
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
