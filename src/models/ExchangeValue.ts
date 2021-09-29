import { CurrencyCode } from "../utils/constants";

export interface ExchangeValue {
  currency: CurrencyCode;
  value: number;
}
