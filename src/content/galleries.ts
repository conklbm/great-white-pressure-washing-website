/**
 * Before/after photo pairs, keyed by service slug.
 *
 * Every image is a real Great White job. Files live in `public/gallery/` and
 * are named `<slug>-<n>-before.jpg` / `-after.jpg`, so replacing a photo means
 * dropping in a file of the same name — no code change.
 *
 * All pairs are shot 3:4 portrait and rendered into a fixed aspect box, so the
 * two halves always match in size (the whole point of a comparison) and there's
 * no layout shift regardless of the source dimensions.
 *
 * Only add a pair under a service the photo genuinely demonstrates. A page with
 * no honest photo is better than one borrowing someone else's job — and
 * gutter-cleaning deliberately has none until Dylan shoots one.
 */

export type GalleryPair = {
  /** basename without -before/-after suffix, relative to /gallery */
  base: string;
  /** what the viewer is looking at — shown under the pair */
  caption: string;
  /** describes the BEFORE state, for alt text */
  beforeAlt: string;
  /** describes the AFTER state, for alt text */
  afterAlt: string;
};

export const galleries: Record<string, GalleryPair[]> = {
  "roof-cleaning": [
    {
      base: "roof-cleaning-1",
      caption: "Asphalt shingle roof — black algae streaking killed and rinsed away",
      beforeAlt: "Asphalt shingle roof covered in dark black algae streaks before soft washing",
      afterAlt: "The same shingle roof after soft washing, streaks gone and shingles an even colour",
    },
    {
      base: "roof-cleaning-2",
      caption: "Clay tile roof — years of dulling growth removed, colour back",
      beforeAlt: "Clay tile roof looking dull and grey-toned from algae growth before cleaning",
      afterAlt: "The same clay tile roof after cleaning, tiles back to a bright terracotta",
    },
  ],

  "deck-fence-cleaning": [
    {
      base: "deck-fence-cleaning-1",
      caption: "Wood privacy fence — green growth off, grain back",
      beforeAlt: "Wooden privacy fence stained green with algae and mildew before cleaning",
      afterAlt: "The same wooden fence after cleaning, showing clean golden wood grain",
    },
    {
      base: "deck-fence-cleaning-2",
      caption: "Deck boards and grill station",
      beforeAlt: "Weathered grey deck boards and a wooden grill table before cleaning",
      afterAlt: "The same deck after cleaning, wood colour restored",
    },
    {
      base: "deck-fence-cleaning-3",
      caption: "Louvered privacy screen — painted wood, cleaned without stripping",
      beforeAlt: "Louvered wooden privacy screen greyed and dirty before cleaning",
      afterAlt: "The same louvered screen after cleaning, paint bright and intact",
    },
  ],

  "brick-masonry-cleaning": [
    {
      base: "brick-masonry-cleaning-1",
      caption: "Herringbone brick walkway — moss and algae lifted out of the joints",
      beforeAlt: "Brick walkway covered in green moss and algae before cleaning",
      afterAlt: "The same herringbone brick walkway after cleaning, brick colour and pattern visible",
    },
    {
      base: "brick-masonry-cleaning-2",
      caption: "Board-and-batten siding over a brick foundation",
      beforeAlt: "Siding and brick foundation stained yellow-green with algae before washing",
      afterAlt: "The same wall after soft washing, siding and brick clean",
    },
  ],

  "house-soft-washing": [
    {
      base: "house-soft-washing-1",
      caption: "Lap siding carrying a full season of Gulf Coast algae",
      beforeAlt: "White lap siding covered in heavy green algae growth before soft washing",
      afterAlt: "The same siding after soft washing, back to clean white",
    },
    {
      base: "house-soft-washing-2",
      caption: "Storage building — soft washed, not blasted",
      beforeAlt: "Storage building with dingy, algae-stained walls before soft washing",
      afterAlt: "The same storage building after soft washing, walls clean and white",
    },
  ],

  "driveway-concrete-cleaning": [
    {
      base: "driveway-concrete-cleaning-1",
      caption: "Paver driveway and entry walk — surface cleaned edge to edge",
      beforeAlt: "Paver driveway looking grey and dull with organic staining before cleaning",
      afterAlt: "The same paver driveway after cleaning, colour even and bright",
    },
    {
      base: "driveway-concrete-cleaning-2",
      caption: "Pool deck pavers — cleaned at a pressure the joints can take",
      beforeAlt: "Pool deck pavers mottled with dirt and staining before cleaning",
      afterAlt: "The same pool deck after cleaning, pavers uniform and bright",
    },
  ],

  "rust-stain-removal": [
    {
      base: "rust-stain-removal-1",
      caption: "Rust-stained standpipe and wall — treated, not scrubbed",
      beforeAlt: "Standpipe and wall stained orange-yellow with rust before treatment",
      afterAlt: "The same standpipe and wall after rust treatment, staining gone",
    },
  ],

  "commercial-pressure-washing": [
    {
      base: "commercial-pressure-washing-1",
      caption: "Commercial exterior — heavy weathering streaks off panels and brick",
      beforeAlt: "Commercial building wall with heavy dark weathering streaks down the panels",
      afterAlt: "The same commercial wall after washing, panels and brick clean",
    },
  ],
};

export function getGallery(slug: string): GalleryPair[] {
  return galleries[slug] ?? [];
}
