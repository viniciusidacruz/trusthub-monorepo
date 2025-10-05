import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { METADATA } from "@/shared/constants";
import { Toaster } from "@/shared/components/external";

import "./globals.css";

export const metadata: Metadata = {
  title: METADATA.title,
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
