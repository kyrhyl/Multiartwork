import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Multi-Artworks & Signages | Portfolio & Services",
  description: "Premium signage solutions, large-format printing, and expert steel fabrication for businesses that demand visibility and durability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
