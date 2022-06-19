import type { Square, Position, Board } from "@/game";
import { checkSquareIsValidDestination, addPosition } from "./common";

// TODO: Castling

const checkUpperLeftDiag = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 1,
    y: y - 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkUpperRightDiag = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 1,
    y: y - 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkLowerRightDiag = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 1,
    y: y + 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkLowerLeftDiag = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 1,
    y: y + 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkFileDown = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x,
    y: y + 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkFileUp = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x,
    y: y - 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkRankLeft = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 1,
    y,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkRankRight = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 1,
    y,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

export const getKingMoves = (square: Square, board: Board) => {
  return [
    checkLowerLeftDiag,
    checkUpperLeftDiag,
    checkUpperRightDiag,
    checkLowerRightDiag,
    checkFileDown,
    checkFileUp,
    checkRankLeft,
    checkRankRight,
  ].reduce(
    (acc, curr) => addPosition(acc, curr(square, board)),
    [] as Position[]
  );
};
