<script setup lang="ts">
import { ref, computed } from "vue";

import { newGame, Player, Piece, type Board, select, play } from "@/game";
import { hasPlayerCandidateMoves } from "../rules";
import { isInCheck } from "../rules/check";

import Square from "./ChessSquare.vue";
import GameOver from "./GameOver.vue";

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

const boardState = ref(newGame());
const reset = () => {
  boardState.value = newGame();
};
const isFinished = computed(() => {
  return !hasPlayerCandidateMoves(boardState.value);
});
const winner = computed<Player | null>(() => {
  if (
    isFinished.value &&
    isInCheck(boardState.value.currentPlayer, boardState.value)
  ) {
    return boardState.value.currentPlayer === Player.Black
      ? Player.White
      : Player.Black;
  }
  return null;
});

const mapWhitePieceToComponent = new Map([
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

const getPieceComponent = (
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

const handleSquareClick = (rowIndex: number, colIndex: number) => {
  if (isFinished.value) {
    return;
  }
  if (boardState.value.selected) {
    if (
      boardState.value.board[rowIndex][colIndex].player ===
      boardState.value.currentPlayer
    ) {
      boardState.value = select(boardState.value, { x: colIndex, y: rowIndex });
    } else {
      boardState.value = play(boardState.value, { x: colIndex, y: rowIndex });
    }
  } else {
    boardState.value = select(boardState.value, { x: colIndex, y: rowIndex });
  }
};
</script>

<template>
  <div class="board">
    <div class="row" :key="rowNumber" v-for="rowNumber in 8">
      <div class="col" :key="colNumber" v-for="colNumber in 8">
        <div>
          <Square
            :position="{ x: colNumber - 1, y: rowNumber - 1 }"
            :selected="
              boardState.selected?.x === colNumber - 1 &&
              boardState.selected?.y === rowNumber - 1
            "
            :isEmpty="
              boardState.board[rowNumber - 1][colNumber - 1].piece === undefined
            "
            :isCandidate="
              Boolean(
                boardState.candidateMoves?.find(
                  ({ x, y }) => x === colNumber - 1 && y === rowNumber - 1
                )
              )
            "
            @select="() => handleSquareClick(rowNumber - 1, colNumber - 1)"
          >
            <component
              :is="
                getPieceComponent(
                  boardState.board,
                  rowNumber - 1,
                  colNumber - 1
                )
              "
            ></component>
          </Square>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isFinished">
    <GameOver :winner="winner" />
  </div>
  <div class="new-game">
    <a @click="reset" class="button">New Game</a>
  </div>
</template>

<style lang="scss">
.row {
  display: flex;
}
.new-game {
  text-align: center;
  a {
    color: #787878;
    background: linear-gradient(to bottom, #f5f5f5 0%, #ededed 100%);
    text-shadow: 0 1px 0 #fff;
    margin: 1.2em 0;
    padding: 1em;
    font-size: 1.1em;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
    white-space: nowrap;
    display: inline-block;
    border-radius: 3px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 23%);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
