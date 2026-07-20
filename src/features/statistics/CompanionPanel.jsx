import React, { useState } from "react";

export default function CompanionPanel({ players }) {
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
    setStatus("Buscando información...");

    try {
      const res = await fetch(
        `https://api.rainbowsixcuba.com/api/temp/player/${search.trim()}`
      );

      const json = await res.json();

      if (json.ok && json.profile) {
        setResult(json.profile);
        setIsTemporary(Boolean(json.temporary));
        setStatus(
          json.temporary
            ? "Vista temporal"
            : "Perfil encontrado"
        );
      } else {
        setResult(null);
        setIsTemporary(false);
        setStatus(
          "Jugador no registrado en Rainbow Six CUBA.\n\n" +
          "Este perfil todavía no participa en los rankings oficiales.\n\n" +
          "Únete a la comunidad, conecta Ubisoft y sincroniza tus " +
          "estadísticas para activar tu perfil competitivo."
        );
      }
    } catch (error) {
      console.error("Companion search failed:", error);

      setStatus(
        "Preparando conexión con Companion..."
      );
    }
  }

  return (
    <aside className="companionSidePanel">
      <div className="companionPanelHeader">
        <span className="scoreBadge">
          Companion Sync
        </span>

        <h3>
          Encuentra tu perfil
        </h3>

        <p>
          Busca tu Ubisoft ID y compara tu rendimiento con la comunidad.
        </p>
      </div>

      <label className="companionSearch">
        <span>
          Ubisoft ID
        </span>

        <div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ej: exdeusdead"
          />

          <button
            type="button"
            onClick={searchProfile}
          >
            Buscar información
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
              Buscar con Companion
            </a>
          )}
        </div>
      )}

      {result && (
        <div className="companionHint">
          <span className="scoreBadge">
            {isTemporary
              ? "TEMPORARY SNAPSHOT"
              : "VERIFIED PLAYER"}
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
                Preparar información
              </a>

              <a
                className="btn ghost companionFull"
                href="https://discord.gg/rainbowsixcuba"
                target="_blank"
                rel="noreferrer"
              >
                Unirme para reclamar perfil
              </a>
            </>
          ) : (
            <a
              className="btn primary companionFull"
              href={`/player/${result.ubisoftName}`}
            >
              Ver Perfil Completo
            </a>
          )}
        </div>
      )}

      <div className="companionRecent">
        <strong>
          Últimas sincronizaciones
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
