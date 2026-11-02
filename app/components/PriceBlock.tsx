'use client';

import { Banknote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCurrency } from '@/app/components/CurrencyProvider';
import {
  CURRENCIES,
  convertFromKzt,
  formatConvertedPrice,
  getCurrencySymbol,
  type Currency,
} from '@/app/lib/currency';

type PriceBlockProps = {
  priceFrom: number;
  priceTo: number;
  priceNote?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaClassName?: string;
};

export function PriceBlock({
  priceFrom,
  priceTo,
  priceNote,
  ctaHref = '/#contact',
  ctaLabel,
  ctaClassName = 'flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105',
}: PriceBlockProps) {
  const t = useTranslations('price');
  const { currency, setCurrency, rates, loading } = useCurrency();
  const label = ctaLabel ?? t('discuss');

  const from = convertFromKzt(priceFrom, currency, rates);
  const to = convertFromKzt(priceTo, currency, rates);
  const symbol = getCurrencySymbol(currency);

  return (
    <div className="relative flex flex-col gap-6">
      {/* Currency switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 mr-1">{t('currency')}</span>
        <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setCurrency(c.code as Currency)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currency === c.code
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              aria-pressed={currency === c.code}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>
        {loading && (
          <span className="text-xs text-slate-500">{t('loading')}</span>
        )}
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
            <Banknote className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">{t('title')}</h2>
            <p className="text-2xl sm:text-3xl font-bold tabular-nums">
              {t('from')} {formatConvertedPrice(from, currency)} — {t('to')}{' '}
              {formatConvertedPrice(to, currency)}{' '}
              <span className="text-slate-400 font-normal text-xl">
                {symbol}
              </span>
            </p>
            {priceNote && (
              <p className="text-slate-500 text-sm mt-2 max-w-md">
                {priceNote}
              </p>
            )}
            {currency !== 'KZT' && (
              <p className="text-slate-600 text-xs mt-2">
                {t('noteFx')}
              </p>
            )}
          </div>
        </div>
        <Link href={ctaHref} className={ctaClassName}>
          {label}
        </Link>
      </div>
    </div>
  );
}
