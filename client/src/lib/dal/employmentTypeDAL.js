const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchEmploymentTypes() {
  try {
    const response = await fetch(`${API_BASE_URL}/employment-types`);
    if (!response.ok) throw new Error("Failed to fetch employment types.");
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
