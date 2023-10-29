import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const stratumFont = localFont({
  src: [
    {
      path: "./Stratum2WebRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Stratum2WebMedium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "./Stratum2WebBold.woff",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Counter-Strike Case Simulator",
  description: "Open all the Counter-Strike cases you want for free!",
  metadataBase: new URL("https://case-sim.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${stratumFont.className} text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
