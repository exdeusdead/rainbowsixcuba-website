import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { BrandMark } from './BrandMark';

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Comunidad', to: '/community' },
  { label: 'Eventos', to: '/events' },
  { label: 'Privacidad', to: '/privacy' }
];

export function Navbar({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const go = (to) => { navigate(to); setOpen(false); };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => go('/')} aria-label="Ir al inicio">
        <BrandMark />
        <span><strong>Rainbow Six</strong><b>CUBA</b></span>
      </button>

      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(link => (
          <button key={link.to} className={path === link.to ? 'active' : ''} onClick={() => go(link.to)}>
            {link.label}
          </button>
        ))}
        <a className="discord-top" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">Discord</a>
      </nav>

      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menú">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}
