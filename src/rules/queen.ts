import type { Square, Board } from "@/game";
import {
  checkFileDown,
  checkFileUp,
  checkLowerLeftDiag,
  checkLowerRightDiag,
  checkRankLeft,
  checkRankRight,
  checkUpperLeftDiag,
  checkUpperRightDiag,
} from "./common";

export const getQueenMoves = (square: Square, board: Board) => {
  return [
    ...checkLowerLeftDiag(square, board),
    ...checkUpperLeftDiag(square, board),
    ...checkUpperRightDiag(square, board),
    ...checkLowerRightDiag(square, board),
    ...checkFileDown(square, board),
    ...checkFileUp(square, board),
    ...checkRankLeft(square, board),
    ...checkRankRight(square, board),
  ];
};
