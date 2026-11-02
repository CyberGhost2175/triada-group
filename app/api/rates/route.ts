import { NextResponse } from 'next/server';
import { FALLBACK_RATES, type RatesMap } from '@/app/lib/currency';

export const revalidate = 3600; // кэш 1 час

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/KZT', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('[Rates] API status:', res.status);
      return NextResponse.json({ rates: FALLBACK_RATES, source: 'fallback' });
    }

    const data = await res.json();
    if (data.result !== 'success' || !data.rates) {
      return NextResponse.json({ rates: FALLBACK_RATES, source: 'fallback' });
    }

    const rates: RatesMap = {
      KZT: 1,
      USD: typeof data.rates.USD === 'number' ? data.rates.USD : FALLBACK_RATES.USD,
      EUR: typeof data.rates.EUR === 'number' ? data.rates.EUR : FALLBACK_RATES.EUR,
    };

    return NextResponse.json({
      rates,
      source: 'live',
      updated: data.time_last_update_utc ?? null,
    });
  } catch (err) {
    console.error('[Rates] Error:', err);
    return NextResponse.json({ rates: FALLBACK_RATES, source: 'fallback' });
  }
}
