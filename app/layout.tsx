import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f5c56",
};

export const metadata: Metadata = {
  title: "VitiWork — Find Work in Fiji",
  description:
    "Find Work in Fiji. Search roles from any island or town. Message employers on WhatsApp.",
  keywords: ["jobs in fiji", "vitiwork", "fiji careers", "whatsapp jobs fiji"],
  authors: [{ name: "VitiWork" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_FJ",
    url: "https://vitiwork.example",
    title: "VitiWork — Find Work in Fiji",
    description:
      "Find Work in Fiji. Search roles from any island or town. Message employers on WhatsApp.",
    siteName: "VitiWork",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.className} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
