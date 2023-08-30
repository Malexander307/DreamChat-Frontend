<script setup>
const props = defineProps(['errors'])
</script>

<template>
    <ul class="text-red-500">
      <li class="font-bold" v-for="error in props.errors">{{ error }}</li>
    </ul>
</template>

<style scoped>
</style>