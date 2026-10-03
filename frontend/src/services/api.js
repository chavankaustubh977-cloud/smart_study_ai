// ScholarAI Backend API Service
// Connects to FastAPI backend running on localhost:8000
const API_BASE = "http://127.0.0.1:8000";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/`, { method: "GET" });
    if (!res.ok) return { online: false };
    const data = await res.json();
    return { online: true, ...data };
  } catch {
    return { online: false };
  }
}

export async function sendTestMessage(message, data = {}) {
  try {
    const res = await fetch(`${API_BASE}/api/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, data })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API not reachable, running in offline mode:", err);
    return null;
  }
}
