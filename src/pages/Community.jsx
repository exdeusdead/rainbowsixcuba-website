import { SectionHeader } from '../components/SectionHeader';

export function Community({ config }) {
  return (
    <section className="content-page page-fade">
      <SectionHeader eyebrow="Comunidad" title="Objetivos de Rainbow Six CUBA">
        Crear un punto de encuentro organizado para jugadores cubanos de Rainbow Six Siege dentro y fuera de Cuba.
      </SectionHeader>
      <div className="info-grid">
        <article><h3>Conectar jugadores</h3><p>Facilitar que miembros de la comunidad se encuentren, jueguen y compartan experiencias.</p></article>
        <article><h3>Impulsar participación</h3><p>Promover eventos, actividades y espacios de integración para mantener la comunidad viva.</p></article>
        <article><h3>Organización</h3><p>Construir una estructura clara con roles, reglas, canales y procesos comunitarios.</p></article>
        <article><h3>Crecimiento</h3><p>Preparar una base sólida para futuras herramientas, páginas y recursos de la comunidad.</p></article>
      </div>
      <a className="btn primary center-btn" href={config.discord} target="_blank" rel="noreferrer">Unirse al Discord</a>
    </section>
  );
}
