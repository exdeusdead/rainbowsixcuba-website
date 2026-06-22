import { CalendarDays, Swords, Trophy, Users } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

export function Events({ config }) {
  const events = [
    { icon: Swords, title: 'Scrims comunitarios', text: 'Espacios para practicar, organizar equipos y medir progreso.' },
    { icon: Trophy, title: 'Torneos', text: 'Eventos competitivos futuros para impulsar la participación.' },
    { icon: Users, title: 'Actividades', text: 'Dinámicas para mantener viva y conectada a la comunidad.' }
  ];

  return (
    <section className="inner-page">
      <SectionHeader
        eyebrow="Eventos"
        title="Actividades diseñadas para mover la comunidad."
        text="La plataforma queda lista para publicar eventos sin prometer fechas específicas antes de tiempo."
      />
      <div className="info-grid">
        {events.map(({ icon: Icon, title, text }) => (
          <article className="info-panel" key={title}><Icon /><h3>{title}</h3><p>{text}</p><span className="status-pill">En desarrollo</span></article>
        ))}
      </div>
      <div className="calendar-strip reveal">
        <CalendarDays />
        <div>
          <h3>Calendario comunitario</h3>
          <p>Los próximos eventos serán anunciados primero en Discord y luego publicados aquí.</p>
        </div>
        <a className="secondary-cta" href={config.discord} target="_blank" rel="noreferrer">Ver Discord</a>
      </div>
    </section>
  );
}
