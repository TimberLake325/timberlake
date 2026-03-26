import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WebPage from "./content";
import "./globals.css";
import { getThemeConfig } from "@/actions/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timberlake | Premier Medical Billing & RCM",
  description: "Timberlake provides expert, HIPAA-compliant medical billing and revenue cycle management services to healthcare providers nationwide.",
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
        <style dangerouslySetInnerHTML={{ __html: styleHtml }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <WebPage>
          {children}
        </WebPage>
      </body>
    </html>
  );
}
