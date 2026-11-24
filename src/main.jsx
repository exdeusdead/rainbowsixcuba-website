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
import CompanionPanel from './features/statistics/CompanionPanel.jsx';
import { LANGUAGES, assetPath, siteRelativePath, withLang } from './i18n';

const LANG_KEY = SITE_CONFIG.languageStorageKey || 'r6cuba-language';
const SECTION_KEY = 'r6cuba-active-section';
const IM = assetPath('/backgrounds/');
const DATA = {
  es: {
    nav: ['Inicio','Comunidad','Eventos','Competitivo','Estadísticas','Coaching','Alianzas','Colaboradores','En Progreso'], rail: { stats: 'Estadísticas', events: 'Eventos', social: 'Social' },
    badge: 'Centro operativo comunitario', title: ['RAINBOW','SIX','CUBA'], subtitle: 'La comunidad cubana de Rainbow Six Siege.',
    body: 'Coordinamos jugadores, equipos, coaches y colaboradores dentro y fuera de Cuba para competir, organizarnos y crecer como una comunidad seria.',
    join:'Únete al Discord', explore:'Explorar comunidad', view:'Ver más', reset:'Inicio', beta:'Sistema en desarrollo',
    moduleLabel:'Módulo activo', openModule:'Abrir módulo', closePanel:'Cerrar panel', roadmap:'Hoja de ruta', integration:'Integración', companionIntegration:'Companion conecta jugadores a datos. El website y Discord muestran la visualización final.', ecosystemIntegration:'Este módulo se conectará progresivamente al ecosistema Rainbow Six CUBA.',
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
    values:[['Comunidad activa','Perfiles conectados en crecimiento'],['Competición justa','Reglas claras y anti-toxicidad'],['Crecimiento constante','Proyectos y herramientas reales'],['Orgullo cubano','Unidos por Rainbow Six'],['100% apolítico','Solo juego, respeto y comunidad']],
    stats:{
      title:'Scoreboard competitivo', subtitle:'Datos beta preparados para tabla pública, filtros, progresión y render visual para Discord.',
      tabs:['Scoreboard','Jugadores','Operadores','Mapas','Temporadas','Discord Render','Companion'], search:'Buscar jugador, equipo o región', rank:'Rango', region:'Región', team:'Equipo', rows:'Filas', all:'Todos', clear:'Limpiar', showing:'Mostrando', of:'de', players:'perfiles',
      headers:['#','Jugador','Ubisoft','Rango','RP','KD','WR','Región','Equipo','Actualizado'], progressHeaders:['Jugador','RP Δ','KD Δ','WR Δ','Rank Δ','Última sincronización'],
      cards:['Perfil conectado','Ranked Beta','API lista','Render Discord'], summaryValues:['1','Ranked','Lista','PNG'],
      operatorHeaders:['Operador','Rol','Tasa de elección','Tasa de victoria','KD','Estado'], mapHeaders:['Mapa','Partidas','Tasa de victoria','Tendencia','Estado'], seasonHeaders:['Temporada','Rango','RP','KD','WR','Estado'],
      profileTitle:'Perfil conectado', profileCopy:'Muestra real del flujo inicial. Cuando nuevos jugadores conecten sus cuentas, se añaden al scoreboard sin cambiar el diseño.',
      renderTitle:'Visual para Discord', renderCopy:'El mismo dataset podrá renderizarse como imagen estilo scoreboard para canales de Discord, evitando tablas de texto simples.', scoreboardName:'Rainbow Six CUBA Scoreboard', noPlayerData:'No hay datos de jugadores disponibles.',
      companionTitle:'Companion Extension', companionCopy:'Companion no es un módulo principal del Home. Es la herramienta que conecta jugadores al ecosistema estadístico para que Scoreboard, Perfiles, Operadores, Mapas y Discord Render puedan usar datos reales.', flow:'Flujo', companionLink:'Companion', privacyLink:'Privacidad', supportLink:'Soporte',
      companionSearchBadge:'Sincronización Companion', companionSearchTitle:'Encuentra tu perfil', companionSearchCopy:'Busca tu Ubisoft ID y compara tu rendimiento con la comunidad.', companionSearchLabel:'Ubisoft ID', companionSearchButton:'Buscar información', companionSearchPlaceholder:'Ej: exdeusdead', searching:'Buscando información...', temporarySnapshot:'Vista temporal', profileFound:'Perfil encontrado', notRegistered:'Jugador no registrado en Rainbow Six CUBA.\n\nEste perfil todavía no participa en los rankings oficiales.\n\nÚnete a la comunidad, conecta Ubisoft y sincroniza tus estadísticas para activar tu perfil competitivo.', preparingConnection:'Preparando conexión con Companion...', searchWithCompanion:'Buscar con Companion', temporaryPlayer:'Jugador temporal', verifiedPlayer:'Jugador verificado', prepareInfo:'Preparar información', joinToClaim:'Unirme para reclamar perfil', viewFullProfile:'Ver perfil completo', recentSyncs:'Últimas sincronizaciones',
      myStatsTitle:'Mis estadísticas', myStatsLogin:'Inicia sesión con Discord y sincroniza tu perfil con Companion para ver tu perfil competitivo aquí.', myStatsDescription:'Perfil competitivo personal sincronizado desde Rainbow Six CUBA Stats.', playerFallback:'Jugador', recentForm:'Forma reciente', matches:'partidas', kills:'bajas', deaths:'muertes', level:'Nivel', lastSync:'Última sincronización', noPersonalStats:'No hay estadísticas personales disponibles para esta sesión.', status:'Estado', topOperator:'Operador principal', rounds:'Rondas', bestMap:'Mejor mapa', hs:'HS', myOperatorHeaders:['Operador principal','Rondas','WR','KD','HS'], myMapHeaders:['Mejor mapa','Partidas','WR','KD','ESR'],
      note:'Companion funcionará como entrada de datos. Esta pantalla es el hub competitivo público.', noData:'No hay resultados con esos filtros.', verified:'Verificado'
    },
    legal:'Rainbow Six CUBA es una comunidad independiente de fans y no está afiliada, asociada, autorizada ni respaldada por Ubisoft o Tom Clancy’s Rainbow Six Siege. Todo el contenido visual, nombres y referencias son ficticios y utilizados únicamente con fines de entretenimiento dentro del contexto gaming. Comunidad 100% apolítica.',
    footer:'Todos los derechos reservados.'
  },
  en: {
    nav:['Home','Community','Events','Competitive','Statistics','Coaching','Alliances','Collaborators','In Progress'], rail: { stats: 'Stats', events: 'Events', social: 'Social' }, badge:'Community operations center', title:['RAINBOW','SIX','CUBA'], subtitle:'The Cuban Rainbow Six Siege community.', body:'We coordinate players, teams, coaches and collaborators inside and outside Cuba to compete, organize and grow as a serious community.', join:'Join Discord', explore:'Explore Community', view:'View more', reset:'Home', beta:'System in development', moduleLabel:'Active module', openModule:'Open module', closePanel:'Close panel', roadmap:'Roadmap', integration:'Integration', companionIntegration:'Companion connects players to data. The website and Discord present the final visualization.', ecosystemIntegration:'This module will connect progressively to the Rainbow Six CUBA ecosystem.',
    modules:{community:['Community','Connection, activity and growth for Cuban players inside and outside Cuba.','Center for members, teams, staff, collaborators and future community metrics.'],events:['Events','Scrims, tournaments, cups and activities organized to strengthen the scene.','Calendars, calls, results and community rules will live here.'],competitive:['Competitive','Teams, leagues, rankings and preparation to compete better.','Foundation for recruitment, teams, internal leagues and competitive growth.'],statistics:['Statistics','Competitive hub with scoreboard, profiles, rankings and public visualization.','This is not Companion. Companion connects players; Statistics displays competitive impact.'],coaches:['Coaching','Training, strategy and competitive development for players and teams.','Tactical classroom, analysis, practice and guidance to turn preparation into real performance.'],partners:['Alliances','Verified organizations, streamers and sponsors strengthening the ecosystem.','Trusted alliances, strategic cooperation and continuity for community growth.'],collaborators:['Collaborators','No community grows alone. Support, alliances and international cooperation.','Volunteers, staff, creators and allies helping behind the scenes.'],incoming:['In Progress','Infrastructure, tools and modules currently under development.','The future of Rainbow Six CUBA is built in phases: systems, events, data, resources and new experiences.'],companion:['Companion Extension','Tool for connecting players to the statistics ecosystem.','The extension synchronizes data; the website and Discord present it visually.']},
    stats:{title:'Competitive scoreboard', subtitle:'Beta data prepared for public tables, filters, progression and Discord visual rendering.', tabs:['Scoreboard','Players','Operators','Maps','Seasons','Discord Render','Companion'], search:'Search player, team or region', rank:'Rank', region:'Region', team:'Team', rows:'Rows', all:'All', clear:'Clear', showing:'Showing', of:'of', players:'profiles', headers:['#','Player','Ubisoft','Rank','RP','KD','WR','Region','Team','Updated'], progressHeaders:['Player','RP Δ','KD Δ','WR Δ','Rank Δ','Last sync'], cards:['Connected profile','Ranked Beta','API ready','Discord render'], summaryValues:['1','Ranked','Ready','PNG'], operatorHeaders:['Operator','Role','Pick rate','Win rate','KD','Status'], mapHeaders:['Map','Matches','Win rate','Trend','Status'], seasonHeaders:['Season','Rank','RP','KD','WR','Status'], profileTitle:'Connected profile', profileCopy:'Real initial flow sample. When new players connect accounts, they are added to the scoreboard without changing the design.', renderTitle:'Discord visual', renderCopy:'The same dataset can render as a scoreboard-style image for Discord channels, replacing plain text tables.', scoreboardName:'Rainbow Six CUBA Scoreboard', noPlayerData:'No player data available.', companionTitle:'Companion Extension', companionCopy:'Companion is not a primary Home module. It connects players to the statistics ecosystem so Scoreboard, Profiles, Operators, Maps and Discord Render can use real data.', flow:'Flow', companionLink:'Companion', privacyLink:'Privacy', supportLink:'Support', companionSearchBadge:'Companion Sync', companionSearchTitle:'Find your profile', companionSearchCopy:'Search your Ubisoft ID and compare your performance with the community.', companionSearchLabel:'Ubisoft ID', companionSearchButton:'Search profiles', companionSearchPlaceholder:'Example: exdeusdead', searching:'Searching...', temporarySnapshot:'Temporary snapshot', profileFound:'Profile found', notRegistered:'Player not registered in Rainbow Six CUBA.\n\nThis profile is not part of the official rankings yet.\n\nJoin the community, connect Ubisoft and sync your stats to activate your competitive profile.', preparingConnection:'Preparing Companion connection...', searchWithCompanion:'Search with Companion', temporaryPlayer:'Temporary player', verifiedPlayer:'Verified player', prepareInfo:'Prepare information', joinToClaim:'Join to claim profile', viewFullProfile:'View full profile', recentSyncs:'Latest syncs', myStatsTitle:'My stats', myStatsLogin:'Sign in with Discord and sync your profile with Companion to view your competitive profile here.', myStatsDescription:'Personal competitive profile synced from Rainbow Six CUBA Stats.', playerFallback:'Player', recentForm:'Recent form', matches:'matches', kills:'kills', deaths:'deaths', level:'Level', lastSync:'Last sync', noPersonalStats:'No personal stats are available for this session.', status:'Status', topOperator:'Top operator', rounds:'Rounds', bestMap:'Best map', hs:'HS', myOperatorHeaders:['Top operator','Rounds','WR','KD','HS'], myMapHeaders:['Best map','Matches','WR','KD','ESR'], note:'Companion will work as a data entry tool. This screen is the public competitive hub.', noData:'No results with those filters.', verified:'Verified'},
    legal:'Rainbow Six CUBA is an independent fan community and is not affiliated, associated, authorized or endorsed by Ubisoft or Tom Clancy’s Rainbow Six Siege. All visual content, names and references are fictional and used only for entertainment within a gaming context. 100% apolitical community.', footer:'All rights reserved.'
  }
};
DATA.es.values = [['Comunidad activa','Perfiles conectados en crecimiento'],['Competición justa','Reglas claras y anti-toxicidad'],['Crecimiento constante','Proyectos y herramientas reales'],['Orgullo cubano','Unidos por Rainbow Six'],['100% apolítico','Solo juego, respeto y comunidad']];
DATA.en.values = [['Active community','Connected profiles in growth'],['Fair competition','Clear rules and anti-toxicity'],['Constant growth','Real projects and tools'],['Cuban pride','United by Rainbow Six'],['100% apolitical','Gaming, respect and community']];

const LEGAL_PAGES = {
  es: {
    privacy: {
      badge: 'Estado legal bloqueado',
      title: 'Política de privacidad no vigente',
      lead: 'Rainbow Six CUBA no publica una política de privacidad de producción en esta vista beta. Esta pantalla informa el estado real de lanzamiento y no crea derechos, promesas ni un canal operativo.',
      sections: [
        ['Estado efectivo', 'No existe una política de privacidad vigente para este producto. No envíes nombres, correos, identificadores de cuenta ni otra información personal a esta previsualización.'],
        ['Comportamiento confirmado', 'La interfaz puede guardar en este navegador el idioma y la vista seleccionada. Las superficies de demostración no deben interpretarse como un registro de datos de producción ni como consentimiento para una futura integración.'],
        ['Solicitudes de derechos', 'El proceso de acceso, corrección, exportación o eliminación no está publicado ni operativo en esta versión. Por eso la política permanece bloqueada hasta que exista un responsable, contacto y flujo verificables.']
      ],
      back: 'Volver al hub',
      other: 'Ver términos bloqueados'
    },
    terms: {
      badge: 'Estado legal bloqueado',
      title: 'Términos del producto no vigentes',
      lead: 'Rainbow Six CUBA es una vista beta y no publica términos de uso de producción en esta ruta. Esta pantalla evita presentar un borrador como contrato vinculante.',
      sections: [
        ['Estado efectivo', 'No hay términos vinculantes de producción publicados para el producto. Esta vista no ofrece una compra, membresía pagada, reserva de evento ni promesa de disponibilidad operativa.'],
        ['Uso actual', 'Las vistas, estadísticas de ejemplo y Companion se muestran como beta/demo. No introduzcas credenciales de Ubisoft, información personal o datos de terceros en una superficie que no indique expresamente un flujo operativo aprobado.'],
        ['Reglas pendientes', 'Las reglas efectivas de comunidad, propiedad intelectual, moderación, cuentas, eventos y resolución de incidencias no están publicadas en un proceso operativo verificable. El lanzamiento legal queda bloqueado hasta completar ese expediente.']
      ],
      back: 'Volver al hub',
      other: 'Ver privacidad bloqueada'
    }
  },
  en: {
    privacy: {
      badge: 'Legal status blocked',
      title: 'Privacy policy not effective',
      lead: 'Rainbow Six CUBA does not publish a production privacy policy in this beta view. This screen reports the actual launch status and creates no rights, promises or operational channel.',
      sections: [
        ['Effective status', 'There is no effective production privacy policy for this product. Do not submit names, email addresses, account identifiers or other personal information to this preview.'],
        ['Confirmed behavior', 'The interface may store the selected language and view in this browser. Demonstration surfaces are not a production data register and do not represent consent for a future integration.'],
        ['Rights requests', 'The access, correction, export and deletion process is not published or operational in this release. The policy therefore remains blocked until an accountable owner, contact and verifiable workflow exist.']
      ],
      back: 'Back to hub',
      other: 'View blocked terms'
    },
    terms: {
      badge: 'Legal status blocked',
      title: 'Product terms not effective',
      lead: 'Rainbow Six CUBA is a beta view and does not publish production terms of use on this route. This screen avoids presenting a draft as a binding contract.',
      sections: [
        ['Effective status', 'No binding production terms are published for this product. This view offers no purchase, paid membership, event booking or promise of operational availability.'],
        ['Current use', 'The views, sample statistics and Companion are presented as beta/demo surfaces. Do not enter Ubisoft credentials, personal information or third-party data into a surface that does not explicitly indicate an approved operational flow.'],
        ['Pending rules', 'Effective community, intellectual-property, moderation, account, event and incident-resolution rules are not published in a verifiable operational process. Legal launch remains blocked until that dossier is complete.']
      ],
      back: 'Back to hub',
      other: 'View blocked privacy status'
    }
  }
};

const MODULES = [
  ['community', Users, 'red', 'v21-community-card.webp', 'v21-community-hero.webp'], ['events', CalendarDays, 'red', 'v21-events-card.webp', 'v21-events-hero.webp'],
  ['competitive', Swords, 'gold', 'v21-competitive-card.webp', 'v21-competitive-hero.webp'], ['statistics', BarChart3, 'blue', 'v21-statistics-card.webp', 'v21-statistics-hero.webp'],
  ['coaches', GraduationCap, 'purple', 'v21-coaches-card.webp', 'v21-coaches-hero.webp'], ['partners', BadgeCheck, 'green', 'v21-partners-card.webp', 'v21-partners-hero.webp'],
  ['collaborators', HeartHandshake, 'red', 'v21-collaborators-card.webp', 'v21-collaborators-hero.webp'], ['incoming', PackageOpen, 'orange', 'v21-incoming-card.webp', 'v21-incoming-hero.webp']
];
const COMPANION_MODULE = ['companion', Puzzle, 'purple', 'v19-companion-card.webp', 'v19-companion-hero.webp'];
const MODULE_MAP = Object.fromEntries([...MODULES, COMPANION_MODULE].map(m=>[m[0],m]));

DATA.es.modules.companion[0] = 'Extensión Companion';
DATA.es.stats.companionTitle = 'Extensión Companion';
DATA.es.languageLabel = 'Idioma';
DATA.es.openMenu = 'Abrir menú';
DATA.es.closeMenu = 'Cerrar menú';
DATA.en.languageLabel = 'Language';
DATA.en.openMenu = 'Open menu';
DATA.en.closeMenu = 'Close menu';

DATA.es.stats.companionRoute = {
  statusBadge: 'Beta / demo',
  overviewTitle: 'Una vista del Companion dentro del hub',
  overviewCopy: 'Esta superficie convierte Companion en una herramienta navegable del ecosistema: permite buscar un Ubisoft ID, revisar el estado de la conexión y entender cómo llegan los datos al scoreboard y a Discord.',
  flowLabels: ['Jugador', 'Companion', 'Estadísticas', 'Discord'],
  statusTitle: 'Estado actual',
  statusCopy: 'Previsualización funcional con datos controlados. No implica sincronización automática, acceso a credenciales ni datos de producción.',
  toolsTitle: 'Herramientas incluidas',
  toolsCopy: 'Búsqueda de perfil, estado temporal o verificado, retorno a perfiles públicos y enlaces de soporte/privacidad.',
  policyTitle: 'Privacidad y control',
  policyCopy: 'La extensión no solicita contraseñas ni pagos. Consulta las políticas antes de conectar una cuenta o compartir información.',
  privacyLink: 'Ver estado de privacidad',
  supportTitle: 'Soporte comunitario',
  supportCopy: 'La comunidad puede conversar sobre errores o sincronización. Este enlace no ofrece un canal operativo de privacidad ni de eliminación.',
  supportLink: 'Abrir soporte',
  statisticsLink: 'Ver Estadísticas',
  backLink: 'Volver al hub',
  privacyTitle: 'Estado de privacidad de Companion',
  privacyLead: 'Companion está en beta y no tiene una política de privacidad vigente. Esta vista informa un estado bloqueado; no es un aviso legal ni un canal para enviar información personal.',
  privacyPoints: [
    'Estado efectivo: bloqueado/no vigente para producción.',
    'No envíes nombres, correos, identificadores de cuenta ni otros datos personales a esta previsualización.',
    'La interfaz puede conservar localmente el idioma y la vista seleccionada en este navegador.',
    'No existe aquí un proceso publicado para acceso, corrección, exportación o eliminación de datos.',
    'El enlace de Discord es comunitario y no es un canal aprobado para solicitudes legales o de privacidad.'
  ],
  supportTitlePage: 'Soporte comunitario de Companion',
  supportLead: 'Discord puede servir para conversación comunitaria sobre errores o preguntas generales. No es un canal operativo de privacidad, eliminación, acceso ni soporte garantizado.',
  discordLink: 'Abrir Discord comunitario',
  privacyPageLink: 'Ver estado de privacidad bloqueado',
  homeLink: 'Volver al hub'
};

DATA.en.stats.companionRoute = {
  statusBadge: 'Beta / demo',
  overviewTitle: 'A Companion view inside the hub',
  overviewCopy: 'This surface makes Companion a navigable ecosystem tool: search a Ubisoft ID, review connection status and understand how data reaches the scoreboard and Discord.',
  flowLabels: ['Player', 'Companion', 'Statistics', 'Discord'],
  statusTitle: 'Current status',
  statusCopy: 'Functional preview with controlled data. It does not imply automatic synchronization, credential access or production data.',
  toolsTitle: 'Included tools',
  toolsCopy: 'Profile search, temporary or verified status, return to public profiles and identifiable support/privacy paths.',
  policyTitle: 'Privacy and control',
  policyCopy: 'The extension does not request passwords or payments. Review the policies before connecting an account or sharing information.',
  privacyLink: 'View privacy status',
  supportTitle: 'Community support',
  supportCopy: 'The community can discuss bugs or synchronization. This link is not an operational privacy or deletion channel.',
  supportLink: 'Open support',
  statisticsLink: 'View Statistics',
  backLink: 'Back to hub',
  privacyTitle: 'Companion privacy status',
  privacyLead: 'Companion is in beta and has no effective production privacy policy. This view reports a blocked status; it is not a legal notice or a channel for submitting personal information.',
  privacyPoints: [
    'Effective status: blocked/not effective for production.',
    'Do not submit names, email addresses, account identifiers or other personal information to this preview.',
    'The interface may retain the selected language and view locally in this browser.',
    'No published process for data access, correction, export or deletion exists here.',
    'The Discord link is community-only and is not an approved channel for legal or privacy requests.'
  ],
  supportTitlePage: 'Companion community support',
  supportLead: 'Discord may support community conversation about bugs or general questions. It is not an operational channel for privacy, deletion, access or guaranteed support.',
  discordLink: 'Open community Discord',
  privacyPageLink: 'View blocked privacy status',
  homeLink: 'Back to hub'
};

const RAINBOW_FAVICON_PATH = assetPath('/logo/r6cuba-shield.webp');
let faviconSyncing = false;

function ensureBrandFavicon() {
  if (!document.head || faviconSyncing) return;
  faviconSyncing = true;
  try {
    const brandHref = new URL(RAINBOW_FAVICON_PATH, document.baseURI).href;
    const links = [...document.head.querySelectorAll('link[rel~="icon"]')];
    let brand = links.find((link) => link.dataset.cgcBrandFavicon === 'true' || link.href === brandHref);
    if (!brand) {
      brand = document.createElement('link');
      brand.rel = 'icon';
      document.head.appendChild(brand);
    }
    if (brand.type !== 'image/webp') brand.type = 'image/webp';
    if (brand.href !== brandHref) brand.href = brandHref;
    if (brand.dataset.cgcBrandFavicon !== 'true') brand.dataset.cgcBrandFavicon = 'true';
    links
      .filter((link) => link !== brand && (link.href.includes('data-codex-favicon-badge') || link.hasAttribute('data-codex-favicon-badge')))
      .forEach((link) => link.remove());
  } finally {
    faviconSyncing = false;
  }
}

ensureBrandFavicon();
if ('MutationObserver' in window) {
  new MutationObserver(ensureBrandFavicon).observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href', 'rel', 'data-codex-favicon-badge']
  });
}
window.setTimeout(ensureBrandFavicon, 0);
window.setTimeout(ensureBrandFavicon, 250);
window.setTimeout(ensureBrandFavicon, 800);
window.addEventListener('load', ensureBrandFavicon, { once: true });
const faviconHydrationTimer = window.setInterval(ensureBrandFavicon, 200);
window.setTimeout(() => window.clearInterval(faviconHydrationTimer), 3000);

function initialLanguage(){const q=new URLSearchParams(location.search).get('lang');if(q&&DATA[q])return q;const s=localStorage.getItem(LANG_KEY);if(s&&DATA[s])return s;return 'es'}
function initialSection(){const q=new URLSearchParams(location.search).get('section');if(q&&(MODULE_MAP[q]||q==='legal'))return q;const h=location.hash.replace('#','');if(h&&MODULE_MAP[h])return h;const stored=localStorage.getItem(SECTION_KEY);return stored&&MODULE_MAP[stored]?stored:'home'}
function initialAux(){const aux=new URLSearchParams(location.search).get('aux');return aux==='privacy'||aux==='support'||aux==='terms'?aux:''}
function useLang(){const [lang,setLang]=useState(initialLanguage);useEffect(()=>{localStorage.setItem(LANG_KEY,lang);document.documentElement.lang=lang;const u=new URL(location.href);if(u.searchParams.get('lang')!==lang){u.searchParams.set('lang',lang);history.replaceState({},'',u)}},[lang]);return [lang,setLang]}

const PAGE_META = {
  es: {
    home: { title: 'Rainbow Six CUBA', description: 'Comunidad cubana independiente de Rainbow Six Siege.' },
    statistics: { title: 'Estadísticas | Rainbow Six CUBA', description: 'Scoreboard, perfiles y datos competitivos de Rainbow Six CUBA.' },
    companion: { title: 'Extensión Companion | Rainbow Six CUBA', description: 'Previsualización beta de Companion para conectar perfiles y estadísticas de Rainbow Six CUBA.' },
    companionPrivacy: { title: 'Privacidad de Companion | Rainbow Six CUBA', description: 'Alcance de privacidad de la previsualización beta de Rainbow Six CUBA Companion.' },
    companionSupport: { title: 'Soporte de Companion | Rainbow Six CUBA', description: 'Soporte comunitario y rutas de privacidad para Rainbow Six CUBA Companion.' },
    legalPrivacy: { title: 'Política de privacidad bloqueada | Rainbow Six CUBA', description: 'Estado de lanzamiento de la política de privacidad de Rainbow Six CUBA.' },
    legalTerms: { title: 'Términos bloqueados | Rainbow Six CUBA', description: 'Estado de lanzamiento de los términos de Rainbow Six CUBA.' }
  },
  en: {
    home: { title: 'Rainbow Six CUBA', description: 'Independent Cuban Rainbow Six Siege community.' },
    statistics: { title: 'Statistics | Rainbow Six CUBA', description: 'Scoreboard, profiles and competitive data for Rainbow Six CUBA.' },
    companion: { title: 'Companion Extension | Rainbow Six CUBA', description: 'Beta preview of Companion for Rainbow Six CUBA profiles and statistics.' },
    companionPrivacy: { title: 'Companion Privacy | Rainbow Six CUBA', description: 'Privacy scope for the Rainbow Six CUBA Companion beta preview.' },
    companionSupport: { title: 'Companion Support | Rainbow Six CUBA', description: 'Community support and privacy paths for Rainbow Six CUBA Companion.' },
    legalPrivacy: { title: 'Blocked privacy policy | Rainbow Six CUBA', description: 'Rainbow Six CUBA privacy policy launch status.' },
    legalTerms: { title: 'Blocked terms | Rainbow Six CUBA', description: 'Rainbow Six CUBA terms launch status.' }
  }
};

function usePageMeta(lang, active, aux) {
  useEffect(() => {
    const pageKey = active === 'companion' && aux
      ? `companion${aux[0].toUpperCase()}${aux.slice(1)}`
      : active === 'legal' && aux
        ? `legal${aux[0].toUpperCase()}${aux.slice(1)}`
        : active;
    const meta = PAGE_META[lang]?.[pageKey] || PAGE_META.es.home;
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.setAttribute('content', meta.description);
  }, [lang, active, aux]);
}

function CompanionRoutePanel({t, lang, aux}){
  const s=t.stats;
  const route=s.companionRoute;
  const companionHref=withLang('/?section=companion',lang);
  const statisticsHref=withLang('/?section=statistics',lang);
  const privacyHref=withLang('/privacy_policy',lang);
  const supportHref=withLang('/support',lang);

  if(aux==='privacy'||aux==='support'){
    const privacy=aux==='privacy';
    return <section className="modulePanel companionRoute" aria-labelledby="companion-page-title">
      <div className="panelHeader">
        <span>{route.statusBadge}</span>
        <h2 id="companion-page-title">{privacy?route.privacyTitle:route.supportTitlePage}</h2>
        <p>{privacy?route.privacyLead:route.supportLead}</p>
      </div>
      {privacy ? <div className="panelGrid companionLegalGrid">
        <div className="glassCard"><h3>{route.policyTitle}</h3><ul>{route.privacyPoints.map((point)=><li key={point}>{point}</li>)}</ul></div>
        <div className="glassCard"><h3>{t.rail.social}</h3><p>{t.legal}</p></div>
      </div> : <div className="panelGrid companionLegalGrid">
        <div className="glassCard"><h3>{route.supportTitle}</h3><p>{route.supportLead}</p><div className="ctas"><a className="btn primary" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">{route.discordLink}</a><a className="btn ghost" href={privacyHref}>{route.privacyPageLink}</a></div></div>
        <div className="glassCard"><h3>{t.stats.companionTitle}</h3><p>{route.statusCopy}</p></div>
      </div>}
      <div className="ctas"><a className="btn primary" href={companionHref}>{route.backLink}</a><a className="btn ghost" href={statisticsHref}>{route.statisticsLink}</a></div>
    </section>;
  }

  return <section className="modulePanel companionRoute" aria-labelledby="companion-route-title">
    <div className="panelHeader">
      <span>{route.statusBadge}</span>
      <h2 id="companion-route-title">{s.companionTitle}</h2>
      <p>{route.overviewCopy}</p>
    </div>
    <div className="companionRouteGrid">
      <div className="glassCard companionOverview">
        <h3>{route.overviewTitle}</h3>
        <p>{route.statusCopy}</p>
        <div className="companionFlow" aria-label={route.overviewTitle}>
          {route.flowLabels.map((label,index)=><span className={index===1?'active':''} key={label}>{label}</span>)}
        </div>
        <h3>{route.toolsTitle}</h3>
        <p>{route.toolsCopy}</p>
        <div className="ctas"><a className="btn primary" href={statisticsHref}>{route.statisticsLink}</a><a className="btn ghost" href={supportHref}>{route.supportLink}</a></div>
      </div>
      <CompanionPanel players={[]} s={s} lang={lang}/>
    </div>
    <div className="panelGrid companionRouteCards">
      <div className="glassCard"><h3>{route.policyTitle}</h3><p>{route.policyCopy}</p><a className="textLink" href={privacyHref}>{route.privacyLink}</a></div>
      <div className="glassCard"><h3>{route.supportTitle}</h3><p>{route.supportCopy}</p><a className="textLink" href={supportHref}>{route.supportLink}</a></div>
      <div className="glassCard"><h3>{t.roadmap}</h3><p>{t.companionIntegration}</p><a className="textLink" href={companionHref}>{route.backLink}</a></div>
    </div>
  </section>;
}

function LegalStatusPanel({lang, aux}) {
  const page = LEGAL_PAGES[lang]?.[aux] || LEGAL_PAGES[lang].privacy;
  const otherAux = aux === 'terms' ? 'privacy' : 'terms';
  return <section className="modulePanel legalStatusPanel" aria-labelledby="legal-page-title">
    <div className="panelHeader"><span>{page.badge}</span><h2 id="legal-page-title">{page.title}</h2><p>{page.lead}</p></div>
    <div className="panelGrid legalStatusGrid">{page.sections.map(([title, body]) => <article className="glassCard legalStatusCard" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
    <div className="ctas"><a className="btn primary" href={withLang('/', lang)}>{page.back}</a><a className="btn ghost" href={withLang(`/?section=legal&aux=${otherAux}`, lang)}>{page.other}</a></div>
  </section>;
}

function GenericPanel({t,active,lang,aux}){if(active==='home') return null; if(active==='statistics') return <StatisticsPanel t={t} lang={lang}/>; if(active==='companion') return <CompanionRoutePanel t={t} lang={lang} aux={aux}/>; if(active==='legal') return <LegalStatusPanel lang={lang} aux={aux}/>; const mod=t.modules[active]; if(!mod) return null; return <section className="modulePanel"><div className="panelHeader"><span>{t.beta}</span><h2>{mod[0]}</h2><p>{mod[2]}</p></div><div className="panelGrid"><div className="glassCard"><h3>{mod[0]}</h3><p>{mod[1]}</p></div><div className="glassCard"><h3>{t.roadmap}</h3><p>{mod[2]}</p></div><div className="glassCard"><h3>{t.integration}</h3><p>{t.ecosystemIntegration}</p></div></div></section>}





function App(){const [lang,setLang]=useLang();const [active,setActiveState]=useState(initialSection);const [aux,setAuxState]=useState(initialAux);const t=useMemo(()=>DATA[lang]||DATA.es,[lang]);usePageMeta(lang,active,aux);function setActive(id){setActiveState(id);setAuxState('');localStorage.setItem(SECTION_KEY,id);const u=new URL(location.href);u.searchParams.delete('aux');if(id==='home'){u.searchParams.delete('section');u.hash='';}else{u.searchParams.set('section',id);u.hash='';}history.pushState({},'',u)}useEffect(()=>{const onPop=()=>{setActiveState(initialSection());setAuxState(initialAux())};window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);const legalView=active==='legal';return <><Header t={t} lang={lang} setLang={setLang} active={active} setActive={setActive} languages={LANGUAGES}/><main>{!legalView&&<Hero t={t} active={active} setActive={setActive} moduleMap={MODULE_MAP} imageBase={IM}/>} {!legalView&&active==='home'&&<Modules t={t} active={active} setActive={setActive} modules={MODULES} imageBase={IM}/>}<GenericPanel t={t} active={active} lang={lang} aux={aux}/>{!legalView&&<Values t={t}/>}<Notice t={t}/></main><Footer t={t} lang={lang}/></>}

const relativePath = siteRelativePath();
const RootComponent =
  relativePath === "/auth/callback"
    ? AuthCallback
    : relativePath === "/account"
      ? AccountPanel
      : relativePath.startsWith("/player/")
        ? PlayerProfile
        : App;

createRoot(document.getElementById('root')).render(<RootComponent/>);
