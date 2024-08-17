import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const fontType = Kanit({
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
      <body className={fontType.className}>{children}</body>
    </html>
  );
}
