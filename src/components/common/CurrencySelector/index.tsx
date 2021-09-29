import React from "react";
import { Currency } from "../../../models/Currency";
import { CurrencyCode, TEXT_STRINGS } from "../../../utils/constants";
import { FormControl } from "../FormControl";
import Dropdown, { IDropdownOptions } from "../Select";

// #region -------------- Interfaces -------------------------------------------------------------------

interface IProps {
  currencies: Currency[];
  onDropDownChange(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

// #end region

// #region -------------- Component -------------------------------------------------------------------

export default function CurrencySelector({
  onDropDownChange: onDropDownSelect,
  currencies,
}: IProps) {
  const dropDownOptions: IDropdownOptions[] = [];

  // Translate available currencies to dropdown options
  currencies.forEach((currency) => {
    dropDownOptions.push({
      id: currency.code,
      label: CurrencyCode[currency.code].toString(),
    });
  });

  return (
    <FormControl
      child={
        <div className="control-wrapper">
          <Dropdown
            placeholder={TEXT_STRINGS.dropDownPlaceholder}
            options={dropDownOptions}
            onSelect={onDropDownSelect}
          />
        </div>
      }
    />
  );
}

// #end region
