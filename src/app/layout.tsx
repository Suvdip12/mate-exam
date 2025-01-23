import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
const lato = Lato({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | MAT-2025",
    default: "MAT-2025",
  },
  description: "PYQs and more for MAT-2025",
  openGraph: {
    images: [
      {
        url: "https://www.matpg1.in/kalyani-university-kalyani-logo.png",
        width: 600,
        height: 315,
      },
    ],
    type: "website",
    siteName: "MATPG1 2025",
  },
  keywords: ["mat", "matpg1", "pg1", "matpg1", "mat2025", "matexam"],
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
      </body>
    </html>
  );
}
