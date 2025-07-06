const BASE_URL = import.meta.env.VITE_API_URL;
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  return { json: await response.json(), response };
}
