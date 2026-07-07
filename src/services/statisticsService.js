function adaptPublicPlayer(profile, index) {
  const rank = profile.rank || {};

  return {
    position: index + 1,
    player: profile.ubisoftName || profile.discordTag || profile.userId,
    discord: profile.discordTag || profile.providers?.discord?.username || "N/A",
    ubisoft: profile.ubisoftName || "N/A",
    rank: rank.currentRank || "Unranked",
    rp: rank.currentRp || 0,
    kd: rank.seasonKd || 0,
    wr: rank.seasonWinRate || 0,
    region: profile.region || "N/A",
    team: profile.team || "Free Agent",
    country: "Cuba",
    updated: profile.metadata?.lastSyncedAt || "N/A",
    deltaRP: profile.recentForm?.rpDelta || 0,
    deltaKD: 0,
    deltaWR: 0,
    deltaRank: "—",
    status: "Verified"
  };
}

export async function getCgpStatsPreview() {
  const res = await fetch(
    "https://api.rainbowsixcuba.com/api/public/players"
  );

  if (!res.ok) {
    return {
      players: {
        players: []
      }
    };
  }

  const data = await res.json();

  return {
    players: {
      players: (data.players || []).map(adaptPublicPlayer)
    }
  };
}
