import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/theme-provider';

import './globals.css';
import MainNavbar from '@/components/home/main-navbar';
import { Nav } from '@/components/home/home-page-nav';

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
    <html lang='en' suppressHydrationWarning>
      <body className={merriweather.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <MainNavbar />
          <Nav />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
