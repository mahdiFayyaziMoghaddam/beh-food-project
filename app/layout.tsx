import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <title>BEH FOOD</title>
      <link rel="shortcut icon" href="icon.svg" type="image/x-icon" />
      </head>
      <body className={`${inter.className} text-slate-800 min-h-screen`}>{children}</body>
    </html>
  );
}
