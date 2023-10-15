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
      style: "normal"
    },
    {
      path: "./Stratum2WebMedium.woff",
      weight: "500",
      style: "medium"
    },
    {
      path: "./Stratum2WebBold.woff",
      weight: "700",
      style: "bold"
    }
  ]
});

export const metadata: Metadata = {
  title: "CS2 Case UI",
  description: "Counter-Strike 2 case opening UI recreated in React.",
  metadataBase: new URL("https://cs2-case-ui.vercel.app")
};

export default function RootLayout({
  children
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
