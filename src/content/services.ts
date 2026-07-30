/**
 * Service page content — one entry per service page.
 * Each entry is hand-written and unique. Slugs drive routing
 * (app/services/[slug]) and the sitemap.
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short name for nav, cards, and internal links */
  name: string;
  /** H1 on the service page */
  h1: string;
  /** ~50-60 char meta title (city appended in generateMetadata) */
  metaTitle: string;
  /** ~150-160 char meta description */
  metaDescription: string;
  /** One-line description for the services grid */
  card: string;
  intro: string[];
  includedHeading: string;
  included: string[];
  process: { step: string; detail: string }[];
  /** Why this matters specifically on the central Gulf Coast */
  localNote: { heading: string; body: string[] };
  faqs: Faq[];
  /** Time-sensitive service? Affects CTA copy */
  urgent: boolean;
  /**
   * Optional real before/after photo from one of Dylan's jobs. Only set this
   * where an actual photo of THAT service exists — never reuse an unrelated
   * shot to fill the slot; the page reads fine without one.
   */
  photo?: { src: string; alt: string; width: number; height: number };
};

export const services: Service[] = [
  {
    slug: "house-soft-washing",
    name: "House & Soft Washing",
    h1: "House Washing & Soft Washing in Mobile, AL & the Bay Area",
    metaTitle: "House Washing & Soft Washing | Mobile Bay Area AL",
    metaDescription:
      "Algae, pollen, and salt film washed off vinyl, brick, and wood siding. Soft washing for homes across Mobile, the Eastern Shore, and Baldwin County. Free quotes.",
    card: "A low-pressure wash that lifts algae, pollen, and salt film off your whole exterior.",
    intro: [
      "Gulf Coast homes wear their weather. Humidity feeds mildew on the shaded walls. Spring drops a coat of yellow pine and oak pollen on every surface. Near the bay, salt haze dulls the finish a little more each year. Before long the house just looks tired — even when nothing is actually wrong with it.",
      "Soft washing fixes that without the risk. Instead of blasting your siding, we apply a mild cleaning mix at low pressure, give it time to break down the growth, then rinse it away. The house comes out clean and stays clean longer, because the algae is dead — not just pushed around. Vinyl in West Mobile, painted wood in Midtown, brick on the Eastern Shore: the method adjusts to the surface in front of us.",
    ],
    includedHeading: "What a house wash includes",
    included: [
      "Full exterior: siding, trim, and shutters",
      "Vinyl, Hardie board, painted wood, and stucco",
      "Soffits, fascia, and porch ceilings",
      "Outside gutter surfaces rinsed with the wash",
      "Wasp nests, webs, and dirt-dauber mud knocked down",
      "Front entry and garage door detailed",
      "Pollen and salt film rinsed from the whole exterior",
    ],
    process: [
      { step: "Quick photo quote", detail: "Text a photo of your house and we can price most washes the same day." },
      { step: "Pre-job check", detail: "Before anything sprays, we cover outlets, wet down plants, and note anything fragile." },
      { step: "Apply and dwell", detail: "The soft-wash mix goes on low and slow, then sits long enough to kill the growth." },
      { step: "Top-down rinse", detail: "Everything rinses clean from the roofline down. We don't leave until you've seen it." },
    ],
    localNote: {
      heading: "Salt air, shade, and 66 inches of rain",
      body: [
        "Mobile averages about 66 inches of rain a year — more than Seattle — and the humidity between storms never really breaks. That keeps exterior walls damp, and damp walls grow things. If your house sits under live oaks or faces away from the afternoon sun, the green shows up even faster.",
        "Where you live changes what we're washing off. Close to the bay or down toward Gulf Shores, salt spray leaves a gray film that plain rain never rinses. Older Midtown homes with painted wood and original soffits need a softer touch than the vinyl going up in West Mobile and Baldwin County subdivisions. We match the mix and the pressure to your house, not a one-size setting.",
        "For most homes here, a yearly wash is the sweet spot. It stops the growth before it stains — and keeps HOA letters out of your mailbox.",
      ],
    },
    faqs: [
      {
        q: "What does a house wash cost around Mobile?",
        a: "For a one-story home, most jobs in the area land between $250 and $400. Two stories usually fall in the $400–$650 range. Size, siding, and buildup all move the number, so we confirm an exact written quote before any work starts.",
      },
      {
        q: "What's the difference between soft washing and pressure washing?",
        a: "Pressure washing uses force. Soft washing uses chemistry. On siding, force is the wrong tool — it can crack panels, chip paint, and push water into the wall. Soft washing runs near garden-hose pressure and lets the cleaning mix do the work.",
      },
      {
        q: "Do I need to do anything before you arrive?",
        a: "Close your windows, move cars away from the house, and bring in anything fragile on the porch. We handle the rest, including soaking your plants before and after the wash.",
      },
      {
        q: "How often should a Gulf Coast home be washed?",
        a: "Once a year works for most houses here. Homes under heavy oak shade or right on the water may want it sooner — the growth simply returns faster in those spots.",
      },
    ],
    urgent: false,
    photo: {
      src: "/before-after-soft-wash-brick-wall.jpg",
      alt: "Painted brick wall of a Mobile home before and after soft washing — green algae growth on the left, clean white brick on the right",
      width: 1400,
      height: 1330,
    },
  },
  {
    slug: "roof-cleaning",
    name: "Roof Cleaning",
    h1: "Roof Cleaning in Mobile, AL & the Bay Area",
    metaTitle: "Roof Cleaning & Shingle Streak Removal | Mobile AL",
    metaDescription:
      "Black shingle streaks are algae eating your roof. We kill them with a no-pressure soft wash that's safe for shingles — Mobile down to Gulf Shores. Free quotes.",
    card: "Dark shingle streaks killed at the source with a no-pressure soft wash.",
    intro: [
      "The dark stains running down shingles all over Mobile are a bacteria called Gloeocapsa magma. It eats the limestone inside asphalt shingles, spreads roof to roof on the wind, and keeps your shingles damp and hot. The longer it feeds, the more life it takes off the roof.",
      "The fix is a soft wash — no pressure at all. We apply the treatment shingle makers approve, let it kill the growth, and let the streaks release on their own. Your granules stay put, your warranty stays intact, and the roof stays streak-free for years instead of weeks. We treat shingle, metal, and low-slope roofs on both shores of the bay.",
    ],
    includedHeading: "What roof cleaning includes",
    included: [
      "Soft-wash treatment for asphalt shingle roofs",
      "Gloeocapsa magma (black streak) elimination",
      "Lichen and moss treated where oaks shade the roof",
      "Metal and low-slope roofs cleaned to suit the material",
      "Plants and grass below shielded and rinsed",
      "Downspout runoff managed during treatment",
      "Zero high pressure at any point",
    ],
    process: [
      { step: "Roof look-over", detail: "We check shingle condition, pitch, and how far the growth has spread before quoting." },
      { step: "Written quote", detail: "One firm price in writing. If a roof is too worn to clean safely, we'll tell you that instead." },
      { step: "Treat, don't blast", detail: "The solution goes on at low pressure and stays on the roof to do its work." },
      { step: "Fade-out period", detail: "Heavy streaks keep fading with the next few rains as the dead growth lets go." },
    ],
    localNote: {
      heading: "Why Bay Area roofs streak so fast",
      body: [
        "Warm nights, wet air, and shade are everything roof algae wants — and the central Gulf Coast supplies all three most of the year. Streets under live-oak canopy get hit hardest, and once a couple of roofs on the block show streaks, the wind carries spores to the rest.",
        "There's a practical reason to handle it beyond looks. Ahead of hurricane season, insurers and inspectors pay close attention to roof condition, and heavy streaking makes a sound roof photograph like a failing one. A clean roof takes that question off the table — and runs a touch cooler in August, too.",
      ],
    },
    faqs: [
      {
        q: "What do roof cleanings run in the Mobile area?",
        a: "A typical one-story shingle roof around here falls somewhere in the $350–$600 range. Steeper pitches, second stories, and heavy moss push it up. We put the exact number in writing before we set up.",
      },
      {
        q: "Why can't I just pressure wash the roof?",
        a: "Because pressure strips the granules that protect shingles from the sun. That ages the roof fast, and most manufacturers void the warranty over it. A soft wash removes the streaks without touching the granules.",
      },
      {
        q: "Will my landscaping be okay?",
        a: "Yes — protecting it is part of the job. We soak the beds before treatment, manage what runs off the roof, and rinse everything again before we leave.",
      },
      {
        q: "The streaks are still faintly visible after cleaning. Is that normal?",
        a: "It is. The organism dies the day we treat it, but the darkest staining releases gradually with rain. Give it a few weeks — the fade continues on its own.",
      },
    ],
    urgent: false,
  },
  {
    slug: "driveway-concrete-cleaning",
    name: "Driveways & Concrete",
    h1: "Driveway & Concrete Cleaning Across Mobile, AL & the Bay Area",
    metaTitle: "Driveway & Concrete Cleaning | Mobile Bay Area AL",
    metaDescription:
      "Slick green walkways and gray driveways cleaned edge to edge across the Mobile Bay Area. Algae killed, red clay lifted, no wand stripes. Free written quotes.",
    card: "Even, edge-to-edge concrete cleaning that lifts years of gray in one visit.",
    intro: [
      "Sixty-six inches of rain a year keeps Gulf Coast concrete wet — and wet concrete grows a slippery layer of algae and mold. That's the dark, blotchy look on your driveway, and it's why the front walk feels like ice after a shower. It isn't just ugly. It's how people fall.",
      "Concrete is the one surface that can take our full bite. A spinning surface cleaner works the slab in wide, overlapping passes, so the whole driveway comes up one even shade instead of striped. A pre-treatment kills the growth before we clean, and a post-treatment slows it coming back.",
    ],
    includedHeading: "Flatwork we clean",
    included: [
      "Driveways, aprons, and parking pads",
      "Front walks, steps, and porch slabs",
      "Patios and pool surrounds",
      "Slip-hazard algae killed, not just rinsed away",
      "Red clay splash lifted along edges and curbs",
      "Post-treatment to slow regrowth",
      "Edges and corners finished by hand wand",
    ],
    process: [
      { step: "Measure and quote", detail: "Square footage plus stain type sets the price. Photos get you a fast ballpark." },
      { step: "Pre-treatment", detail: "Cleaning solution goes down first, so the pass kills growth instead of shaving the top off it." },
      { step: "Surface-clean the slab", detail: "Wide, overlapping passes leave one uniform tone across the whole surface." },
      { step: "Rinse and inspect", detail: "We flush the mess clear of your lawn and curb, then walk the finished job with you." },
    ],
    localNote: {
      heading: "Slick walkways are a Gulf Coast hazard",
      body: [
        "Shaded concrete on the Gulf Coast never fully dries between rains, so a film of algae builds all year. By fall, a north-facing sidewalk can be genuinely dangerous — and mail carriers, kids, and grandparents all cross it. Cleaning it is as much a safety job as a curb-appeal job.",
        "Our soil adds its own signature: red clay. It splashes out of beds and bare spots during downpours and dyes the slab orange along the edges. Regular washing keeps the clay from setting for good — and stained flatwork is one of the first things HOAs flag in the newer subdivisions across West Mobile and Baldwin County.",
      ],
    },
    faqs: [
      {
        q: "What's a typical driveway cleaning price?",
        a: "In our market, a two-car driveway generally falls between $100 and $200. Add walkways or a patio to the same visit and the combined rate drops. The exact quote goes in writing before we start.",
      },
      {
        q: "How long does concrete stay clean here?",
        a: "Slabs in full sun can look good for a couple of years. Shaded ones regrow faster — figure on a yearly refresh. The post-treatment we apply buys extra months either way.",
      },
      {
        q: "Do you handle oil spots?",
        a: "We degrease and spot-treat them, and most improve a lot. Oil that has soaked in for years may leave a shadow — we point out what to expect while quoting, not after.",
      },
      {
        q: "Will the runoff hurt my grass or flower beds?",
        a: "No. We wet the edges down first, steer the flow away from beds, and rinse everything after. By the time our solutions reach soil they're diluted far below levels that harm plants.",
      },
    ],
    urgent: false,
    photo: {
      src: "/before-after-driveway-cleaning.jpg",
      alt: "Concrete driveway before and after pressure washing — gray, stained concrete on the left, bright clean concrete on the right",
      width: 1400,
      height: 1219,
    },
  },
  {
    slug: "deck-fence-cleaning",
    name: "Wood, Deck & Fence",
    h1: "Wood, Deck & Fence Cleaning in Mobile, AL & the Bay Area",
    metaTitle: "Deck, Fence & Wood Cleaning | Mobile Bay Area AL",
    metaDescription:
      "Gray, mildewed decks and fences washed back to their real color with wood-safe cleaners and low pressure. Mobile, the Eastern Shore & Baldwin County. Free quotes.",
    card: "Gray, mildewed wood washed back to its real color — without fuzzing the grain.",
    intro: [
      "Wood turns gray here in a hurry. UV breaks down the surface, mildew moves into the damp grain, and within a couple of seasons a new deck looks twenty years old. Fences catch it worse — nobody rinses a fence, so the green just climbs.",
      "Cleaning wood takes restraint. Too much pressure fuzzes the boards and carves wand marks you can't sand out. We use a wood-safe cleaner, gentle rinse pressure, and a brightener when the job calls for it — so decks, fences, pergolas, and porch floors come back to their natural tone, ready to seal or stain.",
    ],
    includedHeading: "Wood surfaces we clean",
    included: [
      "Decks, stairs, and handrails",
      "Wood privacy fences — both sides on request",
      "Pergolas, arbors, and porch floors",
      "Wood-safe detergents matched to the age of the boards",
      "Optional brightener to even out the natural tone",
      "Gentle rinse — no fuzzed grain, no wand lines",
      "Prep cleaning before stain or sealer goes on",
    ],
    process: [
      { step: "Check the wood", detail: "Age, condition, and any old stain decide the cleaner and pressure we use." },
      { step: "Firm written price", detail: "Decks priced by size, fences by the foot — all confirmed in writing first." },
      { step: "Clean and brighten", detail: "Detergent lifts the gray and mildew; a brightener evens the tone if you want it." },
      { step: "Dry-time guidance", detail: "We tell you how long to wait before sealing, staining, or moving furniture back." },
    ],
    localNote: {
      heading: "What Gulf humidity does to bare wood",
      body: [
        "Mildew doesn't just sit on wood here — it roots into the grain and feeds on the damp. With our humidity, an unsealed deck can gray out in two summers, and the fence line along the trees grows a full green coat. Rental decks down in Gulf Shores get a double hit: sun on one side, salt air on the other.",
        "A proper wash is also the cheapest insurance for a stain job. Sealer applied over mildew traps it under the finish, where it lifts and peels within a year. Clean, brightened, fully dry wood is the difference between a stain that lasts and one you redo next spring.",
      ],
    },
    faqs: [
      {
        q: "What does deck or fence cleaning cost?",
        a: "Most decks in the area come in between $150 and $350 depending on size and condition. Fences are priced by the linear foot. Either way, you'll have a written number before we touch anything.",
      },
      {
        q: "Won't a pressure washer tear up the wood?",
        a: "At full pressure, yes — that's the fuzzy, splintered look on badly washed decks. We keep the pressure low and let the wood-safe cleaner do the lifting, which is how the grain stays smooth.",
      },
      {
        q: "How soon after cleaning can I stain?",
        a: "Give the wood two to three dry days after the wash. On the Gulf Coast that sometimes means watching the forecast — we'll help you pick the window.",
      },
      {
        q: "Can you clean composite decking too?",
        a: "Yes. Composite doesn't gray like wood, but it grows the same mildew in this climate. It gets its own cleaner and a gentle rinse.",
      },
    ],
    urgent: false,
  },
  {
    slug: "brick-masonry-cleaning",
    name: "Brick & Masonry",
    h1: "Brick & Masonry Cleaning for Mobile, AL & the Bay Area",
    metaTitle: "Brick & Masonry Soft Washing | Mobile Bay Area AL",
    metaDescription:
      "Brick cleaned at pressures old mortar can handle, across Mobile & the Bay Area — algae, grime, and white efflorescence bloom all treated. Free written quotes.",
    card: "Brick, stone, and mortar cleaned at pressures old masonry can actually handle.",
    intro: [
      "Brick looks indestructible, but it's full of pores — and on the Gulf Coast those pores fill with algae, mildew, and grime. Old mortar is even softer than the brick. Hit a 1940s Midtown chimney with raw pressure and you can wash the joints right out of it.",
      "So we treat masonry like the specialty it is. Soft washing handles the biological growth on walls and chimneys. Careful, controlled pressure handles brick patios and steps. Efflorescence — that white, chalky bloom — gets its own dedicated treatment. The result is clean brick with the mortar, and the character, still in place.",
    ],
    includedHeading: "Masonry we clean",
    included: [
      "Brick homes, walls, and chimneys",
      "Brick and stone patios, steps, and walkways",
      "Retaining walls and mailbox columns",
      "Efflorescence (white mineral bloom) treatment",
      "Soft-wash method on aged or historic mortar",
      "Growth killed inside the pores, not smeared over them",
    ],
    process: [
      { step: "Assess the masonry", detail: "Age and mortar condition come first — they decide the whole approach." },
      { step: "Test spot", detail: "We prove the method on a small, low-visibility area before touching the full wall." },
      { step: "Clean by the right method", detail: "Soft wash for growth, controlled pressure for flatwork, dedicated treatment for mineral stains." },
      { step: "Slow rinse-down", detail: "Porous brick holds cleaner, so we rinse longer than you'd think necessary." },
    ],
    localNote: {
      heading: "Old brick and new brick are different jobs",
      body: [
        "Mobile has both extremes. Midtown and downtown are full of brick from the early and mid-1900s, laid with soft lime mortar that modern pressure washers chew apart. Meanwhile, brick-front homes go up across Baldwin County every month with hard modern mortar that tolerates far more. Treating the two the same is how brick gets ruined.",
        "The climate works on both. Constant humidity feeds growth in the brick face. Sixty-six inches of rain drives moisture through the wall — which is where efflorescence comes from. And red clay stains the bottom courses orange after storms. Each of those needs different chemistry, and we bring all three.",
      ],
    },
    faqs: [
      {
        q: "What does brick house washing cost?",
        a: "It tracks close to standard house washing: figure $250–$400 for most one-story brick homes, more with a second story or heavy growth. A firm written quote comes first, always.",
      },
      {
        q: "Can pressure washing really damage brick?",
        a: "Yes. Spalled brick faces and gouged mortar joints are common on homes washed carelessly. Once the hard outer face of a brick is blown off, the soft core soaks up water forever. That's why aged masonry gets soft washing from us.",
      },
      {
        q: "What is the white chalky stuff on my brick?",
        a: "That's efflorescence — minerals carried out of the wall by moisture and left on the surface as it dries. Regular washing won't remove it. It needs a dedicated treatment, which we include when we see it.",
      },
      {
        q: "Do you clean painted brick?",
        a: "We do, with the same low-pressure method we use on siding. Paint on brick chips easily under pressure, so the cleaner does the work and the rinse stays gentle.",
      },
    ],
    urgent: false,
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning & Brightening",
    h1: "Gutter Cleaning & Brightening in Mobile, AL & the Bay Area",
    metaTitle: "Gutter Cleaning & Brightening | Mobile Bay Area AL",
    metaDescription:
      "Gulf Coast downpours punish clogged gutters. We hand-clear troughs, flush downspouts, and brighten black tiger stripes across the Mobile Bay Area. Free quotes.",
    card: "Clogs cleared from the inside, tiger stripes scrubbed off the outside.",
    intro: [
      "Gutters on the Gulf Coast have one job: move a lot of water, fast, over and over. One clog during a summer downpour and the overflow goes straight down your fascia boards, behind your flower beds, and — worst case — toward the slab. With oaks and pines dropping debris year-round here, clogs aren't an if.",
      "We handle both halves of gutter care. Cleaning means clearing leaves, pine straw, and shingle grit out of the troughs and flushing every downspout until it runs free. Brightening is the cosmetic half: scrubbing off the black 'tiger stripes' that streak the outside face, which a regular house wash alone won't remove.",
    ],
    includedHeading: "What gutter service includes",
    included: [
      "All troughs cleared by hand and flushed",
      "Every downspout tested until it drains free",
      "Debris bagged and hauled off — not dumped in your beds",
      "Tiger-stripe (black streak) brightening on gutter faces",
      "Loose spikes and obvious sag flagged for you",
      "Photo proof of clean troughs on request",
    ],
    process: [
      { step: "Count and quote", detail: "Linear feet and roof height set the price; brightening is quoted separately." },
      { step: "Scoop and bag", detail: "Debris comes out by hand into bags — none of it lands on your lawn." },
      { step: "Flush test", detail: "Water runs through every trough and downspout until it all drains at full speed." },
      { step: "Brighten if booked", detail: "A dedicated cleaner and soft brushing lift the oxidation stripes off the faces." },
    ],
    localNote: {
      heading: "Built for 66-inch rain years",
      body: [
        "The Gulf Coast doesn't get gentle rain — it gets inches per hour. A gutter half full of oak leaves and pine straw simply can't pass that volume, and the overflow finds your fascia boards, your foundation line, and your beds. Rotted fascia from chronic overflow is one of the most common repairs on older Mobile homes.",
        "Timing matters here more than most places. Clearing gutters before June means the system is ready when hurricane-season rain bands arrive. A second pass after the oaks drop keeps winter storms from backing things up. Two visits a year covers most homes under trees.",
      ],
    },
    faqs: [
      {
        q: "What does gutter cleaning cost in the area?",
        a: "Most single-story homes around here run $100–$200 for a full clean-out, two-story homes more, and face brightening is an add-on priced by the foot. You get the exact figure in writing up front.",
      },
      {
        q: "What are the black stripes on my gutters?",
        a: "They're oxidation and grime bonded to the aluminum finish — often called tiger stripes. Rinsing won't budge them. They need a dedicated brightening cleaner and hand agitation, which is exactly what our brightening service is.",
      },
      {
        q: "How often should Gulf Coast gutters be cleaned?",
        a: "Twice a year for most homes — once before hurricane season and once after the fall drop. Homes sitting directly under oaks or pines can need a third pass.",
      },
      {
        q: "Do you install gutter guards?",
        a: "Installation isn't our lane, but we clean guarded gutters too — guards slow debris down, they don't stop it. We'll give you an honest read on how your current setup is holding up.",
      },
    ],
    urgent: false,
  },
  {
    slug: "rust-stain-removal",
    name: "Rust & Stain Removal",
    h1: "Rust & Stain Removal Across Mobile, AL & the Bay Area",
    metaTitle: "Rust & Stain Removal | Mobile AL & the Bay Area",
    metaDescription:
      "Orange irrigation rust, red clay, and set-in stains lifted from concrete and brick with targeted chemistry — Mobile, AL & the Bay Area. Free written quotes.",
    card: "Orange rust, red clay, and set-in stains lifted with targeted chemistry.",
    intro: [
      "Some stains laugh at a pressure washer. Orange rust trails from irrigation water. Red clay ground into a white driveway. Battery marks from a golf cart, fertilizer burn spots on the sidewalk. These are chemical stains, bonded into the surface — pressure alone just gives you a cleaner stain.",
      "This is where we go in for the kill — with chemistry, not force. Each stain type gets a remover made for it, applied to the spot, given time to work, then neutralized. Done wrong, rust removers etch concrete and burn grass. Done right, the stain lifts and the surface around it looks untouched.",
    ],
    includedHeading: "Stains we treat",
    included: [
      "Irrigation and well-water rust trails",
      "Fertilizer and battery-acid staining",
      "Red clay stains on concrete, siding, and curbs",
      "Leaf, acorn, and tannin shadows",
      "Rust rings from furniture, planters, and grills",
      "Surface-safe removers for concrete, brick, and stone",
      "An honest read up front on what will and won't lift",
    ],
    process: [
      { step: "Identify the stain", detail: "Rust, clay, tannin, and oil each need a different product — guessing wrong wastes your money." },
      { step: "Quote with expectations", detail: "We tell you up front how much lift to expect. Some old stains only fade." },
      { step: "Targeted application", detail: "Remover goes on the stain, not the whole slab, and dwells only as long as needed." },
      { step: "Neutralize and rinse", detail: "We neutralize the chemistry and rinse thoroughly so nothing keeps working on your concrete." },
    ],
    localNote: {
      heading: "Where Gulf Coast stains come from",
      body: [
        "A lot of local irrigation runs on well water, and much of it carries iron. Every cycle sprays a fine mist of it across driveways, curbs, and fences — that's the orange trail you see on so many corners in West Mobile and across Baldwin County. It builds slowly, and by the time you notice it, it's fully set.",
        "Then there's our soil. Red clay stains anything it touches, and around new construction on the Eastern Shore it gets tracked and splashed onto fresh concrete constantly. Add tannin drips from oak leaves and acorns every fall, and Gulf Coast flatwork collects a whole catalog of stains that need more than water.",
      ],
    },
    faqs: [
      {
        q: "How much does rust or stain removal cost?",
        a: "Small spot treatments usually run $75–$150. Bigger areas — like a fully rust-streaked driveway — are priced by the job, often bundled with a driveway cleaning at a better rate. The written quote comes before anything goes down.",
      },
      {
        q: "Can every stain be removed?",
        a: "No, and we'd rather say so up front. Fresh rust and clay usually lift fully. Stains that have baked in for years may only fade. We tell you what's realistic while quoting, not after.",
      },
      {
        q: "Are rust removers safe for my concrete?",
        a: "The ones made for concrete are, used correctly. The danger is generic remover left on too long — it can etch the surface white. We use surface-matched products, timed dwells, and a neutralizing rinse.",
      },
      {
        q: "The rust keeps coming back. Why?",
        a: "Because the source is still running — usually iron-heavy irrigation water hitting the same spot. We remove the stain and show you exactly where it's coming from, so a sprinkler-head adjustment keeps it gone.",
      },
    ],
    urgent: false,
  },
  {
    slug: "commercial-pressure-washing",
    name: "Commercial & Construction",
    h1: "Commercial & Construction Washing in Mobile, AL & the Bay Area",
    metaTitle: "Commercial & Construction Washing | Mobile Bay AL",
    metaDescription:
      "Post-construction washdowns, storefronts, and HOA common areas cleaned across Mobile, Baldwin County & the beaches. One-time or on a schedule. Free bids.",
    card: "Post-construction washdowns, storefronts, and common areas — on your schedule.",
    intro: [
      "A construction project isn't finished until it's clean. Concrete splatter on new flatwork, red mud on curbs and streets, dust and mortar haze on everything — the last impression a builder leaves is whatever the washdown crew leaves behind. We handle post-construction exterior cleanup so your site photographs like the finished product it is.",
      "We also keep working properties clean: storefronts, restaurant walkways, office entries, HOA common areas, and condo and rental exteriors down at the beach. One-time deep cleans or a standing schedule, worked around your hours. You get a clear scope, a firm price, and the same result every visit.",
    ],
    includedHeading: "Commercial work we handle",
    included: [
      "Post-construction washdowns for builders and GCs",
      "Red mud and concrete splatter removed from curbs and flatwork",
      "Storefront entries, walkways, and drive-thrus",
      "Dumpster pads and grease zones degreased",
      "HOA and condo common areas, pool decks, and breezeways",
      "Gum, spill, and traffic-stain removal on sidewalks",
      "Recurring schedules or one-time cleans",
    ],
    process: [
      { step: "Scope the site", detail: "Walk-through or plans — either works. We define exactly what gets cleaned and to what standard." },
      { step: "Bid in writing", detail: "Flat bid for washdowns, per-visit pricing for maintenance schedules. No hourly mystery." },
      { step: "Work your windows", detail: "Nights, early mornings, weekends, or between trades on an active site." },
      { step: "Punch-list ready", detail: "We photograph the finished areas so you have documentation for the owner or the file." },
    ],
    localNote: {
      heading: "A building boom needs washdown crews",
      body: [
        "The Eastern Shore and Baldwin County are among the fastest-growing parts of Alabama, and every new build ends the same way: a site covered in red mud, concrete splash, and construction dust that has to disappear before the punch list closes. A clean washdown is one of the cheapest ways a builder makes the finished product look worth its price.",
        "Down in Gulf Shores and Orange Beach the pressure is different but constant — salt air films the railings and glass, and vacation-rental turnover means the exterior gets judged in listing photos all year. For storefronts around Mobile, it's the daily grind of gum, spills, and shaded-sidewalk algae. Different properties, same answer: a cleaning schedule that fits how the property actually gets dirty.",
      ],
    },
    faqs: [
      {
        q: "What does commercial or construction washing cost?",
        a: "Every property is different, so each one gets its own bid — a flat price for a post-construction washdown, per-visit pricing on maintenance routes. Smaller storefront jobs in the area often start around a couple hundred dollars. The written bid always comes before the work.",
      },
      {
        q: "Can you clean an active construction site?",
        a: "Yes. We coordinate with your superintendent, work between trades, and stay out of the way of ongoing work. Final washdowns usually happen after paint and before the walkthrough.",
      },
      {
        q: "Do you provide documentation for our vendor file?",
        a: "Ask for what your company or property manager requires, and we'll get the paperwork squared away during job setup — before any work begins.",
      },
      {
        q: "Will you work outside business hours?",
        a: "That's normal for commercial work. Restaurants and storefronts usually get early-morning slots so everything is dry before customers arrive.",
      },
    ],
    urgent: false,
    photo: {
      src: "/before-after-construction-washdown.jpg",
      alt: "Steel-frame commercial building under construction before and after a post-construction washdown — red clay dust on the slab, then clean concrete",
      width: 1400,
      height: 1303,
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
