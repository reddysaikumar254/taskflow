const API_URL = import.meta.env.VITE_API_URL;   // must exist

export async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    // Backend returned HTML / text instead of JSON → causes your "Invalid server response"
    let data;
    try {
      data = await res.json();
    } catch {
      return { success: false, message: "Invalid server response" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}
