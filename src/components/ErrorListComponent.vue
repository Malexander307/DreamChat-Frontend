<script setup>
const props = defineProps(['errors'])
</script>

<template>
    <ul>
      <li v-for="error in props.errors">{{ error }}</li>
    </ul>
</template>

<style scoped>
ol {
  list-style-type: decimal;
}
</style>