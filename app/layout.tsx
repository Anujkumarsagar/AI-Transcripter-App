import type React from "react";
import type { Metadata } from "next";

import { Aclonica, Mona_Sans, Monofett } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const aclonica = Aclonica({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aclonica",
})

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
})

const monofett = Monofett({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monoft",
})

export const metadata: Metadata = {
  title: "AI Meeting Summarizer",
  description: "Transform your meeting transcripts into clear, actionable summaries with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          html {
            --font-aclonica: ${aclonica.style.fontFamily};
            --font-mona: ${monaSans.style.fontFamily};
            --font-monoft: ${monofett.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`${montserrat.variable} ${aclonica.variable} ${monaSans.variable} ${monofett.variable}`}>
        {children}
      </body>
    </html>
  );
}
