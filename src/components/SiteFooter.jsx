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

      <nav aria-label={lang === "es" ? "Enlaces del producto" : "Product links"}>
        <a href={withLang("/plans.html", lang)}>
          {lang === "es" ? "Vistas del producto" : "Product views"}
        </a>
        <a href={withLang("/companion.html", lang)}>Companion</a>
        <a href={withLang("/privacy", lang)}>
          {lang === "es" ? "Privacidad" : "Privacy"}
        </a>
        <a href={withLang("/cookies", lang)}>
          {lang === "es" ? "Cookies y almacenamiento" : "Cookies & storage"}
        </a>
        <a href={withLang("/terms", lang)}>
          {lang === "es" ? "Términos y límites" : "Terms & demo limits"}
        </a>
        <a href={withLang("/accessibility", lang)}>
          {lang === "es" ? "Accesibilidad" : "Accessibility"}
        </a>
        <a href={withLang("/support", lang)}>
          {lang === "es" ? "Soporte" : "Support"}
        </a>
      </nav>
    </footer>
  );
}
