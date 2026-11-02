import type { Metadata } from 'next';
import { Inter, Instrument_Serif, Source_Serif_4 } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';
import { CurrencyProvider } from '@/app/components/CurrencyProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
});

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Triada Group — Software Development Studio',
  description:
    'Triada Group designs and builds web platforms, mobile apps and automation tools for growing businesses. Clients worldwide.',
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
      <body className={`${inter.variable} ${instrument.variable} ${sourceSerif.variable} antialiased`}>
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
