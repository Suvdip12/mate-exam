import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
    siteName: "MAT PG1 2025",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster expand={true} richColors />
      </body>
    </html>
  );
}
