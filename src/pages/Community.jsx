import { Disc3, Users, ShieldCheck, Target } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { DiscordCTA } from '../components/DiscordCTA';

export function Community({ config }) {
  return (
    <section className="inner-page">
      <SectionHeader
        eyebrow="Comunidad"
        title="Un espacio para conectar, jugar y crecer."
        text="Rainbow Six CUBA no nace como una página de estadísticas. Nace como una comunidad organizada alrededor de Discord."
      />
      <div className="info-grid">
        <article className="info-panel"><Users /><h3>Jugadores</h3><p>Espacios para encontrar otros jugadores, hacer equipo, jugar ranked, casual o participar en iniciativas comunitarias.</p></article>
        <article className="info-panel"><Target /><h3>Competitivo</h3><p>Base para scrims, equipos, roles, coaches y actividades que ayuden a elevar el nivel de la comunidad.</p></article>
        <article className="info-panel"><ShieldCheck /><h3>Respeto</h3><p>Reglas claras para mantener un ambiente sano, organizado y enfocado en el crecimiento.</p></article>
      </div>
      <div className="text-panel reveal">
        <h2>Discord es el centro</h2>
        <p>La participación principal ocurre dentro del servidor de Discord. Desde allí se manejarán anuncios, eventos, verificación, reportes y coordinación comunitaria.</p>
        <a className="primary-cta" href={config.discord} target="_blank" rel="noreferrer"><Disc3 size={18} /> Entrar al Discord</a>
      </div>
      <DiscordCTA config={config} />
    </section>
  );
}
