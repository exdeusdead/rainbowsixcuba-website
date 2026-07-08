import React, { useEffect, useState } from "react";

function rankIcon(rankName) {
  if (!rankName) return null;

  const r = rankName.toLowerCase();

  if (r.includes("champion")) return "/assets/ranks/rank_champion.png";
  if (r.includes("diamond")) return "/assets/ranks/rank_diamond.png";
  if (r.includes("emerald")) return "/assets/ranks/rank_emerald.png";
  if (r.includes("platinum")) return "/assets/ranks/rank_platinum.png";
  if (r.includes("gold")) return "/assets/ranks/rank_gold.png";
  if (r.includes("silver")) return "/assets/ranks/rank_silver.png";
  if (r.includes("bronze")) return "/assets/ranks/rank_bronze.png";
  if (r.includes("copper")) return "/assets/ranks/rank_copper.png";

  return null;
}


export default function PlayerProfile(){

  const [profile,setProfile]=useState(null);
  const [error,setError]=useState(null);


  useEffect(()=>{

    const name = location.pathname
      .replace("/player/","")
      .trim();

    fetch(
      `https://api.rainbowsixcuba.com/api/public/player/${name}`
    )
      .then(r=>r.json())
      .then(data=>{
        if(!data.ok){
          setError(data.error);
          return;
        }

        setProfile(data.profile);
      })
      .catch(e=>setError(e.message));

  },[]);


  if(error){
    return (
      <section className="playerPage">
        <h2>{error}</h2>
      </section>
    );
  }


  if(!profile){
    return (
      <section className="playerPage">
        Loading player...
      </section>
    );
  }


  const rank = profile.rank || {};
  const recent = profile.recentForm || {};
  const icon = rankIcon(rank.currentRank);


  return (

    <main className="playerPage">

      <div className="playerNav">
        <a className="btn ghost" href="/?section=statistics">
          ← Estadísticas
        </a>

        <a className="btn ghost" href="/">
          Inicio
        </a>
      </div>


      <section className="playerHero">

        <div className="playerIdentity">

          <div className="playerAvatar">
            {profile.ubisoftName?.[0]?.toUpperCase()}
          </div>

          <div>

            <span className="scoreBadge">
              VERIFIED CUBAN PLAYER
            </span>

            <h1>{profile.ubisoftName}</h1>

            <p>
              {profile.role || "Player"} · {profile.region || "N/A"}
            </p>

          </div>

        </div>


        <div className="playerRank">

          {icon && (
            <img
              src={icon}
              alt={rank.currentRank}
            />
          )}

          <strong>
            {rank.currentRank || "Unranked"}
          </strong>

          <span>
            {rank.currentRp || 0} RP
          </span>

        </div>

      </section>


      <section className="identityGrid">

        <div className="identityCard">

          <h3>Player Identity</h3>

          <span>✓ Verified Cuban Player</span>

          <span>
            Role: {profile.role || "Player"}
          </span>

          <span>
            Region: {profile.region || "N/A"}
          </span>

          <span>
            CGP ID: {profile.userId}
          </span>

        </div>


        <div className="identityCard">

          <h3>Connected Accounts</h3>

          <span>
            Discord:
            {" "}
            {profile.providers?.discord?.username ? "✓ " + profile.providers.discord.username : "Not Linked"}
          </span>

          <span>
            Ubisoft:
            {" "}
            {profile.providers?.ubisoft?.username ? "✓ " + profile.providers.ubisoft.username : "Not Linked"}
          </span>

          <span>
            FACEIT:
            Future Integration
          </span>

        </div>

      </section>



      <section className="playerStatsGrid">

        <div>
          <strong>{rank.seasonKd}</strong>
          <span>KD</span>
        </div>

        <div>
          <strong>{rank.seasonWinRate}%</strong>
          <span>Win Rate</span>
        </div>

        <div>
          <strong>{rank.seasonRankedMatches}</strong>
          <span>Matches</span>
        </div>

        <div>
          <strong>{rank.lifetimeLevel}</strong>
          <span>Level</span>
        </div>

        <div>
          <strong>{recent.rpDelta}</strong>
          <span>RP Change</span>
        </div>

      </section>



      <section className="playerSection">

        <h2>Top Operators</h2>

        <div className="playerCards">

          {(profile.topOperators || [])
          .slice(0,5)
          .map(op=>(

            <div className="glassCard" key={op.name}>

              <h3>{op.name}</h3>

              <p>
                {op.rounds} rounds
              </p>

              <span>
                WR {op.winRate}% · KD {op.kd}
              </span>

            </div>

          ))}

        </div>

      </section>



      <section className="playerSection">

        <h2>Best Maps</h2>

        <div className="playerCards">

          {(profile.bestMaps || [])
          .slice(0,5)
          .map(map=>(

            <div className="glassCard" key={map.map}>

              <h3>{map.map}</h3>

              <p>
                {map.matches} matches
              </p>

              <span>
                WR {map.winRate}% · KD {map.kd}
              </span>

            </div>

          ))}

        </div>

      </section>


    </main>

  );
}
