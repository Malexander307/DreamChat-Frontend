<script setup>
import {Input, Button} from 'flowbite-vue'
import {reactive, ref} from "vue";
import ErrorListComponent from "../../components/ErrorListComponent.vue";

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
  console.log(login)
  console.log(password)
}

</script>

<template>
  <div class="bg-[#ffffff] w-96  md:mx-auto ">
    <div class="flex justify-center items-center flex-col my-6">
      <div>
        <error-list-component :errors="errors"/>
        <Input v-model="login" placeholder="enter your login" class="mb-1.5" label="Login"/>
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