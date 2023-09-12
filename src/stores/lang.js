import {defineStore} from 'pinia'

export const useLangStore = defineStore('lang', {
    // a function that returns a fresh state
    state: () => ({
        locale: import.meta.env.VITE_DEFAULT_LOCALE,
    }),
    persist: true,
})
