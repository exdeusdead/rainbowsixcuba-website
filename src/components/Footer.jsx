import { Disc3 } from 'lucide-react';
import { CommunityMark } from '../assets/logos/CommunityMark';

export function Footer({ navigate, config }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <CommunityMark small />
        <div>
          <strong>Rainbow Six CUBA</strong>
          <p>La comunidad cubana de Rainbow Six Siege.</p>
        </div>
      </div>
      <div className="footer-links">
        <button onClick={() => navigate('/privacy')}>Privacidad</button>
        <button onClick={() => navigate('/terms')}>Términos</button>
        <a href={config.discord} target="_blank" rel="noreferrer"><Disc3 size={16} /> Discord</a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Rainbow Six CUBA. Proyecto comunitario independiente.</p>
    </footer>
  );
}
import React from "react";
