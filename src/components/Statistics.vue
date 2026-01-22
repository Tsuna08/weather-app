<script setup lang="ts">
const { label, value = "-" } = defineProps({
  label: String,
  value: String,
});
</script>

<template>
  <div class="statistics">
    <div class="name">
      {{ label }}
    </div>
    <div class="value">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
.statistics {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 28px;
}
.name {
  font-weight: 700;
}
.value {
  font-weight: 400;
}
</style>
