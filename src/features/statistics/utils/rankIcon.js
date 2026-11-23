import { assetPath } from "../../../i18n";

export default function rankIcon(rankName) {
  const rank = String(rankName || "").toLowerCase();

  if (rank.includes("champion")) {
    return assetPath("/ranks/rank_champion.png");
  }

  if (rank.includes("diamond")) {
    return assetPath("/ranks/rank_diamond.png");
  }

  if (rank.includes("emerald")) {
    return assetPath("/ranks/rank_emerald.png");
  }

  if (rank.includes("platinum")) {
    return assetPath("/ranks/rank_platinum.png");
  }

  if (rank.includes("gold")) {
    return assetPath("/ranks/rank_gold.png");
  }

  if (rank.includes("silver")) {
    return assetPath("/ranks/rank_silver.png");
  }

  if (rank.includes("bronze")) {
    return assetPath("/ranks/rank_bronze.png");
  }

  if (rank.includes("copper")) {
    return assetPath("/ranks/rank_copper.png");
  }

  return null;
}
