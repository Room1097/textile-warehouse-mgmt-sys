const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  
  export function formatDate(date: Date) {
    return DATE_FORMATTER.format(date);
  }
  
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0
  });
  
  export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount);
  }
  
  const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
  
  export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
  }
  