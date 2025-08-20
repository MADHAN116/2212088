export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateShortcode(code) {
  return /^[A-Za-z0-9_\-]{4,12}$/.test(code);
}
