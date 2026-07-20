const normalizeBaseUrl = (value) =>
  String(value || "").replace(/\/+$/, "");

export const WEBSITE_URL = normalizeBaseUrl(
  import.meta.env.VITE_WEBSITE_URL || "https://rainbowsixcuba.com"
);

export const API_BASE = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL || "https://api.rainbowsixcuba.com"
);

export const CGP_API = `${API_BASE}/cgp/api`;
export const STATS_API = `${API_BASE}/api`;

const CURRENT_ORIGIN =
  typeof window !== "undefined"
    ? window.location.origin
    : WEBSITE_URL;

export const DISCORD_LOGIN_URL =
  `${CGP_API}/auth/discord/login?returnUrl=` +
  encodeURIComponent(`${CURRENT_ORIGIN}/auth/callback`);
