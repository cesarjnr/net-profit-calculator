interface CurrencyObj {
  value: number;
}

export function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return formatter.format(value);
}

export function sumCurrencyValues(totalValue: number, currentValue: CurrencyObj): number {
  return totalValue + currentValue.value;
}
