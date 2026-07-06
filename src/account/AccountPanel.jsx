import React, { useEffect, useState } from "react";
import { getToken } from "../auth/cgpAuth";
import {
  getMyMembership,
  joinRainbowSixCuba
} from "../services/r6MembershipService";

export default function AccountPanel() {
  const [profile, setProfile] = useState(null);
  const [membership, setMembership] = useState(null);
  const [status, setStatus] = useState("Loading CGP profile...");

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
          <span className="scoreBadge">
            VERIFIED PLAYER
          </span>

          <h2>
            {profile.ubisoftName}
          </h2>

          <p>
            CGP Identity connected across Discord,
            Ubisoft and Rainbow Six CUBA services.
          </p>
        </div>
      </div>


      <div className="scoreSummary">

        <div>
          <strong>{rank.currentRank || "N/A"}</strong>
          <span>Current Rank</span>
        </div>

        <div>
          <strong>{rank.currentRp || "N/A"}</strong>
          <span>Rank Points</span>
        </div>

        <div>
          <strong>{rank.seasonKd || "N/A"}</strong>
          <span>KD Ratio</span>
        </div>

        <div>
          <strong>
            {rank.seasonWinRate || "N/A"}%
          </strong>
          <span>Win Rate</span>
        </div>

      </div>


      <div className="profileCard">

        <div className="avatarRank">
          {profile.ubisoftName?.[0]?.toUpperCase()}
        </div>


        <div>

          <h3>{profile.ubisoftName}</h3>

          <div className="profileStats">

            <span>
              Discord:
              {" "}
              {discord?.username || "Not linked"}
            </span>

            <span>
              Ubisoft:
              {" "}
              {ubi?.username || "Not linked"}
            </span>

            <span>
              Region:
              {" "}
              {profile.region || "N/A"}
            </span>

            <span>
              Role:
              {" "}
              {profile.role || "N/A"}
            </span>

          </div>

        </div>

      </div>


      <div className="profileCard">
        <div className="miniLogo">
          {membership?.status === "active" ? "✓" : "!"}
        </div>

        <div>
          <span className="scoreBadge">
            Rainbow Six CUBA Membership
          </span>

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
              <span>
                Discord Connected:
                {" "}
                {membership.requirements?.discordConnected ? "✅" : "❌"}
              </span>

              <span>
                Server Member:
                {" "}
                {membership.requirements?.discordGuildMember ? "✅" : "❌"}
              </span>

              <span>
                Ubisoft Linked:
                {" "}
                {membership.requirements?.ubisoftLinked ? "✅" : "❌"}
              </span>

              <span>
                Community Verified:
                {" "}
                {membership.requirements?.communityVerified ? "✅" : "⏳"}
              </span>

              <span>
                Stats Enabled:
                {" "}
                {membership.stats?.enabled ? "✅" : "❌"}
              </span>

              <span>
                Public Profile:
                {" "}
                {membership.stats?.public ? "✅" : "❌"}
              </span>
            </div>
          )}
        </div>
      </div>


      <p className="scoreNote">
        Last Sync:
        {" "}
        {profile.metadata?.lastSyncedAt || "Unknown"}
      </p>

    </section>
  );
}
