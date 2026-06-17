export function getSiteUrl(fallbackHost: string): string {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? fallbackHost;
  return `https://${host}`;
}
