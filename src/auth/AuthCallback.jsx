import React, { useEffect, useState } from "react";
import { saveToken } from "./cgpAuth";
import { APP_COPY, getLanguage } from "../i18n";

export default function AuthCallback() {
  const [lang] = useState(getLanguage);
  const t = (APP_COPY[lang] || APP_COPY.es).auth;
  const [message, setMessage] = useState(t.connecting);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      setMessage(t.missingToken);
      return;
    }

    saveToken(token);

    setMessage(t.success);

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  }, [t.missingToken, t.success]);

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
