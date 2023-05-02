import React, { useMemo } from "react";
import Square from "./Square";
import { PropsX } from "./Game";

export interface Props {
  values: string;
  setValues: React.Dispatch<React.SetStateAction<any>>;
}

type handleClick = (i: number) => void;
type getWinner = (value: string[]) => string | null;

function Board({ isNext, squares, onPlay }: PropsX) {
  const getWinner: getWinner = (values) => {
    const lines: [number, number, number][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c]: number[] = lines[i];
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        return values[a];
      }
    }
    return null;
  };

  const handleClick: handleClick = (i) => {
    if (getWinner(squares) || squares[i]) return;

    const nextSquares: string[] = [...squares];

    if (isNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  const winner: string = useMemo(() => {
    if (getWinner(squares)) {
      return `Winner is ${getWinner(squares)}`;
    } else {
      return `Next Player : ${isNext ? "X" : "O"}`;
    }
  }, [isNext, squares]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="board-container">
          <h1 className="status">{winner}</h1>

          <div className="board-row">
            <Square values={squares[0]} setValues={() => handleClick(0)} />
            <Square values={squares[1]} setValues={() => handleClick(1)} />
            <Square values={squares[2]} setValues={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square values={squares[3]} setValues={() => handleClick(3)} />
            <Square values={squares[4]} setValues={() => handleClick(4)} />
            <Square values={squares[5]} setValues={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square values={squares[6]} setValues={() => handleClick(6)} />
            <Square values={squares[7]} setValues={() => handleClick(7)} />
            <Square values={squares[8]} setValues={() => handleClick(8)} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Board;
