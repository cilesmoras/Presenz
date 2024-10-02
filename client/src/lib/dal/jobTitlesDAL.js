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
