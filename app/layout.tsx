import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WebPage from "./content";
import "./globals.css";
import { getThemeConfig } from "@/actions/theme";
import Script from "next/script";

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
    default: "Tlscred | Medical Credentialing & Billing Services",
    template: "%s | Tlscred",
  },
  description: "TimberLake Services LLC provides expert provider credentialing, CAQH management, and medical billing solutions in South Carolina. Get your practice enrolled today.",
  applicationName: "Tlscred",
  openGraph: {
    title: "Tlscred",
    siteName: "Tlscred",
    url: "https://tlscred.com",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeConfig = await getThemeConfig();

  const lightStyles = themeConfig ?
    Object.entries(themeConfig.light).map(([key, value]) => `--${key}: ${value}`).join('; ') : '';

  const styleHtml = `
    :root { ${lightStyles} }
  `;

  return (
    <html lang="en">
      <head>
        {/* <style dangerouslySetInnerHTML={{ __html: styleHtml }} />
        <meta name="google-site-verification" content="O7nX4YmW-quu_eXgDAyurAPbjs01WUaNIVWrv6sQQFU" />
        <link rel="icon" href="/favicon_tlscred.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tlscred",
              alternateName: "TimberLake Services LLC",
              url: "https://tlscred.com",
              logo: "https://tlscred.com/favicon_tlscred.ico",
            }),
          }}
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* <WebPage>
          {children}
        </WebPage> */}
      </body>
    </html>
  );
}
