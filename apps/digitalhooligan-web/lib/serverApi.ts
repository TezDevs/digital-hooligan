/**
 * Returns an absolute base URL for server-side fetch calls.
 * Works locally and on Vercel.
 */
export function getServerBaseUrl(): string {
  // Vercel provides this automatically
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local dev fallback
  return "http://localhost:3000";
}
