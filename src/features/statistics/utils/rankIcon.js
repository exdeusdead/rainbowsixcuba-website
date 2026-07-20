export default function rankIcon(rankName) {
  const rank = String(rankName || "").toLowerCase();

  if (rank.includes("champion")) {
    return "/assets/ranks/rank_champion.png";
  }

  if (rank.includes("diamond")) {
    return "/assets/ranks/rank_diamond.png";
  }

  if (rank.includes("emerald")) {
    return "/assets/ranks/rank_emerald.png";
  }

  if (rank.includes("platinum")) {
    return "/assets/ranks/rank_platinum.png";
  }

  if (rank.includes("gold")) {
    return "/assets/ranks/rank_gold.png";
  }

  if (rank.includes("silver")) {
    return "/assets/ranks/rank_silver.png";
  }

  if (rank.includes("bronze")) {
    return "/assets/ranks/rank_bronze.png";
  }

  if (rank.includes("copper")) {
    return "/assets/ranks/rank_copper.png";
  }

  return null;
}
