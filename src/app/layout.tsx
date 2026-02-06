import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "낼름",
  description: "맞춤형 면접 준비 PWA",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#4f2dff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={noto.variable}>
      <body className="min-h-screen bg-background text-text antialiased">{children}</body>
    </html>
  );
}
