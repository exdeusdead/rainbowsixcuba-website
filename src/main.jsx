import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Users,
  CalendarDays,
  Trophy,
  BarChart3,
  GraduationCap,
  BadgeCheck,
  Handshake,
  PackageOpen,
  LockKeyhole,
  Shield,
  MessageCircle,
  Globe2,
  ChevronRight,
  Menu,
  X,
  Activity,
  Building2,
  Radio,
  Sparkles,
  ServerCog,
  Eye
} from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import './styles.css';

const LANGUAGES = [
  { code: 'es', short: 'ES', name: 'Español', flag: '🇨🇺' },
  { code: 'en', short: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'fr', short: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de', short: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', short: 'PT', name: 'Português', flag: '🇧🇷' },
  { code: 'it', short: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', short: '中文', name: '中文', flag: '🇨🇳' },
  { code: 'ja', short: '日本語', name: '日本語', flag: '🇯🇵' }
];

const baseModulesEs = {
  comunidad: ['Comunidad', 'Conexión, actividad y crecimiento para jugadores cubanos dentro y fuera de Cuba.'],
  eventos: ['Eventos', 'Scrims, torneos, actividades y anuncios para fortalecer la escena.'],
  competitivo: ['Competitivo', 'Equipos, reclutamiento, ligas internas y preparación para competir mejor.'],
  estadisticas: ['Estadísticas', 'Módulo futuro conectado a RainbowSixCubaStats, API y perfiles públicos.'],
  coaches: ['Coaches Verificados', 'Espacio futuro para entrenadores autorizados, experiencia y validación.'],
  partners: ['Partners Verificados', 'Organizaciones, equipos y aliados confiables del crecimiento comunitario.'],
  colaboradores: ['Colaboradores', 'Ninguna comunidad crece sola. Apoyo, alianzas y cooperación internacional.'],
  incoming: ['Próximamente', 'Nuevas herramientas, drops de recursos y proyectos en desarrollo.'],
  privacidad: ['Privacidad', 'Datos protegidos, transparencia y reglas claras para cada miembro.']
};

const dictionary = {
  es: {
    nav: ['Inicio', 'Comunidad', 'Eventos', 'Competitivo', 'Estadísticas', 'Coaches', 'Partners', 'Colaboradores'],
    badge: 'Centro operativo comunitario',
    title1: 'RAINBOW SIX', title2: 'CUBA',
    subtitle: 'La comunidad cubana de Rainbow Six Siege.',
    body: 'Coordinamos jugadores, equipos, coaches y colaboradores dentro y fuera de Cuba para competir, organizarnos y crecer como una comunidad seria.',
    join: 'Únete al Discord', explore: 'Explorar comunidad',
    readiness: [
      ['Comunidad', 'en desarrollo'],
      ['Stats Bot', 'en construcción'],
      ['Coaches', 'verificación futura'],
      ['Partners', 'espacio reservado'],
      ['Roadmap', 'activo']
    ],
    modules: baseModulesEs,
    legalTitle: 'Aviso importante',
    legal: 'Rainbow Six CUBA es una comunidad independiente de fans y no está afiliada, asociada, autorizada ni respaldada por Ubisoft o Tom Clancy’s Rainbow Six Siege. Todo el contenido visual, nombres y referencias son ficticios y utilizados únicamente con fines de entretenimiento dentro del contexto gaming. Comunidad 100% apolítica.',
    soon: 'En desarrollo',
    footer: 'La comunidad cubana de Rainbow Six Siege.'
  },
  en: {
    nav: ['Home', 'Community', 'Events', 'Competitive', 'Statistics', 'Coaches', 'Partners', 'Collaborators'],
    badge: 'Community operations center',
    title1: 'RAINBOW SIX', title2: 'CUBA',
    subtitle: 'The Cuban Rainbow Six Siege community.',
    body: 'We coordinate players, teams, coaches and collaborators inside and outside Cuba to compete, organize and grow as a serious community.',
    join: 'Join Discord', explore: 'Explore community',
    readiness: [['Community','in development'],['Stats Bot','under construction'],['Coaches','future verification'],['Partners','reserved space'],['Roadmap','active']],
    modules: {
      comunidad: ['Community', 'Connection, activity and growth for Cuban players inside and outside Cuba.'],
      eventos: ['Events', 'Scrims, tournaments, activities and announcements to strengthen the scene.'],
      competitivo: ['Competitive', 'Teams, recruitment, internal leagues and preparation to compete better.'],
      estadisticas: ['Statistics', 'Future module connected to RainbowSixCubaStats, API and public profiles.'],
      coaches: ['Verified Coaches', 'Future space for authorized coaches, experience and validation.'],
      partners: ['Verified Partners', 'Trusted organizations, teams and allies for community growth.'],
      colaboradores: ['Collaborators', 'No community grows alone. Support, alliances and international cooperation.'],
      incoming: ['Incoming', 'New tools, resource drops and projects in development.'],
      privacidad: ['Privacy', 'Protected data, transparency and clear rules for every member.']
    },
    legalTitle: 'Important notice',
    legal: 'Rainbow Six CUBA is an independent fan community and is not affiliated, associated, authorized or endorsed by Ubisoft or Tom Clancy’s Rainbow Six Siege. All visual content, names and references are fictional and used only for entertainment within a gaming context. 100% apolitical community.',
    soon: 'In development', footer: 'The Cuban Rainbow Six Siege community.'
  },
  fr: {
    nav: ['Accueil', 'Communauté', 'Événements', 'Compétitif', 'Statistiques', 'Coachs', 'Partenaires', 'Collaborateurs'],
    badge: 'Centre opérationnel communautaire', title1: 'RAINBOW SIX', title2: 'CUBA',
    subtitle: 'La communauté cubaine de Rainbow Six Siege.', body: 'Nous connectons joueurs, équipes, coachs et collaborateurs pour grandir comme communauté organisée.',
    join: 'Rejoindre Discord', explore: 'Découvrir la communauté', readiness: [['Communauté','en développement'],['Stats Bot','en construction'],['Coachs','vérification future'],['Partenaires','espace réservé'],['Roadmap','active']],
    modules: {
      comunidad: ['Communauté', 'Connexion et croissance pour les joueurs cubains.'], eventos: ['Événements', 'Scrims, tournois et annonces communautaires.'], competitivo: ['Compétitif', 'Équipes, recrutement, ligues internes et préparation.'], estadisticas: ['Statistiques', 'Connexion future avec RainbowSixCubaStats et API.'], coaches: ['Coachs vérifiés', 'Espace futur pour coachs autorisés.'], partners: ['Partenaires vérifiés', 'Organisations, équipes et alliés fiables.'], colaboradores: ['Collaborateurs', 'Aucune communauté ne grandit seule.'], incoming: ['À venir', 'Nouveaux outils et projets en développement.'], privacidad: ['Confidentialité', 'Données protégées et transparence.']
    }, legalTitle: 'Avis important', legal: 'Rainbow Six CUBA est une communauté indépendante de fans, non affiliée à Ubisoft ou Tom Clancy’s Rainbow Six Siege. Les contenus sont fictifs et utilisés uniquement dans un contexte gaming. Communauté 100% apolitique.', soon: 'En développement', footer: 'La communauté cubaine de Rainbow Six Siege.'
  },
  de: {
    nav: ['Start', 'Community', 'Events', 'Wettkampf', 'Statistiken', 'Coaches', 'Partner', 'Mitwirkende'], badge: 'Community Operations Center', title1: 'RAINBOW SIX', title2: 'CUBA',
    subtitle: 'Die kubanische Rainbow Six Siege Community.', body: 'Wir verbinden Spieler, Teams, Coaches und Partner, um organisiert zu wachsen.', join: 'Discord beitreten', explore: 'Community ansehen', readiness: [['Community','in Entwicklung'],['Stats Bot','im Aufbau'],['Coaches','zukünftige Prüfung'],['Partner','reservierter Bereich'],['Roadmap','aktiv']],
    modules: { comunidad: ['Community', 'Verbindung und Wachstum für kubanische Spieler.'], eventos: ['Events', 'Scrims, Turniere und Ankündigungen.'], competitivo: ['Wettkampf', 'Teams, Recruiting, interne Ligen und Vorbereitung.'], estadisticas: ['Statistiken', 'Zukünftige Verbindung zu Stats Bot und API.'], coaches: ['Verifizierte Coaches', 'Bereich für autorisierte Coaches.'], partners: ['Verifizierte Partner', 'Vertrauenswürdige Organisationen und Teams.'], colaboradores: ['Mitwirkende', 'Keine Community wächst allein.'], incoming: ['Demnächst', 'Neue Tools und Projekte.'], privacidad: ['Datenschutz', 'Geschützte Daten und Transparenz.'] }, legalTitle: 'Wichtiger Hinweis', legal: 'Rainbow Six CUBA ist eine unabhängige Fan-Community und nicht mit Ubisoft oder Tom Clancy’s Rainbow Six Siege verbunden. Inhalte sind fiktiv und nur für Gaming-Unterhaltung bestimmt. 100% apolitisch.', soon: 'In Entwicklung', footer: 'Die kubanische Rainbow Six Siege Community.'
  },
  pt: {
    nav: ['Início', 'Comunidade', 'Eventos', 'Competitivo', 'Estatísticas', 'Coaches', 'Partners', 'Colaboradores'], badge: 'Centro operacional comunitário', title1: 'RAINBOW SIX', title2: 'CUBA', subtitle: 'A comunidade cubana de Rainbow Six Siege.', body: 'Conectamos jogadores, equipes, coaches e colaboradores para competir e crescer como comunidade organizada.', join: 'Entrar no Discord', explore: 'Explorar comunidade', readiness: [['Comunidade','em desenvolvimento'],['Stats Bot','em construção'],['Coaches','verificação futura'],['Partners','espaço reservado'],['Roadmap','ativo']], modules: { comunidad: ['Comunidade', 'Conexão e crescimento para jogadores cubanos.'], eventos: ['Eventos', 'Scrims, torneios e anúncios.'], competitivo: ['Competitivo', 'Equipes, recrutamento e ligas internas.'], estadisticas: ['Estatísticas', 'Futura conexão com Stats Bot e API.'], coaches: ['Coaches Verificados', 'Espaço futuro para coaches autorizados.'], partners: ['Partners Verificados', 'Organizações e aliados confiáveis.'], colaboradores: ['Colaboradores', 'Nenhuma comunidade cresce sozinha.'], incoming: ['Em breve', 'Novas ferramentas e projetos.'], privacidad: ['Privacidade', 'Dados protegidos e transparência.'] }, legalTitle: 'Aviso importante', legal: 'Rainbow Six CUBA é uma comunidade independente de fãs, sem afiliação com Ubisoft ou Tom Clancy’s Rainbow Six Siege. Conteúdo fictício para entretenimento gaming. Comunidade 100% apolítica.', soon: 'Em desenvolvimento', footer: 'A comunidade cubana de Rainbow Six Siege.'
  },
  it: {
    nav: ['Home', 'Community', 'Eventi', 'Competitivo', 'Statistiche', 'Coach', 'Partner', 'Collaboratori'], badge: 'Centro operativo comunitario', title1: 'RAINBOW SIX', title2: 'CUBA', subtitle: 'La community cubana di Rainbow Six Siege.', body: 'Connettiamo giocatori, team, coach e collaboratori per crescere come community organizzata.', join: 'Entra nel Discord', explore: 'Esplora community', readiness: [['Community','in sviluppo'],['Stats Bot','in costruzione'],['Coach','verifica futura'],['Partner','spazio riservato'],['Roadmap','attiva']], modules: { comunidad: ['Community', 'Connessione e crescita per giocatori cubani.'], eventos: ['Eventi', 'Scrim, tornei e annunci.'], competitivo: ['Competitivo', 'Team, reclutamento e leghe interne.'], estadisticas: ['Statistiche', 'Futura connessione con Stats Bot e API.'], coaches: ['Coach Verificati', 'Spazio futuro per coach autorizzati.'], partners: ['Partner Verificati', 'Organizzazioni e alleati affidabili.'], colaboradores: ['Collaboratori', 'Nessuna community cresce da sola.'], incoming: ['In arrivo', 'Nuovi strumenti e progetti.'], privacidad: ['Privacy', 'Dati protetti e trasparenza.'] }, legalTitle: 'Avviso importante', legal: 'Rainbow Six CUBA è una fan community indipendente, non affiliata a Ubisoft o Tom Clancy’s Rainbow Six Siege. Contenuti fittizi solo per intrattenimento gaming. Community 100% apolitica.', soon: 'In sviluppo', footer: 'La community cubana di Rainbow Six Siege.'
  },
  zh: {
    nav: ['首页','社区','活动','竞技','统计','教练','伙伴','协作者'], badge: '社区行动中心', title1: 'RAINBOW SIX', title2: 'CUBA', subtitle: '古巴 Rainbow Six Siege 社区。', body: '连接玩家、战队、教练与协作者，建立有组织的社区。', join: '加入 Discord', explore: '了解社区', readiness: [['社区','开发中'],['Stats Bot','建设中'],['教练','未来认证'],['伙伴','预留空间'],['路线图','活跃']], modules: { comunidad: ['社区', '连接和成长。'], eventos: ['活动', '训练赛、锦标赛和公告。'], competitivo: ['竞技', '战队、招募和内部联赛。'], estadisticas: ['统计', '未来连接 Stats Bot 和 API。'], coaches: ['认证教练', '未来教练认证空间。'], partners: ['认证伙伴', '可信组织和盟友。'], colaboradores: ['协作者', '社区不会独自成长。'], incoming: ['即将上线', '新工具和项目。'], privacidad: ['隐私', '数据保护和透明。'] }, legalTitle: '重要说明', legal: 'Rainbow Six CUBA 是独立粉丝社区，与 Ubisoft 或 Tom Clancy’s Rainbow Six Siege 无关联。内容为虚构，仅用于游戏娱乐。100% 非政治化。', soon: '开发中', footer: '古巴 Rainbow Six Siege 社区。'
  },
  ja: {
    nav: ['ホーム','コミュニティ','イベント','競技','統計','コーチ','パートナー','協力者'], badge: 'コミュニティ作戦センター', title1: 'RAINBOW SIX', title2: 'CUBA', subtitle: 'キューバの Rainbow Six Siege コミュニティ。', body: 'プレイヤー、チーム、コーチ、協力者をつなぎ、組織的なコミュニティを育てます。', join: 'Discord に参加', explore: 'コミュニティを見る', readiness: [['コミュニティ','開発中'],['Stats Bot','構築中'],['コーチ','将来認証'],['パートナー','予約領域'],['ロードマップ','進行中']], modules: { comunidad: ['コミュニティ', 'つながりと成長。'], eventos: ['イベント', 'スクリム、トーナメント、告知。'], competitivo: ['競技', 'チーム、募集、内部リーグ。'], estadisticas: ['統計', '将来 Stats Bot と API に接続。'], coaches: ['認証コーチ', '将来のコーチ認証スペース。'], partners: ['認証パートナー', '信頼できる組織と仲間。'], colaboradores: ['協力者', 'コミュニティは一人では成長しません。'], incoming: ['近日公開', '新しいツールとプロジェクト。'], privacidad: ['プライバシー', 'データ保護と透明性。'] }, legalTitle: '重要なお知らせ', legal: 'Rainbow Six CUBA は独立したファンコミュニティで、Ubisoft または Tom Clancy’s Rainbow Six Siege とは関係ありません。内容は架空でゲーム娯楽目的のみです。100% 非政治的です。', soon: '開発中', footer: 'キューバの Rainbow Six Siege コミュニティ。'
  }
};

const modules = [
  { id: 'comunidad', image: '/assets/backgrounds/v08-community.webp', icon: Users, accent: 'red' },
  { id: 'eventos', image: '/assets/backgrounds/v08-events.webp', icon: CalendarDays, accent: 'red' },
  { id: 'competitivo', image: '/assets/backgrounds/v08-competitive.webp', icon: Trophy, accent: 'gold' },
  { id: 'estadisticas', image: '/assets/backgrounds/v08-statistics.webp', icon: BarChart3, accent: 'blue' },
  { id: 'coaches', image: '/assets/backgrounds/v08-coaches.webp', icon: GraduationCap, accent: 'purple' },
  { id: 'partners', image: '/assets/backgrounds/v08-partners.webp', icon: BadgeCheck, accent: 'green' },
  { id: 'colaboradores', image: '/assets/backgrounds/v08-collaborators.webp', icon: Handshake, accent: 'red' },
  { id: 'incoming', image: '/assets/backgrounds/v08-incoming.webp', icon: PackageOpen, accent: 'orange' },
  { id: 'privacidad', image: '/assets/backgrounds/v08-privacy.webp', icon: LockKeyhole, accent: 'blue' }
];

function useLanguage() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('r6cuba-language');
    if (saved && dictionary[saved]) return saved;
    const browser = navigator.language?.slice(0, 2);
    return dictionary[browser] ? browser : 'es';
  });
  useEffect(() => {
    localStorage.setItem('r6cuba-language', language);
    document.documentElement.lang = language;
  }, [language]);
  return [language, setLanguage];
}

function Logo() {
  return (
    <a className="brand" href="#inicio" aria-label="Rainbow Six CUBA">
      <span className="brand-mark"><span>6</span></span>
      <span className="brand-text"><strong>RAINBOW SIX</strong><strong>CUBA</strong></span>
    </a>
  );
}

function LanguageSelector({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const selected = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];
  return (
    <div className="language">
      <button className="language-button" onClick={() => setOpen((value) => !value)} aria-label="Select language">
        <Globe2 size={17} /><span>{selected.short}</span><ChevronRight size={15} />
      </button>
      {open && <div className="language-menu">
        {LANGUAGES.map((item) => (
          <button key={item.code} onClick={() => { setLanguage(item.code); setOpen(false); }} className={item.code === language ? 'is-current' : ''}>
            <span>{item.flag}</span><span>{item.name}</span>
          </button>
        ))}
      </div>}
    </div>
  );
}

function Header({ t, language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navTargets = ['inicio','comunidad','eventos','competitivo','estadisticas','coaches','partners','colaboradores'];
  return (
    <header className="site-header">
      <Logo />
      <button className="mobile-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={menuOpen ? 'open' : ''}>
        {t.nav.map((label, index) => <a key={label} href={`#${navTargets[index]}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <a className="discord-button" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer"><MessageCircle size={18} />Discord</a>
      </div>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="inicio" className="hero">
      <picture className="hero-picture"><img src="/assets/backgrounds/v08-hero-hq.webp" alt="Rainbow Six Cuba Headquarters" /></picture>
      <div className="hero-overlay" />
      <div className="social-rail" aria-hidden="true"><Radio /><Globe2 /><Eye /></div>
      <div className="hero-content">
        <div className="hero-badge"><Shield size={18} />{t.badge}</div>
        <h1><span>{t.title1}</span><strong>{t.title2}</strong></h1>
        <h2>{t.subtitle}</h2>
        <p>{t.body}</p>
        <div className="hero-cta">
          <a className="primary-cta" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer"><MessageCircle size={20} />{t.join}</a>
          <a className="secondary-cta" href="#comunidad">{t.explore}<ChevronRight size={18} /></a>
        </div>
      </div>
      <div className="readiness-bar">
        {t.readiness.map(([label, value], index) => {
          const icons = [Users, ServerCog, GraduationCap, BadgeCheck, Activity];
          const Icon = icons[index] || Activity;
          return <div className="ready" key={label}><Icon size={26} /><div><strong>{label}</strong><span>{value}</span></div></div>;
        })}
      </div>
    </section>
  );
}

function ModuleCard({ item, t }) {
  const [title, text] = t.modules[item.id];
  const Icon = item.icon;
  return (
    <a href={`#${item.id}`} id={item.id} className={`module-card ${item.accent}`}>
      <img src={item.image} alt={title} loading="lazy" decoding="async" />
      <div className="module-shade" />
      <div className="module-content">
        <div className="module-icon"><Icon size={30} /></div>
        <div className="soon-pill">{t.soon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className="module-arrow"><ChevronRight size={20} /></span>
      </div>
    </a>
  );
}

function Modules({ t }) {
  return (
    <section className="modules-section">
      <div className="section-title"><Sparkles size={18} /><span>Community Platform</span></div>
      <div className="module-grid primary-grid">{modules.slice(0, 4).map((item) => <ModuleCard key={item.id} item={item} t={t} />)}</div>
      <div className="module-grid secondary-grid">{modules.slice(4).map((item) => <ModuleCard key={item.id} item={item} t={t} />)}</div>
    </section>
  );
}

function Notice({ t }) {
  return (
    <section className="notice">
      <div className="notice-icon"><Shield size={28} /></div>
      <div><h3>{t.legalTitle}</h3><p>{t.legal}</p></div>
      <Logo />
    </section>
  );
}

function App() {
  const [language, setLanguage] = useLanguage();
  const t = useMemo(() => dictionary[language] || dictionary.es, [language]);
  return (
    <>
      <Header t={t} language={language} setLanguage={setLanguage} />
      <main><Hero t={t} /><Modules t={t} /><Notice t={t} /></main>
      <footer><p>© 2026 Rainbow Six CUBA. {t.footer}</p></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
