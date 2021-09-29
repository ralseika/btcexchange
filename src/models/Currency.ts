import { CurrencyCode } from "../utils/constants";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  locale: string;
}
