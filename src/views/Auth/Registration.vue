<script setup>
import {Input, Button} from 'flowbite-vue'
import {ref} from "vue";
import ErrorListComponent from "../../components/ErrorListComponent.vue";

let login = '';
let password = '';
let repeat_password = '';

const errors = ref([]);

function validateForm(args) {
  if (!args.login) {
    errors.value.push('Login is required')
  }

  if (!args.password) {
    errors.value.push('Password is required')
  }

  if (!args.repeat_password) {
    errors.value.push('Confirm password is required')
  }

  if (args.repeat_password !== args.password) {
    errors.value.push('Password and confirm password must be equal')
  }
}

function submitForm() {
  errors.value = [];
  validateForm({
    login: login,
    password: password,
    repeat_password: repeat_password
  })
  console.log(login)
  console.log(password)
}

</script>

<template>
  <div class="bg-[#ffffff] w-96 md:mx-auto ">
    <div class="flex justify-center items-center flex-col my-6">
      <div>
        <error-list-component :errors="errors"/>
        <Input v-model="login" placeholder="enter your login" class="mb-1.5" required label="Login"/>
        <Input type="password" v-model="password" placeholder="enter your password" class="mb-1.5" required
               label="Password"/>
        <Input type="password" v-model="repeat_password" placeholder="enter your password" required
               label="Confirm password"/>
      </div>
    </div>
    <div class="text-right">
      <RouterLink to="login">
        <Button>Login</Button>
      </RouterLink>
      <Button type="submit" class="m-4" @click="submitForm">Register</Button>
    </div>
  </div>

</template>

<style scoped>

</style>