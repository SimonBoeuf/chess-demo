import { Player, type Square, type Position, type Board } from "@/game";
import { isInBounds } from "@/utils";

// TODO: en passant + promotion
export const getPawnMoves = (square: Square, board: Board) => {
  const moves: Position[] = [];
  const direction = square.player === Player.White ? -1 : 1;
  const oneSquareAway = {
    x: square.position.x,
    y: square.position.y + direction,
  };
  if (
    isInBounds(oneSquareAway) &&
    board[oneSquareAway.y][oneSquareAway.x].player === undefined
  ) {
    moves.push({
      x: oneSquareAway.x,
      y: oneSquareAway.y,
    });
  }

  const diag1 = {
    x: square.position.x + 1,
    y: square.position.y + direction,
  };
  if (
    isInBounds(diag1) &&
    board[diag1.y][diag1.x].player !== square.player &&
    board[diag1.y][diag1.x].player !== undefined
  ) {
    moves.push(diag1);
  }

  const diag2 = {
    x: square.position.x - 1,
    y: square.position.y + direction,
  };
  if (
    isInBounds(diag2) &&
    board[diag2.y][diag2.x].player !== square.player &&
    board[diag2.y][diag2.x].player !== undefined
  ) {
    moves.push(diag2);
  }

  if (
    (square.position.y === 6 && square.player === Player.White) ||
    (square.position.y === 1 && square.player === Player.Black)
  ) {
    const twoSquaresAway = {
      x: square.position.x,
      y: square.position.y + 2 * direction,
    };
    if (
      isInBounds(twoSquaresAway) &&
      board[oneSquareAway.y][oneSquareAway.x].player === undefined &&
      board[twoSquaresAway.y][twoSquaresAway.x].player === undefined
    ) {
      moves.push({
        x: twoSquaresAway.x,
        y: twoSquaresAway.y,
      });
    }
  }
  return moves;
};
