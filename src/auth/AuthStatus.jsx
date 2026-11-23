import React, { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./cgpAuth";
import { DISCORD_LOGIN_URL } from "../config/apiConfig";
import { APP_COPY, getLanguage, withLang } from "../i18n";

export default function AuthStatus({ lang: propLang }) {
  const lang = propLang || getLanguage();
  const t = (APP_COPY[lang] || APP_COPY.es).auth;
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
        <a className="discord" href={`${DISCORD_LOGIN_URL}${DISCORD_LOGIN_URL.includes("?") ? "&" : "?"}lang=${lang}`}>
        {t.loginDiscord}
      </a>
    );
  }

  const username =
    user.identities?.discord?.username ||
    user.id;

  return (
    <div className="discord">
      <a
        href={withLang("/account", lang)}
        title={t.openAccount}
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
          window.location.href = withLang("/", lang);
        }}
      >
          {t.logout}
      </button>
    </div>
  );
}
