import { getToken } from "../auth/cgpAuth";

const API =
  "https://api.rainbowsixcuba.com/api";


export async function getMyMembership() {
  const token = getToken();

  if (!token) {
    return null;
  }

  const res = await fetch(
    `${API}/r6/membership/me`,
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


export async function joinRainbowSixCuba() {
  const token = getToken();

  if (!token) {
    throw new Error("Login required");
  }

  const res = await fetch(
    `${API}/r6/membership/join`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Join failed");
  }

  return res.json();
}
