
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Users, CalendarDays, Trophy, BarChart3, GraduationCap, BadgeCheck, Handshake, PackageOpen, LockKeyhole, Shield, MessageCircle, Globe2, ChevronRight, Menu, X, Activity, ServerCog, Eye, Radio, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import './styles.css';

const LANG_KEY = SITE_CONFIG.languageStorageKey || 'r6cuba-language';
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

const D = {
  es: {
    nav: ['Inicio','Comunidad','Eventos','Competitivo','Estadísticas','Coaches','Partners','Colaboradores'],
    badge: 'Centro operativo comunitario', subtitle: 'La comunidad cubana de Rainbow Six Siege.',
    body: 'Coordinamos jugadores, equipos, coaches y colaboradores dentro y fuera de Cuba para competir, organizarnos y crecer como una comunidad seria.',
    join: 'Únete al Discord', explore: 'Explorar comunidad', platform: 'Community Platform', soon: 'En desarrollo',
    readiness: [['Comunidad','en desarrollo'],['Stats Bot','en construcción'],['Coaches','verificación futura'],['Partners','espacio reservado'],['Roadmap','activo']],
    modules: {
      comunidad: ['Comunidad','Conexión, actividad y crecimiento para jugadores cubanos dentro y fuera de Cuba.'],
      eventos: ['Eventos','Scrims, torneos, actividades y anuncios para fortalecer la escena.'],
      competitivo: ['Competitivo','Equipos, reclutamiento, ligas internas y preparación para competir mejor.'],
      estadisticas: ['Estadísticas','Módulo futuro conectado a RainbowSixCubaStats, API y perfiles públicos.'],
      coaches: ['Coaches Verificados','Espacio futuro para entrenadores autorizados, experiencia y validación.'],
      partners: ['Partners Verificados','Organizaciones, equipos y aliados confiables del crecimiento comunitario.'],
      colaboradores: ['Colaboradores','Ninguna comunidad crece sola. Apoyo, alianzas y cooperación internacional.'],
      incoming: ['Próximamente','Nuevas herramientas, drops de recursos y proyectos en desarrollo.'],
      privacidad: ['Privacidad','Datos protegidos, transparencia y reglas claras para cada miembro.']
    },
    legalTitle: 'Aviso importante',
    legal: 'Rainbow Six CUBA es una comunidad independiente de fans y no está afiliada, asociada, autorizada ni respaldada por Ubisoft o Tom Clancy’s Rainbow Six Siege. Todo el contenido visual, nombres y referencias son ficticios y utilizados únicamente con fines de entretenimiento dentro del contexto gaming. Comunidad 100% apolítica.',
    footer: 'La comunidad cubana de Rainbow Six Siege.'
  },
  en: {
    nav: ['Home','Community','Events','Competitive','Statistics','Coaches','Partners','Collaborators'], badge: 'Community operations center', subtitle: 'The Cuban Rainbow Six Siege community.',
    body: 'We coordinate players, teams, coaches and collaborators inside and outside Cuba to compete, organize and grow as a serious community.', join: 'Join Discord', explore: 'Explore community', platform: 'Community Platform', soon: 'In development',
    readiness: [['Community','in development'],['Stats Bot','under construction'],['Coaches','future verification'],['Partners','reserved space'],['Roadmap','active']],
    modules: { comunidad: ['Community','Connection, activity and growth for Cuban players inside and outside Cuba.'], eventos: ['Events','Scrims, tournaments, activities and announcements to strengthen the scene.'], competitivo: ['Competitive','Teams, recruitment, internal leagues and preparation to compete better.'], estadisticas: ['Statistics','Future module connected to RainbowSixCubaStats, API and public profiles.'], coaches: ['Verified Coaches','Future space for authorized coaches, experience and validation.'], partners: ['Verified Partners','Trusted organizations, teams and allies for community growth.'], colaboradores: ['Collaborators','No community grows alone. Support, alliances and international cooperation.'], incoming: ['Incoming','New tools, resource drops and projects in development.'], privacidad: ['Privacy','Protected data, transparency and clear rules for every member.'] },
    legalTitle: 'Important notice', legal: 'Rainbow Six CUBA is an independent fan community and is not affiliated, associated, authorized or endorsed by Ubisoft or Tom Clancy’s Rainbow Six Siege. All visual content, names and references are fictional and used only for entertainment within a gaming context. 100% apolitical community.', footer: 'The Cuban Rainbow Six Siege community.'
  },
  fr: { nav: ['Accueil','Communauté','Événements','Compétitif','Statistiques','Coachs','Partenaires','Collaborateurs'], badge: 'Centre opérationnel communautaire', subtitle: 'La communauté cubaine de Rainbow Six Siege.', body: 'Nous coordonnons joueurs, équipes, coachs et collaborateurs pour grandir comme une communauté sérieuse.', join: 'Rejoindre Discord', explore: 'Découvrir la communauté', platform: 'Plateforme communautaire', soon: 'En développement', readiness: [['Communauté','en développement'],['Stats Bot','en construction'],['Coachs','vérification future'],['Partenaires','espace réservé'],['Roadmap','active']], modules: { comunidad:['Communauté','Connexion et croissance pour les joueurs cubains.'],eventos:['Événements','Scrims, tournois et annonces communautaires.'],competitivo:['Compétitif','Équipes, recrutement et ligues internes.'],estadisticas:['Statistiques','Module futur connecté à RainbowSixCubaStats, API et profils publics.'],coaches:['Coachs vérifiés','Espace futur pour coachs autorisés.'],partners:['Partenaires vérifiés','Organisations et alliés fiables.'],colaboradores:['Collaborateurs','Aucune communauté ne grandit seule.'],incoming:['À venir','Nouveaux outils et projets en développement.'],privacidad:['Confidentialité','Données protégées et transparence.']}, legalTitle:'Avis important', legal:'Rainbow Six CUBA est une communauté indépendante de fans, non affiliée à Ubisoft ou Tom Clancy’s Rainbow Six Siege. Le contenu est fictif et destiné uniquement au divertissement gaming. Communauté 100% apolitique.', footer:'La communauté cubaine de Rainbow Six Siege.' },
  de: { nav: ['Start','Community','Events','Wettkampf','Statistiken','Coaches','Partner','Mitwirkende'], badge:'Community Operations Center', subtitle:'Die kubanische Rainbow Six Siege Community.', body:'Wir koordinieren Spieler, Teams, Coaches und Partner, um organisiert zu wachsen.', join:'Discord beitreten', explore:'Community ansehen', platform:'Community-Plattform', soon:'In Entwicklung', readiness:[['Community','in Entwicklung'],['Stats Bot','im Aufbau'],['Coaches','zukünftige Prüfung'],['Partner','reservierter Bereich'],['Roadmap','aktiv']], modules:{comunidad:['Community','Verbindung und Wachstum für kubanische Spieler.'],eventos:['Events','Scrims, Turniere und Ankündigungen.'],competitivo:['Wettkampf','Teams, Recruiting und interne Ligen.'],estadisticas:['Statistiken','Zukünftiges Modul für RainbowSixCubaStats, API und öffentliche Profile.'],coaches:['Verifizierte Coaches','Bereich für autorisierte Coaches.'],partners:['Verifizierte Partner','Vertrauenswürdige Organisationen und Teams.'],colaboradores:['Mitwirkende','Keine Community wächst allein.'],incoming:['Demnächst','Neue Tools und Projekte.'],privacidad:['Datenschutz','Geschützte Daten und Transparenz.']}, legalTitle:'Wichtiger Hinweis', legal:'Rainbow Six CUBA ist eine unabhängige Fan-Community und nicht mit Ubisoft oder Tom Clancy’s Rainbow Six Siege verbunden. Inhalte sind fiktiv und nur für Gaming-Unterhaltung bestimmt. 100% apolitisch.', footer:'Die kubanische Rainbow Six Siege Community.' },
  pt: { nav:['Início','Comunidade','Eventos','Competitivo','Estatísticas','Coaches','Partners','Colaboradores'], badge:'Centro operacional comunitário', subtitle:'A comunidade cubana de Rainbow Six Siege.', body:'Coordenamos jogadores, equipes, coaches e colaboradores para competir e crescer como comunidade séria.', join:'Entrar no Discord', explore:'Explorar comunidade', platform:'Plataforma comunitária', soon:'Em desenvolvimento', readiness:[['Comunidade','em desenvolvimento'],['Stats Bot','em construção'],['Coaches','verificação futura'],['Partners','espaço reservado'],['Roadmap','ativo']], modules:{comunidad:['Comunidade','Conexão e crescimento para jogadores cubanos.'],eventos:['Eventos','Scrims, torneios e anúncios.'],competitivo:['Competitivo','Equipes, recrutamento e ligas internas.'],estadisticas:['Estatísticas','Módulo futuro conectado ao RainbowSixCubaStats, API e perfis públicos.'],coaches:['Coaches Verificados','Espaço futuro para coaches autorizados.'],partners:['Partners Verificados','Organizações e aliados confiáveis.'],colaboradores:['Colaboradores','Nenhuma comunidade cresce sozinha.'],incoming:['Em breve','Novas ferramentas e projetos.'],privacidad:['Privacidade','Dados protegidos e transparência.']}, legalTitle:'Aviso importante', legal:'Rainbow Six CUBA é uma comunidade independente de fãs, sem afiliação com Ubisoft ou Tom Clancy’s Rainbow Six Siege. Conteúdo fictício para entretenimento gaming. Comunidade 100% apolítica.', footer:'A comunidade cubana de Rainbow Six Siege.' },
  it: { nav:['Home','Community','Eventi','Competitivo','Statistiche','Coach','Partner','Collaboratori'], badge:'Centro operativo comunitario', subtitle:'La comunità cubana di Rainbow Six Siege.', body:'Coordiniamo giocatori, team, coach e collaboratori per competere e crescere.', join:'Entra nel Discord', explore:'Esplora community', platform:'Piattaforma comunitaria', soon:'In sviluppo', readiness:[['Community','in sviluppo'],['Stats Bot','in costruzione'],['Coach','verifica futura'],['Partner','spazio riservato'],['Roadmap','attiva']], modules:{comunidad:['Community','Connessione e crescita per giocatori cubani.'],eventos:['Eventi','Scrim, tornei e annunci.'],competitivo:['Competitivo','Team, reclutamento e leghe interne.'],estadisticas:['Statistiche','Modulo futuro collegato a RainbowSixCubaStats, API e profili pubblici.'],coaches:['Coach verificati','Spazio futuro per coach autorizzati.'],partners:['Partner verificati','Organizzazioni e alleati affidabili.'],colaboradores:['Collaboratori','Nessuna community cresce da sola.'],incoming:['In arrivo','Nuovi strumenti e progetti.'],privacidad:['Privacy','Dati protetti e trasparenza.']}, legalTitle:'Avviso importante', legal:'Rainbow Six CUBA è una community indipendente di fan, non affiliata a Ubisoft o Tom Clancy’s Rainbow Six Siege. Contenuto fittizio per intrattenimento gaming. Community 100% apolitica.', footer:'La comunità cubana di Rainbow Six Siege.' },
  zh: { nav:['首页','社区','活动','竞技','统计','教练','合作伙伴','协作者'], badge:'社区运营中心', subtitle:'古巴 Rainbow Six Siege 社区。', body:'我们连接古巴内外的玩家、队伍、教练与协作者，共同竞争与成长。', join:'加入 Discord', explore:'探索社区', platform:'社区平台', soon:'开发中', readiness:[['社区','开发中'],['Stats Bot','建设中'],['教练','未来认证'],['伙伴','预留空间'],['路线图','进行中']], modules:{comunidad:['社区','为古巴玩家提供连接与成长。'],eventos:['活动','训练赛、锦标赛与公告。'],competitivo:['竞技','队伍、招募与内部联赛。'],estadisticas:['统计','未来连接 RainbowSixCubaStats、API 与公开资料。'],coaches:['认证教练','未来认证教练空间。'],partners:['认证伙伴','可信组织、队伍与盟友。'],colaboradores:['协作者','没有社区能独自成长。'],incoming:['即将推出','新工具与项目开发中。'],privacidad:['隐私','数据保护与透明规则。']}, legalTitle:'重要声明', legal:'Rainbow Six CUBA 是独立粉丝社区，与 Ubisoft 或 Tom Clancy’s Rainbow Six Siege 无关联。所有内容均为虚构，仅用于游戏娱乐。100% 非政治社区。', footer:'古巴 Rainbow Six Siege 社区。' },
  ja: { nav:['ホーム','コミュニティ','イベント','競技','統計','コーチ','パートナー','協力者'], badge:'コミュニティ作戦センター', subtitle:'キューバの Rainbow Six Siege コミュニティ。', body:'キューバ内外のプレイヤー、チーム、コーチ、協力者をつなぎます。', join:'Discord に参加', explore:'コミュニティを見る', platform:'コミュニティプラットフォーム', soon:'開発中', readiness:[['コミュニティ','開発中'],['Stats Bot','構築中'],['コーチ','将来認証'],['パートナー','予約領域'],['ロードマップ','進行中']], modules:{comunidad:['コミュニティ','キューバのプレイヤーのつながりと成長。'],eventos:['イベント','スクリム、トーナメント、告知。'],competitivo:['競技','チーム、募集、内部リーグ。'],estadisticas:['統計','RainbowSixCubaStats、API、公開プロフィールに接続予定。'],coaches:['認証コーチ','将来の認証コーチ向けスペース。'],partners:['認証パートナー','信頼できる組織とチーム。'],colaboradores:['協力者','コミュニティは一人では成長しません。'],incoming:['近日公開','新しいツールとプロジェクト。'],privacidad:['プライバシー','データ保護と透明性。']}, legalTitle:'重要なお知らせ', legal:'Rainbow Six CUBA は独立したファンコミュニティで、Ubisoft または Tom Clancy’s Rainbow Six Siege とは関係ありません。内容は架空でゲーム娯楽目的のみです。100% 非政治的です。', footer:'キューバの Rainbow Six Siege コミュニティ。' }
};

const modules = [
  { id: 'comunidad', image: '/assets/backgrounds/v10-community.webp', icon: Users, accent: 'red', url: '/community.html' },
  { id: 'eventos', image: '/assets/backgrounds/v10-events.webp', icon: CalendarDays, accent: 'red', url: '/events.html' },
  { id: 'competitivo', image: '/assets/backgrounds/v10-competitive.webp', icon: Trophy, accent: 'gold', url: '/competitive.html' },
  { id: 'estadisticas', image: '/assets/backgrounds/v10-statistics.webp', icon: BarChart3, accent: 'blue', url: '/statistics.html' },
  { id: 'coaches', image: '/assets/backgrounds/v10-coaches.webp', icon: GraduationCap, accent: 'purple', url: '/coaches.html' },
  { id: 'partners', image: '/assets/backgrounds/v10-partners.webp', icon: BadgeCheck, accent: 'green', url: '/partners.html' },
  { id: 'colaboradores', image: '/assets/backgrounds/v10-collaborators.webp', icon: Handshake, accent: 'red', url: '/collaborators.html' },
  { id: 'incoming', image: '/assets/backgrounds/v10-incoming.webp', icon: PackageOpen, accent: 'orange', url: '/roadmap.html' },
  { id: 'privacidad', image: '/assets/backgrounds/v10-privacy.webp', icon: LockKeyhole, accent: 'blue', url: '/privacy.html' }
];

function initialLanguage() {
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q && D[q]) return q;
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && D[saved]) return saved;
  const browser = navigator.language?.slice(0, 2);
  return D[browser] ? browser : SITE_CONFIG.defaultLanguage;
}
function linkWithLanguage(url, lang) {
  if (!url || url.startsWith('#') || url.startsWith('http')) return url;
  const [path, hash=''] = url.split('#');
  return `${path}?lang=${encodeURIComponent(lang)}${hash ? `#${hash}` : ''}`;
}
function useLanguage() {
  const [language, setLanguage] = useState(initialLanguage);
  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
    document.documentElement.lang = language;
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== language) {
      url.searchParams.set('lang', language);
      window.history.replaceState({}, '', url);
    }
  }, [language]);
  return [language, setLanguage];
}
function Logo({ lang }) { return <a className="brand" href={linkWithLanguage('/', lang)} aria-label="Rainbow Six CUBA"><span className="brand-mark"><span>6</span></span><span className="brand-text"><strong>RAINBOW SIX</strong><strong>CUBA</strong></span></a>; }
function LanguageSelector({ language, setLanguage }) { const [open,setOpen]=useState(false); const selected=LANGUAGES.find(l=>l.code===language)||LANGUAGES[0]; return <div className="language"><button className="language-button" onClick={()=>setOpen(!open)}><Globe2 size={17}/><span>{selected.short}</span><ChevronRight size={15}/></button>{open&&<div className="language-menu">{LANGUAGES.map(item=><button key={item.code} onClick={()=>{setLanguage(item.code);setOpen(false);}} className={item.code===language?'is-current':''}><span>{item.flag}</span><span>{item.name}</span></button>)}</div>}</div>; }
function Header({t,language,setLanguage}) { const [menuOpen,setMenuOpen]=useState(false); const navTargets=['/','/community.html','/events.html','/competitive.html','/statistics.html','/coaches.html','/partners.html','/collaborators.html']; return <header className="site-header"><Logo lang={language}/><button className="mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Open navigation">{menuOpen?<X/>:<Menu/>}</button><nav className={menuOpen?'open':''}>{t.nav.map((label,i)=><a key={label} href={linkWithLanguage(navTargets[i],language)} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav><div className="header-actions"><LanguageSelector language={language} setLanguage={setLanguage}/><a className="discord-button" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer"><MessageCircle size={18}/>Discord</a></div></header>; }
function Hero({t,language}) { return <section id="inicio" className="hero"><picture className="hero-picture"><source srcSet="/assets/backgrounds/v10-hero-hq.webp" type="image/webp"/><img src="/assets/backgrounds/v10-hero-hq.webp" alt="Rainbow Six Cuba Headquarters"/></picture><div className="hero-overlay"/><div className="social-rail" aria-hidden="true"><Radio/><Globe2/><Eye/></div><div className="hero-content"><div className="hero-badge"><Shield size={18}/>{t.badge}</div><h1><span>RAINBOW</span><span>SIX</span><strong>CUBA</strong></h1><h2>{t.subtitle}</h2><p>{t.body}</p><div className="hero-cta"><a className="primary-cta" href={SITE_CONFIG.discord} target="_blank" rel="noreferrer"><MessageCircle size={20}/>{t.join}</a><a className="secondary-cta" href={linkWithLanguage('/community.html',language)}>{t.explore}<ChevronRight size={18}/></a></div></div><div className="readiness-bar">{t.readiness.map(([label,value],i)=>{const icons=[Users,ServerCog,GraduationCap,BadgeCheck,Activity];const Icon=icons[i]||Activity;return <a className="ready" key={label} href={linkWithLanguage(['/community.html','/statistics.html','/coaches.html','/partners.html','/roadmap.html'][i],language)}><Icon size={26}/><div><strong>{label}</strong><span>{value}</span></div></a>})}</div></section>; }
function ModuleCard({item,t,language}) { const [title,text]=t.modules[item.id]; const Icon=item.icon; return <a href={linkWithLanguage(item.url,language)} id={item.id} className={`module-card ${item.accent}`}><img src={item.image} alt={title} loading="lazy" decoding="async"/><div className="module-shade"/><div className="module-content"><div className="module-icon"><Icon size={30}/></div><div className="soon-pill">{t.soon}</div><h3>{title}</h3><p>{text}</p><span className="module-arrow"><ChevronRight size={20}/></span></div></a>; }
function Modules({t,language}) { return <section className="modules-section"><div className="section-title"><Sparkles size={18}/><span>{t.platform}</span></div><div className="module-grid primary-grid">{modules.slice(0,4).map(item=><ModuleCard key={item.id} item={item} t={t} language={language}/>)}</div><div className="module-grid secondary-grid">{modules.slice(4).map(item=><ModuleCard key={item.id} item={item} t={t} language={language}/>)}</div></section>; }
function Notice({t}) { return <section className="notice"><div className="notice-icon"><Shield size={28}/></div><div><h3>{t.legalTitle}</h3><p>{t.legal}</p></div><Logo lang={document.documentElement.lang || 'es'}/></section>; }
function App(){ const [language,setLanguage]=useLanguage(); const t=useMemo(()=>D[language]||D.es,[language]); return <><Header t={t} language={language} setLanguage={setLanguage}/><main><Hero t={t} language={language}/><Modules t={t} language={language}/><Notice t={t}/></main><footer><p>© 2026 Rainbow Six CUBA. {t.footer}</p></footer></>; }
createRoot(document.getElementById('root')).render(<App/>);
