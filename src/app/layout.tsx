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
  title: {
    default: "Dexter Inguito | Full‑Stack Developer",
    template: "%s | Dexter Inguito",
  },
  description:
    "Portfolio of Dexter G. Inguito — building Prezstige and BarangMI. Explore top projects, tech stack, testimonials, and ways to connect.",
  metadataBase: new URL("https://dextrolio.tech"),
  alternates: { canonical: "https://dextrolio.tech" },
  icons: { icon: "/assets/dlogo.png" },
  openGraph: {
    type: "website",
    url: "https://dextrolio.tech",
    title: "Dexter Inguito | Full‑Stack Developer",
    description:
      "Explore my startup Prezstige, capstone BarangMI, and top projects. Connect on GitHub and Facebook.",
    siteName: "Dexter Inguito",
    images: [
      {
        url: "/assets/me2.jpg",
        width: 1200,
        height: 630,
        alt: "Dexter Inguito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexter Inguito | Full‑Stack Developer",
    description:
      "See my current startup, capstone, and curated top projects.",
    images: ["/assets/me2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema.org for WebSite with potentialAction Site Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Dexter Inguito',
              url: 'https://dextrolio.tech',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://dextrolio.tech/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* JSON-LD for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dexter G. Inguito',
              url: 'https://dextrolio.tech',
              sameAs: [
                'https://github.com/ddextroo',
                'https://www.linkedin.com/in/dexter-inguito-b039a827b/',
                'https://www.facebook.com/dexter.inguito.7',
              ],
              jobTitle: 'Full‑Stack Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Prezstige',
                url: 'https://prezstige.com/',
              },
            }),
          }}
        />
        {/* JSON-LD for SiteNavigationElement (helps sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'SiteNavigationElement',
                  name: 'Current Startup Project',
                  url: 'https://prezstige.com/',
                },
                {
                  '@type': 'SiteNavigationElement',
                  name: 'Capstone Project',
                  url: 'https://kalunasan.systems/',
                },
                {
                  '@type': 'SiteNavigationElement',
                  name: 'Top Projects',
                  url: 'https://dextrolio.tech/#top-projects',
                },
                {
                  '@type': 'SiteNavigationElement',
                  name: 'Facebook',
                  url: 'https://www.facebook.com/dexter.inguito.7',
                },
              ],
            }),
          }}
        />
      </head>
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
