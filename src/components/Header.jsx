import React, { useEffect, useRef, useState } from "react";
import {
  Globe2,
  Menu,
  X
} from "lucide-react";

import AuthStatus from "../auth/AuthStatus.jsx";
import { assetPath } from "../i18n";

function Logo({ onHome }) {
  return (
    <button className="brand" onClick={onHome}>
      <img
        className="brand-logo"
        src={assetPath("/logo/r6cuba-shield.webp")}
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
      src={assetPath("/icons/discord.svg")}
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
  const menuRef = useRef(null);
  const navRef = useRef(null);
  useEffect(() => {
    if (open) navRef.current?.querySelector("button")?.focus();
  }, [open]);
  const activeNav = active === "companion" ? "statistics" : active;

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
    <header onKeyDown={(event) => {
      if (event.key !== "Escape" || !open) return;
      event.preventDefault();
      setOpen(false);
      menuRef.current?.focus();
    }}>
      <Logo onHome={() => { setOpen(false); setActive("home"); }} />

      <button
        className="menu"
        ref={menuRef}
        aria-controls="site-navigation"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav id="site-navigation" ref={navRef} className={open ? "open" : ""}>
        {navIds.map((id, index) => (
          <button
            key={id}
            className={activeNav === id ? "active" : ""}
            aria-current={activeNav === id ? "page" : undefined}
            onClick={() => {
              setActive(id);
              setOpen(false);
              if (open) menuRef.current?.focus();
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
            aria-label={t.languageLabel}
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.flag} {language.short}
              </option>
            ))}
          </select>
        </label>

        <AuthStatus lang={lang} />
      </div>
    </header>
  );
}
