const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchDepartments() {
  try {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error("Failed to fetch departments.");
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
