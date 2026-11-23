import { STATS_API } from "../config/apiConfig";
import React, { useEffect, useState } from "react";
import { getToken, logout } from "../auth/cgpAuth";
import {
  getMyMembership,
  joinRainbowSixCuba
} from "../services/r6MembershipService";
import { APP_COPY, getLanguage, withLang } from "../i18n";

const TAB_KEYS = ["summary", "connections", "membership", "privacy", "account"];

export default function AccountPanel() {
  const [lang] = useState(getLanguage);
  const copy = APP_COPY[lang] || APP_COPY.es;
  const t = copy.account;
  const [profile, setProfile] = useState(null);
  const [membership, setMembership] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [status, setStatus] = useState(t.loading);

  useEffect(() => {
    document.documentElement.lang = lang;

    async function load() {
      const token = getToken();

      if (!token) {
        setStatus(t.notConnected);
        return;
      }

      try {
        const res = await fetch(
          STATS_API + "/me",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!res.ok) throw new Error(t.apiUnavailable);

        const json = await res.json();
        setProfile(json.profile);

        const member = await getMyMembership();
        setMembership(member?.membership || null);
        setStatus(null);
      } catch (error) {
        setStatus(error.message || t.apiUnavailable);
      }
    }

    load();
  }, [lang, t.apiUnavailable, t.notConnected]);

  if (status) {
    return (
      <section className="scoreboardShell">
        <span className="scoreBadge">{t.badge}</span>
        <h2>{status}</h2>
      </section>
    );
  }

  const rank = profile.rank || {};
  const discord = profile.providers?.discord;
  const ubi = profile.providers?.ubisoft;
  const membershipStatus = membership?.status ? membership.status.toLowerCase() : null;
  const statusLabel = membershipStatus === "active"
    ? (lang === "es" ? "ACTIVA" : "ACTIVE")
    : membershipStatus === "pending"
      ? t.pending.toUpperCase()
      : membershipStatus?.toUpperCase() || t.notEnrolled;
  const linked = (value) => value || t.notLinked;
  const homeUrl = withLang("/", lang);

  return (
    <section className="scoreboardShell">
      <div className="scoreHeader">
        <div>
          <span className="scoreBadge">{t.hubBadge}</span>
          <h2>{profile.ubisoftName || profile.discordTag || t.accountFallback}</h2>
          <p>{t.description}</p>
        </div>

        <button className="btn ghost" onClick={() => { window.location.href = homeUrl; }}>
          {t.home}
        </button>
      </div>

      <div className="scoreTabs">
        {TAB_KEYS.map((key, index) => (
          <button key={key} className={activeTab === key ? "tab active" : "tab"} onClick={() => setActiveTab(key)}>
            {t.tabs[index]}
          </button>
        ))}
      </div>

      {activeTab === "summary" && (
        <>
          <div className="scoreSummary">
            <div><strong>{membershipStatus || t.pending.toLowerCase()}</strong><span>{t.membership}</span></div>
            <div><strong>{rank.currentRank || "N/A"}</strong><span>{t.currentRank}</span></div>
            <div><strong>{rank.currentRp || "N/A"}</strong><span>{t.rankPoints}</span></div>
            <div><strong>{profile.metadata?.lastSyncedAt ? t.synced : t.pending}</strong><span>{t.statsStatus}</span></div>
          </div>

          <div className="profileCard">
            <div className="avatarRank">{profile.ubisoftName?.[0]?.toUpperCase() || "?"}</div>
            <div>
              <span className="scoreBadge">{t.identity}</span>
              <h3>{profile.ubisoftName || profile.discordTag}</h3>
              <div className="profileStats">
                <span>Discord: {linked(discord?.username)}</span>
                <span>Ubisoft: {linked(ubi?.username || profile.ubisoftName)}</span>
                <span>{t.region}: {profile.region || "N/A"}</span>
                <span>{t.role}: {profile.role || "N/A"}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "connections" && (
        <div className="profileCard">
          <div className="miniLogo">🔗</div>
          <div>
            <span className="scoreBadge">{t.linkedAccounts}</span>
            <h3>{t.tabs[1]}</h3>
            <div className="profileStats">
              <span>Discord: {discord?.username ? `✅ ${discord.username}` : `❌ ${t.notLinked}`}</span>
              <span>Ubisoft: {(ubi?.username || profile.ubisoftName) ? `✅ ${ubi?.username || profile.ubisoftName}` : `❌ ${t.notLinked}`}</span>
              <span>Companion: {profile.metadata?.lastSyncedAt ? `✅ ${t.synced}` : `⏳ ${t.pendingSync}`}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "membership" && (
        <div className="profileCard">
          <div className="miniLogo">{membershipStatus === "active" ? "✓" : "!"}</div>
          <div>
            <span className="scoreBadge">{t.membershipBadge}</span>
            <h3>{statusLabel}</h3>

            {!membership && (
              <button className="btn primary" onClick={async () => { await joinRainbowSixCuba(); location.reload(); }}>
                {t.join}
              </button>
            )}

            {membership && (
              <div className="profileStats">
                <span>{t.requirements.discord}: {membership.requirements?.discordConnected ? "✅" : "❌"}</span>
                <span>{t.requirements.server}: {membership.requirements?.discordGuildMember ? "✅" : "❌"}</span>
                <span>{t.requirements.ubisoft}: {membership.requirements?.ubisoftLinked ? "✅" : "❌"}</span>
                <span>{t.requirements.community}: {membership.requirements?.communityVerified ? "✅" : "⏳"}</span>
                <span>{t.requirements.stats}: {membership.stats?.enabled ? "✅" : "❌"}</span>
                <span>{t.requirements.profile}: {membership.stats?.public ? "✅" : "❌"}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="profileCard">
          <div className="miniLogo">🔒</div>
          <div>
            <span className="scoreBadge">{t.privacyBadge}</span>
            <h3>{t.privacyHeading}</h3>
            <p>{t.privacyCopy}</p>
            <div className="profileStats">
              <span>{t.publicStats}: {membership?.stats?.public ? `✅ ${t.enabled}` : `❌ ${t.disabled}`}</span>
              <span>{t.dataExport}: {t.comingSoon}</span>
              <span>{t.deleteRequest}: {t.comingSoon}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "account" && (
        <div className="profileCard">
          <div className="miniLogo">⚙</div>
          <div>
            <span className="scoreBadge">{t.accountBadge}</span>
            <h3>{t.accountHeading}</h3>
            <p>{t.accountCopy}</p>
            <button className="btn primary" onClick={() => { logout(); window.location.href = homeUrl; }}>
              {t.logout}
            </button>
          </div>
        </div>
      )}

      <p className="scoreNote">{t.lastSync}: {profile.metadata?.lastSyncedAt || t.unknown}</p>
    </section>
  );
}
