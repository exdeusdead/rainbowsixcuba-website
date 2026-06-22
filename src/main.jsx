import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SITE_CONFIG } from './config/siteConfig';
import { Home } from './pages/Home';
import { Community } from './pages/Community';
import { Events } from './pages/Events';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import './styles.css';

const routes = {
  '/': Home,
  '/community': Community,
  '/events': Events,
  '/privacy': Privacy,
  '/terms': Terms
};

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Page = routes[path] || Home;

  return (
    <>
      <Navbar path={path} navigate={navigate} />
      <main className="page-shell">
        <Page navigate={navigate} config={SITE_CONFIG} />
      </main>
      <Footer navigate={navigate} config={SITE_CONFIG} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
