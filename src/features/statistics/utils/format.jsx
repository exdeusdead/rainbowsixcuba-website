import React from "react";

export function formatValue(value, suffix = "") {
  return typeof value === "number"
    ? `${value}${suffix}`
    : value;
}

export function formatDelta(value, suffix = "") {
  const number = Number.parseFloat(value);
  const status =
    number > 0 ? "up" :
    number < 0 ? "down" :
    "neutral";

  const sign = number > 0 ? "+" : "";

  return (
    <span className={`delta ${status}`}>
      {Number.isFinite(number)
        ? `${sign}${value}${suffix}`
        : "—"}
    </span>
  );
}
