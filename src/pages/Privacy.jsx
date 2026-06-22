import React from "react";
import { LockKeyhole, ShieldCheck, EyeOff } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

export function Privacy() {
  return (
    <section className="inner-page">
      <SectionHeader
        eyebrow="Privacidad"
        title="Confianza antes que crecimiento."
        text="Rainbow Six CUBA busca manejar información comunitaria con límites claros, transparencia y respeto por los miembros."
      />
      <div className="info-grid">
        <article className="info-panel"><LockKeyhole /><h3>Datos personales</h3><p>La información sensible no debe exponerse públicamente sin una razón clara y una política definida.</p></article>
        <article className="info-panel"><ShieldCheck /><h3>Verificación</h3><p>Los procesos de verificación deben ser explicados a la comunidad y usados con intención comunitaria.</p></article>
        <article className="info-panel"><EyeOff /><h3>Transparencia</h3><p>Los datos públicos deben ser agregados o comunitarios, evitando exposición innecesaria de información individual.</p></article>
      </div>
      <div className="text-panel reveal">
        <h2>Política en desarrollo</h2>
        <p>Esta página funcionará como base pública para explicar cómo se recopila, protege y utiliza la información dentro del ecosistema de Rainbow Six CUBA.</p>
      </div>
    </section>
  );
}

