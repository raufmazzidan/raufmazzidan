import Navigation from "@/components/section/navigation";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const font = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rauf Mazzidan | Front End Developer",
  description:
    "Experienced Frontend Developer specializing in JavaScript, TypeScript, React, and Next.js. Passionate about delivering high-quality, user-centric digital experiences while ensuring performance optimization and code precision.",
  openGraph: {
    title: "Rauf Mazzidan | Front End Developer",
    description:
      "Experienced Frontend Developer specializing in JavaScript, TypeScript, React, and Next.js. Passionate about delivering high-quality, user-centric digital experiences while ensuring performance optimization and code precision.",
    url: "https://raufmazzidan.com/",
    siteName: "Rauf Mazzidan | Front End Developer",
    images: [
      {
        url: "https://raufmazzidan.com/assets/thumbnail.png",
        width: 1536,
        height: 848,
        alt: "Thumbnail of raufmazzidan.com",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <Navigation />
        <main className="max-w-3xl px-6 m-auto">{children}</main>
      </body>
    </html>
  );
}
