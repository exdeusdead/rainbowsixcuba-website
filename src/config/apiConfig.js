const normalizeBaseUrl = (value) =>
  String(value || "").replace(/\/+$/, "");

export const WEBSITE_URL = normalizeBaseUrl(
  import.meta.env.VITE_WEBSITE_URL || "https://r6cuba.coregamingcorporation.com"
);

export const API_BASE = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL || "https://r6cuba-api.coregamingcorporation.com"
);

export const CGP_API = `${API_BASE}/cgp/api`;
export const STATS_API = `${API_BASE}/api`;

// The browser uses the Review Portal route. The portal relays this request to
// CGP so the product never exposes the API host in its public auth CTA.
export const DISCORD_LOGIN_PATH = "/auth/discord/login";
