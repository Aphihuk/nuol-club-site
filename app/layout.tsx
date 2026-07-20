import type { Metadata } from "next";
import { Inter, Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import SmoothScroll from "@/components/ui/SmoothScroll";
import PageLoader from "@/components/ui/PageLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoLao = Noto_Sans_Lao({
  variable: "--font-lao",
  subsets: ["lao"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FNS Student Club — NUOL",
  description:
    "A student-led technology club at the Faculty of Natural Sciences, National University of Laos. IoT, programming, data science, design and media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoLao.variable}`}>
      <body className="min-h-screen antialiased">
        <PageLoader />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
