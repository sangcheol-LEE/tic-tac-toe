import React, { useState } from "react";
import Board from "./Board";
import "../App.css";

export interface PropsX {
  isNext: boolean;
  squares: string[];
  onPlay: (nextSquare: string[]) => void;
}
type OnPlay = (nextSquare: string[]) => void;

const Game = () => {
  const [history, setHistory] = useState<any[]>([
    Array.from({ length: 9 }).fill(""),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquare: string[] = history[currentMove];
  const isNext: boolean = currentMove % 2 === 0;

  const handlePlay: OnPlay = (nextSquare) => {
    const nextHistory: string[] = [
      ...history.slice(0, currentMove + 1),
      nextSquare,
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number): void => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_: string, idx: number) => {
    let desciption: string;
    if (idx > 0) {
      desciption = `Go to move ${idx}`;
    } else {
      desciption = `Let's go to Game Start`;
    }
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{desciption}</button>
      </li>
    );
  });
  return (
    <div className="game_container">
      <Board isNext={isNext} squares={currentSquare} onPlay={handlePlay} />
      <div className="game_info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
