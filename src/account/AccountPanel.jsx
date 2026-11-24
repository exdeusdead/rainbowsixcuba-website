import React, { useEffect, useState } from "react";
import { APP_COPY, getLanguage, withLang } from "../i18n";

export default function AccountPanel() {
  const [lang] = useState(getLanguage);
  const copy = APP_COPY[lang] || APP_COPY.es;
  const t = copy.account;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <section className="scoreboardShell">
      <span className="scoreBadge">{t.badge}</span>
      <h2>{t.authBlocked}</h2>
      <p>{t.authBlockedCopy}</p>
      <button className="btn ghost" onClick={() => { window.location.href = withLang("/", lang); }}>
        {t.home}
      </button>
    </section>
  );
}
