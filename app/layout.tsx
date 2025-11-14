import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { Header } from "@/shared/components/internal";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TrustHub",
  description: "Gestão centralizada de reputação e feedback de clientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
