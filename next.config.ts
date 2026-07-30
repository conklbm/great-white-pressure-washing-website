import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL rule: NO trailing slashes (Next default), everywhere, forever.
  // Every internal link already matches this canonical form — do not flip
  // this flag later without updating every canonical + the sitemap.
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: __dirname,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
