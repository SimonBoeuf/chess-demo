import type { Square, Position, Board } from "@/game";
import { checkSquareIsValidDestination, addPosition } from "./common";

const checkUpAndRight = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 1,
    y: y - 2,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkRightAndUp = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 2,
    y: y - 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkUpAndLeft = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 1,
    y: y - 2,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkLeftAndUp = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 2,
    y: y - 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkDownAndRight = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 1,
    y: y + 2,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkRightAndDown = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x + 2,
    y: y + 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkDownAndLeft = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 1,
    y: y + 2,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

const checkLeftAndDown = (square: Square, board: Board) => {
  const { x, y } = square.position;
  const destination = {
    x: x - 2,
    y: y + 1,
  };
  return checkSquareIsValidDestination(destination, board, square.player);
};

export const getKnightMoves = (square: Square, board: Board): Position[] => {
  return [
    checkUpAndRight,
    checkRightAndUp,
    checkUpAndLeft,
    checkLeftAndUp,
    checkDownAndRight,
    checkRightAndDown,
    checkDownAndLeft,
    checkLeftAndDown,
  ].reduce(
    (acc, curr) => addPosition(acc, curr(square, board)),
    [] as Position[]
  );
};
