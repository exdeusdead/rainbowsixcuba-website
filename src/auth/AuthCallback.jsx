import React, { useLayoutEffect, useState } from "react";
import { APP_COPY, getLanguage } from "../i18n";
import { sanitizeAuthCallbackUrl } from "./authSecurity";

export default function AuthCallback() {
  const [lang] = useState(getLanguage);
  const t = (APP_COPY[lang] || APP_COPY.es).auth;
  const [message, setMessage] = useState(t.blocked);

  useLayoutEffect(() => {
    const sanitized = sanitizeAuthCallbackUrl(window.location.href);
    if (sanitized.removed) window.history.replaceState({}, document.title, sanitized.href);
    setMessage(t.blocked);
  }, [t.blocked]);

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      background:"#050505",
      color:"white",
      fontFamily:"Arial"
    }}>
      <h2>{message}</h2>
    </div>
  );
}
