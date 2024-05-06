export function getCurrencySymbol(currency) {
  return (0)
    .toLocaleString(undefined, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

export function getMinMaxLabel(min, max) {
  if (min && max) {
    return `${min} - ${max}`;
  }

  return min || max;
};