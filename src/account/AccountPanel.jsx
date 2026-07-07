import React, { useEffect, useState } from "react";
import { getToken, logout } from "../auth/cgpAuth";
import {
  getMyMembership,
  joinRainbowSixCuba
} from "../services/r6MembershipService";

const TABS = [
  "Resumen",
  "Conexiones",
  "Rainbow Six CUBA",
  "Privacidad",
  "Cuenta"
];

export default function AccountPanel() {
  const [profile, setProfile] = useState(null);
  const [membership, setMembership] = useState(null);
  const [activeTab, setActiveTab] = useState("Resumen");
  const [status, setStatus] = useState("Loading CGP account...");

  useEffect(() => {
    async function load() {
      const token = getToken();

      if (!token) {
        setStatus("Not connected to CGP.");
        return;
      }

      try {
        const res = await fetch(
          "https://api.rainbowsixcuba.com/api/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          throw new Error("Stats API unavailable");
        }

        const json = await res.json();

        setProfile(json.profile);

        const member = await getMyMembership();
        setMembership(member?.membership || null);

        setStatus(null);

      } catch (e) {
        setStatus(e.message);
      }
    }

    load();
  }, []);


  if (status) {
    return (
      <section className="scoreboardShell">
        <span className="scoreBadge">CGP ACCOUNT</span>
        <h2>{status}</h2>
      </section>
    );
  }


  const rank = profile.rank || {};
  const discord = profile.providers?.discord;
  const ubi = profile.providers?.ubisoft;


  return (
    <section className="scoreboardShell">

      <div className="scoreHeader">
        <div>
          <span className="scoreBadge">CGP ACCOUNT HUB</span>
          <h2>{profile.ubisoftName || profile.discordTag || "Account"}</h2>
          <p>
            Manage your Rainbow Six CUBA identity, linked accounts,
            membership status and privacy controls.
          </p>
        </div>

        <button
          className="btn ghost"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Inicio
        </button>
      </div>


      <div className="scoreTabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>


      {activeTab === "Resumen" && (
        <>
          <div className="scoreSummary">
            <div>
              <strong>{membership?.status || "pending"}</strong>
              <span>Membership</span>
            </div>

            <div>
              <strong>{rank.currentRank || "N/A"}</strong>
              <span>Current Rank</span>
            </div>

            <div>
              <strong>{rank.currentRp || "N/A"}</strong>
              <span>Rank Points</span>
            </div>

            <div>
              <strong>{profile.metadata?.lastSyncedAt ? "Synced" : "Pending"}</strong>
              <span>Stats Status</span>
            </div>
          </div>

          <div className="profileCard">
            <div className="avatarRank">
              {profile.ubisoftName?.[0]?.toUpperCase() || "?"}
            </div>

            <div>
              <span className="scoreBadge">Identity</span>
              <h3>{profile.ubisoftName || profile.discordTag}</h3>

              <div className="profileStats">
                <span>Discord: {discord?.username || "Not linked"}</span>
                <span>Ubisoft: {ubi?.username || profile.ubisoftName || "Not linked"}</span>
                <span>Region: {profile.region || "N/A"}</span>
                <span>Role: {profile.role || "N/A"}</span>
              </div>
            </div>
          </div>
        </>
      )}


      {activeTab === "Conexiones" && (
        <div className="profileCard">
          <div className="miniLogo">🔗</div>

          <div>
            <span className="scoreBadge">Linked Accounts</span>
            <h3>Conexiones</h3>

            <div className="profileStats">
              <span>Discord: {discord?.username ? "✅ " + discord.username : "❌ Not linked"}</span>
              <span>Ubisoft: {(ubi?.username || profile.ubisoftName) ? "✅ " + (ubi?.username || profile.ubisoftName) : "❌ Not linked"}</span>
              <span>Companion: {profile.metadata?.lastSyncedAt ? "✅ Synced" : "⏳ Pending sync"}</span>
            </div>
          </div>
        </div>
      )}


      {activeTab === "Rainbow Six CUBA" && (
        <div className="profileCard">
          <div className="miniLogo">
            {membership?.status === "active" ? "✓" : "!"}
          </div>

          <div>
            <span className="scoreBadge">Rainbow Six CUBA Membership</span>

            <h3>
              {membership?.status
                ? membership.status.toUpperCase()
                : "NOT ENROLLED"}
            </h3>

            {!membership && (
              <button
                className="btn primary"
                onClick={async () => {
                  await joinRainbowSixCuba();
                  location.reload();
                }}
              >
                Join Rainbow Six CUBA
              </button>
            )}

            {membership && (
              <div className="profileStats">
                <span>Discord Connected: {membership.requirements?.discordConnected ? "✅" : "❌"}</span>
                <span>Server Member: {membership.requirements?.discordGuildMember ? "✅" : "❌"}</span>
                <span>Ubisoft Linked: {membership.requirements?.ubisoftLinked ? "✅" : "❌"}</span>
                <span>Community Verified: {membership.requirements?.communityVerified ? "✅" : "⏳"}</span>
                <span>Stats Enabled: {membership.stats?.enabled ? "✅" : "❌"}</span>
                <span>Public Profile: {membership.stats?.public ? "✅" : "❌"}</span>
              </div>
            )}
          </div>
        </div>
      )}


      {activeTab === "Privacidad" && (
        <div className="profileCard">
          <div className="miniLogo">🔒</div>

          <div>
            <span className="scoreBadge">Privacy</span>
            <h3>Privacidad y Datos</h3>

            <p>
              Aquí vivirán las opciones para perfil público, exportar datos,
              borrar datos y administrar consentimiento de privacidad.
            </p>

            <div className="profileStats">
              <span>Public Stats: {membership?.stats?.public ? "✅ Enabled" : "❌ Disabled"}</span>
              <span>Data Export: Próximamente</span>
              <span>Delete Request: Próximamente</span>
            </div>
          </div>
        </div>
      )}


      {activeTab === "Cuenta" && (
        <div className="profileCard">
          <div className="miniLogo">⚙</div>

          <div>
            <span className="scoreBadge">Account</span>
            <h3>Opciones de Cuenta</h3>

            <p>
              Administra tu sesión CGP en este navegador.
            </p>

            <button
              className="btn primary"
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}


      <p className="scoreNote">
        Last Sync: {profile.metadata?.lastSyncedAt || "Unknown"}
      </p>

    </section>
  );
}
