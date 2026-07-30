/**
 * Quiet section divider: a thin rule broken by a spray of water droplets,
 * scaled up toward the center. Deliberately understated — Dylan's mascot
 * carries the brand, so this stays out of its way.
 */
export function SprayDivider({ dark = false }: { dark?: boolean }) {
  const line = dark ? "bg-white/15" : "bg-bedrock/15";
  const dot = dark ? "bg-spray" : "bg-spruce";
  return (
    <div aria-hidden="true" className="flex items-center gap-3 py-6">
      <div className={`h-px flex-1 ${line}`} />
      <div className="flex items-center gap-1.5">
        <span className={`h-1 w-1 rounded-full ${dot} opacity-35`} />
        <span className={`h-1.5 w-1.5 rounded-full ${dot} opacity-60`} />
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <span className={`h-1.5 w-1.5 rounded-full ${dot} opacity-60`} />
        <span className={`h-1 w-1 rounded-full ${dot} opacity-35`} />
      </div>
      <div className={`h-px flex-1 ${line}`} />
    </div>
  );
}
