import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";
const lato = Lato({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | MAT-2026",
    default: "MAT-2026",
  },
  description: "PYQs and more for MAT-2026",
  openGraph: {
    images: [
      {
        url: "https://www.matpg1.in/kalyani-university-kalyani-logo.png",
        width: 600,
        height: 315,
      },
    ],
    type: "website",
    siteName: "MATPG1 2026",
  },
  keywords: ["mat", "matpg1", "pg1", "matpg1", "mat2026", "matexam"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <NextTopLoader color="#611BF8" zIndex={999} showSpinner />
        {children}
        <Toaster expand={true} richColors />
        <GoogleAnalytics gaId="G-KMSJ4MSPSB" />
      </body>
    </html>
  );
}
