import React, {
  useEffect,
  useState
} from "react";

import {
  Activity,
  Flag,
  Image as ImageIcon,
  LineChart,
  Puzzle,
  Search,
  Table2,
  UserRound
} from "lucide-react";

import { getCgpStatsPreview } from "../../services/statisticsService";
import { getMyStats } from "../../services/myStatsService";

import {
  MAP_ROWS,
  OPERATOR_ROWS,
  PLAYERS,
  SEASON_ROWS
} from "./data/placeholders";

import { formatValue as fmt } from "./utils/format.jsx";
import { withLang } from "../../i18n";

import CompanionPanel from "./CompanionPanel.jsx";
import MyStatsHeader from "./MyStatsHeader.jsx";

export default function StatisticsPanel({ t, lang }) {
  const s = t.stats;

  const tabKeys = [
    "score",
    "players",
    "operators",
    "maps",
    "seasons",
    "render",
    "companion"
  ];

  const [tab, setTab] = useState("score");
  const [q, setQ] = useState("");
  const [rank, setRank] = useState("");
  const [region, setRegion] = useState("");
  const [team, setTeam] = useState("");
  const [limit, setLimit] = useState(10);
  const [cgpPlayers, setCgpPlayers] = useState([]);
  const [myStats, setMyStats] = useState(null);

  useEffect(() => {
    getCgpStatsPreview()
      .then((data) => {
        setCgpPlayers(data.players.players || []);
      })
      .catch(() => {
        setCgpPlayers([]);
      });

    getMyStats()
      .then((data) => {
        setMyStats(data?.profile || null);
      })
      .catch(() => {
        setMyStats(null);
      });
  }, []);

  const displayPlayers = cgpPlayers.length
    ? cgpPlayers
    : PLAYERS;

  const ranks = [
    ...new Set(displayPlayers.map((player) => player.rank))
  ];

  const regions = [
    ...new Set(displayPlayers.map((player) => player.region))
  ];

  const teams = [
    ...new Set(displayPlayers.map((player) => player.team))
  ];

  const rows = displayPlayers
    .filter((player) => {
      const searchableText = [
        player.player,
        player.discord,
        player.ubisoft,
        player.rank,
        player.region,
        player.team,
        player.country
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!q || searchableText.includes(q.toLowerCase())) &&
        (!rank || player.rank === rank) &&
        (!region || player.region === region) &&
        (!team || player.team === team)
      );
    })
    .slice(0, Math.min(limit, 100));

  const previewPlayer = displayPlayers[0];

  const icons = [
    Table2,
    UserRound,
    Activity,
    Flag,
    LineChart,
    ImageIcon,
    Puzzle
  ];

  function clearFilters() {
    setQ("");
    setRank("");
    setRegion("");
    setTeam("");
    setLimit(10);
  }

  return (
    <section className="scoreboardShell statsDashboardShell">
      <div className="statsDashboardGrid">
        <div className="statsDashboardMain">
          <MyStatsHeader profile={myStats} s={s} />

          <div className="scoreHeader">
            <div>
              <span className="scoreBadge">
                {s.title}
              </span>

              <h2>
                {s.title}
              </h2>

              <p>
                {s.subtitle}
              </p>
            </div>

            <button className="btn ghost">
              <ImageIcon size={18} />
              {s.cards[3]}
            </button>
          </div>

          <div className="scoreSummary">
            {s.cards.map((card, index) => (
              <div key={card}>
                <strong>
                  {
                    index === 0
                      ? "1"
                      : index === 1
                      ? s.summaryValues[1]
                        : index === 2
                        ? s.summaryValues[2]
                        : s.summaryValues[3]
                  }
                </strong>

                <span>
                  {card}
                </span>
              </div>
            ))}
          </div>

          <div className="scoreTabs">
            {tabKeys.map((key, index) => {
              const Icon = icons[index] || Table2;

              return (
                <button
                  key={key}
                  className={
                    tab === key
                      ? "tab active"
                      : "tab"
                  }
                  onClick={() => setTab(key)}
                >
                  <Icon size={16} />
                  {s.tabs[index] || key}
                </button>
              );
            })}
          </div>

          {(tab === "score" || tab === "players") && (
            <div className="scoreControls">
              <label>
                <Search size={16} />

                <input
                  value={q}
                  onChange={(event) => setQ(event.target.value)}
                  placeholder={s.search}
                />
              </label>

              <select
                value={rank}
                onChange={(event) => setRank(event.target.value)}
              >
                <option value="">
                  {s.rank}: {s.all}
                </option>

                {ranks.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={region}
                onChange={(event) => setRegion(event.target.value)}
              >
                <option value="">
                  {s.region}: {s.all}
                </option>

                {regions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={team}
                onChange={(event) => setTeam(event.target.value)}
              >
                <option value="">
                  {s.team}: {s.all}
                </option>

                {teams.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={limit}
                onChange={(event) => {
                  setLimit(Number(event.target.value));
                }}
              >
                <option value="10">
                  10
                </option>

                <option value="50">
                  50
                </option>

                <option value="100">
                  100
                </option>
              </select>

              <button onClick={clearFilters}>
                {s.clear}
              </button>
            </div>
          )}

          {tab === "score" && (
            <>
              <div className="scoreCount">
                {s.showing} {rows.length} {s.of}{" "}
                {displayPlayers.length} {s.players}
              </div>

              <div className="tableWrap">
                <table className="scoreTable">
                  <thead>
                    <tr>
                      {s.headers.map((header) => (
                        <th key={header}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {rows.length ? (
                      rows.map((player) => (
                        <tr key={player.player}>
                          <td>
                            #{player.position}
                          </td>

                          <td>
                            <a
                              className="playerLink"
                              href={withLang(`/player/${player.ubisoft}`, lang)}
                            >
                              <strong>
                                {player.player}
                              </strong>
                            </a>

                            <small>
                              {s.verified}
                            </small>
                          </td>

                          <td>
                            {player.ubisoft}
                          </td>

                          <td>
                            <span className="rankPill">
                              {player.rank}
                            </span>
                          </td>

                          <td>
                            {fmt(player.rp)}
                          </td>

                          <td>
                            {fmt(player.kd)}
                          </td>

                          <td>
                            {fmt(player.wr, "%")}
                          </td>

                          <td>
                            {player.region}
                          </td>

                          <td>
                            {player.team}
                          </td>

                          <td>
                            {player.updated}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">
                          {s.noData}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "players" && (
            <div className="playerGrid">
              {rows.map((player) => (
                <div
                  className="profileCard"
                  key={player.player}
                >
                  <div className="avatarRank">
                    #{player.position}
                  </div>

                  <div>
                    <span className="scoreBadge">
                      {s.profileTitle}
                    </span>

                    <h3>
                      {player.player}
                    </h3>

                    <p>
                      {s.profileCopy}
                    </p>

                    <div className="profileStats">
                      <span>
                        {player.discord}
                      </span>

                      <span>
                        {player.region}
                      </span>

                      <span>
                        {player.rank}
                      </span>

                      <span>
                        {player.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "operators" && (
            <div className="tableWrap">
              <table className="scoreTable">
                <thead>
                  <tr>
                    {s.operatorHeaders.map((header) => <th key={header}>{header}</th>)}
                  </tr>
                </thead>

                <tbody>
                  {OPERATOR_ROWS.map((row) => (
                    <tr key={row.operator}>
                      <td>
                        <strong>
                          {row.operator}
                        </strong>
                      </td>

                      <td>{row.role}</td>
                      <td>{row.pick}</td>
                      <td>{row.wr}</td>
                      <td>{row.kd}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "maps" && (
            <div className="tableWrap">
              <table className="scoreTable">
                <thead>
                  <tr>
                    {s.mapHeaders.map((header) => <th key={header}>{header}</th>)}
                  </tr>
                </thead>

                <tbody>
                  {MAP_ROWS.map((row) => (
                    <tr key={row.map}>
                      <td>
                        <strong>
                          {row.map}
                        </strong>
                      </td>

                      <td>{row.played}</td>
                      <td>{row.wr}</td>
                      <td>{row.trend}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "seasons" && (
            <div className="tableWrap">
              <table className="scoreTable">
                <thead>
                  <tr>
                    {s.seasonHeaders.map((header) => <th key={header}>{header}</th>)}
                  </tr>
                </thead>

                <tbody>
                  {SEASON_ROWS.map((row) => (
                    <tr key={row.season}>
                      <td>
                        <strong>
                          {row.season}
                        </strong>
                      </td>

                      <td>{row.rank}</td>
                      <td>{row.rp}</td>
                      <td>{row.kd}</td>
                      <td>{row.wr}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "render" && (
            <div className="renderCard">
              <div className="miniLogo">
                6
              </div>

              <div>
                <h3>
                  {s.renderTitle}
                </h3>

                <p>
                  {s.renderCopy}
                </p>

                <div className="discordPreview">
                  <strong>
                    {s.scoreboardName}
                  </strong>

                  <span>
                    {previewPlayer
                      ? (
                        <>
                          #{previewPlayer.position} ·{" "}
                          {previewPlayer.player} ·{" "}
                          {previewPlayer.rank} · KD{" "}
                          {previewPlayer.kd} · WR{" "}
                          {previewPlayer.wr}%
                        </>
                      )
                      : s.noPlayerData}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "companion" && (
            <div className="renderCard">
              <div className="miniLogo">
                <Puzzle size={28} />
              </div>

              <div>
                <h3>
                  {s.companionTitle}
                </h3>

                <p>
                  {s.companionCopy}
                </p>

                <div className="discordPreview">
                  <strong>
                    {s.flow}
                  </strong>

                  <span>
                    {s.flowLabels.join(" · ")}
                  </span>
                </div>

                <div className="ctas miniCtas">
                  <a
                    className="btn primary"
                    href={withLang("/companion.html", lang)}
                  >
                    {s.companionLink}
                  </a>

                  <a
                    className="btn ghost"
                    href={withLang("/privacy_policy.html", lang)}
                  >
                    {s.privacyLink}
                  </a>

                  <a
                    className="btn ghost"
                    href={withLang("/support.html", lang)}
                  >
                    {s.supportLink}
                  </a>
                </div>
              </div>
            </div>
          )}

          <p className="scoreNote">
            {s.note}
          </p>
        </div>

        <CompanionPanel players={displayPlayers} s={s} lang={lang} />
      </div>
    </section>
  );
}
