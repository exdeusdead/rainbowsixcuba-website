import { CGP_API } from "../config/apiConfig";
import React, { useEffect, useState } from "react";
import { APP_COPY, assetPath, getLanguage, siteRelativePath, withLang } from "../i18n";

function rankIcon(rankName) {
  if (!rankName) return null;

  const rank = rankName.toLowerCase();
  if (rank.includes("champion")) return assetPath("/ranks/rank_champion.png");
  if (rank.includes("diamond")) return assetPath("/ranks/rank_diamond.png");
  if (rank.includes("emerald")) return assetPath("/ranks/rank_emerald.png");
  if (rank.includes("platinum")) return assetPath("/ranks/rank_platinum.png");
  if (rank.includes("gold")) return assetPath("/ranks/rank_gold.png");
  if (rank.includes("silver")) return assetPath("/ranks/rank_silver.png");
  if (rank.includes("bronze")) return assetPath("/ranks/rank_bronze.png");
  if (rank.includes("copper")) return assetPath("/ranks/rank_copper.png");

  return null;
}

export default function PlayerProfile() {
  const [lang] = useState(getLanguage);
  const t = (APP_COPY[lang] || APP_COPY.es).player;
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    const name = siteRelativePath().replace("/player/", "").trim();

    fetch(
      `${CGP_API}/stats/player-name/${encodeURIComponent(name)}`
    )
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || data.message || `HTTP ${response.status}`);
        return data;
      })
      .then(setProfile)
      .catch((loadError) => {
        console.error("Player profile failed:", loadError);
        setError(t.error);
      });
  }, [lang, t.error]);

  if (error) {
    return <section className="playerPage"><h2>{error}</h2></section>;
  }

  if (!profile) {
    return <section className="playerPage">{t.loading}</section>;
  }

  const rank = profile.overview || {};
  const recent = profile.highlights?.recentForm || {};
  const icon = rankIcon(rank.currentRank);
  const homeUrl = withLang("/", lang);
  const statsUrl = withLang("/?section=statistics", lang);
  const linked = (value) => value || t.notLinked;

  return (
    <main className="playerPage">
      <div className="playerNav">
        <a className="btn ghost" href={statsUrl}>← {t.backStats}</a>
        <a className="btn ghost" href={homeUrl}>{t.home}</a>
      </div>

      <section className="playerHero">
        <div className="playerIdentity">
          <div className="playerAvatar">{profile.ubisoftName?.[0]?.toUpperCase()}</div>
          <div>
            <span className="scoreBadge">{t.verifiedBadge}</span>
            <h1>{profile.ubisoftName}</h1>
            <p>{profile.role || t.playerFallback} · {profile.region || "N/A"}</p>
          </div>
        </div>

        <div className="playerRank">
          {icon && <img src={icon} alt={rank.currentRank} />}
          <strong>{rank.currentRank || t.unranked}</strong>
          <span>{rank.currentRp || 0} RP</span>
        </div>
      </section>

      <section className="identityGrid">
        <div className="identityCard">
          <h3>{t.identity}</h3>
          <span>✓ {t.verifiedPlayer}</span>
          <span>{t.role}: {profile.role || t.playerFallback}</span>
          <span>{t.region}: {profile.region || "N/A"}</span>
          <span>{t.cgpId}: {profile.userId}</span>
        </div>

        <div className="identityCard">
          <h3>{t.connectedAccounts}</h3>
          <span>Discord: {linked(profile.providers?.discord?.username)}</span>
          <span>Ubisoft: {linked(profile.providers?.ubisoft?.username)}</span>
          <span>FACEIT: {t.futureIntegration}</span>
        </div>
      </section>

      <section className="playerStatsGrid">
        <div><strong>{rank.seasonKd}</strong><span>KD</span></div>
        <div><strong>{rank.seasonWinRate}%</strong><span>{t.winRate}</span></div>
        <div><strong>{rank.seasonRankedMatches}</strong><span>{t.matches}</span></div>
        <div><strong>{rank.lifetimeLevel}</strong><span>{t.level}</span></div>
        <div><strong>{recent.rpDelta}</strong><span>{t.rpChange}</span></div>
      </section>

      <section className="playerSection">
        <h2>{t.topOperators}</h2>
        <div className="playerCards">
          {(profile.highlights?.topOperators || []).slice(0, 5).map((operator) => (
            <div className="glassCard" key={operator.name}>
              <h3>{operator.name}</h3>
              <p>{operator.rounds} {t.rounds}</p>
              <span>WR {operator.winRate}% · KD {operator.kd}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="playerSection">
        <h2>{t.bestMaps}</h2>
        <div className="playerCards">
          {(profile.bestMaps || []).slice(0, 5).map((map) => (
            <div className="glassCard" key={map.map}>
              <h3>{map.map}</h3>
              <p>{map.matches} {t.matches.toLowerCase()}</p>
              <span>WR {map.winRate}% · KD {map.kd}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
