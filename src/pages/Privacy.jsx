import { SectionHeader } from '../components/SectionHeader';

export function Privacy() {
  return (
    <section className="content-page page-fade legal">
      <SectionHeader eyebrow="Privacidad" title="Privacidad y transparencia">
        Rainbow Six CUBA busca manejar la información comunitaria con responsabilidad, claridad y respeto.
      </SectionHeader>
      <h3>Uso de información</h3>
      <p>La información solicitada dentro de la comunidad será utilizada para procesos internos de verificación, organización, eventos y participación comunitaria.</p>
      <h3>Información pública</h3>
      <p>Solo se mostrará públicamente información comunitaria no sensible, como métricas generales, participación, estadísticas agregadas o datos autorizados por el usuario.</p>
      <h3>Información privada</h3>
      <p>Datos personales o sensibles no serán publicados sin autorización y estarán limitados a procesos necesarios dentro de la comunidad.</p>
      <h3>Transparencia</h3>
      <p>Cualquier sistema nuevo relacionado con datos, verificación, estadísticas o participación será comunicado de forma clara a los miembros.</p>
    </section>
  );
}
