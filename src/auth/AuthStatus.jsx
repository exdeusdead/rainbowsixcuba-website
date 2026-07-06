import React, { useEffect, useState } from "react";
import { getCurrentUser, clearToken } from "./cgpAuth";

const LOGIN_URL =
  "https://api.rainbowsixcuba.com/cgp/api/auth/discord/login?returnUrl=https://rainbowsixcuba.com/auth/callback";

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <a className="discord" href={LOGIN_URL}>
        Login Discord
      </a>
    );
  }

  return (
    <div className="discord">
      🟢 {user.identities?.discord?.username || user.id}

      <button
        onClick={() => {
          clearToken();
          location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}
