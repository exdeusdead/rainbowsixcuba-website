import { STATS_API } from "../../config/apiConfig";
import React, { useEffect, useRef, useState } from "react";
import { withLang } from "../../i18n";
import { ubisoftIdSegment } from "./ubisoftId.mjs";

export default function CompanionPanel({ players, s, lang }) {
  const recent = (players || []).slice(0, 3);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [isTemporary, setIsTemporary] = useState(false);
  const [searchedUser, setSearchedUser] = useState("");
  const resultId = ubisoftIdSegment(result?.ubisoftName);
  const requestId = useRef(0);
  useEffect(() => () => { requestId.current += 1; }, []);

  function updateSearch(value) {
    requestId.current += 1;
    setSearch(value);
    setStatus("");
    setResult(null);
    setIsTemporary(false);
    setSearchedUser("");
  }

  async function searchProfile() {
    const id = ++requestId.current;
    setResult(null);
    setIsTemporary(false);
    const idSegment = ubisoftIdSegment(search);
    setSearchedUser(idSegment ?? "");
    if (!idSegment) {
      setStatus(lang === "es"
        ? "Escribe un Ubisoft ID válido de 3 a 20 caracteres."
        : "Enter a valid Ubisoft ID with 3 to 20 characters.");
      return;
    }
    setStatus(s.searching);

    try {
      const res = await fetch(
        `${STATS_API}/temp/player/${idSegment}`
      );

      const json = await res.json();
      if (id !== requestId.current) return;

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
      if (id !== requestId.current) return;
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
            onChange={(event) => updateSearch(event.target.value)}
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
          <strong role="status">
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
              rel="noopener noreferrer"
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
            {typeof result.ubisoftName === "string" ? result.ubisoftName : search.trim()}
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
              {resultId && <a
                className="btn primary companionFull"
                href={
                  "https://r6.tracker.network/r6siege/profile/ubi/" +
                  `${resultId}/overview?r6cubaTemp=1`
                }
                target="_blank"
                rel="noreferrer"
              >
                {s.prepareInfo}
              </a>}

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
            resultId && <a
              className="btn primary companionFull"
              href={withLang(`/player/${resultId}`, lang)}
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
