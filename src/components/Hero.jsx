import React from "react";
import { ArrowRight, Disc3, Shield } from 'lucide-react';
import { CommunityMark } from '../assets/logos/CommunityMark';

export function Hero({ config, navigate }) {
  return (
    <section className="hero">
      <div className="ambient ambient--red" />
      <div className="ambient ambient--blue" />
      <div className="hero-grid" />
      <div className="flag-sweep" />

      <div className="hero-content reveal">
        <div className="hero-badge"><Shield size={16} /> Comunidad competitiva cubana</div>
        <h1><span>RAINBOW SIX</span><strong>CUBA</strong></h1>
        <p className="hero-lead">{config.tagline}</p>
        <p className="hero-copy">Conectamos jugadores dentro y fuera de Cuba para competir, colaborar y crecer juntos como comunidad.</p>
        <div className="hero-actions">
          <a className="primary-cta" href={config.discord} target="_blank" rel="noreferrer"><Disc3 size={19} /> Unirse al Discord</a>
          <button className="secondary-cta" onClick={() => navigate('/community')}>Conocer la comunidad <ArrowRight size={18} /></button>
        </div>
      </div>

      <div className="hero-emblem reveal reveal-delay">
        <CommunityMark />
        <p>UNIDOS SOMOS MÁS FUERTES</p>
      </div>
    </section>
  );
}

