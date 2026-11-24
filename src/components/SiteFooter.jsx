import React from "react";
import {
  Activity,
  Ban,
  Flag,
  LockKeyhole,
  Shield,
  TrendingUp,
  Users
} from "lucide-react";
import { withLang } from "../i18n";

export function Values({ t }) {
  const icons = [Users, Shield, TrendingUp, Flag, Ban];
  const values = t.values;

  return (
    <section className="values">
      {values.map(([title, text], index) => {
        const Icon = icons[index] || Activity;

        return (
          <div key={title}>
            <Icon size={30} />
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        );
      })}
    </section>
  );
}

export function Notice({ t }) {
  return (
    <section className="notice">
      <LockKeyhole size={28} />
      <p>{t.legal}</p>
    </section>
  );
}

export default function Footer({ t, lang }) {
  return (
    <footer>
      <p>© 2026 Rainbow Six CUBA. {t.footer}</p>

      <nav>
        <a href={withLang("/plans.html", lang)}>
          {lang === "es" ? "Vistas del producto" : "Product views"}
        </a>
        <a href={withLang("/companion/", lang)}>Companion</a>
        <a href={withLang("/privacy", lang)}>
          {lang === "es" ? "Privacidad" : "Privacy"}
        </a>
        <a href={withLang("/support", lang)}>
          {lang === "es" ? "Soporte" : "Support"}
        </a>
      </nav>
    </footer>
  );
}
