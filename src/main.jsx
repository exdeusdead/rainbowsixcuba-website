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
  Sparkles,
  Activity,
  Building2,
  Languages
} from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import './styles.css';

const LANGUAGES = [
  { code: 'es', short: 'ES', name: 'Español', flag: '🇨🇺' },
  { code: 'en', short: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'fr', short: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de', short: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', short: '中文', name: '中文', flag: '🇨🇳' },
  { code: 'ja', short: '日本語', name: '日本語', flag: '🇯🇵' }
];

const dictionary = {
  es: {
    nav: ['Inicio', 'Comunidad', 'Eventos', 'Competitivo', 'Estadísticas', 'Coaches', 'Partners', 'Colaboradores'],
    badge: 'Comunidad competitiva cubana',
    title1: 'RAINBOW SIX',
    title2: 'CUBA',
    subtitle: 'La comunidad cubana de Rainbow Six Siege.',
    body: 'Conectamos jugadores dentro y fuera de Cuba para competir, colaborar y crecer juntos como comunidad organizada.',
    join: 'Únete al Discord',
    explore: 'Conoce la comunidad',
    stats: [
      ['3,250+', 'Miembros activos'],
      ['48+', 'Eventos proyectados'],
      ['120+', 'Equipos futuros'],
      ['2,800+', 'Partidas competitivas'],
      ['25+', 'Países representados']
    ],
    modules: {
      comunidad: ['Comunidad', 'Únete a una comunidad activa y apasionada por Rainbow Six Siege.'],
      eventos: ['Eventos', 'Torneos, scrims y actividades organizadas para fortalecer la escena.'],
      competitivo: ['Competitivo', 'Equipos, ligas y desarrollo para llevar el nivel al siguiente paso.'],
      estadisticas: ['Estadísticas', 'Rankings, KD, WR, perfiles y métricas comunitarias futuras.'],
      coaches: ['Coaches Verificados', 'Entrenadores certificados para potenciar jugadores y equipos.'],
      partners: ['Partners Verificados', 'Organizaciones, equipos aliados y colaboradores de confianza.'],
      colaboradores: ['Colaboradores', 'La comunidad no está sola. Juntos somos más fuertes.'],
      incoming: ['Próximamente', 'Nuevos proyectos, herramientas y funcionalidades en camino.'],
      privacidad: ['Privacidad', 'Tu información está protegida. Transparencia y seguridad ante todo.']
    },
    legalTitle: 'Aviso importante',
    legal: 'Rainbow Six CUBA es una comunidad independiente de fans y no está afiliada, asociada, autorizada ni respaldada por Ubisoft o Tom Clancy’s Rainbow Six Siege. Todo el contenido visual, nombres y referencias son ficticios y utilizados únicamente con fines de entretenimiento dentro del juego. Comunidad 100% apolítica.',
    footer: 'La comunidad cubana de Rainbow Six Siege.'
  },
  en: {
    nav: ['Home', 'Community', 'Events', 'Competitive', 'Statistics', 'Coaches', 'Partners', 'Collaborators'],
    badge: 'Cuban competitive community',
    title1: 'RAINBOW SIX',
    title2: 'CUBA',
    subtitle: 'The Cuban Rainbow Six Siege community.',
    body: 'We connect players inside and outside Cuba to compete, collaborate and grow together as an organized community.',
    join: 'Join Discord',
    explore: 'Explore Community',
    stats: [
      ['3,250+', 'Active members'],
      ['48+', 'Projected events'],
      ['120+', 'Future teams'],
      ['2,800+', 'Competitive matches'],
      ['25+', 'Represented countries']
    ],
    modules: {
      comunidad: ['Community', 'Join an active community passionate about Rainbow Six Siege.'],
      eventos: ['Events', 'Tournaments, scrims and activities built to strengthen the scene.'],
      competitivo: ['Competitive', 'Teams, leagues and development to take the level forward.'],
      estadisticas: ['Statistics', 'Future rankings, KD, WR, profiles and community metrics.'],
      coaches: ['Verified Coaches', 'Certified coaches to strengthen players and teams.'],
      partners: ['Verified Partners', 'Trusted organizations, allied teams and collaborators.'],
      colaboradores: ['Collaborators', 'The community is not alone. Together we are stronger.'],
      incoming: ['Incoming', 'New projects, tools and features are on the way.'],
      privacidad: ['Privacy', 'Your information is protected. Transparency and security first.']
    },
    legalTitle: 'Important notice',
    legal: 'Rainbow Six CUBA is an independent fan community and is not affiliated, associated, authorized or endorsed by Ubisoft or Tom Clancy’s Rainbow Six Siege. All visual content, names and references are fictional and used only for in-game entertainment. 100% apolitical community.',
    footer: 'The Cuban Rainbow Six Siege community.'
  },
  fr: {
    nav: ['Accueil', 'Communauté', 'Événements', 'Compétitif', 'Statistiques', 'Coachs', 'Partenaires', 'Collaborateurs'],
    badge: 'Communauté compétitive cubaine',
    title1: 'RAINBOW SIX',
    title2: 'CUBA',
    subtitle: 'La communauté cubaine de Rainbow Six Siege.',
    body: 'Nous connectons les joueurs à Cuba et à l’étranger pour jouer, collaborer et grandir ensemble.',
    join: 'Rejoindre Discord',
    explore: 'Découvrir',
    stats: [['3,250+', 'Membres actifs'], ['48+', 'Événements'], ['120+', 'Équipes futures'], ['2,800+', 'Matchs compétitifs'], ['25+', 'Pays représentés']],
    modules: {
      comunidad: ['Communauté', 'Un espace actif pour les joueurs passionnés de Rainbow Six Siege.'],
      eventos: ['Événements', 'Tournois, scrims et activités communautaires.'],
      competitivo: ['Compétitif', 'Équipes, ligues et développement compétitif.'],
      estadisticas: ['Statistiques', 'Classements, profils et métriques futures.'],
      coaches: ['Coachs Vérifiés', 'Coachs certifiés pour développer les joueurs.'],
      partners: ['Partenaires Vérifiés', 'Organisations alliées et collaborateurs de confiance.'],
      colaboradores: ['Collaborateurs', 'La communauté n’est pas seule. Ensemble nous sommes plus forts.'],
      incoming: ['À venir', 'Nouveaux projets et outils en route.'],
      privacidad: ['Confidentialité', 'Protection des données et transparence.']
    },
    legalTitle: 'Avis important',
    legal: 'Rainbow Six CUBA est une communauté indépendante de fans, non affiliée à Ubisoft ou Tom Clancy’s Rainbow Six Siege. Tout contenu visuel est fictif et utilisé uniquement à des fins de divertissement. Communauté 100% apolitique.',
    footer: 'La communauté cubaine de Rainbow Six Siege.'
  },
  de: {
    nav: ['Start', 'Community', 'Events', 'Wettkampf', 'Statistiken', 'Coaches', 'Partner', 'Mitwirkende'],
    badge: 'Kubanische Wettkampf-Community',
    title1: 'RAINBOW SIX',
    title2: 'CUBA',
    subtitle: 'Die kubanische Rainbow Six Siege Community.',
    body: 'Wir verbinden Spieler innerhalb und außerhalb Kubas, um gemeinsam zu wachsen.',
    join: 'Discord beitreten',
    explore: 'Community ansehen',
    stats: [['3,250+', 'Aktive Mitglieder'], ['48+', 'Events'], ['120+', 'Zukünftige Teams'], ['2,800+', 'Matches'], ['25+', 'Länder']],
    modules: {
      comunidad: ['Community', 'Eine aktive Community für Rainbow Six Siege Spieler.'],
      eventos: ['Events', 'Turniere, Scrims und Community-Aktivitäten.'],
      competitivo: ['Wettkampf', 'Teams, Ligen und kompetitive Entwicklung.'],
      estadisticas: ['Statistiken', 'Rankings, Profile und zukünftige Metriken.'],
      coaches: ['Verifizierte Coaches', 'Zertifizierte Trainer für Spieler und Teams.'],
      partners: ['Verifizierte Partner', 'Vertrauenswürdige Organisationen und Verbündete.'],
      colaboradores: ['Mitwirkende', 'Die Community ist nicht allein. Gemeinsam sind wir stärker.'],
      incoming: ['Demnächst', 'Neue Projekte und Tools sind unterwegs.'],
      privacidad: ['Datenschutz', 'Transparenz und sichere Datenverwaltung.']
    },
    legalTitle: 'Wichtiger Hinweis',
    legal: 'Rainbow Six CUBA ist eine unabhängige Fan-Community und nicht mit Ubisoft oder Tom Clancy’s Rainbow Six Siege verbunden. Alle visuellen Inhalte sind fiktiv und dienen nur der Unterhaltung im Gaming-Kontext. 100% apolitische Community.',
    footer: 'Die kubanische Rainbow Six Siege Community.'
  },
  zh: {
    nav: ['首页', '社区', '活动', '竞技', '统计', '教练', '伙伴', '协作者'],
    badge: '古巴竞技社区',
    title1: 'RAINBOW SIX',
    title2: 'CUBA',
    subtitle: '古巴 Rainbow Six Siege 社区。',
    body: '连接古巴境内外玩家，共同竞技、协作并成长。',
    join: '加入 Discord',
    explore: '了解社区',
    stats: [['3,250+', '活跃成员'], ['48+', '活动'], ['120+', '未来战队'], ['2,800+', '竞技比赛'], ['25+', '代表国家']],
    modules: {
      comunidad: ['社区', '面向 Rainbow Six Siege 玩家的一体化社区。'],
      eventos: ['活动', '锦标赛、训练赛和社区活动。'],
      competitivo: ['竞技', '战队、联赛和竞技发展。'],
      estadisticas: ['统计', '未来排名、资料和社区数据。'],
      coaches: ['认证教练', '帮助玩家和战队提升的认证教练。'],
      partners: ['认证伙伴', '可信组织、战队和合作伙伴。'],
      colaboradores: ['协作者', '社区并不孤单。团结更强大。'],
      incoming: ['即将上线', '新项目、工具和功能正在路上。'],
      privacidad: ['隐私', '数据保护、透明和安全。']
    },
    legalTitle: '重要说明',
    legal: 'Rainbow Six CUBA 是独立粉丝社区，与 Ubisoft 或 Tom Clancy’s Rainbow Six Siege 无关联。所有视觉内容均为虚构，仅用于游戏娱乐。社区 100% 非政治化。',
    footer: '古巴 Rainbow Six Siege 社区。'
  },
  ja: {
    nav: ['ホーム', 'コミュニティ', 'イベント', '競技', '統計', 'コーチ', 'パートナー', '協力者'],
    badge: 'キューバ競技コミュニティ',
    title1: 'RAINBOW SIX',
    title2: 'CUBA',
    subtitle: 'キューバの Rainbow Six Siege コミュニティ。',
    body: 'キューバ内外のプレイヤーをつなぎ、競技、協力、成長を支えます。',
    join: 'Discord に参加',
    explore: 'コミュニティを見る',
    stats: [['3,250+', 'アクティブメンバー'], ['48+', 'イベント'], ['120+', '将来のチーム'], ['2,800+', '競技試合'], ['25+', '代表国']],
    modules: {
      comunidad: ['コミュニティ', 'Rainbow Six Siege プレイヤーのための活動拠点。'],
      eventos: ['イベント', 'トーナメント、スクリム、コミュニティ活動。'],
      competitivo: ['競技', 'チーム、リーグ、競技発展。'],
      estadisticas: ['統計', '将来のランキング、プロフィール、データ。'],
      coaches: ['認証コーチ', '選手とチームを成長させる認証コーチ。'],
      partners: ['認証パートナー', '信頼できる団体、チーム、協力者。'],
      colaboradores: ['協力者', 'コミュニティは一人ではありません。共に強くなります。'],
      incoming: ['近日公開', '新しいプロジェクトとツールが準備中です。'],
      privacidad: ['プライバシー', 'データ保護、透明性、安全性。']
    },
    legalTitle: '重要なお知らせ',
    legal: 'Rainbow Six CUBA は独立したファンコミュニティで、Ubisoft または Tom Clancy’s Rainbow Six Siege とは関係ありません。すべてのビジュアルは架空で、ゲーム内エンターテインメント目的のみです。100% 非政治的コミュニティです。',
    footer: 'キューバの Rainbow Six Siege コミュニティ。'
  }
};

const moduleList = [
  { id: 'comunidad', image: '/assets/backgrounds/v07-community.webp', icon: Users, accent: 'red' },
  { id: 'eventos', image: '/assets/backgrounds/v07-events.webp', icon: CalendarDays, accent: 'red' },
  { id: 'competitivo', image: '/assets/backgrounds/v07-competitive.webp', icon: Trophy, accent: 'gold' },
  { id: 'estadisticas', image: '/assets/backgrounds/v07-stats.webp', icon: BarChart3, accent: 'blue' },
  { id: 'coaches', image: '/assets/backgrounds/v07-coaches.webp', icon: GraduationCap, accent: 'purple' },
  { id: 'partners', image: '/assets/backgrounds/v07-partners.webp', icon: BadgeCheck, accent: 'green' },
  { id: 'colaboradores', image: '/assets/backgrounds/v07-collaborators.webp', icon: Handshake, accent: 'red' },
  { id: 'incoming', image: '/assets/backgrounds/v07-incoming.webp', icon: PackageOpen, accent: 'orange' },
  { id: 'privacidad', image: '/assets/backgrounds/v07-privacy.webp', icon: LockKeyhole, accent: 'blue' }
];

function useLanguage() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('r6cuba-language');
    if (saved && dictionary[saved]) return saved;
    const browser = navigator.language?.slice(0, 2);
    return dictionary[browser] ? browser : SITE_CONFIG.defaultLanguage || 'es';
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
      <span className="brand-text">
        <strong>RAINBOW SIX</strong>
        <strong>CUBA</strong>
      </span>
    </a>
  );
}

function LanguageSelector({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const selected = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];

  return (
    <div className="language">
      <button className="language-button" onClick={() => setOpen((value) => !value)} aria-label="Select language">
        <Globe2 size={18} />
        <span>{selected.short}</span>
        <ChevronRight size={16} />
      </button>
      {open && (
        <div className="language-menu">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLanguage(item.code);
                setOpen(false);
              }}
              className={item.code === language ? 'is-current' : ''}
            >
              <span>{item.flag}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ t, language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ['#inicio', t.nav[0]],
    ['#comunidad', t.nav[1]],
    ['#eventos', t.nav[2]],
    ['#competitivo', t.nav[3]],
    ['#estadisticas', t.nav[4]],
    ['#coaches', t.nav[5]],
    ['#partners', t.nav[6]],
    ['#colaboradores', t.nav[7]]
  ];

  return (
    <header className="site-header">
      <Logo />
      <button className="mobile-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={menuOpen ? 'open' : ''}>
        {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <a className="discord-button" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          Discord
        </a>
      </div>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="social-rail" aria-hidden="true">
        <MessageCircle />
        <Globe2 />
        <Sparkles />
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <Shield size={18} />
          {t.badge}
        </div>
        <h1>
          <span>{t.title1}</span>
          <strong>{t.title2}</strong>
        </h1>
        <h2>{t.subtitle}</h2>
        <p>{t.body}</p>
        <div className="hero-cta">
          <a className="primary-cta" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
            <MessageCircle size={20} />
            {t.join}
          </a>
          <a className="secondary-cta" href="#comunidad">
            {t.explore}
            <ChevronRight size={18} />
          </a>
        </div>
      </div>

      <div className="stats-bar">
        {t.stats.map(([value, label], index) => {
          const icons = [Users, CalendarDays, Trophy, BarChart3, Globe2];
          const Icon = icons[index] || Activity;
          return (
            <div className="stat" key={label}>
              <Icon size={30} />
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ModuleCard({ item, t }) {
  const [title, text] = t.modules[item.id];
  const Icon = item.icon;
  return (
    <article id={item.id} className={`module-card ${item.accent}`}>
      <img src={item.image} alt="" loading="lazy" decoding="async" />
      <div className="module-shade" />
      <div className="module-content">
        <div className="module-icon"><Icon size={31} /></div>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className="module-arrow"><ChevronRight size={20} /></span>
      </div>
    </article>
  );
}

function App() {
  const [language, setLanguage] = useLanguage();
  const t = useMemo(() => dictionary[language] || dictionary.es, [language]);

  return (
    <>
      <Header t={t} language={language} setLanguage={setLanguage} />
      <main>
        <Hero t={t} />
        <section className="modules-section">
          <div className="module-grid">
            {moduleList.slice(0, 4).map((item) => <ModuleCard key={item.id} item={item} t={t} />)}
          </div>
          <div className="module-grid secondary">
            {moduleList.slice(4).map((item) => <ModuleCard key={item.id} item={item} t={t} />)}
          </div>
        </section>
        <section className="notice">
          <div className="notice-icon"><Shield size={28} /></div>
          <div>
            <h3>{t.legalTitle}</h3>
            <p>{t.legal}</p>
          </div>
          <Logo />
        </section>
      </main>
      <footer>
        <p>© 2026 Rainbow Six CUBA. {t.footer}</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
