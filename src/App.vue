<script setup lang="ts">
import { computed, ref } from "vue";

import Statistics from "@/components/Statistics.vue";

import CitySelect from "@/components/CitySelect.vue";
import Error from "@/components/Error.vue";
import DayCard from "./components/DayCard.vue";

const API_ENDPOINT = "http://api.weatherapi.com/v1";

const data = ref();
const error = ref();

const indication = computed(() => {
  if (!data.value) return [];
  return [
    { label: "Humidity", value: data.value.current.humidity + " %" },
    { label: "Wind", value: data.value.current.wind_kph + " km/h" },
    { label: "Cloudy", value: data.value.current.cloud + " %" },
  ];
});

const getCity = async (city: string) => {
  const params = new URLSearchParams({
    q: city,
    lang: "en",
    key: "5f9ed27e55954e0c882101633252210",
    days: "3",
  });
  const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`);

  if (res.status != 200) {
    error.value = await res.json();
    data.value = null;
    return;
  }

  error.value = null;
  data.value = await res.json();
};
</script>

<template>
  <main class="main">
    <Error v-if="error" :error="error?.error?.message" />
    <template v-else-if="data">
      <Statistics v-for="item in indication" v-bind="item" :key="item.label" />
      <template class="days">
        <DayCard
          v-for="item in data.forecast.forecastday"
          :key="item.date"
          :weather-code="item.day.condition.code"
          :temp="item.day.avgtemp_c"
          :date="new Date(item.date)"
      /></template>
    </template>
    <CitySelect @select-city="getCity" />
  </main>
</template>

<style scoped>
.main {
  background: var(--color-bg-main);
  padding: 60px 50px;
  border-radius: 25px;
}

.days {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
