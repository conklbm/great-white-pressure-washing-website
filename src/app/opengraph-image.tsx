import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — pressure washing in the Mobile Bay Area`;

/**
 * Default 1200×630 OG image. Uses Dylan's real mascot (read off disk and
 * inlined, since Satori can't fetch relative URLs at build time) on the
 * brand's royal-blue field.
 */
export default async function OgImage() {
  const mascot = await readFile(join(process.cwd(), "public", "logo-mascot.png"));
  const mascotSrc = `data:image/png;base64,${mascot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          background: "linear-gradient(135deg, #0B62FF 0%, #0057FF 45%, #052E9E 100%)",
          padding: "0 72px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mascotSrc} width={420} height={289} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: 1,
              lineHeight: 1,
            }}
          >
            Great White
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#89BAE4",
              textTransform: "uppercase",
              letterSpacing: 8,
              marginTop: 10,
            }}
          >
            Pressure Washing
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.88)", marginTop: 34 }}>
            Houses · Roofs · Concrete · Commercial
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>
            Both shores of Mobile Bay
          </div>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              background: "#FFC61E",
              color: "#202080",
              fontSize: 30,
              fontWeight: 700,
              padding: "14px 26px",
              borderRadius: 10,
            }}
          >
            {`Call or text ${siteConfig.phone.display}`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
