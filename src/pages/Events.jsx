import { SectionHeader } from '../components/SectionHeader';

export function Events({ config }) {
  return (
    <section className="content-page page-fade">
      <SectionHeader eyebrow="Eventos" title="Eventos comunitarios">
        Esta sección servirá como base para anunciar scrims, actividades especiales, torneos comunitarios y reuniones importantes.
      </SectionHeader>
      <div className="timeline">
        <div><span>01</span><h3>Scrims comunitarios</h3><p>Espacios para práctica, coordinación y crecimiento competitivo.</p></div>
        <div><span>02</span><h3>Actividades especiales</h3><p>Eventos internos para fortalecer participación y presencia comunitaria.</p></div>
        <div><span>03</span><h3>Anuncios importantes</h3><p>Actualizaciones oficiales del proyecto y novedades de la comunidad.</p></div>
      </div>
      <a className="btn primary center-btn" href={config.discord} target="_blank" rel="noreferrer">Ver eventos en Discord</a>
    </section>
  );
}
