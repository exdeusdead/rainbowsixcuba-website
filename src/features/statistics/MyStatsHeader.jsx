import React from "react";
import { UserRound } from "lucide-react";
import rankIcon from "./utils/rankIcon";

export default function MyStatsHeader({ profile }) {
  if (!profile) {
    return (
      <div className="renderCard">
        <div className="miniLogo">
          <UserRound size={28} />
        </div>

        <div>
          <h3>Mis Estadísticas</h3>
          <p>
            Inicia sesión con Discord y sincroniza tu perfil con Companion
            para ver tu perfil competitivo aquí.
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
        <span className="scoreBadge">Mis Estadísticas</span>

        <h3>
          {profile.ubisoftName || profile.discordTag || "Player"}
        </h3>

        <p>
          Perfil competitivo personal sincronizado desde Rainbow Six CUBA
          Stats.
        </p>

        <div className="profileStats">
          <span>{rank.currentRank || "N/A"}</span>
          <span>{rank.currentRp || "N/A"} RP</span>
          <span>KD {rank.seasonKd || "N/A"}</span>
          <span>WR {rank.seasonWinRate || "N/A"}%</span>
          <span>{rank.seasonRankedMatches || "N/A"} matches</span>
          <span>Level {rank.lifetimeLevel || "N/A"}</span>
          <span>RP Δ {recent.rpDelta || 0}</span>
          <span>
            Last Sync: {profile.metadata?.lastSyncedAt || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
