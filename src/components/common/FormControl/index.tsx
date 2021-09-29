import React, { FC, ReactNode } from "react";

// #region -------------- Interfaces -------------------------------------------------------------------

interface IProps {
  child: ReactNode;
}

// #end region

// #region -------------- Component -------------------------------------------------------------------

export const FormControl: FC<IProps> = ({ child }: IProps) => {
  return <div className="form-control">{child}</div>;
};

// #end region
