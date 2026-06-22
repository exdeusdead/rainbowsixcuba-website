import React from "react";
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
import './styles/global.css';

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

  useEffect(() => {
    document.title = path === '/' ? 'Rainbow Six CUBA' : `Rainbow Six CUBA | ${path.replace('/', '').toUpperCase()}`;
  }, [path]);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Page = routes[path] || Home;

  return (
    <div className="site-root">
      <Navbar path={path} navigate={navigate} config={SITE_CONFIG} />
      <main>
        <Page navigate={navigate} config={SITE_CONFIG} />
      </main>
      <Footer navigate={navigate} config={SITE_CONFIG} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

