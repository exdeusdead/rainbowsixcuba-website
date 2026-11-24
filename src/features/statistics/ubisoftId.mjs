export function ubisoftIdSegment(input) {
  if (typeof input !== "string") return null;
  const id = input.trim();
  return /^[A-Za-z0-9][A-Za-z0-9_.-]{2,19}$/.test(id) ? encodeURIComponent(id) : null;
}
