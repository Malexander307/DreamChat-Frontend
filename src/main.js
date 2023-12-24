// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import {createI18n} from 'vue-i18n'
import router from './router'
import {DefaultApolloClient, provideApolloClient} from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { WebSocketLink } from 'apollo-link-ws'

function getHeaders() {
    const headers = {};
    let token = 'gNIhCwbX8qj2VVBpXmjSAnUV0UMvoRGKRKGDbb5P';
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    headers["Content-Type"] = "application/json";
    return headers;
}

console.log(getHeaders())
const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_GRAPHQL_URL,
    fetch: (uri, options) => {
        options.headers = getHeaders()
        return fetch(uri, options);
    },
})

// const wsLink = new WebSocketLink({
//     uri: 'ws://127.0.0.1:6002/app/268637f01421fb4cd6a01?protocol=7&client=js&version=4.3.1&flash=false',
//     connectionParams: {
//         authEndpoint: `http://127.0.0.1:8000/graphql/subscriptions/auth`,
//         headers: {
//             'Authorization': 'Bearer 8xYdaYAVDyLsgLn7x7ulhOj87ZEnV7HKHsC8sQPO54ffd0dc'
//         }
//     },
//     options: {
//         reconnect: true,
//     },
// })
const cache = new InMemoryCache()

// const link = split(
//     // split based on operation type
//     ({ query }) => {
//         const definition = getMainDefinition(query)
//         return definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//     },
//     wsLink,
//     httpLink
// )

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

import en from './locales/en';
import ua from './locales/ua';
import { useLangStore } from "./stores/lang";
import {split} from "apollo-link";

const app = createApp(App)

provideApolloClient(apolloClient)

app.provide(DefaultApolloClient, apolloClient)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')

const langStore = useLangStore();


const i18n = createI18n({
    legacy: false,
    locale: useLangStore().locale || import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    messages: {
        en,
        ua
    }
})

langStore.$subscribe((_, state) => {
    i18n.global.locale.value = state.locale;
});

app.use(i18n);