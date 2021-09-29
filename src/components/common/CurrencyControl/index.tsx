import React, { ChangeEvent } from "react";
import { Currency } from "../../../models/Currency";
import { FormControl } from "../FormControl";

// #region -------------- Interfaces -------------------------------------------------------------------

interface IProps {
  currency: Currency;
  price?: number;
  onRemove?(): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  disabled?: boolean;
}

// #end region

// #region -------------- Component -------------------------------------------------------------------

export default function CurrencyControl({
  disabled,
  currency,
  price,
  onRemove,
  onChange,
}: IProps) {
  return (
    <FormControl
      child={
        <>
          <div className="control-wrapper">
            <span className="currency">{currency.symbol}</span>
            <input
              disabled={disabled}
              className="text-right"
              id={currency.code?.toString()}
              name={currency.code?.toString()}
              type="text"
              value={price?.toLocaleString(currency.locale, {
                style: "decimal",
                minimumFractionDigits: 2,
              })}
              onChange={onChange}
            />
          </div>
          {onRemove && (
            <button type="button" className="button-icon" onClick={onRemove}>
              <i className="icon-cancel rotate icon"></i>
            </button>
          )}
        </>
      }
    />
  );
}

// #end region
