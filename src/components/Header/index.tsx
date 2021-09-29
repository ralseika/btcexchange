import React from "react";
import { TEXT_STRINGS } from "../../utils/constants";

export default function Header() {
  return (
    <header>
      <h1 className="primary-text">{TEXT_STRINGS.appTitle}</h1>
    </header>
  );
}
