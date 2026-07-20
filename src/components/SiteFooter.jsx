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

export function Values() {
  const icons = [Users, Shield, TrendingUp, Flag, Ban];

  const values = [
    ["Comunidad activa", "Perfiles conectados en crecimiento"],
    ["Competición justa", "Reglas claras y anti-toxicidad"],
    ["Crecimiento constante", "Proyectos y herramientas reales"],
    ["Orgullo cubano", "Unidos por Rainbow Six"],
    ["100% apolítico", "Solo juego, respeto y comunidad"]
  ];

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

export default function Footer({ t }) {
  return (
    <footer>
      <p>© 2026 Rainbow Six CUBA. {t.footer}</p>

      <nav>
        <a href="/companion/">Companion</a>
        <a href="/companion/privacy_policy.html">Privacy</a>
        <a href="/companion/support.html">Support</a>
      </nav>
    </footer>
  );
}
