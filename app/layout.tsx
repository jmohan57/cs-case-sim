import BackgroundImage from "@/components/BackgroundImage";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";

const stratumFont = localFont({
  src: [
    {
      path: "./Stratum2WebRegular.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Stratum2WebMedium.woff",
      weight: "700",
      style: "medium",
    },
    {
      path: "./Stratum2WebBolditalic.woff",
      weight: "900",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Counter-Strike Case Simulator",
  description: "Open all the Counter-Strike cases you want for free!",
  metadataBase: new URL("https://case-sim.com"),
  keywords: [
    "counter-strike",
    "csgo",
    "cs:go",
    "cs2",
    "simulator",
    "case opening",
  ],
  openGraph: {
    url: "https://case-sim.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${stratumFont.className} text-white`}>
        <BackgroundImage />
        {children}
        <Analytics scriptSrc="/va/script.js" />
        <SpeedInsights scriptSrc="/si/script.js" />
      </body>
    </html>
  );
}
