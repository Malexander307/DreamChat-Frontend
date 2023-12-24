<script setup>
import {Input, Button} from 'flowbite-vue'
import {ref} from "vue";
import ErrorListComponent from "../../components/ErrorListComponent.vue";
import client from "../../graphql/client"
import SIGN_IN_MUTATION from "../../graphql/Mutations/SignInMutation"
import gql from "graphql-tag";
import PusherLink from "../../graphql/PusherLink";
import {ApolloLink} from "apollo-link";
import Pusher from "pusher-js";

let login = null;
let password = null;
const errors = ref([]);

function validateForm(args) {
  if (!args.login) {
    errors.value.push('auth.errors.login_is_required')
  }

  if (!args.password) {
    errors.value.push('auth.errors.password_is_required')
  }
}

let channel = '';

const subscriber = client
    .subscribe({
      query: gql`
      subscription {
        massageSent {
          id
        }
      }
    `,
    })
    .subscribe((postUpdated) => {
      setChannel(postUpdated.extensions.lighthouse_subscriptions.channel);
      // console.log(channel)
    });

const pusherClient = new Pusher('268637f01421fb4cd6a01', {
  cluster: 'eu',
  wsHost: '127.0.0.1',
  wsPort: '6002',
  forceTLS: false,
  authEndpoint: `http://127.0.0.1:8000/graphql/subscriptions/auth`,
  auth: {
    headers: {
      authorization: 'gNIhCwbX8qj2VVBpXmjSAnUV0UMvoRGKRKGDbb5P',
    },
  },
})

function setChannel(value) {
  const channelP = pusherClient.subscribe(value);
  channelP.bind('lighthouse-subscription', (data) => {
    console.log(data)
  })
}


// console.log(channel)



function submitForm() {
  // client.sub({
  //   document: gql`subscription TEST{
  //         massageSent {
  //           id
  //           text
  //         }
  //       }
  //   `,
  // })
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