<script setup lang="ts">
import { ref, inject, type Ref } from "vue";
import Button from "@/components/Button.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import Input from "./Input.vue";
import { cityProvide } from "@/constants";

const cityRef = inject<Ref<string>>(cityProvide);

if (!cityRef) {
  throw new Error("City provider is missing");
}

const inputValue = ref(cityRef.value);
const isEdited = ref(false);

const select = () => {
  cityRef.value = inputValue.value;
  isEdited.value = false;
};

const edit = () => {
  inputValue.value = cityRef.value;
  isEdited.value = true;
};
</script>

<template>
  <div class="city-select">
    <div v-if="isEdited" class="city-input">
      <Input v-model="inputValue" placeholder="Enter city" @keyup.enter="select" />
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
  width: 350px;
}

.city-input {
  display: flex;
  gap: 12px;
}
</style>
