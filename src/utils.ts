import type { Board, Piece, Position } from "./types";

export const isPiece = (piece: Piece | undefined): piece is Piece => {
  return piece !== undefined;
}

export const isInBounds = (position: Position) => {
  return (
    position.x >= 0 && position.y >= 0 && position.x <= 7 && position.y <= 7
  );
};

export const getSquareAt = (board: Board, position: Position) => {
  return board[position.y][position.x];
}