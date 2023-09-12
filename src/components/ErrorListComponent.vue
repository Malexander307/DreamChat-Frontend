<script setup>
const props = defineProps(['errors'])
</script>

<template>
    <ul class="text-red-500 max-w-[300px]">
      <li class="font-bold" v-for="error in props.errors">{{ $t(error) }}</li>
    </ul>
</template>

<style scoped>
</style>