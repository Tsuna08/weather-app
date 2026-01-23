<script setup lang="ts">
import { computed, inject } from "vue";
import { cityProvide } from "@/constants";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconCloud from "@/components/icons/IconCloud.vue";
import IconRain from "@/components/icons/IconRain.vue";
import IconSun from "@/components/icons/IconSun.vue";

const { dayData } = defineProps({
  dayData: Object,
});

const city = inject(cityProvide);

const day = computed(() => {
  if (!dayData) return "-";
  return new Date(dayData.date).toLocaleDateString("en-EN", {
    weekday: "long",
  });
});

const date = computed(() => {
  if (!dayData) return "-";

  return new Date(dayData.date).toLocaleDateString("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const weatherCode = computed(() => {
  if (!dayData) return "-";
  return dayData.day.condition.code;
});
</script>

<template>
  <section class="left">
    <div>
      <div class="day">{{ day }}</div>
      <div class="date">{{ date }}</div>
      <div class="city">
        <IconLocation />
        {{ city }}
      </div>
    </div>
    <div>
      <div class="icon">
        <IconSun v-if="weatherCode <= 1003" :size="95" />
        <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" :size="95" />
        <IconRain v-if="weatherCode >= 1063" :size="95" />
      </div>
      <div class="temp">{{ dayData?.day.avgtemp_c }} °C</div>
      <div class="condition">
        {{ dayData?.day.condition.text }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.left {
  display: flex;
  flex-direction: column;
  padding: 30px 25px;
  justify-content: space-between;
  width: 370px;
  height: 500px;
  border-radius: 25px;
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.day {
  font-size: 37px;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 16px;
}
.date {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
}
.icon {
  margin: 25px;
}
.city {
  display: flex;
  gap: 8px;
  align-items: center;
  text-transform: capitalize;
}
.temp {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 9px;
}
.condition {
  font-size: 30px;
  font-weight: 700;
}
</style>
