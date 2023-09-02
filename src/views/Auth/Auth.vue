<script setup>

import {RouterView} from "vue-router";
import SelectLocaleComponent from "../../components/SelectLocaleComponent.vue";
</script>

<template>
  <div class="h-screen bg-[#1da1f2] p-10">
    <SelectLocaleComponent/>
    <div class="flex items-center justify-center h-5/6">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>

</style>