import React from "react";
import { FileText, ShieldAlert } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

export function Terms() {
  return (
    <section className="inner-page">
      <SectionHeader
        eyebrow="Términos"
        title="Reglas claras para una comunidad organizada."
        text="Esta página establece una base inicial para el uso del website y la participación comunitaria."
      />
      <div className="text-panel reveal">
        <FileText />
        <h2>Proyecto comunitario independiente</h2>
        <p>Rainbow Six CUBA es un proyecto comunitario independiente. No representa oficialmente a Ubisoft ni a ninguna entidad gubernamental.</p>
      </div>
      <div className="text-panel reveal">
        <ShieldAlert />
        <h2>Uso responsable</h2>
        <p>El acceso a eventos, herramientas y espacios comunitarios puede estar sujeto a reglas internas, verificación, moderación y criterios de participación.</p>
      </div>
    </section>
  );
}

