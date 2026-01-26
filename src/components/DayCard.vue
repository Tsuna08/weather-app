<script setup lang="ts">
import { computed } from "vue";
import IconCloud from "./icons/IconCloud.vue";
import IconRain from "./icons/IconRain.vue";
import IconSun from "./icons/IconSun.vue";

const { weatherCode, temp, date, isActive } = defineProps({
  weatherCode: Number,
  temp: Number,
  date: Date,
  isActive: Boolean,
});

const iconColor = computed(() => {
  return isActive ? "var(--color-primary-inverted)" : "var(--color-primary)";
});
</script>

<template>
  <button class="card" :class="{ active: isActive }">
    <template v-if="weatherCode">
      <IconSun v-if="weatherCode <= 1003" :size="50" :color="iconColor" />
      <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" :size="50" :color="iconColor" />
      <IconRain v-if="weatherCode >= 1063" :size="50" :color="iconColor" />
    </template>
    <div class="day">{{ date?.toLocaleDateString("en-EN", { weekday: "short" }) }}</div>
    <div class="temp">{{ temp }} °C</div>
  </button>
</template>

<style scoped>
.card {
  width: 110px;
  color: var(--color-primary);
  padding: 15px;
  background-color: var(--color-bg-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  box-shadow: 1px 2px 4px 0px #222832;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.card:not(.active):hover {
  background-color: var(--color-bg);
}

.active {
  background-color: var(--color-primary);
  color: var(--color-primary-inverted);
}

.day {
  font-size: 20px;
  text-transform: capitalize;
}

.temp {
  font-size: 20px;
  font-weight: 700;
}
</style>
