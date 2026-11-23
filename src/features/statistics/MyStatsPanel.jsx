import React from "react";
import {
  Activity,
  UserRound
} from "lucide-react";

export default function MyStatsPanel({ profile, s }) {
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

          <div className="discordPreview">
            <strong>{s.status}</strong>
            <span>
              {s.noPersonalStats}
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
          <span className="scoreBadge">{s.myStatsTitle}</span>

          <h3>
            {profile.ubisoftName || profile.discordTag || "Player"}
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
          </div>
        </div>
      </div>

      <div className="renderCard">
        <div className="miniLogo">
          <Activity size={28} />
        </div>

        <div>
          <h3>{s.recentForm || "Recent form"}</h3>

          <div className="profileStats">
            <span>{recent.matches || 0} {s.matches}</span>
            <span>{recent.kills || 0} {s.kills}</span>
            <span>{recent.deaths || 0} {s.deaths}</span>
            <span>KD {recent.kd || "N/A"}</span>
            <span>RP Δ {recent.rpDelta || 0}</span>
          </div>
        </div>
      </div>

      <div className="tableWrap">
        <table className="scoreTable">
          <thead>
            <tr>
              {s.myOperatorHeaders.map((header) => <th key={header}>{header}</th>)}
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
              {s.myMapHeaders.map((header) => <th key={header}>{header}</th>)}
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
