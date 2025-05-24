export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('id-ID').format(number);
};

export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
};