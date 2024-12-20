import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const lora = Lora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAT-2025",
  description: "PYQs and more for MAT-2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        {children}
        <Toaster expand={true} richColors />
      </body>
    </html>
  );
}
