// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {createI18n} from 'vue-i18n'
import router from './router'
import {DefaultApolloClient, provideApolloClient} from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
// import langStore from 'stores/lang'


const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8000/graphql',
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

import en from './locales/en';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
    }
})


const app = createApp(App)

provideApolloClient(apolloClient)

app.provide(DefaultApolloClient, apolloClient)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
