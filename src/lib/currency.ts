import { useConfig } from '../context/ConfigContext';

export function formatCurrency(value: number | string | undefined, currency = 'INR'): string {
  const num = typeof value === 'string' ? parseFloat(value) : value || 0;
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(num);
}

export function useCurrencyFormatter() {
  const { config } = useConfig();
  return (value: number | string) => formatCurrency(value, config.localization.currency);
}
