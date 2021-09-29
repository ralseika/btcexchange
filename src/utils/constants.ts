import { Currency } from "../models/Currency";

export enum CurrencyCode {
  GBP,
  EUR,
  USD,
  BTC,
}

export const CURRENCIES_ALL: Currency[] = [
  { code: CurrencyCode.USD, symbol: "$", locale: "en-US" },
  { code: CurrencyCode.EUR, symbol: "€", locale: "de-DE" },
  { code: CurrencyCode.GBP, symbol: "£", locale: "gb-GB" },
];

export const BTC_CURRENCY: Currency = {
  code: CurrencyCode.BTC,
  symbol: "฿",
  locale: "en-US",
};

export const TEXT_STRINGS = {
  appTitle: "BITCOIN EXCHANGE",
  formTitle: "Please enter bitcoin amount:",
  dropDownPlaceholder: "Select currency",
};

export const GITHUB_URL = "https://github.com/ralseika/btcexchange";
