import React, { useState } from "react";
import {
  Globe2,
  Menu,
  X
} from "lucide-react";

import AuthStatus from "../auth/AuthStatus.jsx";

function Logo({ onHome }) {
  return (
    <button className="brand" onClick={onHome}>
      <img
        className="brand-logo"
        src="/assets/logo/r6cuba-shield.webp"
        alt="Rainbow Six CUBA"
      />

      <span>
        <b>RAINBOW SIX</b>
        <b>CUBA</b>
      </span>
    </button>
  );
}

export function DiscordIcon() {
  return (
    <img
      className="discordIcon"
      src="/assets/icons/discord.svg"
      alt="Discord"
    />
  );
}

export default function Header({
  t,
  lang,
  setLang,
  active,
  setActive,
  languages
}) {
  const [open, setOpen] = useState(false);

  const navIds = [
    "home",
    "community",
    "events",
    "competitive",
    "statistics",
    "coaches",
    "partners",
    "collaborators"
  ];

  return (
    <header>
      <Logo onHome={() => setActive("home")} />

      <button
        className="menu"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={open ? "open" : ""}>
        {navIds.map((id, index) => (
          <button
            key={id}
            className={active === id ? "active" : ""}
            onClick={() => {
              setActive(id);
              setOpen(false);
            }}
          >
            {id === "home" ? t.nav[0] : t.nav[index]}
          </button>
        ))}
      </nav>

      <div className="head-actions">
        <label className="language">
          <Globe2 size={16} />

          <select
            value={lang}
            onChange={(event) => setLang(event.target.value)}
            aria-label="Idioma"
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.flag} {language.short}
              </option>
            ))}
          </select>
        </label>

        <AuthStatus />
      </div>
    </header>
  );
}
