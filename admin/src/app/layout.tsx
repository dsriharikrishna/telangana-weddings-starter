import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from '@/lib/query-client';

export const metadata: Metadata = {
  title: 'Telangana Weddings — Admin Backoffice',
  description: 'Operations, Vendor Verification, Bookings & Commission Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#FAF7F2] text-[#292524] selection:bg-[#762B46] selection:text-white">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
