import React from "react";
import { UserRound } from "lucide-react";
import rankIcon from "./utils/rankIcon";

export default function MyStatsHeader({ profile, s }) {
  if (!profile) {
    return (
      <div className="renderCard">
        <div className="miniLogo">
          <UserRound size={28} />
        </div>

        <div>
          <h3>{s.myStatsTitle}</h3>
          <p>
            {s.myStatsLogin}
          </p>
        </div>
      </div>
    );
  }

  const rank = profile.rank || {};
  const recent = profile.recentForm || {};
  const icon = rankIcon(rank.currentRank);

  return (
    <div className="profileCard">
      <div className="avatarRank">
        {icon ? (
          <img
            src={icon}
            alt={rank.currentRank || "Rank"}
            style={{
              width: "64px",
              height: "64px",
              objectFit: "contain"
            }}
          />
        ) : (
          profile.ubisoftName?.[0]?.toUpperCase() || "?"
        )}
      </div>

      <div>
        <span className="scoreBadge">{s.myStatsTitle}</span>

        <h3>
          {profile.ubisoftName || profile.discordTag || s.playerFallback || "Player"}
        </h3>

        <p>
          {s.myStatsDescription}
        </p>

        <div className="profileStats">
          <span>{rank.currentRank || "N/A"}</span>
          <span>{rank.currentRp || "N/A"} RP</span>
          <span>KD {rank.seasonKd || "N/A"}</span>
          <span>WR {rank.seasonWinRate || "N/A"}%</span>
          <span>{rank.seasonRankedMatches || "N/A"} {s.matches}</span>
          <span>{s.level} {rank.lifetimeLevel || "N/A"}</span>
          <span>RP Δ {recent.rpDelta || 0}</span>
          <span>
            {s.lastSync}: {profile.metadata?.lastSyncedAt || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
