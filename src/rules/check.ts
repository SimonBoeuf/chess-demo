import { Piece, type BoardState, type Player } from "@/game";
import { getCandidateMoves } from ".";

export const isInCheck = (player: Player, boardState: BoardState) => {
  const kingSquare = boardState.board
    .flatMap((row) => {
      const square = row.find((square) => {
        return square.player === player && square.piece === Piece.King;
      });
      return square;
    })
    .find(Boolean);

  if (!kingSquare) {
    throw new Error(
      `King not found for player ${player} in board ${boardState.board}`
    );
  }
  const opponentSquares = boardState.board.flatMap((row) => {
    return row.filter((square) => {
      return square.player !== undefined && square.player !== player;
    });
  });

  return opponentSquares.some((square) => {
    const candidateMoves = getCandidateMoves(
      boardState,
      square.position,
      false
    );
    return candidateMoves.some(
      (position) =>
        position.x === kingSquare.position.x &&
        position.y === kingSquare.position.y
    );
  });
};
