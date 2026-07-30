/**
 * Smoke test for Great White Pressure Washing.
 *
 * Verifies the key routes render and the lead pipeline behaves — without
 * spamming your Google Sheet. "Safe" checks create NO rows. The real
 * end-to-end lead (which DOES create one marked Sheet row) only runs with
 * the --live flag.
 *
 * Usage:
 *   node scripts/smoke-test.mjs [baseUrl] [--live]
 *
 *   baseUrl   defaults to http://localhost:3000
 *   --live    also submits ONE real lead → creates a "SMOKE TEST" row in the
 *             Sheet (only works where LEAD_WEBHOOK_URL is set, i.e. production)
 *
 * Examples:
 *   node scripts/smoke-test.mjs                          # local dev
 *   node scripts/smoke-test.mjs https://your.vercel.app  # prod, safe checks
 *   node scripts/smoke-test.mjs https://your.vercel.app --live  # + 1 real row
 *
 * Exit code 0 = all passed, 1 = one or more failed.
 */

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000").replace(/\/$/, "");
const live = args.includes("--live");

let passed = 0;
let failed = 0;

function record(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}${detail ? `  — ${detail}` : ""}`);
  }
}

async function get(path) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  const body = await res.text().catch(() => "");
  return { status: res.status, body };
}

async function postLead(payload) {
  const res = await fetch(`${base}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

const routes = [
  ["/", "home"],
  ["/services", "services index"],
  ["/services/house-soft-washing", "service page"],
  ["/services/roof-cleaning", "service page 2"],
  ["/about", "about"],
  ["/contact", "contact"],
  ["/blog", "blog index"],
  ["/blog/pressure-washing-cost-mobile-al", "blog post"],
  ["/daphne", "town page"],
  ["/spanish-fort", "town page 2"],
  ["/sitemap.xml", "sitemap"],
  ["/robots.txt", "robots"],
  ["/thank-you", "thank-you"],
];

async function run() {
  console.log(`\nSmoke test → ${base}${live ? "  (--live: will create ONE Sheet row)" : ""}\n`);

  console.log("Routes (expect 200):");
  for (const [path, label] of routes) {
    try {
      const { status } = await get(path);
      record(`${label} ${path}`, status === 200, `got ${status}`);
    } catch (err) {
      record(`${label} ${path}`, false, String(err));
    }
  }

  console.log("\n404 handling:");
  try {
    const { status } = await get("/this-page-does-not-exist");
    record("unknown route → 404", status === 404, `got ${status}`);
  } catch (err) {
    record("unknown route → 404", false, String(err));
  }

  console.log("\nLead API (no Sheet rows created):");
  try {
    const { status } = await postLead({ name: "No Phone" });
    record("missing phone → 400", status === 400, `got ${status}`);
  } catch (err) {
    record("missing phone → 400", false, String(err));
  }
  try {
    const { status } = await postLead({ name: "No Name Provided" });
    record("missing name → 400", status === 400, `got ${status}`);
  } catch (err) {
    record("missing name → 400", false, String(err));
  }
  try {
    const { status } = await postLead({ name: "Bad", phone: "abc" });
    record("non-numeric phone → 400", status === 400, `got ${status}`);
  } catch (err) {
    record("non-numeric phone → 400", false, String(err));
  }
  try {
    const { status } = await postLead({ name: "Bot", phone: "2515550147", company: "spam co" });
    record("honeypot filled → 200 (swallowed)", status === 200, `got ${status}`);
  } catch (err) {
    record("honeypot filled → 200 (swallowed)", false, String(err));
  }

  if (live) {
    console.log("\nLive lead (creates ONE marked Sheet row):");
    try {
      const stamp = new Date().toISOString();
      const { status, json } = await postLead({
        name: "SMOKE TEST — delete me",
        phone: "2515550147",
        service: "House & Soft Washing",
        town: "Mobile",
        message: `Automated smoke test at ${stamp}. Safe to delete this row.`,
        attribution: { source: "smoke-test", medium: "cli", campaign: "", gclid: "", referrer: "", landingPage: "/" },
      });
      record("live lead → 200 forwarded", status === 200 && json?.data?.ok === true, `got ${status}`);
      console.log("    ↳ check your Sheet for a 'SMOKE TEST — delete me' row + email.");
    } catch (err) {
      record("live lead → 200 forwarded", false, String(err));
    }
  }

  console.log(`\n${failed === 0 ? "PASS" : "FAIL"} — ${passed} passed, ${failed} failed\n`);
  process.exit(failed === 0 ? 0 : 1);
}

run();
