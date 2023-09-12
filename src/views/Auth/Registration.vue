<script setup>
import {Input, Button} from 'flowbite-vue'
import {ref} from "vue";
import ErrorListComponent from "../../components/ErrorListComponent.vue";
import SIGN_UP_MUTATION from "../../graphql/Mutations/SignUpMutation";
import client from "../../graphql/client";
import router from "../../router";

let login = '';
let password = '';
let repeat_password = '';

const errors = ref([]);

function validateForm(args) {
  if (!args.login) {
    errors.value.push('auth.errors.login_is_required')
  }

  if (!args.password) {
    errors.value.push('auth.errors.password_is_required')
  }

  if (!args.repeat_password) {
    errors.value.push('auth.errors.confirm_password_is_required')
  }

  if (args.repeat_password !== args.password) {
    errors.value.push('auth.errors.wrong_confirm')
  }
}

function submitForm() {
  errors.value = [];
  validateForm({
    login: login,
    password: password,
    repeat_password: repeat_password
  })
  client.mutate({
    mutation: SIGN_UP_MUTATION,
    variables: {
      nickname: login,
      password: password
    }
  }).then((data) => {
    console.log(data)
    router.push({name: 'login'});
  }).catch((error) => {
    console.log(error)
  })
}

</script>

<template>
  <div class="bg-[#ffffff] w-96 md:mx-auto ">
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
               class="mb-1.5"
               :label="$t('auth.fields.password')"
        />
        <Input type="password"
               v-model="repeat_password"
               :placeholder="$t('auth.placeholders.for_confirm_password')"
               :label="$t('auth.fields.confirm_password')"
        />
      </div>
    </div>
    <div class="text-right">
      <RouterLink to="login">
        <Button>{{ $t('auth.login') }}</Button>
      </RouterLink>
      <Button type="submit" class="m-4" @click="submitForm"> {{ $t('auth.register') }}</Button>
    </div>
  </div>

</template>

<style scoped>

</style>