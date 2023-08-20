<script setup>
const props = defineProps(['errors'])
</script>

<template>
    <ul>
      <li v-for="error in props.errors">{{ error }}</li>
    </ul>
</template>

<style scoped>
li {
  color:red;
  font-weight:bold;
}
</style>