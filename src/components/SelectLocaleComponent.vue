<script setup>
import {useLangStore} from "../stores/lang";

const langStore = useLangStore()
</script>

<template>
  <select v-model="langStore.locale">
    <option value="en">en</option>
    <option value="ua">ua</option>
  </select>
</template>

<style scoped>

</style>