const LANGUAGE_KEY = "r6cuba-language";

export const LANGUAGES = [
  { code: "es", short: "ES", flag: "🇨🇺" },
  { code: "en", short: "EN", flag: "🇺🇸" }
];

export function siteBase(pathname = location.pathname) {
  const match = pathname.match(/^(\/r\/[^/]+)(?:\/|$)/);
  return match ? `${match[1]}/` : "/";
}

export function siteRelativePath(pathname = location.pathname) {
  const match = pathname.match(/^\/r\/[^/]+(\/.*)?$/);
  return match?.[1] || pathname;
}

export function sitePath(path = "/") {
  if (!path || path.startsWith("http") || path.startsWith("#") || path.startsWith("mailto:")) {
    return path;
  }

  const base = siteBase();
  if (path === "/") return base;

  return `${base}${path.replace(/^\/+/, "")}`;
}

export function assetPath(path) {
  const asset = path.replace(/^\/?assets\//, "").replace(/^\/+/, "");
  return sitePath(`/assets/${asset}`);
}

export function getLanguage() {
  const queryLanguage = new URLSearchParams(location.search).get("lang");

  if (queryLanguage === "en") return "en";
  if (queryLanguage === "es") return "es";

  return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "es";
}

export function withLang(url, lang = getLanguage()) {
  if (!url || url.startsWith("http") || url.startsWith("#")) return url;

  const here = new URL(location.href);
  const target = new URL(sitePath(url), here);
  const reserved = new Set(["lang", "section", "code", "state", "token", "access_token", "id_token", "refresh_token", "code_verifier"]);
  for (const key of new Set(here.searchParams.keys())) {
    if (reserved.has(key.toLowerCase()) || target.searchParams.has(key)) continue;
    here.searchParams.getAll(key).forEach((value) => target.searchParams.append(key, value));
  }
  if (!target.hash && target.pathname === here.pathname &&
      target.searchParams.get("section") === here.searchParams.get("section")) target.hash = here.hash;
  target.searchParams.set("lang", lang);
  return target.pathname + target.search + target.hash;
}

export const APP_COPY = {
  es: {
    auth: {
      blocked: "Inicio de sesión bloqueado en esta vista previa: no hay una sesión segura disponible.",
      loginUnavailable: "Inicio de sesión no disponible en la demo",
      openAccount: "Abrir Mi Cuenta",
      logout: "Cerrar sesión"
    },
    account: {
      loading: "Cargando cuenta CGP...",
      notConnected: "No conectado a CGP.",
      authBlocked: "La cuenta está bloqueada en esta vista previa.",
      authBlockedCopy: "No se guardan tokens en el navegador ni se activan solicitudes de cuenta hasta disponer de un canje seguro por código y una sesión HttpOnly.",
      apiUnavailable: "API de estadísticas no disponible",
      badge: "CUENTA CGP",
      hubBadge: "CENTRO DE CUENTA CGP",
      description: "Administra tu identidad de Rainbow Six CUBA, cuentas vinculadas, estado de membresía y controles de privacidad.",
      home: "Inicio",
      tabs: ["Resumen", "Conexiones", "Rainbow Six CUBA", "Privacidad", "Cuenta"],
      membership: "Membresía",
      currentRank: "Rango actual",
      rankPoints: "Puntos de rango",
      statsStatus: "Estado de estadísticas",
      identity: "Identidad",
      linkedAccounts: "Cuentas vinculadas",
      notLinked: "No vinculada",
      synced: "Sincronizado",
      pending: "Pendiente",
      pendingSync: "Sincronización pendiente",
      membershipBadge: "Membresía Rainbow Six CUBA",
      notEnrolled: "NO INSCRITO",
      join: "Unirme a Rainbow Six CUBA",
      requirements: { discord: "Discord conectado", server: "Miembro del servidor", ubisoft: "Ubisoft vinculada", community: "Comunidad verificada", stats: "Estadísticas activadas", profile: "Perfil público" },
      privacyBadge: "Privacidad",
      privacyHeading: "Privacidad y datos",
      privacyCopy: "Aquí vivirán las opciones para perfil público, exportar datos, borrar datos y administrar el consentimiento de privacidad.",
      publicStats: "Estadísticas públicas",
      enabled: "Activadas",
      disabled: "Desactivadas",
      dataExport: "Exportación de datos",
      deleteRequest: "Solicitud de eliminación",
      comingSoon: "Próximamente",
      accountBadge: "Cuenta",
      accountHeading: "Opciones de cuenta",
      accountCopy: "Administra tu sesión CGP en este navegador.",
      logout: "Cerrar sesión",
      lastSync: "Última sincronización",
      unknown: "Desconocida",
      accountFallback: "Cuenta",
      region: "Región",
      role: "Rol"
    },
    player: {
      loading: "Cargando jugador...",
      backStats: "Estadísticas",
      home: "Inicio",
      verifiedBadge: "JUGADOR CUBANO VERIFICADO",
      playerFallback: "Jugador",
      unranked: "Sin rango",
      identity: "Identidad del jugador",
      verifiedPlayer: "Jugador cubano verificado",
      role: "Rol",
      region: "Región",
      cgpId: "ID de CGP",
      connectedAccounts: "Cuentas conectadas",
      notLinked: "No vinculada",
      futureIntegration: "Integración futura",
      winRate: "Tasa de victoria",
      matches: "Partidas",
      level: "Nivel",
      rpChange: "Cambio de RP",
      topOperators: "Operadores principales",
      bestMaps: "Mejores mapas",
      rounds: "rondas",
      error: "No fue posible cargar el perfil"
    }
  },
  en: {
    auth: {
      blocked: "Login is blocked in this preview: no secure session is available.",
      loginUnavailable: "Login unavailable in demo",
      openAccount: "Open My Account",
      logout: "Log out"
    },
    account: {
      loading: "Loading CGP account...",
      notConnected: "Not connected to CGP.",
      authBlocked: "The account area is blocked in this preview.",
      authBlockedCopy: "No browser token is stored and no account request is activated until a secure code exchange and HttpOnly session are available.",
      apiUnavailable: "Stats API unavailable",
      badge: "CGP ACCOUNT",
      hubBadge: "CGP ACCOUNT HUB",
      description: "Manage your Rainbow Six CUBA identity, linked accounts, membership status and privacy controls.",
      home: "Home",
      tabs: ["Summary", "Connections", "Rainbow Six CUBA", "Privacy", "Account"],
      membership: "Membership",
      currentRank: "Current rank",
      rankPoints: "Rank points",
      statsStatus: "Stats status",
      identity: "Identity",
      linkedAccounts: "Linked accounts",
      notLinked: "Not linked",
      synced: "Synced",
      pending: "Pending",
      pendingSync: "Pending sync",
      membershipBadge: "Rainbow Six CUBA membership",
      notEnrolled: "NOT ENROLLED",
      join: "Join Rainbow Six CUBA",
      requirements: { discord: "Discord connected", server: "Server member", ubisoft: "Ubisoft linked", community: "Community verified", stats: "Stats enabled", profile: "Public profile" },
      privacyBadge: "Privacy",
      privacyHeading: "Privacy and data",
      privacyCopy: "This area will contain options for public profiles, data export, data deletion and privacy consent management.",
      publicStats: "Public stats",
      enabled: "Enabled",
      disabled: "Disabled",
      dataExport: "Data export",
      deleteRequest: "Delete request",
      comingSoon: "Coming soon",
      accountBadge: "Account",
      accountHeading: "Account options",
      accountCopy: "Manage your CGP session in this browser.",
      logout: "Log out",
      lastSync: "Last sync",
      unknown: "Unknown",
      accountFallback: "Account",
      region: "Region",
      role: "Role"
    },
    player: {
      loading: "Loading player...",
      backStats: "Statistics",
      home: "Home",
      verifiedBadge: "VERIFIED CUBAN PLAYER",
      playerFallback: "Player",
      unranked: "Unranked",
      identity: "Player identity",
      verifiedPlayer: "Verified Cuban player",
      role: "Role",
      region: "Region",
      cgpId: "CGP ID",
      connectedAccounts: "Connected accounts",
      notLinked: "Not linked",
      futureIntegration: "Future integration",
      winRate: "Win rate",
      matches: "Matches",
      level: "Level",
      rpChange: "RP change",
      topOperators: "Top operators",
      bestMaps: "Best maps",
      rounds: "rounds",
      error: "Unable to load the profile"
    }
  }
};
