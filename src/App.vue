<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";

import RightPanel from "./components/RightPanel.vue";
import { API_ENDPOINT, cityProvide } from "./constants";
import LeftPanel from "./components/LeftPanel.vue";

const data = ref();
const error = ref();
let activeIndex = ref<number>(0);
let city = ref<string>("Moscow");

provide(cityProvide, city);

watch(city, () => {
  getCity(city.value);
});

onMounted(() => {
  getCity(city.value);
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
  <main>
    <LeftPanel v-if="data" :day-data="data.forecast.forecastday[activeIndex]" />
    <RightPanel :data :error :active-index="activeIndex" @select-index="i => (activeIndex = i)" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
