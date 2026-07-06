import React, { useEffect, useState } from "react";
import { saveToken } from "./cgpAuth";

export default function AuthCallback() {
  const [message, setMessage] = useState("Connecting CGP account...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      setMessage("Login failed: missing token");
      return;
    }

    saveToken(token);

    setMessage("CGP Login successful. Redirecting...");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  }, []);

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
