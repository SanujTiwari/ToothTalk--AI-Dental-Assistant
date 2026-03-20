import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanStackProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tooth Talk - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with Tooth Talk. Available 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#0ea5e9",
              colorBackground: "#f3f4f6",
              colorText: "#111827",
              colorTextSecondary: "#6b7280",
              colorInputBackground: "#f3f4f6",
            },
          }}
        >
          <TanStackProvider>
            <ThemeProvider>
              <UserSync />
              <Toaster />
              {children}
            </ThemeProvider>
          </TanStackProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
