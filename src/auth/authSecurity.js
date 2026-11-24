export const AUTH_BEARER_KEYS = Object.freeze(["token", "access_token"]);

function removeBearerParams(params) {
  let removed = false;
  for (const key of AUTH_BEARER_KEYS) {
    if (params.has(key)) {
      params.delete(key);
      removed = true;
    }
  }
  return removed;
}

export function sanitizeAuthCallbackUrl(rawUrl) {
  const url = new URL(rawUrl, "https://rainbow-six-cuba.invalid/");
  let removed = removeBearerParams(url.searchParams);

  if (url.hash.startsWith("#")) {
    const hashParams = new URLSearchParams(url.hash.slice(1));
    if (removeBearerParams(hashParams)) {
      url.hash = hashParams.toString() ? `#${hashParams}` : "";
      removed = true;
    }
  }

  return {
    href: `${url.pathname}${url.search}${url.hash}`,
    removed,
  };
}
