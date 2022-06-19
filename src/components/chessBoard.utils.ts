import {
  Piece,
  Player,
  type Board,
  type BoardState,
  type Position,
} from "@/game";

import WB from "./icons/wB.vue";
import WK from "./icons/wK.vue";
import WN from "./icons/wN.vue";
import WP from "./icons/wP.vue";
import WQ from "./icons/wQ.vue";
import WR from "./icons/wR.vue";

import BB from "./icons/bB.vue";
import BK from "./icons/bK.vue";
import BN from "./icons/bN.vue";
import BP from "./icons/bP.vue";
import BQ from "./icons/bQ.vue";
import BR from "./icons/bR.vue";

export const mapWhitePieceToComponent = new Map([
  [Piece.Bishop, WB],
  [Piece.King, WK],
  [Piece.Knight, WN],
  [Piece.Pawn, WP],
  [Piece.Queen, WQ],
  [Piece.Rook, WR],
]);

const mapBlackPieceToComponent = new Map([
  [Piece.Bishop, BB],
  [Piece.King, BK],
  [Piece.Knight, BN],
  [Piece.Pawn, BP],
  [Piece.Queen, BQ],
  [Piece.Rook, BR],
]);

export const getPieceComponent = (
  board: Board,
  rowIndex: number,
  colIndex: number
) => {
  const square = board[rowIndex][colIndex];
  const mapPieceToComponentMapper = new Map([
    [Player.White, mapWhitePieceToComponent],
    [Player.Black, mapBlackPieceToComponent],
  ]);

  if (square.player === undefined || square.piece === undefined) {
    return null;
  }

  return (
    mapPieceToComponentMapper.get(square.player)?.get(square.piece) ?? null
  );
};

export const shouldPlayAfterClick = (
  boardState: BoardState,
  position: Position
) => {
  return (
    Boolean(boardState.selected) &&
    boardState.board[position.y][position.x].player !== boardState.currentPlayer
  );
};
