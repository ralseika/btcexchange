import React, { useEffect, useState } from "react";
import "../../style.scss";
import { BpiDTO, CurrentPriceDTO } from "../../models/CurrentPriceDTO";
import {
  BTC_CURRENCY,
  CURRENCIES_ALL,
  CurrencyCode,
  TEXT_STRINGS,
} from "../../utils/constants";
import { Currency } from "../../models/Currency";
import CurrencyControl from "../common/CurrencyControl";
import CurrencySelector from "../common/CurrencySelector";
import { ExchangeValue } from "../../models/ExchangeValue";

// #region -------------- Component -------------------------------------------------------------------
export default function Form() {
  const [exchangeRates, setExchangeRates] = useState<BpiDTO>();
  const [btcValue, setBtcValue] = useState<number>(0);
  const [convertedValues, setConvertedValues] = useState<ExchangeValue[]>();
  const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([]);
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(
    []
  );

  // #region -------------- Fetch data from API ----------------------------------------------------------------

  useEffect(() => {
    const date = new Date();
    const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
    const fetchPrices = async () => {
      try {
        const response = await fetch(url);
        const json: CurrentPriceDTO = await response.json();

        /*
          PROBLEM:
          API itself delays to update values. Sometime the delays is up to 5 seconds.
          If we fetch API every whole minute, it does not mean we will get updated API values.

          SIMPLE AND STUPID SOLUTION:
          We need to compare local time minutes to API respone updateISO value minutes until they match.
          If minutes does not match, we initialize repeatFetch() function with 3s timeout until they do.
          3 seconds were chosen just as an average.

          More thoughts on that:
          Sometimes API does not update "time" values, but currency rates are updated. Would need to better understand
          API technology to implement ultimate solution
        */

        const apiFetchMinutes = new Date().getMinutes();
        const updatedISOMinutes = new Date(json.time.updatedISO).getMinutes();

        if (apiFetchMinutes !== updatedISOMinutes) {
          repeatFetch();
          return;
        }

        setExchangeRates(json.bpi);
      } catch (error) {
        console.log("error", error);
      }
    };

    const repeatFetch = () => {
      setTimeout(fetchPrices, 3000);
    };

    /*
      To fetch data every whole minute we need:
        1) Fetch data initialy to get current/realtime values
        2) setTimeout to know how many seconds there are until next, whole minute: (60 - date.getSeconds()) * 1000)
        3) setInterval to fetch data every whole minute
    */

    setTimeout(function () {
      setInterval(fetchPrices, 60000);
      fetchPrices();
    }, (60 - date.getSeconds()) * 1000);

    fetchPrices();

    setSelectedCurrencies([...CURRENCIES_ALL]);
  }, []);

  // #end region

  // #region -------------- Convert values based on user input ------------------------------------------------

  useEffect(() => {
    if (!exchangeRates) return;
    const calculatedValues: ExchangeValue[] = [];
    CURRENCIES_ALL.forEach((currency) => {
      calculatedValues.push({
        currency: currency.code,
        value:
          btcValue * exchangeRates[CurrencyCode[currency.code]]?.rate_float,
      });
    });

    setConvertedValues(calculatedValues);
  }, [btcValue, exchangeRates]);

  // #end region

  // #region -------------- Event handlers -------------------------------------------------------------------

  const onRemoveCurrency = (currency: Currency) => {
    const currencyIndex = selectedCurrencies.findIndex(
      (c) => c.code === currency.code
    );

    setAvailableCurrencies([
      ...availableCurrencies,
      selectedCurrencies[currencyIndex],
    ]);

    selectedCurrencies.splice(currencyIndex, 1);
    setSelectedCurrencies([...selectedCurrencies]);
  };

  const onDropDownChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedValue = e.currentTarget.id;

    const removedCurrencyIndex = availableCurrencies.findIndex(
      (i) => i.code === Number(selectedValue)
    );

    setSelectedCurrencies([
      ...selectedCurrencies,
      availableCurrencies[removedCurrencyIndex],
    ]);

    availableCurrencies.splice(removedCurrencyIndex, 1);
    setAvailableCurrencies([...availableCurrencies]);
  };

  // #end region

  return (
    <form>
      <div className="form-content">
        <h3 className="form-title">{TEXT_STRINGS.formTitle}</h3>
        <CurrencyControl
          currency={BTC_CURRENCY}
          onChange={(e) => setBtcValue(Number(e.target.value))}
        />
        <div style={{ marginBottom: 12 }}>
          <i className="icon-down-bold"></i>
        </div>
        {selectedCurrencies.map((currency, idx) => {
          return (
            <CurrencyControl
              disabled
              key={idx}
              currency={currency}
              price={
                convertedValues?.filter((v) => v.currency === currency.code)[0]
                  .value || 0
              }
              onRemove={() => onRemoveCurrency(currency)}
            />
          );
        })}

        {CURRENCIES_ALL.length > selectedCurrencies.length && (
          <CurrencySelector
            currencies={availableCurrencies}
            onDropDownChange={onDropDownChange}
          />
        )}
      </div>
    </form>
  );
}

// #end region
