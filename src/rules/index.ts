import {
  type BoardState,
  type Square,
  type Position,
  type Board,
  Player,
  type Move,
  Piece,
} from "@/types";
import { getBishopMoves } from "./bishop";
import { getPawnMoves } from "./pawn";
import { getQueenMoves } from "./queen";
import { getRookMoves } from "./rook";
import { getKingMoves } from "./king";
import { getKnightMoves } from "./knight";
import { isInCheck } from "./check";
import { getSquareAt } from '@/utils';

const isInBounds = (square: Square) => {
  return (
    square.position.x >= 0 &&
    square.position.x <= 7 &&
    square.position.y >= 0 &&
    square.position.y <= 7
  );
};

const getSquareCandidateMoves = (
  square: Square,
  board: Board
) => {
  if (square.piece === undefined) {
    return [];
  }
  const mapPieceToMoveGetter = new Map([
    [Piece.Pawn, getPawnMoves],
    [Piece.Knight, getKnightMoves],
    [Piece.Bishop, getBishopMoves],
    [Piece.Queen, getQueenMoves],
    [Piece.King, getKingMoves],
    [Piece.Rook, getRookMoves],
  ]);
  const getMoves = mapPieceToMoveGetter.get(square.piece);

  if (!getMoves) {
    throw new Error(`Unhandled piece : ${square.piece}`);
  }
  return getMoves(square, board);
}

const isPieceMove = (
  square: Square,
  board: Board,
  destination: Position
): boolean => {
  if (square.piece === undefined) {
    return false;
  }
  const mapPieceToMoveGetter = new Map([
    [Piece.Pawn, getPawnMoves],
    [Piece.Knight, getKnightMoves],
    [Piece.Bishop, getBishopMoves],
    [Piece.Queen, getQueenMoves],
    [Piece.King, getKingMoves],
    [Piece.Rook, getRookMoves],
  ]);
  const getMoves = mapPieceToMoveGetter.get(square.piece);

  if (!getMoves) {
    throw new Error(`Unhandled piece : ${square.piece}`);
  }
  const allPieceMoves: Position[] = getMoves(square, board);
  return Boolean(
    allPieceMoves.find(({ x, y }) => x === destination.x && y === destination.y)
  );
};

const isBlocked = (
  originSquarePlayer: Player,
  destinationSquarePlayer?: Player
) => {
  return destinationSquarePlayer === originSquarePlayer;
};

export const getResultingBoardStateAfterMove = (
  boardState: BoardState,
  move: Move
): BoardState => {
  const resultingBoard: Board = boardState.board.map((row, rowIndex) => {
    return row.map((square, colIndex) => {
      if (
        move.origin.position.x === colIndex &&
        move.origin.position.y === rowIndex
      ) {
        return {
          position: move.origin.position,
        };
      }
      if (
        move.destination.position.x === colIndex &&
        move.destination.position.y === rowIndex
      ) {
        return {
          position: move.destination.position,
          player: move.origin.player,
          piece: move.origin.piece,
        };
      }
      return square;
    });
  });

  const nextPlayer =
    boardState.currentPlayer === Player.Black ? Player.White : Player.Black;

  return {
    selected: null,
    candidateMoves: [],
    currentPlayer: nextPlayer,
    board: resultingBoard,
  };
};

export const getCandidateMoves = (
  boardState: BoardState,
  position: Position,
  preventChecks = true
): Position[] => {
  const origin = getSquareAt(boardState.board, position);
  return getSquareCandidateMoves(origin, boardState.board)
    .map(destination => ({
      origin,
      destination: getSquareAt(boardState.board, destination),
    }))
    .filter(isLegalMove(boardState, preventChecks))
    .map(({ destination }) => ({
      x: destination.position.x,
      y: destination.position.y,
    }));
};

export const isLegalMove =
  (boardState: BoardState, preventChecks: boolean) =>
    (move: Move): boolean => {
      if (move.origin.piece === undefined || move.origin.player === undefined) {
        return false;
      }
      if (
        !isPieceMove(move.origin, boardState.board, move.destination.position)
      ) {
        return false;
      }
      if (!isInBounds(move.destination)) {
        return false;
      }
      if (isBlocked(move.origin.player, move.destination.player)) {
        return false;
      }
      if (preventChecks) {
        const resultingBoardState: BoardState = getResultingBoardStateAfterMove(
          boardState,
          move
        );
        return isInCheck(boardState.currentPlayer, resultingBoardState);
      }
      return true;
    };

