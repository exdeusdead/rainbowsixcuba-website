import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  ChevronRight,
  Shield,
  Users,
  LockKeyhole,
  PackageOpen,
  Handshake,
  Trophy,
  MessageCircle,
  Globe2,
  AlertTriangle,
  BarChart3,
  BadgeCheck,
  GraduationCap,
  Building2,
  Languages,
  Menu,
  X,
  Sparkles,
  Crosshair,
  Radio
} from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import './styles.css';

const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'zh', label: '中文', name: '中文' },
  { code: 'ja', label: '日本語', name: '日本語' }
];

const copy = {
  es: {
    nav: ['Inicio', 'Comunidad', 'Eventos', 'Privacidad'],
    discord: 'Discord',
    badge: 'Comunidad competitiva cubana',
    titleA: 'RAINBOW', titleB: 'SIX', titleC: 'CUBA',
    heroSub: 'La comunidad cubana de Rainbow Six Siege.',
    heroBody: 'Conectamos jugadores dentro y fuera de Cuba para competir, colaborar, crecer y construir una comunidad organizada.',
    join: 'Unirse al Discord',
    explore: 'Conocer la comunidad',
    carousel: {
      comunidad: ['Comunidad', 'El centro de conexión para jugadores, equipos, coaches y miembros que quieren crecer juntos.'],
      competitivo: ['Competitivo', 'Base futura para rankings, equipos, ligas internas, scrims y desarrollo profesional.'],
      incoming: ['Incoming', 'Proyectos en camino: stats, perfiles, eventos, recursos y nuevas herramientas comunitarias.'],
      colaboradores: ['Colaboradores', 'Ninguna comunidad crece sola. Partners, coaches y aliados verificados tendrán su propio espacio.']
    },
    stats: [
      ['Jugadores activos', 'Discord como epicentro'],
      ['Eventos comunitarios', 'Scrims y torneos'],
      ['Comunidad global', 'Dentro y fuera de Cuba'],
      ['Crecimiento constante', 'Desarrollo competitivo']
    ],
    modulesTitle: 'Ecosistema Rainbow Six CUBA',
    modulesSub: 'La web queda preparada para crecer sin prometer sistemas antes de tiempo.',
    modules: {
      comunidad: ['Comunidad', 'Estadísticas comunitarias, miembros, actividad y estructura del Discord.'],
      eventos: ['Eventos', 'Scrims, torneos, actividades y calendario comunitario.'],
      competitivo: ['Competitivo', 'Equipos, rankings, reclutamiento, ligas internas y desarrollo.'],
      stats: ['Estadísticas', 'Futura conexión con Stats Bot, API, perfiles y métricas públicas.'],
      coaches: ['Coaches Verificados', 'Espacio futuro para coaches autorizados, experiencia y validación.'],
      partners: ['Partners Verificados', 'Colaboradores, organizaciones amigas y aliados del crecimiento comunitario.'],
      incoming: ['Incoming', 'Roadmap de funciones, drops de recursos y próximos lanzamientos.'],
      privacidad: ['Privacidad', 'Datos protegidos, transparencia y reglas claras para cada miembro.']
    },
    legalTitle: 'Aviso importante',
    legal: 'Rainbow Six CUBA es una comunidad independiente de fans. Todo contenido visual, nombres y referencias son ficticios y se utilizan únicamente con fines de entretenimiento y ambientación dentro del contexto gaming. La comunidad es 100% apolítica: nuestro enfoque es el juego, el respeto y el crecimiento de nuestra comunidad.',
    footer: 'La comunidad cubana de Rainbow Six Siege.'
  },
  en: {
    nav: ['Home', 'Community', 'Events', 'Privacy'],
    discord: 'Discord',
    badge: 'Cuban competitive community',
    titleA: 'RAINBOW', titleB: 'SIX', titleC: 'CUBA',
    heroSub: 'The Cuban Rainbow Six Siege community.',
    heroBody: 'We connect players inside and outside Cuba to compete, collaborate, grow, and build an organized community.',
    join: 'Join Discord',
    explore: 'Explore Community',
    carousel: {
      comunidad: ['Community', 'A connection hub for players, teams, coaches and members who want to grow together.'],
      competitivo: ['Competitive', 'Future base for rankings, teams, internal leagues, scrims and competitive development.'],
      incoming: ['Incoming', 'Upcoming projects: stats, profiles, events, resources and new community tools.'],
      colaboradores: ['Collaborators', 'No community grows alone. Verified partners, coaches and allies will have their own space.']
    },
    stats: [
      ['Active players', 'Discord as the hub'],
      ['Community events', 'Scrims and tournaments'],
      ['Global community', 'Inside and outside Cuba'],
      ['Constant growth', 'Competitive development']
    ],
    modulesTitle: 'Rainbow Six CUBA Ecosystem',
    modulesSub: 'The website is ready to grow without promising systems too early.',
    modules: {
      comunidad: ['Community', 'Community statistics, members, activity and Discord structure.'],
      eventos: ['Events', 'Scrims, tournaments, activities and community calendar.'],
      competitivo: ['Competitive', 'Teams, rankings, recruitment, internal leagues and development.'],
      stats: ['Statistics', 'Future Stats Bot, API, profiles and public metrics integration.'],
      coaches: ['Verified Coaches', 'Future space for authorized coaches, experience and validation.'],
      partners: ['Verified Partners', 'Collaborators, friendly organizations and growth allies.'],
      incoming: ['Incoming', 'Feature roadmap, resource drops and upcoming releases.'],
      privacidad: ['Privacy', 'Protected data, transparency and clear rules for every member.']
    },
    legalTitle: 'Important notice',
    legal: 'Rainbow Six CUBA is an independent fan community. All visual content, names and references are fictional and used only for entertainment and gaming atmosphere. The community is 100% apolitical: our focus is gaming, respect and community growth.',
    footer: 'The Cuban Rainbow Six Siege community.'
  },
  fr: {
    nav: ['Accueil', 'Communauté', 'Événements', 'Confidentialité'],
    discord: 'Discord',
    badge: 'Communauté compétitive cubaine',
    titleA: 'RAINBOW', titleB: 'SIX', titleC: 'CUBA',
    heroSub: 'La communauté cubaine de Rainbow Six Siege.',
    heroBody: 'Nous connectons les joueurs à Cuba et à l’étranger pour jouer, collaborer et construire une communauté organisée.',
    join: 'Rejoindre Discord',
    explore: 'Découvrir',
    carousel: {
      comunidad: ['Communauté', 'Un point de rencontre pour joueurs, équipes, coaches et membres.'],
      competitivo: ['Compétitif', 'Base future pour classements, équipes, ligues internes et scrims.'],
      incoming: ['Incoming', 'Projets à venir: statistiques, profils, événements et ressources.'],
      colaboradores: ['Collaborateurs', 'Aucune communauté ne grandit seule. Partenaires et coaches vérifiés auront leur espace.']
    },
    stats: [['Joueurs actifs','Discord au centre'],['Événements','Scrims et tournois'],['Communauté globale','À Cuba et ailleurs'],['Croissance','Développement compétitif']],
    modulesTitle: 'Écosystème Rainbow Six CUBA',
    modulesSub: 'Le site est prêt à évoluer progressivement.',
    modules: {
      comunidad: ['Communauté', 'Statistiques, membres, activité et structure Discord.'],
      eventos: ['Événements', 'Scrims, tournois, activités et calendrier.'],
      competitivo: ['Compétitif', 'Équipes, classements, recrutement et ligues internes.'],
      stats: ['Statistiques', 'Future intégration Stats Bot, API, profils et métriques.'],
      coaches: ['Coaches vérifiés', 'Espace futur pour coaches autorisés et validés.'],
      partners: ['Partenaires vérifiés', 'Collaborateurs, organisations amies et alliés.'],
      incoming: ['Incoming', 'Roadmap, ressources et prochaines sorties.'],
      privacidad: ['Confidentialité', 'Données protégées et règles claires.']
    },
    legalTitle: 'Avis important',
    legal: 'Rainbow Six CUBA est une communauté indépendante de fans. Le contenu visuel et les références sont fictifs et utilisés uniquement dans un contexte gaming. La communauté est 100% apolitique.',
    footer: 'La communauté cubaine de Rainbow Six Siege.'
  },
  de: {
    nav: ['Start', 'Community', 'Events', 'Datenschutz'],
    discord: 'Discord',
    badge: 'Kubanische Competitive-Community',
    titleA: 'RAINBOW', titleB: 'SIX', titleC: 'CUBA',
    heroSub: 'Die kubanische Rainbow Six Siege Community.',
    heroBody: 'Wir verbinden Spieler innerhalb und außerhalb Kubas, um gemeinsam zu spielen, zu wachsen und eine organisierte Community aufzubauen.',
    join: 'Discord beitreten',
    explore: 'Community ansehen',
    carousel: {
      comunidad: ['Community', 'Zentrale Verbindung für Spieler, Teams, Coaches und Mitglieder.'],
      competitivo: ['Competitive', 'Zukünftige Basis für Rankings, Teams, interne Ligen und Scrims.'],
      incoming: ['Incoming', 'Kommende Projekte: Stats, Profile, Events, Ressourcen und Tools.'],
      colaboradores: ['Partner', 'Keine Community wächst allein. Verifizierte Partner und Coaches bekommen eigenen Raum.']
    },
    stats: [['Aktive Spieler','Discord als Zentrum'],['Events','Scrims und Turniere'],['Globale Community','In und außerhalb Kubas'],['Wachstum','Competitive Entwicklung']],
    modulesTitle: 'Rainbow Six CUBA Ökosystem',
    modulesSub: 'Die Website ist bereit, Schritt für Schritt zu wachsen.',
    modules: {
      comunidad: ['Community', 'Statistiken, Mitglieder, Aktivität und Discord-Struktur.'],
      eventos: ['Events', 'Scrims, Turniere, Aktivitäten und Kalender.'],
      competitivo: ['Competitive', 'Teams, Rankings, Recruiting und interne Ligen.'],
      stats: ['Statistiken', 'Zukünftige Stats Bot, API, Profile und Metriken.'],
      coaches: ['Verifizierte Coaches', 'Zukünftiger Bereich für autorisierte Coaches.'],
      partners: ['Verifizierte Partner', 'Partner, Organisationen und Community-Allies.'],
      incoming: ['Incoming', 'Roadmap, Ressourcen-Drops und nächste Releases.'],
      privacidad: ['Datenschutz', 'Geschützte Daten, Transparenz und klare Regeln.']
    },
    legalTitle: 'Wichtiger Hinweis',
    legal: 'Rainbow Six CUBA ist eine unabhängige Fan-Community. Alle visuellen Inhalte und Referenzen sind fiktiv und dienen ausschließlich der Gaming-Atmosphäre. Die Community ist 100% apolitisch.',
    footer: 'Die kubanische Rainbow Six Siege Community.'
  },
  zh: {
    nav: ['首页', '社区', '活动', '隐私'],
    discord: 'Discord',
    badge: '古巴竞技社区',
    titleA: 'RAINBOW', titleB: 'SIX', titleC: 'CUBA',
    heroSub: '古巴 Rainbow Six Siege 社区。',
    heroBody: '连接古巴境内外玩家，共同竞技、协作、成长，并建立有组织的社区。',
    join: '加入 Discord',
    explore: '了解社区',
    carousel: {
      comunidad: ['社区', '玩家、战队、教练和成员共同成长的连接中心。'],
      competitivo: ['竞技', '未来用于排名、战队、内部联赛和训练赛的基础。'],
      incoming: ['即将上线', '即将推出：数据、资料页、活动、资源和社区工具。'],
      colaboradores: ['协作者', '没有社区能独自成长。认证伙伴和教练将拥有专属空间。']
    },
    stats: [['活跃玩家','以 Discord 为中心'],['社区活动','训练赛和锦标赛'],['全球社区','古巴内外'],['持续成长','竞技发展']],
    modulesTitle: 'Rainbow Six CUBA 生态系统',
    modulesSub: '网站已为未来扩展做好准备。',
    modules: {
      comunidad: ['社区', '社区统计、成员、活动和 Discord 架构。'],
      eventos: ['活动', '训练赛、锦标赛、活动和社区日历。'],
      competitivo: ['竞技', '战队、排名、招募和内部联赛。'],
      stats: ['统计', '未来连接 Stats Bot、API、玩家资料和公开指标。'],
      coaches: ['认证教练', '未来用于授权教练和验证经验的空间。'],
      partners: ['认证合作伙伴', '合作组织和社区支持者。'],
      incoming: ['即将上线', '路线图、资源投放和未来版本。'],
      privacidad: ['隐私', '数据保护、透明度和明确规则。']
    },
    legalTitle: '重要说明',
    legal: 'Rainbow Six CUBA 是独立粉丝社区。所有视觉内容、名称和引用均为虚构，仅用于游戏氛围和娱乐。社区保持 100% 非政治化。',
    footer: '古巴 Rainbow Six Siege 社区。'
  },
  ja: {
    nav: ['ホーム', 'コミュニティ', 'イベント', 'プライバシー'],
    discord: 'Discord',
    badge: 'キューバ競技コミュニティ',
    titleA: 'RAINBOW', titleB: 'SIX', titleC: 'CUBA',
    heroSub: 'キューバの Rainbow Six Siege コミュニティ。',
    heroBody: 'キューバ内外のプレイヤーをつなぎ、競技、協力、成長のための組織的なコミュニティを作ります。',
    join: 'Discord に参加',
    explore: 'コミュニティを見る',
    carousel: {
      comunidad: ['コミュニティ', 'プレイヤー、チーム、コーチ、メンバーが共に成長する中心地。'],
      competitivo: ['競技', 'ランキング、チーム、内部リーグ、スクリムの将来基盤。'],
      incoming: ['Incoming', '統計、プロフィール、イベント、リソース、ツールが今後登場。'],
      colaboradores: ['協力者', 'コミュニティは一人では成長しません。認証パートナーとコーチの場を準備。']
    },
    stats: [['アクティブプレイヤー','Discord が中心'],['イベント','スクリムとトーナメント'],['グローバルコミュニティ','キューバ内外'],['継続的成長','競技発展']],
    modulesTitle: 'Rainbow Six CUBA エコシステム',
    modulesSub: 'サイトは将来の拡張に対応できる構成です。',
    modules: {
      comunidad: ['コミュニティ', '統計、メンバー、活動、Discord 構造。'],
      eventos: ['イベント', 'スクリム、トーナメント、活動、カレンダー。'],
      competitivo: ['競技', 'チーム、ランキング、募集、内部リーグ。'],
      stats: ['統計', 'Stats Bot、API、プロフィール、公開指標との将来連携。'],
      coaches: ['認証コーチ', '認証済みコーチと経験確認の将来スペース。'],
      partners: ['認証パートナー', '協力者、団体、成長を支える仲間。'],
      incoming: ['Incoming', 'ロードマップ、リソース、次期リリース。'],
      privacidad: ['プライバシー', 'データ保護、透明性、明確なルール。']
    },
    legalTitle: '重要なお知らせ',
    legal: 'Rainbow Six CUBA は独立したファンコミュニティです。すべてのビジュアル、名称、参照は架空であり、ゲーム演出と娯楽目的のみに使用されます。コミュニティは完全に非政治的です。',
    footer: 'キューバの Rainbow Six Siege コミュニティ。'
  }
};

const slides = [
  {
    id: 'comunidad',
    image: '/assets/backgrounds/scene-community.webp',
    thumb: '/assets/backgrounds/scene-community-thumb.webp',
    icon: Users
  },
  {
    id: 'competitivo',
    image: '/assets/backgrounds/scene-competitivo.webp',
    thumb: '/assets/backgrounds/scene-competitivo-thumb.webp',
    icon: Trophy
  },
  {
    id: 'incoming',
    image: '/assets/backgrounds/scene-incoming.webp',
    thumb: '/assets/backgrounds/scene-incoming-thumb.webp',
    icon: PackageOpen
  },
  {
    id: 'colaboradores',
    image: '/assets/backgrounds/scene-collaborators.webp',
    thumb: '/assets/backgrounds/scene-collaborators-thumb.webp',
    icon: Handshake
  }
];

const moduleData = [
  { id: 'comunidad', icon: Users, image: '/assets/backgrounds/scene-community-thumb.webp', color: 'blue' },
  { id: 'eventos', icon: CalendarDays, image: '/assets/backgrounds/scene-incoming-thumb.webp', color: 'red' },
  { id: 'competitivo', icon: Trophy, image: '/assets/backgrounds/scene-competitivo-thumb.webp', color: 'gold' },
  { id: 'stats', icon: BarChart3, image: '/assets/backgrounds/scene-estructura-thumb.webp', color: 'green' },
  { id: 'coaches', icon: GraduationCap, image: '/assets/backgrounds/scene-identidad-thumb.webp', color: 'purple' },
  { id: 'partners', icon: BadgeCheck, image: '/assets/backgrounds/scene-collaborators-thumb.webp', color: 'blue' },
  { id: 'incoming', icon: PackageOpen, image: '/assets/backgrounds/scene-incoming-thumb.webp', color: 'red' },
  { id: 'privacidad', icon: LockKeyhole, image: '/assets/backgrounds/scene-estructura-thumb.webp', color: 'purple' }
];

function LogoMark() {
  return (
    <div className="brand">
      <div className="logo-mark"><span>6</span></div>
      <div>
        <strong>RAINBOW SIX</strong>
        <strong>CUBA</strong>
      </div>
    </div>
  );
}

function usePreferredLanguage() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('r6cuba-lang');
    if (saved && copy[saved]) return saved;
    const browser = (navigator.language || 'es').slice(0, 2);
    return copy[browser] ? browser : 'es';
  });

  const changeLang = (value) => {
    setLang(value);
    localStorage.setItem('r6cuba-lang', value);
  };

  return [lang, changeLang];
}

function Header({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <LogoMark />
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? 'open' : ''}>
        {t.nav.map((item) => <a href="#" key={item}>{item}</a>)}
        <div className="language-select">
          <Languages size={16} />
          <select value={lang} onChange={(event) => setLang(event.target.value)} aria-label="Language">
            {LANGUAGES.map((language) => (
              <option key={language.code} value={language.code}>{language.label}</option>
            ))}
          </select>
        </div>
        <a className="discord-pill" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> {t.discord}
        </a>
      </nav>
    </header>
  );
}

function Hero({ t }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  const slideCopy = t.carousel[slide.id];
  const SlideIcon = slide.icon;

  return (
    <section className="hero">
      {slides.map((item, index) => (
        <div
          key={item.id}
          className={`hero-bg ${index === active ? 'active' : ''}`}
          style={{ backgroundImage: `url(${item.image})` }}
        />
      ))}
      <div className="hero-overlay" />
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><Shield size={16} /> {t.badge}</div>
          <h1>
            <span>{t.titleA}</span>
            <span>{t.titleB}</span>
            <span className="red">{t.titleC}</span>
          </h1>
          <h2>{t.heroSub}</h2>
          <p>{t.heroBody}</p>
          <div className="hero-actions">
            <a className="btn primary pulse" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> {t.join}
            </a>
            <a className="btn secondary" href="#ecosystem">
              {t.explore} <ChevronRight size={19} />
            </a>
          </div>
        </div>

        <aside className="slide-status">
          <div className="status-card">
            <SlideIcon size={34} />
            <strong>{slideCopy[0]}</strong>
            <span>{slideCopy[1]}</span>
          </div>
          <div className="slide-index">
            {slides.map((item, index) => (
              <button
                key={item.id}
                className={index === active ? 'active' : ''}
                onClick={() => setActive(index)}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="stat-row">
        {t.stats.map(([label, value], index) => {
          const Icon = [Users, CalendarDays, Globe2, Crosshair][index];
          return (
            <div className="mini-stat" key={label}>
              <Icon size={24} />
              <div><strong>{label}</strong><span>{value}</span></div>
            </div>
          );
        })}
      </div>

      <div className="scene-strip">
        {slides.map((item, index) => {
          const Icon = item.icon;
          const itemCopy = t.carousel[item.id];
          return (
            <button key={item.id} className={`scene-card ${index === active ? 'active' : ''}`} onClick={() => setActive(index)}>
              <img src={item.thumb} alt={itemCopy[0]} loading="lazy" />
              <div>
                <Icon size={20} />
                <strong>{itemCopy[0]}</strong>
                <span>{itemCopy[1]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Ecosystem({ t }) {
  return (
    <section id="ecosystem" className="section">
      <div className="section-head">
        <span><Sparkles size={16} /> {SITE_CONFIG.communityName}</span>
        <h2>{t.modulesTitle}</h2>
        <p>{t.modulesSub}</p>
      </div>

      <div className="module-grid">
        {moduleData.map((module) => {
          const Icon = module.icon;
          const moduleCopy = t.modules[module.id];
          return (
            <article className={`module-card ${module.color}`} key={module.id}>
              <img src={module.image} alt={moduleCopy[0]} loading="lazy" />
              <div className="module-layer" />
              <div className="module-content">
                <div className="module-icon"><Icon size={28} /></div>
                <h3>{moduleCopy[0]}</h3>
                <p>{moduleCopy[1]}</p>
                <ChevronRight className="module-arrow" size={24} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LegalNotice({ t }) {
  return (
    <section className="legal-notice">
      <AlertTriangle size={18} />
      <div>
        <strong>{t.legalTitle}</strong>
        <p>{t.legal}</p>
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = usePreferredLanguage();
  const t = useMemo(() => copy[lang] || copy.es, [lang]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Ecosystem t={t} />
        <LegalNotice t={t} />
      </main>
      <footer className="footer">
        <LogoMark />
        <span>{t.footer}</span>
        <a href={SITE_CONFIG.discord} target="_blank" rel="noreferrer"><Radio size={16} /> Discord</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
