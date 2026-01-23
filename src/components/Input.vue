<script setup lang="ts">
const data = defineModel({ type: String });
</script>

<template>
  <input v-model="data" v-focus class="input" />
</template>

<style scoped lang="scss">
.input {
  width: 260px;
  height: 53px;
  color: var(--color-primary);
  border-radius: 10px;
  border: 1px solid var(--color-bg-card);
  background: var(--color-bg-card);
  box-shadow: 1px 2px 4px 0px var(--color-bg-main);
  font-size: 18px;
  padding: 15px 20px;

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  &:focus-visible {
    outline: none;
    border: 1px solid var(--color-bg);
  }
}
</style>
