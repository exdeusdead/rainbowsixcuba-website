import { Menu, X, Disc3 } from 'lucide-react';
import { useState } from 'react';
import { CommunityMark } from '../assets/logos/CommunityMark';
import { navItems } from '../data/siteData';

export function Navbar({ path, navigate, config }) {
  const [open, setOpen] = useState(false);
  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => go('/')} aria-label="Rainbow Six CUBA inicio">
        <CommunityMark small />
        <span><b>RAINBOW SIX</b><strong>CUBA</strong></span>
      </button>

      <nav className={open ? 'nav-links nav-links--open' : 'nav-links'}>
        {navItems.map((item) => (
          <button key={item.path} className={path === item.path ? 'active' : ''} onClick={() => go(item.path)}>
            {item.label}
          </button>
        ))}
      </nav>

      <a className="discord-button nav-discord" href={config.discord} target="_blank" rel="noreferrer">
        <Disc3 size={18} /> Discord
      </a>

      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Abrir menú">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
