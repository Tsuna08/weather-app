<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  border: none;
  border-radius: 10px;
  background: var(--gradient);
  padding: 14px;
  font-family: var(--font);
  font-size: 20px;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
  height: 53px;
  width: 100%;
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
}
.button:hover {
  background: var(--gradient-inverted);
}
</style>
