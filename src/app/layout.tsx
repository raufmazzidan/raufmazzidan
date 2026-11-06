import Navigation from "@/components/section/navigation";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Kanit, Geist } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const font = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rauf Mazzidan",
  description:
    "Software Engineer with experience building scalable, high-performance web applications. Proven track record in fintech and enterprise solutions, with a strong commitment to delivering intuitive design systems, optimizing web performance, and maintaining exceptional code quality across agile teams.",
  openGraph: {
    title: "Rauf Mazzidan",
    description:
      "Software Engineer with experience building scalable, high-performance web applications. Proven track record in fintech and enterprise solutions, with a strong commitment to delivering intuitive design systems, optimizing web performance, and maintaining exceptional code quality across agile teams.",
    url: "https://raufmazzidan.com/",
    siteName: "Rauf Mazzidan",
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={cn(font.className)}>
        <TooltipProvider>
          <Navigation />
          <main className="max-w-3xl px-6 m-auto">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
