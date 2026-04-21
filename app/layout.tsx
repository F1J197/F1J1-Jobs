import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
}

export const metadata: Metadata = {
  title: "FijiJobs - Find Your Dream Job in Fiji",
  description: "Fiji's mobile-first job platform connecting top talent with leading employers. Fast, simple, and built for your phone.",
  keywords: ["fiji jobs", "careers fiji", "employment fiji", "jobs in fiji", "fiji vacancies"],
  authors: [{ name: "FijiJobs" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_FJ",
    url: "https://fijijobs.com",
    title: "FijiJobs - Find Your Dream Job in Fiji",
    description: "Fiji's mobile-first job platform connecting top talent with leading employers.",
    siteName: "FijiJobs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
