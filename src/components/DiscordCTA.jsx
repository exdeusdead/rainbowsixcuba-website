import { ArrowRight, Disc3 } from 'lucide-react';

export function DiscordCTA({ config }) {
  return (
    <section className="discord-panel reveal">
      <div className="squad-silhouette"><span /><span /><span /></div>
      <div>
        <span className="eyebrow">Epicentro comunitario</span>
        <h2>Únete a nuestro Discord</h2>
        <p>El servidor es el corazón de Rainbow Six CUBA: jugadores, equipos, eventos, anuncios, verificación y crecimiento comunitario en un solo lugar.</p>
      </div>
      <a href={config.discord} target="_blank" rel="noreferrer" className="primary-cta"><Disc3 size={19} /> Entrar al Discord <ArrowRight size={18} /></a>
    </section>
  );
}
