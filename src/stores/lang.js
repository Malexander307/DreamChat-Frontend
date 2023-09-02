import {ref} from 'vue'
import {defineStore} from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useLangStore = defineStore('lang', {
    // a function that returns a fresh state
    state: () => ({
        locale: useLocalStorage('locale', 'ua'),
    })
})
