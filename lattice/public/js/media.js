// Video links on entries ("Watch"). Only YouTube links are accepted, so thumbnails and ids work.
// Shared by the browser, the server and scripts/check.js.

export function youtubeId(url) {
  let u;
  try {
    u = new URL(String(url));
  } catch {
    return null;
  }
  if (u.protocol !== 'https:') return null;
  const host = u.hostname.replace(/^(www|m)\./, '');
  let id = null;
  if (host === 'youtu.be') id = u.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (u.pathname === '/watch') id = u.searchParams.get('v');
    else {
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
      id = m?.[1] ?? null;
    }
  }
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

const text = (v, max) => (typeof v === 'string' ? v.slice(0, max).trim() : '');

// [{ url, title, channel }] — canonical watch URLs, at most 6, invalid ones dropped.
export function normalizeVideos(list) {
  const seen = new Set();
  const out = [];
  for (const v of Array.isArray(list) ? list : []) {
    const id = youtubeId(typeof v === 'string' ? v : v?.url);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({
      url: `https://www.youtube.com/watch?v=${id}`,
      title: text(v?.title, 200),
      channel: text(v?.channel, 80),
    });
    if (out.length >= 6) break;
  }
  return out;
}

export const thumbnailUrl = (url) => {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : '';
};
