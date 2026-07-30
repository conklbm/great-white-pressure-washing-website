import type { Faq as FaqItem } from "@/content/services";

/** Accessible FAQ — native details/summary, zero JavaScript. */
export function Faq({ items, heading = "Common questions" }: { items: FaqItem[]; heading?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl font-bold uppercase tracking-wide text-bedrock sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-bedrock/10 rounded-lg border border-bedrock/10 bg-white">
        {items.map((item) => (
          <details key={item.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-bedrock [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden="true" className="text-spruce transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-loam">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
