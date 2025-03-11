
/**
 * Middleware function to redirect HTTP traffic to HTTPS
 * This runs in the browser, not server-side
 */
export const forceHttps = (): void => {
  // Only run in production and when on HTTP
  if (
    window.location.protocol === 'http:' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1')
  ) {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
};
