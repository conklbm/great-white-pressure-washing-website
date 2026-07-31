/**
 * Area page content — one entry per town, ALL hand-written and unique.
 *
 * RULE (from the build brief): these must never be template output with a
 * town name swapped in. Each entry references real neighborhoods, roads,
 * housing stock, and the local conditions that drive pressure-washing need
 * (tree cover, humidity, salt air, HOA rules, siding types). When adding a
 * town, write it fresh — fewer strong pages beat many thin ones.
 */

import type { Faq } from "./services";

export type Town = {
  slug: string;
  name: string;
  county: "Mobile" | "Baldwin";
  /** true only for Mobile — the primary market page */
  isPrimary?: boolean;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** short line for the service-area list on the homepage */
  card: string;
  intro: string[];
  local: { heading: string; body: string[] };
  /** places referenced naturally in copy & useful for internal linking */
  landmarks: string[];
  faqs: Faq[];
};

export const towns: Town[] = [
  {
    slug: "mobile",
    name: "Mobile",
    county: "Mobile",
    isPrimary: true,
    h1: "Pressure Washing in Mobile, Alabama",
    metaTitle: "Mobile AL Pressure Washing | Great White Pressure Washing",
    metaDescription:
      "Great White Pressure Washing cleans houses, roofs, and driveways all over Mobile, AL — from historic districts downtown to Schillinger Road. Free quotes.",
    card: "Where we started — downtown's historic districts out to the Schillinger Road subdivisions.",
    intro: [
      "Mobile is where Great White Pressure Washing lives and works. It rains here more than almost any city in America. Add the heat, the shade from old oaks, and a pollen season that turns everything yellow, and every home in town is in a slow fight with mildew. Our job is to win that fight for you — house, roof, driveway, fence, and all.",
      "We take that fight to every part of the city. That means the old homes of Ashland Place, De Tonti Square, and Church Street East, the streets around Spring Hill College, and the newer neighborhoods off Grelot, Hillcrest, and Schillinger in West Mobile. It also means storefronts and offices along Government Street and downtown, where first impressions pay the bills.",
    ],
    local: {
      heading: "Every Mobile neighborhood gets dirty its own way",
      body: [
        "In the historic districts, the enemy is age plus shade. Homes in Ashland Place or near Spring Hill College often have painted wood, old brick, and detailed trim that a pressure wand would ruin. We clean those with a soft wash — low pressure and the right mix — so the mildew dies and the hundred-year-old finish stays put. Roofs under oak canopy get the same gentle treatment, because black streaks on shingles are algae, not dirt, and blasting them shortens the roof's life.",
        "West Mobile is a different job. Out along Grelot, Hillcrest, and Schillinger, most homes wear vinyl or brick with wide concrete driveways. The shaded side of vinyl turns green in a season or two, and light concrete goes gray and spotted. A soft wash brings the siding back, and a surface cleaner pulls years of black staining out of the driveway in one visit.",
        "Downtown and along Government Street, we shift to commercial mode: sidewalks, entryways, awnings, and drive-thrus. Between the weather and the foot traffic — Mardi Gras season included — these surfaces take a beating, and regular cleaning keeps them safe and presentable.",
      ],
    },
    landmarks: [
      "Ashland Place",
      "De Tonti Square",
      "Church Street East",
      "Spring Hill College",
      "Grelot Road",
      "Hillcrest Road",
      "Schillinger Road",
      "Government Street",
    ],
    faqs: [
      {
        q: "What parts of Mobile do you serve?",
        a: "All of them. Downtown, the historic districts, the Spring Hill College area, West Mobile out past Schillinger, and everything between. We also run routes north to Saraland and south to Theodore, so nowhere in the city is out of reach.",
      },
      {
        q: "Will pressure washing hurt my old house?",
        a: "High pressure would — that's why we don't use it on siding. Older Mobile homes get a soft wash: gentle pressure and a cleaning solution that kills the mildew without lifting paint or chewing up mortar. The house comes clean and stays intact.",
      },
      {
        q: "When is the best time of year to wash a house in Mobile?",
        a: "Any season works, but a lot of folks wash in late spring, right after the pollen drops. That clears the yellow film and the winter mildew in one pass. Homes under heavy shade may want a second visit before the holidays.",
      },
    ],
  },
  {
    slug: "tillmans-corner",
    name: "Tillmans Corner",
    county: "Mobile",
    h1: "Pressure Washing in Tillmans Corner, AL",
    metaTitle: "Pressure Washing in Tillmans Corner, AL | Great White",
    metaDescription:
      "House washing, driveway cleaning, and storefront washing in Tillmans Corner, AL. Great White covers the neighborhoods off Three Notch and Hamilton Blvd.",
    card: "Hard-working neighborhoods off Three Notch and Hamilton Boulevard — homes and businesses alike.",
    intro: [
      "Tillmans Corner sits where I-10 meets Highway 90, and it works hard — busy roads, busy businesses, and street after street of family homes tucked behind the commercial front. We serve the whole community, from the neighborhoods off Three Notch Road and McDonald Road to the shops and restaurants that face the traffic every day.",
      "Homes here are mostly single-story brick and vinyl on flat lots. Flat means water sits, and sitting water grows green stuff — on siding, on fences, and especially on driveways. One visit from us can handle it all: a gentle house wash, a bright driveway, and gutters that don't have black stripes running down the face.",
    ],
    local: {
      heading: "Flat ground, damp shade, and roadside grime",
      body: [
        "Because so much of Tillmans Corner is level, rain drains slowly and shaded spots stay wet for days. That's exactly what algae wants. North-facing brick picks up a green haze, vinyl darkens under the eaves, and concrete patios and drives go blotchy. We treat the growth first, then clean — so surfaces stay brighter longer instead of greening back up in a month.",
        "There's also the road factor. Living near Hamilton Boulevard and Highway 90 means exhaust film and road dust settle on everything, and gutters collect the ugly black streaks called tiger striping. Gutter brightening is one of our most-requested add-ons in this area for a reason — it makes the whole front of a house look newer.",
        "For the businesses along the corridor, we wash storefronts, sidewalks, entrances, and dumpster areas, scheduled around your open hours. Clean walkways aren't just about looks — algae on smooth concrete is a slip hazard, and it's cheap to prevent.",
      ],
    },
    landmarks: ["Three Notch Road", "Hamilton Boulevard", "McDonald Road", "Highway 90", "I-10"],
    faqs: [
      {
        q: "Tillmans Corner isn't an official city. Do you still cover it?",
        a: "Absolutely. Unincorporated just means no city hall — it doesn't change anything for us. If your address says Mobile 36619 or anywhere around Tillmans Corner, you're squarely in our service area.",
      },
      {
        q: "My gutters have black stripes down the outside. Can those come off?",
        a: "Usually, yes. Those stripes are oxidation and grime bonded to the gutter face, and a normal house wash won't touch them. We use a dedicated gutter-brightening treatment that scrubs them back to white in most cases.",
      },
      {
        q: "Can you wash my house and driveway on the same trip?",
        a: "Yes, and it's the smart way to do it. Bundling the house, driveway, and any patios or walkways into one visit costs less than booking them separately, and the whole property matches when we leave.",
      },
    ],
  },
  {
    slug: "theodore",
    name: "Theodore",
    county: "Mobile",
    h1: "Pressure Washing in Theodore, AL",
    metaTitle: "Theodore AL Pressure Washing & Roof Cleaning | Great White",
    metaDescription:
      "Pressure washing in Theodore, AL — roof cleaning, house washing, and rust stain removal for wooded lots and acreage off Theodore Dawes Road. Free quotes.",
    card: "Big wooded lots off Theodore Dawes Road — green roofs, long driveways, and well-water rust stains.",
    intro: [
      "Theodore is green country. South of I-10, the lots get bigger, the trees get thicker, and the air stays damp off the water near Fowl River and Hollingers Island. It's a beautiful place to live — and one of the toughest places around to keep a roof and siding clean.",
      "We spend a lot of time down here for that reason. Shaded shingles streak and grow moss. Siding turns green on whichever side the sun can't reach. And on properties running well water for irrigation, sprinklers paint orange rust stains across brick, concrete, and fences. We handle all of it — soft washing for the house and roof, surface cleaning for the drives, and dedicated rust treatments that regular washing can't match.",
    ],
    local: {
      heading: "Shade, moisture, and the orange stain problem",
      body: [
        "Off Theodore Dawes Road and down toward Bellingrath Gardens, tree cover is heavy and constant. A roof that never fully dries is a roof that grows algae, moss, and lichen — and all three have to be killed with a proper soft wash, not blasted, or the shingles lose their protective granules. The same goes for shaded siding: we treat the growth at the root so it doesn't bounce right back in Theodore's damp air.",
        "The signature Theodore problem, though, is rust. Plenty of homes on acreage out here irrigate from wells, and iron in that water leaves bright orange streaks on everything the sprinklers touch. That stain laughs at a pressure washer. We remove it with a purpose-made rust treatment, then you can see the brick and concrete's real color again.",
        "Long private drives are the other staple. Years of leaf litter and shade leave them dark and slick, and a surface cleaner run pulls them back to a clean, even gray from the road all the way to the garage.",
      ],
    },
    landmarks: ["Theodore Dawes Road", "Bellingrath Gardens and Home", "Fowl River", "Hollingers Island", "Highway 90"],
    faqs: [
      {
        q: "My sprinklers left orange stains all over the driveway and brick. Is that fixable?",
        a: "In most cases, yes. That orange is iron from well water, and it bonds to the surface — pressure alone won't budge it. We apply a rust-removal treatment made for exactly this, and it dissolves the stain instead of just wetting it.",
      },
      {
        q: "There's moss growing on my roof. Should I worry?",
        a: "It's worth dealing with. Moss holds moisture against the shingles and can lift their edges over time. We soft wash it — no scraping, no high pressure — so the moss and algae die off and the roof sheds them without damage.",
      },
      {
        q: "We're out on acreage. Do you come this far?",
        a: "Yes. Theodore's rural stretches are a regular part of our route, and long driveways and outbuildings are jobs we quote all the time. Distance inside our service area doesn't add a fee.",
      },
    ],
  },
  {
    slug: "semmes",
    name: "Semmes",
    county: "Mobile",
    h1: "Pressure Washing in Semmes, AL",
    metaTitle: "Semmes AL Pressure Washing & House Washing | Great White",
    metaDescription:
      "House washing and driveway cleaning in Semmes, AL. Great White handles new-subdivision homes, red clay stains, and shaded siding off Moffett and Snow Road.",
    card: "One of Mobile County's fastest-growing towns — new homes, big trees, and that famous red clay.",
    intro: [
      "Semmes used to be known for its plant nurseries — the whole area was once called the blossom trail. Now it's known for growth. New subdivisions keep rising off Moffett Road and Snow Road, and families keep moving in for the space and the schools around Mary G. Montgomery.",
      "New construction brings a cleaning problem all its own: red clay. It rides in on tires and boots, washes out of bare yards, and stains fresh concrete orange-brown before a home is even a year old. Add the usual Gulf Coast mildew on shaded vinyl, and even brand-new houses in Semmes need real exterior care. That's our lane — soft washing for the siding, surface cleaning for the concrete, and stain treatments for the clay.",
    ],
    local: {
      heading: "New homes, red dirt, and shade trees that stayed",
      body: [
        "When builders clear a lot in Semmes, the red clay underneath gets everywhere. It splashes onto brick skirts during rain, tracks up driveways, and settles into the pores of new concrete. Catching it early matters — clay that sits for years works deep into the surface and may only fade rather than vanish. We're straight with you about that before we start, and the sooner we treat it, the better the result.",
        "Plenty of Semmes lots also kept their big trees, and those trees do what trees do: drop shade. The north side of a vinyl-sided house here can green up in under two years. Our soft wash kills that growth instead of smearing it around, which is why the clean holds up through the humid months.",
        "And because so many of these neighborhoods are newer, appearance standards are real. A yearly wash of the house and driveway keeps your place at the front of the street instead of the back — and keeps any HOA letters in someone else's mailbox.",
      ],
    },
    landmarks: ["Moffett Road (US-98)", "Snow Road", "Mary G. Montgomery High School", "Semmes Heritage Park"],
    faqs: [
      {
        q: "Our new driveway already has orange-red stains. What are they?",
        a: "That's Semmes red clay, and it's the most common stain we see on new concrete out here. Fresh stains usually clean up well with the right treatment. Older, deeper clay stains improve a lot but may not disappear completely — we'll tell you what to expect up front.",
      },
      {
        q: "The builder just finished our house. Is it too new to wash?",
        a: "Not at all — post-construction is actually a great time. Building leaves dust, mortar splatter, and clay marks behind, and a gentle wash gives you the clean-slate look the model home had. From there, a yearly wash keeps it that way.",
      },
      {
        q: "Do you use high pressure on vinyl siding?",
        a: "Never on siding. High pressure can crack vinyl panels and push water behind them. We soft wash instead — the cleaning solution does the work at low pressure, and the siding comes out bright with zero damage.",
      },
    ],
  },
  {
    slug: "saraland",
    name: "Saraland",
    county: "Mobile",
    h1: "Pressure Washing in Saraland, AL",
    metaTitle: "Saraland AL Pressure Washing & Roof Wash | Great White",
    metaDescription:
      "Pressure washing in Saraland, AL — house washing, roof cleaning, and driveways from Norton Avenue to the Celeste Road subdivisions. Free quotes, fast scheduling.",
    card: "Fast-growing north of the city — school-district subdivisions off Celeste Road and the Highway 43 strip.",
    intro: [
      "Ask anyone why they moved to Saraland and you'll hear the same answer: the schools. Since the city started its own district, subdivisions have multiplied off Celeste Road and along the I-65 side of town, filling with young families and newer homes. The older heart of town around Norton Avenue and Saraland Boulevard has its own generation of brick ranches and established yards.",
      "Both kinds of homes fight the same climate. We give each the right treatment: a careful soft wash for older brick and painted trim, a full house-and-roof clean for the newer vinyl builds, and surface cleaning that turns gray, spotted driveways bright again. Great White runs regular routes through Saraland, so scheduling is quick.",
    ],
    local: {
      heading: "A growing town with two kinds of houses",
      body: [
        "The new subdivisions off Celeste Road share a look: vinyl or brick-and-vinyl homes, young trees, and lots of fresh concrete. Fresh concrete is porous, and the sooner it gets a first proper cleaning, the less organic staining sets in for good. Shaded vinyl walls green up here the same as everywhere on the Gulf Coast, and our soft wash clears them without the cracking risk a pressure wand brings.",
        "Closer to Norton Avenue and the older streets, homes have decades of character — and decades of buildup. Mature trees mean shade and leaf tannin on walkways; older brick and painted wood mean low pressure only. We adjust the method house by house instead of running one setting for the whole street.",
        "Along Highway 43, Saraland's business strip needs its own kind of attention: storefront washing, sidewalk cleaning, and entrance areas kept free of the algae that makes smooth concrete slick. We work around business hours and can set a recurring schedule so it never gets bad in the first place.",
      ],
    },
    landmarks: ["Celeste Road", "Norton Avenue", "Saraland Boulevard", "Highway 43", "I-65"],
    faqs: [
      {
        q: "How fast can you get to Saraland?",
        a: "Usually within days, not weeks. We run standing routes through north Mobile County, so Saraland jobs slot right in. Quotes are free and most homes can be quoted from a quick conversation and a look at the property.",
      },
      {
        q: "Our roof has dark streaks even though the house is only a few years old. Why?",
        a: "Those streaks are roof algae, and they show up on new shingles just as happily as old ones — especially on shaded sections. We remove them with a soft wash, which is the shingle manufacturers' recommended method, so the roof gets clean without losing granules.",
      },
      {
        q: "Do you serve Satsuma and Creola too?",
        a: "Yes. Our north-county coverage includes Satsuma, Creola, and Chickasaw along with Saraland, all at the same pricing.",
      },
    ],
  },
  {
    slug: "daphne",
    name: "Daphne",
    county: "Baldwin",
    h1: "Pressure Washing in Daphne, AL",
    metaTitle: "Daphne AL Pressure Washing & Soft Washing | Great White",
    metaDescription:
      "Soft washing, roof cleaning, and driveway washing in Daphne, AL. Great White serves Olde Towne, TimberCreek, and the Highway 181 corridor. Free quotes.",
    card: "The Jubilee City — bay humidity, pine shade, and neighborhoods from Olde Towne to TimberCreek.",
    intro: [
      "Daphne calls itself the Jubilee City, after the rare summer nights when the bay pushes fish and crabs right up to shore. The bay gives Daphne its charm — and its humidity. Air that damp keeps mildew growing on siding, roofs, and fences nearly year-round, from the oaks of Olde Towne down to the newest streets off Highway 181.",
      "Great White covers all of it. We soft wash bayside homes near May Day Park, clean roofs and driveways through the golf-course streets of TimberCreek, and keep the fast-growing 181 corridor neighborhoods looking as new as they are. Houses, roofs, concrete, fences, gutters — one call, one visit.",
    ],
    local: {
      heading: "Bay air, pine shade, and neighborhoods that notice",
      body: [
        "Daphne's tree mix leans heavily on pines, and pines are messy neighbors. They drop needles that stain concrete with tannin, they shade roofs that then streak black, and their pollen coats everything green-gold each spring. A surface cleaning brings walkways and drives back from the tannin, and a roof soft wash clears the streaks without harming the shingles.",
        "Closer to the water — Olde Towne, Main Street, the streets near Village Point Park Preserve — the bay humidity does the heavy lifting for the mildew. Homes there benefit from a wash on a regular rhythm rather than waiting for the green to show, because by the time you can see it from the street, it's been growing a while.",
        "East of town, the newer communities off Highway 181 like TimberCreek and Jubilee Farms hold high standards for how homes present. We help owners stay comfortably ahead of that — an annual house wash plus driveway cleaning is the usual package, and it keeps the whole property matched and bright.",
      ],
    },
    landmarks: ["Olde Towne Daphne", "May Day Park", "Village Point Park Preserve", "TimberCreek", "Highway 181", "Main Street"],
    faqs: [
      {
        q: "We're near the bay. Does that change how often we should wash?",
        a: "It shortens the cycle a bit. Bay humidity keeps surfaces damp longer, so mildew returns faster than it does inland. Most bayside Daphne homes do well washing once a year, with shaded or north-facing walls sometimes wanting attention sooner.",
      },
      {
        q: "Pine needles have stained our sidewalk brown. Will that clean up?",
        a: "Yes — tannin staining from needles and leaves is one of the most satisfying things we clean. A treatment plus surface cleaning lifts the brown out, and keeping the needles blown off afterward slows it from coming back.",
      },
      {
        q: "Do you handle whole-property jobs — house, driveway, fence, the works?",
        a: "That's our favorite kind of job. Bundling the house wash with the driveway, walkways, fence, and gutter faces gets you a better price than piecing it out, and everything matches when we're done.",
      },
    ],
  },
  {
    slug: "spanish-fort",
    name: "Spanish Fort",
    county: "Baldwin",
    h1: "Pressure Washing in Spanish Fort, AL",
    metaTitle: "Spanish Fort AL Pressure Washing & Roof Wash | Great White",
    metaDescription:
      "Pressure washing in Spanish Fort, AL — house and roof soft washing for wooded neighborhoods off Highway 225, plus storefronts near the Town Center. Free quotes.",
    card: "Wooded hills above the Delta — newer homes off Highway 225 and busy retail around the Town Center.",
    intro: [
      "Spanish Fort looks out over the Mobile-Tensaw Delta, one of the wildest stretches of river country in America. That view comes with a trade-off: mornings of fog and damp air rolling up from the Delta into the wooded hills where most of the town's neighborhoods sit. Damp plus shade is the recipe for everything we clean.",
      "The town itself is mostly newer — communities like Stonebridge and the streets off Highway 225 have gone up fast, and the retail around Spanish Fort Town Center has grown right alongside them. Great White keeps both sides sharp: soft washing for homes and roofs on those shaded lots, and storefront, sidewalk, and entrance cleaning for the businesses.",
    ],
    local: {
      heading: "Delta damp on new construction",
      body: [
        "A house doesn't have to be old to grow algae — it just has to stay damp. Spanish Fort's tree-heavy lots and Delta humidity mean even five-year-old homes show green film on shaded siding and dark streaks creeping across the roof. We clear both with a soft wash, which matters double on newer homes: the siding warranty and the shingle warranty both frown on high pressure, and our method respects them.",
        "New neighborhoods also mean recent construction, and we do a steady business in post-build cleanup — concrete dusted with mortar, driveways marked by equipment, and clay tracked across flatwork. A proper first cleaning is the best money a new homeowner spends on the exterior, because it stops early stains from becoming permanent ones.",
        "Around Spanish Fort Town Center and the Highway 31 corridor, we keep commercial properties presentable on one-time or recurring schedules — sidewalks, storefront glass surrounds, entrances, and curbs, timed around your business hours.",
      ],
    },
    landmarks: ["Highway 225", "Stonebridge", "Spanish Fort Town Center", "Highway 31", "Mobile-Tensaw Delta", "Historic Blakeley State Park"],
    faqs: [
      {
        q: "Our house is fairly new. Can washing void the siding or roof warranty?",
        a: "The opposite — improper washing can. That's why we soft wash: low pressure with the right cleaning mix is the method siding and shingle manufacturers recommend, so the house gets clean and the warranties stay intact.",
      },
      {
        q: "We just closed on new construction. What should be cleaned first?",
        a: "Start with the concrete. Construction leaves mortar dust, tire marks, and clay on the driveway and walks, and cleaning it early keeps those from setting in. A gentle house rinse to clear the building dust finishes the job.",
      },
      {
        q: "Do you clean business properties near the Town Center?",
        a: "Yes — storefronts, sidewalks, entrances, and dumpster pads throughout the Town Center area and along Highway 31. We can do a one-time refresh or a recurring schedule, whichever fits.",
      },
    ],
  },
  {
    slug: "fairhope",
    name: "Fairhope",
    county: "Baldwin",
    h1: "Pressure Washing in Fairhope, AL",
    metaTitle: "Fairhope AL Soft Washing & Pressure Washing | Great White",
    metaDescription:
      "Gentle exterior cleaning in Fairhope, AL — soft washing for older homes, driveway and walkway cleaning, and storefronts near Fairhope Avenue. Free quotes.",
    card: "A town built on curb appeal — gentle washing for cottages, courtyards, and the streets that show them off.",
    intro: [
      "Fairhope may care more about appearances than any town on the Gulf Coast — and it shows, from the flower baskets on Fairhope Avenue to the tidy courtyards of the French Quarter shops. When a whole town keeps itself this nice, a green-streaked house or a dingy walkway stands out fast.",
      "Cleaning here calls for a light touch. Many Fairhope homes are older cottages with painted siding and original details, shaded by oaks that never let them fully dry. We wash those the gentle way — low pressure, the right solution, and patience — so the growth dies and the character stays. Newer homes in communities like Rock Creek and out toward Fly Creek get the same care with a bit more speed.",
    ],
    local: {
      heading: "Keeping up with the prettiest town on the Eastern Shore",
      body: [
        "The oaks that make Fairhope's streets famous also make its cleaning work delicate. Constant shade keeps siding damp, walkways green, and roofs streaked, while dropped leaves and acorns stain brick and concrete with tannin. Every one of those problems has a fix, and none of the fixes involve blasting a ninety-year-old cottage with high pressure. Soft washing is the standard here, on walls and roofs alike.",
        "Around the marina at Fly Creek and down the bluff toward Point Clear and the Grand Hotel grounds, homes add bay humidity to the mix. Surfaces near the water simply stay wet longer, so growth returns sooner — a steady once-a-year wash keeps those homes ahead of it instead of chasing it.",
        "Fairhope's downtown merchants live and die on foot traffic, and clean storefronts, courtyards, and sidewalks are part of the draw. We help keep the shopping district's sparkle, working early or late so wash day never costs a business its customers.",
      ],
    },
    landmarks: ["Fairhope Avenue", "The French Quarter shops", "Fly Creek Marina", "Rock Creek", "Point Clear", "The Grand Hotel"],
    faqs: [
      {
        q: "Our cottage has original wood siding. How do you clean it without harming it?",
        a: "With chemistry instead of force. A soft wash applies a mild cleaning solution at low pressure — about the strength of a garden hose — lets it kill the mildew, and rinses gently. Old paint and trim stay exactly where they are.",
      },
      {
        q: "The bricks in our courtyard have gone dark under the trees. Can they be brightened?",
        a: "Almost always. Tannin and algae are what darken shaded brick, and both respond well to treatment and careful cleaning. Very old, porous brick may hold a shadow of deep stains, and we'll show you what to expect before we begin.",
      },
      {
        q: "Do you work with Fairhope businesses?",
        a: "Yes — storefronts, courtyards, sidewalks, and patios all over the downtown district. We schedule around your open hours and can set a recurring plan so the front of the shop always matches the flowers.",
      },
    ],
  },
  {
    slug: "foley",
    name: "Foley",
    county: "Baldwin",
    h1: "Pressure Washing in Foley, AL",
    metaTitle: "Foley AL Pressure Washing & House Washing | Great White",
    metaDescription:
      "Pressure washing in Foley, AL — house washing, driveways, and storefront cleaning from the old downtown grid to the new subdivisions near OWA. Free quotes.",
    card: "Baldwin County's boomtown — an old downtown grid ringed by brand-new subdivisions and the OWA corridor.",
    intro: [
      "Foley is growing about as fast as any town in Alabama. What was farmland a few years ago is now street after street of new homes, while the old downtown grid around Heritage Park keeps its small-town bones. Add the crowds streaming through OWA and the Tanger Outlets on their way to the beach, and Foley stays busy year-round.",
      "That mix gives us two very different kinds of work. The newer subdivisions need first cleanings, builder-dust rinse-downs, and yearly washes to keep vinyl bright. The older streets near downtown need gentler soft washing for homes that have seen decades of Baldwin County humidity. Great White handles both — plus the driveways, fences, and gutters in between.",
    ],
    local: {
      heading: "A boomtown with old bones",
      body: [
        "In Foley's new neighborhoods, the homes are mostly vinyl and hardboard on slab, with young yards and fresh concrete. Two things happen fast here: the shaded side of the house grows its first green film within a couple of summers, and the bright new driveway starts collecting organic staining. An early first wash sets the clock back to day one, and an annual repeat keeps it there.",
        "The older grid around Heritage Park and along Alabama Avenue tells a longer story — established trees, deeper shade, and homes whose siding and trim have earned careful treatment. We soft wash these, clear the tannin from shaded walkways, and brighten gutters that have gone streaky with age.",
        "Foley is also close enough to the Gulf that the air carries a bit of salt on south winds, and it's the home base for a lot of folks who work the beach towns. When you want the house to look as good as the vacation properties you maintain for others, we've got you.",
      ],
    },
    landmarks: ["Heritage Park", "Downtown Foley", "OWA Parks & Resort", "Tanger Outlets", "Highway 59", "Graham Creek Nature Preserve"],
    faqs: [
      {
        q: "Our subdivision is brand new. When should we start washing the house?",
        a: "Sooner than most people think. A first wash in the first year clears builder dust and any clay or mortar marks, and it keeps the new concrete from staining permanently. After that, once a year is the usual rhythm.",
      },
      {
        q: "Do you clean businesses along Highway 59?",
        a: "Yes. The 59 corridor sees enormous traffic headed to the beach, and we keep storefronts, sidewalks, and entrances clean for it — one-time or on a recurring schedule, worked around your business hours.",
      },
      {
        q: "Does Foley get the beach-town salt problem?",
        a: "A milder version. Foley sits far enough inland that salt isn't the daily issue it is right on the coast, but south winds do carry some. The bigger local drivers are humidity, shade, and new-construction staining — all squarely in our wheelhouse.",
      },
    ],
  },
];

export function getTown(slug: string): Town | undefined {
  return towns.find((t) => t.slug === slug);
}
