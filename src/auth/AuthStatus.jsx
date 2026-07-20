import React, { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./cgpAuth";
import { DISCORD_LOGIN_URL } from "../config/apiConfig";

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <a className="discord" href={DISCORD_LOGIN_URL}>
        Login Discord
      </a>
    );
  }

  const username =
    user.identities?.discord?.username ||
    user.id;

  return (
    <div className="discord">
      <a
        href="/account"
        title="Abrir Mi Cuenta"
        style={{
          color: "inherit",
          textDecoration: "none"
        }}
      >
        <span className="online-dot" aria-hidden="true"></span>{username}
      </a>

      <button
        type="button"
        onClick={() => {
          logout();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
