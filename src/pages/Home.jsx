import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SectionHeader } from '../components/SectionHeader';
import { DiscordCTA } from '../components/DiscordCTA';
import { futureAreas, objectives, pillars } from '../data/siteData';

export function Home({ config, navigate }) {
  return (
    <>
      <Hero config={config} navigate={navigate} />

      <section className="content-section compact">
        <SectionHeader
          eyebrow="Objetivo"
          title="Construir una comunidad seria, visible y conectada."
          text="Rainbow Six CUBA existe para reunir jugadores cubanos de Rainbow Six Siege en un espacio organizado, respetuoso y con visión de crecimiento."
        />
        <div className="objective-list reveal">
          {objectives.map((item) => <div key={item}>{item}</div>)}
        </div>
      </section>

      <section className="content-section">
        <div className="card-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="feature-card reveal" key={title}>
              <Icon className="card-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <DiscordCTA config={config} />

      <section className="content-section">
        <SectionHeader
          eyebrow="Próximamente"
          title="Una base preparada para crecer."
          text="Hoy el foco es Discord, eventos y confianza. Mañana esta misma plataforma podrá albergar más áreas de la comunidad sin mezclarla con la extensión."
        />
        <div className="future-grid">
          {futureAreas.map(({ icon: Icon, title, text }) => (
            <article className="future-card reveal" key={title}>
              <div><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span>Coming Soon</span>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta reveal">
        <h2>Forma parte de Rainbow Six CUBA</h2>
        <p>Jugadores casuales, ranked players, competidores, coaches, managers y miembros que quieran apoyar el crecimiento de la comunidad son bienvenidos.</p>
        <button className="secondary-cta" onClick={() => navigate('/community')}>Ver comunidad <ArrowRight size={18} /></button>
      </section>
    </>
  );
}
import React from "react";
