export type Position = {
  x: number;
  y: number;
};

export enum Player {
  White,
  Black,
}

export enum Piece {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
}

export type Square = {
  piece?: Piece;
  player?: Player;
  position: Position;
};

export type Move = {
  origin: Square;
  destination: Square;
};

export type Board = Array<Array<Square>>;

export type BoardState = {
  currentPlayer: Player;
  board: Board;
  selected: Position | null;
  candidateMoves: Position[] | null;
};
