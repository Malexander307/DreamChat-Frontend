<script setup>
import {Input, Button} from 'flowbite-vue'
import {ref} from "vue";
import ErrorListComponent from "../../components/ErrorListComponent.vue";
import client from "../../graphql/client"
import SIGN_IN_MUTATION from "../../graphql/Mutations/SignInMutation"

let login = null;
let password = null;
const errors = ref([]);

function validateForm(args) {
  if (!args.login) {
    errors.value.push('Login is required')
  }

  if (!args.password) {
    errors.value.push('Password is required')
  }
}

function submitForm() {
  errors.value = [];
  validateForm({
    login: login,
    password: password
  })
  client.mutate({
    mutation: SIGN_IN_MUTATION,
    variables: {
      nickname: login,
      password: password
    }
  }).then((data) => {
    console.log(data)
  }).catch((error) => {
    console.log(error)
  })
}

</script>

<template>
  <div class="bg-[#ffffff] w-96  md:mx-auto ">
    <div class="flex justify-center items-center flex-col my-6">
      <div>
        <error-list-component :errors="errors"/>
        <Input v-model="login" placeholder="enter your login" class="mb-1.5" :label="$t('login')"/>
        <Input type="password" v-model="password" placeholder="enter your password" label="Password"/>
      </div>
    </div>
    <div class="text-right">
      <RouterLink to="registration">
        <Button>Registration</Button>
      </RouterLink>
      <Button class="m-4" @click="submitForm">Login</Button>
    </div>
  </div>

</template>

<style scoped>

</style>