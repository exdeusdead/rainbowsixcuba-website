import { getToken } from "../auth/cgpAuth";

const STATS_API =
  "https://api.rainbowsixcuba.com/api";

function adaptProfile(profile) {
  if (!profile) return null;

  return {
    position: 1,

    player:
      profile.ubisoftName ||
      profile.discordTag ||
      profile.userId,

    discord:
      profile.discordTag ||
      profile.providers?.discord?.username ||
      "N/A",

    ubisoft:
      profile.ubisoftName ||
      "N/A",

    rank:
      profile.rank?.currentRank ||
      "Unranked",

    rp:
      profile.rank?.currentRp ||
      0,

    kd:
      profile.rank?.seasonKd ||
      0,

    wr:
      profile.rank?.seasonWinRate ||
      0,

    region:
      profile.region ||
      "N/A",

    team:
      profile.team ||
      "Free Agent",

    country:
      "Cuba",

    updated:
      profile.metadata?.lastSyncedAt ||
      "N/A",

    deltaRP:
      profile.recentForm?.rpDelta ||
      0,

    deltaKD: 0,
    deltaWR: 0,
    deltaRank: "—",

    status:
      "Verified"
  };
}

export async function getCgpStatsPlayers() {
  const token = getToken();

  if (!token) {
    return [];
  }

  try {
    const res = await fetch(
      `${STATS_API}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    const player = adaptProfile(data.profile);

    return player ? [player] : [];

  } catch {
    return [];
  }
}
