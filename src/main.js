// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {createI18n} from 'vue-i18n'
import router from './router'
import {DefaultApolloClient, provideApolloClient} from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'


const httpLink = createHttpLink({
    uri: import.meta.env.API_GRAPHQL_URL,
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

import en from './locales/en';
import ua from './locales/ua';
import { useLangStore } from "./stores/lang";

const app = createApp(App)

provideApolloClient(apolloClient)

app.provide(DefaultApolloClient, apolloClient)
app.use(createPinia())
app.use(router)

app.mount('#app')

const langStore = useLangStore();


const i18n = createI18n({
    legacy: false,
    locale: useLangStore().locale || import.meta.env.DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.FALLBACK_LOCALE,
    messages: {
        en,
        ua
    }
})

langStore.$subscribe((_, state) => {
    i18n.global.locale.value = state.locale;
    localStorage.setItem("locale", state.locale)
});

app.use(i18n);