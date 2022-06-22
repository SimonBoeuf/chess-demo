import type { Square, Board } from "@/types";
import {
  checkFileDown,
  checkFileUp,
  checkRankLeft,
  checkRankRight,
} from "./common";

export const getRookMoves = (square: Square, board: Board) => {
  return [
    ...checkFileUp(square, board),
    ...checkFileDown(square, board),
    ...checkRankLeft(square, board),
    ...checkRankRight(square, board),
  ];
};
