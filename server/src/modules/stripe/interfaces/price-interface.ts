export interface PriceCreationAttrs {
  currency: "USD" | "EUR";
  recurring: {
    interval: "month" | "year" | "week" | "day";
  };

  unit_amount: number;
  product: string;
}
