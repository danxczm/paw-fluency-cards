import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import Navbar from '@/components/home/navbar';

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PawFluency',
  description: 'Learn easy!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={merriweather.className}>
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
