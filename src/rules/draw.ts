import { Piece, Player, type BoardState } from '@/types';
import { isPiece } from '@/utils';
import { getCandidateMoves } from '.';

const loneKing = (pieces: Piece[]) => (
  pieces.length === 1 && pieces[0] === Piece.King
)
const kingAndBishop = (pieces: Piece[]) => (
  pieces.length === 2
  && pieces.find(piece => piece === Piece.Bishop)
  && pieces.find(piece => piece === Piece.King)
);
const kingAndKnight = (pieces: Piece[]) => (
  pieces.length === 2
  && pieces.find(piece => piece === Piece.Knight)
  && pieces.find(piece => piece === Piece.King)
);

const kingAndTwoKnightsAgainstLoneKing = (player1Pieces: Piece[], player2Pieces: Piece[]) => {
  const playerWithLoneKing = [player1Pieces, player2Pieces].some(loneKing);
  if (!playerWithLoneKing) {
    return false;
  }
  return [player1Pieces, player2Pieces].some(
    pieces => pieces.length === 2 && pieces.every(
      piece => piece === Piece.Knight
    )
  );
};

const standardInsufficientMaterial = (player1Pieces: Piece[], player2Pieces: Piece[]) => {
  return [player1Pieces, player2Pieces].every(pieces => {
    return [loneKing, kingAndBishop, kingAndKnight]
      .some(setup => setup(pieces))
  })
};

const isInsufficientMaterial = (boardState: BoardState) => {
  const blackPieces = boardState.board.flatMap((row) => {
    return row.filter((square) => {
      return square.player === Player.Black;
    }).map(({ piece }) => piece).filter(isPiece);
  });

  const whitePieces = boardState.board.flatMap((row) => {
    return row.filter((square) => {
      return square.player === Player.White;
    }).map(({ piece }) => piece).filter(isPiece);
  });

  return standardInsufficientMaterial(blackPieces, whitePieces) || kingAndTwoKnightsAgainstLoneKing(blackPieces, whitePieces)
}


const hasPlayerCandidateMoves = (boardState: BoardState): boolean => {
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

// TODO: 50 moves rule
export const isGameFinished = (boardState: BoardState) => {
  return (
    !hasPlayerCandidateMoves(boardState)
    || isInsufficientMaterial(boardState)
  );
}
