<script setup lang="ts">
import { computed } from "vue";
import { Player } from "@/game";
const props = defineProps<{
  winner: Player | null;
}>();

const text = computed(() => {
  if (props.winner === null) {
    return "The game is a draw";
  }
  const playerName = props.winner === Player.Black ? "Black" : "White";
  return `${playerName} won !`;
});
</script>

<template>
  <div class="game-over">{{ text }}</div>
</template>

<style>
.game-over {
  color: black;
  text-align: center;
  font-size: 48px;
}
</style>
