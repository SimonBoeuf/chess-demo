<script setup lang="ts">
import { ref, computed } from "vue";

import { newGame, select, play } from "@/game";
import { Player } from "@/types";
import { isGameFinished } from "../rules/draw";
import { isInCheck } from "../rules/check";
import { getPieceComponent, shouldPlayAfterClick } from "./chessBoard.utils";

import Square from "./ChessSquare.vue";
import GameOver from "./GameOver.vue";

const boardState = ref(newGame());
const isFinished = computed(() => {
  return isGameFinished(boardState.value);
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

const reset = () => {
  boardState.value = newGame();
};

const handleSquareClick = (rowIndex: number, colIndex: number) => {
  if (isFinished.value) {
    return;
  }
  const position = { x: colIndex, y: rowIndex };
  if (shouldPlayAfterClick(boardState.value, position)) {
    boardState.value = play(boardState.value, position);
  } else {
    boardState.value = select(boardState.value, position);
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
