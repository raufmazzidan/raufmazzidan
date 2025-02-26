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
  description: "Hello, I'm Rauf",
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
