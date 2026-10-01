import { STATS_API } from "../config/apiConfig";
import { getToken } from "../auth/cgpAuth";

export async function getMyStats() {

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
