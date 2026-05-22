'use client';

import { useState, useEffect } from 'react';

export type Currency = {
  code: string;
  symbol: string;
  rate: number; // Rate relative to NGN (since existing prices are in NGN)
};

const CURRENCIES: Record<string, Currency> = {
  NG: { code: 'NGN', symbol: '₦', rate: 1 },
  GH: { code: 'GHS', symbol: 'GH₵', rate: 0.12 }, // Approx conversion
  US: { code: 'USD', symbol: '$', rate: 0.00065 }, // Approx conversion
  GB: { code: 'GBP', symbol: '£', rate: 0.00052 },
  EU: { code: 'EUR', symbol: '€', rate: 0.00061 },
  DEFAULT: { code: 'USD', symbol: '$', rate: 0.00065 },
};

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.NG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detectLocation() {
      let countryCode: string | null = null;

      // 1. Core Geo IP API lookups first (highest precision)
      const services = [
        {
          url: 'https://ipapi.co/json/',
          parser: (data: any) => data.country_code
        },
        {
          url: 'https://api.country.is',
          parser: (data: any) => data.country
        }
      ];

      for (const service of services) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second max wait
          
          const response = await fetch(service.url, { signal: controller.signal }).catch(() => null);
          clearTimeout(timeoutId);

          if (response && response.ok) {
            const data = await response.json().catch(() => null);
            if (data) {
              const extracted = service.parser(data);
              if (extracted) {
                countryCode = extracted.toUpperCase();
                break; 
              }
            }
          }
        } catch (error) {
          // Silently swallow fetch exceptions to prevent console pollution
        }
      }

      // 2. Synchronous timezone heuristic acts as a fallback if the API is slow/offline/blocked
      if (!countryCode) {
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (tz) {
            if (tz.includes('Lagos') || tz.includes('Nigeria')) {
              countryCode = 'NG';
            } else if (tz.includes('Accra') || tz.includes('Ghana')) {
              countryCode = 'GH';
            } else if (tz.includes('London') || tz.includes('Belfast')) {
              countryCode = 'GB';
            } else if (tz.startsWith('Europe/')) {
              countryCode = 'EU';
            } else if (tz.startsWith('America/')) {
              countryCode = 'US';
            }
          }
        } catch (tzError) {
          // Fallback silently
        }
      }

      if (countryCode) {
        if (CURRENCIES[countryCode]) {
          setCurrency(CURRENCIES[countryCode]);
        } else if (['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'FI', 'SE', 'IE', 'PT', 'AT', 'GR', 'PL', 'CH', 'DK', 'NO'].includes(countryCode)) {
          setCurrency(CURRENCIES.EU);
        } else if (countryCode !== 'NG') {
          setCurrency(CURRENCIES.DEFAULT);
        }
      } else {
        // Default silently to Nigerian Naira
        setCurrency(CURRENCIES.NG);
      }
      setLoading(false);
    }

    detectLocation();
  }, []);

  const formatPrice = (nairaAmount: string | number): string => {
    if (typeof nairaAmount === 'string' && nairaAmount.includes(' - ')) {
      return nairaAmount.split(' - ').map(part => formatPrice(part)).join(' - ');
    }

    // Remove symbols and non-numeric chars to get the raw number
    let numericValue = typeof nairaAmount === 'string' 
      ? parseFloat(nairaAmount.replace(/[^0-9.]/g, '')) 
      : nairaAmount;

    if (typeof nairaAmount === 'string') {
      const upper = nairaAmount.toUpperCase();
      if (upper.includes('M')) numericValue *= 1000000;
      else if (upper.includes('K')) numericValue *= 1000;
    }

    if (isNaN(numericValue)) return nairaAmount.toString();

    const converted = numericValue * currency.rate;
    
    // Format according to local currency rules
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: currency.code === 'NGN' ? 0 : 2,
      maximumFractionDigits: currency.code === 'NGN' ? 0 : 2,
    }).format(converted);

    return `${currency.symbol}${formatted}`;
  };

  return { currency, formatPrice, loading };
}
