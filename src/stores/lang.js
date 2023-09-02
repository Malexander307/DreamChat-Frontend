import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const lang = ref('en')

    return {lang}
})
