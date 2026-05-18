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
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && CURRENCIES[countryCode]) {
          setCurrency(CURRENCIES[countryCode]);
        } else if (['FR', 'DE', 'IT', 'ES', 'NL', 'BE'].includes(countryCode)) {
          setCurrency(CURRENCIES.EU);
        } else if (countryCode !== 'NG') {
          setCurrency(CURRENCIES.DEFAULT);
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
        setCurrency(CURRENCIES.NG); // Fallback to NGN
      } finally {
        setLoading(false);
      }
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
