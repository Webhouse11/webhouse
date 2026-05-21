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

      let countryCode: string | null = null;

      for (const service of services) {
        try {
          const response = await fetch(service.url);
          if (response.ok) {
            const data = await response.json();
            const extracted = service.parser(data);
            if (extracted) {
              countryCode = extracted.toUpperCase();
              break; // Successfully detected location, exit search
            }
          }
        } catch (error) {
          // Silently log as a warning/info in development rather than a noisy error
          console.warn(`Location detection: service ${service.url} failed. Trying next or fallback.`);
        }
      }

      if (countryCode) {
        if (CURRENCIES[countryCode]) {
          setCurrency(CURRENCIES[countryCode]);
        } else if (['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'FI', 'SE', 'IE', 'PT', 'AT', 'GR'].includes(countryCode)) {
          setCurrency(CURRENCIES.EU);
        } else if (countryCode !== 'NG') {
          setCurrency(CURRENCIES.DEFAULT);
        }
      } else {
        // Silent fallback to Nigerian Naira (NGN) without console.error
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
