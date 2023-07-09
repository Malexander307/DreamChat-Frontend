<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { useQuery, useApolloClient } from '@vue/apollo-composable'
import GET_USERS from '../graphql/Queries/GetUsers'
import gql from 'graphql-tag'
import {Alert} from "flowbite-vue";
const { resolveClient } = useApolloClient()
const client = resolveClient()

</script>

<template>
  <div class="p-8">

    <a href="#" class="font-medium text-lg text-black">Vue + TailwindCSS</a>

  </div>
  <Alert type="info" class="mb-2">Info</Alert>
  <main>
    <TheWelcome />
  </main>
</template>



