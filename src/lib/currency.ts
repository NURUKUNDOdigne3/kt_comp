// Rwandan Franc formatter
export const rwf = new Intl.NumberFormat("rw-RW", {
  style: "currency",
  currency: "RWF",
  currencyDisplay: "symbol",
  currencySign: "standard",
  notation: "standard",
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3,
});

// Format price with RWF
export function formatPrice(amount: number): string {
  // return rwf.format(amount);
  return amount.toLocaleString() + " RWF";
}

// Format price range
export function formatPriceRange(min: number, max: number): string {
  return `${rwf.format(min)} - ${rwf.format(max)}`;
}

// Calculate discount percentage
export function calculateDiscount(
  original: number,
  discounted: number
): number {
  return Math.round(((original - discounted) / original) * 100);
}
