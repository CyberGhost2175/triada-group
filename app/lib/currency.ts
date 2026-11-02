export type Currency = 'KZT' | 'USD' | 'EUR';

export const CURRENCIES: { code: Currency; symbol: string; label: string }[] = [
  { code: 'KZT', symbol: '₸', label: 'Тенге' },
  { code: 'USD', symbol: '$', label: 'Доллар' },
  { code: 'EUR', symbol: '€', label: 'Евро' },
];

/** Сколько единиц валюты за 1 тенге (KZT = 1) */
export type RatesMap = Record<Currency, number>;

/** Fallback, если API недоступен (примерно 1 USD ≈ 520 ₸, 1 EUR ≈ 560 ₸) */
export const FALLBACK_RATES: RatesMap = {
  KZT: 1,
  USD: 1 / 520,
  EUR: 1 / 560,
};

export function convertFromKzt(amountKzt: number, currency: Currency, rates: RatesMap): number {
  return amountKzt * (rates[currency] ?? FALLBACK_RATES[currency]);
}

export function formatConvertedPrice(value: number, currency: Currency): string {
  const locale = currency === 'KZT' ? 'ru-KZ' : currency === 'EUR' ? 'de-DE' : 'en-US';
  const fractionDigits = currency === 'KZT' ? 0 : 0;
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Math.round(value));
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES.find((c) => c.code === currency)?.symbol ?? '₸';
}
