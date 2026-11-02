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
  ctaClassName = 'btn-primary shrink-0',
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
        <span className="text-xs text-muted mr-1">{t('currency')}</span>
        <div className="inline-flex rounded-[12px] border border-border p-1">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setCurrency(c.code as Currency)}
              className={`px-3.5 py-1.5 rounded-md text-sm ${
                currency === c.code ? 'text-text bg-surface' : 'text-muted hover:text-text'
              }`}
              aria-pressed={currency === c.code}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>
        {loading && (
          <span className="text-xs text-muted">{t('loading')}</span>
        )}
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-start gap-4">
          <Banknote className="w-5 h-5 text-accent shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <p className="text-sm text-muted mb-1">{t('title')}</p>
            <p className="text-2xl sm:text-3xl tabular-nums">
              {t('from')} {formatConvertedPrice(from, currency)} — {t('to')}{' '}
              {formatConvertedPrice(to, currency)}{' '}
              <span className="text-muted font-normal text-xl">{symbol}</span>
            </p>
            {priceNote && <p className="text-muted text-sm mt-2 max-w-md">{priceNote}</p>}
            {currency !== 'KZT' && <p className="text-muted text-xs mt-2">{t('noteFx')}</p>}
          </div>
        </div>
        <Link href={ctaHref} className={ctaClassName}>
          {label}
        </Link>
      </div>
    </div>
  );
}
