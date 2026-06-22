import { CalendarDays, ShieldCheck, Users, Lock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

export function Home({ navigate, config }) {
  return (
    <div className="home page-fade">
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-noise"></div>
        <div className="hero-content">
          <p className="eyebrow">Comunidad · Discord · Eventos</p>
          <h1>Rainbow Six <span>CUBA</span></h1>
          <h3>{config.tagline}</h3>
          <p>Conectamos jugadores cubanos dentro y fuera de Cuba para competir, colaborar y crecer juntos como comunidad.</p>
          <div className="hero-actions">
            <a className="btn primary" href={config.discord} target="_blank" rel="noreferrer">Unirse al Discord <ArrowRight size={18} /></a>
            <button className="btn ghost" onClick={() => navigate('/community')}>Conoce la comunidad</button>
          </div>
        </div>
        <aside className="hero-panel">
          <span>Unidos somos más fuertes</span>
        </aside>
      </section>

      <section className="feature-grid">
        <button className="feature-card" onClick={() => navigate('/community')}>
          <Users /><h3>Comunidad</h3><p>Un espacio para jugadores cubanos de Rainbow Six Siege.</p>
        </button>
        <button className="feature-card" onClick={() => navigate('/events')}>
          <CalendarDays /><h3>Eventos</h3><p>Scrims, actividades, anuncios y oportunidades comunitarias.</p>
        </button>
        <button className="feature-card" onClick={() => navigate('/privacy')}>
          <ShieldCheck /><h3>Transparencia</h3><p>Reglas claras, procesos responsables y confianza comunitaria.</p>
        </button>
        <button className="feature-card" onClick={() => navigate('/privacy')}>
          <Lock /><h3>Privacidad</h3><p>Protección de información personal y uso responsable de datos.</p>
        </button>
      </section>

      <section className="split-section">
        <div>
          <SectionHeader eyebrow="Epicentro comunitario" title="El Discord es el corazón de Rainbow Six CUBA">
            La actividad principal ocurre en nuestro servidor: anuncios, verificación, eventos, búsqueda de jugadores, comunicación y organización comunitaria.
          </SectionHeader>
          <a className="btn primary" href={config.discord} target="_blank" rel="noreferrer">Entrar al Discord</a>
        </div>
        <div className="discord-card">
          <div className="discord-orb">☁</div>
          <h3>Comunidad activa</h3>
          <p>Diseñado para crecer con canales, roles, eventos y sistemas comunitarios.</p>
        </div>
      </section>
    </div>
  );
}
