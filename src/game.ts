import { getCandidateMoves, getResultingBoardStateAfterMove } from "./rules";
import { getSquareAt } from './utils';

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

const mapPositionToinitialPieces = new Map([
  ["0-0", { player: Player.Black, piece: Piece.Rook }],
  ["0-1", { player: Player.Black, piece: Piece.Knight }],
  ["0-2", { player: Player.Black, piece: Piece.Bishop }],
  ["0-3", { player: Player.Black, piece: Piece.Queen }],
  ["0-4", { player: Player.Black, piece: Piece.King }],
  ["0-5", { player: Player.Black, piece: Piece.Bishop }],
  ["0-6", { player: Player.Black, piece: Piece.Knight }],
  ["0-7", { player: Player.Black, piece: Piece.Rook }],
  ["1-0", { player: Player.Black, piece: Piece.Pawn }],
  ["1-1", { player: Player.Black, piece: Piece.Pawn }],
  ["1-2", { player: Player.Black, piece: Piece.Pawn }],
  ["1-3", { player: Player.Black, piece: Piece.Pawn }],
  ["1-4", { player: Player.Black, piece: Piece.Pawn }],
  ["1-5", { player: Player.Black, piece: Piece.Pawn }],
  ["1-6", { player: Player.Black, piece: Piece.Pawn }],
  ["1-7", { player: Player.Black, piece: Piece.Pawn }],
  ["6-0", { player: Player.White, piece: Piece.Pawn }],
  ["6-1", { player: Player.White, piece: Piece.Pawn }],
  ["6-2", { player: Player.White, piece: Piece.Pawn }],
  ["6-3", { player: Player.White, piece: Piece.Pawn }],
  ["6-4", { player: Player.White, piece: Piece.Pawn }],
  ["6-5", { player: Player.White, piece: Piece.Pawn }],
  ["6-6", { player: Player.White, piece: Piece.Pawn }],
  ["6-7", { player: Player.White, piece: Piece.Pawn }],
  ["7-0", { player: Player.White, piece: Piece.Rook }],
  ["7-1", { player: Player.White, piece: Piece.Knight }],
  ["7-2", { player: Player.White, piece: Piece.Bishop }],
  ["7-3", { player: Player.White, piece: Piece.Queen }],
  ["7-4", { player: Player.White, piece: Piece.King }],
  ["7-5", { player: Player.White, piece: Piece.Bishop }],
  ["7-6", { player: Player.White, piece: Piece.Knight }],
  ["7-7", { player: Player.White, piece: Piece.Rook }],
]);

const initBoard = (): Board => {
  return Array(8)
    .fill(null)
    .map((_, rowIndex) => {
      return Array(8)
        .fill(null)
        .map((_, colIndex) => {
          return {
            ...(mapPositionToinitialPieces.get(`${rowIndex}-${colIndex}`) ??
              {}),
            position: { x: colIndex, y: rowIndex },
          };
        });
    });
};

export const newGame = (): BoardState => {
  const currentPlayer = Player.White;
  const board = initBoard();
  const selected = null;
  const candidateMoves: Position[] = [];
  return {
    currentPlayer,
    board,
    selected,
    candidateMoves: candidateMoves,
  };
};

export const select = (
  boardState: BoardState,
  position: Position
): BoardState => {
  const squarePlayer = getSquareAt(boardState.board, position).player;

  if (squarePlayer !== boardState.currentPlayer) {
    return {
      ...boardState,
      candidateMoves: [],
      selected: null,
    };
  }
  return {
    ...boardState,
    selected: position,
    candidateMoves: getCandidateMoves(boardState, position),
  };
};

export const play = (
  boardState: BoardState,
  position: Position
): BoardState => {
  if (
    !boardState.selected ||
    !boardState.candidateMoves?.find(
      ({ x, y }) => x === position.x && y === position.y
    )
  ) {
    return {
      ...boardState,
      selected: null,
      candidateMoves: [],
    };
  }

  const move: Move = {
    destination: getSquareAt(boardState.board, position),
    origin: getSquareAt(boardState.board, boardState.selected),
  };
  return getResultingBoardStateAfterMove(boardState, move);
};
