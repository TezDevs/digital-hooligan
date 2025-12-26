export function isDryRun(request: Request): boolean {
  const { searchParams } = new URL(request.url);
  return searchParams.get("dryRun") === "true";
}
