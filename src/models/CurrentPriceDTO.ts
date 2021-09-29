export interface CurrentPriceDTO {
  time: TimeDTO;
  disclaimer: string;
  chartName: string;
  bpi: BpiDTO;
}
export interface TimeDTO {
  updated: string;
  updatedISO: string;
  updateduk: string;
}
export interface BpiDTO {
  USD: CurrencyDTO;
  GBP: CurrencyDTO;
  EUR: CurrencyDTO;
}
export interface CurrencyDTO {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}
