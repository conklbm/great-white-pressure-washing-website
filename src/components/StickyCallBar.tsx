import Link from "next/link";

import { PhoneLink } from "./PhoneLink";

/**
 * Mobile-only sticky bottom bar — call is always one thumb-tap away.
 * (Footer gets bottom padding on mobile so this never covers content.)
 */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-px border-t border-bedrock/20 md:hidden">
      <PhoneLink
        location="sticky-bar"
        className="flex min-h-14 flex-1 items-center justify-center bg-signal font-display text-lg font-bold uppercase tracking-wide text-bedrock"
      >
        ☎ Call now
      </PhoneLink>
      <Link
        href="/contact"
        className="flex min-h-14 flex-1 items-center justify-center bg-bedrock font-display text-lg font-bold uppercase tracking-wide text-white"
      >
        Free quote
      </Link>
    </div>
  );
}
