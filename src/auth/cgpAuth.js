const LEGACY_TOKEN_KEY = "cgpToken";

function clearLegacyToken() {
  try { localStorage.removeItem(LEGACY_TOKEN_KEY); } catch {}
}

// A secure cookie/code-exchange flow is not available in this preview. Never
// accept, persist, or read a bearer token in the browser.
export function saveToken() {
  clearLegacyToken();
  return false;
}

export function getToken() {
  clearLegacyToken();
  return null;
}

export function logout() {
  clearLegacyToken();
}

export async function getCurrentUser() {
  clearLegacyToken();
  return null;
}
