export const AUTH_BEARER_KEYS = Object.freeze(["token", "access_token"]);
export const AUTH_SENSITIVE_PARAM_KEYS = Object.freeze([
  "token",
  "access_token",
  "code",
  "id_token",
  "refresh_token",
  "code_verifier",
]);

function removeSensitiveParams(params) {
  let removed = false;
  for (const key of [...params.keys()]) {
    if (AUTH_SENSITIVE_PARAM_KEYS.includes(key.toLowerCase())) {
      params.delete(key);
      removed = true;
    }
  }
  return removed;
}

function sanitizeHash(hash) {
  if (!hash.startsWith("#")) return { hash, removed: false };
  const body = hash.slice(1);
  const queryIndex = body.indexOf("?");
  const route = queryIndex >= 0 ? body.slice(0, queryIndex) : "";
  const rawParams = queryIndex >= 0 ? body.slice(queryIndex + 1) : body;
  const params = new URLSearchParams(rawParams);
  const removed = removeSensitiveParams(params);
  if (!removed) return { hash, removed: false };
  const suffix = params.toString();
  if (queryIndex >= 0) return { hash: `#${route}${suffix ? `?${suffix}` : ""}`, removed: true };
  return { hash: suffix ? `#${suffix}` : "", removed: true };
}

export function sanitizeAuthCallbackUrl(rawUrl) {
  const url = new URL(rawUrl, "https://rainbow-six-cuba.invalid/");
  let removed = removeSensitiveParams(url.searchParams);

  const sanitizedHash = sanitizeHash(url.hash);
  if (sanitizedHash.removed) {
    url.hash = sanitizedHash.hash;
    removed = true;
  }

  return {
    href: `${url.pathname}${url.search}${url.hash}`,
    removed,
  };
}
