import type { Board, Player, Position, Square } from "@/types";
import { getSquareAt, isInBounds } from "@/utils";

export const checkUpperLeftDiag = (
  square: Square,
  board: Board
): Position[] => {
  const moves: Position[] = [];
  let { x, y } = square.position;
  while (isInBounds({ x: x - 1, y: y - 1 })) {
    x = x - 1;
    y = y - 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkUpperRightDiag = (
  square: Square,
  board: Board
): Position[] => {
  const moves: Position[] = [];
  let { x, y } = square.position;
  while (
    isInBounds({
      x: x + 1,
      y: y - 1,
    })
  ) {
    x = x + 1;
    y = y - 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkLowerRightDiag = (
  square: Square,
  board: Board
): Position[] => {
  const moves: Position[] = [];
  let { x, y } = square.position;
  while (
    isInBounds({
      x: x + 1,
      y: y + 1,
    })
  ) {
    x = x + 1;
    y = y + 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkLowerLeftDiag = (
  square: Square,
  board: Board
): Position[] => {
  const moves: Position[] = [];
  let { x, y } = square.position;
  while (
    isInBounds({
      x: x - 1,
      y: y + 1,
    })
  ) {
    x = x - 1;
    y = y + 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkFileDown = (square: Square, board: Board): Position[] => {
  const moves: Position[] = [];
  let { y } = square.position;
  const { x } = square.position;
  while (
    isInBounds({
      x,
      y: y + 1,
    })
  ) {
    y = y + 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkFileUp = (square: Square, board: Board): Position[] => {
  const moves: Position[] = [];
  let { y } = square.position;
  const { x } = square.position;
  while (
    isInBounds({
      x,
      y: y - 1,
    })
  ) {
    y = y - 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkRankLeft = (square: Square, board: Board): Position[] => {
  const moves: Position[] = [];
  const { y } = square.position;
  let { x } = square.position;
  while (
    isInBounds({
      x: x - 1,
      y,
    })
  ) {
    x = x - 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkRankRight = (square: Square, board: Board): Position[] => {
  const moves: Position[] = [];
  const { y } = square.position;
  let { x } = square.position;
  while (
    isInBounds({
      x: x + 1,
      y,
    })
  ) {
    x = x + 1;
    if (board[y][x].player === square.player) {
      return moves;
    }
    moves.push({
      x,
      y,
    });
    if (board[y][x].player !== undefined) {
      return moves;
    }
  }
  return moves;
};

export const checkSquareIsValidDestination = (
  destination: Position,
  board: Board,
  player?: Player
) => {
  if (!isInBounds(destination)) {
    return null;
  }
  if (getSquareAt(board, destination).player === player) {
    return null;
  }
  return destination;
};

export const addPosition = (moves: Position[], move: Position | null) => {
  if (!move) {
    return moves;
  }
  return [...moves, move];
};
