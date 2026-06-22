import { Users, CalendarDays, ShieldCheck, LockKeyhole, Trophy, Radio, MapPinned, Sparkles } from 'lucide-react';

export const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Comunidad', path: '/community' },
  { label: 'Eventos', path: '/events' },
  { label: 'Privacidad', path: '/privacy' }
];

export const pillars = [
  {
    icon: Users,
    title: 'Comunidad',
    text: 'Un punto de encuentro para jugadores cubanos dentro y fuera de Cuba.'
  },
  {
    icon: CalendarDays,
    title: 'Eventos',
    text: 'Scrims, actividades comunitarias y espacios competitivos en desarrollo.'
  },
  {
    icon: ShieldCheck,
    title: 'Transparencia',
    text: 'Procesos claros, reglas visibles y comunicación directa con la comunidad.'
  },
  {
    icon: LockKeyhole,
    title: 'Privacidad',
    text: 'La información personal debe protegerse con intención, límites y respeto.'
  }
];

export const objectives = [
  'Conectar jugadores cubanos de Rainbow Six Siege.',
  'Crear una estructura comunitaria seria y organizada.',
  'Impulsar eventos, scrims y oportunidades competitivas.',
  'Mantener procesos transparentes y no invasivos.'
];

export const futureAreas = [
  { icon: Trophy, title: 'Rankings', text: 'Clasificaciones comunitarias y datos competitivos.' },
  { icon: Users, title: 'Equipos', text: 'Directorios para proyectos competitivos.' },
  { icon: Radio, title: 'Noticias', text: 'Anuncios, cambios y novedades del ecosistema.' },
  { icon: MapPinned, title: 'Presencia global', text: 'Miembros dentro y fuera de Cuba conectados en un mismo espacio.' },
  { icon: Sparkles, title: 'Contenido', text: 'Espacios futuros para creadores, eventos y promoción comunitaria.' }
];
