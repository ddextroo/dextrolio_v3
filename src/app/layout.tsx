import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dexter G. Inguito - Student & Freelancer",
  description:
    "Dexter G. Inguito - A passionate student and freelance developer specializing in web, mobile and desktop applications. Explore my portfolio showcasing innovative projects and technical expertise.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [
      {
        url: "/assets/me.jpg", // Your OpenGraph image path
        width: 1200,
        height: 630,
        alt: "Dexter G. Inguito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/me.jpg"], // Your Twitter card image path
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
