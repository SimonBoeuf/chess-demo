import {
  type BoardState,
  type Square,
  type Position,
  type Board,
  Player,
  type Move,
  Piece,
} from "../game";
import { getBishopMoves } from "./bishop";
import { getPawnMoves } from "./pawn";
import { getQueenMoves } from "./queen";
import { getRookMoves } from "./rook";
import { getKingMoves } from "./king";
import { getKnightMoves } from "./knight";
import { isInCheck } from "./check";

const isInBounds = (square: Square) => {
  return (
    square.position.x >= 0 &&
    square.position.x <= 7 &&
    square.position.y >= 0 &&
    square.position.y <= 7
  );
};

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

export const hasPlayerCandidateMoves = (boardState: BoardState): boolean => {
  const playerSquares = boardState.board.flatMap((row) => {
    return row.filter((square) => {
      return square.player === boardState.currentPlayer;
    });
  });
  return playerSquares.some((square) => {
    const candidateMoves = getCandidateMoves(boardState, square.position);
    return candidateMoves.length;
  });
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

const willBeInCheck = (boardState: BoardState, move: Move) => {
  const resultingBoardState: BoardState = getResultingBoardStateAfterMove(
    boardState,
    move
  );
  return isInCheck(boardState.currentPlayer, resultingBoardState);
};

export const getCandidateMoves = (
  boardState: BoardState,
  position: Position,
  preventChecks = true
) => {
  return boardState.board
    .flatMap((row, rowIndex) => {
      return row.map((_, colIndex) => {
        return {
          destination: boardState.board[rowIndex][colIndex],
          origin: boardState.board[position.y][position.x],
        };
      });
    })
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
    if (preventChecks && willBeInCheck(boardState, move)) {
      return false;
    }
    return true;
  };