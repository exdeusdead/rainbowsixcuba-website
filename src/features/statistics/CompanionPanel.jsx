import { STATS_API } from "../../config/apiConfig";
import React, { useState } from "react";
import { withLang } from "../../i18n";

export default function CompanionPanel({ players, s, lang }) {
  const recent = (players || []).slice(0, 3);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [isTemporary, setIsTemporary] = useState(false);
  const [searchedUser, setSearchedUser] = useState("");

  async function searchProfile() {
    if (!search.trim()) return;

    setResult(null);
    setIsTemporary(false);
    setSearchedUser(search.trim());
    setStatus(s.searching);

    try {
      const res = await fetch(
        `${STATS_API}/temp/player/${search.trim()}`
      );

      const json = await res.json();

      if (json.ok && json.profile) {
        setResult(json.profile);
        setIsTemporary(Boolean(json.temporary));
        setStatus(
          json.temporary
            ? s.temporarySnapshot
            : s.profileFound
        );
      } else {
        setResult(null);
        setIsTemporary(false);
        setStatus(
          s.notRegistered
        );
      }
    } catch (error) {
      console.error("Companion search failed:", error);

      setStatus(
        s.preparingConnection
      );
    }
  }

  return (
    <aside className="companionSidePanel">
      <div className="companionPanelHeader">
        <span className="scoreBadge">
          {s.companionSearchBadge}
        </span>

        <h3>
          {s.companionSearchTitle}
        </h3>

        <p>
          {s.companionSearchCopy}
        </p>
      </div>

      <label className="companionSearch">
        <span>
          {s.companionSearchLabel}
        </span>

        <div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={s.companionSearchPlaceholder}
          />

          <button
            type="button"
            onClick={searchProfile}
          >
            {s.companionSearchButton}
          </button>
        </div>
      </label>

      {status && (
        <div className="companionHint">
          <strong>
            {status}
          </strong>

          {!result && searchedUser && (
            <a
              className="btn primary companionFull"
              href={
                "https://r6.tracker.network/r6siege/profile/ubi/" +
                `${searchedUser}/overview?r6cubaTemp=1`
              }
              target="_blank"
              rel="noreferrer"
            >
              {s.searchWithCompanion}
            </a>
          )}
        </div>
      )}

      {result && (
        <div className="companionHint">
          <span className="scoreBadge">
            {isTemporary
              ? s.temporaryPlayer
              : s.verifiedPlayer}
          </span>

          <h3>
            {result.ubisoftName}
          </h3>

          <div className="profileStats">
            <span>
              {result.rank?.currentRank}
            </span>

            <span>
              {result.rank?.currentRp} RP
            </span>

            <span>
              KD {result.rank?.seasonKd}
            </span>

            <span>
              WR {result.rank?.seasonWinRate}%
            </span>
          </div>

          {isTemporary ? (
            <>
              <a
                className="btn primary companionFull"
                href={
                  "https://r6.tracker.network/r6siege/profile/ubi/" +
                  `${result.ubisoftName}/overview?r6cubaTemp=1`
                }
                target="_blank"
                rel="noreferrer"
              >
                {s.prepareInfo}
              </a>

              <a
                className="btn ghost companionFull"
                href="https://discord.gg/rainbowsixcuba"
                target="_blank"
                rel="noreferrer"
              >
                {s.joinToClaim}
              </a>
            </>
          ) : (
            <a
              className="btn primary companionFull"
              href={withLang(`/player/${result.ubisoftName}`, lang)}
            >
              {s.viewFullProfile}
            </a>
          )}
        </div>
      )}

      <div className="companionRecent">
        <strong>
          {s.recentSyncs}
        </strong>

        {recent.map((player) => (
          <div
            className="companionRecentRow"
            key={player.player}
          >
            <span>
              {player.player}
            </span>

            <small>
              {player.rank} · {player.rp} RP
            </small>
          </div>
        ))}
      </div>
    </aside>
  );
}
