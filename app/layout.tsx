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
      <link rel="shortcut icon" href="images/icon.svg" type="image/x-icon" />
      </head>
      <body className={`${inter.className} flex 2xl:justify-between 2xl:items-start 2xl:flex-nowrap 2xl:flex-row xl:flex xl:justify-between xl:items-start xl:flex-nowrap xl:flex-row lg:flex lg:justify-between lg:items-start lg:flex-nowrap lg:flex-row md:flex-wrap md:flex-col-reverse md:items-center md:justify-start sm:flex-wrap sm:flex-col-reverse sm:items-center sm:justify-start text-slate-800 min-h-screen `}>{children}</body>
    </html>
  );
}
