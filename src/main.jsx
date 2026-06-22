import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  ChevronRight,
  Shield,
  Users,
  LockKeyhole,
  Radio,
  Crosshair,
  PackageOpen,
  Handshake,
  Trophy,
  MessageCircle,
  Gamepad2,
  Sparkles,
  Globe2,
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import './styles.css';

const heroSlides = [
  {
    id: 'capitolio',
    image: '/assets/backgrounds/hero-capitolio.png',
    eyebrow: 'Comunidad competitiva cubana',
    title: 'Rainbow Six CUBA',
    subtitle: 'La comunidad cubana de Rainbow Six Siege.',
    description: 'Conectamos jugadores dentro y fuera de Cuba para competir, colaborar y crecer juntos como comunidad.',
    tag: 'La Habana',
    meta: 'Unidos somos más fuertes',
    icon: Shield
  },
  {
    id: 'drop',
    image: '/assets/backgrounds/hero-drop.png',
    eyebrow: 'Recursos y estrategia',
    title: 'Drop comunitario',
    subtitle: 'Herramientas, eventos y oportunidades.',
    description: 'Creamos espacios para compartir información, coordinar actividades y apoyar el crecimiento competitivo.',
    tag: 'Drop estratégico',
    meta: 'Recursos que marcan diferencia',
    icon: PackageOpen
  },
  {
    id: 'malecon',
    image: '/assets/backgrounds/hero-operations.png',
    eyebrow: 'Juego en equipo',
    title: 'Competir juntos',
    subtitle: 'Eventos, scrims y desarrollo.',
    description: 'Rainbow Six CUBA existe para organizar jugadores, equipos, coaches y miembros activos de la comunidad.',
    tag: 'Malecón',
    meta: 'Disciplina. Coordinación. Comunidad.',
    icon: Crosshair
  },
  {
    id: 'habana-vieja',
    image: '/assets/backgrounds/hero-habana-vieja.png',
    eyebrow: 'Identidad comunitaria',
    title: 'Representar sin dividir',
    subtitle: 'Una comunidad 100% apolítica.',
    description: 'Toda referencia visual es ficticia, inspirada en el ambiente del juego y enfocada exclusivamente en la comunidad gamer.',
    tag: 'Operaciones',
    meta: 'Respeto, juego y crecimiento',
    icon: Handshake
  }
];

const featureCards = [
  {
    icon: Users,
    title: 'Comunidad',
    text: 'Un espacio para jugadores cubanos de Rainbow Six Siege. Conecta, comparte y crece.',
    color: 'blue'
  },
  {
    icon: CalendarDays,
    title: 'Eventos',
    text: 'Scrims, torneos, actividades y encuentros organizados para fortalecer la comunidad.',
    color: 'red'
  },
  {
    icon: Trophy,
    title: 'Competitivo',
    text: 'Base para equipos, reclutamiento, ligas internas y desarrollo competitivo.',
    color: 'gold'
  },
  {
    icon: LockKeyhole,
    title: 'Privacidad',
    text: 'Procesos claros, datos protegidos y transparencia con cada miembro.',
    color: 'purple'
  }
];

const statItems = [
  { icon: Users, label: 'Jugadores activos', value: 'Todos los días' },
  { icon: CalendarDays, label: 'Eventos comunitarios', value: 'Scrims y torneos' },
  { icon: Handshake, label: 'Comunidad unida', value: 'Dentro y fuera de Cuba' },
  { icon: Globe2, label: 'Crecimiento constante', value: 'Desarrollo competitivo' }
];

const pages = {
  inicio: {
    title: 'Inicio',
    eyebrow: 'Rainbow Six CUBA',
    body: 'El punto de encuentro para jugadores cubanos de Rainbow Six Siege. Discord es el epicentro de la comunidad y el website funciona como identidad pública, anuncio de eventos y punto de acceso seguro.'
  },
  comunidad: {
    title: 'Comunidad',
    eyebrow: 'Conexión real',
    body: 'Rainbow Six CUBA reúne jugadores casuales, ranked, competitivos, coaches, managers y miembros que quieren apoyar el crecimiento del ecosistema cubano de Rainbow Six Siege.'
  },
  eventos: {
    title: 'Eventos',
    eyebrow: 'Actividad comunitaria',
    body: 'La comunidad se prepara para scrims, torneos internos, sesiones de coaching, actividades especiales y eventos diseñados para crear oportunidades dentro del Discord.'
  },
  privacidad: {
    title: 'Privacidad',
    eyebrow: 'Transparencia primero',
    body: 'Toda información comunitaria será manejada con claridad. La información sensible no será publicada sin consentimiento y cualquier sistema de estadísticas o verificación será explicado de forma transparente.'
  }
};

function LogoMark() {
  return (
    <div className="logo-mark" aria-label="Rainbow Six CUBA logo">
      <div className="logo-orb">
        <span className="flag-slice red" />
        <span className="flag-slice blue" />
        <strong>6</strong>
      </div>
      <div className="logo-text">
        <span>Rainbow Six</span>
        <b>CUBA</b>
      </div>
    </div>
  );
}

function AnimatedIcon({ children, tone = 'red' }) {
  return <div className={`animated-icon ${tone}`}>{children}<span /></div>;
}

function App() {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const activeSlide = heroSlides[active];
  const ActiveIcon = activeSlide.icon;

  const heroStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(90deg, rgba(4,6,12,.95) 0%, rgba(5,7,13,.72) 38%, rgba(5,7,13,.28) 72%, rgba(4,6,12,.8) 100%), url(${activeSlide.image})`
  }), [activeSlide.image]);

  const navItems = ['inicio', 'comunidad', 'eventos', 'privacidad'];

  const handlePage = (key) => {
    setPage(key);
    setMenuOpen(false);
    document.getElementById('section-info')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="site-shell">
      <header className="nav-bar">
        <LogoMark />
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <button key={item} className={page === item ? 'active' : ''} onClick={() => handlePage(item)}>
              {pages[item].title}
            </button>
          ))}
          <a className="discord-nav" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Discord
          </a>
        </nav>
      </header>

      <section className="hero" style={heroStyle}>
        <div className="hero-noise" />
        <div className="hero-scanlines" />
        <div className="hero-content">
          <div className="hero-copy fade-in" key={activeSlide.id}>
            <div className="eyebrow"><Shield size={16} /> {activeSlide.eyebrow}</div>
            <h1><span>Rainbow Six</span><b>CUBA</b></h1>
            <h2>{activeSlide.subtitle}</h2>
            <p>{activeSlide.description}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
                <AnimatedIcon tone="white"><MessageCircle size={18} /></AnimatedIcon>
                Unirse al Discord
              </a>
              <button className="btn btn-secondary" onClick={() => handlePage('comunidad')}>
                Conocer la comunidad <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <aside className="hero-side-card">
            <AnimatedIcon tone="red"><ActiveIcon size={28} /></AnimatedIcon>
            <span>{activeSlide.tag}</span>
            <p>{activeSlide.meta}</p>
          </aside>
        </div>

        <div className="slide-controls" aria-label="Cambiar escena">
          {heroSlides.map((slide, index) => (
            <button key={slide.id} className={index === active ? 'active' : ''} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="stats-strip">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="stat-item" key={item.label}>
              <AnimatedIcon tone="red"><Icon size={24} /></AnimatedIcon>
              <div>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="cinematic-gallery">
        {heroSlides.map((slide, index) => (
          <button key={slide.id} className={`gallery-card ${index === active ? 'active' : ''}`} onClick={() => setActive(index)}>
            <img src={slide.image} alt={slide.tag} />
            <div>
              <strong>{slide.tag}</strong>
              <span>{slide.meta}</span>
            </div>
          </button>
        ))}
      </section>

      <section className="feature-grid">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className={`feature-card ${card.color}`} key={card.title}>
              <AnimatedIcon tone={card.color}><Icon size={34} /></AnimatedIcon>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ChevronRight className="card-arrow" size={22} />
            </article>
          );
        })}
      </section>

      <section id="section-info" className="info-panel">
        <div>
          <span className="section-eyebrow">{pages[page].eyebrow}</span>
          <h2>{pages[page].title}</h2>
          <p>{pages[page].body}</p>
        </div>
        <div className="discord-box">
          <AnimatedIcon tone="purple"><Gamepad2 size={32} /></AnimatedIcon>
          <h3>Discord es el centro de la comunidad</h3>
          <p>Canales de juego, eventos, anuncios, verificación, tickets y espacios para conectar con otros jugadores.</p>
          <a className="btn btn-primary" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
            Entrar al Discord <ChevronRight size={18} />
          </a>
        </div>
      </section>

      <section className="notice-panel">
        <AlertTriangle size={22} />
        <div>
          <h3>Aviso importante</h3>
          <p>
            Rainbow Six CUBA es una comunidad independiente, apolítica y creada exclusivamente con fines de juego, entretenimiento y organización comunitaria. Toda imagen, escena, emblema, uniforme o referencia visual usada en este website es ficticia y ambientada únicamente en un contexto gamer inspirado por Rainbow Six Siege. No representa, promueve ni respalda ninguna ideología, partido, gobierno, movimiento político, acción real o entidad oficial.
          </p>
          <p>
            Rainbow Six CUBA no está afiliada, asociada, autorizada ni respaldada por Ubisoft ni por Tom Clancy's Rainbow Six Siege. Todas las marcas pertenecen a sus respectivos propietarios.
          </p>
        </div>
      </section>

      <footer className="footer">
        <LogoMark />
        <div className="footer-links">
          <button onClick={() => handlePage('privacidad')}>Privacidad</button>
          <button onClick={() => handlePage('eventos')}>Eventos</button>
          <a href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">Discord</a>
        </div>
        <p>© 2026 Rainbow Six CUBA. Comunidad independiente.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
