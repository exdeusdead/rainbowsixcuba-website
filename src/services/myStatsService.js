import { getToken } from "../auth/cgpAuth";

const API =
  "https://api.rainbowsixcuba.com/api";


export async function getMyStats() {

  const token = getToken();

  if (!token) {
    return null;
  }


  const res = await fetch(
    `${API}/me`,
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
