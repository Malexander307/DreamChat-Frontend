<script setup>
import {Input, Button} from 'flowbite-vue'
import {ref} from "vue";
import ErrorListComponent from "../../components/ErrorListComponent.vue";
import {useUserStore} from "../../stores/user";
import client from "../../graphql/client";
import SIGN_IN_MUTATION from "../../graphql/Mutations/SignInMutation"

let login = null;
let password = null;
const errors = ref([]);
const userStore = useUserStore();

function validateForm(args) {
  if (!args.login) {
    errors.value.push('auth.errors.login_is_required')
  }

  if (!args.password) {
    errors.value.push('auth.errors.password_is_required')
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
    userStore.token = data.data.signIn.token;
    userStore.user = data.data.signIn.user;
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
        <Input v-model="login"
               :placeholder="$t('auth.placeholders.for_login')"
               class="mb-1.5"
               :label="$t('auth.fields.login')"
        />
        <Input type="password"
               v-model="password"
               :placeholder="$t('auth.placeholders.for_password')"
               :label="$t('auth.fields.password')"
        />
      </div>
    </div>
    <div class="text-right">
      <RouterLink to="registration">
        <Button>{{ $t('auth.register') }}</Button>
      </RouterLink>
      <Button class="m-4" @click="submitForm">{{ $t('auth.login') }}</Button>
    </div>
  </div>

</template>

<style scoped>

</style>