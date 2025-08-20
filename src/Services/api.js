// Simulated backend API

const linksDB = {};
const statsDB = {};

export function createShortUrl({ longUrl, validity, shortcode }) {
  const expireAt = Date.now() + ((validity || 30) * 60000);
  let short;
  if (shortcode) {
    if (linksDB[shortcode]) throw new Error('Shortcode already exists');
    short = shortcode;
  } else {
    do {
      short = Math.random().toString(36).substr(2, 6);
    } while (linksDB[short]);
  }
  linksDB[short] = { longUrl, expireAt };
  statsDB[short] = [];
  console.log(`[LOG] Created short URL: ${short}`); // Mandatory Logging
  return { short, expireAt };
}

export function getLongUrl(short) {
  const entry = linksDB[short];
  if (!entry) throw new Error('Short URL not found');
  if (entry.expireAt < Date.now()) throw new Error('Short URL expired');
  return entry.longUrl;
}

export function logClick(short, source) {
  if (statsDB[short]) {
    statsDB[short].push({ time: Date.now(), source: source || 'unknown' });
    console.log(`[LOG] Clicked: ${short}, Source: ${source}`);
  }
}

export function getStats(short) {
  return statsDB[short] || [];
}
