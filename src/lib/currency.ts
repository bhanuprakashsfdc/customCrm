import { useConfig } from '../context/ConfigContext';

const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  INR: 83.5
};

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹'
};

function formatValue(value: number, currency: string, region?: string): string {
  const symbol = currencySymbols[currency] || currency;
  const isIndiaFormat = currency === 'INR' || region === 'IND';
  const isWesternFormat = !isIndiaFormat;
  
  if (isIndiaFormat) {
    if (value >= 10000000) return `${symbol}${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${symbol}${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `${symbol}${(value / 1000).toFixed(0)}K`;
    return `${symbol}${Math.round(value)}`;
  }
  
  if (isWesternFormat) {
    // US/UK: 100K, no M for example (but keep M for large)
    if (value >= 1000000) return `${symbol}${(value / 1000000).toFixed(1)}M`;
    if (value >= 100000) return `${symbol}${(value / 100000).toFixed(0)}K`;
    if (value >= 1000) return `${symbol}${(value / 1000).toFixed(0)}K`;
    return `${symbol}${Math.round(value)}`;
  }
  
  return `${symbol}${Math.round(value)}`;
}

export function formatCurrency(value: number | string | undefined, baseCurrency = 'USD', showAll = false, region?: string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value || 0;
  const base = baseCurrency as 'USD' | 'EUR' | 'INR' | 'GBP';
  
  // Convert to base currency first
  const inBase = base === 'USD' ? num : 
                 base === 'EUR' ? num / exchangeRates.EUR : 
                 base === 'INR' ? num / exchangeRates.INR :
                 base === 'GBP' ? num / 0.78 : num; // Approx GBP to USD
  
  if (showAll) {
    const usd = inBase;
    const eur = usd * exchangeRates.EUR;
    const inr = usd * exchangeRates.INR;
    const gbp = usd / 0.78;
    return `${formatValue(usd, 'USD', region)} | ${formatValue(gbp, 'GBP', region)} | ${formatValue(inr, 'INR', region)}`;
  }
  
  return formatValue(inBase, base, region);
}

export function useCurrencyFormatter() {
  const { config } = useConfig();
  return (value: number | string) => formatCurrency(value, config.localization.currency, config.localization.showAllCurrencies, config.localization.region);
}
