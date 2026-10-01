import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Users, CalendarDays, Trophy, BarChart3, GraduationCap, BadgeCheck, HeartHandshake, PackageOpen, Puzzle, Swords, Search, Filter, Table2, LineChart, UserRound, Image as ImageIcon } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import './styles.css';
import AuthCallback from './auth/AuthCallback.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Modules from './components/Modules.jsx';
import Footer, { Notice, Values } from './components/SiteFooter.jsx';
import AccountPanel from './account/AccountPanel.jsx';
import PlayerProfile from './player/PlayerProfile.jsx';
import StatisticsPanel from './features/statistics/StatisticsPanel.jsx';

const LANG_KEY = SITE_CONFIG.languageStorageKey || 'r6cuba-language';
const SECTION_KEY = 'r6cuba-active-section';
const IM = '/assets/backgrounds/';
const LANGUAGES = [
  { code: 'es', short: 'ES', flag: '🇨🇺' }, { code: 'en', short: 'EN', flag: '🇺🇸' },
  { code: 'fr', short: 'FR', flag: '🇫🇷' }, { code: 'de', short: 'DE', flag: '🇩🇪' },
  { code: 'zh', short: '中文', flag: '🇨🇳' }, { code: 'ja', short: '日本語', flag: '🇯🇵' }
];

const DATA = {
  es: {
    nav: ['Inicio','Comunidad','Eventos','Competitivo','Estadísticas','Coaching','Alianzas','Colaboradores','En Progreso'],
    badge: 'Centro operativo comunitario', title: ['RAINBOW','SIX','CUBA'], subtitle: 'La comunidad cubana de Rainbow Six Siege.',
    body: 'Coordinamos jugadores, equipos, coaches y colaboradores dentro y fuera de Cuba para competir, organizarnos y crecer como una comunidad seria.',
    join:'Únete al Discord', explore:'Explorar comunidad', view:'Ver más', reset:'Inicio', beta:'Sistema en desarrollo',
    moduleLabel:'Módulo activo', openModule:'Abrir módulo', closePanel:'Cerrar panel',
    modules: {
      community:['Comunidad','Conexión, actividad y crecimiento para jugadores cubanos dentro y fuera de Cuba.','Centro para miembros, equipos, staff, colaboradores y futuras métricas comunitarias.'],
      events:['Eventos','Scrims, torneos, cups y actividades organizadas para fortalecer la escena.','Calendarios, convocatorias, resultados y reglas comunitarias vivirán aquí.'],
      competitive:['Competitivo','Equipos, ligas, rankings y preparación para competir mejor.','Base para reclutamiento, equipos, ligas internas y desarrollo competitivo.'],
      statistics:['Estadísticas','Hub competitivo con scoreboard, perfiles, rankings y visualización pública.','No es Companion. Companion conecta jugadores; Estadísticas muestra el impacto competitivo.'],
      coaches:['Coaching','Entrenamiento, estrategia y desarrollo competitivo para jugadores y equipos.','Aula táctica, análisis, práctica y guía para convertir preparación en rendimiento real.'],
      partners:['Alianzas','Organizaciones, streamers y patrocinadores verificados que fortalecen el ecosistema.','Alianzas confiables, cooperación estratégica y continuidad para el crecimiento comunitario.'],
      collaborators:['Colaboradores','Ninguna comunidad crece sola. Apoyo, alianzas y cooperación internacional.','Voluntarios, staff, creadores y aliados que ayudan detrás de escena.'],
      incoming:['En Progreso','Infraestructura, herramientas y módulos actualmente en desarrollo.','El futuro de Rainbow Six CUBA se construye por fases: sistemas, eventos, datos, recursos y nuevas experiencias.'],
      companion:['Companion Extension','Herramienta para conectar jugadores al ecosistema de estadísticas.','La extensión sincroniza datos; el website y Discord los presentan con mejor visual.']
    },
    stats:{
      title:'Scoreboard competitivo', subtitle:'Datos beta preparados para tabla pública, filtros, progresión y render visual para Discord.',
      tabs:['Scoreboard','Jugadores','Operadores','Mapas','Temporadas','Discord Render','Companion'], search:'Buscar jugador, equipo o región', rank:'Rango', region:'Región', team:'Equipo', rows:'Filas', all:'Todos', clear:'Limpiar', showing:'Mostrando', of:'de', players:'perfiles',
      headers:['#','Jugador','Ubisoft','Rango','RP','KD','WR','Región','Equipo','Actualizado'],
      progressHeaders:['Jugador','RP Δ','KD Δ','WR Δ','Rank Δ','Última sincronización'],
      cards:['Perfil conectado','Ranked Beta','API lista','Render Discord'],
      profileTitle:'Perfil conectado', profileCopy:'Muestra real del flujo inicial. Cuando nuevos jugadores conecten sus cuentas, se añaden al scoreboard sin cambiar el diseño.',
      renderTitle:'Visual para Discord', renderCopy:'El mismo dataset podrá renderizarse como imagen estilo scoreboard para canales de Discord, evitando tablas de texto simples.',
      note:'Companion funcionará como entrada de datos. Esta pantalla es el hub competitivo público.', noData:'No hay resultados con esos filtros.', verified:'Verificado'
    },
    legal:'Rainbow Six CUBA es una comunidad independiente de fans y no está afiliada, asociada, autorizada ni respaldada por Ubisoft o Tom Clancy’s Rainbow Six Siege. Todo el contenido visual, nombres y referencias son ficticios y utilizados únicamente con fines de entretenimiento dentro del contexto gaming. Comunidad 100% apolítica.',
    footer:'Todos los derechos reservados.'
  },
  en: {
    nav:['Home','Community','Events','Competitive','Statistics','Coaching','Alliances','Collaborators','In Progress'], badge:'Community operations center', title:['RAINBOW','SIX','CUBA'], subtitle:'The Cuban Rainbow Six Siege community.', body:'We coordinate players, teams, coaches and collaborators inside and outside Cuba to compete, organize and grow as a serious community.', join:'Join Discord', explore:'Explore Community', view:'View more', reset:'Home', beta:'System in development', moduleLabel:'Active module', openModule:'Open module', closePanel:'Close panel',
    modules:{community:['Community','Connection, activity and growth for Cuban players inside and outside Cuba.','Center for members, teams, staff, collaborators and future community metrics.'],events:['Events','Scrims, tournaments, cups and activities organized to strengthen the scene.','Calendars, calls, results and community rules will live here.'],competitive:['Competitive','Teams, leagues, rankings and preparation to compete better.','Foundation for recruitment, teams, internal leagues and competitive growth.'],statistics:['Statistics','Competitive hub with scoreboard, profiles, rankings and public visualization.','This is not Companion. Companion connects players; Statistics displays competitive impact.'],coaches:['Coaching','Training, strategy and competitive development for players and teams.','Tactical classroom, analysis, practice and guidance to turn preparation into real performance.'],partners:['Alliances','Verified organizations, streamers and sponsors strengthening the ecosystem.','Trusted alliances, strategic cooperation and continuity for community growth.'],collaborators:['Collaborators','No community grows alone. Support, alliances and international cooperation.','Volunteers, staff, creators and allies helping behind the scenes.'],incoming:['In Progress','Infrastructure, tools and modules currently under development.','The future of Rainbow Six CUBA is built in phases: systems, events, data, resources and new experiences.'],companion:['Companion Extension','Tool for connecting players to the statistics ecosystem.','The extension synchronizes data; the website and Discord present it visually.']},
    stats:{title:'Competitive scoreboard', subtitle:'Beta data prepared for public tables, filters, progression and Discord visual rendering.', tabs:['Scoreboard','Players','Operators','Maps','Seasons','Discord Render','Companion'], search:'Search player, team or region', rank:'Rank', region:'Region', team:'Team', rows:'Rows', all:'All', clear:'Clear', showing:'Showing', of:'of', players:'profiles', headers:['#','Player','Ubisoft','Rank','RP','KD','WR','Region','Team','Updated'], progressHeaders:['Player','RP Δ','KD Δ','WR Δ','Rank Δ','Last sync'], cards:['Connected profile','Ranked Beta','API ready','Discord render'], profileTitle:'Connected profile', profileCopy:'Real initial flow sample. When new players connect accounts, they are added to the scoreboard without changing the design.', renderTitle:'Discord visual', renderCopy:'The same dataset can render as a scoreboard-style image for Discord channels, replacing plain text tables.', note:'Companion will work as a data entry tool. This screen is the public competitive hub.', noData:'No results with those filters.', verified:'Verified'},
    legal:'Rainbow Six CUBA is an independent fan community and is not affiliated, associated, authorized or endorsed by Ubisoft or Tom Clancy’s Rainbow Six Siege. All visual content, names and references are fictional and used only for entertainment within a gaming context. 100% apolitical community.', footer:'All rights reserved.'
  }
};
for (const code of ['fr','de','zh','ja']) DATA[code] = DATA.en;

const MODULES = [
  ['community', Users, 'red', 'v21-community-card.webp', 'v21-community-hero.webp'], ['events', CalendarDays, 'red', 'v21-events-card.webp', 'v21-events-hero.webp'],
  ['competitive', Swords, 'gold', 'v21-competitive-card.webp', 'v21-competitive-hero.webp'], ['statistics', BarChart3, 'blue', 'v21-statistics-card.webp', 'v21-statistics-hero.webp'],
  ['coaches', GraduationCap, 'purple', 'v21-coaches-card.webp', 'v21-coaches-hero.webp'], ['partners', BadgeCheck, 'green', 'v21-partners-card.webp', 'v21-partners-hero.webp'],
  ['collaborators', HeartHandshake, 'red', 'v21-collaborators-card.webp', 'v21-collaborators-hero.webp'], ['incoming', PackageOpen, 'orange', 'v21-incoming-card.webp', 'v21-incoming-hero.webp']
];
const MODULE_MAP = Object.fromEntries(MODULES.map(m=>[m[0],m]));

function initialLanguage(){const q=new URLSearchParams(location.search).get('lang');if(q&&DATA[q])return q;const s=localStorage.getItem(LANG_KEY);if(s&&DATA[s])return s;return 'es'}
function initialSection(){const q=new URLSearchParams(location.search).get('section');if(q&&MODULE_MAP[q])return q;const h=location.hash.replace('#','');if(h&&MODULE_MAP[h])return h;return localStorage.getItem(SECTION_KEY)||'home'}
function withLang(url, lang){if(!url||url.startsWith('http'))return url;return `${url}${url.includes('?')?'&':'?'}lang=${lang}`}

function useLang(){const [lang,setLang]=useState(initialLanguage);useEffect(()=>{localStorage.setItem(LANG_KEY,lang);document.documentElement.lang=lang;const u=new URL(location.href);if(u.searchParams.get('lang')!==lang){u.searchParams.set('lang',lang);history.replaceState({},'',u)}},[lang]);return [lang,setLang]}
function GenericPanel({t,active}){if(active==='home') return null; if(active==='statistics') return <StatisticsPanel t={t}/>; const mod=t.modules[active]; return <section className="modulePanel"><div className="panelHeader"><span>{t.beta}</span><h2>{mod[0]}</h2><p>{mod[2]}</p></div><div className="panelGrid"><div className="glassCard"><h3>{mod[0]}</h3><p>{mod[1]}</p></div><div className="glassCard"><h3>Roadmap</h3><p>{mod[2]}</p></div><div className="glassCard"><h3>Integración</h3><p>{active==='companion'?'Companion conecta jugadores a datos. El website y Discord muestran la visualización final.':'Este módulo se conectará progresivamente al ecosistema Rainbow Six CUBA.'}</p></div></div></section>}





function App(){const [lang,setLang]=useLang();const [active,setActiveState]=useState(initialSection);const t=useMemo(()=>DATA[lang]||DATA.es,[lang]);function setActive(id){setActiveState(id);localStorage.setItem(SECTION_KEY,id);const u=new URL(location.href);if(id==='home'){u.searchParams.delete('section');u.hash='';}else{u.searchParams.set('section',id);u.hash='';}history.pushState({},'',u)}useEffect(()=>{const onPop=()=>setActiveState(initialSection());window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);return <><Header t={t} lang={lang} setLang={setLang} active={active} setActive={setActive} languages={LANGUAGES}/><main><Hero t={t} active={active} setActive={setActive} moduleMap={MODULE_MAP} imageBase={IM}/>{active==='home'&&<Modules t={t} active={active} setActive={setActive} modules={MODULES} imageBase={IM}/>}<GenericPanel t={t} active={active}/><Values t={t}/><Notice t={t}/></main><Footer t={t}/></>}

const RootComponent =
  window.location.pathname === "/auth/callback"
    ? AuthCallback
    : window.location.pathname === "/account"
      ? AccountPanel
      : window.location.pathname.startsWith("/player/")
        ? PlayerProfile
        : App;

createRoot(document.getElementById('root')).render(<RootComponent/>);
