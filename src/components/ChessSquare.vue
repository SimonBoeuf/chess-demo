<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import type { Position } from "../game";
import clsx from "clsx";

const props = defineProps<{
  position: Position;
  selected: boolean;
  isCandidate: boolean;
  isEmpty: boolean;
}>();

if (props.selected) {
  // console.log(props.position);
}

const emit = defineEmits<{
  (e: "select"): void;
}>();

const handleClik = () => {
  emit("select");
};

const color = computed<string>(() => {
  return (props.position.x + props.position.y) % 2 ? "black" : "white";
});
</script>

<template>
  <div @click="handleClik" :class="clsx(color, { selected }, 'square')">
    <div
      :class="clsx('candidate', { 'is-empty': props.isEmpty })"
      v-if="isCandidate"
    ></div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.square {
  height: 72px;
  width: 72px;
  cursor: pointer;
  position: relative;
  &.selected {
    background: #646f3f;
  }
}
.black {
  background: #b58863;
}
.white {
  background: #f0d9b5;
}

.candidate {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    transparent 0%,
    transparent 79%,
    rgba(20, 85, 0, 0.3) 80%
  );
  &.is-empty {
    background: radial-gradient(
      rgba(20, 85, 30, 0.5) 19%,
      rgba(0, 0, 0, 0) 20%
    );
    pointer-events: auto;
  }
}
</style>
