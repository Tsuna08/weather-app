<script setup lang="ts">
import { computed } from "vue";

import Statistic from "@/components/Statistic.vue";
import CitySelect from "@/components/CitySelect.vue";
import Error from "@/components/Error.vue";
import DayCard from "@/components/DayCard.vue";

const { error, data, activeIndex } = defineProps({
  error: Object,
  data: Object,
  activeIndex: Number,
});

const indication = computed(() => {
  if (!data) return [];
  return [
    { label: "Humidity", value: data.current.humidity + " %" },
    { label: "Wind", value: data.current.wind_kph + " km/h" },
    { label: "Cloudy", value: data.current.cloud + " %" },
  ];
});

const emit = defineEmits(["select-index", "select-city"]);
</script>

<template>
  <section class="right">
    <Error v-if="error" :error="error?.error?.message" />
    <template v-else-if="data">
      <div>
        <Statistic v-for="item in indication" v-bind="item" :key="item.label" />
      </div>
      <template class="days">
        <DayCard
          v-for="(item, i) in data?.forecast?.forecastday"
          :key="item.date"
          :weather-code="item.day.condition.code"
          :temp="item.day.avgtemp_c"
          :date="new Date(item.date)"
          :is-active="activeIndex === i"
          @click="() => emit('select-index', i)"
      /></template>
    </template>
    <CitySelect />
  </section>
</template>

<style scoped>
.right {
  background: var(--color-bg-main);
  padding: 30px 25px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.days {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
