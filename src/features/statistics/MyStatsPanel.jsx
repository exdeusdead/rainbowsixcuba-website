import React from "react";
import {
  Activity,
  UserRound
} from "lucide-react";

export default function MyStatsPanel({ profile }) {
  if (!profile) {
    return (
      <div className="renderCard">
        <div className="miniLogo">
          <UserRound size={28} />
        </div>

        <div>
          <h3>Mis Estadísticas</h3>

          <p>
            Conecta Discord y sincroniza tu perfil con Companion para ver
            tus estadísticas personales.
          </p>

          <div className="discordPreview">
            <strong>Estado</strong>
            <span>
              No hay estadísticas personales disponibles para esta sesión.
            </span>
          </div>
        </div>
      </div>
    );
  }

  const rank = profile.rank || {};
  const recent = profile.recentForm || {};
  const operators = profile.topOperators || [];
  const maps = profile.bestMaps || [];

  return (
    <div className="playerGrid">
      <div className="profileCard">
        <div className="avatarRank">
          #{profile.ubisoftName?.[0]?.toUpperCase() || "?"}
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
          </div>
        </div>
      </div>

      <div className="renderCard">
        <div className="miniLogo">
          <Activity size={28} />
        </div>

        <div>
          <h3>Forma reciente</h3>

          <div className="profileStats">
            <span>{recent.matches || 0} matches</span>
            <span>{recent.kills || 0} kills</span>
            <span>{recent.deaths || 0} deaths</span>
            <span>KD {recent.kd || "N/A"}</span>
            <span>RP Δ {recent.rpDelta || 0}</span>
          </div>
        </div>
      </div>

      <div className="tableWrap">
        <table className="scoreTable">
          <thead>
            <tr>
              <th>Top Operator</th>
              <th>Rounds</th>
              <th>WR</th>
              <th>KD</th>
              <th>HS</th>
            </tr>
          </thead>

          <tbody>
            {operators.slice(0, 5).map((operator) => (
              <tr key={operator.name}>
                <td>
                  <strong>{operator.name}</strong>
                </td>
                <td>{operator.rounds}</td>
                <td>{operator.winRate}%</td>
                <td>{operator.kd}</td>
                <td>{operator.headshotRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tableWrap">
        <table className="scoreTable">
          <thead>
            <tr>
              <th>Best Map</th>
              <th>Matches</th>
              <th>WR</th>
              <th>KD</th>
              <th>ESR</th>
            </tr>
          </thead>

          <tbody>
            {maps.slice(0, 5).map((map) => (
              <tr key={map.map}>
                <td>
                  <strong>{map.map}</strong>
                </td>
                <td>{map.matches}</td>
                <td>{map.winRate}%</td>
                <td>{map.kd}</td>
                <td>{map.esr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
