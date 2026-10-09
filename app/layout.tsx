import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Keep the good parts",
    template: "%s · Rose",
  },
  description:
    "Portfolio mockups of Instagram without the traps: a finite feed, and shared Reels that stay on what a friend sent.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense>
          <SiteHeader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
