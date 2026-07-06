import { getToken } from "../auth/cgpAuth";

const STATS_API =
  "https://api.rainbowsixcuba.com/api";

export async function getMyStatsProfile() {
  const token = getToken();

  if (!token) {
    return null;
  }

  const res = await fetch(
    `${STATS_API}/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}
