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


export default function PlayerProfile() {

  const [profile,setProfile] = useState(null);
  const [error,setError] = useState(null);

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
      <section className="scoreboardShell">
        <span className="scoreBadge">
          PLAYER PROFILE
        </span>

        <h2>{error}</h2>
      </section>
    );
  }


  if(!profile){
    return (
      <section className="scoreboardShell">
        Loading player...
      </section>
    );
  }


  const rank = profile.rank || {};
  const recent = profile.recentForm || {};
  const icon = rankIcon(rank.currentRank);


  return (
    <section className="scoreboardShell">

      <div className="profileCard">

        <div className="avatarRank">
          {icon ? (
            <img
              src={icon}
              alt={rank.currentRank}
              style={{
                width:"80px",
                height:"80px",
                objectFit:"contain"
              }}
            />
          ) : "?"}
        </div>


        <div>

          <span className="scoreBadge">
            VERIFIED PLAYER
          </span>

          <h2>
            {profile.ubisoftName}
          </h2>

          <p>
            Rainbow Six CUBA Competitive Profile
          </p>


          <div className="profileStats">

            <span>{rank.currentRank}</span>
            <span>{rank.currentRp} RP</span>
            <span>KD {rank.seasonKd}</span>
            <span>WR {rank.seasonWinRate}%</span>
            <span>{rank.seasonRankedMatches} matches</span>
            <span>Level {rank.lifetimeLevel}</span>
            <span>RP Δ {recent.rpDelta}</span>

          </div>

        </div>

      </div>


      <div className="tableWrap">

        <table className="scoreTable">

          <thead>
            <tr>
              <th>Operator</th>
              <th>Rounds</th>
              <th>WR</th>
              <th>KD</th>
              <th>HS</th>
            </tr>
          </thead>

          <tbody>
            {(profile.topOperators || []).slice(0,5).map(op=>(
              <tr key={op.name}>
                <td>{op.name}</td>
                <td>{op.rounds}</td>
                <td>{op.winRate}%</td>
                <td>{op.kd}</td>
                <td>{op.headshotRate}%</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>


    </section>
  );
}
