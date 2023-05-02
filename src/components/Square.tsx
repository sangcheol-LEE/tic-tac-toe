import React from "react";
import "./Board.css";
import { Props } from "./Board";

const Square = ({ values, setValues }: Props) => {
  return (
    <button className="square" onClick={setValues}>
      {values}
    </button>
  );
};

export default Square;
