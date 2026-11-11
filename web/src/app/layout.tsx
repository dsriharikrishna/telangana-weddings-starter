import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ReactQueryProvider } from "@/lib/query-client";

export const metadata: Metadata = {
  title: "Telangana Wedding Services Marketplace | One Wedding. One Platform. All Services.",
  description: "Discover, compare, and book verified wedding vendors in Narayanpet, Mahabubnagar, and across Telangana. Photography, Function Halls, Catering, Band Melam & Sannai, and more.",
  keywords: ["Telangana weddings", "Narayanpet wedding services", "Mahabubnagar kalyana mandapam", "Band Melam", "Sannai Melam", "Telangana catering"],
  openGraph: {
    title: "Telangana Wedding Services Marketplace",
    description: "One Wedding. One Platform. All Services in Telangana.",
    locale: "te_IN",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&family=Gautami&family=Mandali&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#721226] selection:text-white bg-[#FAF7F2] text-[#292524]">
        <ReactQueryProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
