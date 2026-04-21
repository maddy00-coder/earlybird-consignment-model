const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = configuredApiUrl ? configuredApiUrl.replace(/\/+$/, "") : "";

function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
}

async function request(path, options = {}) {
  const { headers, ...restOptions } = options;
  let response;

  try {
    response = await fetch(buildApiUrl(path), {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    });
  } catch (error) {
    throw new Error("Unable to reach the server. Please try again in a moment.");
  }

  const contentType = response.headers.get("content-type") || "";
  let payload = null;

  if (response.status !== 204) {
    payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  }

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.message || `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
};

export { API_BASE_URL };
