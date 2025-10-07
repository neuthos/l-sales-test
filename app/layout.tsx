import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/lib/contexts/AuthContext";
import { TranslationProvider } from "@/lib/contexts/TranslationContext";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Dashboard application with shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <TranslationProvider>
            <AuthProvider>{children}</AuthProvider>
          </TranslationProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
