<script setup lang="ts">
import { onMounted, watch, ref } from "vue";

import Button from "@/components/Button.vue";
import IconLocation from "@/components/icon/IconLocation.vue";

import Input from "./Input.vue";

const emit = defineEmits({
  selectCity(payload) {
    return payload;
  },
});

let city = ref("Moscow");
const isEdited = ref(false);

onMounted(() => {
  emit("selectCity", city.value);
});

const select = () => {
  isEdited.value = false;
  emit("selectCity", city.value);
};

const edit = () => {
  isEdited.value = true;
};
</script>

<template>
  <div class="city-select">
    <div v-if="isEdited" class="city-input">
      <Input v-model="city" placeholder="Enter city" @keyup.enter="select" />
      <Button @click="select">Save</Button>
    </div>
    <Button v-else @click="edit">
      <IconLocation />
      Change city
    </Button>
  </div>
</template>

<style scoped>
.city-select {
  width: 400px;
}

.city-input {
  display: flex;
  gap: 12px;
}
</style>
