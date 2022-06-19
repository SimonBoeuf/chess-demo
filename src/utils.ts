import type { Position } from "./game";

export const isInBounds = (position: Position) => {
  return (
    position.x >= 0 && position.y >= 0 && position.x <= 7 && position.y <= 7
  );
};
