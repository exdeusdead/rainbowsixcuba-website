import { SectionHeader } from '../components/SectionHeader';

export function Terms() {
  return (
    <section className="content-page page-fade legal">
      <SectionHeader eyebrow="Términos" title="Términos básicos de uso">
        Rainbow Six CUBA es un proyecto comunitario independiente en desarrollo.
      </SectionHeader>
      <h3>Respeto comunitario</h3><p>La participación requiere respeto hacia otros miembros, moderadores y procesos establecidos.</p>
      <h3>Proyecto independiente</h3><p>Rainbow Six CUBA no representa oficialmente a Ubisoft, Rainbow Six Siege ni entidades gubernamentales.</p>
      <h3>Cambios futuros</h3><p>Estos términos podrán actualizarse según crezca la comunidad y se añadan nuevas funciones.</p>
    </section>
  );
}
