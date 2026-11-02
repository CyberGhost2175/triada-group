'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  FALLBACK_RATES,
  type Currency,
  type RatesMap,
} from '@/app/lib/currency';

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: RatesMap;
  loading: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'triada-currency';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('KZT');
  const [rates, setRates] = useState<RatesMap>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
      if (saved === 'KZT' || saved === 'USD' || saved === 'EUR') {
        setCurrencyState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/rates');
        const data = await res.json();
        if (!cancelled && data.rates) {
          setRates({
            KZT: 1,
            USD: data.rates.USD ?? FALLBACK_RATES.USD,
            EUR: data.rates.EUR ?? FALLBACK_RATES.EUR,
          });
        }
      } catch {
        if (!cancelled) setRates(FALLBACK_RATES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return ctx;
}
