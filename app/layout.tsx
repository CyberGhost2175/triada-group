import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';
import { CurrencyProvider } from '@/app/components/CurrencyProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TRIADA GROUP',
  description: 'We develop software solutions for your business',
  icons: {
    icon: [
      { url: '/triada-logo.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/triada-logo.svg', type: 'image/svg+xml', sizes: '32x32' },
      { url: '/triada-logo.svg', type: 'image/svg+xml', sizes: '48x48' },
      { url: '/triada-logo.svg', type: 'image/svg+xml', sizes: '96x96' },
    ],
    apple: [{ url: '/triada-logo.svg', type: 'image/svg+xml', sizes: '150x150' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
