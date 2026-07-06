const TOKEN_KEY = "cgpToken";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentUser() {
  const token = getToken();

  if (!token) return null;

  const res = await fetch(
    "https://api.rainbowsixcuba.com/cgp/api/auth/me",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) return null;

  return res.json();
}
