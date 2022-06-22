import type { Square, Board } from "@/types";
import {
  checkLowerLeftDiag,
  checkLowerRightDiag,
  checkUpperLeftDiag,
  checkUpperRightDiag,
} from "./common";

export const getBishopMoves = (square: Square, board: Board) => {
  return [
    ...checkLowerLeftDiag(square, board),
    ...checkUpperLeftDiag(square, board),
    ...checkUpperRightDiag(square, board),
    ...checkLowerRightDiag(square, board),
  ];
};
