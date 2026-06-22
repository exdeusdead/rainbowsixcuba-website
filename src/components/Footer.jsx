import { BrandMark } from './BrandMark';

export function Footer({ navigate, config }) {
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="footer-brand">
          <BrandMark />
          <div><strong>{config.communityName}</strong><span>{config.tagline}</span></div>
        </div>
        <div className="footer-links">
          <button onClick={() => navigate('/privacy')}>Privacidad</button>
          <button onClick={() => navigate('/terms')}>Términos</button>
          <a href={config.discord} target="_blank" rel="noreferrer">Discord</a>
        </div>
      </div>
      <p className="copyright">© 2026 Rainbow Six CUBA. Proyecto comunitario independiente.</p>
    </footer>
  );
}
