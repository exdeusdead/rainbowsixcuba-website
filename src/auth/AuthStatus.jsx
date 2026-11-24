import React from "react";
import { APP_COPY, getLanguage } from "../i18n";

export default function AuthStatus({ lang: propLang }) {
  const lang = propLang || getLanguage();
  const t = (APP_COPY[lang] || APP_COPY.es).auth;
  return <span className="discord" role="status" aria-label={t.loginUnavailable}>{t.loginUnavailable}</span>;
}
